const GA_MEASUREMENT_ID = "G-52LFGMHBLH";
const SCRIPT_ELEMENT_ID = "ga-gtag";

type GtagCommand = [string, ...unknown[]];

interface GAWindow extends Window {
  dataLayer?: GtagCommand[];
  gtag?: (...args: GtagCommand) => void;
  [key: `ga-disable-${string}`]: boolean | undefined;
  __gaInitialized?: boolean;
}

const getGAWindow = () => window as GAWindow;

const ensureGtagStub = () => {
  const gaWindow = getGAWindow();

  if (!gaWindow.dataLayer) {
    gaWindow.dataLayer = [];
  }

  if (!gaWindow.gtag) {
    // Muss eine reguläre Funktion sein, die das Arguments-Objekt pusht —
    // gtag.js ignoriert als Array gepushte Befehle stillschweigend.
    gaWindow.gtag = function gtag(..._args: GtagCommand) {
      // eslint-disable-next-line prefer-rest-params
      (gaWindow.dataLayer as unknown as unknown[]).push(arguments);
    };
  }

  return gaWindow.gtag;
};

const injectGtagScript = () => {
  if (document.getElementById(SCRIPT_ELEMENT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ELEMENT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

const removeGtagScript = () => {
  const script = document.getElementById(SCRIPT_ELEMENT_ID);

  if (script?.parentNode) {
    script.parentNode.removeChild(script);
  }
};

const setConsent = (mode: "default" | "update", value: "granted" | "denied") => {
  const gtag = ensureGtagStub();

  gtag("consent", mode, {
    analytics_storage: value,
    ad_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  });
};

export const enableAnalytics = (options?: { sendPageView?: boolean }) => {
  if (typeof window === "undefined") return;

  const gaWindow = getGAWindow();
  const gtag = ensureGtagStub();

  // Wichtig: das Disable-Flag wieder aufheben — sonst blockiert die GA-Bibliothek
  // alle Hits dauerhaft, auch nach erteilter Einwilligung.
  gaWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  injectGtagScript();

  if (!gaWindow.__gaInitialized) {
    gtag("js", new Date());

    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });

    gaWindow.__gaInitialized = true;
  }

  setConsent("update", "granted");

  if (options?.sendPageView) {
    gtag("event", "page_view", { page_path: window.location.pathname });
  }
};


export const disableAnalytics = () => {
  if (typeof window === "undefined") {
    return;
  }

  const gaWindow = getGAWindow();
  gaWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  setConsent("default", "denied");
  setConsent("update", "denied");

  removeGtagScript();
  gaWindow.__gaInitialized = false;
};

export const getMeasurementId = () => GA_MEASUREMENT_ID;