# Meta Ads Campaign Setup Guide — Milktree Agency
**Date:** 16 Mar 2026
**Account:** Milktree Agency AD (act=762151792261302)
**Pixel:** 993503079134900
**Landing page:** https://milktreeagency.com/

This is a step-by-step execution guide. Follow each step in order. Do not skip steps.

---

## PHASE 1: PREPARATION (Before touching Ads Manager)

### Step 1: Verify tracking is working

1. Open https://milktreeagency.com/ in a browser
2. Open Meta Events Manager > Test Events tab
3. Enter `milktreeagency.com` as the test URL and click "Open Website"
4. On the website, fill out the form with test data and submit
5. Go back to Events Manager > Test Events
6. Confirm you see these events fire:
   - `PageView` — with "Browser" AND "Server" shown (proves Pixel + CAPI both fired)
   - `Contact` — with "Browser" AND "Server"
   - `Lead` — with "Browser" AND "Server" (on the /thank-you page)
7. If Lead does NOT appear, stop. The campaign cannot optimize without this event.

### Step 2: Configure Aggregated Event Measurement (AEM)

1. Go to Events Manager (left sidebar)
2. Click on Milktree Pixel (993503079134900)
3. Click "Settings" tab at the top
4. Scroll down to "Aggregated Event Measurement"
5. Click "Configure Web Events"
6. Find milktreeagency.com domain
7. Click "Manage Events"
8. Set the priority order (drag to reorder, highest priority at top):

| Priority | Event |
|----------|-------|
| 1 | Lead |
| 2 | Contact |
| 3 | Schedule |
| 4 | ViewContent |
| 5 | PageView |
| 6 | CTAClick |
| 7 | SocialClick |
| 8 | FAQInteraction |

9. Click "Submit" (changes take up to 72 hours to propagate)

### Step 3: Pause ALL existing campaigns

1. Go to Ads Manager
2. Select ALL campaigns:
   - `mmt_branding_leads_06mar26`
   - `advantage_uk_contact_13mar26` (this one is critical to pause — its audience is poisoned)
   - `advantage_uk_06mar26`
   - `Marketing Campaigns Q1/25 Campus`
   - `milktree_lead_gen`
   - Any other active campaigns
3. Click the toggle to turn each one OFF
4. Do NOT delete them — just pause

---

## PHASE 2: CREATE CUSTOM AUDIENCES

### Step 4: Create Website Visitors audience

1. Go to Ads Manager > Audiences (left sidebar, under "All tools")
2. Click "Create Audience" > "Custom Audience"
3. Select source: "Website"
4. Configure:
   - Source: Milktree Pixel
   - Events: "All website visitors"
   - Retention: 30 days
   - Audience name: `WEB_AllVisitors_30d`
5. Click "Create Audience"

### Step 5: Create Converters exclusion audience

1. Click "Create Audience" > "Custom Audience"
2. Select source: "Website"
3. Configure:
   - Source: Milktree Pixel
   - Events: "People who visited specific web pages"
   - URL contains: `/thank-you`
   - Retention: 180 days
   - Audience name: `WEB_Converters_180d`
4. Click "Create Audience"

### Step 6: Create Engaged Visitors audience

1. Click "Create Audience" > "Custom Audience"
2. Select source: "Website"
3. Configure:
   - Source: Milktree Pixel
   - Events: "Visitors by time spent" > "Top 25%"
   - Retention: 30 days
   - Audience name: `WEB_Engaged25pct_30d`
4. Click "Create Audience"

Note: These audiences will initially be small. They grow as the new campaign drives traffic.

---

## PHASE 3: CREATE THE CAMPAIGN

### Step 7: Create new campaign

1. Go to Ads Manager > Click green "+ Create" button
2. Choose campaign objective: **Leads**
3. Click "Continue"
4. Configure campaign level:

| Field | Value |
|-------|-------|
| Campaign name | `MT_Lead_UK_Mar26` |
| Special ad categories | None |
| Buying type | Auction |
| Campaign budget optimization | ON |
| Campaign budget | £50 per day |
| Campaign bid strategy | Highest volume |
| A/B test | OFF |

5. Click "Next" to proceed to Ad Set level

---

## PHASE 4: CREATE AD SET 1 — PROSPECTING

### Step 8: Configure prospecting ad set

1. Set ad set name: `Prospecting_Advantage+_UK`
2. Conversion location: **Website**
3. Conversion event: **Lead**
4. Performance goal: Maximize number of conversions
5. Dynamic creative: OFF
6. Budget & schedule:
   - Budget: "Use campaign budget" (already set at campaign level)
   - Start date: Today
   - End date: None (ongoing)

### Step 9: Configure Advantage+ audience

1. Toggle **Advantage+ Audience** to ON
2. Under "Audience controls" (the restrictions Meta MUST follow):
   - Locations: **United Kingdom**
   - Minimum age: **25**
   - Maximum age: **65**
   - Exclude Custom Audiences: **WEB_Converters_180d**
3. Under "Audience suggestions" (signals Meta uses as a starting point but can go broader):
   - Click "Suggestions"
   - Add these interest suggestions one by one:
     - `Small business owners`
     - `Entrepreneurship`
     - `Business owner`
     - `Small and medium-sized enterprises`
     - `Brand management`
     - `Brand awareness`
     - `Marketing strategy`
     - `Digital marketing`
     - `Content marketing`
     - `Financial services`
     - `Mortgage broker`
     - `Real estate`
     - `Professional services`
     - `Construction`

### Step 10: Set placements

1. Select **Advantage+ Placements** (this is the default — do NOT change it)
2. This allows Meta to show ads across Facebook Feed, Instagram Feed, Stories, Reels, Audience Network, etc.
3. Do NOT restrict placements — it increases costs

### Step 11: Save and add ads to this ad set (see Phase 6)

Click "Next" to proceed to the Ad level, but first create Ad Set 2.

---

## PHASE 5: CREATE AD SET 2 — RETARGETING

### Step 12: Add a second ad set

1. In the campaign editor, click "+ New Ad Set" or duplicate Ad Set 1 and modify
2. Set ad set name: `Retargeting_WebVisitors_UK`
3. Conversion location: **Website**
4. Conversion event: **Lead**
5. Performance goal: Maximize number of conversions
6. Dynamic creative: OFF

### Step 13: Configure retargeting audience (MANUAL, not Advantage+)

1. Toggle Advantage+ Audience to **OFF** (use manual targeting)
2. Custom audiences — Include: **WEB_AllVisitors_30d**
3. Custom audiences — Exclude: **WEB_Converters_180d**
4. Locations: **United Kingdom**
5. Age: **25–65**
6. Gender: **All**
7. Detailed targeting: **Leave empty** (the custom audience is already specific)

### Step 14: Set placements

1. Select **Advantage+ Placements** (same as prospecting)

---

## PHASE 6: CREATE THE ADS

### Step 15: Create Ad 1 in Prospecting ad set — `your_brand_looks_v1`

1. Select the `Prospecting_Advantage+_UK` ad set
2. Click "+ New Ad"
3. Ad name: `your_brand_looks_v1`
4. Identity: Milktree Agency Facebook Page / Instagram account
5. Ad setup: "Create ad" (single image)
6. Creative:
   - Upload or select the existing `your_brand_looks` image from your media library
7. Ad copy:
   - **Primary text:**
     ```
     Your brand is talking. But is anyone listening?

     Most businesses lose clients before the first conversation — because their brand doesn't look like it belongs.

     Get a free brand audit and see exactly what's costing you.
     ```
   - **Headline:** `Free Brand Audit — 48h Turnaround`
   - **Description:** `200+ brands built. Book in 15 seconds.`
   - **Call to action:** Learn More
8. Destination:
   - Website URL: `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_brand_looks_v1`
9. Tracking:
   - URL parameters should already be in the URL above
   - Website events: Ensure Milktree Pixel is selected

### Step 16: Create Ad 2 in Prospecting ad set — `this_could_be_v1`

1. Click "+ New Ad" in the same ad set
2. Ad name: `this_could_be_v1`
3. Creative: Upload or select the existing `this_could_be` image
4. Ad copy:
   - **Primary text:**
     ```
     This could be your brand. Clear. Professional. Chosen first.

     We build brand identities that make you the obvious choice — so the right clients come to you.

     Start with a free audit.
     ```
   - **Headline:** `See What Your Brand Is Really Saying`
   - **Description:** `Free audit. No commitment. 15 seconds to book.`
   - **Call to action:** Learn More
5. Destination URL: `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=this_could_be_v1`

### Step 17: Create Ad 3 in Prospecting ad set — `your_third_rebrand_v1`

1. Click "+ New Ad" in the same ad set
2. Ad name: `your_third_rebrand_v1`
3. Creative: Upload or select the existing `your_third_rebrand` image
4. Ad copy:
   - **Primary text:**
     ```
     On your third rebrand? That's not a design problem — it's a strategy problem.

     Most agencies give you a logo. We build a brand identity system that lasts.

     Free audit shows you what's missing.
     ```
   - **Headline:** `Stop Rebranding. Start Building.`
   - **Description:** `200+ brands. One partner. Zero headaches.`
   - **Call to action:** Learn More
5. Destination URL: `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_third_rebrand_v1`

### Step 18: Create Ad 4 in Prospecting ad set — `your_brand_looks_v2`

1. Click "+ New Ad" in the same ad set
2. Ad name: `your_brand_looks_v2`
3. Creative: Use the SAME `your_brand_looks` image as Ad 1 (different copy tests the messaging)
4. Ad copy:
   - **Primary text:**
     ```
     We asked 200+ business owners what happened after we rebuilt their brand.

     250% average increase in enquiries.

     Not because of a pretty logo — because of a clear identity that sells for you.
     ```
   - **Headline:** `Nobody Knows What You Do. We Fix That.`
   - **Description:** `Free brand audit. Results in 48 hours.`
   - **Call to action:** Learn More
5. Destination URL: `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_brand_looks_v2`

### Step 19: Create Ads in Retargeting ad set

1. Select the `Retargeting_WebVisitors_UK` ad set
2. Create 2 ads — copies of Ad 1 and Ad 2 from the prospecting set:
   - `your_brand_looks_v1_RT` — same image, same copy, same URL (change utm_content to `your_brand_looks_v1_RT`)
   - `this_could_be_v1_RT` — same image, same copy, same URL (change utm_content to `this_could_be_v1_RT`)
3. The `_RT` suffix in the name and UTM helps you track retargeting performance separately

---

## PHASE 7: REVIEW AND PUBLISH

### Step 20: Final review checklist

Before clicking "Publish", verify:

- [ ] Campaign objective is **Leads** (not Traffic, not Engagement)
- [ ] Campaign budget is **£50/day** with CBO ON
- [ ] Bid strategy is **Highest volume** (no cost cap)
- [ ] **Prospecting ad set:**
  - [ ] Conversion event = Lead
  - [ ] Advantage+ Audience = ON
  - [ ] Location = United Kingdom, Age = 25-65
  - [ ] Exclusion = WEB_Converters_180d
  - [ ] Advantage+ Placements = ON
  - [ ] 4 ads with correct images, copy, and UTM URLs
- [ ] **Retargeting ad set:**
  - [ ] Conversion event = Lead
  - [ ] Advantage+ Audience = OFF (manual)
  - [ ] Include = WEB_AllVisitors_30d
  - [ ] Exclude = WEB_Converters_180d
  - [ ] Location = United Kingdom, Age = 25-65
  - [ ] No detailed targeting (leave empty)
  - [ ] Advantage+ Placements = ON
  - [ ] 2 ads with correct images, copy, and UTM URLs

### Step 21: Publish

1. Click "Publish"
2. Campaign will enter Review (usually 15 min – 2 hours)
3. Once approved, ads start delivering
4. Do NOT make any changes for 7 days (learning phase)

---

## PHASE 8: POST-LAUNCH MONITORING

### Step 22: Day 1 check (24 hours after launch)

1. Go to Ads Manager > Select `MT_Lead_UK_Mar26`
2. Check campaign is **Active** (not "In review" or "Rejected")
3. Check both ad sets are delivering (showing impressions)
4. Go to Events Manager > Check CAPI coverage % for PageView and Lead
5. Note down: Impressions, Reach, Link Clicks, Spend
6. DO NOT change anything

### Step 23: Day 3 check

1. Check all 4 prospecting ads are delivering (not just 1-2)
2. Note down: Link clicks, CTR, CPC, any Lead events
3. If CTR is between 1-3% — good, normal
4. If CTR is >5% — check for click quality issues (same problem as before)
5. DO NOT change anything

### Step 24: Day 7 review — first optimization window

1. Export campaign data (Campaigns > Ad sets > Ads) for the 7-day period
2. Evaluate each ad:

| Ad | Action |
|----|--------|
| Has leads AND CPA < £25 | Keep running |
| Has leads but CPA > £30 | Keep for now (small sample) |
| 0 leads AND spent > £15 | Pause this ad |
| 0 leads AND spent < £15 | Keep running (not enough data yet) |

3. Check prospecting frequency: If >3.0, your audience may be too narrow
4. Check retargeting ad set: If reach < 500 people, pause it (pool too small)
5. If overall CPA < £25, increase daily budget from £50 to £60 (20% increase max)

### Step 25: Day 14 review — second optimization

1. By now you should have 5-15 leads
2. Evaluate:
   - If CPA < £20 → increase budget to £75/day
   - If CPA £20-30 → maintain budget, plan new creatives
   - If CPA > £30 → review landing page conversion rate (leads / link clicks)
3. If landing page conversion rate < 1%, the page needs CRO work
4. If landing page conversion rate > 3%, the campaign is working — scale budget
5. Start planning 1-2 new creatives for Week 3 (ideally short video)

### Step 26: Day 21 — creative refresh

1. Add 1-2 new ads to the prospecting ad set
2. Ideas for new creatives:
   - 15-second video: founder talking head or brand reveal before/after
   - Testimonial image with client quote
   - Carousel showing brand transformation examples
3. Pause any ad with 0 leads after £30+ spend
4. If you have 30+ leads total, create a Lookalike audience:
   - Go to Audiences > Create > Lookalike
   - Source: WEB_Converters_180d
   - Location: United Kingdom
   - Size: 1% (most similar)
   - Add this Lookalike as an audience signal in the prospecting ad set

### Step 27: Day 30 — scale or pivot decision

| Scenario | Action |
|----------|--------|
| 30+ leads, CPA < £20 | Scale: increase budget to £100/day |
| 30+ leads, CPA £20-30 | Maintain, continue testing creatives |
| 50+ leads, CPA > £30 | Switch bid to "Cost per result goal" at £25 |
| < 15 leads after £350+ spend | Fundamental issue: review offer, page, or targeting |

---

## REFERENCE: Campaign Structure Diagram

```
MT_Lead_UK_Mar26                          [Leads objective, CBO, £50/day]
│
├── Prospecting_Advantage+_UK             [~£40/day via CBO]
│   │
│   │  Audience: Advantage+ ON
│   │  Controls: UK, age 25-65, exclude WEB_Converters_180d
│   │  Signals: Business owner + Brand + Industry interests
│   │  Placements: Advantage+ (all)
│   │  Conversion: Lead
│   │
│   ├── your_brand_looks_v1               [Top image + "brand is talking" copy]
│   ├── this_could_be_v1                  [Second image + "obvious choice" copy]
│   ├── your_third_rebrand_v1             [Third image + "strategy problem" copy]
│   └── your_brand_looks_v2              [Top image + "250% enquiry increase" copy]
│
└── Retargeting_WebVisitors_UK            [~£10/day via CBO]
    │
    │  Audience: Manual (NOT Advantage+)
    │  Include: WEB_AllVisitors_30d
    │  Exclude: WEB_Converters_180d
    │  Controls: UK, age 25-65
    │  Placements: Advantage+ (all)
    │  Conversion: Lead
    │
    ├── your_brand_looks_v1_RT            [Same as prospecting Ad 1]
    └── this_could_be_v1_RT              [Same as prospecting Ad 2]
```

---

## REFERENCE: UTM Parameters for All Ads

| Ad Name | Full URL |
|---------|----------|
| your_brand_looks_v1 | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_brand_looks_v1` |
| this_could_be_v1 | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=this_could_be_v1` |
| your_third_rebrand_v1 | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_third_rebrand_v1` |
| your_brand_looks_v2 | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_brand_looks_v2` |
| your_brand_looks_v1_RT | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_brand_looks_v1_RT` |
| this_could_be_v1_RT | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=this_could_be_v1_RT` |

---

## REFERENCE: Key Rules

| Rule | Reason |
|------|--------|
| Do NOT edit ads in first 7 days | Resets learning phase |
| Do NOT use cost cap initially | Restricts delivery with insufficient data |
| Do NOT add interests to retargeting | Custom audience is already targeted |
| Do NOT restrict placements | Increases CPM and reduces reach |
| Do NOT duplicate campaign | Creates audience overlap and self-competition |
| Do NOT optimize for Contact | Lead is the true conversion event |
| Do NOT increase budget more than 20% at once | Large jumps reset learning |
| Do NOT turn off CBO | Let Meta allocate to the better ad set |
