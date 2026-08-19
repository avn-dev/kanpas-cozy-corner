import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/use-seo";

const Imprint = () => {
  useSeo({
    title: "Impressum & rechtliche Informationen",
    description:
      "Impressum von KANPA’s – Café & Brunch in Sinzig, Ausdorferstraße 1a, 53489 Sinzig.",
    path: "/imprint",
  });
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1 pb-16" style={{ paddingTop: "var(--nav-height)" }}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="rd-hero" style={{ paddingBottom: 32 }}>
            <div className="rd-eyebrow" style={{ marginBottom: 18 }}>
              Angaben gemäß § 5 DDG
            </div>
            <h1 className="rd-display" style={{ fontSize: "clamp(38px, 5vw, 64px)" }}>
              Impressum
            </h1>
          </section>

          <div className="max-w-3xl mx-auto mb-16">
            <div style={{ border: "1px solid var(--rd-line)", padding: 32 }}>
              <h2 className="rd-cardtitle" style={{ marginBottom: 20 }}>
                KANPA’s
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ausdorferstraße 1a<br/>
                  53489 Sinzig
                </p>
                <p>
                  <b>Vertreten durch:</b><br/>
                  Görkem Kanpara
                </p>
                <p>
                  <b>Kontakt:</b><br/>
                  Telefon: <a href="tel:+4926425495">+49 2642 5495</a><br/>
                  E-Mail: <a href="mailto:info@kanpas.de">info@kanpas.de</a>
                </p>
                <p>
                  <b>Datenschutz:</b><br/>
                  Informationen zur Verarbeitung personenbezogener Daten auf dieser Website
                  finden Sie in unserer{" "}
                  <Link to="/datenschutz" className="underline underline-offset-4">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Imprint;
