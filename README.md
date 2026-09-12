# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2ad85e27-6f5b-40e8-b067-7b0d531a5972

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2ad85e27-6f5b-40e8-b067-7b0d531a5972) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2ad85e27-6f5b-40e8-b067-7b0d531a5972) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Build, Prerender und Performance (kanpas.de)

Die Live-Seite wird statisch aus `dist/` ausgeliefert. Auf dem Server: `git pull && npm run build`
(Node 22, Puppeteer-Chrome für den Prerender). Der Build erzeugt pro Route ein vorgerendertes
`dist/<route>/index.html` und danach `dist/sitemap.xml`.

Was der Build inzwischen tut (Stand 09/2026):

- Routen werden lazy geladen (`src/lib/pages.tsx`, Hülle `src/lib/lazyPage.tsx`). Beim Start wird
  der Chunk der aktuellen Seite vorab geladen, damit der vorgerenderte Snapshot ohne leeren
  Zwischenzustand ersetzt wird; die übrigen Seiten werden 3 s nach `load` nachgeladen (nicht im
  Prerender, sonst landen deren Preload-Links in jedem Snapshot).
- React, ReactDOM und Router liegen in einem eigenen `vendor-*.js`-Chunk (`vite.config.ts`,
  `manualChunks`), der sich nur bei Dependency-Updates ändert.
- Das Stylesheet (~35 KB) wird beim Build in alle HTML-Dateien inline geschrieben
  (`vite.config.ts`, Plugin `kanpas:inline-css`); die CSS-Datei bleibt zusätzlich in `dist/assets`.
- Tailwind scannt nur noch die tatsächlich gebündelten Dateien (`tailwind.config.ts`, `content`).
  Wird eine weitere shadcn-Komponente aus `src/components/ui` importiert, muss sie dort ergänzt werden.
- Bilder: `hero.webp` und `aussen.webp` haben srcset-Varianten (640/960/1280) in `src/assets`,
  erzeugt mit Pillow (LANCZOS, Qualität 82). Die `sizes`-Angaben in `Index.tsx` und `About.tsx`
  spiegeln das Layout (rd-wrap-Padding 20/56 px, Figure-Rahmen 18 px, About-Spalte ca. 520 px)
  und müssen bei Layoutänderungen nachgezogen werden. Logo als `logo-450.webp` (450x139).
- Farbtoken `--rd-gold-text` (#826224) für Gold als Text auf hellen Flächen (Eyebrow, Nº-Labels,
  Speisekarten-Optionsnummern, Timeline-Jahre): Kontrast >= 4,5:1. `--rd-gold` bleibt für
  dunkle Flächen, Rahmen und Hover.
- Footer-Rechtszeile nennt die Website-Betreuung (`Website: ahrweb.de`, `rel="noopener"`).

Die Speisekarte wird zur Laufzeit von admin.kanpas.de geladen; der Prerender wartet 7 s, damit der
Snapshot die vollständige Karte enthält (`renderAfterTime`).
