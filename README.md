# Kinage — alternative landing

A separate alternative to the current Kinage landing, for side-by-side comparison. It is built on the supplied style reference pack, adapted to Kinage; see `DESIGN.md`.

- **Published separately.** Repository `vladislavliger-hub/kinage-landing-alternative`; live at https://vladislavliger-hub.github.io/kinage-landing-alternative/ (GitHub Pages, `.github/workflows/pages.yml`, on every push to `main`).
- **Current landing untouched.** The current landing (`vladislavliger-hub/kinage-landing` and its Pages site) is a different repository and is not changed by this one.
- **No real submissions.** No contact endpoint is configured, so the forms send nothing (see Forms).

## Run

```bash
npm install
npm run dev        # http://localhost:5200/
```

Other commands:

```bash
npm run build      # checks tokens and types, then builds to dist/
npm run preview    # serves dist/ at http://localhost:5201/
```

In the Claude desktop app you can also use the `kinage-alternative` entry in `../.claude/launch.json`. Port 5200 is strict, so it never collides with the current landing (5190/5191).

Build or preview exactly as GitHub Pages serves it, under `/kinage-landing-alternative/`:

```bash
npm run build:pages
npm run preview:pages   # http://localhost:5201/kinage-landing-alternative/
```

Pages builds use `BASE_PATH` (set by the workflow from the Pages site). The build also writes `our-story/index.html`, `advisors/index.html` and `404.html`, so direct loads and refreshes of every page work.

## Pages

| Path | Content |
|---|---|
| `/` | The landing, in this order: hero with a product demo, why it matters, how it works, explainer video, why Kinage, security and control, Ben, FAQ, final call to action. |
| `/advisors` | For advisors — copied from the current site, with copy corrections (below). |
| `/our-story` | Ben's story — copied, with copy corrections (below). |

## Forms

Every "Get early access", "Ask about plans" and "Partner with Kinage" control opens the shared dialog.

**No endpoint is configured, so nothing is ever sent.**

- The dialog says so before you submit.
- After a valid submit it shows **"Nothing was sent"**. It never shows a fake confirmation.
- To connect a real service later, set `VITE_EARLY_ACCESS_ENDPOINT` in `.env.local` (see `src/lib/early-access.ts`). Do this only with separate authorization.

## Copy: sources and rules

The copy is a **proposal**. The agreed copy draft was not available.

**Sources:**
- Kinage Messaging Taxonomy v4 (May 2026) — tagline, problem frame, three jobs, messaging rules;
- the Ben Terk Q&A script;
- the team call of 30 Sep 2026;
- Figma — the product screens 555:2432 and 544:406.

**Decisions applied:**
- **Bank connection** is required (email + bank), read-only through Plaid.
- **Money:** Kinage never pays bills or moves money.
- **Price:** "Ask about plans" instead of a figure. No trial.
- **Flagging:** "flags suspicious signals in the data it monitors". Kinage cannot see cash or phone calls.
- **Security:** only claims confirmed in several sources — read-only access, no bank passwords or SSN, no money movement, disconnect any time.
- **Messaging rules:** headlines use see / clear / view / in one place. Every example shows who is involved. Kinage flags; people decide.
- **Demo names are consistent:**
  - Martha is the parent, Ben her son (the signed-in user), Sarah her daughter.
  - The hero bill is AT&T Home Internet, 18 Apr, $77.26: Overdue, Was Flagged, "Higher than usual and overdue".
  - Verizon appears nowhere on the page.
- **Proof:** one sourced figure (FBI IC3 Elder Fraud Report 2024, reported cases only).
- **Removed:** testimonials and other social proof.

**Copy corrections in the copied pages:**
- **`/advisors`:**
  - Removed "Coordination tools", "Co-branded materials" and "Client reporting". These are unconfirmed capabilities, and the practice-fit section went with them.
  - Removed "Fewer inbound calls" (an outcome promise). It is replaced by "Read-only by design".
  - "Kinage sees only what your client approves" and "chooses what you see" now say who takes part. There are no per-category permissions.
  - "Through Google and Plaid" is now "bank accounts connected through Plaid".
  - "See what it surfaces in the first month" is now "Start with a single client household".
- **`/our-story`:**
  - The closing line is now the tagline.
  - "Decides who sees what" is now "decides who takes part".
- **Site-wide:** page title and description no longer promise "so nothing gets missed". The footer has no street address or phone number (placeholders on the current site).

## Confirmations still needed (not stated anywhere on the site)

1. **Price and trial.** The site says only "monthly subscription, ask about plans".
2. **Security specifics:** encryption standard, MFA, audits and testing, AI-training policy.
3. **Paper mail:** USPS Informed Delivery and photo capture of bills.
4. **Link-only and password-protected bills:** confidence scores and the two-year transaction history.
5. **Permissions:** per-category rules (who sees which bills).
6. **Notifications:** what is sent, and how.
7. **Advisors:** professional dashboard, reports, co-branded materials, pricing.
8. **Privacy Policy and Terms texts.** Not in this project, so the footer shows them as plain labels, not links.
9. **Contact details:** is `hello@kinage.com` the right public address? Is there an address or phone number to show?
10. **Photo of Ben:** confirm it is approved for this use.
11. **The explainer video (supplied file, unchanged).** It still shows the "AT&T Mobile … not from the real Verizon" card (around 0:25 and in the closing shots), a $8,420.18 balance and "You sign in on Google's own screen". Any change needs a new cut of the video.
    - The poster was re-extracted from the same file at 0:12.3, a frame without that card.
    - The player takes its shape from the file (1920 × 1080).

## Deviations from the plan

- **`PhoneDemo` was not copied.** The mobile hero uses the same static bill card, so there is no Verizon text to fix.
- **The archived desktop demo was dropped.** It was used only as a reference while building the hero.

## Structure

```
design-system/tokens.json    DTCG tokens (source of truth) → npm run tokens → src/styles/tokens.css
src/content/                 all copy (home.ts, faq.ts, advisors.ts, our-story.ts, links.ts, site.ts)
src/sections/                landing sections; hero/HeroProductStage = the product demo
src/components/              dialog, video player, icons, product badges and avatars
src/motion/                  GSAP setup, reveal hook, light wheel smoothing (desktop only)
```

Everything here is a copy. Nothing links, imports or symlinks into `../kinage-landing`.

## Refinement pass (30 Sep 2026)

- **Copy.** Section eyebrows are removed (the FAQ keeps its own). Dashes used as sentence separators are rewritten with ordinary punctuation. The final headline has no closing full stop.
- **Hero.** Headline, lead, two actions, and the explainer as the preview, with the fade described in `DESIGN.md`.
  - Both players on the page use the same file and player. Starting one pauses the other.
  - The lower player loads nothing until it is played (`preload="none"`).
- **Problem cards.**
  - New family illustration: `src/assets/3d/family-trim.webp`, from the supplied PNG.
  - All three objects are trimmed to their visible pixels, so they share one image box and scale.
  - The rows are aligned through CSS subgrid.
  - The third heading is now “I thought it was handled”.
- **How it works.** Four synchronised steps and an animated stage.
  - Sources, all read-only:
    - `Kinage-Care/kinage-web-app` main, `client/src/components/OnboardingGate.tsx` and the household `members-card.tsx`, read through the GitHub API; the local checkout was older (26 Aug);
    - Figma 544:406, 544:337 and 544:699;
    - the design's own SVG icons, in `src/assets/figma/upcoming/`.
  - Step 1 is a demonstration only: no OAuth, no bank, no personal data. The product's "90-day trial" line is left out.
- **Comparison.** Uses the navigation's own logo component.
- **Founder.** No accent line and no mat behind the photo. Both arrow links use a vector arrow and no underline.
- **Footer and nav.** Plain Terms and Privacy Policy labels. The nav bar is frosted.
- **Entrance animations.** The same reveal hook and motion tokens as the current landing, applied to groups in reading order.
- **Not available.** The four screenshots mentioned in the brief were not attached to this session. The onboarding and table were built from the repository and Figma sources above.

## Round 2 (1 Oct 2026)

- **Hero.** Two columns on desktop: copy and the two actions on the left, the explainer on the right. Below 1024px they stack. The hero is the only video on the page; the lower explainer section was removed.
- **Walkthrough.** Each step now has its own length, from `HOW.steps[].ms`.
  - **Step 1 (8.2 s).** A simulated pointer clicks the Email card, then the Financial account card. Each card connects and docks into the phone, then one banner replaces both. No real connection or network request is made.
  - **Step 2 (6 s).** Unchanged.
  - **Step 3 (7 s).** A typed Kinage message above the list, and the AT&T row highlighted. The old card stack is gone.
  - **Step 4 (7 s).** The 3D household from Figma "image 338" (node 673:1142, exact export) with Ben, Sarah and Martha. Connector lines are measured at runtime, plus Overdue and Was Flagged chips. The member count shows 3, matching the people displayed.
- **Texture.** Figma "14 - FINAL CTA" (673:1143), layer **"image 269"** (673:1145): an image fill, desaturated, cropped as in the file.
  - Final CTA: Luminosity at 80%.
  - Hero: Luminosity at 6%, faded out before the hero's bottom edge.
  - Asset: `src/assets/texture/texture-269.png`.
- **Pricing and Testimonials.** Restored after the walkthrough.
  - **Price is a local design placeholder: $19.99/month.** It is not an approved offer. There is no trial and no annual discount (`src/content/pricing.ts`).
  - The testimonials are the current landing's three **draft prototype entries**, not verified customer feedback (`src/content/testimonials.ts`).
- **Comparison, founder and supporting pages.**
  - The Kinage comparison card has a full Mist Violet fill.
  - The founder card has more padding, and "Read Ben's story" is an outlined button with a vector arrow.
  - The advisors page has no eyebrows. The setup heading's rectangle was a CSS background on a shared selector, now removed.
  - The Our Story badge is removed.

**Figma references.** Neither node holds the step 3 or step 4 composition the brief describes:
- 673:1158 is a frame holding only the household 3D image;
- 673:1143 is the Final CTA, which is the texture source.

No message-and-table composition was found near those nodes. The newer "Upcoming" frames (664:914, 666:1290, 666:1617, 672:813) are table restyles. Step 3's layout follows the brief's text, and step 4's arrangement is my own.

## Round 3 (1 Oct 2026)

- **Radii.** About 25% less rounding, through the tokens only:
  - md and lg 8 → 6px (cards, buttons, inputs, video);
  - xl 12 → 9px (dialog);
  - 2xl 24 → 18px (pricing, final call to action, walkthrough stage);
  - sm 6 → 5px.

  Pills, avatars, the phone frame and the product UI keep their own radii.
- **Pricing.** "Billed monthly" removed.
- **Hero.**
  - More air under the nav and above the actions; the video is 710 × 400 at desktop (was 667 × 375).
  - From 1024px wide and 600px tall, the hero is at least one screen minus one section padding (capped at 1080px), so the next heading starts just below the first screen.
  - Texture: the same `texture-269.png`, soft-light at 65%, brightened and contrast-stretched; Luminosity would grey a light wash. Masked out before the hero's lower edge.
- **Buttons.**
  - Primary: `#DA6C2D` fill with a dark warm label `#1E0D06` (5.5:1). White would be 3.41:1. Hover is a touch lighter (`#E27A3E`), pressed a touch deeper (`#CF6528`).
  - Outlined: mandarin border, `#A8481A` label (5.8:1), warm wash on hover.
  - Focus ring: `#A8481A`.
  - The final call to action keeps its white `btn--light` / `btn--ghost-light` buttons.
- **Walkthrough.**
  - Step 1: connection cards are 78px tall (padding 18px), with the dock slots and pointer targets moved to match.
  - Step 3: one compact navbar logo (the `Brand` lockup at 64px) above the message, replacing the separate mark and "Kinage" label.
  - Step 4: no Overdue / Was Flagged chips. The connectors are dashed (5 / 7) and flow towards the household, paused off screen, on other steps and in a hidden tab, and static under reduced motion.
- **Entrances.**
  - Problem cards: surface → illustration (+120ms) → title and text → benefit, cards 120ms apart in a row.
  - Pricing: panel → price → plan.
  - Testimonials: heading → carousel wrapper (the cards themselves are never animated by the entrance).
  - Founder: photo, then copy in reading order (the button through a wrapper).
  - Final call to action: panel, then its content.

## Round 3b (1 Oct 2026)

- **Filled orange buttons** (`.btn--primary`: nav, hero, pricing, dialog submit, advisors page): white label and white icons in every state.
  - This is a product decision; white on `#DA6C2D` is 3.41:1, accepted.
  - The fill, size and weight are unchanged.
  - Outlined buttons and the final banner's white buttons are unchanged.
- **Hero texture** follows Figma 680:1176, layer 680:1744 "image 269".
  - Blend: **Color Burn** at 100% over the `#ecebff` → white wash.
  - Placement: the same crop, its 1440 × 1447 box starting 480px above the hero.
  - The blend is on the texture layer itself, inside the isolated hero, so text, buttons, logo and video are not blended.
  - Color Burn leaves white unchanged, so the hero meets the white section below with no seam.
  - The final banner's texture is unchanged (Luminosity 80%).
