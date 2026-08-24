---
name: Blinkin V9
description: Parloa-grammar enterprise landing on warm paper — serif display voice, Archivo UI, one signal orange, proof-led path to a booked call.
colors:
  paper: "#f5f3ee"
  card: "#fffdf9"
  ink: "#211d19"
  ink-soft: "#453e37"
  muted: "#75695f"
  accent: "#ff7714"
  accent-deep: "#b34700"
  accent-wash: "rgb(255 119 20 / 0.10)"
  line: "rgb(33 29 25 / 0.14)"
  line-strong: "rgb(33 29 25 / 0.45)"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.7rem, 6vw, 5.4rem)"
    fontWeight: 560
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    lineHeight: 1.6
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 700
    letterSpacing: "0.18em"
rounded:
  sm: "12px"
  md: "16px"
  lg: "22px"
  pill: "99px"
spacing:
  section: "clamp(64px, 8vw, 128px)"
  container-pad: "clamp(18px, 4vw, 44px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "#ff8a38"
---
# Design System: Blinkin V9

## Overview

**Creative North Star: "Warm Paper, One Signal"**

The client pinned parloa.com/de as the form-giver: a warm, confident enterprise SaaS world — near-black ink on warm paper (#f5f3ee), exactly one signal orange, serif display speaking over Archivo UI, mono labels annotating everything. Conversion runs on repetition (a mailto booking CTA at every scroll depth) and proof (brand marquee, Vorher/Nachher case plates, dark quote band). Motion stays deliberately small — reveals, one marquee, tab fades; no WebGL.
**Key Characteristics:** warm paper + hairline ink borders; one orange with two duties (fills #ff7714 under ink text, text #b34700); serif-560 tight display vs engineered sans body; mono kickers above every section; flat surfaces, shadows only as feedback; German v4 copy verbatim.

## Colors

One warm neutral ramp plus a single orange; every text tone clears 4.5:1 on paper.
### Primary
- **Signal Orange** (#ff7714): the only accent — primary buttons, selected tabs/steps, VN "Nachher" tiles, ::selection; ink on it measures 6.3:1.
- **Deep Ember** (#b34700): orange reserved for text — kickers, indices, links (4.96:1).
### Neutral
- **Warm Paper** (#f5f3ee): page ground; ink reads 15.1:1 on it. **Card White** (#fffdf9) lifts plates off it.
- **Ink** (#211d19): headings, dark bands, inverted surfaces. **Soft Ink** (#453e37): ledes. **Warm Gray** (#75695f): tertiary copy at a 4.8:1 floor.
- **Line / Strong Line** (ink at 14% / 45% alpha): the entire border vocabulary.
**The One Signal Rule.** Fills use #ff7714 with ink text; text uses #b34700. Never white-on-orange, never a second hue.
**The Wash Rule.** Every tint or hover wash is rgb(255 119 20/.10) — reuse it, don't remix it.

## Typography

**Display Font:** Source Serif 4 (Georgia fallback) · **Body/UI Font:** Archivo (system-ui fallback) · **Label/Mono:** Spline Sans Mono — editorial serif voice over an engineered grotesque; the mono acts as a filing-system stamp.
### Hierarchy
- **Display** (serif 560, clamp(2.7rem,6vw,5.4rem), lh 1.06, −.03em, ≤15ch): H1 only.
- **Big/Mid** (serif 560, clamp(2rem,4.2vw,3.6rem) / clamp(1.4rem,2.4vw,2.1rem)): H2/H3; quotes share this voice; prices run serif 2.5rem tabular.
- **Small/Lede** (Archivo 700 1.02rem / clamp(1.05rem,1.5vw,1.25rem) soft-ink, ≤56ch): card titles / intros.
- **Body** (muted, ≤72ch): running copy; `strong` snaps back to ink.
- **Label** (mono .68rem, 700, uppercase, tracked .08–.2em, Deep Ember): kickers, indices, tags, meta rows.
**The Label-First Rule.** Every block opens with a mono kicker (orange dash + caps) before its serif headline.

## Layout

1280px container (padding-inline clamp(18px,4vw,44px)); 840px reading column; sections breathe at padding-block clamp(64px,8vw,128px) between `.breather` spacers. Breakpoints: ≥1000px splits hero/offers into two columns; 980px hides the top-nav; 900/880/780/720/600px stack grids progressively.
Page anatomy: sticky blurred topbar → hero grid (H1 + dual CTA + trust chips | platform shot) → logo marquee band → pain-point cards → segmented industry switcher → Office-Hours roles line + 4-week stepper + three report cards → Playground chips, figure and 3-step lifecycle stepper → dark results band (quote, case tabs, VN plates) → two price plates → quali recommender → Build Sprint steps → EU/infra trustband → FAQ accordion → dark final CTA with radial orange glow → mega footer; a sticky booking pill joins after 60% of the hero.
### Motion
- **Reveals:** opacity + 18px rise, .6s cubic-bezier(.2,.9,.25,1), staggers .07/.14/.21s; IntersectionObserver threshold .12, fires once per element.
- **Marquee:** duplicated track loops translateX(−50%) over 38s linear infinite and pauses on hover; reduced-motion wraps it static.
- **Switches:** panels cross-fade via v9-fade .4s (industry + case tabs); buttons lift −2px/.2s, plates −6px/.35s; the FAQ "+" rotates 45°.
- **Kill switch:** prefers-reduced-motion strips every animation/transition and smooth scroll, JS skips the observer, html:not(.js) forces reveals visible.

## Elevation & Depth

Flat by default: hairlines and tonal layering (paper → card → wash) draw all depth. Shadows answer interaction only — primary-button hover 0 12px 30px rgb(255 119 20/.35) (ink button: ink/.3), plate hover 0 34px 80px rgb(33 29 25/.14), sticky pill 0 18px 44px rgb(33 29 25/.24); only hero media keeps a resting ambient shadow (same value).

## Shapes

Soft rectangles whose radius climbs with rank — controls 9–12px, tiles 14px, cards/frames 16–18px, plates 20–22px, final CTA 26px, pills 99px for chips/tabs. Edges are 1px hairlines; 1.5px strong strokes flag interactive frames (ghost-button inset rings, quali/reco/FAQ boxes). Dashed geometry marks process: dashed role frame, dotted gradient timeline rails, 45°-rotated square bullets.

## Components

- **Buttons** (12px radius, Archivo 700, ↗/↓ glyphs): primary orange/ink; ink/paper variant; ghost = transparent with inset 1.5px line-strong ring darkening to ink on hover; all lift on hover; a sticky bottom-right pill (after 60% of hero) wraps a small primary button.
- **Trust chips & brand marquee** — card-white proof pills under the hero CTA; the marquee is a full-bleed card strip, mono caption, 24px logos at 85% opacity, duplicated for its seamless loop.
- **Segmented switcher** — vertical tab list, 3px orange active bar + wash fill + mono index; roving tabindex (arrows/Home/End); panel card fades in.
- **Steppers** — numbered dots (46px ink discs; outlined card discs on the weeks rail) chained by dashed/dotted gradient rails over equal-height cards.
- **Dark results band** — ink ground, paper type; translucent quote plate; pill case-tabs (selected = orange/ink); white case plate with Vorher(gray)/Nachher(wash) grid, mono tags, diamond bullets.
- **Price plates** — 22px cards, serif tabular price at 2.5rem, ✓-in-wash inclusion list, hover lift; `offer-hot` adds an orange gradient + orange border.
- **Quali recommender** — hidden checkboxes driving 19px kasten squares (orange when checked, visible focus ring) beside an aria-live verdict plate: neutral → hours (wash gradient) → sprint (inverted ink).
- **FAQ accordion** — 1.5px ink frame, mono A#/B# indices, "+" rotating to "×", data-open rows toggling aria-expanded.

## Do's and Don'ts

### Do:
- **Do** set orange text in #b34700 (4.96:1) and keep #ff7714 for fills carrying ink text (6.3:1).
- **Do** pair every serif headline with its mono kicker, and repeat the mailto CTA at every depth — topbar, section actions, sticky bottom-right pill, finale.
- **Do** preserve keyboard paths: skip link, roving-tabindex tabs, aria-expanded FAQ, :focus-visible 3px orange ring at 2px offset.
### Don't:
- **Don't** introduce a second hue, white-on-orange text, shadows at rest, or motion beyond reveal/marquee/switch grammar.
- **Don't** ship CDN assets, three.js/WebGL, or non-self-hosted fonts — the pinned stack is static, DSGVO-clean files.
- **Don't** touch v4-bound copy or invent customers, metrics, or promises.