# Consolidated Action Plan

**Date:** 2026-03-13
**Goal:** Fix the Meta campaign from 0 leads to profitable lead generation
**Target CPL:** GBP 15-30

---

## Section A: Why the Campaign Is Underperforming

### Root Cause Analysis (ranked by impact)

| # | Root Cause | Impact | Evidence |
|---|-----------|--------|----------|
| 1 | **Wrong conversion event** | CRITICAL | Campaign optimises for Lead (fires on thank-you page after 2-step form). Previous campaign got 23 contacts at GBP 3.32 using Contact event (fires on Step 1). The algorithm has ZERO signal to learn from. |
| 2 | **Landing page is a website, not a landing page** | CRITICAL | 10 sections, full navigation, form at the very bottom, no CTA above the fold. Cold Meta traffic bounces before reaching the form. |
| 3 | **No audience signals** | HIGH | 42.5M-50M broad audience with GBP 15/day = algorithm spreading pennies across millions. No interests, no custom audiences, no lookalikes. |
| 4 | **Only 1 active ad** | HIGH | 3 of 4 ads turned off. Algorithm cannot test creative variations. |
| 5 | **CTA button mismatch** | HIGH | "Book now" implies commitment. Cold traffic from Meta needs "Learn more". |
| 6 | **Ad-to-LP message mismatch** | HIGH | Ad says "Nobody Knows What You Do". LP says "Your brand should sell for you." Different hooks = cognitive disconnect = bounce. |
| 7 | **Two-step form too much friction** | HIGH | Name + email + website, THEN services + budget + goal. Cold traffic drops off. |
| 8 | **No mobile sticky CTA** | MEDIUM | CTA disappears on scroll. Mobile users (80%+ of Meta traffic) lose the conversion path. |

### The 0-Lead Funnel (current state)

```
Meta Ad (6,010 impressions)
    |
    v
Landing Page (unknown visits - no UTM tracking in GA4)
    |
    v
Scroll 10 sections to find form
    |
    v
Step 1: Name + Email + Website → Contact fires
    |
    v
Step 2: Services + Budget + Goal → Submit
    |
    v
Formspree processes → Redirect to /thank-you
    |
    v
Lead event fires → 0 events recorded
```

---

## Section B: Quick Wins (Apply Now - 1-2 hours)

### B1. Switch Conversion Event to Contact [IN META ADS MANAGER]

**Steps:**
1. Go to Ad Set level > advantage_uk_06mar26
2. Click Edit
3. Under "Conversion", change from "Lead" to "Contact"
4. Publish

**Why:** Contact fires on form Step 1 (name + email only). Previous campaign proved this works at GBP 3.32 per contact.

### B2. Change CTA Button [IN META ADS MANAGER]

**Steps:**
1. Go to Ad level > your_brand_looks
2. Click Edit
3. Scroll to "Call to action" dropdown
4. Change from "Book now" to "Learn more"
5. Publish

### B3. Disable Multi-Advertiser Ads [IN META ADS MANAGER]

**Steps:**
1. In ad edit panel, uncheck "Multi-advertiser ads"
2. Publish

### B4. Fix UTM Parameters [IN META ADS MANAGER]

**Steps:**
1. In ad edit panel, scroll to "URL parameters"
2. Replace with: `utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`
3. Publish

### B5. Single-Step Form [CODE CHANGE]

**File:** `sections/FinalCTA.tsx`
- Remove Step 2 entirely (services, budget, goal)
- Make form single step: Name + Email + Website (optional)
- Remove step indicator UI
- Change submit button to "Get My Free Audit"
- Keep Contact tracking on submit

### B6. Sticky Mobile CTA [CODE CHANGE]

**File:** `styles/global.css` + new component
- Add `position: fixed; bottom: 0` bar on mobile
- Show after 200px scroll
- Button: "Get My Free Brand Audit"
- Scrolls to form or opens inline form

### B7. Add Prices to Pricing Cards [CODE CHANGE]

**File:** `data/content.ts`
- Brand Build: "From GBP 1,500"
- Brand Partner: "From GBP 750/mo"
- Add footnote: "Pricing depends on scope. We provide a clear quote after your free audit."

---

## Section C: High-Impact Changes (This Week)

### C1. Add Audience Signals [IN META ADS MANAGER]

**Steps:**
1. Edit ad set > Audience section
2. Under Advantage+ audience, add Audience suggestions:
   - Interests: Small business owners, Entrepreneurship, Business marketing, Brand management
   - Behaviours: Small business owners, Business page admins
3. Publish

### C2. Create Retargeting Audience [IN META ADS MANAGER]

**Steps:**
1. Go to Audiences > Create Audience > Custom Audience
2. Source: Website
3. Include: All website visitors, Last 30 days
4. Name: "Website Visitors 30d"
5. Create second audience: Facebook/Instagram page engagers, Last 90 days
6. Name: "Social Engagers 90d"

### C3. Re-enable Additional Ads [IN META ADS MANAGER]

1. Turn ON "this_could_be" ad
2. Turn ON "your_third_rebrand" ad
3. Keep all 3 ads active for algorithm to test

### C4. Rewrite Landing Page Headline [CODE CHANGE]

**File:** `data/content.ts`

Current: "Your brand should sell for you."

Recommended options:
- "Stop losing leads to competitors with weaker offers but stronger brands."
- "Get a brand identity that brings you better clients without chasing them."
- "Nobody knows what you do. We fix that."

The third option matches the ad hook directly.

### C5. Remove Navigation for Paid Traffic [CODE CHANGE]

Add URL parameter detection. When `?utm_source=meta` is present:
- Hide all navbar links except logo + CTA button
- Disable case study navigation links
- Show simplified page flow

### C6. Render How It Works Section [CODE CHANGE]

**File:** New section using existing `processSteps` data from `data/content.ts`
- 4 steps: Audit and Diagnose, Positioning and Message, Visual Identity, Guidelines and Rollout
- Place after Problem section

---

## Section D: Testing Roadmap (Next 2 Weeks)

### Week 1: Foundation

| Day | Action | Metric to Watch |
|-----|--------|-----------------|
| 1-2 | Apply all Section B quick wins | - |
| 3 | Apply Section C changes | - |
| 4-7 | Monitor Contact events | Target: 3-5 contacts/day |

**Decision point at Day 7:**
- If 15+ contacts: Scale budget to GBP 20/day
- If 5-15 contacts: Optimise LP further
- If < 5 contacts: Test new creative angles

### Week 2: Optimisation

| Test | Hypothesis | Metric |
|------|-----------|--------|
| Headline A/B | "Nobody knows what you do" vs current | Bounce rate, form starts |
| Form position | Above fold vs bottom | Form completion rate |
| Ad angle test | PAS carousel vs social proof static vs before/after | CTR, CPL |
| Audience test | Interest-based vs Advantage+ broad | CPL, lead quality |

### Creative Testing Plan

| Variation | Format | Angle | Priority |
|-----------|--------|-------|----------|
| Before/after brand showcase | Single image | Transformation | HIGH |
| Testimonial + result stat | Single image | Social proof | HIGH |
| "10 people test" short video | Video (15s) | Problem awareness | MEDIUM |
| Case study carousel (Flexibuy) | Carousel | Proof + results | MEDIUM |

---

## Section E: Step-by-Step Implementation Guide

### E1. Meta Ads Manager Changes (do first)

#### Step 1: Change Conversion Event
1. Navigate to Ads Manager > mtd_branding_leads_06mar26
2. Click "Ad sets" tab
3. Click on "advantage_uk_06mar26"
4. Click "Edit"
5. Scroll to "Conversion" section
6. Change conversion event from "Lead" to "Contact"
7. Click "Publish"

#### Step 2: Change CTA Button
1. Navigate to Ads tab
2. Click on "your_brand_looks" (active ad)
3. Click "Edit"
4. Scroll to "Call to action"
5. Change dropdown from "Book now" to "Learn more"
6. Scroll down and uncheck "Multi-advertiser ads"
7. Scroll to "URL parameters"
8. Replace with: `utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`
9. Click "Publish"

#### Step 3: Re-enable Ads
1. In Ads tab, check the boxes for "this_could_be" and "your_third_rebrand"
2. Toggle them ON
3. Apply the same CTA, multi-advertiser, and UTM changes to each

#### Step 4: Add Audience Signals
1. Navigate to Ad Sets tab
2. Click "Edit" on advantage_uk_06mar26
3. Scroll to Audience section
4. Under Advantage+ audience, click to add suggestions
5. Add: Small business owners, Entrepreneurship, Brand management, Marketing
6. Click "Publish"

### E2. Website Code Changes (do second)

See individual code change descriptions in Sections B5-B7 and C4-C6 above. These changes should be:
1. Implemented in code
2. Tested locally with `npm run dev`
3. Committed and pushed to trigger Vercel auto-deploy
4. Verified on production

---

## Expected Results

### Conservative Estimate (Week 1)

| Metric | Before | After (projected) |
|--------|--------|--------------------|
| Conversion event | Lead (0 events) | Contact (3-5/day) |
| CPL | Infinite | GBP 3-8 per contact |
| Learning phase | Stuck | Exits within 5-7 days |
| Daily leads | 0 | 2-4 contacts |

### Optimistic Estimate (Week 2-4)

With LP improvements + audience optimisation:

| Metric | Projected |
|--------|-----------|
| Contact rate | 5-10/day |
| CPL | GBP 5-15 |
| Monthly leads | 60-150 |
| Cost/month | GBP 450-600 |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Contact event gives low-quality leads | Qualify in follow-up email sequence, not in form |
| Learning phase takes too long | If no improvement in 5 days, consider duplicating campaign with fresh learning |
| Budget too low for Advantage+ | If algorithm can't find audience at GBP 15/day, increase to GBP 20 |
| Creative fatigue | Have 3 ads active, prepare 2 new variations for Week 2 |
