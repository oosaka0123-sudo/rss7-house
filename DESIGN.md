# RSS7 HOUSE — DESIGN v2 Art Direction Rationale & Identity

Lead: Visual Design / Frontend.
Objective: Elevate the public demo into a design-led architectural editorial showcase with cinematic motion, elevated identity, and strict mobile stability.

## 1. Design Rationale (DESIGN v2)

### Architectural Editorial & Japanese Restraint
- **Concept:** "Measure twice, build once" — architectural precision turned into high-fashion visual identity.
- **Editorial Typography:** Dramatic scale contrasts between timeless Mincho serif display headlines (`Yu Mincho` / `Hiragino Mincho ProN`) and sharp sans-serif structural UI / datum metadata (`Hiragino Sans` / `Noto Sans JP` / system sans).
- **Asymmetric Grid Rhythm:** Moving away from standard centered flexboxes into asymmetric multi-column layouts (65/35, 70/30) with architectural datum lines, coordinates, and clear visual anchor points.
- **Cinematic Motion ("Datum Reveal"):** Motion acts as straightedges and architectural drawing lines revealing the design — mask clipping on headlines, horizontal datum drawing lines, image scale resets, and smooth scroll progress.

## 2. Refined Logo Identity (Sashigane Seven v2)

- **The Sashigane Seven Mark:** Fuses the traditional Japanese carpenter's L-square (*sashigane* 指矩) with the numeral **7**.
- **Geometry:**
  - Horizontal top arm (`M12 14 H48`): sashigane horizontal ruler + numeral 7 crossbar.
  - Vertical left arm (`M12 14 V50`): sashigane vertical ruler with 3 fine measurement ticks (`M12 24H20`, `M12 32H20`, `M12 40H20`).
  - Diagonal stroke (`M48 14 L22 54`): 7's diagonal stem passing through the square's true corner.
- **Lockup:** Horizontal header lockup with bold uppercase "RSS7" and clean light-italic "HOUSE", paired with an architectural subtitle.

## 3. Design Tokens & Palette

```css
--ink:          #1A1A17   /* Deep architectural charcoal */
--paper:        #F4F1E9   /* Washi paper background */
--paper-deep:   #EBE5D6   /* Layered tactile paper background */
--surface:      #161B18   /* Dark timber surface background */
--surface-2:    #0E1210   /* Deepest architectural ground */
--accent:       #C14A28   /* Japanese terracotta / clay accent */
--accent-deep:  #7E2C15   /* Deep red-brown clay surface */
--line:         rgba(26,26,23,.14)
--line-dark:    rgba(244,241,233,.18)
--focus:        #F5D84B   /* High-contrast focus indicator */
```

## 4. Touch, Performance & Accessibility Guarantees

- **No viewport widening:** Ticker uses `white-space: nowrap` + `flex: 0 0 auto` to guarantee 0px horizontal scroll on 320px–430px viewports.
- **No hover-only or sticky touch states:** All hover interactions gated behind `@media (hover: hover) and (pointer: fine)`.
- **No loader / blocking overlay:** Content renders immediately.
- **JS-disabled fallback:** All content defaults to 100% visible and accessible without JavaScript.
- **Accessibility:** `prefers-reduced-motion: reduce` stops animations cleanly; visible focus states; semantic HTML5 markup.
