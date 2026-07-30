import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Bot } from "lucide-react";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20need%20help%20choosing%20an%20AI%20subscription";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_PROMPTS = [
  "৫০০ টাকার মধ্যে কোন AI নিব?",
  "Best AI for freelancing?",
  "bKash diye kivabe kinbo?",
];

// Turn site paths and wa.me URLs inside a reply into clickable links.
function linkify(text: string) {
  const parts = text.split(/(https:\/\/wa\.me\/\S+|\/(?:product\/|blog\/)?[a-z0-9][a-z0-9-]{3,}(?:-bangladesh|\b))/g);
  return parts.map((part, i) => {
    if (/^https:\/\/wa\.me\//.test(part)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#25d366" }}>WhatsApp</a>;
    }
    if (/^\/(?:product\/|blog\/)?[a-z0-9-]+/.test(part) && part.length > 5) {
      return <a key={i} href={part} className="underline" style={{ color: "#f4b942" }}>{part}</a>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    setFailed(false);
    try {
      const r = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await r.json();
      if (!r.ok || !data.reply) throw new Error(data.error || "no reply");
      setMsgs([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher — stacked directly above the FloatingWhatsApp bubble (same right-edge
          alignment, fixed gap) so the two never overlap at any viewport width. Also
          clears the mobile order bar (StickyMobileBar), which sits lower still. */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed z-50 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        style={{ backgroundColor: "#f4b942", width: 52, height: 52, right: 24, bottom: 152 }}
      >
        {open ? <X className="w-6 h-6" style={{ color: "#0a0e27" }} /> : <Bot className="w-6 h-6" style={{ color: "#0a0e27" }} />}
      </button>

      {open && (
        <div
          className="fixed z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          style={{ backgroundColor: "#0f1430", height: "min(560px, 70vh)", right: 24, bottom: 216 }}
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2" style={{ backgroundColor: "#151b3d" }}>
            <Bot className="w-5 h-5" style={{ color: "#f4b942" }} />
            <div className="flex-1">
              <div className="text-sm font-bold text-white">AIPS AI Assistant</div>
              <div className="text-[11px]" style={{ color: "#8b93a7" }}>Answers from our catalog · ordering on WhatsApp</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {msgs.length === 0 && (
              <div className="space-y-2">
                <div className="text-sm rounded-xl px-3 py-2 max-w-[85%]" style={{ backgroundColor: "#151b3d", color: "#c9ceda" }}>
                  👋 আসসালামু আলাইকুম! কোন AI টুল দরকার, বাজেট কত — বলুন, ক্যাটালগ থেকে মিলিয়ে দিচ্ছি।
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((q) => (
                    <button key={q} onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition-colors"
                      style={{ color: "#f4b942" }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className="text-sm rounded-xl px-3 py-2 max-w-[85%] whitespace-pre-wrap leading-relaxed"
                  style={m.role === "user" ? { backgroundColor: "#f4b942", color: "#0a0e27" } : { backgroundColor: "#151b3d", color: "#e5e9f2" }}>
                  {m.role === "assistant" ? linkify(m.content) : m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="text-sm rounded-xl px-3 py-2 inline-block" style={{ backgroundColor: "#151b3d", color: "#8b93a7" }}>
                লিখছি…
              </div>
            )}
            {failed && (
              <div className="text-sm rounded-xl px-3 py-2" style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#fca5a5" }}>
                এই মুহূর্তে উত্তর দিতে পারছি না —{" "}
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="underline font-semibold" style={{ color: "#25d366" }}>
                  WhatsApp-এ মেসেজ করুন
                </a>
                , সাথে সাথে রিপ্লাই পাবেন।
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="প্রশ্ন লিখুন…"
                aria-label="Ask the AI assistant"
                className="flex-1 text-sm rounded-xl px-3 py-2 border border-white/15 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:border-white/35"
              />
              <button onClick={() => send(input)} disabled={busy || !input.trim()} aria-label="Send"
                className="px-3 rounded-xl disabled:opacity-40" style={{ backgroundColor: "#f4b942" }}>
                <Send className="w-4 h-4" style={{ color: "#0a0e27" }} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px]" style={{ color: "#64748b" }}>AI answers can err — prices on product pages are final.</span>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="text-[11px] font-semibold flex items-center gap-1" style={{ color: "#25d366" }}>
                <MessageCircle className="w-3 h-3" /> Human help
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
