import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/use-seo";
import { Phone } from "lucide-react";
import fassadePhoto from "@/assets/aussen.webp";

const timeline: [string, string][] = [
  ["Vor 50 J.", "Großvaters Schneiderei eröffnet — bekannt weit über Sinzig hinaus."],
  ["Vor 5 J.", "Abschied vom Großvater — das Haus bleibt in der Familie."],
  ["Heute", "Die alten Räume sind saniert — KANPA’s füllt sie mit neuem Leben."],
];

const About = () => {
  useSeo({
    title: "Über uns",
    description:
      "Die Geschichte hinter KANPA’s in Sinzig: Aus der Schneiderei des Großvaters wurde ein Café – ein Haus, zwei Generationen. Türkische Spezialitäten, mit Liebe gemacht.",
    path: "/about",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        <section className="rd-hero" style={{ paddingBottom: 36 }}>
          <div className="rd-eyebrow" style={{ marginBottom: 20 }}>
            Über KANPA’s — unser Café in Sinzig
          </div>
          <h1 className="rd-display" style={{ fontSize: "clamp(40px, 6.5vw, 88px)" }}>
            Ein Haus,
            <br />
            <em>zwei Generationen.</em>
          </h1>
        </section>

        <section
          className="rd-wrap grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 48, paddingBottom: 64, alignItems: "start" }}
        >
          <div className="flex flex-col" style={{ gap: 20, fontSize: 17, lineHeight: 1.75 }}>
            <p style={{ margin: 0 }}>
              KANPA’s ist aus Liebe zu gutem Essen, herzlichen Begegnungen und einer
              Familientradition entstanden. Vor 50 Jahren eröffnete hier die Schneiderei unseres
              Großvaters — er war weit über Sinzig hinaus für seine Lebensfreude bekannt.
            </p>
            <p style={{ margin: 0 }}>
              Vor fünf Jahren ist er gegangen, doch jetzt erfüllt sich der Ort mit neuem Leben. Wir
              haben die alten Räume saniert und ein Café geschaffen, das unsere Liebe zu türkischen
              Spezialitäten widerspiegelt.
            </p>
            <p style={{ margin: 0 }}>
              Unser Name steht für Authentizität, Wärme und gemeinsamen Genuss. Bei uns findest du
              nicht nur <Link to="/menu">Specialty Coffee, frische Backwaren und Frühstücksgerichte</Link>,
              sondern ein Team, das mit Herzblut dabei ist.
            </p>
            <div className="rd-ctas" style={{ marginTop: 8, justifyContent: "flex-start" }}>
              <a href="tel:+4926425495" className="rd-pill rd-pill--solid">
                <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> Tisch reservieren
              </a>
              <Link to="/menu" className="rd-pill rd-pill--outline">
                Zur Speisekarte
              </Link>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: 24 }}>
            <figure className="rd-figure" style={{ margin: 0 }}>
              <div className="rd-figure__frame" style={{ aspectRatio: "16 / 9" }}>
                <img
                  src={fassadePhoto}
                  alt="Die Fassade von KANPA’s in der Ausdorferstraße 1a in Sinzig mit Terrassentischen vor dem Eingang"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="rd-figure__caption">
                Das Haus in der Ausdorferstraße — Abb. 02
              </figcaption>
            </figure>

            <div className="rd-timeline">
              {timeline.map(([when, what]) => (
                <div key={when} className="rd-timeline__row">
                  <span className="rd-timeline__when">{when}</span>
                  <span className="rd-timeline__what">{what}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-band" style={{ textAlign: "center", padding: "56px 24px" }}>
          <blockquote className="rd-quote" style={{ margin: "0 auto" }}>
            „Jeder Besuch soll ein kleiner Urlaub vom Alltag sein.“
          </blockquote>
          <div className="rd-eyebrow" style={{ marginTop: 14, letterSpacing: "0.2em" }}>
            Familie Kanpara
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
