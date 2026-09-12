/**
 * Signal, dass die erste Seite im Baum steht.
 *
 * Gesendet wird es von der Bereitmeldung in App.tsx, die als Geschwister der Routen in
 * derselben Suspense-Grenze haengt und damit am selben Commit wie der Seiteninhalt.
 * Der Cookie-Kasten wartet darauf: ohne das erschien er rund 260 ms vor dem Seiteninhalt
 * und wurde danach von fest positionierten Elementen der Seite verschoben (auf /menu/ von
 * der angehefteten Leiste "Tisch reservieren", 60 px nach oben, Layoutversatz 0,29 von
 * insgesamt 0,30 der Seite, gemessen am 13.09.2026).
 *
 * Eigenes Modul statt einer Konstante in App.tsx, damit zwischen App und Kasten kein
 * Importkreis entsteht.
 */
export const SEITE_BEREIT = "kanpas:seite-bereit";

declare global {
  interface Window {
    __kanpasSeiteBereit?: boolean;
  }
}

export const seiteBereitMelden = () => {
  if (typeof window === "undefined" || window.__kanpasSeiteBereit) return;
  window.__kanpasSeiteBereit = true;
  window.dispatchEvent(new Event(SEITE_BEREIT));
};

/** Ruft `dann` auf, sobald die erste Seite steht; sofort, wenn das schon passiert ist. */
export const wennSeiteBereit = (dann: () => void) => {
  if (window.__kanpasSeiteBereit) {
    dann();
    return () => {};
  }
  window.addEventListener(SEITE_BEREIT, dann, { once: true });
  return () => window.removeEventListener(SEITE_BEREIT, dann);
};
