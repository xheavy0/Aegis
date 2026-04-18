---
name: aegis-design
description: Use this skill to generate well-branded interfaces and assets for Aegis GRC Platform, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a dark-mode governance/risk/compliance web application.
user-invocable: true
---

# Aegis GRC — Design Skill

Read the `README.md` file within this skill, and explore the other available files.

## What's here
- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — CSS variables for colors, typography, spacing, radius, shadows
- `_source/aegis-grc-platform.html` — the original single-file SPA; source of truth for any surface you need to reproduce
- `ui_kits/app/` — JSX recreations of the app shell (Sidebar, Topbar, Home, RiskRegister, RiskMatrix, Login, Primitives)
- `preview/` — small reference cards for every token, component state, and pattern
- `assets/` — logos and any copied illustrations

## How to use
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of this skill folder and create static HTML files for the user to view. Load the fonts via Google Fonts (Sora + JetBrains Mono) and the CSS tokens from `colors_and_type.css`.

If working on production code, you can copy assets and read the rules here to become an expert in designing with the Aegis brand. The original SPA in `_source/` is the authoritative reference — match its dark navy palette, electric-blue→cyan accents, severity color language (red/amber/green/blue), and stroked-SVG iconography.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, surface type, whether it's marketing or in-app, which framework/persona is on screen), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Non-negotiables
- **Dark mode only.** Background `#080c14`, surface `#0d1220`, borders `#1e2d45`.
- **Never use emoji as primary iconography** — always reach for the stroked SVG set in `preview/components-nav.html` or Lucide as the substitute.
- **Severity colors are semantic**, not decorative: red = Critical, amber = High, green = Medium, blue = Low/Info. Don't remap.
- **Type pairing is fixed**: Sora for UI/display, JetBrains Mono for IDs, codes, and framework refs (e.g. `PR.AA-05`).
- **No gradients on large surfaces.** Gradients are reserved for the brand mark, 2px stat-card top ribbons, and the CTA button family.
