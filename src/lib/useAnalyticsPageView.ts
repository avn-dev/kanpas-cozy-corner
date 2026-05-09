import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAnalyticsPageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: location.pathname,
    });
  }, [location.pathname]);
};
