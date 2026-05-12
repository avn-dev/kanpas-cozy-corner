import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    mapkit: any;
  }
}

const hours: [string, string][] = [
  ['Montag', '09 – 17:00'],
  ['Dienstag', '09 – 17:00'],
  ['Mittwoch', '09 – 17:00'],
  ['Donnerstag', '09 – 17:00'],
  ['Freitag', '09 – 17:00'],
  ['Samstag', '09 – 17:00'],
  ['Sonntag', '09 – 17:00'],
];

const Contact = () => {
  useDocumentTitle("Kontakt, Öffnungszeiten & Reservierung");
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
        title: "KANPA's",
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

      <main
        id="main-content"
        className="flex-1 contact-redesign"
        style={{ paddingTop: 'var(--nav-height, 106px)' }}
      >
        {/* Hero — full width */}
        <section className="kp-about-hero">
          <div className="kp-about-hero__eyebrow">— Kontakt & Standort</div>
          <h1 className="kp-about-hero__title">
            Komm <em>vorbei</em>.
          </h1>
          <p className="kp-about-hero__sub">Oder ruf uns kurz an und reservier deinen Tisch.</p>
        </section>

        {/* Cards + map section */}
        <div className="kp-contact-section">
          {/* Two-column card grid on desktop */}
          <div className="kp-contact-cols">
            {/* Left column: address, phone, email */}
            <div>
              <div className="kp-contact-card">
                <div className="kp-contact-card__label">Adresse</div>
                <div className="kp-contact-card__value">
                  Ausdorferstraße 1a<br />
                  <em>53489 Sinzig</em>
                </div>
                <div className="kp-contact-card__sub">2 Min. vom Marktplatz</div>
              </div>

              <div className="kp-contact-card">
                <div className="kp-contact-card__label">Telefon</div>
                <div className="kp-contact-card__value">
                  <a href="tel:+4926425495">+49 2642 5495</a>
                </div>
              </div>

              <div className="kp-contact-card">
                <div className="kp-contact-card__label">E-Mail</div>
                <div className="kp-contact-card__value">
                  <a href="mailto:info@kanpas.de">info@kanpas.de</a>
                </div>
              </div>
            </div>

            {/* Right column: hours, social */}
            <div>
              <div className="kp-contact-card">
                <div className="kp-contact-card__label">Öffnungszeiten</div>
                <ul className="kp-hours">
                  {hours.map(([day, h]) => (
                    <li key={day}>
                      <span className="day">{day}</span>
                      <span className="h">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="kp-contact-card">
                <div className="kp-contact-card__label">Folg uns</div>
                <div className="kp-contact-card__value" style={{ fontSize: 18 }}>
                  <a href="https://instagram.com/kanpas.sinzig" target="_blank" rel="noopener noreferrer">
                    @kanpas.sinzig
                  </a>
                </div>
                <div className="kp-contact-card__sub">Schau rein & bleib auf dem Laufenden.</div>
              </div>
            </div>
          </div>

          {/* Map — full width, below cards */}
          <div className="kp-map-wrapper">
            {useAppleMaps && !mapKitFailed ? (
              <div style={{ width: '100%', height: '100%' }} ref={mapContainerRef}>
                {!mapKitLoaded && <span className="sr-only">Apple Karten wird geladen…</span>}
              </div>
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.273819918979!2d7.246364376631819!3d50.543989972446846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bef10056a2718d%3A0x869209ef27a88d64!2sKANPA%E2%80%99s!5e0!3m2!1sde!2sde!4v1735140000000!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KANPA's Standort auf Google Maps"
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
