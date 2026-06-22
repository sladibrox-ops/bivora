"use client";

import { useState } from "react";

type Lang = "hr" | "en" | "de";

export default function PrivacyPage() {
  const [lang, setLang] = useState<Lang>("hr");

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.brandRow}>
            <div style={styles.logo}>B</div>
            <div>
              <div style={styles.brandName}>BIVORA</div>
              <div style={styles.brandSub}>Business Suite</div>
            </div>
          </div>

          <div style={styles.langSwitch}>
            {(["hr", "en", "de"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  ...styles.langBtn,
                  ...(lang === l ? styles.langBtnActive : {}),
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.content}>{content[lang]}</div>

        <div style={styles.footer}>
          <span style={styles.footerText}>
            {footerText[lang]}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Content blocks ---------- */

const footerText: Record<Lang, string> = {
  hr: "© 2026 goodID team d.o.o. Sva prava pridržana.",
  en: "© 2026 goodID team d.o.o. All rights reserved.",
  de: "© 2026 goodID team d.o.o. Alle Rechte vorbehalten.",
};

const content: Record<Lang, JSX.Element> = {
  hr: (
    <>
      <h1 style={styles.title}>Pravila privatnosti i Uvjeti korištenja</h1>
      <p style={styles.updated}>Posljednje ažurirano: 22. lipnja 2026.</p>

      <Section title="1. Uvod">
        <p style={styles.p}>
          BIVORA je poslovna platforma za upravljanje klijentima, projektima,
          fakturama i financijama koju razvija i pruža goodID team d.o.o.,
          Brčko (&quot;mi&quot;, &quot;nas&quot;). Korištenjem aplikacije BIVORA
          (web i mobilna verzija) prihvaćate ova Pravila privatnosti i Uvjete
          korištenja.
        </p>
      </Section>

      <Section title="2. Koje podatke prikupljamo">
        <List
          items={[
            "Podaci o računu: ime, e-mail adresa, lozinka (pohranjena u kriptiranom obliku).",
            "Poslovni podaci koje sami unesete: klijenti, fakture, projekti, transakcije, zaposlenici.",
            "Tehnički podaci: IP adresa, vrsta uređaja i preglednika, vrijeme pristupa (za sigurnost i otklanjanje grešaka).",
            "Sadržaj upita poslan AI Asistentu, radi generiranja odgovora.",
          ]}
        />
      </Section>

      <Section title="3. Kako koristimo podatke">
        <List
          items={[
            "Za pružanje osnovnih funkcija aplikacije (dashboard, fakturiranje, upravljanje klijentima).",
            "Za obradu vaših upita putem AI Asistenta (podaci se šalju trećoj strani — Anthropic — radi generiranja odgovora, vidi odjeljak 5).",
            "Za održavanje sigurnosti računa i sprječavanje neovlaštenog pristupa.",
            "Za komunikaciju vezanu uz vaš račun (npr. obavijesti o naplati, sigurnosna upozorenja).",
          ]}
        />
      </Section>

      <Section title="4. Pohrana i sigurnost podataka">
        <p style={styles.p}>
          Podaci se pohranjuju kod našeg pružatelja baze podataka (Supabase) i
          poslužitelja (Vercel), unutar EU regije gdje je to tehnički moguće.
          Pristup podacima štićen je autentikacijom i enkripcijom u prijenosu
          (TLS/HTTPS). Lozinke se ne pohranjuju u čitljivom obliku.
        </p>
      </Section>

      <Section title="5. Treće strane">
        <p style={styles.p}>
          Za funkciju AI Asistenta koristimo Anthropic API (Claude) radi
          generiranja odgovora na vaše upite. Sadržaj upita se prenosi
          Anthropicu isključivo radi obrade zahtjeva i ne koristi se za
          treniranje modela bez vašeg pristanka, sukladno Anthropicovim
          uvjetima poslovnog korištenja. Ne prodajemo niti iznajmljujemo vaše
          osobne podatke trećim stranama u marketinške svrhe.
        </p>
      </Section>

      <Section title="6. Vaša prava">
        <p style={styles.p}>
          U skladu s primjenjivim propisima o zaštiti podataka, imate pravo
          zatražiti pristup, izmjenu ili brisanje svojih osobnih podataka.
          Zahtjev možete poslati na{" "}
          <a href="mailto:sladi.brox@gmail.com" style={styles.link}>
            sladi.brox@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="7. Pohrana podataka nakon zatvaranja računa">
        <p style={styles.p}>
          Na vaš zahtjev, brišemo ili anonimiziramo vaše osobne podatke u
          razumnom roku, osim podataka koje smo zakonski obvezni čuvati
          (npr. računovodstvena dokumentacija).
        </p>
      </Section>

      <Section title="8. Promjene ovih pravila">
        <p style={styles.p}>
          Pravila privatnosti možemo povremeno ažurirati. O značajnim
          promjenama obavijestit ćemo korisnike putem aplikacije ili e-maila.
        </p>
      </Section>

      <Section title="9. Kontakt">
        <p style={styles.p}>
          goodID team d.o.o., Brčko, Bosna i Hercegovina
          <br />
          E-mail:{" "}
          <a href="mailto:sladi.brox@gmail.com" style={styles.link}>
            sladi.brox@gmail.com
          </a>
        </p>
      </Section>
    </>
  ),

  en: (
    <>
      <h1 style={styles.title}>Privacy Policy &amp; Terms of Use</h1>
      <p style={styles.updated}>Last updated: June 22, 2026</p>

      <Section title="1. Introduction">
        <p style={styles.p}>
          BIVORA is a business management platform for clients, projects,
          invoices, and finances, developed and provided by goodID team
          d.o.o., Brčko (&quot;we&quot;, &quot;us&quot;). By using the BIVORA
          application (web and mobile), you agree to this Privacy Policy and
          these Terms of Use.
        </p>
      </Section>

      <Section title="2. What data we collect">
        <List
          items={[
            "Account data: name, email address, password (stored encrypted).",
            "Business data you enter: clients, invoices, projects, transactions, employees.",
            "Technical data: IP address, device and browser type, access timestamps (for security and debugging).",
            "Content of messages sent to the AI Assistant, for generating responses.",
          ]}
        />
      </Section>

      <Section title="3. How we use your data">
        <List
          items={[
            "To provide core app functionality (dashboard, invoicing, client management).",
            "To process your AI Assistant queries (data is sent to a third party — Anthropic — to generate responses, see Section 5).",
            "To maintain account security and prevent unauthorized access.",
            "To communicate with you about your account (e.g. billing notices, security alerts).",
          ]}
        />
      </Section>

      <Section title="4. Data storage and security">
        <p style={styles.p}>
          Data is stored with our database provider (Supabase) and hosting
          provider (Vercel), within the EU region where technically possible.
          Access is protected by authentication and encryption in transit
          (TLS/HTTPS). Passwords are never stored in plain text.
        </p>
      </Section>

      <Section title="5. Third parties">
        <p style={styles.p}>
          For the AI Assistant feature, we use the Anthropic API (Claude) to
          generate responses to your queries. Query content is transmitted to
          Anthropic solely to process the request and is not used to train
          models without your consent, in accordance with Anthropic&rsquo;s
          commercial terms of use. We do not sell or rent your personal data
          to third parties for marketing purposes.
        </p>
      </Section>

      <Section title="6. Your rights">
        <p style={styles.p}>
          Under applicable data protection law, you have the right to
          request access to, correction of, or deletion of your personal
          data. Send requests to{" "}
          <a href="mailto:sladi.brox@gmail.com" style={styles.link}>
            sladi.brox@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="7. Data retention after account closure">
        <p style={styles.p}>
          Upon request, we delete or anonymize your personal data within a
          reasonable timeframe, except for data we are legally required to
          retain (e.g. accounting records).
        </p>
      </Section>

      <Section title="8. Changes to this policy">
        <p style={styles.p}>
          We may update this Privacy Policy from time to time. We will notify
          users of material changes via the app or by email.
        </p>
      </Section>

      <Section title="9. Contact">
        <p style={styles.p}>
          goodID team d.o.o., Brčko, Bosnia and Herzegovina
          <br />
          Email:{" "}
          <a href="mailto:sladi.brox@gmail.com" style={styles.link}>
            sladi.brox@gmail.com
          </a>
        </p>
      </Section>
    </>
 ),
 de: (
    <>
      <h1 style={styles.title}>Datenschutzerklärung &amp; Nutzungsbedingungen</h1>
      <p style={styles.updated}>Zuletzt aktualisiert: 22. Juni 2026</p>

      <Section title="1. Einleitung">
        <p style={styles.p}>
          BIVORA ist eine Business-Management-Plattform für Kunden, Projekte,
          Rechnungen und Finanzen, entwickelt und bereitgestellt von goodID
          team d.o.o., Brčko (&quot;wir&quot;, &quot;uns&quot;). Mit der
          Nutzung der BIVORA-Anwendung (Web und Mobil) stimmen Sie dieser
          Datenschutzerklärung und diesen Nutzungsbedingungen zu.
        </p>
      </Section>

      <Section title="2. Welche Daten wir erheben">
        <List
          items={[
            "Kontodaten: Name, E-Mail-Adresse, Passwort (verschlüsselt gespeichert).",
            "Von Ihnen eingegebene Geschäftsdaten: Kunden, Rechnungen, Projekte, Transaktionen, Mitarbeiter.",
            "Technische Daten: IP-Adresse, Geräte- und Browsertyp, Zugriffszeiten (für Sicherheit und Fehlerbehebung).",
            "Inhalt der an den KI-Assistenten gesendeten Anfragen, zur Generierung von Antworten.",
          ]}
        />
      </Section>

      <Section title="3. Wie wir Ihre Daten verwenden">
        <List
          items={[
            "Zur Bereitstellung der Kernfunktionen der App (Dashboard, Rechnungsstellung, Kundenverwaltung).",
            "Zur Verarbeitung Ihrer Anfragen an den KI-Assistenten (Daten werden an einen Drittanbieter — Anthropic — übermittelt, siehe Abschnitt 5).",
            "Zur Aufrechterhaltung der Kontosicherheit und Verhinderung unbefugten Zugriffs.",
            "Zur Kommunikation bezüglich Ihres Kontos (z. B. Abrechnungshinweise, Sicherheitswarnungen).",
          ]}
        />
      </Section>

      <Section title="4. Datenspeicherung und Sicherheit">
        <p style={styles.p}>
          Daten werden bei unserem Datenbankanbieter (Supabase) und
          Hosting-Anbieter (Vercel) gespeichert, soweit technisch möglich
          innerhalb der EU. Der Zugriff ist durch Authentifizierung und
          Verschlüsselung während der Übertragung (TLS/HTTPS) geschützt.
          Passwörter werden niemals im Klartext gespeichert.
        </p>
      </Section>

      <Section title="5. Drittanbieter">
        <p style={styles.p}>
          Für die KI-Assistenten-Funktion nutzen wir die Anthropic-API
          (Claude), um Antworten auf Ihre Anfragen zu generieren. Der Inhalt
          der Anfragen wird ausschließlich zur Verarbeitung der Anfrage an
          Anthropic übermittelt und gemäß den gewerblichen Nutzungsbedingungen
          von Anthropic nicht ohne Ihre Zustimmung zum Training von Modellen
          verwendet. Wir verkaufen oder vermieten Ihre personenbezogenen
          Daten nicht zu Marketingzwecken an Dritte.
        </p>
      </Section>

      <Section title="6. Ihre Rechte">
        <p style={styles.p}>
          Gemäß geltendem Datenschutzrecht haben Sie das Recht, Zugang zu,
          Berichtigung oder Löschung Ihrer personenbezogenen Daten zu
          verlangen. Anfragen senden Sie an{" "}
          <a href="mailto:sladi.brox@gmail.com" style={styles.link}>
            sladi.brox@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="7. Datenspeicherung nach Kontoschließung">
        <p style={styles.p}>
          Auf Anfrage löschen oder anonymisieren wir Ihre personenbezogenen
          Daten innerhalb einer angemessenen Frist, mit Ausnahme von Daten,
          die wir gesetzlich aufbewahren müssen (z. B. Buchhaltungsunterlagen).
        </p>
      </Section>

      <Section title="8. Änderungen dieser Richtlinie">
        <p style={styles.p}>
          Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren.
          Über wesentliche Änderungen informieren wir Nutzer über die App
          oder per E-Mail.
        </p>
      </Section>

      <Section title="9. Kontakt">
        <p style={styles.p}>
          goodID team d.o.o., Brčko, Bosnien und Herzegowina
          <br />
          E-Mail:{" "}
          <a href="mailto:sladi.brox@gmail.com" style={styles.link}>
            sladi.brox@gmail.com
          </a>
        </p>
      </Section>
    </>
  ),
};

/* ---------- Small components ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={styles.section}>
      <h2 style={styles.h2}>{title}</h2>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={styles.ul}>
      {items.map((item, i) => (
        <li key={i} style={styles.li}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Styles (matches BIVORA dark theme) ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0b0b12",
    fontFamily: "'Inter', sans-serif",
    padding: "48px 20px",
  },
  container: {
    maxWidth: "760px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap" as const,
    gap: "16px",
  },
  brandRow: { display: "flex", alignItems: "center", gap: "12px" },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #34d399, #10b981)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0b0b12",
    fontWeight: "800",
    fontSize: "18px",
  },
  brandName: { color: "#fff", fontWeight: "700", fontSize: "16px" },
  brandSub: { color: "rgba(255,255,255,0.4)", fontSize: "12px" },
  langSwitch: {
    display: "flex",
    gap: "4px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "4px",
  },
  langBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    padding: "6px 14px",
    borderRadius: "7px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  langBtnActive: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
  },
  content: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "40px",
  },
  title: {
    color: "#fff",
    fontSize: "26px",
    fontWeight: "800",
    margin: "0 0 8px",
  },
  updated: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "13px",
    margin: "0 0 32px",
  },
  section: { marginBottom: "28px" },
  h2: {
    color: "#a5b4fc",
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 10px",
  },
  p: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
    lineHeight: "1.7",
    margin: 0,
  },
  ul: { margin: 0, paddingLeft: "20px" },
  li: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
    lineHeight: "1.7",
    marginBottom: "6px",
  },
  link: { color: "#a5b4fc", textDecoration: "underline" },
  footer: {
    marginTop: "32px",
    textAlign: "center" as const,
  },
  footerText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "12px",
  },
};   
