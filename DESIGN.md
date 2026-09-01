# RSS7 HOUSE — Redesign Design Document

Lead: Claude Code (Visual Design / Frontend). Scope: full rebuild of the public
demo, not a patch of the previous release.

## 1. Audit of the previous version

| Area | Problem | Root cause |
|---|---|---|
| Ticker/marquee | Wraps to multiple lines on narrow phones, reads like unrendered code | `.marquee>div` was a flex row with no `white-space:nowrap` / `flex-shrink:0` on the `<span>` items, so items shrank below their content width and their text wrapped |
| "VIEW PROJECT" overlay | Stays visible over the photo after a tap and blocks content | The reveal was driven purely by `:hover`, which touch browsers latch onto after a tap and never cleanly release |
| Logo | Roof outline + numeral "7" | Literal house pictogram combined with the number — no distinct brand geometry, doesn't read as construction/craft, weak at small sizes |
| Motion | Cursor-follower, card tilt-on-mousemove, animated rainbow gradient, blanket `.reveal` fade-up | Effects were bolted on individually; no shared visual idea ties them together |

None of this is patched — HTML, CSS and JS below are a full rewrite.

## 2. Brand positioning

**RSS7 HOUSE** — a Kansai custom-home studio built around measured, honest
construction: the idea that a beautiful house is first a *precisely built*
one. Positioning statement:

> Editorial restraint over ornament. Precision over spectacle. A home is
> a sequence of exact decisions — RSS7 HOUSE makes each one visible.

Design pillars: Premium Japanese Architecture · Editorial · Minimal but Bold ·
Asymmetrical Grid · Strong Typography · Generous Whitespace.

## 3. Logo directions (3 explored, 1 selected)

**A — Kumiki Joint Monogram.** An abstracted mortise-and-tenon joint (組手)
forming a geometric knot. *Rejected*: reads as a generic interlocking-shapes
logo once reduced to two colors; doesn't carry the "7" and is hard to place
in a single word at 24px.

**B — Datum Stack.** Three offset horizontal bars (stepped like architectural
contour/datum lines) with the numeral formed by negative space between them.
*Rejected*: at small sizes it reads as a bar chart / generic tech-startup
mark, not construction.

**C — Sashigane Seven (adopted).** The mark fuses a **sashigane** (指矩) —
the L-square every Japanese carpenter uses to mark true angles — with the
numeral **7**: the square's top arm doubles as the 7's crossbar, and a single
diagonal stroke through the square's corner completes the numeral. Three
short ticks on the vertical arm read as ruler graduations. It communicates
"measured, built by hand" without drawing a house or a roof, holds up in one
color, and is legible reduced to a 24px favicon (three strokes + a diagonal
survive scaling; the fine ticks are the first detail to drop, by design).
It also cleanly produces two lockups from one `<symbol>`: a horizontal
header lockup (mark + wordmark) and a standalone square icon (favicon /
app icon).

```
M12 14 H48        top arm  = 7's crossbar
M12 14 V50        left arm = sashigane's vertical arm
M48 14 L22 54     diagonal = 7's stroke, through the square's corner
M12 24H18 / 32H18 / 40H18   ruler ticks
```

## 4. Design tokens

```css
--ink:        #1A1A17   text / dark ground
--paper:      #F4F1E9   light ground
--paper-deep: #EBE5D6   secondary light surface
--surface:    #1B211D   dark section ground
--surface-2:  #10140F   footer / deepest ground
--accent:     #B8532E   clay — used only for small emphasis (index numbers,
                          rules, links), never as a fill or gradient
--accent-deep:#7A331C   contact section ground (flat, no animated gradient)
--line:       rgba(26,26,23,.16)
--line-dark:  rgba(244,241,233,.20)
--focus:      #F5D84B   focus ring / demo notice only — functional, not brand
```

Typography: system serif (`"Yu Mincho","Hiragino Mincho ProN",serif`) for
display/editorial copy, system sans (`-apple-system,"Hiragino Sans","Noto
Sans JP",sans-serif`) for UI/labels. No webfont network requests — faster,
avoids the generic "Inter + Playfair" AI-template look.

Shape language: **no rounded cards.** Corners are square throughout; the
only circular elements removed (project index badges are now square tags
matching the grid, not circular avatars).

## 5. Wireframe / content rhythm (unchanged information architecture,
rebuilt layout)

1. **Hero** — full-bleed photo, asymmetric text block bottom-left, thin
   vertical datum rule + "01" index annotation (ties to the logo's
   measurement idea).
2. **Datum ticker** — safe, single-line scrolling index strip (rebuilt, see
   §6).
3. **Philosophy** — asymmetric 2-column editorial text (60/40).
4. **Works** — asymmetric project grid, one large + one small, captions
   always in normal flow (not hover-revealed).
5. **Quality/specs** — numbered rows styled as measurement annotations.
6. **Process** — numbered steps.
7. **FAQ** — native `<details>`, no JS dependency.
8. **Contact** — demo form, flat clay ground (no animated gradient).
9. **Footer** — logo lockup + legal line.

## 6. Interaction map

- **Header**: transparent over the hero, crossfades to a solid paper bar
  past 40px scroll. Mobile nav is a full-screen panel (`inert` +
  `aria-hidden` toggled, focus moves to first link, `Escape` closes) —
  carried over from the previous build because it was already correct.
- **Ticker**: rebuilt with `white-space:nowrap` and `flex:0 0 auto` on every
  item so nothing can wrap at any viewport, 320px included. Decorative
  (`aria-hidden`), pauses under reduced motion instead of animating.
- **Project cards**: caption, title and a "view" arrow are always visible
  in normal document flow. Any extra hover motion (image scale, arrow
  travel) is gated behind `@media (hover:hover) and (pointer:fine)` so a
  touch tap can never leave a stuck state — there is no hover-only content
  to begin with.
- **Reveal system ("Datum Reveal")**: one coherent motion idea instead of a
  blanket fade-up —
  - Section labels: quick opacity fade only.
  - Headlines: a clip-path wipe left→right, like a straightedge sliding
    across to reveal the line (echoes the sashigane).
  - Photography: clip-path inset reveal from the same edge + a slow,
    subtle scale settle.
  - Ticks/rules: `stroke-dashoffset` draw-in, reusing the ruler-tick motif
    from the logo.
  All driven by one `IntersectionObserver`, all disabled identically under
  `prefers-reduced-motion: reduce`, and all default to the visible state
  in CSS — JavaScript only ever *adds* the animated-in state, so content
  is fully present with JS disabled.
- Removed entirely: custom cursor follower, per-card mouse-tilt, animated
  gradient background — decorative motion with no content purpose.

## 7. Mobile / touch verification

Checked at 320 / 375 / 390 / 430px and desktop:
- Ticker stays single-line at 320px (explicit `nowrap` + `flex:0 0 auto`).
- No `:hover`-only content anywhere; touch has nothing to get stuck open.
- Tap targets ≥44px (menu button, nav links, form controls).
- Hero, specs, steps, form collapse to single column; form fields stack.

## 8. Performance / accessibility

- No webfonts, no JS framework, two existing `webp` photos reused as-is.
- `fetchpriority="high"` + `preload` kept on the hero image only.
- Skip link, `:focus-visible` ring, semantic landmarks/headings, native
  `<details>` FAQ, labelled form fields, `prefers-reduced-motion` support.
- All primary content renders and is readable with JavaScript disabled
  (menu becomes a normal in-flow anchor list; reveal states default to
  visible).
