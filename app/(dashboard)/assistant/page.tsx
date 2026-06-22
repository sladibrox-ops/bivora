"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Zdravo! Ja sam BIVORA AI asistent. Mogu vam pomoći s pitanjima o poslovanju, financijama, klijentima i upravljanju projektima. Kako vam mogu pomoći danas?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await response.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.content?.[0]?.text || "Žao mi je, došlo je do greške. Pokušajte ponovo.",
      };
      setMessages([...newMessages, assistantMsg]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Greška u komunikaciji. Provjerite vezu i pokušajte ponovo." },
      ]);
    }

    setLoading(false);
  };

  const brziUpiti = [
    "Kako povećati prihode?",
    "Savjeti za upravljanje projektima",
    "Kako pratiti cashflow?",
    "Strategija za nove klijente",
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>AI Asistent</h1>
          <p style={styles.subtitle}>Vaš poslovni savjetnik na zahtjev</p>
        </div>
        <div style={styles.statusBadge}>
          <span style={styles.statusDot} />
          Aktivan
        </div>
      </div>

      {/* Chat prozor */}
      <div style={styles.chatWrap}>
        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.msgRow,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "assistant" && (
                <div style={styles.avatar}>B</div>
              )}
              <div
                style={{
                  ...styles.bubble,
                  ...(msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant),
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
              <div style={styles.avatar}>B</div>
              <div style={styles.bubbleAssistant}>
                <span style={styles.typing}>●●●</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Brzi upiti */}
        {messages.length === 1 && (
          <div style={styles.brziRow}>
            {brziUpiti.map((upit, i) => (
              <button
                key={i}
                onClick={() => setInput(upit)}
                style={styles.brziBtn}
              >
                {upit}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={styles.inputRow}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Postavite pitanje..."
            style={styles.input}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              ...styles.sendBtn,
              opacity: loading || !input.trim() ? 0.5 : 1,
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: "32px", maxWidth: "800px", fontFamily: "'Inter', sans-serif", height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" },
  title: { fontSize: "24px", fontWeight: "700", color: "#ffffff", margin: 0 },
  subtitle: { color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: "4px 0 0" },
  statusBadge: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
    borderRadius: "20px", padding: "6px 14px",
    color: "#34d399", fontSize: "13px", fontWeight: "500",
  },
  statusDot: {
    width: "8px", height: "8px", borderRadius: "50%", background: "#34d399",
  },
  chatWrap: {
    flex: 1, display: "flex", flexDirection: "column",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px", overflow: "hidden",
  },
  messages: {
    flex: 1, overflowY: "auto" as const, padding: "24px",
    display: "flex", flexDirection: "column", gap: "16px",
  },
  msgRow: { display: "flex", alignItems: "flex-end", gap: "10px" },
  avatar: {
    width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: "14px", fontWeight: "700",
  },
  bubble: {
    maxWidth: "70%", padding: "12px 16px", borderRadius: "12px",
    fontSize: "14px", lineHeight: "1.6",
  },
  bubbleUser: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff", borderBottomRightRadius: "4px",
  },
  bubbleAssistant: {
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.85)", borderBottomLeftRadius: "4px",
  },
  typing: { color: "rgba(255,255,255,0.4)", letterSpacing: "2px" },
  brziRow: {
    display: "flex", flexWrap: "wrap" as const, gap: "8px",
    padding: "0 24px 16px",
  },
  brziBtn: {
    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "20px", padding: "8px 14px",
    color: "#a5b4fc", fontSize: "13px", cursor: "pointer",
  },
  inputRow: {
    display: "flex", gap: "12px", padding: "16px 20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  input: {
    flex: 1, background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px", padding: "12px 16px",
    color: "#fff", fontSize: "14px", outline: "none",
  },
  sendBtn: {
    width: "44px", height: "44px", borderRadius: "10px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none", color: "#fff", fontSize: "16px",
  },
};
