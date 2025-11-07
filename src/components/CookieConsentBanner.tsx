import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { disableAnalytics, enableAnalytics } from "@/utils/googleAnalytics";

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

const CookieConsentBanner = () => {
  const [status, setStatus] = useState<ConsentStatus | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedPreferences = readStoredConsent();

    if (storedPreferences) {
      if (storedPreferences.analytics) {
        enableAnalytics();
        setStatus("accepted");
      } else {
        disableAnalytics();
        setStatus("rejected");
      }
    } else {
      disableAnalytics();
      setIsBannerVisible(true);
    }
  }, []);

  const handleConsentChange = (consent: ConsentStatus) => {
    const analyticsAllowed = consent === "accepted";

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
    setStatus(consent);
    setIsBannerVisible(false);
  };

  const reopenPreferences = () => {
    setIsBannerVisible(true);
  };

  if (!isBannerVisible && status === null) {
    return null;
  }

  return (
    <>
      {isBannerVisible && (
        <div
          className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:max-w-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="rounded-3xl border border-border/70 bg-white/95 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur">
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <h2 id="cookie-consent-title" className="text-lg font-semibold text-foreground">
                  Cookies & Datenschutz
                </h2>
                <p id="cookie-consent-description">
                  Wir verwenden optionale Cookies, um Besucherstatistiken mit Google Analytics zu erfassen. Diese werden
                  erst gesetzt, wenn Sie zustimmen. Ihre Wahl können Sie jederzeit über die Einstellungen anpassen.
                </p>
                <p className="text-xs">
                  Mehr Informationen finden Sie in unserem{" "}
                  <Link to="/imprint" className="font-medium text-foreground underline underline-offset-4">
                    Impressum & Datenschutz
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleConsentChange("rejected")}
                  className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/40 hover:bg-foreground/5"
                >
                  Nur notwendige Cookies
                </button>
                <button
                  type="button"
                  onClick={() => handleConsentChange("accepted")}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-600 hover:to-emerald-700"
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
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Cookie-Einstellungen
        </button>
      )}
    </>
  );
};

export default CookieConsentBanner;