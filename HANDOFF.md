# RSS7 HOUSE — HANDOFF

Updated: 2026-09-13

## LATEST OVERRIDE — ABSOLUTE PHOTO RULE
This section supersedes any older wording below about photo reuse or selected image numbers.

- **同じ写真は絶対に使わない。**
- The same image file must not appear more than once anywhere across the public site.
- No cross-page reuse and no same-page reuse, even for secondary cards, mosaics, backgrounds, posters, or decorative sections.
- Before publish, audit `index.html`, `works.html`, `quality.html`, `concept.html`, `contact.html` and CSS image references. Any duplicated architectural image path is a release blocker.
- If unique approved photos run out, stop and leave that slot photo-free rather than reusing an existing photo.
- Do not silently substitute an unapproved generated image.
- HOME Veo hero video and the current HOME copy remain locked unless the user explicitly asks to change them.
- Core visuals must remain premium contemporary new-build custom homes; no old-house, machiya, renovation, or used-looking imagery.

### Current selected generated images
The latest explicit user selection is:
1. **4th image:** `静寂の中庭と北欧和モダンの家` — modern new-build courtyard/interior image.
2. **5th image:** `夜空に映える和モダン邸宅` — modern new-build night exterior image.

These selections replace older handoff wording that referred to image 3 and image 5.

## Current production state
- Repository: `oosaka0123-sudo/rss7-house`
- GitHub Pages: `https://oosaka0123-sudo.github.io/rss7-house/`
- HOME hero uses the Veo drone video, with separate desktop/mobile videos and loop enabled.
- Do not change the current HOME copy unless explicitly requested.
- QUALITY is intended to be a realistic premium new-build custom-home page.

## Highest-priority next task
Remove all duplicated architectural photo usage across the public five-page site and make every photo slot unique.

## Visual direction — locked
- Premium new-build custom home / 注文住宅.
- Modern Japanese architecture, high-end but believable.
- Warm wood, plaster/stone, large glazing, landscaped gardens.
- No old machiya/renovation-looking homes for core new-build visuals.
- Avoid obvious AI repetition: same house, same angle, same facade, same sunset scene across sections.
- Mix exterior, interior, kitchen/dining, courtyard, night exterior, details/quality imagery.
- Photos should feel like one builder's portfolio, but no exact photo may be repeated anywhere.

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
- Avoid the old simulated zoom/shake version.
- Do not revert to a static or pseudo-motion hero unless explicitly requested.

## Immediate restart checklist
1. Read this `HANDOFF.md` first.
2. Check current `main` and production Pages before editing.
3. Audit every image reference across `index.html`, `works.html`, `quality.html`, `concept.html`, `contact.html` and relevant CSS.
4. Build a file-to-slot map and guarantee every public image path is used exactly once.
5. Add/use the approved 4th and 5th generated images in unique slots only.
6. If unique photos are insufficient, remove/de-emphasize a photo slot instead of reusing an image.
7. Test mobile layout first (user primarily checks on Android screenshots).
8. Verify no duplicated image paths, no broken images/links, then publish and provide a cache-busted Pages URL.

## Important user feedback to retain
- `新築の注文住宅のサイトで この写真は駄目` → reject old/used-looking housing imagery.
- `同じ写真 使い回ししないで` → no repeated photos.
- `ルール 同じ写真絶対に使わない` → absolute global rule; duplicate photo usage blocks release.
- `四枚目と五枚目使って` → latest selected generated images are 4th and 5th.
- User wants continued execution rather than stopping at a proposal.
