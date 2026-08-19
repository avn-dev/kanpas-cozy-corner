import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/use-seo";

const faq: [string, string][] = [
  [
    "Was gehört bei KANPA’s zum türkischen Frühstück?",
    "Unser KANPA’s Brunch ist eine Frühstücksplatte mit verschiedenen Käsesorten, Oliven, Gurken, Tomaten und hausgemachten Konfitüren. Dazu gibt es frisches, hausgemachtes Bazlama-Brot mit weiteren Backwaren, eine frei wählbare Eierpfanne — zum Beispiel Menemen oder Sucuk mit Ei — und türkischen Tee.",
  ],
  [
    "Was kostet das türkische Frühstück?",
    "Der KANPA’s Brunch kostet 16,50 € pro Person. Einzelne Gerichte wie Menemen (7,50 €), Sucuk mit Ei (7,90 €) oder Bazlama-Toasts (7,90–9,90 €) gibt es auch à la carte. Extras: Bazlama-Brot 1,50 €, Simit 1,20 €.",
  ],
  [
    "Muss ich reservieren?",
    "Ruf uns am besten kurz an und reservier deinen Tisch: +49 2642 5495. Besonders am Wochenende empfehlen wir eine Reservierung.",
  ],
  [
    "Wann habt ihr geöffnet?",
    "Täglich — Montag bis Sonntag von 9:00 bis 17:00 Uhr.",
  ],
  [
    "Gibt es Alternativen zu Kuhmilch?",
    "Ja: Unseren Kaffee gibt es wahlweise mit laktosefreier Milch, Hafer-, Mandel- oder Kokosmilch.",
  ],
  [
    "Kann ich draußen sitzen?",
    "Ja, wir haben Außenplätze — und drinnen ein gemütliches, klimatisiertes Café.",
  ],
  [
    "Wie weit ist es von Remagen oder Bad Breisig?",
    "KANPA’s liegt in der Ausdorferstraße 1a in Sinzig, zwei Gehminuten vom Marktplatz. Aus Remagen und Bad Breisig bist du in rund 10 Autominuten da, aus Bad Neuenahr-Ahrweiler in etwa 15 und aus Andernach in etwa 20 Minuten.",
  ],
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const alacarte: [string, string][] = [
  ["Menemen", "7,50 €"],
  ["Sucuk mit Ei", "7,90 €"],
  ["Bazlama-Toasts", "7,90–9,90 €"],
  ["Pancakes Kaymak & Honig", "7,90 €"],
];

const TurkishBreakfast = () => {
  const [open, setOpen] = useState<number | null>(0);

  useSeo({
    title: "Türkisches Frühstück in Sinzig",
    description:
      "Türkisches Frühstück (Kahvaltı) bei KANPA’s in Sinzig: Frühstücksplatte mit hausgemachtem Bazlama, Menemen, Sucuk & türkischem Tee — zwischen Remagen und Bad Breisig, täglich 9–17 Uhr.",
    path: "/tuerkisches-fruehstueck",
    jsonLd: faqJsonLd,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        {/* Hero auf Pergament */}
        <section className="rd-hero rd-hero--parch">
          <div className="rd-eyebrow" style={{ marginBottom: 20 }}>
            Kahvaltı — „vor dem Kaffee“
          </div>
          <h1 className="rd-display" style={{ fontSize: "clamp(40px, 6.5vw, 88px)" }}>
            Türkisches Frühstück
            <br />
            <em>in Sinzig.</em>
          </h1>
          <p className="rd-sub" style={{ maxWidth: 640, margin: "24px auto 0 auto", fontSize: 18 }}>
            Viele kleine Schälchen auf dem Tisch, frisches Bazlama-Brot, hausgemachte Konfitüren —
            und dazu türkischer Tee. Zwei Gehminuten vom Marktplatz, zwischen Remagen und Bad
            Breisig.
          </p>
          <div className="rd-ctas" style={{ marginTop: 32 }}>
            <a href="tel:+4926425495" className="rd-pill rd-pill--solid">
              ☎ Tisch reservieren
            </a>
            <Link to="/menu" className="rd-pill rd-pill--outline">
              Zur Speisekarte
            </Link>
          </div>
        </section>

        {/* Was ist Kahvaltı + à la carte */}
        <section className="rd-wrap grid grid-cols-1 lg:grid-cols-2" style={{ gap: 40, paddingTop: 48, paddingBottom: 56 }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <h2 className="rd-cardtitle" style={{ fontSize: "clamp(30px, 3vw, 40px)", fontStyle: "italic" }}>
              Was ist Kahvaltı?
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7 }}>
              Kahvaltı — wörtlich „vor dem Kaffee“ — ist in der Türkei mehr als eine Mahlzeit: Man
              nimmt sich Zeit. Auf den Tisch kommen Käsesorten, Oliven, Tomaten und Gurken,
              Konfitüren und warmes Brot, dazu Eiergerichte wie Menemen (geschmortes Ei mit Tomate
              und Paprika) oder Sucuk mit Ei — und der Çay hört nicht auf, nachgeschenkt zu werden.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7 }}>
              Unser <strong>KANPA’s Brunch (16,50 €)</strong> bringt genau das auf den Tisch: eine
              Frühstücksplatte mit verschiedenen Käsesorten, Oliven, Gurken, Tomaten und
              hausgemachten Konfitüren, dazu frisches Bazlama aus dem eigenen Ofen, eine frei
              wählbare Eierpfanne und türkischer Tee.
            </p>
          </div>

          <div className="rd-figure" style={{ alignSelf: "start" }}>
            <div style={{ border: "1px solid var(--rd-line2)", padding: "24px 22px" }}>
              <div
                className="rd-eyebrow"
                style={{ textAlign: "center", marginBottom: 10, letterSpacing: "0.24em", fontSize: 12 }}
              >
                Lieber à la carte?
              </div>
              {alacarte.map(([name, price]) => (
                <div key={name} className="rd-dotrow" style={{ padding: "11px 0" }}>
                  <span className="rd-dotrow__name" style={{ fontSize: 19 }}>{name}</span>
                  <span className="rd-dotrow__leader" aria-hidden="true" />
                  <span className="rd-dotrow__price" style={{ fontSize: 15 }}>{price}</span>
                </div>
              ))}
              <p style={{ margin: 0, padding: "11px 0", fontSize: 13.5, fontStyle: "italic", color: "var(--rd-sepia2)" }}>
                Extras: Bazlama-Brot 1,50 € · Simit 1,20 €
              </p>
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <Link to="/menu" className="rd-textlink">
                  Ganze Speisekarte
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="rd-wrap" style={{ paddingBottom: 64 }} aria-labelledby="faq-heading">
          <div className="rd-ruledhead">
            <h2 id="faq-heading">Häufige Fragen</h2>
          </div>
          <div className="rd-faq" style={{ marginTop: 8 }}>
            {faq.map(([question, answer], i) => {
              const isOpen = open === i;
              return (
                <div key={question} className={`rd-faq__item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="rd-faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <h3>{question}</h3>
                    <span className="rd-faq__icon" aria-hidden="true">
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {/* Antwort bleibt immer im DOM (Prerender/SEO), nur visuell versteckt */}
                  <p id={`faq-a-${i}`} className="rd-faq__a" hidden={!isOpen}>
                    {answer}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA-Band */}
        <section className="rd-band">
          <div
            className="rd-wrap flex flex-col md:flex-row md:items-center md:justify-between"
            style={{ gap: 20, paddingTop: 48, paddingBottom: 48, textAlign: "center" }}
          >
            <div
              className="rd-quote"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", margin: 0, maxWidth: 620 }}
            >
              Wochenende? Reservier dir deine Sofra.
            </div>
            <a href="tel:+4926425495" className="rd-pill rd-pill--cream" style={{ alignSelf: "center" }}>
              ☎ +49 2642 5495
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TurkishBreakfast;
