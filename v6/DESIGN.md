---
name: Blinkin Protokoll
description: German session-minutes world for Blinkin v6 — the site reads as the minutes of a well-run business meeting, from letterhead to distribution list.
colors:
  paper: "#f6f5f0"
  sheet: "#fdfdfb"
  ink: "#1a1813"
  ink-muted: "#5d5a52"
  red: "#c8281e"
typography:
  display:
    fontFamily: "Source Serif 4"
    fontWeight: 600
    fontSize: "clamp(2.25rem, 5.3vw, 4.8rem)"
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  body: "Source Serif 4 17.5px/1.65"
  labels: "Spline Sans Mono 10–11px uppercase +0.14–0.22em"
---

# Design — v6 "Protokoll"

## Overview

The site is a **Sitzungsunterlage** — the minutes of the meeting the visitor is about to have with Blinkin. A letterhead hero opens with a metadata table (participants, cadence, result). A sticky **margin rail** carries punched holes, the numbered agenda (TOP 01–07), and a reading-progress bar. Every section is a TOP with a red number chip and a double rule. Offers appear as **Beschlussvorlagen** (resolution drafts) with cost lines and red checkbox lists; the FAQ is filed as **Anlage A**; the page closes under "Beschluss & Unterzeichnung" and an "Ende der Unterlage" rule above a distribution-list footer.

## Dramaturgy (deliberately reordered from v4)

v4 ran a linear sales staircase (offers → proof → self-check → process). v6 follows the logic of the content itself — a session:

1. **Kopfbogen** — promise + meeting metadata
2. **TOP 01 Ist-Zustand** — the self-check comes FIRST ("startet dort, wo ihr gerade seid")
3. **TOP 02 Beschlussvorlagen** — both offers as votable drafts with costs
4. **TOP 03 Der Fahrplan** — the three reports (Analyse/Auswertung/Empfehlung) as protocol items
5. **TOP 04 Der Rhythmus** — roles + Woche 01–04 + the loop
6. **TOP 05 Wirkung** — logo register + Stellantis quote
7. **TOP 06 Anwendungsfelder**, **TOP 07 Rahmenbedingungen**
8. **Anlage A** FAQs → **Beschluss & Unterzeichnung** CTA

## Colors

Cool protocol paper `#f6f5f0`, whiter sheet cards `#fdfdfb`, warm ink `#1a1813` (16.25:1 on paper), muted ink `#5d5a52` (6.31:1). Exactly one accent: **session-red** `#c8281e` — 5.09:1 on paper (AA even for body-size text), white on it 5.56:1. Red marks everything that acts: TOP chips, stamps, checkboxes, agenda state, results.

## Typography

Self-hosted only: **Source Serif 4** (regular + italic, variable) for headings and running text; **Spline Sans Mono** for every label, number, stamp, table header and button; Archivo retained as UI fallback. Headlines are serif roman at up to ~4.8rem with balanced wrapping; italics are reserved for taglines inside resolution drafts.

## Components

- `.kopfbogen` letterhead card: 1.5px ink border, kicker row, doc title, rotated double-border **stamp**, dotted-rule metadata table.
- `.rail`: punch holes, sticky agenda with scroll-spy + progress bar, office meta.
- `.top-head`: red mono chip + serif section title over a 3px double rule.
- `.beschluss` resolution draft: sheet card, ink number chip + red rhythm tag, price line in tabular mono, X-checkbox include list, footnote with terms.
- `.formular`: bordered form sheet with stamped-X checkboxes and live counter footer.
- `.punkt` protocol items: margin numbers (A1…A3 / Schritt 01…) + ink diagram panels (flow/score/loop) rebuilt in the red-on-ink scheme.
- `.woche` week rows: red tab column + dashed protocol line rows + red-wash Ergebnis bar.
- `.verzeichnis`: ruled logo register (also carries infra logos); text-logos (Henkel, Maruti Suzuki) set in tracked mono caps.
- `.frage`: Anlage-A accordion rows with red numbering and rotating + sign.
- `.beschluss-final`: ink closing block with dashed red circle motif and white label chip; `.ende-zeile` double-rule "Ende der Unterlage" marker.

## Motion

Reveal = translateY(12px)+fade (.55s ease-out) via IntersectionObserver with stagger delays; hover = transform only (card lift, week slide-x, button lift). Scroll-spy and progress update passively. `prefers-reduced-motion` disables all transitions and pins reveals visible.

## Do's and Don'ts

**Do** keep the document metaphor consistent (numbers, rules, stamps); keep red purposeful (action/state only); set all metadata in tracked mono caps; keep v4 colons and compound lines intact.

**Don't** introduce a second accent hue or gradients; don't split verbatim sentences across elements; don't use sans-serif for editorial voice; don't let the rail crowd the text column below 1000px (it collapses away).

CONTENT BASE: v4 verbatim (branch claude/korrektur-v4-ca4160) — verified 100% line coverage on all five pages.
