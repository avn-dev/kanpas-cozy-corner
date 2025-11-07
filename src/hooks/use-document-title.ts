import { useEffect } from "react";

const SITE_NAME = "Kanpa’s | Café & Brunch in Sinzig";

export const useDocumentTitle = (pageTitle?: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle ? `${SITE_NAME} | ${pageTitle}` : SITE_NAME;

    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);
};