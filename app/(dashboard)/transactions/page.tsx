"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Transaction = {
  id: number;
  created_at: string;
  amount: number;
  type: string;
  description: string;
  client_id: string;
  date: string;
  status: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    type: "prihod",
    description: "",
    client_id: "",
    date: new Date().toISOString().split("T")[0],
    status: "završeno",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });
    setTransactions(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.amount || !form.description) return;
    setSaving(true);
    await supabase.from("transactions").insert([
      {
        amount: parseFloat(form.amount),
        type: form.type,
        description: form.description,
        client_id: form.client_id || null,
        date: form.date,
        status: form.status,
      },
    ]);
    setForm({
      amount: "",
      type: "prihod",
      description: "",
      client_id: "",
      date: new Date().toISOString().split("T")[0],
      status: "završeno",
    });
    setShowForm(false);
    setSaving(false);
    fetchTransactions();
  };

  const handleDelete = async (id: number) => {
    await supabase.from("transactions").delete().eq("id", id);
    fetchTransactions();
  };

  const totalPrihod = transactions
    .filter((t) => t.type === "prihod")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalRashod = transactions
    .filter((t) => t.type === "rashod")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const saldo = totalPrihod - totalRashod;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Transakcije</h1>
          <p style={styles.subtitle}>Pregled prihoda i rashoda</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
          + Nova transakcija
        </button>
      </div>

      {/* KPI kartice */}
      <div style={styles.kpiRow}>
        <div style={{ ...styles.kpi, borderColor: "#6366f1" }}>
          <span style={styles.kpiLabel}>Ukupni prihodi</span>
          <span style={{ ...styles.kpiValue, color: "#6366f1" }}>
            {totalPrihod.toLocaleString("hr-HR", { minimumFractionDigits: 2 })} €
          </span>
        </div>
        <div style={{ ...styles.kpi, borderColor: "#f87171" }}>
          <span style={styles.kpiLabel}>Ukupni rashodi</span>
          <span style={{ ...styles.kpiValue, color: "#f87171" }}>
            {totalRashod.toLocaleString("hr-HR", { minimumFractionDigits: 2 })} €
          </span>
        </div>
        <div style={{ ...styles.kpi, borderColor: saldo >= 0 ? "#34d399" : "#f87171" }}>
          <span style={styles.kpiLabel}>Saldo</span>
          <span style={{ ...styles.kpiValue, color: saldo >= 0 ? "#34d399" : "#f87171" }}>
            {saldo.toLocaleString("hr-HR", { minimumFractionDigits: 2 })} €
          </span>
        </div>
      </div>

      {/* Forma za novu transakciju */}
      {showForm && (
        <div style={styles.form}>
          <h3 style={styles.formTitle}>Nova transakcija</h3>
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>Iznos (€)</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Tip</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={styles.input}
              >
                <option value="prihod">Prihod</option>
                <option value="rashod">Rashod</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Datum</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                <option value="završeno">Završeno</option>
                <option value="na čekanju">Na čekanju</option>
                <option value="otkazano">Otkazano</option>
              </select>
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Opis</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Opis transakcije..."
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.formActions}>
            <button onClick={() => setShowForm(false)} style={styles.cancelBtn}>
              Odustani
            </button>
            <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
              {saving ? "Sprema..." : "Spremi"}
            </button>
          </div>
        </div>
      )}

      {/* Tabela */}
      <div style={styles.tableWrap}>
        {loading ? (
          <p style={styles.empty}>Učitavanje...</p>
        ) : transactions.length === 0 ? (
          <p style={styles.empty}>Nema transakcija. Dodajte prvu!</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {["Datum", "Opis", "Tip", "Iznos", "Status", ""].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} style={styles.tr}>
                  <td style={styles.td}>{t.date || "—"}</td>
                  <td style={styles.td}>{t.description}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: t.type === "prihod" ? "rgba(99,102,241,0.15)" : "rgba(248,113,113,0.15)",
                      color: t.type === "prihod" ? "#6366f1" : "#f87171",
                    }}>
                      {t.type}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: 600, color: t.type === "prihod" ? "#6366f1" : "#f87171" }}>
                    {t.type === "rashod" ? "-" : "+"}{(t.amount || 0).toLocaleString("hr-HR", { minimumFractionDigits: 2 })} €
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: t.status === "završeno" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                      color: t.status === "završeno" ? "#34d399" : "#fbbf24",
                    }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleDelete(t.id)} style={styles.deleteBtn}>
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "32px",
    maxWidth: "1100px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  subtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "14px",
    margin: "4px 0 0",
  },
  addBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  kpiRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "28px",
  },
  kpi: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderRadius: "12px",
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  kpiLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "13px",
  },
  kpiValue: {
    fontSize: "24px",
    fontWeight: "700",
  },
  form: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
  },
  formTitle: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 20px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "13px",
    fontWeight: "500",
  },
  input: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  },
  formActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  cancelBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "10px 20px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  tableWrap: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "14px 20px",
    textAlign: "left" as const,
    color: "rgba(255,255,255,0.4)",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  td: {
    padding: "14px 20px",
    color: "rgba(255,255,255,0.8)",
    fontSize: "14px",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
  deleteBtn: {
    background: "rgba(248,113,113,0.1)",
    border: "1px solid rgba(248,113,113,0.2)",
    borderRadius: "6px",
    padding: "4px 10px",
    color: "#f87171",
    fontSize: "12px",
    cursor: "pointer",
  },
  empty: {
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    padding: "48px",
    fontSize: "14px",
  },
};
