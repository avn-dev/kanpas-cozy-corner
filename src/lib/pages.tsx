import { lazyPage } from "./lazyPage";

// Jede Seite wird als eigener Chunk gebaut und erst geladen, wenn sie gebraucht wird.
export const pages = [
  { path: "/", Page: lazyPage(() => import("@/pages/Index")) },
  { path: "/menu", Page: lazyPage(() => import("@/pages/Menu")) },
  { path: "/about", Page: lazyPage(() => import("@/pages/About")) },
  { path: "/contact", Page: lazyPage(() => import("@/pages/Contact")) },
  { path: "/imprint", Page: lazyPage(() => import("@/pages/Imprint")) },
  { path: "/tuerkisches-fruehstueck", Page: lazyPage(() => import("@/pages/TurkishBreakfast")) },
  { path: "/datenschutz", Page: lazyPage(() => import("@/pages/Privacy")) },
  // Catch-all muss am Ende stehen
  { path: "*", Page: lazyPage(() => import("@/pages/NotFound")) },
];

const notFound = pages[pages.length - 1];

/** Lädt den Chunk der Seite, die zu diesem Pfad gehört (Fallback: 404-Seite). */
export const preloadPage = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const match = pages.find((p) => p.path === normalized) ?? notFound;
  return match.Page.preload();
};

/** Alle übrigen Seiten im Leerlauf nachladen, damit Klicks in der Navigation sofort rendern. */
export const prefetchAllPages = () => {
  pages.forEach((p) => p.Page.preload());
};
