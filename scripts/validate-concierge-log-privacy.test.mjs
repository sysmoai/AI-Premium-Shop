import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { files, validateSource } from './validate-concierge-log-privacy.mjs';

const sentinel = 'PRIVATE_TEST_QUESTION_SESSION_TOKEN';
const unsafe = [
  'console.error(e);',
  'console.error(e.message);',
  'console.error(JSON.stringify({ event: "concierge_model_fail", model, error: String(e.message || e).slice(0, 150) }));',
  'console.error(JSON.stringify({\n event: "concierge_model_fail",\n model, error: e.stack\n}));',
  'console.error(JSON.stringify({ event: "concierge_model_fail", error: e.cause }));',
  'const detail = String(e); console.warn(detail);',
  'console["error"](e);',
  'const logger = console; logger.error(e);',
  'console.log(JSON.stringify({ event: "concierge_reply", question: lastQuestion }));',
  'console.log(JSON.stringify({ event: "concierge_reply", session: sessionId }));',
  'console.error(JSON.stringify({ event: "concierge_model_fail", model, errorCode: e.code }));',
  'console.error(JSON.stringify({ event: "concierge_model_fail", ...e }));',
];
for (const path of files) {
  const source = readFileSync(path, 'utf8');
  test(`${path}: approved logs and multiline formatting pass; unsafe mutations fail`, () => {
    assert.deepEqual(validateSource(source), []);
    assert.deepEqual(validateSource(source.replaceAll('console.error(JSON.stringify({ ', 'console.error(JSON.stringify({\n ')), []);
    for (const mutation of unsafe) assert.ok(validateSource(source + '\n' + mutation).length, mutation);
  });

  for (const mode of ['all-failed', 'next-model', 'claude-fallback', 'stream-break']) {
    test(`${path}: ${mode} preserves responses without exception content in logs`, async () => {
      const logs = [];
      let attempts = 0;
      let closed = 0;
      const error = new Error(sentinel);
      error.code = sentinel;
      error.cause = { secret: sentinel };
      // Catch logging must not even read a hostile provider message getter.
      Object.defineProperty(error, 'message', { get() { throw new Error('message was read'); } });
      const answer = 'Please describe your writing and coding needs so I can help choose a current subscription. Confirm the available plan and price with our team before making a payment. Thank you for asking.';
      const env = { NVIDIA_API_KEY: 'test-key', ANTHROPIC_API_KEY: 'test-fallback' };
      const context = vm.createContext({
        console: { log: (s) => logs.push(JSON.parse(s)), error: (s) => logs.push(JSON.parse(s)) },
        // Synthetic public-safe catalog: no build output or provider required.
        catalog: [{ name: 'Test Writing', path: '/product/test-writing', category: 'writing', tiers: [] }],
        policy: JSON.parse(readFileSync('artifacts/aips-landing/api/_policy.json')),
        process: { env }, crypto: { randomUUID: () => 'test-turn' }, randomUUID: () => 'test-turn',
        Response, Request, URL, ReadableStream, TextEncoder, AbortSignal,
        bindStore() {}, containsCredential: () => false,
        redact: (text) => ({ text, hits: [] }), logTurn: async () => {}, knowledgeFor: () => '', tokenMatches: () => false,
        fetch: async () => {
          if (mode !== 'claude-fallback') throw error;
          return { ok: true, json: async () => ({ content: [{ text: answer }] }) };
        },
        mockStream: async () => {
          attempts++;
          if (mode === 'all-failed' || mode === 'claude-fallback' || (mode === 'next-model' && attempts === 1)) throw error;
          return { first: answer, next: async () => { if (mode === 'stream-break') throw error; return null; }, done: () => closed++ };
        },
      });
      // Execute real handler/control flow; replace only imports and provider I/O.
      vm.runInContext(source.replace(/^import .*;\n/gm, '').replace('export default ', '').replace('export async ', 'async ') + '\nopenStream = mockStream;', context);
      const body = { sessionId: sentinel, messages: [{ role: 'user', content: 'Help with writing ' + sentinel }] };
      let status, output;
      if (path.startsWith('functions/')) {
        const response = await context.onRequest({ request: new Request('https://test.invalid/api/concierge', { method: 'POST', body: JSON.stringify(body) }), env });
        status = response.status;
        output = await response.text();
      } else {
        const chunks = [];
        const res = {
          writableEnded: false,
          status(n) { status = n; return this; },
          json(o) { output = JSON.stringify(o); return this; },
          writeHead(n) { status = n; }, write(s) { chunks.push(s); },
          end() { this.writableEnded = true; output = chunks.join(''); },
        };
        await context.handler({ method: 'POST', headers: {}, body }, res);
      }
      assert.equal(status, mode === 'all-failed' ? 502 : 200);
      assert.ok(!JSON.stringify(logs).includes(sentinel));
      if (mode === 'all-failed') {
        assert.equal(attempts, vm.runInContext('MODELS.length', context));
        assert.match(output, /Concierge is busy/);
        assert.equal(logs.filter((l) => l.errorCode === 'MODEL_FAILURE').length, attempts);
        assert.ok(logs.some((l) => l.errorCode === 'FALLBACK_FAILURE'));
      } else {
        const events = output.trim().split('\n\n').map((s) => JSON.parse(s.replace(/^data: /, '')));
        assert.equal(events[0].type, 'delta');
        assert.equal(events[0].v, answer);
        assert.equal(events.at(-1).type, 'done');
        assert.equal(events.at(-1).sessionId, sentinel);
        if (mode === 'stream-break') assert.ok(logs.some((l) => l.errorCode === 'STREAM_INTERRUPTED'));
        if (mode === 'claude-fallback') assert.ok(logs.some((l) => l.event === 'concierge_claude_fallback'));
        else assert.equal(closed, 1);
        if (mode === 'next-model') assert.equal(attempts, 2);
      }
      if (path.startsWith('functions/') && mode === 'all-failed') {
        const response = context.sseResponse(async () => { throw error; });
        assert.equal(await response.text(), '');
        assert.equal(logs.at(-1).errorCode, 'SSE_FAILURE');
      }
    });
  }
}
