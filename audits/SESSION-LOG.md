# Session Log

Reverse chronological record of work sessions on this project. Each entry: what was done, why, what shipped (commits), and what's still open.

---

## 2026-05-05 — Marketing attribution capture across all conversions

**Why:** Every form submission and Cal.com booking landed in Levi's inbox with no idea which ad/campaign drove the lead. Without attribution, campaign optimisation is impossible.

**What shipped:**
- New `utils/lead-tracking.ts` — captures UTM params + 8 platform click IDs (`fbclid`, `gclid`, `gbraid`, `wbraid`, `msclkid`, `ttclid`, `li_fat_id`, `twclid`) from every page load.
- **First-touch** persisted in `localStorage` (set once, never overwritten — "who paid for this lead originally").
- **Last-touch** in `sessionStorage` (overwritten per session — "what touch immediately preceded the conversion").
- **Submit-time context** at conversion (timestamp, viewport, user-agent, language, timezone).
- `App.tsx` now calls `captureLeadTracking()` on first render and every route change.
- Hero form passes typed object to Formspree containing `name / email / company / website / service / source` + 25+ attribution fields.
- Cal.com inline embed passes the same data via `config.metadata`, surfaced in booking webhooks + records.
- Empty visits don't blow away storage (visitor lands via Meta → leaves → returns directly later still keeps `first_utm_source: meta`).

**Decisions:**
- Used `localStorage` for first-touch (persistent) + `sessionStorage` for last-touch (per-visit). No cookies needed.
- Reused the existing `mt_external_id` UUID as `visitor_id` so Formspree submissions tie back to Meta Pixel events.
- Passed submission to Formspree as a typed object (not via FormData) so we can include 25+ tracking fields without rendering a wall of hidden inputs.

**Commits:** `d957fb0`

**Open items:**
- Verify `auditLpForm` recipient in Formspree dashboard so we can switch the hero form back from `auditForm` to the dedicated LP form.

---

## 2026-05-02 — LP iterations 3-5 + critical Formspree bugfix

**Why:** User reviewed the live LP and flagged 6 visual issues. Then ran a smoke test and found the form was silently dropping submissions.

**What shipped (in order):**

### LP iteration 3 (`f26c574`) — 6 visual fixes + Grade-7 copy sweep
- Logo size in Navbar + Thank-you page bumped 16 → 22 (~38% bigger).
- Hero form: replaced "What's the focus?" 4-chip selector with Company name + Website fields (better signal for the discovery call).
- Removed redundant top divider line above the logo marquee.
- Services bento grid made symmetric (was 6+6 / 4+4+4 / 4+4 with empty slot → now 6+6 / 4+4+4 / 6+6).
- Process step number circles given solid black bg (was near-transparent — vertical timeline line was bleeding through).
- Recent-work case-study cards now use real client cover photos from `data/content.ts` instead of `AbstractArt` SVG placeholders.
- Em dash sweep + jargon swap across LP copy: 13 user-facing em dashes removed, "hero line" → "first line" everywhere.

### Iteration 4 (`cf63c3b`) — Cal.com inline embed + service dropdown
- Hero form: added 8-option service dropdown ("What service do you need?"). Final fields: name (req) / email (req) / company (opt) / website (opt) / service (req).
- Bottom FinalCTA section: form REMOVED, replaced with a Cal.com inline embed. Hypothesis test: do paid-traffic visitors book a call directly more readily than they fill a form?
- Cal.com defer-loaded per CLAUDE.md Rule 3 (~400KB embed.js only fetches when within 200px of section).
- `bookingSuccessful` event wires to `Schedule` Pixel + CAPI + GA4 conversion.
- FinalCTA copy reframed: "Skip the form / Pick a slot. Book the call."

### Iteration 5 (`a5e7ebb`) — Brand SVG logo + footer + Cal.com centering
- Replaced hand-rolled "rounded yellow square + text" Logo with the actual brand SVG (`public/audit-assets/milktree-logo.svg`). The SVG has the sharp-corner yellow square baked in. `Mark` component dropped entirely.
- Footer restructured: removed duplicate small logo at top, giant brand wordmark moved to centred + full-width using the same SVG end-to-end.
- FinalCTA: switched from squeezed 1fr / 1.4fr two-column layout to single-column with content + bullets centred above (max 720px) and Cal.com centred below (max 880px).

### Honeypot bugfix (`e97a8a6`) — Removed `_gotcha`
- User reported "form didn't go through". Diagnosed via `curl` — endpoint returned 200 OK with `{"next":"/thanks","ok":true}` but no email arrived.
- Root cause: browser password managers / autofill extensions were filling the hidden `_gotcha` honeypot. Formspree saw it filled and silently dropped the email dispatch.
- Removed the honeypot. `/audit` is `noindex` + only reachable from ads, so spam risk is near-zero. Formspree's built-in Akismet protection covers it.

### Form-slug switch (`48ac566`) — `auditLpForm` → `auditForm`
- After honeypot removal, form still didn't deliver. Direct curl test of both Formspree endpoints both returned 200 OK + `ok:true`.
- Diagnosis: `auditLpForm` was created via CLI deploy ~1h earlier but the recipient `levi@milktreeagency.com` was never verified server-side — submissions accepted, email dispatch silently dropped.
- Workaround: switched the LP form to use `auditForm` (the proven-working main-site slug, verified months ago). Added hidden `source` field tagging LP submissions as `Audit LP - Hero Card` so Levi can filter from main-site submissions.
- Follow-up still open: verify `auditLpForm` in Formspree dashboard, then switch back.

### Ad copy rewrite (`32db2c1`)
- All 6 ad copies rewritten to UK English Grade 7 reading level (project rule from commit `9df55b9`).
- Removed em dashes from every ad's primary text.
- Killed jargon: "positioning problem", "the second one", "impossible to misread", "hero line", "disconnect/opportunity", "convert".
- Headlines updated where needed (e.g. DES-02 "Fix Your Hero Line." → "Fix Your Homepage." for non-designer founders).

### Final ad set locked in (`2933e27`)
- Designer delivered 6 final ad creatives in `public/ads 2026/apr 26/`.
- Every audit fix landed: AWR-02 modal X removed, DES-01 fake buttons removed, ENG-01 headline trimmed + image swapped to two-strangers-in-conversation shot, ACT-01 crossword + typo risk replaced with new "Good brands get noticed. Clear brands get clients." typography concept.
- Each ad delivered as 4:5 (feed) + 9:16 (reels/stories) — 12 PNGs total.
- LAUNCH-RUNBOOK rewritten end-to-end with final 6 ads, exact file references, paste-ready copy.

**Commits:** `2933e27` `32db2c1` `f26c574` `cf63c3b` `a5e7ebb` `e97a8a6` `48ac566`

**Open items:**
- Verify `auditLpForm` Formspree recipient (resend verification email to Levi).
- Subdomain `audit.milktreeagency.com` deferred — DNS access unavailable.

---

## 2026-05-01 — /audit LP shipped

**Why:** User wanted a dedicated paid-traffic landing page. Designer had exported a Claude Design build (Babel-in-browser, JSX components) — needed proper integration.

**What shipped (in order):**

### Initial port (`84c095e`) — `/audit` route + audit docs
- Ported the 1,242 LoC Claude Design export → 6 proper React `.tsx` components.
- Dropped Babel-in-browser (~70KB transpilation cost on every load).
- Hero rewritten from "Brands that earn attention. Systems that scale it." → **"Nobody knows what you do. We fix that."** to restore message-match with the proven `your_brand_looks_v2` ad winner (4.31% CTR, £0.33 CPC).
- All CTAs and deliverables standardised to "Free Brand Audit · 48 hours".
- Both forms wired to Formspree `auditForm` + Meta Pixel + CAPI Contact events with hashed PII for high EMQ.
- Below-fold sections code-split per CLAUDE.md Rule 5. Marquee animation uses CSS keyframes per Rule 1.
- LP hidden from organic search via `robots.txt` + `noindex` meta — accessible only from ad URLs.
- April creative audit + launch runbook for `MT_Lead_UK_Andromeda_May26` Meta campaign written.

### LP iteration 2 (`e026ee5`) — Isolated thank-you + separate Formspree
- New `AuditThankYouPage` with LP-styled minimal chrome (no main-site nav/footer). Paid-traffic visitors who submit can no longer wander into `/` `/work` `/pricing`.
- Both LP forms moved to a separate `auditLpForm` Formspree handler (later proved problematic — see `48ac566` above).
- Subdomain-aware routing in `App.tsx` prepares for `audit.milktreeagency.com` (when DNS access returns).
- Three LP improvements from §4.4 / §4.5 of the audit doc: "clarity problem" thread woven into hero subhead, "20-min" hook in process step 1, "Your hero line is your pitch" callout in Problem section.

**Commits:** `84c095e` `e026ee5`

---

## 2026-03-13 → 16 — Tracking + paid-traffic foundation (prior session)

Earlier work that this session built on top of:

| Date | Commit | Summary |
|---|---|---|
| 2026-03-16 | `4f7a934` | First Meta Ads audit + campaign blueprint + ads skill framework |
| 2026-03-16 | `e9d43e5` | Fixed inflated Meta conversions: Contact event now only fires on form submit (was firing on every CTA button click — explained the fake conversions in March) |
| 2026-03-13 | `a1534e8` | Fixed Meta CAPI coverage (1% → 75%+) and improved EMQ (6.1 → higher). Added eventID for deduplication, external_id, country code, hashed first/last name. |
| 2026-03-13 | `f9eb13c` | Fixed form submission: added hidden service field required by Formspree |
| 2026-03-13 | `50b695b` | Hidden navbar links for paid traffic to reduce distractions and boost conversions |

These fixes are why Pixel + CAPI are healthy enough today to support the new `/audit` flow with confidence.

---

## Active follow-ups (cross-session)

1. **Verify `auditLpForm` in Formspree** — Levi opens Formspree dashboard → Forms → "Audit LP - Paid Traffic Lead Form" → Settings → Email Notifications → resend verification → click link in inbox. Then switch the hero form back from `auditForm` to `auditLpForm` for clean per-form analytics.
2. **Subdomain `audit.milktreeagency.com`** — DNS access pending. When ready: add domain in Vercel dashboard, add CNAME at registrar, swap ad UTM destinations from `milktreeagency.com/audit` → `audit.milktreeagency.com/`. Code is already subdomain-aware (`App.tsx` host check).
3. **Launch the Meta campaign** — every prerequisite is now green. Walk through Parts 1 → 5 of [`LAUNCH-RUNBOOK-MT_Lead_UK_Andromeda_May26.md`](LAUNCH-RUNBOOK-MT_Lead_UK_Andromeda_May26.md) in Ads Manager.
4. **Week-1 monitoring** — once the campaign is live, hands-off for 7 days (any edit resets learning phase). Day 7 cut: kill any ad with ≥£15 spend and 0 leads.
