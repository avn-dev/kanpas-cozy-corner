import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/use-seo";
import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";

declare global {
  interface Window {
    mapkit: any;
  }
}

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

const Contact = () => {
  useSeo({
    title: "Kontakt, Öffnungszeiten & Reservierung",
    description:
      "Ausdorferstraße 1a in Sinzig, zwei Gehminuten vom Marktplatz — täglich 9–17 Uhr geöffnet, mit Außenplätzen. Tisch reservieren unter +49 2642 5495.",
    path: "/contact",
  });
  const [useAppleMaps, setUseAppleMaps] = useState(false);
  const [mapKitFailed, setMapKitFailed] = useState(false);
  const [mapKitLoaded, setMapKitLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapKitInitialized = useRef(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const appleDevicePattern = /iPad|iPhone|iPod|Macintosh/i;
    setUseAppleMaps(appleDevicePattern.test(userAgent));
  }, []);

  useEffect(() => {
    if (!useAppleMaps || mapKitFailed) return;

    const token = import.meta.env.VITE_MAPKIT_TOKEN;
    if (!token) {
      setMapKitFailed(true);
      return;
    }

    const MAPKIT_SCRIPT_SRC = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";

    const initializeMap = () => {
      if (!window.mapkit || !mapContainerRef.current) {
        setMapKitFailed(true);
        return;
      }

      if (!mapKitInitialized.current) {
        window.mapkit.init({
          authorizationCallback: (done: (token: string) => void) => {
            done(token);
          },
        });
        mapKitInitialized.current = true;
      }

      const coordinate = new window.mapkit.Coordinate(50.54399, 7.246364);
      const map = new window.mapkit.Map(mapContainerRef.current, {
        center: coordinate,
        span: new window.mapkit.CoordinateSpan(0.015, 0.015),
        showsCompass: window.mapkit.FeatureVisibility.Hidden,
        showsMapTypeControl: false,
        showsZoomControl: false,
      });

      const annotation = new window.mapkit.MarkerAnnotation(coordinate, {
        title: "KANPA’s",
        subtitle: "Ausdorferstraße 1a, 53489 Sinzig",
      });

      map.addAnnotation(annotation);
      setMapKitLoaded(true);
    };

    const existingScript = document.querySelector(
      `script[src="${MAPKIT_SCRIPT_SRC}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.mapkit) {
        initializeMap();
      } else {
        existingScript.addEventListener("load", initializeMap, { once: true });
        existingScript.addEventListener("error", () => setMapKitFailed(true), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = MAPKIT_SCRIPT_SRC;
    script.async = true;
    script.onload = initializeMap;
    script.onerror = () => setMapKitFailed(true);
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [useAppleMaps, mapKitFailed]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        <section className="rd-hero" style={{ paddingBottom: 44 }}>
          <div className="rd-eyebrow" style={{ marginBottom: 20 }}>
            Kontakt &amp; Standort
          </div>
          <h1 className="rd-display" style={{ fontSize: "clamp(40px, 6.5vw, 88px)" }}>
            Komm vorbei —
            <br />
            <em>mitten in Sinzig.</em>
          </h1>
          <p className="rd-sub" style={{ maxWidth: 540, margin: "22px auto 0 auto", fontSize: 18 }}>
            Oder ruf kurz an und reservier deinen Tisch — besonders am Wochenende lohnt es sich.
          </p>
          <div style={{ marginTop: 30 }}>
            <a href="tel:+4926425495" className="rd-pill rd-pill--solid" style={{ fontSize: 17 }}>
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> +49 2642 5495
            </a>
          </div>
        </section>

        {/* Info-Raster */}
        <section
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ borderTop: "1px solid var(--rd-line)", borderBottom: "1px solid var(--rd-line)" }}
        >
          <div style={{ padding: "36px 24px", borderBottom: "1px solid var(--rd-line)" }} className="lg:!border-b-0 lg:!p-11 lg:border-r lg:border-[color:var(--rd-line)]">
            <div className="rd-numlabel">Adresse</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1.2 }}>
              Ausdorferstraße 1a
              <br />
              <em>53489 Sinzig</em>
            </div>
            <p className="rd-sub" style={{ margin: "12px 0 0 0", fontSize: 15 }}>
              2 Gehminuten vom Marktplatz · Außenplätze &amp; klimatisiertes Café
            </p>
          </div>

          <div style={{ padding: "36px 24px", borderBottom: "1px solid var(--rd-line)" }} className="lg:!border-b-0 lg:!p-11 lg:border-r lg:border-[color:var(--rd-line)]">
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

          <div style={{ padding: "36px 24px", background: "var(--rd-parch)" }} className="lg:!p-11">
            <div className="rd-numlabel">Schreib uns · Folg uns</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 23 }}>
              <a href="mailto:info@kanpas.de" style={{ textDecoration: "none" }}>
                info@kanpas.de
              </a>
            </div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 23, marginTop: 6 }}>
              <a
                href="https://instagram.com/kanpas.sinzig"
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: "none" }}
              >
                @kanpas.sinzig
              </a>
            </div>
            <div style={{ marginTop: 16, fontSize: 15, color: "var(--rd-gold)" }}>
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
          style={{ gap: 24, paddingTop: 48, paddingBottom: 64, alignItems: "center" }}
        >
          <div className="rd-figure">
            <div className="rd-figure__frame" style={{ height: 320 }}>
              {useAppleMaps && !mapKitFailed ? (
                <div style={{ width: "100%", height: "100%" }} ref={mapContainerRef}>
                  {!mapKitLoaded && <span className="sr-only">Apple Karten wird geladen…</span>}
                </div>
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.273819918979!2d7.246364376631819!3d50.543989972446846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bef10056a2718d%3A0x869209ef27a88d64!2sKANPA%E2%80%99s!5e0!3m2!1sde!2sde!4v1735140000000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KANPA’s Standort auf Google Maps"
                />
              )}
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
                <span style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{place}</span>
                <span style={{ fontSize: 14, color: "var(--rd-sepia)" }}>{time}</span>
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
