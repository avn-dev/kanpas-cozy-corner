import { useEffect } from "react";

const SITE_NAME = "KANPA’s";
const BASE_URL = "https://kanpas.de";

type SeoOptions = {
  /** Seitenteil des Titels; wird zu "KANPA’s | …". Leer lassen für reinen Site-Namen. */
  title?: string;
  description: string;
  /** Pfad der Route, z. B. "/menu" */
  path: string;
  noindex?: boolean;
  /** Route-spezifisches JSON-LD (z. B. FAQPage); wird beim Prerendering eingefroren. */
  jsonLd?: Record<string, unknown>;
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Setzt Title, Meta-Description, Canonical und OG/Twitter-Tags pro Route.
 * Wird beim Build-Prerendering in das statische HTML der Route eingefroren.
 */
export const useSeo = ({ title, description, path, noindex, jsonLd }: SeoOptions) => {
  useEffect(() => {
    const fullTitle = title ? `${SITE_NAME} | ${title}` : SITE_NAME;
    const url = path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    const existing = document.getElementById("route-jsonld");
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.id = "route-jsonld";
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, path, noindex, jsonLd]);
};
