// Rendert src/assets/karte-sinzig.webp einmalig im Look der Website (Pergament/Sepia) aus freien
// OpenFreeMap-Vektorkacheln (OpenMapTiles-Schema, Daten © OpenStreetMap-Mitwirkende, ODbL).
// Nicht Teil des Builds — nur bei Standort-/Stiländerung manuell: `node scripts/generate-static-map.mjs`
import puppeteer from "puppeteer";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const CENTER = [7.2489971, 50.5440221]; // OSM-POI "Kanpa's", Ausdorferstraße 1a
const ZOOM = 16.35;
const W = 720, H = 360, DPR = 2; // CSS-Pixel × DPR = 1440×720 Ausgabe
const OUT = fileURLToPath(new URL("../src/assets/karte-sinzig.webp", import.meta.url));

// Site-Palette (src/index.css)
const paper = "#FBF7EF", parch = "#F3ECDD", cream = "#EFE6D6", ink = "#33261B",
  sepia = "#5C4E40", sepia2 = "#7A6A58", fade = "#A5947C";

const style = await (await fetch("https://tiles.openfreemap.org/styles/positron")).json();
const paint = {
  background: { "background-color": parch },
  park: { "fill-color": "#E6E6D2", "fill-opacity": 0.8 },
  landcover_wood: { "fill-color": "#DFE1CB", "fill-opacity": 0.8 },
  landuse_residential: { "fill-color": parch, "fill-opacity": 1 },
  water: { "fill-color": "#D5DBD8" },
  waterway: { "line-color": "#C3CCC9" },
  building: { "fill-color": "#E3D6BF", "fill-outline-color": "rgba(51,38,27,0.22)" },
  highway_path: { "line-color": "rgba(51,38,27,0.16)", "line-dasharray": [2, 2] },
  highway_minor: { "line-color": paper, "line-opacity": 1 },
  highway_major_casing: { "line-color": "rgba(51,38,27,0.28)" },
  highway_major_inner: { "line-color": paper },
  highway_major_subtle: { "line-color": "rgba(51,38,27,0.18)" },
  highway_motorway_inner: { "line-color": cream },
  highway_motorway_casing: { "line-color": "rgba(51,38,27,0.3)" },
  railway: { "line-color": fade },
  railway_dashline: { "line-color": parch },
  "highway-name-minor": { "text-color": sepia2, "text-halo-color": parch, "text-halo-width": 1.4, "text-halo-blur": 0.3 },
  "highway-name-major": { "text-color": sepia, "text-halo-color": parch, "text-halo-width": 1.4, "text-halo-blur": 0.3 },
  label_town: { "text-color": ink, "text-halo-color": parch, "text-halo-width": 1.5 },
  label_village: { "text-color": ink, "text-halo-color": parch, "text-halo-width": 1.5 },
  label_other: { "text-color": sepia, "text-halo-color": parch, "text-halo-width": 1.5 },
};
for (const layer of style.layers) {
  if (paint[layer.id]) layer.paint = { ...(layer.paint ?? {}), ...paint[layer.id] };
  if (layer.type === "symbol") {
    layer.layout = { ...(layer.layout ?? {}), "text-font": ["Noto Sans Italic"] };
    if (layer.id.startsWith("highway-name")) {
      layer.layout["text-size"] = 12.5;
      layer.layout["symbol-spacing"] = 140;
      layer.layout["text-max-angle"] = 60;
      layer.layout["text-padding"] = 1;
    }
    if (layer.id === "label_town" || layer.id === "label_village") {
      layer.layout["text-transform"] = "uppercase";
      layer.layout["text-letter-spacing"] = 0.2;
      layer.layout["icon-image"] = "";
    }
  }
  // Nebenstraßen einen Tick feiner (Casing-Effekt über Hintergrundkontrast)
  if (layer.id === "highway_minor") layer.paint["line-width"] = ["interpolate", ["exponential", 1.55], ["zoom"], 13, 1.6, 20, 16];
}

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css" rel="stylesheet">
<script src="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.js"></script>
<style>html,body{margin:0;background:${parch}}#map{width:${W}px;height:${H}px}.maplibregl-ctrl{display:none!important}</style>
</head><body><div id="map"></div><script>
const map = new maplibregl.Map({ container: "map", style: ${JSON.stringify(style)}, center: ${JSON.stringify(CENTER)}, zoom: ${ZOOM}, attributionControl: false, interactive: false, fadeDuration: 0, pixelRatio: ${DPR} });
map.once("idle", () => { window.__done = true; });
</script></body></html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: DPR });
await page.setContent(html, { waitUntil: "load" });
await page.waitForFunction("window.__done === true", { timeout: 60000 });
await new Promise((r) => setTimeout(r, 500));
const png = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: W, height: H } });
await browser.close();
const tmp = "/tmp/karte-sinzig.png";
writeFileSync(tmp, png);
execFileSync("cwebp", ["-q", "84", "-quiet", tmp, "-o", OUT]);
console.log(`ok -> ${OUT} (${W * DPR}×${H * DPR})`);
