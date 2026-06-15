"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Project = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  client_id: string;
  status: string;
  deadline: string;
  budget: number;
};

const statusColors: Record<string, { bg: string; color: string }> = {
  "u tijeku": { bg: "rgba(99,102,241,0.15)", color: "#6366f1" },
  "završeno": { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
  "na čekanju": { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
  "otkazano": { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    client_id: "",
    status: "u tijeku",
    deadline: "",
    budget: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setProjects(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    await supabase.from("projects").insert([
      {
        name: form.name,
        description: form.description,
        client_id: form.client_id || null,
        status: form.status,
        deadline: form.deadline || null,
        budget: form.budget ? parseFloat(form.budget) : null,
      },
    ]);
    setForm({ name: "", description: "", client_id: "", status: "u tijeku", deadline: "", budget: "" });
    setShowForm(false);
    setSaving(false);
    fetchProjects();
  };

  const handleDelete = async (id: number) => {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const ukupno = projects.length;
  const uTijeku = projects.filter((p) => p.status === "u tijeku").length;
  const zavrseno = projects.filter((p) => p.status === "završeno").length;
  const ukupniBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Projekti</h1>
          <p style={styles.subtitle}>Upravljanje projektima i rokovima</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
          + Novi projekt
        </button>
      </div>

      {/* KPI */}
      <div style={styles.kpiRow}>
        <div style={styles.kpi}>
          <span style={styles.kpiLabel}>Ukupno projekata</span>
          <span style={styles.kpiValue}>{ukupno}</span>
        </div>
        <div style={{ ...styles.kpi, borderColor: "#6366f1" }}>
          <span style={styles.kpiLabel}>U tijeku</span>
          <span style={{ ...styles.kpiValue, color: "#6366f1" }}>{uTijeku}</span>
        </div>
        <div style={{ ...styles.kpi, borderColor: "#34d399" }}>
          <span style={styles.kpiLabel}>Završeno</span>
          <span style={{ ...styles.kpiValue, color: "#34d399" }}>{zavrseno}</span>
        </div>
        <div style={{ ...styles.kpi, borderColor: "#8b5cf6" }}>
          <span style={styles.kpiLabel}>Ukupni budžet</span>
          <span style={{ ...styles.kpiValue, color: "#8b5cf6" }}>
            {ukupniBudget.toLocaleString("hr-HR", { minimumFractionDigits: 2 })} €
          </span>
        </div>
      </div>

      {/* Forma */}
      {showForm && (
        <div style={styles.form}>
          <h3 style={styles.formTitle}>Novi projekt</h3>
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>Naziv projekta *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Naziv projekta..."
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                style={styles.input}
              >
                <option value="u tijeku">U tijeku</option>
                <option value="na čekanju">Na čekanju</option>
                <option value="završeno">Završeno</option>
                <option value="otkazano">Otkazano</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Rok (deadline)</label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Budžet (€)</label>
              <input
                type="number"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                placeholder="0.00"
                style={styles.input}
              />
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Opis</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Kratki opis projekta..."
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.formActions}>
            <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>Odustani</button>
            <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
              {saving ? "Sprema..." : "Spremi"}
            </button>
          </div>
        </div>
      )}

      {/* Kartice projekata */}
      {loading ? (
        <p style={styles.empty}>Učitavanje...</p>
      ) : projects.length === 0 ? (
        <p style={styles.empty}>Nema projekata. Dodajte prvi!</p>
      ) : (
        <div style={styles.grid}>
          {projects.map((p) => {
            const sc = statusColors[p.status] || { bg: "rgba(255,255,255,0.1)", color: "#fff" };
            return (
              <div key={p.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{p.name}</h3>
                  <span style={{ ...styles.badge, background: sc.bg, color: sc.color }}>
                    {p.status}
                  </span>
                </div>
                {p.description && (
                  <p style={styles.cardDesc}>{p.description}</p>
                )}
                <div style={styles.cardMeta}>
                  {p.deadline && (
                    <span style={styles.metaItem}>📅 {p.deadline}</span>
                  )}
                  {p.budget && (
                    <span style={styles.metaItem}>
                      💰 {p.budget.toLocaleString("hr-HR", { minimumFractionDigits: 2 })} €
                    </span>
                  )}
                </div>
                <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>
                  Obriši
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: "32px", maxWidth: "1100px", fontFamily: "'Inter', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" },
  title: { fontSize: "24px", fontWeight: "700", color: "#ffffff", margin: 0 },
  subtitle: { color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: "4px 0 0" },
  addBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none", borderRadius: "8px", padding: "10px 20px",
    color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
  kpiRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" },
  kpi: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "20px 24px",
    display: "flex", flexDirection: "column", gap: "8px",
  },
  kpiLabel: { color: "rgba(255,255,255,0.5)", fontSize: "13px" },
  kpiValue: { fontSize: "24px", fontWeight: "700", color: "#fff" },
  form: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "24px", marginBottom: "24px",
  },
  formTitle: { color: "#fff", fontSize: "16px", fontWeight: "600", margin: "0 0 20px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: "500" },
  input: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px", padding: "10px 14px",
    color: "#ffffff", fontSize: "14px", outline: "none",
  },
  formActions: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "20px" },
  cancelBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px", padding: "10px 20px",
    color: "rgba(255,255,255,0.7)", fontSize: "14px", cursor: "pointer",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none", borderRadius: "8px", padding: "10px 20px",
    color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "20px",
    display: "flex", flexDirection: "column", gap: "12px",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" },
  cardTitle: { color: "#fff", fontSize: "16px", fontWeight: "600", margin: 0 },
  cardDesc: { color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: 0 },
  cardMeta: { display: "flex", gap: "16px", flexWrap: "wrap" as const },
  metaItem: { color: "rgba(255,255,255,0.4)", fontSize: "13px" },
  badge: { padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "500", whiteSpace: "nowrap" as const },
  deleteBtn: {
    background: "rgba(248,113,113,0.1)",
    border: "1px solid rgba(248,113,113,0.2)",
    borderRadius: "6px", padding: "6px 12px",
    color: "#f87171", fontSize: "12px", cursor: "pointer",
    alignSelf: "flex-start" as const,
  },
  empty: { color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "48px", fontSize: "14px" },
};
