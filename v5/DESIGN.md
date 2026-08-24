---
name: Blinkin Shibuya Sleeve
description: Tokyo boutique-pop record-sleeve world for the Blinkin v5 site — pale sleeve faces with one geometric mark, dense cobalt obi bands carrying all operational copy.
colors:
  paper: "#f4efe4"
  face: "#fffefa"
  ink: "#16130e"
  ink-muted: "#6b6559"
  obi: "#2743ee"
  obi-deep: "#1d33c4"
  stamp: "#d63a12"
typography:
  display:
    fontFamily: "Archivo"
    fontStretch: "122%"
    fontWeight: 900
    textTransform: "uppercase"
    fontSize: "clamp(2.5rem, 6.4vw, 6rem)"
    lineHeight: 0.96
    letterSpacing: "-0.015em"
  body: "Archivo 17px/1.6"
  credits: "Spline Sans Mono 10–11px uppercase +0.08–0.18em"
---

# Design — v5 "Shibuya Sleeve"

## Overview

The site is a crate of Tokyo boutique-press record sleeves. Every section is a **sleeve face**: pale paper, almost bare, one geometric SVG mark and one display statement. Everything operational lives on the **obi band**: a saturated cobalt paper strip wrapped around its sleeve, printed dense with Spline Sans Mono credits — catalog codes (BLN-2601-A …), cadence tags, prices, tracklists. The density collision between bare face and crowded band is the whole design. Five pages, five releases; navigation is the crate header, the footer is the back-cover credits block.

## Colors

One strong hue owns every band.

- `--paper #f4efe4` sleeve faces / page ground; `--face #fffefa` inner cards.
- `--ink #16130e` type and frames (16.2:1 on paper); `--ink-muted #6b6559` secondary (5.04:1).
- `--obi #2743ee` cobalt bands, links, active nav, diagram bars — white text on it = 6.72:1, cobalt text on paper = 5.86:1.
- `--stamp #d63a12` vermillion reserved for the circular hype stickers (prices) and urgent lamp states; white on it = 4.69:1.
- Hairlines `--line`/`--line-strong`; no colored side-borders.

## Typography

Self-hosted via `fonts.css` (no CDN): **Archivo** variable — display at wdth 122%, weight 900, uppercase, ≤6rem; body at natural width, 17px/1.6. **Spline Sans Mono** is the only voice inside obi bands, catalog plates, track numbers, captions — 10–11px, uppercase, wide tracking. One vertical-rl credit column per hero band (hidden <720px).

## Layout & Components

- **Sleeve** `.sleeve`: white card, 1px strong border, 10px radius, paper shadow; alternating ±0.55° tilt that straightens on hover (transform only). Each page's sections alternate tilt-l/tilt-r.
- **Obi band** `.obi`: cobalt strip wrapped across its sleeve's lower edge (hero variants overhang left/right by 14px); head row = code chip + title + rule + meta; body = vertical credit column + real copy + actions. Slides −8px on sleeve hover to "peek beneath itself".
- **Hype sticker** `.sticker`: vermillion circle, dashed inner ring, rotated 8°, carries the price; straightens on hover.
- **Catalog plate** `.catplate`: mono metadata line with a cobalt dash — placed AFTER its heading.
- **Tracklist** `.tracks/.track`: FAQ as an album tracklist (A1–A8, B1–B8), full-rule rows, button heads with aria-expanded, "+" sign rotating 45° when open. B-side example ledger shows always-open rows.
- **Weeks/steps** `.week`: cobalt tab column + credit-row body (`dt/dd`) + `Ergebnis:` bar in obi-wash with 3px cobalt left edge.
- **Liner diagrams** `.diagram`: ink mini-panels reproducing the flow/score/loop visuals with cobalt bars and vermillion risk marks; descriptive `role="img"` labels carry the full reading.
- **Liner quote / CTA** `.liner`: ink back-cover block for quotes, EU position, next-step CTAs.
- **Marquee** `.marquee`: duplicated logo tracks (aria-hidden copies), pause on hover, static under reduced motion.
- **Header/footer**: sticky ink crate bar with catalog line and spine-tab nav (active = cobalt fill); back-cover footer with dense credit link grid and catalog-line.

## Motion

Reveal = translateY(16px)+fade snap-settle (.55s, ease-out), IntersectionObserver, staggered delays. Hover = transform only (tilt straighten, obi slide, sticker rotate, week slide). `prefers-reduced-motion` kills all animation and pins reveals.

## Do's and Don'ts

**Do** keep faces bare (one mark, one statement); put ALL operational detail on obi bands; number releases consistently (BLN-26XX); keep prices on vermillion stickers in tabular figures; use colons exactly as v4 wrote them.

**Don't** add a second accent hue; don't place kickers above headings (catalog plates ride after); don't gradient-fill or glow anything; don't animate layout properties; don't let obi density drop below readable 10px mono contrast (white ≥ .72 alpha on cobalt only for meta lines).

CONTENT BASE: v4 verbatim (branch claude/korrektur-v4-ca4160) — verified 100% line coverage on all five pages.
