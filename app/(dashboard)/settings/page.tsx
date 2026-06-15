"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profil");
  const [saved, setSaved] = useState(false);

  const [profil, setProfil] = useState({
    ime: "",
    email: "",
    kompanija: "",
    telefon: "",
    adresa: "",
  });

  const [lozinka, setLozinka] = useState({
    stara: "",
    nova: "",
    potvrda: "",
  });

  const [notifikacije, setNotifikacije] = useState({
    email: true,
    fakture: true,
    projekti: false,
    transakcije: true,
  });

  const handleSaveProfil = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveLozinka = async () => {
    if (lozinka.nova !== lozinka.potvrda) {
      alert("Lozinke se ne podudaraju!");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: lozinka.nova });
    if (!error) {
      setLozinka({ stara: "", nova: "", potvrda: "" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const tabs = ["profil", "lozinka", "notifikacije"];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Postavke</h1>
          <p style={styles.subtitle}>Upravljanje računom i preferencijama</p>
        </div>
      </div>

      {/* Tabovi */}
      <div style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {}),
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profil */}
      {activeTab === "profil" && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Informacije o profilu</h2>
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>Ime i prezime</label>
              <input
                type="text"
                value={profil.ime}
                onChange={(e) => setProfil({ ...profil, ime: e.target.value })}
                placeholder="Ime i prezime"
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={profil.email}
                onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                placeholder="email@kompanija.com"
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Kompanija</label>
              <input
                type="text"
                value={profil.kompanija}
                onChange={(e) => setProfil({ ...profil, kompanija: e.target.value })}
                placeholder="Naziv kompanije"
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Telefon</label>
              <input
                type="text"
                value={profil.telefon}
                onChange={(e) => setProfil({ ...profil, telefon: e.target.value })}
                placeholder="+387 ..."
                style={styles.input}
              />
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Adresa</label>
              <input
                type="text"
                value={profil.adresa}
                onChange={(e) => setProfil({ ...profil, adresa: e.target.value })}
                placeholder="Ulica, grad, država"
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.actions}>
            {saved && <span style={styles.savedMsg}>✓ Sačuvano!</span>}
            <button onClick={handleSaveProfil} style={styles.saveBtn}>
              Sačuvaj promjene
            </button>
          </div>
        </div>
      )}

      {/* Lozinka */}
      {activeTab === "lozinka" && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Promjena lozinke</h2>
          <div style={styles.formGrid}>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Nova lozinka</label>
              <input
                type="password"
                value={lozinka.nova}
                onChange={(e) => setLozinka({ ...lozinka, nova: e.target.value })}
                placeholder="••••••••"
                style={styles.input}
              />
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Potvrdi novu lozinku</label>
              <input
                type="password"
                value={lozinka.potvrda}
                onChange={(e) => setLozinka({ ...lozinka, potvrda: e.target.value })}
                placeholder="••••••••"
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.actions}>
            {saved && <span style={styles.savedMsg}>✓ Lozinka promijenjena!</span>}
            <button onClick={handleSaveLozinka} style={styles.saveBtn}>
              Promijeni lozinku
            </button>
          </div>
        </div>
      )}

      {/* Notifikacije */}
      {activeTab === "notifikacije" && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Notifikacije</h2>
          <div style={styles.toggleList}>
            {[
              { key: "email", label: "Email notifikacije", desc: "Primaj obavijesti putem emaila" },
              { key: "fakture", label: "Fakture", desc: "Obavijesti o novim i dospjelim fakturama" },
              { key: "projekti", label: "Projekti", desc: "Promjene statusa projekata" },
              { key: "transakcije", label: "Transakcije", desc: "Nove transakcije i plaćanja" },
            ].map((item) => (
              <div key={item.key} style={styles.toggleRow}>
                <div>
                  <p style={styles.toggleLabel}>{item.label}</p>
                  <p style={styles.toggleDesc}>{item.desc}</p>
                </div>
                <div
                  onClick={() => setNotifikacije({ ...notifikacije, [item.key]: !notifikacije[item.key as keyof typeof notifikacije] })}
                  style={{
                    ...styles.toggle,
                    background: notifikacije[item.key as keyof typeof notifikacije]
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      ...styles.toggleKnob,
                      transform: notifikacije[item.key as keyof typeof notifikacije]
                        ? "translateX(20px)"
                        : "translateX(2px)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={styles.actions}>
            {saved && <span style={styles.savedMsg}>✓ Sačuvano!</span>}
            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={styles.saveBtn}>
              Sačuvaj
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: "32px", maxWidth: "800px", fontFamily: "'Inter', sans-serif" },
  header: { marginBottom: "28px" },
  title: { fontSize: "24px", fontWeight: "700", color: "#ffffff", margin: 0 },
  subtitle: { color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: "4px 0 0" },
  tabs: { display: "flex", gap: "4px", marginBottom: "24px", background: "rgba(255,255,255,0.04)", padding: "4px", borderRadius: "10px", width: "fit-content" },
  tab: {
    background: "transparent", border: "none", borderRadius: "8px",
    padding: "8px 20px", color: "rgba(255,255,255,0.5)",
    fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
  },
  tabActive: {
    background: "rgba(255,255,255,0.1)", color: "#ffffff", fontWeight: "600",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "28px",
  },
  cardTitle: { color: "#fff", fontSize: "18px", fontWeight: "600", margin: "0 0 24px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: "500" },
  input: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px", padding: "10px 14px",
    color: "#ffffff", fontSize: "14px", outline: "none",
  },
  actions: { display: "flex", gap: "12px", justifyContent: "flex-end", alignItems: "center", marginTop: "24px" },
  savedMsg: { color: "#34d399", fontSize: "14px" },
  saveBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none", borderRadius: "8px", padding: "10px 24px",
    color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
  toggleList: { display: "flex", flexDirection: "column", gap: "0" },
  toggleRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  toggleLabel: { color: "#fff", fontSize: "14px", fontWeight: "500", margin: "0 0 4px" },
  toggleDesc: { color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 },
  toggle: {
    width: "44px", height: "24px", borderRadius: "12px",
    cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
  },
  toggleKnob: {
    position: "absolute", top: "2px",
    width: "20px", height: "20px",
    background: "#fff", borderRadius: "50%",
    transition: "transform 0.2s",
  },
};
