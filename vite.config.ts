import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";

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
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
