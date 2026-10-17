# jcapps Brand-Assets für GitHub

Nicht Teil der Live-Website — Quelldateien für GitHub (Org, Repos, READMEs).

## Org-Avatar

`avatar.svg` / `avatar-1024.png` — quadratisch, nur das Icon-Mark.

Upload: [github.com/organizations/jcapps-dev/settings/profile](https://github.com/organizations/jcapps-dev/settings/profile) → "Upload new picture" → `avatar-1024.png`.

## Repo Social-Preview

`social-preview.svg` / `social-preview.png` — 1280×640px (GitHub-Vorgabe), erscheint beim Teilen eines Repo-Links und in den Repo-Settings.

Upload: pro Repo unter Settings → "Social preview" → `social-preview.png`. Aktuell markengenerisch (nicht pro Repo individualisiert) — bei Bedarf später pro Repo mit Namen anpassen.

## README-Header/Banner

`readme-banner-light.svg` + `readme-banner-dark.svg` (PNG-Fallbacks: `-light.png` / `-dark.png`, 2400×560, 2×-Dichte) — horizontales Logo-Lockup mit Schriftzug, für den Kopf der README-Dateien. Passt sich automatisch an GitHubs Light/Dark-Theme an:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://jcapps.dev/assets/brand/readme-banner-dark.svg">
  <img src="https://jcapps.dev/assets/brand/readme-banner-light.svg" alt="jcapps" width="600">
</picture>
```

Der Dark-Banner hat eine dünne Petrol-Outline um die Icon-Kachel, weil deren eigener fast-schwarzer Fill sonst auf GitHubs Dark-Hintergrund (`#0d1117`) zu wenig Kontrast hätte.

## Konsistenz

Alle Dateien nutzen dieselben festen Farben wie der Header-Mark auf jcapps.dev (`#111110` / `#99f6e4`), nicht die hell/dunkel-wechselnden CSS-Tokens der Website — das Mark soll unabhängig vom jeweiligen Kontext (GitHub-Theme, Browser-Tab) gleich aussehen.
