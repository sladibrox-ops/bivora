"use client";

import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({ tema: "", poruka: "" });
  const [poslano, setPoslano] = useState(false);

  const handleSend = () => {
    if (!form.tema || !form.poruka) return;
    setPoslano(true);
    setForm({ tema: "", poruka: "" });
    setTimeout(() => setPoslano(false), 3000);
  };

  const faq = [
    {
      pitanje: "Kako dodati novog klijenta?",
      odgovor: "Idite na stranicu Clients i kliknite '+ Novi klijent'. Popunite podatke i kliknite Spremi.",
    },
    {
      pitanje: "Kako kreirati fakturu?",
      odgovor: "Na stranici Invoices kliknite '+ Nova faktura', odaberite klijenta, dodajte stavke i kliknite Spremi.",
    },
    {
      pitanje: "Kako promijeniti lozinku?",
      odgovor: "Idite na Settings → Lozinka, unesite novu lozinku i kliknite Promijeni lozinku.",
    },
    {
      pitanje: "Kako dodati transakciju?",
      odgovor: "Na stranici Transactions kliknite '+ Nova transakcija', unesite iznos, tip (prihod/rashod) i opis.",
    },
    {
      pitanje: "Zašto se podaci ne učitavaju?",
      odgovor: "Provjerite internetsku vezu. Ako problem ostaje, kontaktirajte podršku putem forme ispod.",
    },
  ];

  const [otvoren, setOtvoren] = useState<number | null>(null);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Podrška</h1>
          <p style={styles.subtitle}>Pomoć i česta pitanja</p>
        </div>
      </div>

      {/* Kontakt kartice */}
      <div style={styles.kontaktRow}>
        <div style={styles.kontaktCard}>
          <span style={styles.kontaktIcon}>📧</span>
          <div>
            <p style={styles.kontaktNaslov}>Email podrška</p>
            <p style={styles.kontaktInfo}>podrska@bivora.app</p>
          </div>
        </div>
        <div style={styles.kontaktCard}>
          <span style={styles.kontaktIcon}>⏱</span>
          <div>
            <p style={styles.kontaktNaslov}>Radno vrijeme</p>
            <p style={styles.kontaktInfo}>Pon–Pet, 9:00–17:00</p>
          </div>
        </div>
        <div style={styles.kontaktCard}>
          <span style={styles.kontaktIcon}>⚡</span>
          <div>
            <p style={styles.kontaktNaslov}>Vrijeme odgovora</p>
            <p style={styles.kontaktInfo}>Do 24 sata</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Česta pitanja</h2>
        <div style={styles.faqList}>
          {faq.map((item, i) => (
            <div key={i} style={styles.faqItem}>
              <button
                onClick={() => setOtvoren(otvoren === i ? null : i)}
                style={styles.faqBtn}
              >
                <span style={styles.faqPitanje}>{item.pitanje}</span>
                <span style={styles.faqArrow}>{otvoren === i ? "▲" : "▼"}</span>
              </button>
              {otvoren === i && (
                <p style={styles.faqOdgovor}>{item.odgovor}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Forma */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Pošaljite poruku</h2>
        <div style={styles.card}>
          {poslano ? (
            <div style={styles.uspjeh}>
              <span style={styles.uspjehIcon}>✓</span>
              <p style={styles.uspjehTekst}>Poruka je poslana! Odgovorit ćemo u roku od 24 sata.</p>
            </div>
          ) : (
            <>
              <div style={styles.field}>
                <label style={styles.label}>Tema</label>
                <input
                  type="text"
                  value={form.tema}
                  onChange={(e) => setForm({ ...form, tema: e.target.value })}
                  placeholder="O čemu se radi?"
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Poruka</label>
                <textarea
                  value={form.poruka}
                  onChange={(e) => setForm({ ...form, poruka: e.target.value })}
                  placeholder="Opišite vaš problem ili pitanje..."
                  rows={5}
                  style={{ ...styles.input, resize: "vertical" as const }}
                />
              </div>
              <div style={styles.actions}>
                <button onClick={handleSend} style={styles.sendBtn}>
                  Pošalji poruku
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: "32px", maxWidth: "800px", fontFamily: "'Inter', sans-serif" },
  header: { marginBottom: "28px" },
  title: { fontSize: "24px", fontWeight: "700", color: "#ffffff", margin: 0 },
  subtitle: { color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: "4px 0 0" },
  kontaktRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" },
  kontaktCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "20px",
    display: "flex", alignItems: "center", gap: "16px",
  },
  kontaktIcon: { fontSize: "24px" },
  kontaktNaslov: { color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "0 0 4px", textTransform: "uppercase" as const, letterSpacing: "0.5px" },
  kontaktInfo: { color: "#fff", fontSize: "14px", fontWeight: "500", margin: 0 },
  section: { marginBottom: "32px" },
  sectionTitle: { color: "#fff", fontSize: "18px", fontWeight: "600", margin: "0 0 16px" },
  faqList: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", overflow: "hidden",
  },
  faqItem: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
  faqBtn: {
    width: "100%", background: "transparent", border: "none",
    padding: "18px 20px", display: "flex", justifyContent: "space-between",
    alignItems: "center", cursor: "pointer", gap: "16px",
  },
  faqPitanje: { color: "#fff", fontSize: "14px", fontWeight: "500", textAlign: "left" as const },
  faqArrow: { color: "rgba(255,255,255,0.4)", fontSize: "12px", flexShrink: 0 },
  faqOdgovor: {
    color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.6",
    margin: 0, padding: "0 20px 18px",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "24px",
    display: "flex", flexDirection: "column", gap: "16px",
  },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: "500" },
  input: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px", padding: "10px 14px",
    color: "#ffffff", fontSize: "14px", outline: "none",
    fontFamily: "'Inter', sans-serif",
  },
  actions: { display: "flex", justifyContent: "flex-end" },
  sendBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none", borderRadius: "8px", padding: "10px 24px",
    color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
  uspjeh: {
    display: "flex", alignItems: "center", gap: "16px",
    padding: "24px", justifyContent: "center",
  },
  uspjehIcon: {
    width: "40px", height: "40px", borderRadius: "50%",
    background: "rgba(52,211,153,0.15)", color: "#34d399",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px", lineHeight: "40px", textAlign: "center",
  },
  uspjehTekst: { color: "#34d399", fontSize: "15px", margin: 0 },
};
