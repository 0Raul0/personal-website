# Raul Sheth

A personal website built with Astro, retaining the editorial typography, warm paper palette, and fine rules of the Self Esteem template.

## Development

Requires Node.js >=22.12.0. Use the existing checkout; cloud tasks are already isolated.

```sh
npm ci
npm run dev
npm run format:check
npm run build
```

In the managed cloud sandbox, use `npm ci --cache /workspace/.npm-cache` and prefix Astro commands with `ASTRO_TELEMETRY_DISABLED=1` to avoid writing to restricted home directories.

The static build is written to `dist/`. The production domain remains `https://raulsheth.com` in `astro.config.mjs`.

## Header logo

The header uses `public/images/raul-sheth-logo.png`, a transparent PNG isolated from the handwritten name on page 2 of the supplied notebook PDF. It is shared across all three sections and links back to About. The notebook itself is not included in the repository.

The browser-tab icon uses the handwritten R and S together in `public/favicon-rs.png`, with light lettering on a dark background for readability at small sizes.

## About portraits

The About page uses a text column on the left and three locally served black-and-white portrait placeholders on the right. On small screens the portraits move below the text. These are generated fictional portraits, not photos of Raul. Replace `public/images/about/portrait-01.webp`, `portrait-02.webp`, and `portrait-03.webp` with personal photos, then update the alt text, intrinsic dimensions, and captions in `src/pages/index.astro`. The first image is eager-loaded; the other two are lazy-loaded. Images are compressed WebP assets and require no external image service.

## Sections and Markdown

- `/`: About
- `/blog`: Blog, from `src/content/blog/`
- `/literature-review`: Literature Review, from `src/content/literature-review/`

Both collections start empty. Their `.gitkeep` files preserve the directories without adding entries. Add a `.md` file to the appropriate directory:

```md
---
title: 'Your title'
description: 'A short summary for the index and page metadata.'
date: 2026-11-10
draft: false
---

Your Markdown body.
```

The filename supplies the article URL, for example `src/content/blog/first-note.md` becomes `/blog/first-note`. Each collection has its own index and article routes. Entries sort by date, newest first; `draft: true` entries appear in neither the index nor the generated article pages. No portfolio, tag, or RSS routes are generated.

## Credits

Based on [Self Esteem](https://github.com/m-durana/self-esteem-astro), an Astro adaptation of Aysenur Turk’s editorial layout. See `LICENSE` and `STYLEGUIDE.md`.
