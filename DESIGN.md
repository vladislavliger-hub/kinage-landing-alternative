# Kinage alternative landing — design notes

A second, local direction for the Kinage landing, built for side-by-side comparison with the current site. Its base is the **supplied style reference pack** (a design description, DTCG tokens and CSS variables), adapted to Kinage. Where the pack conflicts with the Kinage brand or with the team's feedback (call of 30 Sep 2026), Kinage wins. The pack itself is not part of this project.

All values live in `design-system/tokens.json` → `npm run tokens` → `src/styles/tokens.css`. Components use tokens only.

## What comes from the pack, unchanged in spirit

| Pattern | Where |
|---|---|
| Full-bleed wash (Mist Violet → white) behind a centred stack: pill tag → display headline → slate subtext → filled + ghost buttons of **identical size** | Hero, `/advisors`, `/our-story` |
| Floating product frame over the wash: white, 8px, deep layered shadow, with a soft glow behind it | Hero demo, explainer video |
| Floating white nav (8px), **pill** items in Plum Velvet, the current item on Mist Violet, one filled action | Nav |
| Section heading block: pill tag → 40–56px display heading, line-height ≈ 1.0 → slate 18px subtext | Every section |
| Alternating white and tinted bands; 2–3-column grids of white 8px cards with a hairline and the small shadow; Mist Violet icon tiles with stroke glyphs | Problem, Compare, Trust |
| Data-table card: header row, hairline rows, alternating row fill, pill statuses | Kinage "Upcoming payments" |
| Profile-card grid: initials avatar, name, role, detail — iconographic, no photos | "Who's involved" |
| Radii: one small radius for every rectangular surface (6px since round 3, the pack's 8px reduced by about 25%), 18px for large panels, capsules only for tags and nav | Everywhere |
| Shadow structure (sm / lg / inset-glow highlight) | Cards, frames, the flagged bill |

## What was adapted for Kinage, and why

| Pack | Here | Why |
|---|---|---|
| Geometric display face, weight 500 | **Plus Jakarta Sans 500** (the pack's named substitute), same scale, line-height 1.0 | Tightness is the point of the pack. |
| Body at 16px | **Inter**, body 17px, lead 18–20px | The audience is 40–60+. |
| — | **Museo Sans** only for the logo and the product UI inside frames | The product must look like Kinage, while the page speaks the new system. |
| Deep violet headings and filled button | Headings `#2a1236` (the same deep ink, shifted toward eggplant). Filled button **eggplant `#6a396a`**. | The team: eggplant "works perfectly". |
| Royal violet links | `#5b2d8f` | Closer to the product violet; 9.5:1 on white. |
| Violet-only tinted sections | White alternating with **warm cream `#faf6f0`** (How it works, Security). Mist Violet only in the hero wash, tags and icon tiles. | The team: cream balances cool violet; flat lavender does not. |
| Multi-stop hero glow | Only its lavender `#cf8aff` and peach `#ffad74` stops, low and blurred, behind white surfaces | Warmth without loud gradients. |
| — | **Warm accent**: peach `#ffad74` for decoration only (dots, rules, glow). Text uses `#9a4712` (6.4:1). | The team asked for a warm accent, used sparingly. The product's own "Due Soon" and "Unusual Amount" badges point the same way. |
| Blue-tinted shadows | Same structure and opacities, plum-neutral hue `42,26,56`; the inset highlight in eggplant | Warmer, on-brand. |
| — | **No `vh` heights anywhere**; section rhythm 88 / 72 / 56px | Removes the empty bands seen on tall or narrow windows. |
| No motion in the pack | The current site's motion tokens: calm reveals (0.6s, ease-out, 16px), reduced motion respected | Consistency with the existing stack. |

## Contrast (text on its background)

| Pair | Ratio |
|---|---|
| Ink `#2a1236` on white | 17.0 |
| Slate `#615e6e` on white | 6.3 |
| Slate on cream | 5.9 |
| Link `#5b2d8f` on white | 9.5 |
| Link on Mist Violet (tags) | 8.1 |
| Warm text `#9a4712` on white | 6.4 |
| White on eggplant | 8.7 |
| Input border `#8e8894` on white (non-text) | 3.4 |

Ash `#9491a1` (3.1:1) is used for decoration only, never for copy.

## Hero

- **Actions.** Exactly two, the same size: Get early access (filled) and Kinage for advisors (ghost, a link to `/advisors`).
- **Preview.** The explainer video itself (`src/content/media.ts`, 1920 × 1080 read from the file). While idle, the poster's lower ~22% fades into the hero wash through a mask on the media layer only; the play button, controls and subtitles are never masked. Playing animates the mask away; the box keeps its size.
- **First screen.** From 768px up, the preview's width is capped by the room left under the actions times the file's ratio. Measured: 1920 × 1080 → 1040 × 585 ending at 1021px; 1366 × 768 → 620 × 349 ending at 744px; 390 × 844 → 350 × 197 ending at 694px.

## How it works

One shared `active` step drives the tabs and the stage.

- **Autoplay.** 6 s per step, 1 → 2 → 3 → 4 → 1. It pauses while hovered, focused inside, off screen or in a hidden tab, and is off under reduced motion.
- **Moves.** Visuals travel on an arc (16° on a circle 1.35 × the stage width) with position only; surfaces never rotate. Moves take 0.56 s, and a new selection interrupts from the current position.
- **Visuals.** Each is drawn in the product's own styling:
  1. The onboarding connections, structured like `OnboardingGate` in `kinage-web-app` (main).
  2. Upcoming payments, from Figma 544:406.
  3. The payment alert card, from Figma 544:337.
  4. The household with the product's roles: Coordinator, Supporter, Person supported.
