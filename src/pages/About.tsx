import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/use-document-title";

const About = () => {
  useDocumentTitle("Über uns — KANPA's");

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
            <div className="kp-about-hero__eyebrow">— Über uns</div>
            <h1 className="kp-about-hero__title">
              Ein Haus, <em>zwei</em> Generationen.
            </h1>
          </section>

          <div className="kp-about-content">
            <div className="kp-prose">
              <p>
                KANPA's ist aus Liebe zu gutem Essen, herzlichen Begegnungen und einer Familientradition entstanden.
                Vor 50 Jahren eröffnete hier die Schneiderei unseres Großvaters – er war weit über Sinzig hinaus für
                seine Lebensfreude bekannt.
              </p>
              <p>
                Vor fünf Jahren ist er gegangen, doch jetzt erfüllt sich der Ort mit neuem Leben. Wir haben die
                alten Räume saniert und ein Café geschaffen, das unsere Liebe zu türkischen Spezialitäten widerspiegelt.
              </p>
            </div>

            <blockquote className="kp-pullquote">
              Jeder Besuch soll ein kleiner Urlaub vom Alltag sein.
            </blockquote>

            <div className="kp-prose">
              <p>
                Unser Name steht für Authentizität, Wärme und gemeinsamen Genuss. Bei uns findest du nicht nur
                Specialty Coffee, frische Backwaren und Frühstücksgerichte, sondern ein Team, das mit Herzblut dabei ist.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
