# Launch Runbook — MT_Lead_UK_Andromeda_May26
**Goal:** Get the Andromeda Lead campaign live in Meta Ads Manager.
**Account:** Milktree Agency AD (`act=762151792261302`)
**Pixel:** `993503079134900`
**Landing page:** `https://milktreeagency.com/audit` (live · production · auto-deploy via GitHub `main`)
**Thank-you page:** `/audit/thank-you` (LP-isolated, no main-site nav, fires Lead + Schedule pixel/CAPI)
**Final ads:** 6 (in `public/ads 2026/apr 26/`) — all designer fixes applied, ready to upload
**Companion docs:** [`META-CREATIVE-FUNNEL-AUDIT-APR-2026.md`](META-CREATIVE-FUNNEL-AUDIT-APR-2026.md) (full reasoning)

---

## Part 0 — Pre-launch checklist

### ✅ Done
- [x] LP at `/audit` deployed (commits `84c095e` + `e026ee5`)
- [x] LP smoke-tested on production (your test passed)
- [x] LP-isolated thank-you page at `/audit/thank-you`
- [x] Both LP forms wired to separate `auditLpForm` Formspree handler
- [x] Lead + Schedule pixel + CAPI fire on `/audit/thank-you`
- [x] LP audit fixes applied: hero rewrite, deliverable standardisation, "clarity problem" in subhead, "20-min" hook in process, "hero line is your pitch" callout
- [x] All 6 designer fixes shipped:
  - [x] Pitch-deck modal X-button removed (was AWR-02)
  - [x] Hot Take fake Agree/Disagree buttons removed (was DES-01)
  - [x] 20-minutes headline trimmed (was ENG-01)
  - [x] ENG-01 image swapped to two-strangers-in-conversation shot (perfect message-image match)
  - [x] Crossword + "ARENT" typo problem replaced entirely with new "Good brands get noticed. Clear brands get clients." typography concept
  - [x] All 6 ads exported at 1080×1350 (4:5) AND 1080×1920 (9:16)

### ⚠️ Must clear BEFORE creating ads in Ads Manager

**1. Deploy the new Formspree form** (without this, both LP forms 404):
```bash
npx @formspree/cli@latest deploy
```
Run from project root. Same pattern as commit `cf632dd5`.

**2. Re-verify the LP after Formspree deploy:**
- Submit hero form → lands on `/audit/thank-you?card=hero` and you receive an email at `levi@milktreeagency.com` with `service: "Audit LP — Hero Card"`.
- Submit bottom form → lands on `/audit/thank-you?card=final` with `service: "Audit LP — Final CTA"`.

**3. Tracking sanity in Events Manager** (https://business.facebook.com/events_manager2):
- CAPI coverage on PageView ≥ 75%
- Lead event EMQ ≥ 7.0
- AEM event priority order: **Lead → Contact → Schedule → ViewContent → PageView → CTAClick**
- Test Events: submit a real form on `/audit` → confirm `Lead` event fires (not just `Contact`)

**4. Account housekeeping:**
- All previous Milktree campaigns confirmed **OFF**
- Custom audience `WEB_Converters_180d` exists (180-day form-submitters list — created in March 16 setup)
- Budget unfrozen at the account level

### ⏳ Deferred (handle later, doesn't block launch)
- Subdomain `audit.milktreeagency.com` — DNS access pending. When ready: add domain in Vercel dashboard + CNAME at registrar. Code is already subdomain-aware; the only change needed is swapping ad URLs from `milktreeagency.com/audit` → `audit.milktreeagency.com/`.

---

## Part 1 — Build the campaign in Ads Manager

### Step 1 — Open Ads Manager

https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=762151792261302

### Step 2 — Create the campaign

Click green **+ Create** → **Campaign**.

| Field | Value |
|---|---|
| Buying type | Auctions |
| Campaign objective | **Sales** (or **Leads** if Sales not visible) |
| Template | **Manual sales campaign** (skip auto-templates if offered) |
| **Campaign name** | `MT_Lead_UK_Andromeda_May26` |
| Special ad categories | None (uncheck if pre-selected) |
| Campaign Budget Optimization (Advantage CBO) | **ON** |
| **Campaign budget** | **Daily £75.00** *(6 ads × ~£12.50/day average — well above the £10/day learning floor)* |
| Bid strategy | **Highest volume** *(no cost cap until you have 50+ Lead events)* |

Click **Next**.

### Step 3 — Create the ad set

| Field | Value |
|---|---|
| **Ad set name** | `BrandClarity_Advantage+_UK` |
| Conversion location | **Website** |
| Performance goal | **Maximise number of conversions** |
| Pixel | `Milktree Pixel (993503079134900)` |
| **Conversion event** | **Lead** ⚠️ NOT Contact |
| Cost per result goal | Leave blank |
| Schedule start | Today, current time |
| Schedule end | None |
| Locations | United Kingdom |
| Age | 25 – 65 |
| Languages | English (All) — optional |
| Gender | All |
| **Advantage+ audience** | **ON** (toggle at top of audience section) |
| Audience suggestions (interest signals — add one at a time) | Business owner, Brand management, Marketing strategy, Financial services, Mortgage, Real estate, Professional services |
| **Custom audience exclusions** | Show options under Custom Audiences → **Exclude** → add `WEB_Converters_180d` |
| Placements | **Advantage+ placements ON** (don't manually pick) |
| Brand safety / inventory | Standard inventory |

Click **Next**.

### Step 4 — Create the 6 ads

For every ad:
- **Identity → Facebook Page:** Milktree Agency
- **Identity → Instagram account:** @milktreeagency
- **Ad setup:** Create ad (not "Use existing post")
- **Format:** Single image or video
- **Pixel & events:** Milktree Pixel (993503079134900) → **Lead** event
- **Media upload:** Click **+ Add Media → Add image** → upload the 1080×1350 file. Then click **+ Add Media** again → upload the 1080×1920 (9:16) file. Meta auto-assigns each by placement.

**URL + UTM template** (use for every ad — change only `{utm_content}`):

```
https://milktreeagency.com/audit?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Andromeda_May26&utm_content={utm_content}
```

In Ads Manager: paste into **Website URL** → click **Build a URL parameter** → fill in `utm_source=meta`, `utm_medium=paid`, `utm_campaign=MT_Lead_UK_Andromeda_May26`, `utm_content=<per ad below>`.

---

## Part 2 — The 6 ads (paste-ready)

> **Copy standard:** All ad copy below follows the project rule from commit `9df55b9` — UK English, Grade 7 reading level, **no em dashes**.

### Ad 1 — `AWR-01_brand_looks_unclear`
**Files:** `public/ads 2026/apr 26/Group 1000008141.png` (4:5) + `Group 1000008142.png` (9:16)
*Hook: "Your brand looks fine. Nobody knows what it stands for." Coloured sticky-tag visual. Highest predicted performer — directly mirrors the proven `your_brand_looks_v2` ad pattern (4.31% CTR baseline).*

- **Primary text:** *We asked 200+ business owners what they thought our clients sold. Half got it wrong. That's why we built the free brand audit. 48 hours, no commitment.*
- **Headline:** *Nobody Knows What You Do.*
- **Description:** *Free Brand Audit · 48h*
- **CTA button:** Get Offer
- **utm_content:** `awr_01_brand_looks_unclear`

### Ad 2 — `AWR-02_pitch_deck_vs_website`
**Files:** `public/ads 2026/apr 26/AWR-01.png` (4:5) + `AWR-02.png` (9:16)
*Hook: "Your pitch deck says exactly what you do. The website says 'Solutions for modern teams'." Modal X removed. Note: the file naming is intentionally rotated — designer relabelled.*

- **Primary text:** *Your pitch deck says exactly what you do. Your website says "solutions for modern teams." One of those is costing you clients. We rewrite your website. Free, in 48 hours.*
- **Headline:** *Your Website Is Lying.*
- **Description:** *Free Audit · No commitment*
- **CTA button:** Get Offer
- **utm_content:** `awr_02_pitch_deck`

### Ad 3 — `DES-01_hot_take_ten_people`
**Files:** `public/ads 2026/apr 26/ad 1.png` (4:5) + `ad 1-1.png` (9:16)
*Hook: "Hot Take · If ten people describe your business ten different ways… Your brand isn't clear." 9-face grid. Fake Agree/Disagree buttons removed; single BOOK FREE AUDIT now in-image.*

- **Primary text:** *If ten people describe your business ten different ways, your brand isn't unclear. It's invisible. We make sure they all see the same thing. Free brand audit, 48 hours.*
- **Headline:** *Is Your Brand Clear?*
- **Description:** *Free Audit · 200+ Brands Built*
- **CTA button:** Get Offer
- **utm_content:** `des_01_hot_take`

### Ad 4 — `DES-02_homepage_one_sentence`
**Files:** `public/ads 2026/apr 26/DES-01.png` (4:5) + `DES-01-1.png` (9:16)
*Hook: "Your homepage is one sentence from winning." Surreal beach + laptop visual. Now includes "We have rewritten the hero line for 200+ brands. Average enquiry lift: 250%." footer.*

- **Primary text:** *Your homepage is one sentence from winning. The top line is the whole pitch. If it doesn't land, nothing below it will. We've rewritten 200+ of them. Average enquiry lift: 250%.*
- **Headline:** *Fix Your Homepage.*
- **Description:** *Free Audit · 48h Turnaround*
- **CTA button:** Get Offer
- **utm_content:** `des_02_homepage_one_sentence`

### Ad 5 — `ENG-01_twenty_minutes_stranger`
**Files:** `public/ads 2026/apr 26/Frame 1.png` (4:5) + `Frame 2.png` (9:16)
*Hook: "Give us 20 minutes. We'll tell you what a stranger thinks you sell." Headline trimmed; image swapped from generic landscape to two strangers in real conversation — perfect message-image match. Strong dark-horse winner candidate.*

- **Primary text:** *Give us 20 minutes. We'll tell you what a stranger thinks you sell. It's probably not what you think. Closing that gap is the whole job. Free brand audit, 48 hours.*
- **Headline:** *20 Minutes. One Audit.*
- **Description:** *Free · 48h Results*
- **CTA button:** Book Now
- **utm_content:** `eng_01_twenty_minutes`

### Ad 6 — `ACT-01_clear_brands_get_clients`  *(NEW — replaces the crossword)*
**Files:** `public/ads 2026/apr 26/Frame 3.png` (4:5) + `Frame 4.png` (9:16)
*Hook: "Good brands get noticed. Clear brands get clients." Sharp typography on dark moody silhouette. Replaces the original ACT-01 crossword (avoids the apostrophe typo risk + heavy-text-overlay penalty in motion placements). Same contrarian framing as AWR-01, expected to perform similarly.*

- **Primary text:** *Most brands aren't bad. They're just unclear. Good brands get noticed. Clear brands get clients. We've rebuilt 200+ of them. Average enquiry lift: 250%. Free audit, 48 hours.*
- **Headline:** *Good Gets Noticed.*
- **Description:** *Clear Brands Win Clients.*
- **CTA button:** Get Offer
- **utm_content:** `act_01_clear_brands_get_clients`

---

## Part 3 — Pre-publish verification

Click **Review and publish** but do NOT confirm yet. Walk this checklist:

```
Campaign level:
  ☐ Name = MT_Lead_UK_Andromeda_May26
  ☐ Objective = Sales / Leads
  ☐ Advantage CBO ON, daily budget = £75.00
  ☐ Bid strategy = Highest volume (no cost cap)

Ad set level (one ad set):
  ☐ Name = BrandClarity_Advantage+_UK
  ☐ Conversion location = Website
  ☐ Pixel = 993503079134900
  ☐ ✅ Conversion event = LEAD (not Contact, not Schedule)
  ☐ Audience: UK, 25–65, Advantage+ ON
  ☐ Exclusion = WEB_Converters_180d
  ☐ Placements = Advantage+ placements ON

Ad level (6 ads):
  ☐ All 6 ads created
  ☐ Each has both 4:5 + 9:16 versions uploaded
  ☐ Each has primary text + headline + description + CTA + URL + UTM content set per spec
  ☐ Each ad's pixel/event = Lead
  ☐ All URLs point to https://milktreeagency.com/audit (NOT milktreeagency.com root)
  ☐ No "review pending" or red error indicators on any ad
```

Everything green → click **Publish**.

---

## Part 4 — First 48 hours

**Normal:**
- 0–2 leads in first 24h (learning phase)
- CTR swings wildly (0.5% to 6%)
- Spend won't hit £75 on day 1 — Meta ramps slowly
- Some ads may show 0 impressions on day 1 (CBO still allocating)

**NOT normal — act on these:**
- Spend hits £75 in <12 hours → check for click fraud / pause and investigate
- 0 impressions on the campaign after 24h → ads stuck in review, check Account Quality
- Lead pixel not firing on test submission → tracking broken, **PAUSE campaign immediately** and fix

**Do NOT touch the campaign for 7 days.** Any edit (budget, audience, copy, pause/resume) resets the learning phase. If you must edit, edit ad-level copy only — campaign and ad set settings are off-limits for week 1.

---

## Part 5 — Decision rules week 1–4

| Day | Check | Action |
|---|---|---|
| 7  | Each ad: spend + leads | Cut any ad with ≥£15 spend and 0 leads. Survivors keep the spend. |
| 14 | Ad set CPL | <£20 → push to £100/day. £20–30 → hold. >£30 → review LP/copy. |
| 14 | Top vs bottom ad CTR | If top >2% and bottom <0.8% → cut bottom 2, add 2 video versions of top |
| 21 | Add video creative | 15-sec Reels-format edits of the top 2 image ads |
| 28 | Lookalike check | If 30+ Lead conversions → create LAL 1% from `WEB_Converters_180d`, add as second ad set |

---

## Predicted ranking (post-launch hypothesis)

| Rank | Ad | Predicted CTR | Why |
|---|---|---|---|
| 1 | **AWR-01** *Brand looks fine* | 3.5–5% | Mirrors the proven 4.31%-CTR `your_brand_looks_v2` winner exactly + colour-tag stop-rate |
| 2 | **DES-02** *Homepage one sentence* | 3.0–4.5% | Sharpest headline; surreal visual is high stop-rate |
| 3 | **ACT-01** *Good doesn't convert · Clear brands get clients* | 2.5–4% | Same contrarian framing as AWR-01, premium aesthetic, no typo/text-overlay risk now |
| 4 | **ENG-01** *20 minutes / stranger* | 2.5–4% | New image dramatically improves message-image match; "20 min" is lowest-friction commitment in set |
| 5 | **AWR-02** *Pitch deck vs website* | 2–3.5% | Sharp contrast device; modal-X fix removes the delivery throttle |
| 6 | **DES-01** *Hot Take poll* | 1.5–3% | Engagement-style framing may underperform pure Lead optimisation, but high stop-rate visual |

If the launch produces 2–3 leads/day at £15–25 CPL by day 10, you're on track.

---

## Open items (post-launch)

1. **Subdomain `audit.milktreeagency.com`** — when DNS access returns, add domain in Vercel + CNAME at registrar, then swap UTM destinations from `milktreeagency.com/audit` → `audit.milktreeagency.com/`. Code is already subdomain-aware.
2. **Video creative** for week 3 — 15-sec Reels-format edits of the top 2 image ads
3. **Lookalike audience** for day 28 — 1% LAL from `WEB_Converters_180d` once you have 30+ Lead events
4. **ENG-02 (COMMENT PLAYBOOK) and ACT-02 (Newsletter)** — both intentionally excluded from this campaign (different conversion events). Run as separate Engagement / Subscribe campaigns later.
