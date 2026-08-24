---
name: Blinkin Vom Rauschen zur Struktur
description: One-page three.js storytelling for Blinkin v7 — a scroll-morphed particle field travels from unstructured knowledge to a crystallized decision.
colors:
  bg: "#0a0a10"
  ink: "#ece9e1"
  ink-muted: "#a09db0"
  accent-light: "#93a5ff"
  cobalt: "#3455ff"
  amber: "#ffb35c"
typography:
  display:
    fontFamily: "Archivo"
    fontWeight: 800
    fontSize: "clamp(2.5rem, 6.4vw, 5.4rem)"
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body: "Archivo 17px/1.65"
  labels: "Spline Sans Mono 10–11px uppercase +0.16–0.22em"
---

# Design — v7 "Vom Rauschen zur Struktur"

## Overview

A single-page WebGL story. A fixed three.js canvas holds one particle field (~6,400 points, 3,400 on mobile) that **morphs through ten procedural states** as chapters scroll past. The narrative is Blinkin's method made visible: unstructured knowledge condenses into decisions.

| Chapter | State | Shape |
|---|---|---|
| Eröffnung | 0 | drifting noise cloud — das Rauschen |
| Beschlussvorlagen | 1 | two orbit systems (Office Hours / Build Sprint) |
| Ausgangspunkt | 2 | sphere + scan ring — der Ist-Zustand wird abgetastet |
| Der Fahrplan | 3 | three concentric rings — die Reports |
| Der Loop | 4 | amber torus + four nodes — Woche 01–04 |
| Build Sprint | 5 | cubic lattice — Ordnung |
| Anwendungsfelder | 6 | six constellations |
| AI Playground | 7 | wave grid |
| Wirkung | 8 | wide calm drift |
| Rahmen & Herkunft | 2 | scan motif returns — Souveränität wird geprüft |
| Anlage A | 8 | reading calm |
| Beschluss | 9 | converging bright core |

## Motion system

Scroll position maps to a continuous float index between chapter anchors; positions and colors lerp between state arrays with smoothstep, plus a per-particle sine wobble whose amplitude per state is authored (loud in noise, near-zero in lattice). Field spin speed and camera z/y are also state-lerped; pointer parallax eases at 4%. Round additive sprites (CanvasTexture radial gradient), no postprocessing, DPR capped at 1.75. `prefers-reduced-motion` renders exactly one static frame; hidden tabs pause the loop; WebGL failure removes the canvas and falls back to a radial gradient body class.

## Colors & type

Deep ink `#0a0a10`, warm text `#ece9e1` (16.3:1), muted `#a09db0` (7.5:1). Glow family cobalt `#3455ff` / light accent `#93a5ff` (8.5:1 — safe for small text); signal amber `#ffb35c` (11:1) marks results, the Loop and every CTA of consequence. Archivo carries display/body; Spline Sans Mono carries labels, numbers, chips. Self-hosted only; three.js r160 lives in `vendor/` — zero CDN requests.

## Components

Floating `.panel` glass cards (blur 14px, hairline border) hold text over the field; offer drafts use tinted gradients (cobalt/amber) with price lines and diamond include-lists; reports reuse the diagram panels (flow/score/loop) recolored ink-on-dark; weeks keep tab+rows anatomy with amber Ergebnis bars; FAQ accordion, self-check form with stamped-X checkboxes and live counter; chapter dots rail with tooltips; minimal fixed topbar with live chapter indicator.

## Do's and Don'ts

**Do** let breather sections give the field room; keep one CTA color per intent (cobalt = Office Hours path, amber = Sprint/results); re-measure anchors on resize.

**Don't** add DOM-animated layout under the canvas; don't exceed DPR cap or particle budget on mobile; don't put critical content only inside the 3D scene — the page must read fully without WebGL.

CONTENT BASE: v4 verbatim (branch claude/korrektur-v4-ca4160), all five pages merged into one chaptered story — verified 100% line coverage (406 unique lines).
