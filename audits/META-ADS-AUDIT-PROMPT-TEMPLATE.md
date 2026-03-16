# Meta Ads Audit & Campaign Setup — Reusable Prompt

Copy and customise the sections below, then paste into Claude Code.

---

## Prompt

```
I need you to audit my Meta Ads campaign and then build a proper campaign for lead generation.

## Brand Details
- Brand name: [BRAND NAME]
- Website: [URL]
- Industry: [e.g. branding agency, mortgage broker, SaaS]
- Target geography: [e.g. United Kingdom, US, specific cities]
- Target audience: [e.g. small business owners, homebuyers, marketing managers]
- Service/product being promoted: [e.g. free brand audit, free consultation, demo]
- Conversion action: [e.g. form submission on /thank-you page, Calendly booking, phone call]

## Meta Ads Account Info
- Ad account ID: [act=XXXXXXXXX]
- Pixel ID: [XXXXXXXXX]
- CAPI endpoint: [e.g. /api/meta-capi or not set up]

## Current Campaign Info
- Campaign name(s) running: [list them]
- Date range to audit: [e.g. 1 Mar - 15 Mar 2026]
- Daily budget: [e.g. £50/day]
- Conversion event currently optimising for: [e.g. Contact, Lead, Purchase]
- Creatives in use: [list ad names or describe them]

## Data to Provide
I've placed the following in [FOLDER PATH]:
- Ads Manager CSV export for the date range (campaign, ad set, and ad level)
- Screenshots of Events Manager (event list, diagnostics tab, EMQ scores)
- Screenshots of Ads Manager (campaign view, ad set view, ad view)

## What I Need

### Part 1: Audit
Run a full Meta Ads audit using the ads-meta skill. Check:
- Pixel/CAPI health (is CAPI active, what's the coverage %, EMQ scores)
- Whether the conversion event is firing correctly or inflated
- Creative diversity and performance
- Account structure (too many campaigns, learning phase health)
- Audience targeting (exclusions, retargeting, audience signals)
- Any anomalies in CTR, CPC, or conversion data

Score it out of 100 and save the audit report as an MD file.

### Part 2: Campaign Blueprint
Based on the audit findings, design a proper campaign:
- One campaign, minimal ad sets (prospecting + retargeting if budget allows)
- Correct conversion event
- Proper audience signals and exclusions
- Budget allocation and bid strategy
- Use existing creatives but with proper ad copy and UTM parameters
- Include a week-by-week optimisation calendar

Save as an MD file with step-by-step setup instructions so I can build it in Ads Manager.

### Part 3: Walk Me Through It
After the blueprint is ready, walk me through it step by step — one step at a time, waiting for my confirmation before moving to the next.
```

---

## Before Running the Prompt

1. **Export your Ads Manager data:**
   - Go to Ads Manager → select date range → Columns: Performance → Export → CSV
   - Do this at campaign level, ad set level, and ad level

2. **Screenshot Events Manager:**
   - Events Manager → your pixel → Overview (shows all events)
   - Events Manager → Diagnostics tab
   - Click into each key event → screenshot the EMQ score

3. **Screenshot Ads Manager:**
   - Campaign view (showing all campaigns)
   - Ad set view (showing ad sets in the active campaign)
   - Ad view (showing all ads)

4. **Put everything in a folder** and reference that folder path in the prompt.

---

## Customisation Notes

- If you have **e-commerce** (not lead gen), change "Lead" references to "Purchase" and adjust the conversion event accordingly
- If budget is **under £30/day**, skip the retargeting ad set — put everything into prospecting
- If you already have **video creatives**, mention them — the blueprint will include them
- If you have a **customer email list**, mention it — we can create Lookalike audiences from it
- Adjust **audience signals** to match your actual industry and customer profile
