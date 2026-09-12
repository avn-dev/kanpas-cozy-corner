import { Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ScrollToTop from "./lib/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { pages } from "./lib/pages";

/**
 * Haelt die zuletzt vollstaendig gerenderte Seite sichtbar, bis der Code der neuen
 * Seite geladen ist. Ohne das blendet Suspense beim Klick den kompletten Inhalt aus
 * (Navigation und Footer eingeschlossen) und die Seite ist kurz weiss.
 */
const RouteView = () => {
  const location = useLocation();
  const letzte = useRef(location);
  const [angezeigt, setAngezeigt] = useState(location);

  useEffect(() => {
    letzte.current = location;
    let abgebrochen = false;
    const seite = pages.find(({ path }) => path === location.pathname);
    const wechseln = () => { if (!abgebrochen && letzte.current === location) setAngezeigt(location); };
    // Ist der Code schon da, wechselt die Ansicht im selben Frame; sonst erst nach dem Laden.
    if (seite?.Page.preload) seite.Page.preload().then(wechseln, wechseln);
    else wechseln();
    return () => { abgebrochen = true; };
  }, [location]);

  return (
    <Suspense fallback={null}>
      <Routes location={angezeigt}>
        {pages.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <BrowserRouter>
    <CookieConsentBanner />
    <ScrollToTop />
    <AnalyticsTracker />
    <RouteView />
  </BrowserRouter>
);

export default App;
