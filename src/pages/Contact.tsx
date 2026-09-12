import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/use-seo";
import { MapPin, Phone } from "lucide-react";
import karte from "@/assets/karte-sinzig.webp";

const hours: [string, string][] = [
  ["Montag", "9:00 – 17:00"],
  ["Dienstag", "9:00 – 17:00"],
  ["Mittwoch", "9:00 – 17:00"],
  ["Donnerstag", "9:00 – 17:00"],
  ["Freitag", "9:00 – 17:00"],
  ["Samstag", "9:00 – 17:00"],
  ["Sonntag", "9:00 – 17:00"],
];

const travel: [string, string][] = [
  ["Remagen", "≈ 10 Autominuten"],
  ["Bad Breisig", "≈ 10 Autominuten"],
  ["Bad Neuenahr-Ahrweiler", "≈ 15 Autominuten"],
  ["Andernach", "≈ 20 Autominuten"],
];

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=KANPA%E2%80%99s+Ausdorferstra%C3%9Fe+1a+Sinzig";
const GOOGLE_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Ausdorferstra%C3%9Fe+1a%2C+53489+Sinzig";
const APPLE_MAPS_URL =
  "https://maps.apple.com/?daddr=Ausdorferstra%C3%9Fe+1a%2C+53489+Sinzig";

const Contact = () => {
  useSeo({
    title: "Kontakt, Öffnungszeiten & Reservierung",
    description:
      "Ausdorferstraße 1a in Sinzig, zwei Gehminuten vom Marktplatz — täglich 9–17 Uhr geöffnet, mit Außenplätzen. Tisch reservieren unter +49 2642 5495.",
    path: "/contact",
  });
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main
        id="main-content"
        className="flex-1"
        style={{ paddingTop: "var(--nav-height)" }}
      >
        <section className="rd-hero" style={{ paddingBottom: 44 }}>
          <div className="rd-eyebrow" style={{ marginBottom: 20 }}>
            Kontakt &amp; Standort
          </div>
          <h1
            className="rd-display"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)" }}
          >
            Komm vorbei —
            <br />
            <em>mitten in Sinzig.</em>
          </h1>
          <p
            className="rd-sub"
            style={{ maxWidth: 540, margin: "22px auto 0 auto", fontSize: 18 }}
          >
            Oder ruf kurz an und reservier deinen Tisch — besonders am
            Wochenende lohnt es sich.
          </p>
          <div style={{ marginTop: 30 }}>
            <a
              href="tel:+4926425495"
              className="rd-pill rd-pill--solid"
              style={{ fontSize: 17 }}
            >
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> +49 2642
              5495
            </a>
          </div>
        </section>

        {/* Info-Raster */}
        <section
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{
            borderTop: "1px solid var(--rd-line)",
            borderBottom: "1px solid var(--rd-line)",
          }}
        >
          <div
            style={{
              padding: "36px 24px",
              borderBottom: "1px solid var(--rd-line)",
            }}
            className="lg:!border-b-0 lg:!p-11 lg:border-r lg:border-[color:var(--rd-line)]"
          >
            <div className="rd-numlabel">Adresse</div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 28,
                lineHeight: 1.2,
              }}
            >
              Ausdorferstraße 1a
              <br />
              <em>53489 Sinzig</em>
            </div>
            <p
              className="rd-sub"
              style={{ margin: "12px 0 0 0", fontSize: 15 }}
            >
              2 Gehminuten vom Marktplatz · Außenplätze &amp; klimatisiertes
              Café
            </p>
          </div>

          <div
            style={{
              padding: "36px 24px",
              borderBottom: "1px solid var(--rd-line)",
            }}
            className="lg:!border-b-0 lg:!p-11 lg:border-r lg:border-[color:var(--rd-line)]"
          >
            <div className="rd-numlabel">Öffnungszeiten</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {hours.map(([day, time]) => (
                <li
                  key={day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 15,
                    padding: "4px 0",
                    borderBottom: "1px solid rgba(51,38,27,.08)",
                  }}
                >
                  <span>{day}</span>
                  <span>{time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{ padding: "36px 24px", background: "var(--rd-parch)" }}
            className="lg:!p-11"
          >
            <div className="rd-numlabel">Schreib uns · Folg uns</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 23 }}>
              <a
                href="mailto:info@kanpas.de"
                style={{ textDecoration: "none" }}
              >
                info@kanpas.de
              </a>
            </div>
            <div
              style={{ fontFamily: "var(--serif)", fontSize: 23, marginTop: 6 }}
            >
              <a
                href="https://instagram.com/kanpas.sinzig"
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: "none" }}
              >
                @kanpas.sinzig
              </a>
            </div>
            <div
              style={{ marginTop: 16, fontSize: 15, color: "var(--rd-gold)" }}
            >
              ★★★★★{" "}
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer noopener"
                style={{ color: "var(--rd-sepia)", fontSize: 14 }}
              >
                Bewerte uns auf Google
              </a>
            </div>
          </div>
        </section>

        {/* Karte + Anfahrt */}
        <section
          className="rd-wrap grid grid-cols-1 lg:grid-cols-[2fr_1fr]"
          style={{
            gap: 24,
            paddingTop: 48,
            paddingBottom: 64,
            alignItems: "center",
          }}
        >
          <div className="rd-figure">
            <div className="rd-figure__frame" style={{ height: 320 }}>
              {/* Statische Karte im Site-Look (OpenStreetMap-Daten, gerendert via scripts/generate-static-map.mjs), selbst gehostet */}
              <img
                src={karte}
                alt="Karte: KANPA’s in der Ausdorferstraße 1a, Sinzig — nahe Marktplatz und Kaiserplatz"
                width={1440}
                height={720}
                loading="lazy"
                decoding="async"
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -100%)",
                  color: "var(--rd-ink)",
                  filter: "drop-shadow(0 2px 3px rgba(43,30,22,.35))",
                }}
              >
                <MapPin size={40} strokeWidth={1.75} fill="var(--rd-gold)" />
              </div>
            </div>
            <div
              className="rd-figure__caption"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span>
                <a
                  href={GOOGLE_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Route in Google Maps
                </a>
                {" · "}
                <a
                  href={APPLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Apple Karten
                </a>
              </span>
              <span>
                ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  OpenStreetMap
                </a>
                -Mitwirkende
              </span>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: 4 }}>
            <div className="rd-numlabel">Anfahrt</div>
            {travel.map(([place, time]) => (
              <div
                key={place}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid var(--rd-line)",
                }}
              >
                <span style={{ fontFamily: "var(--serif)", fontSize: 20 }}>
                  {place}
                </span>
                <span style={{ fontSize: 14, color: "var(--rd-sepia)" }}>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
