import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ═══════════════════════════════════════════════════
// BIVORA v4.0 — Real App with Login & Database
// ═══════════════════════════════════════════════════

const SUPABASE_URL = "https://vatpamgquglzxruittgg.supabase.co";
const SUPABASE_KEY = "sb_publishable_YRY1NJB3QNqRgVz64X1jdA_DTFftPrL";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LANGS = {
  hr:{n:"Hrvatski",f:"🇭🇷"},en:{n:"English",f:"🇬🇧"},
  de:{n:"Deutsch",f:"🇩🇪"},fr:{n:"Français",f:"🇫🇷"},
  es:{n:"Español",f:"🇪🇸"},it:{n:"Italiano",f:"🇮🇹"},
};

const TL = {
  hr:{dashboard:"Nadzorna ploča",clients:"Kupci",invoices:"Fakture",projects:"Projekti",hr:"Zaposlenici",transactions:"Transakcije",reports:"Izvještaji",ai:"AI Asistent",login:"Prijava",register:"Registracija",logout:"Odjava",email:"Email",password:"Lozinka",name:"Naziv",welcome:"Dobrodošli u BIVORA",loginDesc:"Prijavite se u svoju poslovnu platformu",registerDesc:"Kreirajte svoj BIVORA račun",noAccount:"Nemate račun?",hasAccount:"Već imate račun?",signIn:"Prijavi se",signUp:"Registriraj se",loading:"Učitavanje...",error:"Greška",success:"Uspješno",income:"Prihod",expense:"Rashod",balance:"Bilanca",total:"Ukupno",add:"Dodaj",save:"Spremi",cancel:"Odustani",delete:"Obriši",search:"Pretraži...",months:["Sij","Velj","Ožu","Tra","Svi","Lip","Srp","Kol","Ruj","Lis","Stu","Pro"]},
  en:{dashboard:"Dashboard",clients:"Clients",invoices:"Invoices",projects:"Projects",hr:"Employees",transactions:"Transactions",reports:"Reports",ai:"AI Assistant",login:"Login",register:"Register",logout:"Logout",email:"Email",password:"Password",name:"Name",welcome:"Welcome to BIVORA",loginDesc:"Sign in to your business platform",registerDesc:"Create your BIVORA account",noAccount:"Don't have an account?",hasAccount:"Already have an account?",signIn:"Sign In",signUp:"Sign Up",loading:"Loading...",error:"Error",success:"Success",income:"Income",expense:"Expense",balance:"Balance",total:"Total",add:"Add",save:"Save",cancel:"Cancel",delete:"Delete",search:"Search...",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},
  de:{dashboard:"Dashboard",clients:"Kunden",invoices:"Rechnungen",projects:"Projekte",hr:"Mitarbeiter",transactions:"Transaktionen",reports:"Berichte",ai:"KI-Assistent",login:"Anmeldung",register:"Registrierung",logout:"Abmelden",email:"E-Mail",password:"Passwort",name:"Name",welcome:"Willkommen bei BIVORA",loginDesc:"Melden Sie sich bei Ihrer Unternehmensplattform an",registerDesc:"Erstellen Sie Ihr BIVORA-Konto",noAccount:"Kein Konto?",hasAccount:"Bereits ein Konto?",signIn:"Anmelden",signUp:"Registrieren",loading:"Laden...",error:"Fehler",success:"Erfolg",income:"Einnahmen",expense:"Ausgaben",balance:"Saldo",total:"Gesamt",add:"Hinzufügen",save:"Speichern",cancel:"Abbrechen",delete:"Löschen",search:"Suchen...",months:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]},
  fr:{dashboard:"Tableau de bord",clients:"Clients",invoices:"Factures",projects:"Projets",hr:"Employés",transactions:"Transactions",reports:"Rapports",ai:"Assistant IA",login:"Connexion",register:"Inscription",logout:"Déconnexion",email:"E-mail",password:"Mot de passe",name:"Nom",welcome:"Bienvenue sur BIVORA",loginDesc:"Connectez-vous à votre plateforme professionnelle",registerDesc:"Créez votre compte BIVORA",noAccount:"Pas de compte?",hasAccount:"Déjà un compte?",signIn:"Se connecter",signUp:"S'inscrire",loading:"Chargement...",error:"Erreur",success:"Succès",income:"Revenu",expense:"Dépense",balance:"Solde",total:"Total",add:"Ajouter",save:"Enregistrer",cancel:"Annuler",delete:"Supprimer",search:"Rechercher...",months:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"]},
  es:{dashboard:"Panel",clients:"Clientes",invoices:"Facturas",projects:"Proyectos",hr:"Empleados",transactions:"Transacciones",reports:"Informes",ai:"Asistente IA",login:"Iniciar sesión",register:"Registrarse",logout:"Cerrar sesión",email:"Correo",password:"Contraseña",name:"Nombre",welcome:"Bienvenido a BIVORA",loginDesc:"Inicie sesión en su plataforma empresarial",registerDesc:"Cree su cuenta BIVORA",noAccount:"¿No tiene cuenta?",hasAccount:"¿Ya tiene cuenta?",signIn:"Iniciar sesión",signUp:"Registrarse",loading:"Cargando...",error:"Error",success:"Éxito",income:"Ingreso",expense:"Gasto",balance:"Saldo",total:"Total",add:"Añadir",save:"Guardar",cancel:"Cancelar",delete:"Eliminar",search:"Buscar...",months:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]},
  it:{dashboard:"Dashboard",clients:"Clienti",invoices:"Fatture",projects:"Progetti",hr:"Dipendenti",transactions:"Transazioni",reports:"Report",ai:"Assistente IA",login:"Accesso",register:"Registrazione",logout:"Disconnetti",email:"Email",password:"Password",name:"Nome",welcome:"Benvenuto in BIVORA",loginDesc:"Accedi alla tua piattaforma aziendale",registerDesc:"Crea il tuo account BIVORA",noAccount:"Non hai un account?",hasAccount:"Hai già un account?",signIn:"Accedi",signUp:"Registrati",loading:"Caricamento...",error:"Errore",success:"Successo",income:"Entrata",expense:"Spesa",balance:"Saldo",total:"Totale",add:"Aggiungi",save:"Salva",cancel:"Annulla",delete:"Elimina",search:"Cerca...",months:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"]},
};

export default function Bivora() {
  const [lang, setLang] = useState("hr");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [screen, setScreen] = useState("dashboard");
  const [showL, setShowL] = useState(false);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState(null);
  const [aiMsgs, setAiMsgs] = useState([]);
  const [aiIn, setAiIn] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiRef = useRef(null);

  const t = TL[lang] || TL.hr;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    const { data: c } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    const { data: i } = await supabase.from("invoices").select("*").order("created_at", { ascending: false });
    const { data: tx } = await supabase.from("transactions").select("*").order("created_at", { ascending: false });
    if (c) setClients(c);
    if (i) setInvoices(i);
    if (tx) setTransactions(tx);
  };

  const showToast = (msg, tp) => { setToast({ msg, tp: tp || "ok" }); setTimeout(() => setToast(null), 2500); };

  const handleLogin = async () => {
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleRegister = async () => {
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { company_name: companyName } }
    });
    if (error) setAuthError(error.message);
    else { setAuthError(""); showToast("Registracija uspješna! Provjerite email."); setAuthMode("login"); }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClients([]); setInvoices([]); setTransactions([]);
  };

  const addClient = async (name, email, city) => {
    const { data, error } = await supabase.from("clients").insert([{ name, email, city, user_id: user.id, status: "active", value: 0 }]).select();
    if (!error && data) { setClients(p => [data[0], ...p]); showToast(t.save + " ✓"); }
    else showToast(error?.message || "Greška", "err");
  };

  const addTransaction = async (desc, amount, type) => {
    const { data, error } = await supabase.from("transactions").insert([{ description: desc, amount: +amount, type, user_id: user.id, date: new Date().toLocaleDateString("hr"), category: type === "income" ? t.income : t.expense }]).select();
    if (!error && data) { setTransactions(p => [data[0], ...p]); showToast(t.save + " ✓"); }
    else showToast(error?.message || "Greška", "err");
  };

  const totalIn = transactions.filter(x => x.type === "income").reduce((a, x) => a + (x.amount || 0), 0);
  const totalEx = transactions.filter(x => x.type === "expense").reduce((a, x) => a + (x.amount || 0), 0);
  const bal = totalIn - totalEx;

  const sendAI = async () => {
    if (!aiIn.trim() || aiLoading) return;
    const msg = aiIn;
    setAiMsgs(p => [...p, { role: "user", text: msg }]);
    setAiIn(""); setAiLoading(true);
    const ctx = `You are BIVORA AI. User: ${user?.email}. Data: ${clients.length} clients, income: ${totalIn}€, expenses: ${totalEx}€, balance: ${bal}€. Reply in ${lang === "hr" ? "Croatian" : lang === "de" ? "German" : lang === "fr" ? "French" : lang === "es" ? "Spanish" : lang === "it" ? "Italian" : "English"}.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, system: ctx, messages: [{ role: "user", content: msg }] }) });
      const d = await res.json();
      setAiMsgs(p => [...p, { role: "ai", text: d.content?.[0]?.text || "Greška." }]);
    } catch { setAiMsgs(p => [...p, { role: "ai", text: "Greška." }]); }
    setAiLoading(false);
    setTimeout(() => { if (aiRef.current) aiRef.current.scrollTop = 99999; }, 100);
  };

  const inp = { width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "11px 14px", color: "#f8fafc", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Outfit',sans-serif" };
  const card = { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: 20 };

  const NAV = [
    { id: "dashboard", icon: "⬛", label: t.dashboard },
    { id: "clients", icon: "🏢", label: t.clients },
    { id: "invoices", icon: "🧾", label: t.invoices },
    { id: "transactions", icon: "💳", label: t.transactions },
    { id: "reports", icon: "📊", label: t.reports },
    { id: "ai", icon: "🤖", label: t.ai },
  ];

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#070b12", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, fontWeight: 900, background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 12 }}>BIVORA</div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>{t.loading}</div>
      </div>
    </div>
  );

  // ── AUTH SCREEN ──
  if (!user) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#070b12 0%,#0d1520 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif", padding: 16 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap'); @keyframes fi{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade{animation:fi .4s ease both} input{font-family:'Outfit',sans-serif}`}</style>
      <div className="fade" style={{ maxWidth: 420, width: "100%" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "white", margin: "0 auto 14px" }}>B</div>
          <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>BIVORA</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}>{authMode === "login" ? t.loginDesc : t.registerDesc}</div>
        </div>

        {/* Lang */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
          {Object.entries(LANGS).map(([code, l]) => (
            <button key={code} onClick={() => setLang(code)} style={{ background: lang === code ? "rgba(37,99,235,.3)" : "rgba(255,255,255,.05)", border: "1px solid " + (lang === code ? "#2563eb" : "rgba(255,255,255,.1)"), borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 12, color: lang === code ? "#60a5fa" : "rgba(255,255,255,.4)", fontFamily: "'Outfit',sans-serif" }}>
              {l.f} {l.n}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {authMode === "register" && (
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 6 }}>{t.name} firme</div>
                <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="BIVORA d.o.o." style={inp} />
              </div>
            )}
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 6 }}>{t.email}</div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="firma@email.com" style={inp} onKeyDown={e => e.key === "Enter" && (authMode === "login" ? handleLogin() : handleRegister())} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 6 }}>{t.password}</div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inp} onKeyDown={e => e.key === "Enter" && (authMode === "login" ? handleLogin() : handleRegister())} />
            </div>
            {authError && <div style={{ background: "#ef444422", border: "1px solid #ef444444", borderRadius: 9, padding: "9px 13px", fontSize: 13, color: "#ef4444" }}>{authError}</div>}
            <button onClick={authMode === "login" ? handleLogin : handleRegister} disabled={authLoading} style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", color: "white", padding: "13px", borderRadius: 11, cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "'Outfit',sans-serif", opacity: authLoading ? 0.7 : 1, marginTop: 4 }}>
              {authLoading ? t.loading : authMode === "login" ? t.signIn : t.signUp}
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "rgba(255,255,255,.4)" }}>
            {authMode === "login" ? t.noAccount : t.hasAccount}{" "}
            <button onClick={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(""); }} style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: 13, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>
              {authMode === "login" ? t.signUp : t.signIn}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "rgba(255,255,255,.2)" }}>
          BIVORA Business Suite · bivora.app
        </div>
      </div>
    </div>
  );

  // ── MAIN APP ──
  return (
    <div style={{ minHeight: "100vh", background: "#070b12", fontFamily: "'Outfit',sans-serif", color: "#f8fafc" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'); @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} @keyframes su{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @keyframes dot{0%,100%{opacity:1}50%{opacity:0.3}} .fade{animation:fi .3s ease both} .nb:hover{background:rgba(255,255,255,.07)!important} .nb{transition:background .15s;cursor:pointer} .hrow:hover{background:rgba(255,255,255,.04)!important;cursor:pointer} .hrow{transition:background .12s} input,select{font-family:'Outfit',sans-serif} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}`}</style>

      {toast && <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: toast.tp === "err" ? "#dc2626" : "#16a34a", color: "white", padding: "11px 20px", borderRadius: 11, fontSize: 13, fontWeight: 600, animation: "su .3s ease both" }}>{toast.msg}</div>}

      {/* SIDEBAR */}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 200, background: "#050810", borderRight: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", zIndex: 100 }}>
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, flexShrink: 0 }}>B</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: ".06em", color: "#f1f5f9" }}>BIVORA</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.2)", letterSpacing: ".12em", textTransform: "uppercase" }}>Business Suite</div>
          </div>
        </div>

        {/* User info */}
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 2 }}>{user?.user_metadata?.company_name || "Firma"}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</div>
        </div>

        <nav style={{ padding: "6px 5px", flex: 1 }}>
          {NAV.map(item => (
            <button key={item.id} className="nb" onClick={() => setScreen(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 7, padding: "8px 10px", borderRadius: 8, border: "none", background: screen === item.id ? "rgba(37,99,235,.15)" : "transparent", color: screen === item.id ? "#60a5fa" : "rgba(255,255,255,.35)", fontSize: 12, fontWeight: screen === item.id ? 600 : 400, textAlign: "left", fontFamily: "'Outfit',sans-serif", marginBottom: 1 }}>
              <span style={{ fontSize: 12 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "8px 8px 12px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowL(v => !v)} style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 7, padding: "6px 9px", color: "rgba(255,255,255,.35)", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'Outfit',sans-serif" }}>
              <span>{LANGS[lang]?.f}</span><span style={{ flex: 1, textAlign: "left" }}>{LANGS[lang]?.n}</span><span style={{ fontSize: 8 }}>▼</span>
            </button>
            {showL && (
              <div style={{ position: "absolute", bottom: "100%", left: 0, right: 0, background: "#0d1520", border: "1px solid rgba(255,255,255,.1)", borderRadius: 9, zIndex: 999, marginBottom: 3 }}>
                {Object.entries(LANGS).map(([code, l]) => (
                  <div key={code} onClick={() => { setLang(code); setShowL(false); }} style={{ padding: "6px 10px", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 6, background: lang === code ? "rgba(37,99,235,.15)" : "transparent", color: lang === code ? "#60a5fa" : "rgba(255,255,255,.4)" }}>
                    <span>{l.f}</span><span>{l.n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleLogout} style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", color: "#ef4444", padding: "7px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontFamily: "'Outfit',sans-serif" }}>{t.logout}</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft: 200, padding: "28px", minHeight: "100vh" }}>

        {/* DASHBOARD */}
        {screen === "dashboard" && (
          <div className="fade">
            <div style={{ marginBottom: 22 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 3px" }}>{t.dashboard}</h1>
              <p style={{ color: "rgba(255,255,255,.35)", margin: 0, fontSize: 13 }}>Dobrodošli, {user?.user_metadata?.company_name || user?.email}! 👋</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginBottom: 20 }}>
              {[
                { l: t.income, v: totalIn.toLocaleString() + "€", i: "💰", c: "#22c55e" },
                { l: t.expense, v: totalEx.toLocaleString() + "€", i: "💸", c: "#ef4444" },
                { l: t.balance, v: bal.toLocaleString() + "€", i: "📊", c: bal >= 0 ? "#22c55e" : "#ef4444" },
                { l: t.clients, v: clients.length, i: "🏢", c: "#3b82f6" },
              ].map((k, i) => (
                <div key={i} style={{ ...card, borderColor: k.c + "22" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k.l}</div><span style={{ fontSize: 16 }}>{k.i}</span></div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: k.c, fontFamily: "'JetBrains Mono',monospace" }}>{k.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={card}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Zadnje transakcije</div>
                {transactions.slice(0, 5).map(tx => (
                  <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: tx.type === "income" ? "#22c55e22" : "#ef444422", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{tx.type === "income" ? "↗" : "↙"}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500 }}>{tx.description}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>{tx.date}</div></div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: tx.type === "income" ? "#22c55e" : "#ef4444", fontFamily: "monospace" }}>{tx.type === "income" ? "+" : "-"}{tx.amount}€</div>
                  </div>
                ))}
                {transactions.length === 0 && <div style={{ fontSize: 12, color: "rgba(255,255,255,.2)", textAlign: "center", padding: "16px 0" }}>Nema transakcija još</div>}
              </div>
              <div style={card}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{t.clients}</div>
                {clients.slice(0, 5).map(c => (
                  <div key={c.id} className="hrow" style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,.05)", borderRadius: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(37,99,235,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#60a5fa", flexShrink: 0 }}>{c.name?.slice(0, 2).toUpperCase()}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500 }}>{c.name}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>{c.city || c.email}</div></div>
                  </div>
                ))}
                {clients.length === 0 && <div style={{ fontSize: 12, color: "rgba(255,255,255,.2)", textAlign: "center", padding: "16px 0" }}>Nema kupaca još</div>}
              </div>
            </div>
          </div>
        )}

        {/* CLIENTS */}
        {screen === "clients" && (
          <div className="fade">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 2px" }}>{t.clients}</h1><p style={{ color: "rgba(255,255,255,.35)", margin: 0, fontSize: 13 }}>{clients.length} kupaca</p></div>
            </div>
            <AddClientForm onAdd={addClient} t={t} inp={inp} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {clients.map(c => (
                <div key={c.id} className="hrow" style={{ ...card, display: "flex", alignItems: "center", gap: 13 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(37,99,235,.15)", border: "1px solid rgba(37,99,235,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#60a5fa", flexShrink: 0 }}>{c.name?.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{c.name}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>{c.email} · {c.city}</div></div>
                  <span style={{ background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44", borderRadius: 6, padding: "2px 9px", fontSize: 11, fontWeight: 600 }}>Aktivan</span>
                </div>
              ))}
              {clients.length === 0 && <div style={{ ...card, textAlign: "center", padding: "32px", color: "rgba(255,255,255,.3)" }}>Nema kupaca još — dodaj prvog! 👆</div>}
            </div>
          </div>
        )}

        {/* TRANSACTIONS */}
        {screen === "transactions" && (
          <div className="fade">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 2px" }}>{t.transactions}</h1><p style={{ color: "rgba(255,255,255,.35)", margin: 0, fontSize: 13 }}>{t.balance}: <span style={{ color: bal >= 0 ? "#22c55e" : "#ef4444", fontWeight: 600 }}>{bal.toLocaleString()}€</span></p></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
              <div style={{ ...card, border: "1px solid #22c55e22", textAlign: "center" }}><div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{t.income}</div><div style={{ fontSize: 22, fontWeight: 700, color: "#22c55e", fontFamily: "monospace" }}>+{totalIn.toLocaleString()}€</div></div>
              <div style={{ ...card, border: "1px solid #ef444422", textAlign: "center" }}><div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{t.expense}</div><div style={{ fontSize: 22, fontWeight: 700, color: "#ef4444", fontFamily: "monospace" }}>-{totalEx.toLocaleString()}€</div></div>
            </div>
            <AddTransactionForm onAdd={addTransaction} t={t} inp={inp} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              {transactions.map(tx => (
                <div key={tx.id} className="hrow" style={{ ...card, display: "flex", alignItems: "center", gap: 11 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: tx.type === "income" ? "#22c55e22" : "#ef444422", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{tx.type === "income" ? "↗" : "↙"}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{tx.description}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>{tx.date} · {tx.category}</div></div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: tx.type === "income" ? "#22c55e" : "#ef4444", fontFamily: "monospace" }}>{tx.type === "income" ? "+" : "-"}{tx.amount}€</div>
                </div>
              ))}
              {transactions.length === 0 && <div style={{ ...card, textAlign: "center", padding: "32px", color: "rgba(255,255,255,.3)" }}>Nema transakcija još — dodaj prvu! 👆</div>}
            </div>
          </div>
        )}

        {/* INVOICES */}
        {screen === "invoices" && (
          <div className="fade">
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px" }}>{t.invoices}</h1>
            <div style={{ ...card, textAlign: "center", padding: "48px", color: "rgba(255,255,255,.3)" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🧾</div>
              <div style={{ fontSize: 14 }}>Modul faktura dolazi uskoro!</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>Koristite Transakcije za praćenje prihoda.</div>
            </div>
          </div>
        )}

        {/* REPORTS */}
        {screen === "reports" && (
          <div className="fade">
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px" }}>{t.reports}</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 13 }}>
              {[
                { l: t.income, v: totalIn.toLocaleString() + "€", c: "#22c55e" },
                { l: t.expense, v: totalEx.toLocaleString() + "€", c: "#ef4444" },
                { l: t.balance, v: bal.toLocaleString() + "€", c: bal >= 0 ? "#22c55e" : "#ef4444" },
                { l: t.clients, v: clients.length, c: "#3b82f6" },
                { l: "Transakcije", v: transactions.length, c: "#8b5cf6" },
                { l: "Prihodi/Rashodi", v: totalEx > 0 ? Math.round((totalIn / totalEx) * 100) + "%" : "—", c: "#f59e0b" },
              ].map((s, i) => (
                <div key={i} style={{ ...card, border: "1px solid " + s.c + "22" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{s.l}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: s.c, fontFamily: "monospace" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI */}
        {screen === "ai" && (
          <div className="fade" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px)" }}>
            <div style={{ marginBottom: 14, flexShrink: 0 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 3px" }}>{t.ai}</h1>
              <p style={{ color: "rgba(255,255,255,.35)", margin: 0, fontSize: 13 }}>Powered by Claude</p>
            </div>
            <div style={{ display: "flex", gap: 7, marginBottom: 12, flexWrap: "wrap", flexShrink: 0 }}>
              {["Kakvo je financijsko stanje?", "Koliko kupaca imam?", "Analiziraj moje prihode", "Što preporučuješ?"].map((p, i) => (
                <button key={i} onClick={() => setAiIn(p)} style={{ background: "rgba(37,99,235,.1)", border: "1px solid rgba(37,99,235,.2)", color: "#60a5fa", padding: "5px 11px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontFamily: "'Outfit',sans-serif" }}>{p}</button>
              ))}
            </div>
            <div ref={aiRef} style={{ flex: 1, overflowY: "auto", ...card, marginBottom: 12, display: "flex", flexDirection: "column", gap: 11, padding: 14 }}>
              {aiMsgs.length === 0 && (
                <div style={{ textAlign: "center", padding: "24px 16px" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🤖</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f8fafc", marginBottom: 6 }}>{t.ai}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)", maxWidth: 340, margin: "0 auto" }}>Analiziram tvoje podatke u realnom vremenu. Pitaj me bilo što!</div>
                </div>
              )}
              {aiMsgs.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 9, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "ai" && <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>🤖</div>}
                  <div style={{ maxWidth: "75%", background: m.role === "user" ? "rgba(37,99,235,.2)" : "rgba(255,255,255,.04)", border: "1px solid " + (m.role === "user" ? "rgba(37,99,235,.3)" : "rgba(255,255,255,.07)"), borderRadius: 10, padding: "10px 13px", fontSize: 13, lineHeight: 1.7, color: m.role === "user" ? "#93c5fd" : "rgba(255,255,255,.8)", whiteSpace: "pre-wrap" }}>{m.text}</div>
                  {m.role === "user" && <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(37,99,235,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, fontWeight: 700, color: "#60a5fa" }}>👤</div>}
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex", gap: 9 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🤖</div>
                  <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: "10px 13px", display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", animation: "dot 1.2s ease-in-out " + (i * 0.2) + "s infinite" }} />)}
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <input value={aiIn} onChange={e => setAiIn(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) sendAI(); }} placeholder="Pitaj AI o svom poslovanju..." style={{ ...inp, flex: 1, borderRadius: 10, padding: "11px 14px" }} />
              <button onClick={sendAI} disabled={aiLoading} style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", color: "white", padding: "11px 22px", borderRadius: 10, cursor: "pointer", fontSize: 16, opacity: aiLoading ? 0.6 : 1 }}>→</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function AddClientForm({ onAdd, t, inp }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (!name) return;
    onAdd(name, email, city);
    setName(""); setEmail(""); setCity(""); setOpen(false);
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", color: "white", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>+ {t.add}</button>
  );

  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 18, marginBottom: 4 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
        {[["name", t.name + " *", name, setName], ["email", t.email, email, setEmail], ["city", "Grad", city, setCity]].map(([k, l, v, sv]) => (
          <div key={k}><div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 4 }}>{l}</div><input value={v} onChange={e => sv(e.target.value)} style={inp} /></div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", padding: "8px 16px", borderRadius: 9, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>{t.cancel}</button>
        <button onClick={handleAdd} style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", color: "white", padding: "8px 20px", borderRadius: 9, cursor: "pointer", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>{t.save}</button>
      </div>
    </div>
  );
}

function AddTransactionForm({ onAdd, t, inp }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (!desc || !amount) return;
    onAdd(desc, amount, type);
    setDesc(""); setAmount(""); setType("income"); setOpen(false);
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", color: "white", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>+ {t.add}</button>
  );

  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 18, marginBottom: 4 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div><div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 4 }}>Opis *</div><input value={desc} onChange={e => setDesc(e.target.value)} style={inp} /></div>
        <div><div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 4 }}>Iznos (€) *</div><input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={inp} /></div>
        <div><div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 4 }}>Vrsta</div>
          <select value={type} onChange={e => setType(e.target.value)} style={{ ...inp }}>
            <option value="income">💰 {t.income}</option>
            <option value="expense">💸 {t.expense}</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", padding: "8px 16px", borderRadius: 9, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>{t.cancel}</button>
        <button onClick={handleAdd} style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", color: "white", padding: "8px 20px", borderRadius: 9, cursor: "pointer", fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>{t.save}</button>
      </div>
    </div>
  );
}
