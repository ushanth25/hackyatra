# SW11 — Screen Build Spec for Claude Code

Read this alongside `SW11_organized.md` (the full architecture document) before building any screen. This file defines the visual design system and the required baseline screens. It does not replace the architecture doc — it tells you how to render what that doc specifies.

## How to use this file

1. Build every screen listed in **Section A (Baseline Screens)** below, exactly as described, using the design system in **Section B**.
2. Then re-read `SW11_organized.md` in full — specifically Section 5 (Auth), Section 6 (Citizen Interface), and Section 7 (Officer & Admin Dashboard) — and identify any screen, modal, or state that architecture describes but this baseline does not cover.
3. Build those additional screens/states yourself, using the same design system in Section B. Do not skip a screen just because it isn't in the baseline list below — the baseline is a floor, not a ceiling.
4. Known gaps to check for specifically (the architecture mentions these but the baseline below does not include them): an officer password-reset flow (officers are provisioned, not self-registered, and receive a reset link — Section 5), an admin threshold-configuration/settings screen (Section 7 sidebar lists "Settings/Profile: user management and threshold configurations"), and an offline/pending-sync state for the citizen app (Section 13 tests loss-of-network behavior — a pothole detected offline should visibly queue until connectivity returns). If you find others while reading, build them too and note what you added and why.

---

## Section A — Baseline screens (required, build these first)

### Citizen mobile app (Expo React Native) — self-registration allowed
1. Splash — session/permission check
2. Citizen login — with visible "Create an account" link
3. Citizen register — self sign-up, role fixed to `citizen`
4. Home — live map + pothole pins + auto-detect toggle + "Report a Pothole" CTA
5. Report a pothole — manual capture form (photo, severity, GPS pin, description)
6. Auto-detection active — live monitoring state with trip stats
7. My Reports — list with status filter chips
8. Report detail — map, photo, 4-step status timeline (Detected → Verified → Assigned → Repaired)
9. Profile — account info, settings list, logout

### Officer + Admin web dashboard (React, responsive) — provisioned login, no self-registration
10. Officer/Admin login — shared entry, NO sign-up link, "Authorized personnel only" note
11. Officer overview — ward locked, KPI cards, trend chart, severity donut, activity feed
12. Live GIS map — ward locked, Leaflet-style map + side panel of pothole cards
13. Reports list — sortable table, ward locked for officers
14. Pothole detail — map + photo + details table + status workflow stepper + audit log
15. Admin city-wide overview — ward selector unlocked, city KPIs, ward heatmap, top-backlog table
16. Admin officer management — provision officers, assign wards, deactivate/reset accounts

---

## Section B — Design system (applies to every screen, baseline and self-identified)

**Product identity:** "GVMC Road Watch" — Greater Visakhapatnam Municipal Corporation, Roads & Buildings Department. Government civic pilot, not a consumer product.

**Palette**
- Primary (headers, nav, primary buttons): deep government blue `#1F3A5F`
- Accent / primary CTA: saffron `#E8842C`
- Surfaces: white `#FFFFFF`, light grey `#F4F6F8`
- Text: near-black `#1A2530` on light surfaces; white on blue
- Status colors — use consistently everywhere, never substitute other colors for these states:
  - Detected / Unrepaired: red `#C0392B`
  - Assigned / In Progress: amber `#E8842C`
  - Repaired / Resolved: green `#2E8B57`

**Typography & style**
- Font: Noto Sans (covers Telugu for local-language support later)
- Flat design: bordered cards, no gradients, no drop-shadow-heavy "bubbly" UI, no playful illustrations, no neon
- High contrast, WCAG-AA minimum
- Official, restrained, trustworthy tone throughout — this is a municipal tool, not a startup app
- Emblem: always a plain placeholder box labeled "Emblem" — never render an actual government emblem/seal

**Structural rules that must hold across screens**
- Citizen flows always show a self-registration path; officer/admin flows never do (Section 5's provisioning model must be visually obvious, not just functionally enforced)
- Ward selector/label is **locked/greyed** for Officer views, **unlocked/interactive** for Admin views — this distinction should be visible at a glance, not just in behavior
- Status chips (red/amber/green) use the same three colors and same labels everywhere — citizen app, officer dashboard, and admin dashboard must visually agree on what "Assigned" or "Repaired" looks like

---

## Section C — Final check before calling this done

Before considering the screen set complete, confirm:
- [ ] Every baseline screen in Section A exists
- [ ] Every gap flagged in "How to use this file," item 4, has been addressed or explicitly ruled out with a reason
- [ ] No additional screens beyond what Section 5/6/7 of the architecture doc actually implies — don't invent scope beyond what the brief and architecture call for (the architecture doc's own "Out of Scope" list still applies)
- [ ] All screens share the palette, status colors, and ward-lock convention in Section B
