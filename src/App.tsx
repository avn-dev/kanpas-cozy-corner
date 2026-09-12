import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ScrollToTop from "./lib/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { pages } from "./lib/pages";

const App = () => (
  <BrowserRouter>
    <CookieConsentBanner />
    <ScrollToTop />
    <AnalyticsTracker />
    <Suspense fallback={null}>
      <Routes>
        {pages.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
