# jcapps Brand-Assets für GitHub

Nicht Teil der Live-Website — Quelldateien für GitHub (Org, Repos, READMEs).

## Org-Avatar

`avatar.svg` / `avatar-1024.png` — quadratisch, nur das Icon-Mark.

Upload: [github.com/organizations/jcapps-dev/settings/profile](https://github.com/organizations/jcapps-dev/settings/profile) → "Upload new picture" → `avatar-1024.png`.

## Repo Social-Preview

`social-preview.svg` / `social-preview.png` — 1280×640px (GitHub-Vorgabe), erscheint beim Teilen eines Repo-Links und in den Repo-Settings.

Upload: pro Repo unter Settings → "Social preview" → `social-preview.png`. Aktuell markengenerisch (nicht pro Repo individualisiert) — bei Bedarf später pro Repo mit Namen anpassen.

## README-Header/Banner

`readme-banner-light.svg` + `readme-banner-dark.svg` (PNG: `-light.png` / `-dark.png`, 1760×480, 2×-Dichte) — horizontales Logo-Lockup mit Schriftzug, für den Kopf der README-Dateien. Passt sich automatisch an GitHubs Light/Dark-Theme an:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.png">
  <img src=".github/assets/banner-light.png" alt="jcapps" width="440">
</picture>
```

Der Dark-Banner hat eine dünne Petrol-Outline um die Icon-Kachel, weil deren eigener fast-schwarzer Fill sonst auf GitHubs Dark-Hintergrund (`#0d1117`) zu wenig Kontrast hätte.

## Konsistenz

Alle Dateien nutzen dieselben festen Farben wie der Header-Mark auf jcapps.dev (`#111110` / `#99f6e4`), nicht die hell/dunkel-wechselnden CSS-Tokens der Website — das Mark soll unabhängig vom jeweiligen Kontext (GitHub-Theme, Browser-Tab) gleich aussehen.

## Schrift & Neu-Erzeugung

Schriftzug in **IBM Plex Mono 500**, Unterzeile in **IBM Plex Sans 400** — dieselben Schriften wie auf jcapps.dev. Die Schriften sind als base64-woff2 **ins SVG eingebettet**, damit das Logo überall gleich aussieht (GitHub zeigt SVGs als `<img>`; Systemschriften würden je nach Rechner abweichen).

In den READMEs die **PNGs** verwenden und die Dateien ins jeweilige Repo unter `.github/assets/` legen (so hängt die README nicht von der Website ab). Neu erzeugen: `python3 generate.py <ausgabe-ordner>` erzeugt die SVGs; PNGs per Headless-Chrome mit 2× Dichte (Banner) bzw. 1× (Social Preview) rendern.
