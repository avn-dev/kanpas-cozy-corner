import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
                  <b>Haftungsausschluss:</b><br/><br/>
                  <b>Google Analytics</b><br/>
                  Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. ("Google"). Google Analytics verwendet sog. "Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
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
