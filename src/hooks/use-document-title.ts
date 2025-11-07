import { useEffect } from "react";

const SITE_NAME = "KANPA’s";

export const useDocumentTitle = (pageTitle?: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle ? `${SITE_NAME} | ${pageTitle}` : SITE_NAME;

    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);
};