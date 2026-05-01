# Launch Runbook — MT_Lead_UK_Andromeda_May26
**Goal:** Get the new Andromeda Lead campaign live in Meta Ads Manager.
**Account:** Milktree Agency AD (`act=762151792261302`)
**Pixel:** `993503079134900`
**Companion docs:** [`META-CREATIVE-FUNNEL-AUDIT-APR-2026.md`](META-CREATIVE-FUNNEL-AUDIT-APR-2026.md) (full reasoning)

---

## Part 0 — Pre-launch checklist (clear all before Step 1)

### Design tasks (designer)
- [ ] **ACT-01 typo:** "ARENT" → "AREN'T" (apostrophe)
- [ ] **AWR-02:** remove the modal "X" close button from the top-right of the card (Meta down-rates fake UI)
- [ ] **DES-01:** remove the in-image "Agree / Disagree" buttons (not clickable in feed → Meta penalises mismatch)
- [ ] **ENG-01:** trim headline. Final version: *"Give us 20 minutes. We'll tell you what a stranger thinks you sell. (It's probably not what you think.)"*
- [ ] Export 6 new creatives at **1080×1350 (4:5 feed)** AND **1080×1920 (9:16 reels/stories)**. Naming: `AWR-01_v1_4x5.jpg`, `AWR-01_v1_9x16.jpg`, etc.

### Landing page tasks (you)
- [ ] **Decide which LP to use** — see Path A vs Path B below
- [ ] If new LP: rewrite hero to *"Nobody knows what you do. We fix that."*
- [ ] If new LP: standardise CTA to *"Free Brand Audit · 48 hours"* in hero, bottom form, button labels
- [ ] If new LP: confirm Lead pixel + CAPI fire on the success state (not on form mount)
- [ ] If milktreeagency.com: confirm hidden-nav fires for `?utm_source=meta` traffic

### Tracking sanity (you, in Events Manager)
- [ ] CAPI coverage ≥75% on PageView (was 1% in March, should be fixed)
- [ ] Lead event EMQ ≥7.0 (was 5.2, target 8+)
- [ ] AEM event priority order: **Lead → Contact → Schedule → ViewContent → PageView → CTAClick**
- [ ] Confirm in Events Manager → Test Events that submitting the form triggers `Lead` (not just `Contact`)

### Account housekeeping
- [ ] Old campaigns confirmed **OFF** (every Milktree campaign except the new one)
- [ ] Custom audience `WEB_Converters_180d` exists (created in March 16 setup)
- [ ] Budget unfrozen (you mentioned this was the reason for the pause)

---

## Part 1 — Build the campaign in Ads Manager (step-by-step)

### Path decision

**Path A — Launch this week against milktreeagency.com**
Use if designer fixes land but the new LP isn't ready. milktreeagency.com hero already matches the proven winning ad pattern (5/5 message-match for AWR-01). Switch LP later in week 2 once new LP is fixed.

**Path B — Launch fully ready against new LP**
Use if you can ship hero rewrite + deliverable standardisation + Lead pixel verification on the new LP this week. Cleaner funnel, no mid-flight LP switch that confuses Meta's learning.

Both paths below use the same campaign structure — only the destination URL changes.

### Step 1 — Open Ads Manager

URL: https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=762151792261302

### Step 2 — Create the campaign

1. Click green **+ Create** button → **Campaign**.
2. **Buying type:** Auctions
3. **Campaign objective:** **Sales** (Meta's new ODAX naming for what used to be "Conversions")
   - Or **Leads** if you don't see Sales — both work, Lead event optimisation is what matters
4. Click **Continue** (skip the "manual sales campaign" template if it offers one — pick **Manual sales campaign**)
5. **Campaign name:** `MT_Lead_UK_Andromeda_May26`
6. **Special ad categories:** none (uncheck if anything is pre-selected)
7. **Campaign Budget Optimization (CBO):** **ON**
8. **Campaign budget:** **Daily £75.00**
9. **Campaign bid strategy:** **Highest volume** (no cost cap — you don't have 50+ leads yet)
10. **Advantage campaign budget:** ON (same as CBO above)
11. Click **Next**.

### Step 3 — Create the ad set

1. **Ad set name:** `BrandClarity_Advantage+_UK`
2. **Conversion location:** **Website**
3. **Performance goal:** **Maximise number of conversions**
4. **Pixel:** `993503079134900` (Milktree Pixel)
5. **Conversion event:** **Lead** ⚠️ NOT Contact. The whole point of the March audit was switching to Lead.
6. **Cost per result goal:** **leave blank** (Highest volume, no cap)
7. **Schedule:**
   - **Start date/time:** today, current time
   - **End date:** none
8. **Audience controls:**
   - **Locations:** United Kingdom
   - **Age:** 25 – 65
   - **Languages:** English (All) — optional, can leave blank
   - **Gender:** All
9. **Advantage+ audience:** **ON** (toggle at top of audience section)
10. **Audience suggestions** (interest signals to feed Andromeda — add these one at a time):
    - Business owner
    - Brand management
    - Marketing strategy
    - Financial services
    - Mortgage
    - Real estate
    - Professional services
11. **Custom audience exclusions:**
    - Click **Show options** under Custom Audiences → **Exclude**
    - Add: `WEB_Converters_180d` (form submitters last 180 days)
12. **Placements:** **Advantage+ placements ON** (don't manually select)
13. **Brand safety / inventory:** Standard inventory (default)
14. Click **Next**.

### Step 4 — Create the 7 ads

For each ad, repeat this flow. Ad set naming: `<ID>` is the ad name in column 1 below.

1. From Ad Set screen → click **+ Add Ad** (or you'll be prompted automatically after Step 3)
2. **Ad name:** see column 1 of the table below (e.g., `your_brand_looks_v2_control`)
3. **Identity → Facebook Page:** Milktree Agency
4. **Identity → Instagram account:** @milktreeagency
5. **Ad setup:** **Create ad** (not "Use existing post")
6. **Format:** **Single image or video**
7. **Media:** click **+ Add Media** → **Add image** → upload the 1080×1350 file. After it uploads, click **+ Add Media → Add image** again and upload the 1080×1920 (9:16) version. Meta will auto-place each by placement.
8. **Primary text:** paste from §Per-ad copy below
9. **Headline:** paste from §Per-ad copy below
10. **Description:** paste from §Per-ad copy below
11. **Call to action:** see column 5 below
12. **Website URL:** see §Destination URL below
13. **URL parameters (UTM):** click "Build a URL parameter" — fill in the table below per-ad
14. **Pixel & events:** confirm `Milktree Pixel (993503079134900)` is selected with **Lead** as the conversion event
15. Repeat for all 7 ads

**After all 7 ads are created, leave the campaign in DRAFT (do not click Publish yet).**

---

## Part 2 — Per-ad copy paste sheet

| # | Ad name | Image source (Figma node) | Format | CTA button |
|---|---|---|---|---|
| 1 | `your_brand_looks_v2_control` | (existing in account — duplicate from MT_Lead_UK_Mar26) | 4:5 + 9:16 | Get Offer |
| 2 | `AWR-01_brand_looks_unclear` | Stage 1 / AWR-01 | 4:5 + 9:16 | Get Offer |
| 3 | `AWR-02_pitch_deck_vs_website` | Stage 1 / AWR-02 (after modal-X fix) | 4:5 + 9:16 | Get Offer |
| 4 | `DES-01_hot_take_ten_people` | Stage 2 / DES-01 (after button removal) | 4:5 + 9:16 | Get Offer |
| 5 | `DES-02_homepage_one_sentence` | Stage 2 / DES-02 | 4:5 + 9:16 | Get Offer |
| 6 | `ENG-01_twenty_minutes_stranger` | Stage 3 / ENG-01 | 4:5 + 9:16 | Book Now |
| 7 | `ACT-01_crossword_unclear` | Stage 4 / ACT-01 (after typo fix) | 4:5 + 9:16 | Get Offer |

### Destination URL

- **Path A** (milktreeagency.com): `https://www.milktreeagency.com/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Andromeda_May26&utm_content={AD_NAME}`
- **Path B** (new LP): `https://[NEW_LP_URL]/?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Andromeda_May26&utm_content={AD_NAME}`

Replace `{AD_NAME}` per ad: `awr_01_brand_looks_unclear`, `awr_02_pitch_deck`, `des_01_hot_take`, `des_02_homepage_one_sentence`, `eng_01_twenty_minutes`, `act_01_crossword`, `your_brand_looks_v2_control`.

### Ad copy (paste these verbatim)

**Ad 1 — `your_brand_looks_v2_control`** (control, leave existing copy from March campaign — do NOT rewrite)

If you can't duplicate the existing ad, use:
- **Primary text:** *We asked 200+ business owners what happened after we rebuilt their brand. 250% average increase in enquiries. Not because of a pretty logo — because of a clear identity that sells for you.*
- **Headline:** *Nobody Knows What You Do. We Fix That.*
- **Description:** *Free brand audit. Results in 48 hours.*

---

**Ad 2 — `AWR-01_brand_looks_unclear`**
- **Primary text:** *We asked 200+ business owners what they thought our clients sold. Half got it wrong. That's a positioning problem — we fix it in 48 hours, free. Book the audit.*
- **Headline:** *Nobody Knows What You Do.*
- **Description:** *Free Brand Audit · 48h*

---

**Ad 3 — `AWR-02_pitch_deck_vs_website`**
- **Primary text:** *Your pitch deck says exactly what you do. Your website says "solutions for modern teams." One of those is costing you clients. We rewrite the second one — free, in 48 hours.*
- **Headline:** *Your Website Is Lying.*
- **Description:** *Free Audit · No commitment*

---

**Ad 4 — `DES-01_hot_take_ten_people`**
- **Primary text:** *Hot take: if ten people describe your business ten different ways, your brand isn't unclear — it's invisible. We make it impossible to misread. Free audit, 48 hours.*
- **Headline:** *Is Your Brand Clear?*
- **Description:** *Free Audit · 200+ Brands Built*

---

**Ad 5 — `DES-02_homepage_one_sentence`**
- **Primary text:** *Your homepage is one sentence from winning. The hero line is the entire pitch — if it doesn't land, nothing below it will. We've rewritten 200+ of them. Average lift: 250%.*
- **Headline:** *Fix Your Hero Line.*
- **Description:** *Free Audit · 48h Turnaround*

---

**Ad 6 — `ENG-01_twenty_minutes_stranger`**
- **Primary text:** *Give us 20 minutes. We'll tell you what a stranger thinks you sell. It's probably not what you think — and that disconnect is your opportunity. Book the free audit.*
- **Headline:** *20 Minutes. One Audit.*
- **Description:** *Free · 48h Results*

---

**Ad 7 — `ACT-01_crossword_unclear`**
- **Primary text:** *Most brands aren't bad — they're just unclear. We've rebuilt 200+ of them into something the right clients can't ignore. Average enquiry lift: 250%. Free audit, 48 hours.*
- **Headline:** *Most Brands Aren't Bad.*
- **Description:** *They're Just Unclear.*
- **⚠️ Placement override:** edit this ad after creation → **Placements** → **Manual placements** → uncheck Reels and Stories. The text-heavy crossword image gets down-rated in motion-first placements.

---

## Part 3 — Pre-flip-on verification (DO THIS BEFORE CLICKING PUBLISH)

Click **Review and publish** but do NOT confirm yet. Walk through this checklist:

- [ ] Campaign name = `MT_Lead_UK_Andromeda_May26`
- [ ] Campaign objective = Sales / Leads
- [ ] CBO ON, daily budget = £75.00
- [ ] Bid strategy = Highest volume
- [ ] One ad set: `BrandClarity_Advantage+_UK`
- [ ] Conversion event on ad set = **Lead** (not Contact, not Schedule)
- [ ] Pixel = 993503079134900
- [ ] Audience: UK, 25–65, Advantage+ ON
- [ ] Exclusion = `WEB_Converters_180d`
- [ ] Placements = Advantage+ (except ACT-01 which is Manual: no Reels/Stories)
- [ ] 7 ads created, each with 4:5 + 9:16 versions uploaded
- [ ] Each ad: primary text, headline, description, CTA, URL with UTMs all set
- [ ] Each ad: pixel/event = Lead
- [ ] No "review pending" or red error indicators on any ad

When everything is green, click **Publish**. The campaign starts immediately at the schedule time you set.

---

## Part 4 — First 48 hours after launch

**What's normal:**
- 0–2 leads in the first 24h (learning phase)
- CTR will swing wildly (anywhere from 0.5% to 6%)
- Spend will not hit £75/day on day 1 — Meta ramps slowly
- Some ads may show 0 impressions on day 1 — CBO is still allocating

**What's NOT normal (act on these):**
- Spend hits £75 in <12 hours → check for click fraud / Meta auto-bidding too aggressive
- 0 impressions on the campaign after 24h → ads stuck in review, check Account Quality
- Lead pixel not firing on test submission → tracking broken, pause campaign

**Do NOT touch the campaign for 7 days.** Any edit (budget, audience, copy, pause/resume) resets the learning phase. If you must edit, edit the ad-level copy only — campaign and ad set settings are off-limits for week 1.

---

## Part 5 — Week-by-week decision rules

| When | Check | Decision |
|---|---|---|
| Day 7 | Each ad's spend + leads | Cut any ad with ≥£15 spend and 0 leads. Survivors keep the spend. |
| Day 14 | Ad-set cost per lead | <£20 → push to £100/day. £20–30 → hold. >£30 → see Path B above (LP fix) |
| Day 14 | Top ad's CTR | If top ad >2% and bottom ad <0.8% → cut bottom 2 ads, add 2 video versions of top ads |
| Day 21 | Add video creative | 15-sec Reels-format edits of the top 2 image ads. CBO will reallocate to whichever wins. |
| Day 28 | Lookalike eligibility | If 30+ Lead conversions → create LAL 1% from `WEB_Converters_180d`, add as second ad set |

---

## Open items (parking lot — handle after launch)

1. **ENG-02 (COMMENT PLAYBOOK)** — set up DM auto-reply via Meta Inbox + run as a separate Engagement-objective ad set
2. **ACT-02 (Newsletter signup)** — needs `/newsletter` LP first, then a separate Subscribe-event campaign
3. **Video assets** — 15-sec Reels edits of AWR-01 and DES-02 (week 3 priority)
4. **Cal.com loading** — if new LP uses Cal.com in hero, defer with IntersectionObserver per CLAUDE.md Rule 3
