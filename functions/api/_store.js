// Durable conversation log for the AI Concierge (Neon Postgres).
// Cloudflare Pages Functions port of artifacts/aips-landing/api/_store.js.
//
// Changes vs the Vercel original:
// - Environment is read from the request-scoped bindings passed via
//   bindStore(env) instead of process.env (Workers has no process.env).
//   A guarded process.env fallback remains for local Node tooling.
// Everything else — the no-op degradation contract, the redaction
// hand-off and the schema — is identical.
//
// 1. THE CHAT MUST NEVER BREAK BECAUSE OF LOGGING. The database is optional.
// 2. NOTHING UNREDACTED IS WRITTEN. Callers pass text through api/_redact.js
//    first. This module does not see raw customer input by design.

let sqlPromise = null;
let schemaReady = false;
let envRef = null;

/** Request-scoped bindings. Called by each handler at the top of onRequest. */
export function bindStore(env) {
  if (env && typeof env === "object") envRef = env;
}

// Native Neon integrations commonly expose DATABASE_URL; migrated Vercel
// Postgres projects may still expose POSTGRES_URL, so keep both during the
// transition without requiring an environment-variable cutover.
function getConnectionString() {
  const env = envRef ?? {};
  if (typeof env.DATABASE_URL === "string" && env.DATABASE_URL) return env.DATABASE_URL;
  if (typeof env.POSTGRES_URL === "string" && env.POSTGRES_URL) return env.POSTGRES_URL;
  if (typeof process !== "undefined" && process?.env) {
    return process.env.DATABASE_URL || process.env.POSTGRES_URL || null;
  }
  return null;
}

/** Lazily resolves the driver. Returns null when logging is not configured. */
async function getSql() {
  const connectionString = getConnectionString();
  if (!connectionString) return null;
  if (!sqlPromise) {
    sqlPromise = import("@neondatabase/serverless")
      .then(({ neon }) => neon(connectionString, { fullResults: true }))
      .catch((e) => {
        console.error(JSON.stringify({ event: "store_driver_missing", error: String(e.message || e).slice(0, 120) }));
        return null;
      });
  }
  return sqlPromise;
}

export function storeEnabled() {
  return !!getConnectionString();
}

async function ensureSchema(sql) {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS chat_turns (
      id          TEXT PRIMARY KEY,
      session_id  TEXT NOT NULL,
      turn        INT  NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      question    TEXT,
      reply       TEXT,
      intent      JSONB,
      retrieved   TEXT[],
      cards       TEXT[],
      unmatched   TEXT[],
      model       TEXT,
      latency_ms  INT,
      punted      BOOLEAN DEFAULT false,
      redactions  INT DEFAULT 0,
      feedback    SMALLINT
    )`;
  await sql`CREATE INDEX IF NOT EXISTS chat_turns_created_idx ON chat_turns (created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS chat_turns_session_idx ON chat_turns (session_id)`;
  schemaReady = true;
}

/**
 * Records one question/answer exchange. Never throws.
 */
export async function logTurn(rec) {
  try {
    const sql = await getSql();
    if (!sql) return null;
    await ensureSchema(sql);
    await sql`
      INSERT INTO chat_turns
        (id, session_id, turn, question, reply, intent, retrieved, cards, unmatched, model, latency_ms, punted, redactions)
      VALUES
        (${rec.id}, ${rec.sessionId}, ${rec.turn}, ${rec.question}, ${rec.reply}, ${JSON.stringify(rec.intent ?? {})},
         ${rec.retrieved ?? []}, ${rec.cards ?? []}, ${rec.unmatched ?? []}, ${rec.model},
         ${rec.latencyMs}, ${rec.punted ?? false}, ${rec.redactions ?? 0})
      ON CONFLICT (id) DO NOTHING`;
    return rec.id;
  } catch (e) {
    console.error(JSON.stringify({ event: "store_write_failed", error: String(e.message || e).slice(0, 150) }));
    return null;
  }
}

/** Attaches a thumbs up/down to a previously logged turn. Never throws. */
export async function saveFeedback(turnId, value) {
  try {
    const sql = await getSql();
    if (!sql) return false;
    await ensureSchema(sql);
    await sql`UPDATE chat_turns SET feedback = ${value} WHERE id = ${turnId}`;
    return true;
  } catch (e) {
    console.error(JSON.stringify({ event: "store_feedback_failed", error: String(e.message || e).slice(0, 150) }));
    return false;
  }
}

/**
 * The improvement loop. Each query below answers a specific "where is the
 * assistant failing?" question, so the output is a work list rather than a
 * dashboard to admire.
 */
export async function buildInsights(days = 14) {
  const sql = await getSql();
  if (!sql) return null;
  await ensureSchema(sql);
  const since = `${days} days`;

  const [volume, gaps, unmatched, punts, negative, topProducts] = await Promise.all([
    sql`SELECT count(*)::int AS turns, count(DISTINCT session_id)::int AS sessions,
               round(avg(latency_ms))::int AS avg_latency_ms,
               sum(redactions)::int AS redactions
        FROM chat_turns WHERE created_at > now() - ${since}::interval`,

    sql`SELECT question, count(*)::int AS n
        FROM chat_turns
        WHERE created_at > now() - ${since}::interval
          AND cardinality(cards) = 0 AND NOT punted
        GROUP BY question ORDER BY n DESC LIMIT 25`,

    sql`SELECT term, count(*)::int AS n
        FROM chat_turns, unnest(unmatched) AS term
        WHERE created_at > now() - ${since}::interval
        GROUP BY term HAVING count(*) > 1 ORDER BY n DESC LIMIT 40`,

    sql`SELECT question, count(*)::int AS n
        FROM chat_turns
        WHERE created_at > now() - ${since}::interval AND punted
        GROUP BY question ORDER BY n DESC LIMIT 25`,

    sql`SELECT question, reply, created_at
        FROM chat_turns
        WHERE created_at > now() - ${since}::interval AND feedback = -1
        ORDER BY created_at DESC LIMIT 25`,

    sql`SELECT p AS product, count(*)::int AS n
        FROM chat_turns, unnest(cards) AS p
        WHERE created_at > now() - ${since}::interval
        GROUP BY p ORDER BY n DESC LIMIT 20`,
  ]);

  const v = volume.rows[0] ?? {};
  return {
    windowDays: days,
    volume: v,
    deadEndRate: v.turns ? Number((gaps.rows.reduce((a, r) => a + r.n, 0) / v.turns).toFixed(3)) : null,
    noProductMatched: gaps.rows,
    missingSynonyms: unmatched.rows,
    punted: punts.rows,
    thumbsDown: negative.rows,
    topRecommended: topProducts.rows,
  };
}
