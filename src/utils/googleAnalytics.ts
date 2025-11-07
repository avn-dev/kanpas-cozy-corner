const GA_MEASUREMENT_ID = "G-52LFGMHBLH";

type GtagCommand = [string, ...unknown[]];

interface GAWindow extends Window {
  dataLayer?: GtagCommand[];
  gtag?: (...args: GtagCommand) => void;
  [key: `ga-disable-${string}`]: boolean | undefined;
}

const getGAWindow = () => window as GAWindow;

const createGtagStub = () => {
  const gaWindow = getGAWindow();

  if (!gaWindow.dataLayer) {
    gaWindow.dataLayer = [];
  }

  if (!gaWindow.gtag) {
    gaWindow.gtag = (...args: GtagCommand) => {
      gaWindow.dataLayer!.push(args);
    };
  }

  return gaWindow.gtag;
};

const injectGtagScript = () => {
  if (document.getElementById("ga-gtag")) {
    return;
  }

  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

export const enableAnalytics = () => {
  if (typeof window === "undefined") {
    return;
  }

  const gaWindow = getGAWindow();
  gaWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  const gtag = createGtagStub();

  injectGtagScript();

  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
};

export const disableAnalytics = () => {
  if (typeof window === "undefined") {
    return;
  }

  const gaWindow = getGAWindow();
  gaWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  const gtag = createGtagStub();
  gtag("consent", "update", { analytics_storage: "denied" });
};

export const getMeasurementId = () => GA_MEASUREMENT_ID;