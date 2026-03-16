# Meta Ads Update — 16 Mar 2026

## What We Found

**Health Score: 24/100 (Grade F)**

After 3 days of running (13-16 Mar), the campaign spent £40.32 and generated **zero real leads**. Here's why:

### 1. Fake Conversions
The "Contact" event was firing every time someone clicked a CTA button (e.g. "Get Your Free Audit") — not when they actually submitted the form. Every visitor clicking 2-3 buttons generated 2-3 fake "conversions." Meta reported 4 Contact conversions at £9.19 each, but none of these were real form submissions. Zero Formspree submissions. Zero Cal.com bookings.

### 2. Meta Was Optimizing for the Wrong People
Because Meta thought button clicks = conversions, the algorithm learned to find people who click buttons — not people who fill out forms. This is why the CTR was 39% (normal is 1-3%). The audience the algorithm found was fundamentally wrong.

### 3. Server-Side Tracking Was Broken
CAPI (Conversions API) coverage was at 1% — should be 75%+. The initial page view had no server-side counterpart, so Meta couldn't match most events. Event Match Quality was 5.2/10 (needs 8+).

### 4. No Retargeting or Exclusions
No custom audiences set up. No retargeting of website visitors. No exclusion of people who already converted. Multiple old campaigns running and competing with each other.

---

## What We Fixed

### Tracking Fixes (Deployed)
- **Contact event inflation fixed** — Contact now only fires on actual form submission, not button clicks
- **CAPI coverage fixed (1% → 75%+)** — Initial PageView now sends matching server-side event with shared event ID for deduplication
- **EMQ improved (5.2 → targeting 8+)** — Added external_id for cross-device matching, country code (GB), first/last name hashing from form submissions
- **CTA clicks reclassified** — All button clicks now fire as "CTAClick" custom event instead of "Contact" conversion event

### New Campaign Launched
- **Old campaigns paused** — All previous campaigns turned off to stop wasting budget
- **New campaign: `MT_Lead_UK_Mar26`** — Leads objective, optimizing for the **Lead** event (fires on /thank-you page after confirmed Formspree submission)
- **Budget:** £50/day with Campaign Budget Optimization (CBO)
- **Bid strategy:** Highest volume (no cost cap while building data)
- **Two ad sets:**
  - **Prospecting** — Advantage+ audience, UK, ages 25-65, interest signals (business owners, brand management, financial services, etc.), converters excluded
  - **Retargeting** — Website visitors (last 30 days), converters excluded
- **6 ads total** — 4 in prospecting, 2 in retargeting, using existing creatives with proper UTM tracking
- **3 Custom Audiences created:**
  - `WEB_AllVisitors_30d` — retargeting pool
  - `WEB_Converters_180d` — exclusion list
  - `WEB_Engaged25pct_30d` — backup retargeting

---

## What to Expect

- **Week 1:** Learning phase. Don't touch anything. Expect 0-5 leads. CPA will be volatile.
- **Week 2:** First optimization. Kill ads with £15+ spend and 0 leads. Adjust budget if CPA is on track.
- **Week 3:** Add new creatives (video ideally). Consider Lookalike audience if 30+ conversions.
- **Week 4:** Scale if CPA < £20, hold if £20-30, pivot if > £30.

**Target:** £15-25 cost per lead, 12-23 leads per week at current budget.

---

## Key Rule
No changes to the campaign for 7 days. Let the learning phase run with clean data.
