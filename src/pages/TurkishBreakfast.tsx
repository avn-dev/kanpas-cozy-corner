import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

const TurkishBreakfast = () => {
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

      <main
        id="main-content"
        className="flex-1 about-redesign"
        style={{ paddingTop: 'var(--nav-height, 106px)' }}
      >
        <div className="kp-about-layout">
          <section className="kp-about-hero">
            <div className="kp-about-hero__eyebrow">— Kahvaltı in Sinzig</div>
            <h1 className="kp-about-hero__title">
              Türkisches <em>Frühstück</em>.
            </h1>
          </section>

          <div className="kp-about-content">
            <div className="kp-prose">
              <p>
                Bei KANPA’s gibt es türkisches Frühstück, wie wir es lieben: viele kleine Schälchen auf
                dem Tisch, frisches Bazlama-Brot, hausgemachte Konfitüren — und dazu türkischer Tee.
                Mitten in Sinzig, zwei Gehminuten vom Marktplatz, zwischen Remagen und Bad Breisig im
                Kreis Ahrweiler.
              </p>
              <p>
                Kahvaltı — wörtlich „vor dem Kaffee“ — ist in der Türkei mehr als eine Mahlzeit: Man
                nimmt sich Zeit. Auf den Tisch kommen Käsesorten, Oliven, Tomaten und Gurken,
                Konfitüren und warmes Brot, dazu Eiergerichte wie Menemen (geschmortes Ei mit Tomate
                und Paprika) oder Sucuk mit Ei — und der Çay hört nicht auf, nachgeschenkt zu werden.
              </p>
            </div>

            <blockquote className="kp-pullquote">
              Frühstücken wie im Urlaub — mitten in Sinzig.
            </blockquote>

            <div className="kp-prose">
              <p>
                Unser <strong>KANPA’s Brunch (16,50 €)</strong> bringt genau das auf den Tisch:
                eine Frühstücksplatte mit verschiedenen Käsesorten, Oliven, Gurken, Tomaten und
                hausgemachten Konfitüren, dazu frisches Bazlama aus dem eigenen Ofen, eine frei
                wählbare Eierpfanne und türkischer Tee. Wer lieber à la carte frühstückt, findet auf
                unserer <Link to="/menu">Speisekarte</Link> Menemen (7,50 €), Sucuk mit Ei (7,90 €),
                Bazlama-Toasts mit Käse, Sucuk oder Pastirma (7,90–9,90 €), Pancakes mit Kaymak und
                Honig (7,90 €) — und danach etwas aus unserer täglich wechselnden Kuchenvitrine.
              </p>
              <p>
                Wir haben täglich von 9 bis 17 Uhr geöffnet. Reservier deinen Tisch einfach
                telefonisch unter <a href="tel:+4926425495">+49 2642 5495</a> — alle Infos zur
                Anfahrt findest du auf der <Link to="/contact">Kontaktseite</Link>.
              </p>
            </div>

            <section aria-labelledby="faq-heading" className="kp-prose kp-no-dropcap">
              <h2 id="faq-heading" className="font-display text-3xl font-bold text-primary mt-12 mb-6">
                Häufige Fragen
              </h2>
              <div className="space-y-6">
                {faq.map(([question, answer]) => (
                  <div key={question}>
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">{question}</h3>
                    <p>{answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-4">
              <Link to="/menu">
                <Button size="lg" variant="secondary">Zur Speisekarte</Button>
              </Link>
              <a href="tel:+4926425495">
                <Button size="lg" variant="outline">Tisch reservieren</Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TurkishBreakfast;
