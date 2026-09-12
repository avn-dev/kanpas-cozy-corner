import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";

// Das gesamte Stylesheet ist klein (~30 KB); inline im HTML spart pro Seitenaufruf
// einen render-blockierenden Request. Läuft nach dem Prerender-Plugin über alle HTML-Dateien.
// Die beiden Schriften, die ueber dem Falz zu sehen sind, vorziehen. Ohne das haengen sie
// hinter den JS-Bausteinen in der Warteschlange: live gemessen am 13.09.2026 lag der erste
// Inhalt nach 0,9 s, der groesste Textblock aber erst nach 3,1 s, weil die Serifenschrift
// so spaet kam und der Browser den Text neu zeichnete (/menu/ Leistung 94,
// /tuerkisches-fruehstueck/ 93; Startseite derselben Messung 100 bei 0,8 s).
// Nur diese zwei: die kursive und die 600er kommen weiter unten und sollen nicht mitdraengeln.
const VORLADEN = [/cormorant-garamond-latin-500-normal-.*\.woff2$/, /instrument-sans-latin-wght-normal-.*\.woff2$/];
const preloadFonts = (): Plugin => ({
  name: "kanpas:preload-fonts",
  enforce: "post",
  generateBundle(_options, bundle) {
    const dateien = Object.values(bundle)
      .filter((f) => VORLADEN.some((r) => r.test(f.fileName)))
      .map((f) => f.fileName);
    if (!dateien.length) return;
    const links = dateien
      .map((n) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/${n}">`)
      .join("");
    for (const file of Object.values(bundle)) {
      if (file.type !== "asset" || !file.fileName.endsWith(".html")) continue;
      const html = file.source.toString();
      if (html.includes('as="font"')) continue;
      file.source = html.replace("</head>", `${links}</head>`);
    }
  },
});

const inlineCss = (): Plugin => ({
  name: "kanpas:inline-css",
  enforce: "post",
  generateBundle(_options, bundle) {
    const css = Object.values(bundle).find(
      (file) => file.type === "asset" && file.fileName.endsWith(".css")
    );
    if (!css || css.type !== "asset") return;
    const cssText = css.source.toString();
    const linkPattern = new RegExp(
      `<link[^>]*rel="stylesheet"[^>]*href="/${css.fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`
    );
    for (const file of Object.values(bundle)) {
      if (file.type !== "asset" || !file.fileName.endsWith(".html")) continue;
      const html = file.source.toString();
      if (!linkPattern.test(html)) continue;
      file.source = html.replace(linkPattern, () => `<style>${cssText}</style>`);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    prerender({
      routes: ["/", "/menu", "/about", "/contact", "/imprint", "/tuerkisches-fruehstueck", "/datenschutz", "/404"],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        // Menü-Daten werden zur Laufzeit von admin.kanpas.de geladen —
        // genug Zeit lassen, damit der Snapshot die komplette Karte enthält.
        renderAfterTime: 7000,
        maxConcurrentRoutes: 2,
        inject: { prerender: true },
      },
      postProcess(renderedRoute) {
        // GTM injiziert beim Prerender ein <script src="…gtm.js">-Tag in den Snapshot;
        // ohne Entfernen würde gtm.js nach der Hydration doppelt geladen.
        renderedRoute.html = renderedRoute.html.replace(
          /<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtm\.js[^"]*"[^>]*><\/script>/g,
          ""
        );
      },
    }),
    preloadFonts(), inlineCss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // React + Router in einen eigenen, zwischen Deploys stabilen Chunk
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run\/router)\//.test(id)) {
            return "vendor";
          }
        },
      },
    },
  },
}));
