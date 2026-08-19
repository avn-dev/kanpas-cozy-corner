import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { disableAnalytics, enableAnalytics } from "@/utils/googleAnalytics";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ConsentStatus = "accepted" | "rejected";

interface ConsentPreferences {
  analytics: boolean;
  updatedAt: string;
}

const STORAGE_KEY = "cookie-consent-preferences";

const readStoredConsent = (): ConsentPreferences | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? (JSON.parse(storedValue) as ConsentPreferences) : null;
  } catch (error) {
    console.warn("Konnte gespeicherte Cookie-Präferenzen nicht lesen", error);
    return null;
  }
};

const persistConsent = (preferences: ConsentPreferences) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn("Konnte Cookie-Präferenzen nicht speichern", error);
  }
};

declare global {
  interface Window {
    __PRERENDER_INJECTED?: { prerender: boolean };
  }
}

// Beim Build-Prerendering nicht rendern — der Banner gehört nicht ins statische HTML.
const IS_PRERENDERING =
  typeof window !== "undefined" && Boolean(window.__PRERENDER_INJECTED);

const CookieConsentBanner = () => {
  const [status, setStatus] = useState<ConsentStatus | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const analyticsSwitchId = useId();
  const detailsId = useId();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedPreferences = readStoredConsent();

    if (storedPreferences) {
      const hasAnalytics = storedPreferences.analytics;

      if (hasAnalytics) {
        enableAnalytics();
        setStatus("accepted");
      } else {
        disableAnalytics();
        setStatus("rejected");
      }

      setAnalyticsEnabled(hasAnalytics);
    } else {
      disableAnalytics();
      setAnalyticsEnabled(false);
      setIsBannerVisible(true);
    }
  }, []);

  const applyConsent = (analyticsAllowed: boolean) => {
    if (analyticsAllowed) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    const preferences: ConsentPreferences = {
      analytics: analyticsAllowed,
      updatedAt: new Date().toISOString(),
    };

    persistConsent(preferences);
    setStatus(analyticsAllowed ? "accepted" : "rejected");
    setAnalyticsEnabled(analyticsAllowed);
    setIsBannerVisible(false);
    setIsDetailsOpen(false);
  };

  const reopenPreferences = () => {
    setIsDetailsOpen(false);
    setIsBannerVisible(true);
  };

  if (IS_PRERENDERING || (!isBannerVisible && status === null)) {
    return null;
  }

  return (
    <>
      {isBannerVisible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          style={{
            position: "fixed",
            left: 12,
            right: 12,
            bottom: 12,
            zIndex: 60,
            margin: "0 auto",
            maxWidth: 440,
            background: "var(--rd-paper)",
            border: "1px solid var(--rd-ink)",
            borderRadius: 14,
            padding: 16,
            boxShadow: "0 12px 32px rgba(43,30,22,.3)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxHeight: "80svh",
            overflowY: "auto",
          }}
        >
          <h2 id="cookie-consent-title" className="sr-only">
            Cookies &amp; Datenschutz
          </h2>
          <div id="cookie-consent-description" style={{ fontSize: 14.5, lineHeight: 1.5 }}>
            <strong>Cookies:</strong> Nur technisch Notwendiges — und Statistik, wenn du magst.{" "}
            <button
              type="button"
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              aria-expanded={isDetailsOpen}
              aria-controls={detailsId}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                font: "inherit",
                color: "inherit",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                cursor: "pointer",
              }}
            >
              Mehr dazu
            </button>
          </div>

          {isDetailsOpen && (
            <div
              id={detailsId}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                fontSize: 13.5,
                lineHeight: 1.55,
                color: "var(--rd-sepia)",
                borderTop: "1px solid var(--rd-line)",
                paddingTop: 12,
              }}
            >
              <p style={{ margin: 0 }}>
                Wir setzen ausschließlich technisch notwendige Cookies sowie – nur mit deiner
                Einwilligung – optionale Analyse-Cookies von Google Analytics. Die IP-Adressen
                werden anonymisiert und es werden keine personenbezogenen Profile gebildet. Du
                kannst deine Entscheidung jederzeit widerrufen. Mehr in unserem{" "}
                <Link to="/imprint" style={{ color: "var(--rd-ink)" }}>
                  Impressum &amp; Datenschutzhinweisen
                </Link>
                .
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "baseline",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: "var(--rd-ink)", fontSize: 14 }}>
                    Unbedingt erforderliche Cookies
                  </div>
                  <div>Sitzung &amp; Sicherheit — werden immer gesetzt.</div>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--rd-gold)",
                  }}
                >
                  immer aktiv
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <Label
                    htmlFor={analyticsSwitchId}
                    style={{ fontWeight: 600, color: "var(--rd-ink)", fontSize: 14 }}
                  >
                    Analyse &amp; Statistik (Google Analytics)
                  </Label>
                  <div>
                    Nur mit deiner Zustimmung, mit IP-Anonymisierung und ohne Google-Signale.
                  </div>
                </div>
                <Switch
                  id={analyticsSwitchId}
                  checked={analyticsEnabled}
                  onCheckedChange={(checked) => setAnalyticsEnabled(checked === true)}
                />
              </div>
              <button
                type="button"
                onClick={() => applyConsent(analyticsEnabled)}
                className="rd-pill rd-pill--outline"
                style={{ fontSize: 14, padding: "10px 20px", minHeight: 0, alignSelf: "flex-start" }}
              >
                Auswahl speichern
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => applyConsent(true)}
              className="rd-pill rd-pill--solid"
              style={{ flex: 1, fontSize: 14.5, padding: 12 }}
            >
              Okay
            </button>
            <button
              type="button"
              onClick={() => applyConsent(false)}
              className="rd-pill rd-pill--outline"
              style={{ flex: 1, fontSize: 14.5, padding: 11 }}
            >
              Nur nötige
            </button>
          </div>
        </div>
      )}

      {status !== null && !isBannerVisible && (
        <button
          type="button"
          onClick={reopenPreferences}
          aria-label="Cookie-Einstellungen öffnen"
          style={{
            position: "fixed",
            bottom: 16,
            left: 16,
            zIndex: 40,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 999,
            border: "1px solid var(--rd-line2)",
            background: "var(--rd-paper)",
            padding: "8px 14px",
            fontSize: 12,
            color: "var(--rd-ink)",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(43,30,22,.12)",
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rd-gold)" }}
          />
          Cookie-Einstellungen
        </button>
      )}
    </>
  );
};

export default CookieConsentBanner;
