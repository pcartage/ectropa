# Ectropa content and maintenance guide

The site separates words and media from layout. Routine content edits belong in `src/content.ts`; the visual system lives in `src/styles.css`.

## Inputs to finalize

1. **Opening line** — one sentence, 8–18 words, describing what Ectropa holds and its relationship with time.
2. **Hero image** — one horizontal black-and-white image, ideally 2400 × 1600 px and under 450 KB as WebP.
3. **Philosophy** — two paragraphs of 35–60 words each. Use concrete decisions and disciplines, not claims.
4. **Domains** — two to four areas of focus. Each needs a title and a 25–45 word description.
5. **Provenance note** — 35–60 words showing practical fluency through one or two specific details.
6. **Contact address** — a monitored email at the `ectropa.com` domain.
7. **Final mark** — supplied as `public/ectropa-mark.svg` and used throughout the site.

## A practical interview process

Answer these questions in plain language before editing:

- What does Ectropa own or oversee, described without naming individual assets?
- Which decisions have benefited from patience?
- What details do you inspect personally before committing capital?
- What would Ectropa refuse even if the return looked attractive?
- What should a potential counterpart understand after one minute on the site?
- Which inquiries should the website invite—and which should it quietly discourage?

Turn the answers into short copy. Remove adjectives such as “leading,” “premier,” “innovative,” and “world-class.” Replace abstractions with observable actions.

## Image preparation

1. Obtain an image you own or license for commercial web use.
2. Crop it to roughly 3:2, with room for white text in the lower-left area.
3. Convert it to black-and-white and keep contrast moderate.
4. Export WebP at 2400 px wide, aiming for 250–450 KB.
5. Save it as `public/media/hero.webp` and update `hero.image` in `src/content.ts`.

## Publishing

Changes pushed to the `main` branch are built and published by GitHub Actions. In repository settings, set Pages source to **GitHub Actions**. Keep `public/CNAME` unchanged so `www.ectropa.com` remains attached.

## Maintenance rhythm

- **Quarterly:** test the contact address, review the domains copy, and open the site on a phone and laptop.
- **Annually:** confirm the hero-image license, dependencies, DNS, and GitHub access.
- **When holdings evolve:** edit only the relevant domain language; avoid turning the site into an asset register.
- **When the mark changes:** replace `public/ectropa-mark.svg`. The site and browser icon use the same source file.

Before publishing, run the build locally and confirm the generated `dist` folder contains `CNAME`.
