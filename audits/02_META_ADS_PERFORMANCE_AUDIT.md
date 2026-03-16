# Meta Ads Performance Audit

**Date:** 2026-03-13
**Account:** Milktree Agency ADs Account (act=762151792261302)
**Business ID:** 212986788240286
**Campaign:** mtd_branding_leads_06mar26 (ID: 120239280910250172)
**Date Range:** 6 March - 13 March 2026 (7 days)

---

## Executive Summary

The campaign has generated **0 recorded leads** despite spending approximately GBP 100 over 7 days. The active carousel ad shows 3,631 reach and 6,010 impressions but zero conversions. The root cause is a combination of: (1) optimising for the wrong conversion event, (2) extremely broad targeting with insufficient budget, and (3) landing page conversion architecture that fails cold traffic.

**Previous campaign comparison:** The earlier campaign (mtd_branding_contact_27feb26, now Off) generated **23 website contacts at GBP 3.32 each** by optimising for "Website Contact" instead of "Website Lead". This proves the ads themselves can drive action; the conversion event and post-click experience are the bottleneck.

---

## 1. Campaign Structure

| Level | Name | Status |
|-------|------|--------|
| Campaign | mtd_branding_leads_06mar26 | Active |
| Ad Set | advantage_uk_06mar26 | Active (Learning) |
| Ad 1 | your_brand_looks (carousel) | Active |
| Ad 2 | this_could_be | Off |
| Ad 3 | your_third_rebrand | Off |
| Ad 4 | your_brand_looks (static) | Off |

**Structure issues:**
- Only 1 ad set with 1 active ad. No A/B testing possible.
- 3 ads turned off, concentrating all spend on a single creative.
- Single ad set means no audience testing.

---

## 2. Campaign Settings

| Setting | Value | Assessment |
|---------|-------|------------|
| Objective | Advantage+ Leads | Correct for lead gen |
| Conversion location | Website | Correct |
| Performance goal | Maximise number of leads | Correct |
| Conversion event | Lead | PROBLEM (see below) |
| Dataset | Milktree Pixel (993503079134900) | Correct |
| Cost per result goal | None | Should set cap |
| Budget | GBP 15/day (campaign-level) | Low for broad audience |
| Start date | 6 March 2026, 12:58 GMT | - |
| End date | None | - |
| Attribution | 7-day click, 1-day view, All conversions | Standard |

### 2.1 Conversion Event Mismatch [CRITICAL]

The campaign optimises for "Lead" event but the codebase shows the Lead event fires on the **thank-you page load** (after form submission + page redirect). This means:

1. User must scroll through 10 sections to find the form
2. Complete a 2-step form (name/email, then services/budget)
3. Submit successfully via Formspree
4. Get redirected to /thank-you page
5. THEN the Lead event fires

For the algorithm to learn, it needs ~50 conversions per week. With 0 leads in 7 days, the campaign is permanently stuck in learning phase.

**The previous campaign optimised for "Contact" which fires on form Step 1** (just name + email). Lower friction = more signal = algorithm can learn.

### 2.2 Learning Phase Stuck [CRITICAL]

- Status: "Learning" for 7 full days
- Required: ~50 conversions/week to exit learning
- Actual: 0 conversions
- Impact: Algorithm has zero signal to optimise delivery. It's essentially running blind, showing ads to random people in a 42.5M-50M audience.

### 2.3 Budget Too Low for Audience Size [HIGH]

- Daily budget: GBP 15
- Audience size: 42.5M - 50M (entire UK, all ages, all genders)
- Effective CPM: ~GBP 16.70 (6,010 impressions / GBP 100.37)
- Daily reach: ~500 people
- That's 0.001% of the audience per day

At GBP 15/day into a 50M audience with no targeting constraints, the algorithm is spreading budget so thin it cannot find patterns.

---

## 3. Audience Targeting

| Setting | Value | Assessment |
|---------|-------|------------|
| Advantage+ audience | On | OK for scaling, bad for learning |
| Audience size | 42.5M - 50M | FAR too broad |
| Location | United Kingdom | Correct |
| Age | All (no restriction) | Should restrict |
| Gender | All | Should restrict |
| Interests | None | Should add signals |
| Custom audiences | None | Should create |
| Lookalike audiences | None | Should create |
| Exclusions | None | Should exclude converters |

### 3.1 No Audience Signals [CRITICAL]

Advantage+ audience works best when given signals to start from (interest groups, lookalikes, customer lists). Currently running with ZERO audience inputs. The algorithm has no starting point for optimisation.

**Recommendation:** Add interest-based audience suggestions:
- Business owners, Entrepreneurs, Small business
- Marketing, Branding, Digital marketing
- Job titles: Founder, CEO, Managing Director, Marketing Manager
- B2B-relevant interests

### 3.2 No Custom Audiences [HIGH]

No website visitor retargeting, no customer list upload, no engagement audiences. These would be the highest-quality, lowest-cost audiences.

**Recommendation:** Create:
1. Website visitors (last 30 days) retargeting audience
2. Instagram/Facebook page engagers (last 90 days)
3. 1% lookalike from website visitors or past leads

---

## 4. Ad-Level Performance

### Active Ad: your_brand_looks (carousel)

| Metric | Value |
|--------|-------|
| Format | Carousel (6 cards) |
| Impressions | 6,010 |
| Reach | 3,631 |
| Frequency | 1.66 |
| Results (Leads) | 0 |
| Cost per result | N/A |

### Inactive Ads

| Ad | Impressions | Reach | Frequency | Results |
|----|-------------|-------|-----------|---------|
| this_could_be | 379 | 220 | 1.72 | 0 |
| your_third_rebrand | 201 | 74 | 2.72 | 0 |
| your_brand_looks (static) | 143 | 66 | 2.17 | 0 |

**Note:** All 4 ads have 0 results across combined ~6,700 impressions and ~4,000 reach. This reinforces that the problem is post-click, not creative engagement.

### 4.1 Frequency Already Rising [MEDIUM]

The active ad is at 1.66 frequency after just 7 days with only 3,631 reach. The inactive ads hit even higher frequencies (2.72) with tiny reach. At current trajectory, frequency will exceed 3.0 within another week, causing ad fatigue.

---

## 5. Key Metrics Summary

| Metric | Current | Benchmark (B2B UK) | Status |
|--------|---------|---------------------|--------|
| CPM | ~GBP 16.70 | GBP 10-25 | OK |
| Leads | 0 | - | CRITICAL |
| CPL | Infinite | GBP 15-30 target | CRITICAL |
| Reach | 3,631 | - | Low |
| Frequency | 1.66 | < 2.0 ideal | Warning |
| Learning phase | Stuck | Should exit in 7 days | CRITICAL |

---

## 6. Priority Fixes

| # | Severity | Fix | Expected Impact |
|---|----------|-----|-----------------|
| 1 | CRITICAL | Switch conversion event from Lead to Contact | Algorithm gets signal from form Step 1, can exit learning |
| 2 | CRITICAL | Add audience signals (interests, job titles) | Better quality traffic, faster learning |
| 3 | CRITICAL | Create retargeting audience (website visitors) | Warm traffic converts 3-10x better |
| 4 | HIGH | Set cost cap (GBP 20-30 per lead) | Prevents wasteful spend |
| 5 | HIGH | Increase budget to GBP 20/day once learning exits | More data for optimisation |
| 6 | HIGH | Re-enable 2-3 ad variations for testing | Algorithm needs creative variety |
| 7 | MEDIUM | Create 1% lookalike from page engagers | Higher quality prospecting |
| 8 | MEDIUM | Restrict age range (25-55) for B2B | Filter out unlikely buyers |

---

## 7. Conversion Event Recommendation

**Immediate:** Switch to optimise for "Contact" event (fires on form Step 1: name + email only)
- Lower friction = more events = algorithm can learn
- Previous campaign proved this works (23 contacts at GBP 3.32)

**After learning phase exits:** Consider switching back to "Lead" only if:
- Landing page has been optimised (single-step form, above-fold CTA)
- Getting 50+ contacts per week consistently
- Lead quality from Contact event is validated
