import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Selbst gehostete Fonts (DSGVO-konform, kein Google-CDN)
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource-variable/instrument-sans";

import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
