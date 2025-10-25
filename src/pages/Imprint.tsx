import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Leaf, Users } from "lucide-react";

const Imprint = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Impressum
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Angaben gemäß § 5 DDG
            </p>
          </div>

          {/* Story Section */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-soft)]">
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                KANPA´s
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ausdorferstraße 1A<br/>
                  53489 Sinzig
                </p>
                <p>
                  <b>Vertreten durch:</b><br/>
                  Görkem Kanpara
                </p>
                <p>
                  <b>Kontakt:</b><br/>
                  Telefon: 0160-7747467<br/>
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
