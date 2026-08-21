// Generiert dist/sitemap.xml nach dem Build — lastmod = Build-Datum.
// Läuft automatisch via "npm run build"; nie von Hand pflegen.
import { writeFileSync } from "node:fs";

const BASE = "https://kanpas.de";
const today = new Date().toISOString().slice(0, 10);

const routes = [
  ["/", "1.0"],
  ["/menu", "0.8"],
  ["/tuerkisches-fruehstueck", "0.8"],
  ["/about", "0.6"],
  ["/contact", "0.6"],
  ["/imprint", "0.4"],
  ["/datenschutz", "0.3"],
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ([path, prio]) => `  <url>
    <loc>${BASE}${path === "/" ? "/" : path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${prio}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(new URL("../dist/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml generiert (lastmod: ${today}, ${routes.length} URLs)`);
