---
name: Blinkin V8 — Der Helle Weg
description: Bright editorial conversion landing; a cobalt signal river carries the scroll from first glance to the conversation.
colors:
  paper: "#f6f4ee"
  card: "#ffffff"
  ink: "#16151d"
  ink-soft: "#3c3a46"
  ink-muted: "#585666"
  cobalt: "#2440e0"
  cobalt-deep: "#1a30b4"
  cobalt-wash: "rgb(36 64 224 / .06)"
  amber: "#e88a00"
  amber-ink: "#8a4d00"
  amber-wash: "rgb(232 138 0 / .09)"
  line: "rgb(22 21 29 / .14)"
  line-strong: "rgb(22 21 29 / .42)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontWeight: 850
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "17.5px"
    lineHeight: 1.65
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontWeight: 700
    letterSpacing: "0.18em"
rounded:
  sm: "11px"
  lg: "18px"
  xl: "26px"
  pill: "99px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "13px 22px"
---

# Design System: Blinkin V8 — Der Helle Weg

## Overview

**Creative North Star: "Die Helle Halle" — the bright material-flow hall.** A sunlit editorial world where one cobalt signal river runs the length of the page: scrolling flies the camera down its spline, through four gate rings (the weekly loop), past case pillars (the proof stretch), into a warm amber core — the conversation itself. The river structures the journey; paper ground, translucent white cards, and serif prose do the persuading.

**Key Characteristics:**
- One accent (cobalt) carries all structure; amber appears only where an outcome is named.
- Mono uppercase labels file every piece of metadata; all data sets tabular figures; depth is one soft shadow vocabulary over a real 3D scene; every animation has a reduced-motion twin.

## Colors

- **Primary — Signal Cobalt** (#2440e0): the only structural accent — CTAs, links, timeline spine, gate rings, data labels; 7.88:1 on paper, white text on it 7.28:1; selection inverts to cobalt-on-white. Hover **Cobalt Deep** (#1a30b4); tint **Cobalt Wash** (rgb(36 64 224/.06)) for hover rows and process chips.
- **Secondary — Destination Amber** (#e88a00): results and the destination only — after-panels, wirkung chips, timeline result strips, the last gate ring, core glow, focus ring. Text voice **Amber Ink** (#8a4d00, 6.08:1 on paper); tint **Amber Wash** (rgb(232 138 0/.09)).
- **Neutral — Paper** (#f6f4ee): page ground *and* the scene's fog/clear color, so the river dissolves into the page. **Card White** (#ffffff, usually /.92) never sits fully opaque over the river. **Ink** (#16151d, 16.47:1) headings; **Ink Soft** (#3c3a46) ledes; **Ink Muted** (#585666, 6.50:1) body and labels. **Line** (rgb(22 21 29/.14)) and **Line Strong** (/.42) are the hairline steps.

**The One Accent Rule.** Cobalt is the only color allowed to structure a screen. **The Amber Is Earned Rule.** No result named, no amber used.

## Typography

**Display Font:** Archivo (850; system-ui fallback) — engineered shouting.
**Body Font:** Source Serif 4 (Georgia fallback) — reading-size credibility at 17.5px/1.65.
**Label Font:** Spline Sans Mono (ui-monospace fallback) — uppercase, tracked metadata.

- **Display** (850, clamp(2.6rem,6vw,5.2rem), lh 1.04, ls −.025em, ≤16ch): hero H1 only. **Headline** (850, clamp(2rem,4.2vw,3.5rem), ≤22ch) / **Title** (850, 1.05–1.95rem): section and card headings.
- **Body** (Source Serif 4, ≤74ch; lede clamp(1.08rem,1.7vw,1.34rem), ≤58ch): prose in Ink Muted; `<strong>` flips to Ink.
- **Label** (mono, .56–.72rem, 500–700, uppercase, ls .07–.3em): kickers with a 22px cobalt dash, chips, captions, buttons.

**The Measured-Value Rule.** Every number — prices, counts, question indices, timeline dots — sets `font-variant-numeric: tabular-nums`.

## Layout

One column: `.wrap` max 1160px (inline padding clamp(18px,4vw,44px)); chrome (topbar, footer) 1240px; prose cards 800px. Sections are stages — padding-block clamp(70px,9vw,140px) with `.breather` gaps of clamp(80px,16vh,200px) so the camera has run-off between stops; the hero fills 100svh and each stage anchors the camera via `data-cam` (0–.985). Z-stack: canvas 0, content 1, topbar 50 (paper/.86 + 12px blur), sticky CTA 55, progress bar 60. Breakpoints: ≥1000px offers go two-up; ≤980 timeline 2-col, ≤940 quali stacks; ≤900 top nav hides and grids collapse; ≤760/720/600 tighten cards, pills, particle counts.

## Elevation & Depth

One soft ink shadow over a real 3D scene. Rest: cards `0 24px 60px rgb(22 21 29/.09)`; hover lifts deepen — `0 18px 44px/.12` (feld), `0 30px 70px/.16` (offer), `0 18px 44px/.22` (sticky pill); cobalt buttons cast `0 14px 34px rgb(36 64 224/.35)` only on hover. **The Floating Card Rule.** Surfaces stay translucent (white /.92) so the river reads through; depth is scene plus a single shadow, never stacked effects.

## Shapes

Radius ladder: 11px buttons/inputs, 13–16px small cards, 18–20px cards/offers, 26px finale, 99px pills (chips, tabs, flags). Borders: 1px Line hairlines; 1.5px marks emphasis (ghost rings, cobalt quote frame, ink FAQ/finale frames); dashed 1.5px means process/roles. List bullets are 6px rotated-square diamonds, amber in after-states.

## Motion

**The River Rule.** The 3D layer is one continuous camera flight down a CatmullRom spline (7 points, z 6→−232); the DOM never competes — its motion stays lifts and fades.

- **Camera flight:** scroll maps to curve t via `data-cam` anchors with smoothstep blending, eased per frame (lerp dt·3.4); the camera banks along the path with a sine bob.
- **Flow particles:** 2,600 river points (1,500 <720px) orbit the spline in cobalt/#b9c4f2/amber mixes; 1,300 dust motes drift wide; four gate tori (t .30–.465, last amber) counter-rotate, ten pillars line the proof stretch, the amber core (t .985) breathes a halo. Pointer velocity excites every third nearby particle toward amber — the bioluminescent wake.
- **Velocity FOV:** scroll speed kicks the fov from 55° toward +9°, eased — fast scrolling reads as acceleration. **Pointer parallax:** the pointer shifts the camera ±3.2 units and the look target ±4, eased .05.
- **Reduced motion:** no rAF loop — one static frame renders at t=.16, the canvas dims to .55, reveals show instantly, all CSS animation/transitions are off; no-WebGL falls back to a pale radial gradient.
- **DOM grammar:** reveals rise 18px over .6s cubic-bezier(.2,.9,.25,1), staggered .07s; hovers lift 1–6px; transitions .18–.35s ease.

Pointer-velocity excitement: fast cursor movement ignites river particles near the projected pointer (screen-space NDC radius, decayed speed), fading as the pointer rests; scroll velocity drives only a subtle FOV kick.
## Components

**Buttons** — 11px radius, mono uppercase label, 13px 22px padding. Primary: cobalt, hover cobalt-deep + −2px lift + cobalt shadow. Ghost: transparent with inset 1.5px line-strong ring, hover turns cobalt. Pill variant 99px (sticky CTA).
**Offer cards** — two-up ≥1000px, 20px radius; cobalt-tinted offer-a vs amber-tinted offer-b with matching borders and flag pills; mono tabular price at 2.15rem; risk-reducers ("monatlich kündbar") beside prices; hairline-separated includes with washed icon squares.
**Timeline + reports** — four columns on a visible stitch-pattern spine (repeating cobalt/amber/paper gradient — the coptic-binding raise); 38px numbered dots ringed cobalt, last amber; steps carry mono tags, dashed role rows, amber-wash result strips; software rows repeat cobalt-wash process / amber-wash wirkung.
**Quali recommender** — check card with custom 19px checkboxes (cobalt fill on check, amber focus ring) feeding a live panel: `data-level` none/hours/sprint recolors it neutral/cobalt/amber and swaps copy plus a prefilled mailto subject.
**Case tabs** — 99px mono pill tabs, selected = ink bg/white text; Arrow/Home/End keys, `aria-selected`/`hidden` wired, .45s fade. Case body: gray-wash before vs amber-gradient after with amber tag pill and diamond bullets. **FAQ** — ink-framed accordion; rows numbered amber-ink; the plus glyph rotates 45° and turns amber when open.
**Sticky CTA** — white 99px pill, fixed bottom-right after 60% hero scroll; muted context line + cobalt mono button. **Finale panel** — 26px radius, radial white→cobalt-wash→amber gradient, ink border, amber glow rising from below; centered display heading, CTAs, tracked mono end-cap.

## Do's and Don'ts

### Do:
- **Do** keep cobalt the only structural accent; tint with its wash instead of adding hues.
- **Do** reserve amber for named outcomes, the destination, and the focus ring.
- **Do** set metadata in tracked mono uppercase and all data in tabular figures.
- **Do** keep a cobalt CTA at every scroll depth (topbar → sticky pill → section CTAs → finale) and hold AA contrast (ink 16.47:1, muted 6.50:1, cobalt 7.88:1, white-on-cobalt 7.28:1, amber-ink 6.08:1).
- **Do** ship the reduced-motion static frame; every animation has a disabled twin.

### Don't:
- **Don't** introduce a second saturated accent or gradients beyond the defined washes.
- **Don't** put amber on navigation, headings, or chrome — it is earned by results only.
- **Don't** make cards fully opaque or stack shadows; one soft ink shadow per surface.
- **Don't** let DOM motion compete with the camera flight; don't center long prose past the 58–74ch caps; don't load fonts, three.js, or any asset from a CDN — everything is self-hosted.
