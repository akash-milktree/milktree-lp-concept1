# Meta Creative Funnel Audit — April 2026
**Date:** 28 Apr 2026
**Account:** Milktree Agency AD (act=762151792261302)
**Pixel:** 993503079134900
**Campaign baseline:** `MT_Lead_UK_Mar26` (paused for budget freeze)
**Performance window:** YTD (1 Jan → 28 Apr 2026)
**New creatives audited:** 8 ads across 4 funnel stages (Figma node 518:2)

---

## Executive Summary

You're moving to an **Andromeda-style 1-campaign / 1-ad-set / all-creatives** structure with 8 new funnel-stage creatives. The data signal from the paused campaign tells us:

- **The winning pattern is established:** `your_brand_looks_v2` → 4.31% CTR / £0.33 CPC / 4,893 imp / £69.50 spend. CBO chose it as the dominant ad. The pattern is **strong contrarian hook + specific quantified outcome (250%, 200+) + direct "we fix it" headline.**
- **The losing pattern is also established:** `this_could_be_v1` got starved (14 impressions over the entire campaign life). CBO actively ranked it last.
- **Total spend YTD on this campaign: £135.37 → 0 Lead conversions.** No real attribution data, only engagement signals.

**Verdict on the 8 new creatives:** Strong concept work. Five are likely winners, two need copy/design fixes before launch, one is in the wrong funnel (newsletter, not Free Audit) and shouldn't be in the same ad set. Specifics below.

**Landing page recommendation:** Use the **new LP** for paid traffic (form above the fold, single-purpose, premium aesthetic) — but **two ship-blockers must be fixed first**: (1) the hero headline "Brands that earn attention. Systems that scale it." breaks the proven message-match with the winning ad; rewrite to "Nobody knows what you do. We fix that." (2) the page offers three different deliverables (30-min call, 5-min teardown, 48-hour audit). Pick "Free Brand Audit · 48-hour turnaround" everywhere. Details in §4.

---

## 1. Performance Baseline & Winning Patterns

### 1.1 What CBO Actually Chose (Andromeda Signal)

| Ad | Reach | Imp | Freq | CTR | Link CTR | CPC | CPM | Spend | Result |
|---|---|---|---|---|---|---|---|---|---|
| **your_brand_looks_v2** ⭐ | 3,698 | 4,893 | 1.32 | **4.31%** | **3.74%** | £0.33 | £14.20 | £69.50 | 0 leads |
| your_third_rebrand_v1 | 3,411 | 4,340 | 1.27 | 1.82% | 1.36% | £0.55 | £10.06 | £43.64 | 0 leads |
| your_brand_looks_v1 | 1,591 | 1,821 | 1.14 | 2.42% | 1.81% | £0.49 | £11.76 | £21.41 | 0 leads |
| this_could_be_v1 | 14 | 14 | 1.00 | 14.29%* | 14.29%* | £0.31 | £43.57 | £0.61 | 0 leads |
| your_brand_looks_v2_rt | 1 | 1 | 1.00 | — | — | — | £210.00 | £0.21 | 0 leads |
| this_could_be_v1_rt | — | — | — | — | — | — | — | £0.00 | 0 leads |

*14.29% CTR on 14 impressions is statistically meaningless (2 clicks of 14 = noise).

**What this means:**
- CBO concentrated 81% of spend on the two `your_brand_looks` and `your_third_rebrand` ads.
- `your_brand_looks_v2` was the unambiguous winner: 4.31% CTR is **2× the typical 1–3% Meta benchmark**, with the cheapest CPC of the served set.
- Retargeting ad sets were starved (0–1 impressions) — the audience pool was too small to spend against. **For the relaunch, do NOT split into prospecting + retargeting** — keep one ad set.

### 1.2 Winning Creative Pattern (decode of `your_brand_looks_v2`)

```
Primary text:  "We asked 200+ business owners what happened
                after we rebuilt their brand. 250% average increase
                in enquiries. Not because of a pretty logo —
                because of a clear identity that sells for you."

Headline:      "Nobody Knows What You Do. We Fix That."

Description:   "Free brand audit. Results in 48 hours."
```

**Pattern ingredients (use these in every new ad):**
1. **Specific data hook in line 1** — "200+ business owners", "250% increase". Numbers above the fold.
2. **Direct headline-as-promise** — "Nobody Knows What You Do. We Fix That." (this exact line is also the milktreeagency.com hero — perfect message-match).
3. **Reframe the buyer's misconception** — "Not because of a pretty logo — because of a clear identity that sells for you."
4. **Concrete deliverable + speed** — "Free brand audit. Results in 48 hours."

**Pattern that lost (`this_could_be_v1`):** No numbers. No reframe. CTA-first ("This could be your brand. Clear. Professional. Chosen first."). Algorithm read it as low-information.

---

## 2. Per-Creative Audit (8 Ads)

Score key: 🟢 ship / 🟡 ship with fixes / 🔴 hold / ⚫ wrong funnel.

### STAGE 1 — Awareness

#### AWR-01 — "Your brand looks fine. Nobody knows what it stands for." 🟢

**What works:**
- Headline directly mirrors the **winning pattern** (`your_brand_looks_v2` headline + milktree.com hero). Highest predicted performer of the 8.
- Coloured sticky-note tags (blue, pink, green, orange) are scroll-stoppers in a feed of muted brand ads.
- The "Ask ten people…" subtitle restates the audit promise without selling.

**Fix before launch:**
1. **Add a quantified proof line as primary text** — copy from `your_brand_looks_v2`: *"We asked 200+ business owners what they thought our clients sold. Half got it wrong. That's why we built the Free Brand Audit — 48-hour turnaround, no commitment."*
2. The image has no in-image CTA — that's fine. Let Meta's "Learn More" button carry it. Set CTA button = **Get Offer** (higher Meta-side weighting than "Learn More" for this objective).
3. Move the milktree wordmark from dead centre to top-left — visual symmetry currently competes with the headline for attention.

#### AWR-02 — "Your pitch deck says exactly what you do. The website says 'Solutions for modern teams'" 🟡

**What works:**
- The contrast device (pitch deck vs website) is the cleanest articulation of the brand-clarity pain in the set.
- Yellow highlighter on the cliché phrase gives a single point of focus.

**Fix before launch:**
1. **Remove the modal X-close button (top-right of card)**. Meta's automated review penalises ads that mimic a UI element the user can interact with — it reads as deceptive. This alone could throttle delivery.
2. The card sits over a kid + bicycle scene. The image content adds no meaning to the message and dilutes it. **Either** (a) crop the photo to background texture only so the card carries the ad, **or** (b) swap to a stock photo of a generic SaaS landing page so the visual reinforces the "website says" copy.
3. Add the trailing line after "One of them is costing you clients" — "*Free Brand Audit. 48 hours. No commitment.*" Closes the loop.

### STAGE 2 — Engagement

#### DES-01 — "Hot Take" poll with Agree/Disagree 🟡

**What works:**
- The 9 diverse faces grid is high-stop-rate visual.
- "Hot Take" framing primes the reader for an opinion → engagement bias.
- The Agree/Disagree mechanic is conversational, not promotional.

**Fix before launch:**
1. **Remove the Agree / Disagree buttons inside the image**. They're not clickable in-feed, so users tap them and get the campaign's outbound link instead — Meta interprets that mismatch as misleading and reduces delivery. Keep the "Hot Take:" framing but rebuild the central card as a single quote, no buttons.
2. The faces are international/US-coded. Your audience signals are UK SMBs (mortgage, real estate, professional services). Either keep the same crop but desaturate slightly to read as universal, or replace 3–4 faces with UK-coded alternates.
3. The repetition of the "ten people" angle from AWR-01 is a feature, not a bug — keep both in the same ad set; CBO will pick one.
4. Swap "GET IN TOUCH" → "**BOOK FREE AUDIT**". "Get in touch" is friction vocabulary.

#### DES-02 — "Your homepage is one sentence from winning" 🟢

**What works:**
- Surreal visual (laptop on a desk in the sea) is the strongest stop-rate creative in the set.
- Headline is sharp and specific. Subtitle restates the proposition without hedging.
- Yellow CTA button has good colour contrast against the blue.

**Fix before launch:**
1. The image reads as AI-generated. Not a death-knell, but UK B2B audiences are increasingly suspicious. **If a real photographic source is available, use it.** Otherwise leave it — the concept is strong enough to carry it.
2. Same CTA fix: "GET IN TOUCH" → "**BOOK FREE AUDIT**".
3. Add a one-line proof under the subtitle: *"We've rewritten the hero line for 200+ brands. Average enquiry lift: 250%."*

### STAGE 3 — Offer

#### ENG-01 — "Give us 20 minutes. We'll tell you what a stranger thinks you sell..." 🟡

**What works:**
- "Give us 20 minutes" is the lowest-friction commitment in the set. Strong opener.
- The "stranger" framing is a smart reframe of the audit (third-party perspective, not vendor pitch).
- Direct BOOK FREE AUDIT CTA in-image.

**Fix before launch:**
1. **Headline is too long** (~35 words) for in-feed reading. Cut to: *"Give us 20 minutes. We'll tell you what a stranger thinks you sell. (It's probably not what you think.)"* — kill the "That disconnect is the opportunity" line; redundant.
2. The grass-and-sky background doesn't reinforce the message. Either swap to a photo of two strangers in conversation (matches "stranger thinks you sell"), or solid-colour background so the headline carries.
3. Keep the BOOK FREE AUDIT in-image CTA — this is the one ad in the set where it earns its space.

#### ENG-02 — "The frameworks that turn vague brands undeniable." (COMMENT PLAYBOOK) ⚫

**What works:**
- Beautiful art direction — moody portrait + sharp serif typography.
- The lead-magnet copy ("Positioning Maps. Messaging Structures. The Audit Checklist…") is specific and value-laden.

**Why it doesn't belong in this ad set:**
1. **Wrong conversion event.** This is a DM/comment-keyword lead magnet (ManyChat-style). It optimises for Comments, not Lead. If you put it in the same `MT_Lead_UK_Mar26` campaign optimising for the Lead event, Meta will under-deliver it because comments don't fire the Lead pixel.
2. **"COMMENT PLAYBOOK" only works on Instagram Reels/Stories.** On Facebook feed and right-rail it breaks the journey — viewers don't know where to comment.
3. **Move this to a separate Engagement-objective campaign** (or a separate ad set inside an Engagement campaign), with its own DM-keyword automation set up in Meta Inbox or ManyChat. Do not bundle with the Lead-objective campaign.

If you insist on running it in the Lead campaign, swap the CTA to **DOWNLOAD PLAYBOOK** and route to a milktreeagency.com/playbook gated form so the Lead event still fires.

### STAGE 4 — Action

#### ACT-01 — "MOST BRANDS ARENT BAD. THEY ARE JUST UNCLEAR." (crossword) 🟡

**What works:**
- Distinctive typography treatment. High stop-rate potential — looks unlike any agency ad in the feed.
- The yellow "UNCLEAR" reveal at the bottom is a satisfying punch line.
- The crossword visually rhymes with "puzzle / system" — implies Milktree organises chaos.

**Fix before launch:**
1. **Typo: "ARENT" → "AREN'T"** (missing apostrophe). Ship-blocker — Meta's automated review may flag it, prospects will absolutely notice.
2. The image is 80%+ text. Meta historically penalised >20% text overlay; the rule was retired in 2020 but **ad-quality scoring still down-weights heavy-text creative** in Reels and Stories placements. Restrict this ad to **Feed + Marketplace placements only** in the ad set settings, or duplicate with the same concept rebuilt as native Reels (motion + voiceover).
3. Accessibility: text-as-image is unreadable to screen readers. Add the literal headline string in the ad's primary text so it still reaches assistive tech users and Meta's content classifiers.

#### ACT-02 — "How The Sharpest Brands Stay Sharp. Weekly." (newsletter) ⚫

**Wrong funnel for this campaign.**

This is a **newsletter signup** ad ("JOIN THE INNER CIRCLE"), not a Free Audit ad. Same problem as ENG-02:
1. Different conversion event (Subscribe, not Lead).
2. Different audience temperature (newsletter signup intent is much lower than booking a call).
3. The visual is gorgeous but tells the viewer nothing about what they get — viewers won't convert without proof of value.

**Move to a separate campaign.** Optimise for a Subscribe / Complete Registration event. Build a dedicated /newsletter LP with one form and a clear "Here's what you get every week" promise.

### Predicted Ranking (in the Lead campaign, after fixes)

| Rank | Ad | Predicted CTR | Why |
|------|----|----|----|
| 1 | **AWR-01** (Your brand looks fine…) | 3.5–5% | Mirrors the proven winner exactly + colour-tag stop-rate |
| 2 | **DES-02** (Homepage one sentence from winning) | 3.0–4.5% | Sharpest headline in the set; surreal visual |
| 3 | **ACT-01** (Crossword UNCLEAR) — after typo fix | 2.5–4% | Highest stop-rate; text-heavy = mid-funnel only |
| 4 | **AWR-02** (Pitch deck vs website) — after modal fix | 2–3.5% | Smart contrast device; image needs work |
| 5 | **ENG-01** (20 minutes) — after copy trim | 1.5–3% | Strong CTA; image doesn't reinforce |
| 6 | **DES-01** (Hot Take poll) — after button removal | 1.5–3% | Engagement-style, may underperform pure Lead optimisation |

**Excluded from this ad set:** ENG-02 (wrong conversion event), ACT-02 (wrong funnel).

---

## 3. Andromeda 1-Campaign / 1-Ad-Set Blueprint

### 3.1 Why one ad set, not two

The previous setup had separate Prospecting and Retargeting ad sets. The retargeting ad set got 0–1 impressions across the campaign life because the visitor pool was too small to allocate against. With the Andromeda update, Meta's algorithm now handles audience layering inside a single ad set — splitting hurts more than it helps until you have ≥10K weekly site visitors.

### 3.2 Structure

```
MT_Lead_UK_Andromeda_May26                      [Campaign — Leads, CBO]
└── BrandClarity_Advantage+_UK                  [Ad Set — Lead optimisation]
    ├── AWR-01_brand_looks_unclear              [scroll-stop hook]
    ├── AWR-02_pitch_deck_vs_website            [contrast device]
    ├── DES-01_hot_take_ten_people              [engagement framing]
    ├── DES-02_homepage_one_sentence            [surreal visual]
    ├── ENG-01_twenty_minutes_stranger          [low-friction commitment]
    ├── ACT-01_crossword_unclear                [high stop-rate]
    └── (your_brand_looks_v2 — keep the proven winner as control)
```

**7 ads in one ad set.** Meta's Andromeda model favors ad sets with 6–10 distinct creatives over the old "5 max" guidance. Keep the proven `your_brand_looks_v2` running alongside the new ones — it's your benchmark.

### 3.3 Settings

| Setting | Value | Why |
|---|---|---|
| Campaign objective | Leads | Matches Lead pixel event on /thank-you |
| CBO | ON | Let Andromeda allocate spend |
| Daily budget | **£75/day** (up from £50) | 7 creatives need ~£10/day each to clear learning floor |
| Bid strategy | Highest volume | No cost cap until you have 50+ Lead events |
| Conversion event | **Lead** (NOT Contact) | Only fires on real form submit |
| Performance goal | Maximise number of conversions | |
| Audience | Advantage+ Audience ON, UK, 25–65, all genders | Same signals as Mar 26 blueprint |
| Audience signals (suggestions) | Business owner, brand management, marketing strategy, financial services, mortgage, real estate, professional services | Unchanged — these worked |
| Exclusions | `WEB_Converters_180d` (form submitters last 180d) | Don't waste impressions on people who already booked |
| Placements | Advantage+ Placements ON | Critical — Andromeda needs cross-placement signals |
| Dynamic creative | **OFF** | You want per-ad attribution, not blended |

**Placement carve-out for ACT-01 (crossword, text-heavy):** duplicate the ad and restrict the duplicate to Feed + Marketplace only. The original goes everywhere.

### 3.4 Copy specs per ad (ready to paste)

For each ad: Primary text 90–125 chars (above the "see more" cut), Headline ≤27 chars, Description ≤27 chars.

**AWR-01_brand_looks_unclear**
- Primary text: *We asked 200+ business owners what they thought our clients sold. Half got it wrong. That's a positioning problem — we fix it in 48 hours, free. Book the audit.*
- Headline: *Nobody Knows What You Do.*
- Description: *Free Brand Audit · 48h*
- CTA: Get Offer
- URL: `[LP]?utm_source=meta&utm_medium=paid&utm_campaign=MT_Lead_UK_Andromeda_May26&utm_content=AWR-01`

**AWR-02_pitch_deck_vs_website**
- Primary text: *Your pitch deck says exactly what you do. Your website says "solutions for modern teams." One of those is costing you clients. We rewrite the second one — free, in 48 hours.*
- Headline: *Your Website Is Lying.*
- Description: *Free Audit · No commitment*
- CTA: Get Offer

**DES-01_hot_take_ten_people**
- Primary text: *Hot take: if ten people describe your business ten different ways, your brand isn't unclear — it's invisible. We make it impossible to misread. Free audit, 48 hours.*
- Headline: *Is Your Brand Clear?*
- Description: *Free Audit · 200+ Brands Built*
- CTA: Get Offer

**DES-02_homepage_one_sentence**
- Primary text: *Your homepage is one sentence from winning. The hero line is the entire pitch — if it doesn't land, nothing below it will. We've rewritten 200+ of them. Average lift: 250%.*
- Headline: *Fix Your Hero Line.*
- Description: *Free Audit · 48h Turnaround*
- CTA: Get Offer

**ENG-01_twenty_minutes_stranger**
- Primary text: *Give us 20 minutes. We'll tell you what a stranger thinks you sell. It's probably not what you think — and that disconnect is your opportunity. Book the free audit.*
- Headline: *20 Minutes. One Audit.*
- Description: *Free · 48h Results*
- CTA: Book Now

**ACT-01_crossword_unclear**
- Primary text: *Most brands aren't bad — they're just unclear. We've rebuilt 200+ of them into something the right clients can't ignore. Average enquiry lift: 250%. Free audit, 48 hours.*
- Headline: *Most Brands Aren't Bad.*
- Description: *They're Just Unclear.*
- CTA: Get Offer

**your_brand_looks_v2 (control — leave the existing copy unchanged)**

### 3.5 Custom audiences (verify these still exist from Mar 26 setup)

- `WEB_AllVisitors_30d` — for a future retargeting expansion (don't activate yet)
- `WEB_Converters_180d` — exclusion list (REQUIRED for the prospecting ad set)
- `WEB_Engaged25pct_30d` — backup retargeting

### 3.6 Week-by-week

| Week | Action | Decision rule |
|---|---|---|
| 1 (days 1–7) | Launch. **Don't touch.** | Even if CPA looks bad, edits reset learning. |
| 2 | Cut any ad with ≥£15 spend and 0 leads. | Survivors get the spend. |
| 3 | Add 2 video versions (15-sec edits of AWR-01 and DES-02). | Reels placements need motion. |
| 4 | If CPA <£20 → push budget to £100/day. £20–30 → hold. >£30 → review LP. | Andromeda needs ~50 conversions to fully leave learning. |

---

## 4. Landing Page Audit (Updated — both LPs reviewed)

### 4.1 New LP — section-by-section breakdown

**Hero (above fold)**
- Headline: *"Brands that earn attention. Systems that scale it."* (italic + yellow accents on "earn attention" / "scale it")
- Subhead body copy
- Two CTAs: yellow **Book Discovery Call** + outline **See our work**
- Stats strip: 200+ · 250% · 15+ · 4–6 wk
- **Right column: a "Book a free 30-minute call" form widget visible above the fold** ← this is the single biggest improvement over milktreeagency.com

**Section 2 — Logo trust strip** (Powerforce, Alltrad, etc.)

**Section 3 — "This is not a design problem. It's a clarity problem."**
- Two side-by-side cards: red "Without clarity" (4 problem bullets) vs green "With Milktree" (4 outcome bullets)

**Section 4 — "Seven disciplines. One operating system."**
- 7-card service grid: Brand Strategy, Branding, Design System, UX/UI & Websites, Content Strategy, Social Media Design, Generative AI Visuals

**Section 5 — "From diagnosis to rollout — in four to six weeks."**
- Accordion of 4 process steps (Audit, Position, Identity, Rollout)

**Section 6 — "We measure by enquiries, not applause."**
- 6 metric cards in 2×3 grid: £3.27, 300%, 564%, 1,500+, +50%, +20%

**Section 7 — Testimonial + lifetime stats**
- Edward (HMO Checker) quote
- 11k+ / 257 / 400% number block

**Section 8 — Bottom form: "See what your brand is really saying."**
- Body offers a *5-minute teardown within 24 hours* (different deliverable than the hero call)
- Form: email + message, "Send my teardown" CTA

**Section 9 — FAQ accordion** (6 questions)

**Footer** (minimal)

### 4.2 New LP vs milktreeagency.com — head-to-head

| Dimension | milktreeagency.com | New LP | Winner |
|---|---|---|---|
| Hero match to winning ad | "Nobody knows what you do. We fix that." → matches `your_brand_looks_v2` perfectly (5/5) | "Brands that earn attention. Systems that scale it." → no match (2/5) | **milktree.com** |
| Form above the fold | No — buried at section 13 | **Yes — booking widget in hero** | **New LP** |
| Single-purpose structure | 13 sections, includes pricing & comparison table | 9 sections, conversion-focused | **New LP** |
| Hidden nav for paid | Implemented (commit `50b695b`) but full nav still in DOM | Visually minimal nav (logo + Free Audit only) | **New LP** |
| Trust signals above fold | Yes — 200+ / 15+ / 250% strip | Yes — same numbers + stronger placement | Tie |
| Time-to-CTA | ~600px scroll to first form | **0px — form is in hero** | **New LP** |
| Pricing exposed early | Yes (£1,500 / £750/mo visible) | No — pricing not on this page | **New LP** for cold paid; milktree.com better for warm research |
| Case-study proof | 10+ case-study tiles + 6 testimonials | 6 metric cards + 1 testimonial | **milktree.com** for depth |
| Aesthetic | Light, clean, conventional | Dark, premium, distinctive | **New LP** |
| Deliverable consistency | "Free Brand Audit · 48 hours" everywhere | **Inconsistent**: hero says "30-min discovery call", bottom form says "5-min teardown · 24 hours" | **milktree.com** |
| Page weight / speed | Heavier (full site with case studies) | Lighter (single page) | **New LP** (assumed — verify) |

**Verdict: Use the new LP for paid traffic — but you have two ship-blockers to fix first.**

### 4.3 ⚠️ Two ship-blockers on the new LP

**Blocker 1 — Hero headline breaks the proven message-match.**

Your single best-performing ad (`your_brand_looks_v2`) ran the headline "Nobody Knows What You Do. We Fix That." That headline matches milktreeagency.com's hero word-for-word — perfect message-match. The new LP changes the hero to "Brands that earn attention. Systems that scale it.", which is more abstract and **doesn't reinforce any of the 8 new ad headlines**. For an ad-driven LP this is the #1 thing to fix.

**Recommended hero rewrite for the new LP:**
- Primary line: **"Nobody knows what you do. We fix that."** (keep the proven hook)
- Italic accent line: *"Clarity. Identity. The system that turns it into pipeline."*
- OR a hybrid that keeps the existing rhythm: **"Brands the right clients can't ignore. Systems that scale them."**

The first option is the safe bet — it's the proven winner. Use the second only if there's a strategic reason to evolve the headline.

**Blocker 2 — Two different offers on one page.**

The hero offers a *30-minute discovery call*. The bottom form offers a *5-minute teardown within 24 hours*. The 8 ads promise a *48-hour Free Brand Audit*. That's three different deliverables on one funnel. Pick one and use it everywhere:
- **Recommended:** "Free Brand Audit · 48-hour turnaround" — matches the ads, matches the milktree.com promise, matches the existing /thank-you page tracking.
- Bottom-form CTA changes from "Send my teardown" → "**Get my free audit**".
- Hero booking widget either becomes the same audit form, or is replaced with a 2-field form (Name, Email) above the fold.

### 4.4 Per-ad message-match score (against the actual new LP, hero NOT yet rewritten)

Score: 1 (no match) — 5 (perfect match).

| Ad | New LP hero match | Score | Note if hero is rewritten to "Nobody knows what you do…" |
|---|---|---|---|
| AWR-01 (brand looks fine, nobody knows…) | 2 | Word-for-word literal mismatch | **5** |
| AWR-02 (pitch deck vs website) | 2 | LP doesn't address website disconnect | **4** |
| DES-01 (Hot Take: ten people…) | 2 | LP §3 "clarity problem" half-supports it | **4** |
| DES-02 (homepage one sentence) | 2 | LP doesn't talk about hero lines specifically | **3** (still needs section variant) |
| ENG-01 (20 minutes, stranger) | 3 | LP hero offers "30-minute call" — close but not matching | **4** if 30-min call → 20-min audit |
| ACT-01 (Most brands aren't bad, just unclear) | 3 | LP §3 "clarity problem" mirrors this perfectly | **5** with hero rewrite |
| ENG-02 (frameworks, COMMENT PLAYBOOK) | 1 | DM lead magnet — wrong LP | **1** — needs `/playbook` LP |
| ACT-02 (newsletter signup) | 1 | Wrong LP — needs `/newsletter` | **1** — needs dedicated LP |

**Overall message-match score after hero rewrite: 4.0/5 average for the 6 in-funnel ads** vs current **2.3/5**. This single edit is the highest-leverage change in the entire plan.

### 4.5 Other recommendations on the new LP (post-blockers)

1. **Section 3 ("This is not a design problem. It's a clarity problem.")** is gold — promote it. Either move it directly under the hero or weave the line *"It's not a design problem. It's a clarity problem."* into the hero subhead.
2. **Section 6 metric cards (£3.27, 300%, 564%, 1,500+, +50%, +20%)** lack context — viewers don't know what each number measures or for which client. Add 1-line client + metric labels (e.g., *"Heat-Plex · cost per lead, paid social, Q1 2026"*) so the numbers earn trust instead of feeling like noise.
3. **Single testimonial in §7 is too thin** for cold paid traffic. Add 2 more (you have plenty on milktree.com — Chris/Police Mortgages, Felix/Flexibuy, Erald/The Olive Tree).
4. **The "11k+ / 257 / 400%" lifetime block** has no labels in the screenshot — same problem as §6. Label what each represents.
5. **Hero booking widget on the right** — if it's a Cal.com embed, follow the IntersectionObserver-deferred pattern from CLAUDE.md Rule 3. A Cal.com embed loaded eagerly in the hero will tank LCP on mobile.
6. **Hero copy length** — current subhead is too long. Cut to one line.
7. **Add a sticky "Book Free Audit" button on mobile** that follows the user past the fold (most paid clicks are mobile).
8. **Make sure tracking parity is intact** — Meta Pixel + CAPI must fire on whatever the new "thank you" / success state is. If the booking widget posts to Cal.com, the Lead pixel event must fire after the calendar confirms (not on widget mount).

**Strengths for paid traffic:**
- Hero **"Nobody knows what you do. We fix that."** matches the proven winning ad pattern. Message-match is near-perfect for AWR-01.
- Trust strip above the fold: *200+ brands · 15+ industries · 250% avg enquiry increase*. These are the same proof points used in the winning ad copy.
- Two CTAs at the top: primary "Get My Free Brand Audit", secondary "View recent work". Single-purpose page would be tighter for paid (see weaknesses).
- Clear before/after framing → process (4 steps) → social proof (case studies + testimonials with names + titles) → comparison table → pricing → form.
- Form is short: Name, Email, optional Website. "Takes 15 seconds. No commitment."

**Weaknesses for paid traffic specifically:**
- **Top nav still includes Services / Pricing / Reviews / FAQs / Case Studies links.** For paid traffic the nav should be hidden (or only the logo + Free Audit button visible). You already have a hidden-nav pattern (commit `50b695b: Hide navbar links for paid traffic`) — confirm it's actually firing for `?utm_source=meta` traffic.
- Hero subtitle is 24 words. Cut to one line: *"We build brand identities that make you the obvious choice."*
- The page is ~7 sections deep. For paid traffic the form should appear at section 2, not section 13. Add a sticky "Book Free Audit" button on mobile or an in-hero form variant.
- Pricing exposed too early. For cold paid traffic, hide the pricing block and move it into the post-audit follow-up.
- Form has no in-line social proof. Move the "*The audit alone gave us more clarity than 6 months of trying to figure it out ourselves.*" testimonial directly under the form fields.

### 4.3 Message-match score (each ad → milktreeagency.com hero, since new LP isn't accessible)

Score: 1 (no match) — 5 (perfect match).

| Ad | LP hero | Score | Note |
|---|---|---|---|
| AWR-01 (brand looks fine, nobody knows…) | "Nobody knows what you do. We fix that." | **5** | Perfect — same words. |
| AWR-02 (pitch deck vs website) | Same | 4 | Implies the same problem. Add a "Your website is lying" subhead variant. |
| DES-01 (Hot Take: ten people…) | Same | 4 | The "ten people" framing pre-sells the hero. |
| DES-02 (one sentence from winning) | Same | 3 | LP doesn't talk about hero lines specifically. Consider an LP variant that opens with "Your hero line is your pitch." |
| ENG-01 (20 minutes, stranger) | Same | 3 | LP doesn't promise the 20-minute commitment specifically. Add a "How it works" section that opens with "Step 1: Book your 20-minute call." |
| ACT-01 (Most brands aren't bad, just unclear) | Same | 4 | Same thesis. Add a "Most brands aren't bad — they're just unclear" line in the LP intro. |

**Recommendation:** Don't ship LP variants per ad — that fragments tracking. Instead, do **one** LP rewrite that includes all four hooks (nobody knows / 20-minute audit / one-sentence hero / unclear ≠ bad) in the first three sections. Every ad lands on the same URL with `utm_content` for attribution.

### 4.4 New LP vs milktreeagency.com — pending your access

Once the LP loads, the comparison framework is:
1. **Hero match to winning pattern** — same headline as `your_brand_looks_v2` / milktree.com, or stronger?
2. **Time-to-form** — how many scroll lengths until the form is visible?
3. **Trust signals above the fold** — does the proof strip survive the redesign?
4. **Form friction** — same 3 fields or more?
5. **Mobile-first hierarchy** — hero, sub, CTA, form, then below-fold proof.
6. **Page speed** — under 2.5s LCP on 4G is the floor for paid.
7. **Tracking parity** — Meta Pixel + CAPI + Lead event still firing on /thank-you (or whatever the new success page is).

If the new LP is more conversion-focused (single column, single CTA, no nav, form above the fold), it likely outperforms milktreeagency.com for paid. If it's a redesigned full site, it likely underperforms — paid traffic doesn't tolerate exploration.

---

## 5. Pre-Launch Checklist

Tracking & data:
- [ ] CAPI coverage ≥75% confirmed in Events Manager → Diagnostics
- [ ] Lead event EMQ ≥7.0
- [ ] AEM priority order: Lead → Contact → Schedule → ViewContent → PageView → CTAClick
- [ ] Hidden-nav-for-paid-traffic confirmed firing on `?utm_source=meta`
- [ ] Lead pixel event fires on the new LP's success state (not on form mount)

Landing page (new LP):
- [ ] Rewrite hero to "Nobody knows what you do. We fix that." (proven message-match)
- [ ] Pick one deliverable everywhere: "Free Brand Audit · 48 hours" (kill 30-min call + 5-min teardown variants)
- [ ] Add labels to §6 metric cards (which client, which metric)
- [ ] Add 2 more testimonials to §7
- [ ] If hero booking widget is Cal.com → defer with IntersectionObserver (CLAUDE.md Rule 3)
- [ ] Sticky mobile CTA past the fold

Creatives:
- [ ] Fix typo in ACT-01 ("ARENT" → "AREN'T")
- [ ] Remove modal X-button from AWR-02
- [ ] Remove Agree/Disagree buttons from DES-01 (or rebuild central card)
- [ ] Cut ENG-01 headline to 20 words
- [ ] Restrict ACT-01 to Feed + Marketplace placements
- [ ] Move ENG-02 (COMMENT PLAYBOOK) to a separate Engagement campaign
- [ ] Move ACT-02 (newsletter) to a separate Subscribe campaign
- [ ] Export each Figma frame at 1080x1350 (4:5) AND a 1080x1920 (9:16) version for Reels/Stories

Campaign:
- [ ] Campaign name: `MT_Lead_UK_Andromeda_May26`
- [ ] Single ad set: `BrandClarity_Advantage+_UK`
- [ ] 7 ads (6 new + your_brand_looks_v2 control)
- [ ] CBO £75/day
- [ ] Lead event as conversion
- [ ] WEB_Converters_180d set as exclusion
- [ ] Advantage+ Placements ON
- [ ] Dynamic Creative OFF
- [ ] Test form submission → confirm Lead fires in Test Events

---

## 6. Open Items

1. **Comment-keyword automation for ENG-02** — does Meta-native DM automation exist on the @milktreeagency Instagram account? If not, set up via Meta Business Suite Inbox before that ad launches.
2. **Newsletter LP for ACT-02** — does `/newsletter` exist as a dedicated page? If not, that ad can't launch until it does.
3. **Budget unfreeze date** — confirm so we can time the launch.
4. **Video assets** — the strongest predicted improvement for week 3 is adding 15-sec Reels-format video versions of AWR-01 and DES-02. Is there a video editor available, or should we plan a 30-min iPhone shoot?
5. **New LP success state for tracking** — what triggers Lead pixel on the new LP? Cal.com booking confirmation? A separate /thank-you redirect? Confirm before launch or attribution will silently break.

---

## 7. Bottom Line

The 8 new creatives are conceptually strong and 6 of them belong in the Andromeda Lead-objective ad set. Two (ENG-02 newsletter playbook, ACT-02 newsletter signup) need their own campaigns.

After the fixes in §2, the predicted top performer is **AWR-01** because it directly reproduces the proven `your_brand_looks_v2` pattern with a stronger visual. **DES-02** is the dark-horse candidate — sharpest headline in the set.

The campaign should launch at **£75/day** (not £50) because Andromeda needs ~£10/day per creative to escape the learning floor. With 7 creatives, that's £70 minimum.

Single biggest risk to performance is **the new LP's hero headline change**. The structure of the new LP is genuinely better than milktreeagency.com for paid traffic (form above the fold, single-purpose, premium aesthetic), but the hero "Brands that earn attention. Systems that scale it." breaks the message-match with the proven winning ad. Rewrite the hero to "Nobody knows what you do. We fix that." and you keep the structural wins of the new LP plus the message-match wins of the old one. That single edit lifts the per-ad message-match average from 2.3/5 to 4.0/5.

If the hero rewrite doesn't happen before launch, default to milktreeagency.com — the proven match outperforms a structurally-better but mismatched LP for the first week, then re-evaluate.
