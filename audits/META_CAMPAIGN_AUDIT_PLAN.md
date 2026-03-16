# Milktree Meta Campaign Audit Plan
## Campaign Context: 7-Day Meta Ads Campaign | 1 Lead Generated

**Date:** 2026-03-13
**Objective:** Diagnose why the Meta campaign is underperforming (1 lead in 7 days) and create an actionable improvement plan
**Landing Page:** milktreeagency.com (Vite + React SPA)
**Service:** Brand identity agency (B2B services, avg deal value likely GBP 2,000-5,000+)

---

## Audit Sequence

### Phase 1: Landing Page CRO Audit
**File:** `audits/01_LANDING_PAGE_CRO_AUDIT.md`
**Method:** Review website code + live site via Chrome

**What we check:**
- [ ] Value proposition clarity (5-second test)
- [ ] Headline effectiveness and message match with ads
- [ ] CTA placement, copy, and hierarchy
- [ ] Visual hierarchy and scannability
- [ ] Trust signals and social proof placement
- [ ] Objection handling (risk reversal, guarantees)
- [ ] Form friction analysis (2-step form flow)
- [ ] Mobile experience
- [ ] Page load speed
- [ ] Above-the-fold content quality
- [ ] Message match between ad copy and landing page
- [ ] Pricing/value transparency

**Key Questions:**
1. Does the landing page match what the Meta ad promises?
2. Can someone understand what Milktree does and why they should care in 5 seconds?
3. Is the CTA compelling enough for cold traffic from Meta?
4. Is the 2-step form creating unnecessary friction?
5. Are trust signals positioned near decision points?

---

### Phase 2: Meta Ads Manager Audit (via Chrome Extension)
**File:** `audits/02_META_ADS_PERFORMANCE_AUDIT.md`
**Method:** Access Meta Ads Manager through Claude in Chrome

**What we check:**

#### Campaign Level
- [ ] Campaign objective (is it set to Leads/Conversions?)
- [ ] Campaign budget and pacing
- [ ] Learning phase status
- [ ] Delivery status and issues
- [ ] Campaign structure (how many ad sets/ads)

#### Ad Set Level
- [ ] Audience targeting (size, demographics, interests)
- [ ] Audience overlap between ad sets
- [ ] Placement settings (automatic vs manual)
- [ ] Budget allocation across ad sets
- [ ] Schedule and dayparting
- [ ] Optimisation event (what conversion is selected?)
- [ ] Cost cap / bid strategy

#### Performance Metrics to Capture
- [ ] Impressions, Reach, Frequency
- [ ] CPM (cost per 1000 impressions)
- [ ] CTR (click-through rate) — link clicks vs all clicks
- [ ] CPC (cost per click)
- [ ] Cost per lead (CPL)
- [ ] Conversion rate (clicks to leads)
- [ ] Relevance/Quality ranking
- [ ] Amount spent total and per day

---

### Phase 3: Creative and Copy Audit
**File:** `audits/03_CREATIVE_COPY_AUDIT.md`
**Method:** Review ad creatives in Meta Ads Manager via Chrome

**What we check:**

#### Ad Creative Assessment
- [ ] Number of creative variations (should be 3-5 per ad set minimum)
- [ ] Creative format diversity (static image, carousel, video, reels)
- [ ] Visual quality and brand consistency
- [ ] Hook strength (first 3 seconds for video, visual impact for image)
- [ ] Text overlay amount and readability
- [ ] Mobile optimisation of visuals

#### Ad Copy Assessment
- [ ] Primary text effectiveness (hook in first 125 chars)
- [ ] Headline quality (benefit vs feature focused)
- [ ] Description usage
- [ ] CTA button selection
- [ ] Copy framework used (PAS, BAB, social proof lead)
- [ ] Specificity of claims
- [ ] Clear value proposition in ad copy
- [ ] Match between ad copy promise and landing page delivery

#### Creative Testing
- [ ] Are different angles being tested? (pain point, outcome, social proof, curiosity)
- [ ] Is there enough creative variation for algorithm to optimise?
- [ ] Creative fatigue signals (frequency vs performance)

---

### Phase 4: Conversion Tracking Audit
**File:** `audits/04_TRACKING_ATTRIBUTION_AUDIT.md`
**Method:** Review code + Meta Events Manager via Chrome

**What we check:**
- [ ] Meta Pixel firing correctly (PageView, Contact, Lead/Schedule)
- [ ] Conversions API (CAPI) sending server-side events
- [ ] Event deduplication working (shared event_id)
- [ ] Correct conversion event selected for optimisation in campaign
- [ ] Event Manager showing matched events
- [ ] GA4 conversion events firing
- [ ] UTM parameters on ad URLs
- [ ] Attribution window settings

**Current tracking architecture (from codebase):**
- Meta Pixel ID: 993503079134900
- Events: Contact (Step 1 form), Schedule (thank-you page)
- CAPI: Vercel serverless function at `/api/meta-capi`
- GA4: G-9GHX9JVN9S (form_start, generate_lead events)

---

### Phase 5: Competitor and Market Context
**File:** `audits/05_MARKET_CONTEXT.md`
**Method:** Web research

**What we check:**
- [ ] What competitors are advertising on Meta for brand/identity services
- [ ] Average CPL benchmarks for B2B services in UK market
- [ ] Best-performing ad formats for agency/B2B services
- [ ] Audience targeting strategies used by competitor agencies

---

## Action Plan Structure

### Phase 6: Consolidated Findings and Action Plan
**File:** `audits/06_ACTION_PLAN.md`

The action plan will be structured as:

#### Section A: Why the Campaign is Underperforming
- Root cause analysis across all audit dimensions
- Ranked list of issues by impact

#### Section B: Quick Wins (Apply Now)
- Changes that can be made immediately
- Website changes (code edits)
- Meta Ads Manager changes (via Chrome)

#### Section C: High-Impact Changes (This Week)
- Bigger changes requiring more effort
- New creative concepts
- Audience restructuring
- Landing page modifications

#### Section D: Testing Roadmap (Next 2 Weeks)
- A/B test hypotheses
- Creative testing plan
- Audience testing plan

#### Section E: Step-by-Step Implementation Guide
- Exact steps for each change in Meta Ads Manager
- Exact code changes for the website
- Screenshots / specific UI instructions for Chrome-based changes

---

## How We Execute

### Website Changes
- Direct code edits using Claude Code
- Changes to: `data/content.ts`, `sections/FinalCTA.tsx`, `sections/Hero.tsx`, `styles/global.css`
- Test locally, commit, and push for Vercel auto-deploy

### Meta Ads Manager Changes
- Use Claude in Chrome extension to navigate Meta Ads Manager
- Apply audience, budget, creative, and targeting changes
- Document every change made

---

## Expected Deliverables

| File | Content |
|------|---------|
| `01_LANDING_PAGE_CRO_AUDIT.md` | Full landing page conversion audit |
| `02_META_ADS_PERFORMANCE_AUDIT.md` | Campaign performance deep-dive |
| `03_CREATIVE_COPY_AUDIT.md` | Ad creative and copy analysis |
| `04_TRACKING_ATTRIBUTION_AUDIT.md` | Tracking and attribution health check |
| `05_MARKET_CONTEXT.md` | Competitor and benchmark research |
| `06_ACTION_PLAN.md` | Consolidated action plan with step-by-step instructions |

---

## Let's Begin

**Step 1:** Start with the landing page CRO audit (we have full codebase access)
**Step 2:** Sign into Meta Ads Manager via Chrome to pull campaign data
**Step 3:** Work through each audit phase sequentially
**Step 4:** Compile findings and create the action plan
**Step 5:** Apply approved changes
