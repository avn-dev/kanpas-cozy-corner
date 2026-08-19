import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/use-seo";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="rd-cardtitle"
    style={{ fontSize: 26, fontStyle: "normal", marginTop: 36, marginBottom: 10 }}
  >
    {children}
  </h2>
);

const Privacy = () => {
  useSeo({
    title: "Datenschutzerklärung",
    description:
      "Datenschutzerklärung von KANPA’s – Café & Brunch in Sinzig: Informationen zur Verarbeitung personenbezogener Daten auf kanpas.de.",
    path: "/datenschutz",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1 pb-16" style={{ paddingTop: "var(--nav-height)" }}>
        <section className="rd-hero" style={{ paddingBottom: 24 }}>
          <div className="rd-eyebrow" style={{ marginBottom: 18 }}>
            Informationen nach Art. 13 DSGVO
          </div>
          <h1 className="rd-display" style={{ fontSize: "clamp(34px, 5vw, 64px)" }}>
            Datenschutzerklärung
          </h1>
        </section>

        <div
          className="rd-wrap"
          style={{ maxWidth: 820, fontSize: 15.5, lineHeight: 1.7, color: "var(--rd-sepia)" }}
        >
          <H2>1. Verantwortlicher</H2>
          <p>
            KANPA’s, Inhaber: Görkem Kanpara
            <br />
            Ausdorferstraße 1a, 53489 Sinzig
            <br />
            Telefon: <a href="tel:+4926425495">+49 2642 5495</a> · E-Mail:{" "}
            <a href="mailto:info@kanpas.de">info@kanpas.de</a>
          </p>

          <H2>2. Hosting und Server-Logdateien</H2>
          <p>
            Diese Website wird auf Servern von OVHcloud (OVH GmbH, Christophstr. 17, 50670 Köln)
            innerhalb der Europäischen Union gehostet. Beim Aufruf der Website verarbeitet der
            Webserver automatisch technische Zugriffsdaten (sog. Server-Logdateien): IP-Adresse,
            Datum und Uhrzeit des Abrufs, aufgerufene Seite, Browsertyp und Betriebssystem. Diese
            Daten dienen ausschließlich der Sicherstellung eines störungsfreien Betriebs und der
            Sicherheit der Website (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO) und werden nach
            kurzer Zeit automatisch gelöscht.
          </p>

          <H2>3. Verschlüsselung</H2>
          <p>
            Die Übertragung aller Inhalte dieser Website erfolgt verschlüsselt über HTTPS/TLS.
          </p>

          <H2>4. Cookies und lokale Speicherung</H2>
          <p>
            Diese Website setzt von sich aus keine Cookies zu Werbe- oder Trackingzwecken. Ihre
            Entscheidung im Cookie-Hinweis wird lokal in Ihrem Browser gespeichert (localStorage),
            damit der Hinweis nicht bei jedem Besuch erneut erscheint (Rechtsgrundlage: Art. 6
            Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG). Sie können Ihre Entscheidung jederzeit
            über die Schaltfläche „Cookie-Einstellungen“ unten links auf der Website ändern.
          </p>

          <H2>5. Google Analytics 4</H2>
          <p>
            Nur wenn Sie im Cookie-Hinweis ausdrücklich einwilligen (Rechtsgrundlage: Art. 6
            Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), nutzen wir Google Analytics 4, einen
            Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Irland. Ohne Ihre Einwilligung wird der Dienst nicht geladen und es werden keine
            Daten an Google übertragen. Bei erteilter Einwilligung werden IP-Adressen anonymisiert
            verarbeitet; Werbefunktionen und personalisierte Anzeigen sind deaktiviert. Dabei kann
            es zu einer Übermittlung von Daten an Server der Google LLC in den USA kommen; Google
            ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Die Speicherdauer der
            Analysedaten beträgt höchstens 14 Monate. Sie können Ihre Einwilligung jederzeit mit
            Wirkung für die Zukunft über „Cookie-Einstellungen“ widerrufen.
          </p>

          <H2>6. Kartendienste (Google Maps / Apple Maps)</H2>
          <p>
            Auf der Kontaktseite binden wir zur Darstellung unseres Standorts eine Karte ein — je
            nach Endgerät Google Maps (Google Ireland Limited) oder Apple Maps / MapKit JS (Apple
            Inc.). Beim Laden der Karte wird eine Verbindung zu den Servern des jeweiligen
            Anbieters hergestellt und dabei Ihre IP-Adresse übertragen. Die Einbindung erfolgt auf
            Grundlage unseres berechtigten Interesses an einer ansprechenden Darstellung der
            Anfahrt (Art. 6 Abs. 1 lit. f DSGVO). Wenn Sie das nicht möchten, rufen Sie die
            Kontaktseite bitte nicht auf — Adresse und Öffnungszeiten finden Sie auch im Footer
            jeder Seite.
          </p>

          <H2>7. Kontaktaufnahme</H2>
          <p>
            Wenn Sie uns per Telefon oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur
            Bearbeitung der Anfrage (z. B. einer Tischreservierung) auf Grundlage von Art. 6
            Abs. 1 lit. b DSGVO. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht
            mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>

          <H2>8. Externe Links</H2>
          <p>
            Unsere Website verlinkt auf externe Angebote wie Instagram und Google (z. B. für
            Bewertungen). Beim Anklicken dieser Links verlassen Sie unsere Website; es gelten die
            Datenschutzbestimmungen des jeweiligen Anbieters.
          </p>

          <H2>9. Ihre Rechte</H2>
          <p>
            Sie haben gegenüber uns das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),
            Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit
            (Art. 20) sowie Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen
            (Art. 21 DSGVO). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die
            Zukunft widerrufen. Außerdem haben Sie das Recht, sich bei einer
            Datenschutz-Aufsichtsbehörde zu beschweren — zuständig für uns: Der
            Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz,
            Hintere Bleiche 34, 55116 Mainz.
          </p>

          <p style={{ marginTop: 28, fontSize: 13.5, color: "var(--rd-sepia2)" }}>
            Stand: August 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
