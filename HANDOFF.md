# RSS7 HOUSE — HANDOFF

Updated: 2026-09-10

## Current production state
- Repository: `oosaka0123-sudo/rss7-house`
- GitHub Pages: `https://oosaka0123-sudo.github.io/rss7-house/`
- Current main HEAD at handoff: `aac7371`
- HOME hero uses the Veo drone video again, with separate desktop/mobile videos and `loop` enabled.
- Do **not** change the current HOME copy unless explicitly requested. The user preferred the earlier, simpler wording/layout.
- QUALITY has already been rebuilt toward a realistic premium new-build custom-home page.
- Old/used-looking traditional-house imagery was rejected for this new-build order-home concept.

## Highest-priority next task
The user found the same house photo reused on multiple pages and explicitly said:
> 同じ写真 使い回ししないで

Rule from now on: **do not reuse the same main architectural photo on different major sections/pages.** Each major visual slot should get a distinct image.

### User-selected new images
From the latest generated 5-image batch, the user explicitly chose **image 3 and image 5**.

- **Image 3:** bright premium new-build living/dining interior with feature staircase, large windows, warm natural wood, modern Japanese custom-home style.
  - Current conversation generation path: `/mnt/data/ghostwriter_images/generated/wide_cinematic_interior_architectural_photograph_4_batch_3.png`
  - Intended use: interior/WORKS/QUALITY slot where a unique living-space image is needed.
- **Image 5:** premium new-build modern Japanese exterior at night, warm interior lighting, landscaped approach, clearly contemporary/new construction.
  - Current conversation generation path: `/mnt/data/ghostwriter_images/generated/a_wide_cinematic_photorealistic_nighttime_exteri_6_batch_5.png`
  - Intended use: exterior/QUALITY/WORKS/CONTACT slot where a unique nighttime exterior is needed.

These selected images have **not yet been uploaded to the GitHub repository**. Preserve them first, then add them to `assets/` with clear names such as:
- `assets/newbuild-living-stair.webp`
- `assets/newbuild-night-exterior.webp`

After upload, replace duplicated uses of existing house imagery so each page/major section has its own image.

## Visual direction — locked
- Premium new-build custom home / 注文住宅.
- Modern Japanese architecture, high-end but believable.
- Warm wood, plaster/stone, large glazing, landscaped gardens.
- No old machiya/renovation-looking homes for core new-build visuals.
- Avoid obvious AI repetition: same house, same angle, same facade, same sunset scene across sections.
- Mix exterior, interior, kitchen/dining, courtyard, night exterior, details/quality imagery.
- Photos should feel like one builder's portfolio, but **not the exact same house/photo repeated**.

## QUALITY page direction — locked
QUALITY should feel like a real new-build performance/quality page, not an abstract design demo.
Structure remains based on:
1. Materials
2. Comfort / insulation
3. Structure
4. Site quality / inspections
5. Long-life / aftercare

Keep the demo disclaimer for invented performance targets/specs. Do not present fictional values as real company facts.

## HOME hero — locked unless user asks otherwise
- Start from the current house view.
- Veo-generated drone-like upward movement.
- Desktop and mobile-specific video sources.
- Autoplay, muted, playsinline, loop.
- Avoid the old simulated zoom/shake version; user rejected it as `ガタガタ揺れてるだけ`.
- Do not revert to a static or pseudo-motion hero unless explicitly requested.

## Immediate restart checklist
1. Read this `HANDOFF.md` first.
2. Check current `main` and production Pages before editing.
3. Preserve/upload the selected **3rd and 5th generated images**.
4. Audit image usage across `index.html`, `works.html`, `quality.html`, `concept.html`, `contact.html`.
5. Replace duplicated hero-house/other repeated visual slots with unique assets.
6. Test mobile layout first (user primarily checks on Android screenshots).
7. Verify no broken images/links, then publish and provide a cache-busted Pages URL.

## Important user feedback to retain
- `新築の注文住宅のサイトで この写真は駄目` → reject old/used-looking housing imagery.
- `同じ写真 使い回ししないで` → no repeated main photos.
- `三枚目と五枚目使って` → selected images 3 and 5 from the latest generated batch.
- User wants continued execution rather than stopping at a proposal.
