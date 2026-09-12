import { ComponentType, lazy } from "react";

type PageModule = { default: ComponentType };
export type PageLoader = () => Promise<PageModule>;

/**
 * React.lazy mit Vorladen: Ist das Modul bereits geladen, rendert die Seite
 * synchron und ohne Suspense-Fallback. So ersetzt der erste Render den
 * vorgerenderten Snapshot in einem Schritt statt über einen leeren Zwischenzustand.
 */
export const lazyPage = (load: PageLoader) => {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(load);
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  Page.preload = () => load().then((m) => { Loaded = m.default; });
  return Page;
};
