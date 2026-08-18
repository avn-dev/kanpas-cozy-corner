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
          className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:max-w-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div
            className={`rounded-2xl border border-border/70 bg-white/95 p-4 shadow-xl shadow-emerald-950/10 backdrop-blur sm:p-5 ${
              isDetailsOpen ? "max-h-[80svh] overflow-y-auto" : "max-h-[35svh] overflow-y-auto"
            }`}
          >
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="space-y-1.5">
                <h2 id="cookie-consent-title" className="text-base font-semibold text-foreground">
                  Cookies & Datenschutz
                </h2>
                <p id="cookie-consent-description" className="text-xs leading-5 sm:text-sm sm:leading-6">
                  Wir nutzen technisch notwendige Cookies und – nur mit deiner Einwilligung – Google Analytics.{" "}
                  <Link
                    to="/imprint"
                    className="font-medium text-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-1"
                  >
                    Impressum & Datenschutzhinweise
                  </Link>
                </p>
              </div>

              {isDetailsOpen && (
                <div id={detailsId} className="space-y-3">
                  <p className="text-xs leading-5">
                    Wir setzen ausschließlich technisch notwendige Cookies sowie – nur mit Ihrer Einwilligung – optionale
                    Analyse-Cookies von Google Analytics. Die IP-Adressen werden anonymisiert und es werden keine
                    personenbezogenen Profile gebildet. Sie können Ihre Entscheidung jederzeit widerrufen.
                  </p>

                  <div className="space-y-3 rounded-2xl border border-border/60 bg-white/80 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Unbedingt erforderliche Cookies</p>
                        <p className="text-xs leading-5 text-muted-foreground">
                          Speichern Ihre Sitzung und Sicherheitseinstellungen. Diese Cookies sind für den Betrieb unserer Website
                          erforderlich und werden immer gesetzt.
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        immer aktiv
                      </span>
                    </div>
                    <div className="h-px bg-border/60" aria-hidden="true" />
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <Label htmlFor={analyticsSwitchId} className="text-sm font-medium text-foreground">
                          Analyse & Statistik (Google Analytics)
                        </Label>
                        <p className="text-xs leading-5 text-muted-foreground">
                          Hilft uns zu verstehen, wie Besucher:innen unsere Seite nutzen. Wir setzen Google Analytics nur mit
                          Ihrer Zustimmung ein, verwenden IP-Anonymisierung und deaktivieren Google-Signale.
                        </p>
                      </div>
                      <Switch
                        id={analyticsSwitchId}
                        checked={analyticsEnabled}
                        onCheckedChange={(checked) => setAnalyticsEnabled(checked === true)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen((open) => !open)}
                  aria-expanded={isDetailsOpen}
                  aria-controls={detailsId}
                  className="inline-flex items-center justify-center rounded-full px-2 py-1.5 text-xs font-medium text-muted-foreground underline underline-offset-4 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 sm:mr-auto motion-reduce:transition-none"
                >
                  {isDetailsOpen ? "Einstellungen ausblenden" : "Einstellungen"}
                </button>
                {isDetailsOpen && (
                  <button
                    type="button"
                    onClick={() => applyConsent(analyticsEnabled)}
                    className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 motion-reduce:transition-none"
                  >
                    Auswahl speichern
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => applyConsent(false)}
                  className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 motion-reduce:transition-none"
                >
                  Nur notwendige
                </button>
                <button
                  type="button"
                  onClick={() => applyConsent(true)}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-600 hover:to-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {status !== null && !isBannerVisible && (
        <button
          type="button"
          onClick={reopenPreferences}
          className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/95 px-4 py-2 text-xs font-medium text-foreground shadow-md shadow-emerald-950/5 backdrop-blur transition hover:border-border hover:bg-white"
          aria-label="Cookie-Einstellungen öffnen"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Cookie-Einstellungen
        </button>
      )}
    </>
  );
};

export default CookieConsentBanner;