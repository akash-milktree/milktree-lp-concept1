# Meta Ads Campaign Blueprint — Milktree Agency Lead Gen
**Created:** 16 Mar 2026
**Objective:** Generate real brand audit leads (Formspree submissions)
**Conversion event:** Lead (fires on /thank-you page after successful form submission)

---

## Campaign Structure (ONE campaign, TWO ad sets)

```
MT_Lead_UK_Mar26                          [Campaign — Leads objective, CBO]
├── Prospecting_Advantage+_UK             [Ad Set 1 — £40/day share]
│   ├── your_brand_looks                  [Ad 1 — top performer]
│   ├── this_could_be                     [Ad 2 — second best]
│   ├── your_third_rebrand                [Ad 3]
│   └── your_brand_looks_v2              [Ad 4 — duplicate with different primary text]
│
└── Retargeting_WebVisitors_UK            [Ad Set 2 — £10/day share]
    ├── your_brand_looks                  [Ad 1 — proven creative]
    ├── this_could_be                     [Ad 2]
    └── (testimonial ad when available)   [Ad 3 — future]
```

---

## Step-by-Step Setup

### STEP 1: Create Custom Audiences (do this FIRST)

Before creating the campaign, set up these audiences in **Audiences** (left sidebar in Ads Manager):

**Audience A — Website Visitors (Retargeting)**
- Source: Milktree Pixel (993503079134900)
- Include: All website visitors, last 30 days
- Name: `WEB_AllVisitors_30d`

**Audience B — Form Submitters (Exclusion)**
- Source: Milktree Pixel
- Include: People who visited URL containing `/thank-you`, last 180 days
- Name: `WEB_Converters_180d`

**Audience C — Engaged Visitors (Retargeting)**
- Source: Milktree Pixel
- Include: Top 25% by time spent, last 30 days
- Name: `WEB_Engaged25pct_30d`

### STEP 2: Campaign Settings

| Setting | Value |
|---------|-------|
| **Campaign name** | `MT_Lead_UK_Mar26` |
| **Campaign objective** | Leads |
| **Special ad categories** | None (brand agency is not restricted) |
| **Campaign budget** | Campaign Budget Optimization (CBO) ON |
| **Daily budget** | £50/day |
| **Bid strategy** | Highest volume (Maximize conversions — NO cost cap initially) |
| **A/B test** | OFF |
| **Advantage+ campaign budget** | ON |

**Why Highest Volume bid strategy:** With a £50/day budget and expected £15-30 CPA, you'll get ~2-3 leads/day. That's ~14-21/week — below the 50/week learning phase threshold. "Highest volume" gives Meta maximum flexibility to find the cheapest leads while your account builds conversion data. Switch to "Cost per result goal" after you have 50+ Lead events in the account (roughly 3-4 weeks).

### STEP 3: Ad Set 1 — Prospecting

| Setting | Value |
|---------|-------|
| **Ad set name** | `Prospecting_Advantage+_UK` |
| **Conversion location** | Website |
| **Conversion event** | Lead |
| **Performance goal** | Maximize number of conversions |
| **Dynamic creative** | OFF (test manually first) |
| **Budget** | Using campaign budget (CBO will allocate ~80% here) |
| **Schedule** | Start date: today, no end date |
| **Audience** | Advantage+ Audience ON |

**Advantage+ Audience Signals** (suggestions, not restrictions — Meta can go broader):

| Signal Type | Value |
|-------------|-------|
| **Custom audiences** | None for prospecting |
| **Location** | United Kingdom |
| **Age** | 25–65 |
| **Gender** | All |
| **Detailed targeting (interests)** | See audience signals below |
| **Exclusions** | `WEB_Converters_180d` (exclude people who already submitted the form) |

**Audience Signal Interests** (add ALL of these as suggestions):

**Business owner signals:**
- Small business owners
- Entrepreneurship
- Business owner
- Small and medium-sized enterprises

**Brand/marketing signals:**
- Brand management
- Brand awareness
- Marketing strategy
- Digital marketing
- Content marketing

**Industry signals (Milktree's typical clients):**
- Financial services
- Mortgage broker
- Real estate
- Professional services
- Construction

**Placements:**
- **Advantage+ Placements: ON** (let Meta optimize across all placements)
- This is critical — restricting placements reduces reach and increases costs

### STEP 4: Ad Set 2 — Retargeting

| Setting | Value |
|---------|-------|
| **Ad set name** | `Retargeting_WebVisitors_UK` |
| **Conversion location** | Website |
| **Conversion event** | Lead |
| **Performance goal** | Maximize number of conversions |
| **Dynamic creative** | OFF |
| **Budget** | Using campaign budget (CBO will allocate ~20% here) |
| **Audience** | Manual targeting (NOT Advantage+) |

**Audience:**

| Setting | Value |
|---------|-------|
| **Custom audiences (Include)** | `WEB_AllVisitors_30d` |
| **Custom audiences (Exclude)** | `WEB_Converters_180d` |
| **Location** | United Kingdom |
| **Age** | 25–65 |
| **Gender** | All |
| **Detailed targeting** | None (retargeting is already specific enough) |

**Placements:** Advantage+ Placements ON

**Important:** This ad set will start small (only people who've visited the site). As the prospecting ad set drives traffic, this retargeting pool grows automatically. If reach is below 1,000 after 7 days, expand to `WEB_Engaged25pct_30d` or pause this ad set and let CBO put all budget into prospecting.

### STEP 5: Ads (Use Existing Creatives)

**For Prospecting ad set — 4 ads:**

#### Ad 1: `your_brand_looks` (top performer)
| Field | Value |
|-------|-------|
| **Ad name** | `your_brand_looks_v1` |
| **Creative** | Use existing `your_brand_looks` image |
| **Primary text** | Your brand is talking. But is anyone listening? Most businesses lose clients before the first conversation — because their brand doesn't look like it belongs. Get a free brand audit and see exactly what's costing you. |
| **Headline** | Free Brand Audit — 48h Turnaround |
| **Description** | 200+ brands built. Book in 15 seconds. |
| **CTA button** | Learn More |
| **URL** | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_brand_looks_v1` |

#### Ad 2: `this_could_be` (second best performer)
| Field | Value |
|-------|-------|
| **Ad name** | `this_could_be_v1` |
| **Creative** | Use existing `this_could_be` image |
| **Primary text** | This could be your brand. Clear. Professional. Chosen first. We build brand identities that make you the obvious choice — so the right clients come to you. Start with a free audit. |
| **Headline** | See What Your Brand Is Really Saying |
| **Description** | Free audit. No commitment. 15 seconds to book. |
| **CTA button** | Learn More |
| **URL** | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=this_could_be_v1` |

#### Ad 3: `your_third_rebrand`
| Field | Value |
|-------|-------|
| **Ad name** | `your_third_rebrand_v1` |
| **Creative** | Use existing `your_third_rebrand` image |
| **Primary text** | On your third rebrand? That's not a design problem — it's a strategy problem. Most agencies give you a logo. We build a brand identity system that lasts. Free audit shows you what's missing. |
| **Headline** | Stop Rebranding. Start Building. |
| **Description** | 200+ brands. One partner. Zero headaches. |
| **CTA button** | Learn More |
| **URL** | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_third_rebrand_v1` |

#### Ad 4: `your_brand_looks_v2` (same image, different copy)
| Field | Value |
|-------|-------|
| **Ad name** | `your_brand_looks_v2` |
| **Creative** | Use existing `your_brand_looks` image (same as Ad 1) |
| **Primary text** | We asked 200+ business owners what happened after we rebuilt their brand. 250% average increase in enquiries. Not because of a pretty logo — because of a clear identity that sells for you. |
| **Headline** | Nobody Knows What You Do. We Fix That. |
| **Description** | Free brand audit. Results in 48 hours. |
| **CTA button** | Learn More |
| **URL** | `https://milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Mar26&utm_content=your_brand_looks_v2` |

**For Retargeting ad set — 2 ads:**

Use Ad 1 (`your_brand_looks_v1`) and Ad 2 (`this_could_be_v1`) from above. Same creatives, same copy. Retargeting audiences are already warm — the creative just needs to remind them.

---

## Naming Convention Reference

```
Campaign:  MT_{Objective}_{Geo}_{MonthYear}
Ad Set:    {Strategy}_{AudienceType}_{Geo}
Ad:        {CreativeName}_{Version}
```

Examples:
- `MT_Lead_UK_Mar26`
- `Prospecting_Advantage+_UK`
- `your_brand_looks_v1`

---

## Budget Allocation & Learning Phase Math

| Metric | Calculation |
|--------|-------------|
| Daily budget | £50 |
| Weekly budget | £350 |
| Expected CPA (Lead) | £15–30 |
| Expected leads/week | 12–23 |
| Learning phase threshold | 50 conversions/week |
| Time to exit learning | ~3-4 weeks (once data accumulates) |

**CBO will auto-allocate:** Expect ~80% to Prospecting, ~20% to Retargeting. Don't fight the algorithm — if retargeting gets less, it's because the pool is small.

**When to increase budget:**
- If CPA is under £20 after 7 days → increase to £75/day
- If CPA is under £15 after 14 days → increase to £100/day
- Never increase by more than 20% at a time (resets learning)

---

## What NOT to Do

| Don't | Why |
|-------|-----|
| Don't edit ads during the first 7 days | Resets learning phase |
| Don't use cost cap initially | Not enough data — will restrict delivery |
| Don't add interest targeting to retargeting | Retargeting audience is already specific |
| Don't restrict placements | Let Meta find cheapest leads across all placements |
| Don't duplicate the campaign | Audiences will overlap and compete against yourself |
| Don't optimize for Contact | Lead is the true conversion (confirms form submitted successfully) |
| Don't turn off CBO | Let Meta allocate budget to the better-performing ad set |

---

## Week-by-Week Optimization Calendar

### Week 1 (Days 1-7): LAUNCH — DON'T TOUCH

- Launch campaign as specified above
- Monitor daily but DO NOT make changes
- Check that Lead events are appearing in Events Manager
- Verify CAPI coverage is ≥75% (should be by now)
- Check EMQ scores are improving

**Expected:** 0-5 leads. CPA will be volatile. This is normal.

### Week 2 (Days 8-14): FIRST OPTIMIZATION

- **Kill underperformers:** If any ad has 0 leads AND spent >£15, pause it
- **Check frequency:** If prospecting frequency >3.0, audience may be too narrow
- **Check CTR:** Should be 1-3%. If <0.5%, creative is weak. If >5%, check for invalid clicks
- **Check landing page conversion rate:** Leads / Link clicks. Target ≥3%. If <1%, the page needs work
- If CPA is on track (under £25), increase budget by 20%

### Week 3 (Days 15-21): CREATIVE REFRESH

- Add 1-2 new creatives (ideally video — even a 15-second iPhone clip)
- Test a testimonial-style ad using a real client quote
- Check if retargeting ad set has enough reach (>500). If not, pause it
- Consider creating a Lookalike audience from `WEB_Converters_180d` (if >30 conversions)

### Week 4 (Days 22-30): SCALE OR PIVOT

- By now you should have 30-60 leads and clear CPA data
- If CPA <£20: Increase budget to £100/day
- If CPA £20-30: Maintain, test new creatives
- If CPA >£30 with 50+ leads: Switch to "Cost per result goal" bid at £25
- If CPA >£30 with <20 leads: Campaign or landing page needs fundamental changes

---

## Aggregated Event Measurement (AEM) Priority

Configure in Events Manager → Aggregated Event Measurement → Configure Web Events:

| Priority | Event |
|----------|-------|
| 1 (Highest) | Lead |
| 2 | Contact |
| 3 | Schedule |
| 4 | ViewContent |
| 5 | PageView |
| 6 | CTAClick |
| 7 | SocialClick |
| 8 | FAQInteraction |

This ensures iOS 14.5+ users are optimized for Lead above all other events.

---

## Pre-Launch Checklist

- [ ] Custom Audiences created (AllVisitors_30d, Converters_180d, Engaged25pct_30d)
- [ ] Old campaigns paused (advantage_uk_contact_13mar26, advantage_uk_06mar26, all others)
- [ ] Campaign created with Leads objective, CBO ON, £50/day
- [ ] Conversion event set to **Lead** (not Contact)
- [ ] Bid strategy: Highest volume (no cost cap)
- [ ] Prospecting ad set: Advantage+ audience, UK, 25-65, interests as signals
- [ ] Retargeting ad set: WEB_AllVisitors_30d, exclude WEB_Converters_180d
- [ ] All ads have UTM parameters in URLs
- [ ] Advantage+ Placements ON for both ad sets
- [ ] AEM priority configured (Lead at top)
- [ ] Events Manager shows Lead event as Active with CAPI
- [ ] Test form submission → confirm Lead fires in Events Manager Test Events tab
