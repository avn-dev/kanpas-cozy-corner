import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { preloadPage, prefetchAllPages } from "./lib/pages";

// Selbst gehostete Fonts (DSGVO-konform, kein Google-CDN)
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource-variable/instrument-sans";

import "./index.css";

const container = document.getElementById("root")!;
const mount = () => createRoot(container).render(<App />);

// Den Code der aktuellen Seite vorab laden: Der vorgerenderte Snapshot bleibt
// sichtbar, bis die Seite vollständig rendern kann (kein leerer Zwischenzustand).
preloadPage(window.location.pathname).then(mount, mount);

// Übrige Seiten nach dem Laden im Hintergrund nachziehen (nicht beim Build-Prerendering,
// sonst landen Preload-Links für alle Seiten im statischen HTML).
if (!window.__PRERENDER_INJECTED) {
  window.addEventListener("load", () => setTimeout(prefetchAllPages, 3000), { once: true });
}
