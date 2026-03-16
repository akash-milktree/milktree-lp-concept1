# Meta Ads Audit — Milktree Agency
**Period:** 13 Mar 2026 – 16 Mar 2026
**Account:** Milktree Agency AD (act=762151792261302)
**Pixel:** 993503079134900
**Audited:** 16 Mar 2026

---

## Meta Ads Health Score: 24/100 (Grade: F)

```
Pixel / CAPI Health: 35/100  ████░░░░░░  (30% weight)
Creative:            25/100  ███░░░░░░░  (30% weight)
Account Structure:   20/100  ██░░░░░░░░  (20% weight)
Audience:            15/100  ██░░░░░░░░  (20% weight)
```

**Weighted score:** (35 x 0.30) + (25 x 0.30) + (20 x 0.20) + (15 x 0.20) = 10.5 + 7.5 + 4.0 + 3.0 = **25/100**

---

## CRITICAL FINDING: Zero Real Leads

**Total spend: £40.32 → 0 actual leads (Formspree submissions or Cal.com bookings)**

Meta reported 4 "Contact" conversions at £9.19/each, but these were **inflated by a tracking bug** — `trackContact()` fired on every CTA button click (scrolling to the form section), not on actual form submissions. Every visitor who clicked 2-3 CTA buttons generated 2-3 fake "conversions."

**This bug was fixed today (commit `e9d43e5`)** — Contact now only fires on actual form submission.

---

## 1. Pixel / CAPI Health (35/100)

| # | Check | Status | Details |
|---|-------|--------|---------|
| 1 | Meta Pixel installed and firing | **PASS** | Pixel 993503079134900 fires on all pages |
| 2 | CAPI active | **PASS** | Server-side events via `/api/meta-capi` Vercel function, confirmed working (200 + events_received) |
| 3 | Event deduplication (event_id matching) | **WARNING** | Fixed today — initial PageView had no eventID prior to commit `a1534e8`. CAPI calls now use matching eventIDs. Needs 24-48h to reflect in Events Manager |
| 4 | EMQ for key events | **FAIL** | Contact EMQ: 5.2/10 (needs ≥8.0). Other events show low EMQ. Fixed today — added external_id, country code, fn/ln hashing |
| 5 | CAPI coverage rate | **FAIL** | Diagnostics shows "Low rate of pixel events covered by Conversions API" for PageView. Fixed today — initial PageView now sends CAPI counterpart |
| 6 | Standard events configured | **WARNING** | PageView, ViewContent, Contact, Lead, Schedule configured. Missing: AddToCart, Purchase (N/A for service business). Contact event was misconfigured (firing on clicks not submissions) |
| 7 | Domain verification | **PASS** | milktreeagency.com verified |
| 8 | Server-side customer_information params | **WARNING** | Was only sending fbp, fbc, user_agent, IP. Fixed today — now includes external_id, ct (country), fn, ln, em |
| 9 | Aggregated Event Measurement (AEM) | **WARNING** | Not explicitly configured — should prioritize Lead > Contact in AEM event ranking |
| 10 | Correct currency/value on conversion events | **PASS** | Lead event sends currency: USD, value: 0 |

### Events Manager Summary (13-16 Mar)

| Event | Status | Integration | EMQ | Total Events | Notes |
|-------|--------|-------------|-----|-------------|-------|
| PageView | Active | Multiple (Pixel + CAPI) | ~6/10 | ~1,400 | CAPI coverage was 1%, fixed today |
| ViewContent | Active | Multiple | - | Low | |
| Contact | Active | Multiple | 5.2/10 | 18 | **All 18 were CTA clicks, not form submissions** |
| SocialClick | Active | Multiple | - | Low | Custom event (correct) |
| FAQInteraction | Active | Multiple | 5.2/10 | Low | Custom event (correct) |
| Schedule | Active | Multiple | - | Low | |
| Lead | Active | Multiple | - | 2 | Legitimate events (test submissions) |

---

## 2. Creative (25/100)

| # | Check | Status | Details |
|---|-------|--------|---------|
| 11 | Creative formats (≥3 types) | **FAIL** | Only 1 format visible — static image ads. No video, carousel, or collection |
| 12 | Creatives per ad set (≥5) | **WARNING** | 4 ads in the Contact ad set. Below the 5 minimum recommendation |
| 13 | Creative fatigue (CTR drop >20%) | **N/A** | Too short a period to measure (3 days) |
| 14 | Video creative tested | **FAIL** | No video ads visible |
| 15 | UGC/testimonial creative | **FAIL** | No UGC or testimonial-style creatives visible |
| 16 | Dynamic Creative Optimization (DCO) | **FAIL** | Not enabled |
| 17 | Ad copy: headline <40 chars | **PASS** | Ad names suggest concise headlines |
| 18 | Creative refresh cadence | **N/A** | Campaign too new to assess |

### Ad Performance (from CSV)

| Ad Name | Results | Cost/Result | Link Clicks | CPC | CTR | Reach | Impressions | Spend |
|---------|---------|-------------|-------------|-----|-----|-------|-------------|-------|
| your_brand_looks – Copy | 2 | £15.67 | 1,089 | £0.03 | 40.80% | 1,253 | 2,669 | £31.34 |
| your_brand_looks – Copy (2) | 1 | £1.03 | 8 | £0.13 | 28.57% | 19 | 28 | £1.03 |
| your_third_rebrand – Copy | 0 | — | 7 | £0.12 | 6.73% | 31 | 104 | £0.81 |
| this_could_be – Copy | 1 | £4.63 | 99 | £0.05 | 36.67% | 122 | 270 | £4.63 |

**Quality/Engagement/Conversion Rankings: ALL show "-"** (not enough data or below threshold)

---

## 3. Account Structure (20/100)

| # | Check | Status | Details |
|---|-------|--------|---------|
| 19 | CBO vs ABO intentional | **PASS** | Campaign Budget Optimization in use |
| 20 | Campaign consolidation | **WARNING** | Multiple campaigns visible (mmt_branding_leads, advantage_uk_contact, advantage_uk_06mar, Marketing Campaigns Q1/25, milktree_lead_gen). Only 1-2 actively spending |
| 21 | Learning phase health | **FAIL** | Ad sets cannot exit learning phase — need 50 conversion events/week. With 4 fake Contact events in 3 days, the ad set will never exit learning. Lead ad set has 0 events |
| 22 | Budget per ad set ≥5x target CPA | **FAIL** | £50/day budget but CPA is unknown (no real conversions). Even fake CPA of £9.19 means budget is ~5.4x, but this is meaningless with 0 real leads |
| 23 | Ad set audience overlap <30% | **WARNING** | Two ad sets targeting UK — likely overlapping but different optimization events |
| 24 | Campaign naming conventions | **PASS** | Consistent naming: advantage_uk_{objective}_{date} |
| 25 | Advantage+ features | **WARNING** | advantage_uk campaigns suggest Advantage+ audience in use, but no ASC (N/A for service business) |
| 26 | Simplified structure | **FAIL** | Multiple old/inactive campaigns cluttering the account. Should have 1 consolidated campaign |

---

## 4. Audience & Targeting (15/100)

| # | Check | Status | Details |
|---|-------|--------|---------|
| 27 | Prospecting frequency (7-day) <3.0 | **WARNING** | Cannot calculate precisely from data, but 3,004 impressions / 1,362 reach = 2.2 frequency for Contact ad set — acceptable |
| 28 | Retargeting frequency | **N/A** | No dedicated retargeting ad set visible |
| 29 | Custom Audiences | **FAIL** | No evidence of website visitor, customer list, or engagement audiences |
| 30 | Lookalike Audiences | **FAIL** | No Lookalike audiences visible |
| 31 | Advantage+ Audience tested | **WARNING** | Appears to be using Advantage+ audience (ad set naming suggests it) |
| 32 | Interest targeting breadth | **WARNING** | Cannot assess from screenshots — need audience details |
| 33 | Exclusions (purchasers, overlap) | **FAIL** | No exclusion audiences visible |
| 34 | Location targeting | **PASS** | UK-targeted (consistent with ad set naming "advantage_uk") |

### Anomalous CTR Analysis

The Contact ad set shows **39.38% CTR** (1,183 link clicks from 3,004 impressions). Normal Meta ad CTR is **1-3%**. This 39% is approximately **13-40x above normal**.

Possible explanations:
1. **Tracking inflation** — the Contact events were firing on CTA clicks, and Meta may be double-counting interactions
2. **Bot/invalid traffic** — automated clicks inflating numbers
3. **Advantage+ audience signal issue** — algorithm finding clickers, not converters (because it was optimizing for fake Contact events)
4. **Misleading ad creative** — causing accidental clicks (unlikely at this scale)

**Recommendation:** After the tracking fix settles (24-48h), monitor CTR. If it remains >5%, there may be a click quality issue.

---

## Summary of Issues Fixed Today

| Issue | Commit | Impact |
|-------|--------|--------|
| CAPI coverage 1% → should be 75%+ | `a1534e8` | Initial PageView now sends CAPI with matching eventID |
| EMQ 5.2-6.1/10 → targeting 8+ | `a1534e8` | Added external_id, country code (gb), fn/ln hashing |
| Contact event inflation (CTA clicks = conversions) | `e9d43e5` | Contact now ONLY fires on actual form submission |

---

## Priority Action Plan

### P0 — Do Immediately (Today)

1. **Switch campaign conversion event from Contact to Lead**
   - Go to Ads Manager → Campaign → Edit → Conversion Event → Change to "Lead"
   - Lead only fires on the thank-you page after a real Formspree submission
   - This stops Meta from optimizing for fake button-click conversions

2. **Pause the `advantage_uk_contact_13mar26` ad set**
   - This ad set has been optimizing for the wrong event for 3 days
   - Its learned audience is "people who click CTA buttons" — not "people who submit forms"
   - Create a new ad set optimized for Lead instead

3. **Verify CAPI coverage in Events Manager (check after 24h)**
   - Go to Events Manager → Diagnostics
   - Confirm "Low rate of pixel events covered by Conversions API" warning clears
   - PageView CAPI coverage should show ≥75%

### P1 — This Week

4. **Configure Aggregated Event Measurement (AEM) priority**
   - Events Manager → Aggregated Event Measurement → Configure Web Events
   - Set priority order: Lead (highest) > Contact > ViewContent > PageView

5. **Create Custom Audiences for retargeting**
   - Website visitors (last 30 days) who didn't convert
   - Form starters (scrolled to #audit) who didn't submit
   - Video viewers (once video ads are created)

6. **Add video creative**
   - Current: Only static images. Meta strongly favors video in Reels/Stories placements
   - Record 15-30 second videos: testimonial clips, before/after brand reveals, founder talking head
   - This unlocks Reels, Stories, and In-Stream placements

7. **Consolidate campaigns**
   - Pause all old campaigns (mmt_branding_leads, Marketing Campaigns Q1/25, milktree_lead_gen)
   - Run ONE campaign with 1-2 ad sets: Prospecting (Lead optimization) + Retargeting (if budget allows)

### P2 — Next 2 Weeks

8. **Test Advantage+ Shopping Campaign (ASC) style setup**
   - Use Advantage+ audience with Lead as conversion event
   - Set daily budget to ≥£30 (ensures enough data for learning phase exit at ~50 events/week)

9. **Add UGC/testimonial creatives**
   - Real client testimonials perform 2-3x better for service businesses
   - Combine with "your_brand_looks" style creatives for diversity

10. **Monitor EMQ improvement**
    - Check EMQ scores weekly — target ≥8.0 for Contact and Lead events
    - If EMQ stays below 7 after 2 weeks, consider adding Enhanced Matching via Meta's built-in feature

---

## Key Metrics to Track Post-Fix

| Metric | Current (Broken) | Target (2 Weeks) | Target (30 Days) |
|--------|-------------------|-------------------|-------------------|
| Real leads (Formspree) | 0 | 3-5 | 10+ |
| CAPI coverage | 1% | 75%+ | 90%+ |
| EMQ (Contact) | 5.2/10 | 7.0+ | 8.0+ |
| EMQ (Lead) | — | 7.0+ | 8.0+ |
| CTR (link clicks) | 39.38% (anomalous) | 1-3% (normal) | 1-3% |
| Cost per Lead | ∞ (0 leads) | £15-25 | £10-20 |
| Learning phase | Never exiting | Exiting in 7 days | Stable |

---

## Bottom Line

The campaign spent £40.32 over 3 days and generated **zero real leads**. The root cause was a tracking bug that made Meta think every CTA button click was a conversion, so the algorithm optimized for clickers instead of form submitters. This has been fixed. The immediate action is to **switch the conversion event to Lead** and **create a new ad set** — the current one's learned audience is corrupted by the fake signal.
