import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, Bot, RotateCcw, ArrowUpRight, ShieldCheck, ThumbsUp, ThumbsDown } from "lucide-react";
import { useLocation } from "wouter";

const WHATSAPP_FALLBACK = "https://wa.me/8801865385348?text=Hi%2C%20I%20need%20help%20choosing%20an%20AI%20subscription";
const STORE_KEY = "aips.concierge.v2";
const SESSION_KEY = "aips.concierge.sid";

// Identifies a browser tab so multi-turn conversations stay stitched together
// in the log. Deliberately random and per-session: it is not tied to a person,
// survives no longer than the tab, and nothing about the customer is derived
// from it.
function sessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

/** A card the server built from the catalog. Prices here are catalog truth —
 *  never a number the language model typed into its prose. */
type Product = {
  name: string;
  path: string;
  category: string;
  fromPrice: number | null;
  tierName: string | null;
  accessType: string | null;
  deliverySLA: string | null;
  badge: string | null;
  tierCount: number;
};

type Msg = {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
  turnId?: string;
  feedback?: 1 | -1;
};

const OPENERS = [
  "৫০০ টাকার মধ্যে কোন AI নিব?",
  "Best AI for coding?",
  "bKash diye kivabe kinbo?",
];

const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;

const CATEGORY_LABEL: Record<string, string> = {
  "ai-assistant": "AI Assistant",
  "ai-image": "Image & Design",
  "ai-video": "Video",
  "ai-voice-music": "Voice & Music",
  "ai-code": "Code",
  "ai-workspace": "Workspace",
  "ai-writing": "Writing",
  "ai-design": "Design",
  bundles: "Bundle",
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The model is told to write bare page paths so the server can resolve cards
 *  from them. Left as-is they read as noise ("Dekhun /claude-pro-bangladesh"),
 *  and simply deleting them strands the sentence ("Dekhun  ar ."). So: drop the
 *  path where it's a parenthetical after the name, and elsewhere swap it for
 *  the product's name as a link. */
function renderBody(text: string, products: Product[] | undefined, onOpen: (path: string) => void) {
  if (!products?.length) return text;

  const paths = products.map((p) => p.path).sort((a, b) => b.length - a.length);
  const alternation = paths.map(escapeRe).join("|");

  // "ChatGPT Plus (/chatgpt-plus-bangladesh)" -> "ChatGPT Plus"
  const cleaned = text
    .replace(new RegExp(`\\s*[([]\\s*(?:${alternation})\\s*[)\\]]`, "g"), "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  const parts = cleaned.split(new RegExp(`(${alternation})`, "g"));
  return parts.map((part, i) => {
    const hit = products.find((p) => p.path === part);
    if (!hit) return <span key={i}>{part}</span>;
    return (
      <button
        key={i}
        onClick={() => onOpen(hit.path)}
        className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
        style={{ color: "#f4b942" }}
      >
        {hit.name}
      </button>
    );
  });
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (path: string) => void }) {
  const meta = [
    product.tierName,
    product.accessType === "shared" ? "shared" : product.accessType === "personal" ? "personal" : null,
    product.deliverySLA,
  ].filter(Boolean);

  return (
    <button
      onClick={() => onOpen(product.path)}
      className="group w-full text-left rounded-xl border border-white/10 hover:border-[#f4b942]/50 transition-colors p-3"
      style={{ backgroundColor: "#11172f" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-white truncate">{product.name}</span>
            {product.badge && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "rgba(244,185,66,0.16)", color: "#f4b942" }}
              >
                {product.badge}
              </span>
            )}
          </div>
          <div className="text-[11px] mt-0.5 truncate" style={{ color: "#8b93a7" }}>
            {CATEGORY_LABEL[product.category] ?? product.category}
            {meta.length > 0 && ` · ${meta.join(" · ")}`}
          </div>
        </div>
        <ArrowUpRight
          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ color: "#f4b942" }}
        />
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        {product.fromPrice != null ? (
          <>
            <span className="text-[10px]" style={{ color: "#8b93a7" }}>from</span>
            <span className="text-sm font-bold" style={{ color: "#f4b942" }}>
              {taka(product.fromPrice)}
            </span>
            <span className="text-[10px]" style={{ color: "#8b93a7" }}>/mo</span>
          </>
        ) : (
          <span className="text-[11px]" style={{ color: "#8b93a7" }}>
            price on WhatsApp
          </span>
        )}
        {product.tierCount > 1 && (
          <span className="text-[10px] ml-auto" style={{ color: "#64748b" }}>
            {product.tierCount} plans
          </span>
        )}
      </div>
    </button>
  );
}

export function ConciergeWidget() {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [streaming, setStreaming] = useState("");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastFailedText, setLastFailedText] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [whatsapp, setWhatsapp] = useState(WHATSAPP_FALLBACK);

  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasOpenedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  // Restore an in-progress conversation across navigations — the widget
  // unmounts on every route change, and losing the thread mid-decision was
  // the fastest way to send someone back to square one.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Array.isArray(saved?.msgs)) setMsgs(saved.msgs);
      if (Array.isArray(saved?.suggestions)) setSuggestions(saved.suggestions);
      if (typeof saved?.whatsapp === "string") setWhatsapp(saved.whatsapp);
    } catch {
      /* corrupt or unavailable storage is not worth surfacing */
    }
  }, []);

  useEffect(() => {
    if (!msgs.length) return;
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ msgs, suggestions, whatsapp }));
    } catch {
      /* quota or private mode — the chat still works in memory */
    }
  }, [msgs, suggestions, whatsapp]);

  // Only autoscroll when the reader is already at the bottom, so scrolling up
  // to re-read an earlier recommendation isn't yanked away by new tokens.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (nearBottom) endRef.current?.scrollIntoView({ behavior: streaming ? "auto" : "smooth" });
  }, [msgs, streaming, busy]);

  // Skip on mount — only move focus on an actual open/close transition, never
  // steal focus from the page on first render (open starts false).
  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      inputRef.current?.focus();
    } else if (hasOpenedRef.current) {
      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const openProduct = useCallback(
    (path: string) => {
      navigate(path);
      setOpen(false);
    },
    [navigate],
  );

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;

      const next: Msg[] = [...msgs, { role: "user", content }];
      setMsgs(next);
      setInput("");
      setBusy(true);
      setErrorMsg(null);
      setLastFailedText(null);
      setSuggestions([]);
      setStreaming("");

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const r = await fetch("/api/concierge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionId(),
            messages: next.slice(-10).map(({ role, content: c }) => ({ role, content: c })),
          }),
          signal: ctrl.signal,
        });

        // Every failure path upstream answers JSON, not a stream, so a
        // non-SSE content type here means the request never got a model.
        if (!r.ok || !r.body || !r.headers.get("content-type")?.includes("text/event-stream")) {
          const data = await r.json().catch(() => ({}));
          throw new Error(data.error || "no reply");
        }

        const reader = r.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        let full = "";
        let products: Product[] = [];
        let turnId: string | undefined;

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const frames = buf.split("\n\n");
          buf = frames.pop() ?? "";
          for (const frame of frames) {
            const line = frame.split("\n").find((l) => l.startsWith("data:"));
            if (!line) continue;
            let evt: { type?: string; v?: string; products?: Product[]; suggestions?: string[]; whatsapp?: string; turnId?: string };
            try {
              evt = JSON.parse(line.slice(5).trim());
            } catch {
              continue;
            }
            if (evt.type === "delta" && evt.v) {
              full += evt.v;
              setStreaming(full);
            } else if (evt.type === "done") {
              products = evt.products ?? [];
              turnId = evt.turnId;
              setSuggestions(evt.suggestions ?? []);
              if (evt.whatsapp) setWhatsapp(evt.whatsapp);
            }
          }
        }

        if (!full.trim()) throw new Error("no reply");
        setMsgs([...next, { role: "assistant", content: full.trim(), products, turnId }]);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setErrorMsg(describeError(e));
        setLastFailedText(content);
      } finally {
        setStreaming("");
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, msgs],
  );

  function describeError(e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    return msg === "Too many messages — please continue on WhatsApp"
      ? "একটু বেশি প্রশ্ন হয়ে গেছে — সরাসরি WhatsApp-এ চালিয়ে যান।"
      : "এই মুহূর্তে উত্তর দিতে পারছি না";
  }

  // Fire-and-forget: the click is acknowledged optimistically in the UI. A
  // failed rating is not worth interrupting a conversation to report.
  const rate = useCallback((turnId: string, value: 1 | -1) => {
    setMsgs((prev) => prev.map((m) => (m.turnId === turnId ? { ...m, feedback: value } : m)));
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ turnId, value }),
    }).catch(() => {});
  }, []);

  function reset() {
    abortRef.current?.abort();
    setMsgs([]);
    setStreaming("");
    setSuggestions([]);
    setErrorMsg(null);
    setWhatsapp(WHATSAPP_FALLBACK);
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    inputRef.current?.focus();
  }

  const chips = msgs.length === 0 ? OPENERS : suggestions;
  // The panel sits above the launcher (bottom 152 + 52 tall + gap). Capping
  // the height against the viewport keeps it from running off the top of the
  // screen on short phones, where a flat 70vh used to overflow.
  const panelStyle = useMemo(
    () => ({ backgroundColor: "#0f1430", height: "min(560px, calc(100vh - 248px))", right: 24, bottom: 216 }),
    [],
  );

  return (
    <>
      {/* Launcher — stacked directly above the FloatingWhatsApp bubble (same right-edge
          alignment, fixed gap) so the two never overlap at any viewport width. Also
          clears the fixed mobile order bar in App.tsx (MobileOrderBar, h-14), which
          sits lower still. */}
      <button
        ref={launcherRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        aria-controls="concierge-panel"
        className="fixed z-50 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        style={{ backgroundColor: "#f4b942", width: 52, height: 52, right: 24, bottom: 152 }}
      >
        {open ? <X className="w-6 h-6" style={{ color: "#0a0e27" }} /> : <Bot className="w-6 h-6" style={{ color: "#0a0e27" }} />}
      </button>

      {open && (
        <div
          id="concierge-panel"
          role="dialog"
          aria-modal="true"
          aria-label="AIPS AI Assistant chat"
          className="fixed z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          style={panelStyle}
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2" style={{ backgroundColor: "#151b3d" }}>
            <Bot className="w-5 h-5 flex-shrink-0" style={{ color: "#f4b942" }} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white">AIPS AI Assistant</div>
              <div className="text-[11px] truncate" style={{ color: "#8b93a7" }}>
                Answers from our catalog · ordering on WhatsApp
              </div>
            </div>
            {msgs.length > 0 && (
              <button
                onClick={reset}
                aria-label="Start a new conversation"
                title="New conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" style={{ color: "#8b93a7" }} />
              </button>
            )}
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3" aria-live="polite" aria-atomic="false">
            {msgs.length === 0 && (
              <div className="text-sm rounded-xl px-3 py-2 max-w-[90%]" style={{ backgroundColor: "#151b3d", color: "#c9ceda" }}>
                👋 আসসালামু আলাইকুম! কোন AI টুল দরকার, বাজেট কত — বলুন, ক্যাটালগ থেকে মিলিয়ে দিচ্ছি।
              </div>
            )}

            {msgs.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className="text-sm rounded-xl px-3 py-2 max-w-[90%] whitespace-pre-wrap leading-relaxed"
                    style={
                      m.role === "user"
                        ? { backgroundColor: "#f4b942", color: "#0a0e27" }
                        : { backgroundColor: "#151b3d", color: "#e5e9f2" }
                    }
                  >
                    {m.role === "assistant" ? renderBody(m.content, m.products, openProduct) : m.content}
                  </div>
                </div>
                {m.products && m.products.length > 0 && (
                  <div className="space-y-2">
                    {m.products.map((p) => (
                      <ProductCard key={p.path} product={p} onOpen={openProduct} />
                    ))}
                  </div>
                )}
                {m.role === "assistant" && m.turnId && (
                  <div className="flex items-center gap-1 pl-1">
                    {m.feedback ? (
                      <span className="text-[10px]" style={{ color: "#64748b" }}>
                        {m.feedback === 1 ? "ধন্যবাদ! 🙏" : "দুঃখিত — WhatsApp-এ জিজ্ঞেস করলে মানুষ উত্তর দেবে।"}
                      </span>
                    ) : (
                      <>
                        <span className="text-[10px] mr-1" style={{ color: "#64748b" }}>
                          সাহায্য হলো?
                        </span>
                        <button
                          onClick={() => rate(m.turnId!, 1)}
                          aria-label="This answer was helpful"
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" style={{ color: "#8b93a7" }} />
                        </button>
                        <button
                          onClick={() => rate(m.turnId!, -1)}
                          aria-label="This answer was not helpful"
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                        >
                          <ThumbsDown className="w-3 h-3" style={{ color: "#8b93a7" }} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {streaming && (
              <div className="flex justify-start">
                <div
                  className="text-sm rounded-xl px-3 py-2 max-w-[90%] whitespace-pre-wrap leading-relaxed"
                  style={{ backgroundColor: "#151b3d", color: "#e5e9f2" }}
                >
                  {streaming}
                  <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle animate-pulse" style={{ backgroundColor: "#f4b942" }} />
                </div>
              </div>
            )}

            {busy && !streaming && (
              <div className="text-sm rounded-xl px-3 py-2 inline-flex items-center gap-1.5" style={{ backgroundColor: "#151b3d", color: "#8b93a7" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "#8b93a7", animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "#8b93a7", animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "#8b93a7", animationDelay: "300ms" }} />
              </div>
            )}

            {errorMsg && (
              <div className="text-sm rounded-xl px-3 py-2" style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#fca5a5" }}>
                {errorMsg} —{" "}
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="underline font-semibold" style={{ color: "#25d366" }}>
                  WhatsApp-এ মেসেজ করুন
                </a>
                , সাথে সাথে রিপ্লাই পাবেন।
                {lastFailedText && (
                  <>
                    {" "}
                    <button onClick={() => send(lastFailedText)} className="underline font-semibold" style={{ color: "#f4b942" }}>
                      আবার চেষ্টা করুন
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Once something has been recommended, the WhatsApp link carries
                those exact tools and prices — the customer arrives at sales
                with context instead of retyping the conversation. */}
            {!busy && msgs.some((m) => m.products?.length) && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#25d366", color: "#fff" }}
              >
                <MessageCircle className="w-4 h-4" />
                এগুলো নিয়ে WhatsApp-এ অর্ডার করুন
              </a>
            )}

            {!busy && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {chips.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors text-left"
                    style={{ color: "#f4b942" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="প্রশ্ন লিখুন…"
                aria-label="Ask the AI assistant"
                className="flex-1 text-sm rounded-xl px-3 py-2 border border-white/15 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-white/35"
              />
              <button
                onClick={() => send(input)}
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="px-3 rounded-xl disabled:opacity-40"
                style={{ backgroundColor: "#f4b942" }}
              >
                <Send className="w-4 h-4" style={{ color: "#0a0e27" }} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[10px] flex items-center gap-1 min-w-0" style={{ color: "#64748b" }}>
                <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">Never share a PIN or OTP. Prices on product pages are final.</span>
              </span>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold flex items-center gap-1 flex-shrink-0"
                style={{ color: "#25d366" }}
              >
                <MessageCircle className="w-3 h-3" /> Human
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
