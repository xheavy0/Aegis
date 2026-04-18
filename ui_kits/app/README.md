# Aegis App — UI Kit

Pixel-ish recreation of the Aegis GRC web application, built from the source HTML at `_source/aegis-grc-platform.html`.

## Files
- `index.html` — interactive click-thru demo: login → home dashboard → risk register → risk matrix → auditor mode
- `Shell.jsx` — fixed sidebar + topbar layout chrome
- `Sidebar.jsx` — sectioned nav with active indicator + collapse toggle
- `Topbar.jsx` — page title, breadcrumb, status indicator, theme toggle
- `Home.jsx` — welcome hero, quick stats (4×), quick actions, recent activity
- `RiskRegister.jsx` — 2 stat cards (risks / gaps) + 5×5 heatmap + severity totals
- `RiskMatrix.jsx` — the matrix component
- `StatCard.jsx`, `Badge.jsx`, `Button.jsx`, `Card.jsx` — primitives
- `Login.jsx` — centered login card
- `AuditorBanner.jsx` — the amber/black mode banner

## Not implemented
The source has ~30+ screens. This kit covers the highest-impact surfaces for prototyping. Framework detail tables, evidence builder, plugin detail drawer, and the reporting hero are **not** included — reach into `_source/aegis-grc-platform.html` if you need them.
