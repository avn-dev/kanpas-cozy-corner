import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/use-seo";
import sofraPhoto from "@/assets/hero.webp";
import { Phone } from "lucide-react";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=KANPA%E2%80%99s+Ausdorferstra%C3%9Fe+1a+Sinzig";

const fromTheMenu: [string, string][] = [
  ["Menemen", "7,50 €"],
  ["Sucuk mit Ei", "7,90 €"],
  ["KANPA’s Bagel", "9,50 €"],
  ["Pancakes mit Kaymak & Honig", "7,90 €"],
];

const Index = () => {
  useSeo({
    title: "Café & Brunch in Sinzig",
    description:
      "Türkisches Frühstück, Brunch & Specialty Coffee — täglich 9–17 Uhr in der Ausdorferstraße 1a, zwei Gehminuten vom Sinziger Marktplatz. Tisch reservieren: 02642 5495.",
    path: "/",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        {/* Hero */}
        <section className="rd-hero">
          <div className="rd-eyebrow" style={{ marginBottom: 22 }}>
            Kahvaltı · Brunch · Specialty Coffee
          </div>
          <h1 className="rd-display">
            Café &amp; Brunch
            <br />
            <em>in Sinzig.</em>
          </h1>
          <p className="rd-sub" style={{ maxWidth: 620, margin: "26px auto 0 auto", fontSize: 19 }}>
            Türkisches Frühstück, Specialty Coffee und hausgemachte Desserts — jeder Besuch ein
            kleiner Urlaub vom Alltag. Zwei Gehminuten vom Marktplatz.
          </p>
          <div className="rd-ctas" style={{ marginTop: 36 }}>
            <a href="tel:+4926425495" className="rd-pill rd-pill--solid">
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> Tisch reservieren — 02642 5495
            </a>
            <Link to="/menu" className="rd-pill rd-pill--outline">
              Speisekarte ansehen
            </Link>
          </div>
          <div className="rd-meta" style={{ marginTop: 28 }}>
            <span>Täglich 9–17 Uhr</span>
            <span aria-hidden="true">·</span>
            <span>Außenplätze</span>
            <span aria-hidden="true">·</span>
            <span>Klimatisiert</span>
          </div>
        </section>

        {/* Abbildung 01 — die gedeckte Sofra */}
        <div className="rd-wrap" style={{ paddingBottom: 56 }}>
          <figure className="rd-figure" style={{ margin: 0 }}>
            <div className="rd-figure__frame rd-figure__frame--hero">
              <img
                src={sofraPhoto}
                alt="Die gedeckte Sofra: türkisches Frühstück mit vielen kleinen Schälchen, Bazlama und Çay bei KANPA’s"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="rd-figure__caption">Die gedeckte Sofra</figcaption>
          </figure>
        </div>

        {/* Nº 1–3 */}
        <section
          style={{ borderTop: "1px solid var(--rd-line)" }}
          className="grid grid-cols-1 lg:grid-cols-3"
        >
          <div style={{ padding: "40px 24px", borderBottom: "1px solid var(--rd-line)" }} className="lg:!border-b-0 lg:!p-12 lg:border-r lg:border-[color:var(--rd-line)]">
            <div className="rd-numlabel">Nº 1 — Der Klassiker</div>
            <div className="rd-cardtitle">Der KANPA’s Brunch</div>
            <p className="rd-sub" style={{ margin: "12px 0 0 0", fontSize: 15 }}>
              Frühstücksplatte mit Käsesorten, Oliven, Gurken, Tomaten und hausgemachten Konfitüren
              — dazu frisches Bazlama, eine Eierpfanne nach Wahl und türkischer Tee.
            </p>
            <div style={{ marginTop: 16, fontFamily: "var(--serif)", fontSize: 30 }}>
              16,50 €{" "}
              <span style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--rd-sepia2)" }}>
                pro Person
              </span>
            </div>
            <Link to="/tuerkisches-fruehstueck" className="rd-textlink" style={{ marginTop: 14 }}>
              Was ist Kahvaltı?
            </Link>
          </div>
          <div style={{ padding: "40px 24px", borderBottom: "1px solid var(--rd-line)" }} className="lg:!border-b-0 lg:!p-12 lg:border-r lg:border-[color:var(--rd-line)]">
            <div className="rd-numlabel">Nº 2 — Die Geschichte</div>
            <div className="rd-cardtitle">Ein Haus, zwei Generationen</div>
            <p className="rd-sub" style={{ margin: "12px 0 0 0", fontSize: 15 }}>
              Vor 50 Jahren die Schneiderei des Großvaters, heute unser Café: Wir haben die alten
              Räume saniert und mit neuem Leben gefüllt.
            </p>
            <Link to="/about" className="rd-textlink" style={{ marginTop: 16 }}>
              Über uns
            </Link>
          </div>
          <div style={{ padding: "40px 24px", background: "var(--rd-parch)" }} className="lg:!p-12">
            <div className="rd-numlabel">Nº 3 — Der Besuch</div>
            <div className="rd-cardtitle">Komm vorbei</div>
            <p className="rd-sub" style={{ margin: "12px 0 0 0", fontSize: 15 }}>
              Ausdorferstraße 1a, 53489 Sinzig — zwei Gehminuten vom Marktplatz, aus Remagen und Bad
              Breisig in rund 10 Autominuten. Täglich 9–17 Uhr.
            </p>
            <Link to="/contact" className="rd-textlink" style={{ marginTop: 16 }}>
              Kontakt &amp; Anfahrt
            </Link>
          </div>
        </section>

        {/* Aus der Karte */}
        <section
          style={{ borderTop: "1px solid var(--rd-line)", padding: "56px 24px 64px 24px" }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2
              style={{
                margin: 0,
                textAlign: "center",
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--rd-sepia2)",
                fontWeight: 500,
                paddingBottom: 20,
                borderBottom: "1px solid var(--rd-ink)",
              }}
            >
              Aus der Karte
            </h2>
            {fromTheMenu.map(([name, price]) => (
              <div key={name} className="rd-dotrow">
                <span className="rd-dotrow__name">{name}</span>
                <span className="rd-dotrow__leader" aria-hidden="true" />
                <span className="rd-dotrow__price">{price}</span>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Link to="/menu" className="rd-textlink">
                Ganze Speisekarte ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* Zitat */}
        <section className="rd-band" style={{ textAlign: "center", padding: "56px 24px" }}>
          <blockquote className="rd-quote" style={{ margin: "0 auto" }}>
            „Jeder Besuch soll ein kleiner Urlaub vom Alltag sein.“
          </blockquote>
          <div className="rd-eyebrow" style={{ marginTop: 14, letterSpacing: "0.2em" }}>
            Familie Kanpara
          </div>
        </section>

        {/* Google & Instagram */}
        <section className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: "1px solid var(--rd-line)" }}>
          <div
            style={{ padding: "40px 24px", borderBottom: "1px solid var(--rd-line)" }}
            className="md:!border-b-0 md:!p-12 md:border-r md:border-[color:var(--rd-line)] flex flex-col gap-3"
          >
            <div style={{ fontSize: 18, letterSpacing: 3, color: "var(--rd-gold)" }} aria-hidden="true">
              ★★★★★
            </div>
            <div className="rd-cardtitle" style={{ fontSize: 28 }}>
              War’s schön bei uns?
            </div>
            <p className="rd-sub" style={{ margin: 0, fontSize: 15 }}>
              Eine Google-Bewertung hilft uns mehr, als du denkst — danke!
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="rd-textlink"
              style={{ alignSelf: "flex-start" }}
            >
              Auf Google bewerten
            </a>
          </div>
          <div style={{ padding: "40px 24px" }} className="md:!p-12 flex flex-col gap-3">
            <div className="rd-cardtitle" style={{ fontSize: 28 }}>
              @kanpas.sinzig
            </div>
            <p className="rd-sub" style={{ margin: 0, fontSize: 15 }}>
              Tagesdesserts, Specials und die Sofra des Tages — auf Instagram.
            </p>
            <a
              href="https://instagram.com/kanpas.sinzig"
              target="_blank"
              rel="noreferrer noopener"
              className="rd-textlink"
              style={{ alignSelf: "flex-start" }}
            >
              Folgen
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
