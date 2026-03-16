# Milktree Landing Page CRO Audit

**Date:** 2026-03-13
**URL:** milktreeagency.com
**Traffic Source:** Cold Meta Ads (GBP 20/day)
**Performance:** 1 lead in 7 days (~GBP 140 spent)
**Estimated CPL:** GBP 140 (target should be GBP 15-30 for B2B brand services)

---

## Executive Summary

The page is well-designed and technically solid. The problem is **conversion architecture for cold paid traffic**. The page is structured like a portfolio website, not a landing page. It gives cold visitors too many places to look, too many reasons to leave, and asks them to scroll through 9+ sections before reaching the form.

**Most urgent issues:**
1. No form or direct booking CTA visible above the fold
2. Too many navigation exit points for paid traffic
3. Two-step form creates unnecessary friction for cold audiences
4. Page flow delays the offer until the very bottom

---

## 1. VALUE PROPOSITION CLARITY

### 1.1 Headline not specific enough for cold traffic [CRITICAL]

**Current:** "Your brand should sell for you."

Fails the 5-second test for cold Meta traffic:
- Does not say what Milktree does (brand identity agency)
- Does not say who it's for (B2B business owners/founders)
- Does not promise a specific outcome
- "Sell for you" is vague

**Current subheadline:** "We build brand identities that make you the obvious choice. The right clients come to you, and your team always knows how to represent the business."

Two ideas crammed together, diluting both.

**Recommendation:** Rewrite headline to state the transformation in customer language:
- "Stop losing deals to competitors with weaker offers but stronger brands."
- "Get a brand identity that brings you better clients without chasing them."

Subheadline should address pain and set up CTA:
- "Most businesses lose leads because their brand looks inconsistent, sounds generic, and doesn't build trust fast enough. We fix that in 4 to 6 weeks."

### 1.2 Badge bar doing too much [MEDIUM]

**Current:** "200+ brands built | Trusted across 15+ industries | 250% avg. enquiry increase"

Three proof points before the visitor understands the offer. The "250% avg. enquiry increase" stat is strongest and should be more prominent, not buried in a horizontal ticker.

**Recommendation:** Move "250% avg. enquiry increase" into or near the headline. Reduce badge to one focused proof point.

---

## 2. CTA ANALYSIS

### 2.1 Primary CTA scrolls to the very bottom [CRITICAL]

Hero CTA "Book Your Free Brand Audit" scrolls to `#audit` (FinalCTA section), the absolute last section. On desktop: ~8000-10000px of scrolling. On mobile: 15000px+.

For cold Meta traffic, clicking CTA and experiencing a long scroll feels broken.

**Recommendation:** Either embed a short form (name + email) in the hero, link directly to Cal.com booking, or add a sticky CTA bar.

### 2.2 CTA copy implies commitment [MEDIUM]

"Book" implies calendar commitment, increasing friction for cold traffic. The FinalCTA button says "Get My Free Audit" which is better.

**Recommendation:** Standardise on "Get My Free Brand Audit" across all CTAs.

### 2.3 Secondary CTA competes [LOW]

"View recent work" scrolls to case studies (consideration-stage). Every non-form click is a potential exit.

**Recommendation:** Keep only primary CTA in hero. Make secondary CTA visually much smaller.

### 2.4 No sticky mobile CTA [CRITICAL]

Navbar hides on scroll-down (`if (latest > previous && latest > 150) { setHidden(true); }`). CTA disappears as user scrolls.

**Recommendation:** Add `position: fixed; bottom: 0` bar on mobile with "Get My Free Brand Audit" that appears after 200px scroll. **Single most impactful mobile CRO change.**

---

## 3. FORM FRICTION

### 3.1 Two-step form is too much for cold traffic [CRITICAL]

**Step 1:** Name*, Email*, Website
**Step 2:** Services chips* (min 1), Budget chips, "What to fix?" textarea

For cold traffic that doesn't trust the brand yet, a two-step form with budget questions feels like sales qualification, not a "free audit" request. Budget field signals pricing depends on the answer, creating anxiety.

**Recommendation:** Reduce to single step: Name, Email, Website (optional). Everything else gathered on the call.

### 3.2 Form only at bottom of page [CRITICAL]

FinalCTA is the 10th section (after Hero, Problem, WhatWeDo, CaseStudies, WhyMilktree, Results, Pricing, TrustedBy, FAQ). Most cold visitors bounce before reaching it.

**Recommendation:** Duplicate simplified form in or near hero, or move FinalCTA much earlier (after Problem + WhatWeDo).

---

## 4. TRUST SIGNALS AND SOCIAL PROOF

### 4.1 Testimonials far from form [HIGH]

TrustedBy section appears before FAQ, which is before the form. Best trust signal placement is adjacent to or inside the form.

The FinalCTA does include one proof quote (Chris, Police Mortgages) and "Join 200+ brands" stat, which is good.

**Recommendation:** Add 2-3 testimonial cards/faces directly alongside the form.

### 4.2 Testimonials lack photos and logos [MEDIUM]

All text-only with first names and roles. No headshots, no company logos. Reduces authenticity for cold traffic.

**Recommendation:** Add headshots and/or company logos to featured testimonials. Use full names.

### 4.3 Case study results buried in detail pages [HIGH]

Case study carousel shows only cover images and titles. Actual results (e.g., "257 qualified leads from GBP 840.55 in ad spend" for Flexibuy) only visible on detail pages.

**Recommendation:** Show headline results on case study cards. Example: "Flexibuy Vans - 257 leads at GBP 3.27 each".

---

## 5. MESSAGE MATCH WITH META ADS

### 5.1 No ad-to-page congruence [HIGH]

No dynamic headline matching, UTM-driven personalisation, or ad-referencing language. Cold Meta traffic lands on a generic agency homepage.

**Recommendation:** Match ad headline language in the landing page hero. If ad says "Is your brand holding your business back?" the LP should echo that.

### 5.2 Page serves both organic and paid audiences [HIGH]

Full navigation (Services, Pricing, Reviews, FAQs, Case Studies), plus `/work` links, plus footer links. This is a website, not a focused landing page.

**Recommendation:** Create dedicated `/lp` route with no navbar links and only the audit CTA, or hide navigation via URL parameter for Meta traffic.

---

## 6. NAVIGATION AND EXIT POINTS

### 6.1 Full site navigation on paid traffic page [CRITICAL]

Navbar contains 6 clickable items including "Case Studies" which navigates to `/work` (full exit from landing page).

**Recommendation:** For paid traffic: remove all navbar links except CTA button, or use dedicated LP route.

### 6.2 Case study cards link away [HIGH]

Each case study card is a `<Link to="/work/${study.slug}">` navigating away. Visitors who click may not return.

**Recommendation:** Make cards non-clickable display cards, or use inline expand/modal.

---

## 7. PAGE STRUCTURE

### 7.1 Page too long for cold paid traffic [CRITICAL]

10 sections plus footer. Cold Meta traffic average session is 15-30 seconds. Must scroll 10+ viewport heights to reach form.

**Recommended flow for paid traffic:**
1. Hero (with embedded form or 1-click CTA)
2. Problem (empathy)
3. How It Works (4-step process)
4. Social Proof (3 condensed testimonials with results)
5. Form/CTA (full form with risk reversal)
6. FAQ (3-4 questions only)

### 7.2 Process steps data exists but not rendered [HIGH]

`processSteps` in `data/content.ts` (Audit and Diagnose, Positioning and Message, Visual Identity, Guidelines and Rollout) is not used on the homepage. `HowItWorks.tsx` renders case studies instead.

**Recommendation:** Create "How it works" section using existing processSteps data.

---

## 8. PRICING TRANSPARENCY

### 8.1 No prices shown [HIGH]

Pricing section shows two tiers with deliverables but zero prices. Only price reference is FAQ #8: "Brand Build projects typically start from around GBP 1,000."

**Recommendation:** Add starting-from prices to Pricing cards. "From GBP 1,500" for Brand Build. Add footnote: "Pricing depends on scope. We give you a clear quote after your free audit."

---

## 9. ABOVE-THE-FOLD ASSESSMENT

### 9.1 Above-fold prioritises aesthetics over conversion [CRITICAL]

First load shows: navbar, badge bar, headline, subheadline, 2 CTAs, showcase carousel (16 images tripled to 48), logo marquee (13 logos tripled to 39).

No form above the fold. No specific outcome promised. No audience addressed. Showcase carousel takes significant space with images cold traffic has no context for.

**Recommendation:** Replace showcase carousel with inline lead capture form (name + email), or a before/after transformation image showing specific results.

---

## 10. LOADING PERFORMANCE

### 10.1 Code-splitting well implemented [POSITIVE]

All below-fold sections use `React.lazy()` per CLAUDE.md Rule 5.

### 10.2 Hero loads 48 showcase + 39 logo images [MEDIUM]

Heavy for mobile. First 6 eager, rest lazy, but still a lot of DOM.

**Recommendation:** Reduce carousel items or defer entirely for paid traffic.

---

## Priority Action List

| # | Severity | Issue | Expected Impact |
|---|----------|-------|-----------------|
| 1 | CRITICAL | Add inline form or 1-click booking CTA above the fold | +200-400% conversion |
| 2 | CRITICAL | Add sticky mobile CTA bar (always visible) | +50-150% mobile conversion |
| 3 | CRITICAL | Reduce form to single step (name + email only) | +30-80% form completion |
| 4 | CRITICAL | Shorten page for paid traffic (5-6 sections) | +20-50% engagement |
| 5 | CRITICAL | Remove/hide navigation links for paid traffic | -30-50% exit rate |
| 6 | HIGH | Rewrite headline for specificity and audience match | +15-30% engagement |
| 7 | HIGH | Add "How it works" section using processSteps data | +10-20% trust/conversion |
| 8 | HIGH | Remove case study links that navigate away | -15-25% exit rate |
| 9 | HIGH | Show indicative prices on Pricing cards | +10-20% qualified leads |
| 10 | HIGH | Add testimonial photos/logos for credibility | +5-15% trust |
| 11 | HIGH | Surface case study results on main page cards | +5-10% social proof |
| 12 | MEDIUM | Replace 12-service WhatWeDo grid with 5 focused services | Improved clarity |
| 13 | MEDIUM | Standardise CTA copy to "Get My Free Brand Audit" | Reduced friction |
| 14 | MEDIUM | Reduce hero carousel images for mobile | Faster mobile load |

---

## Quick Wins (1-2 hours)

1. **Single-step form:** Remove step 2. Name + Email + Website (optional) only.
2. **Sticky mobile CTA:** Fixed bottom bar with "Get My Free Brand Audit" after 200px scroll.
3. **Render processSteps:** Simple "How it works" section using existing content.ts data.
4. **Remove case study navigation:** Change `<Link>` to non-navigating `<div>` on homepage cards.
5. **Add prices to Pricing cards:** "From GBP 1,500" / "From GBP 750/mo".

---

## Structural Recommendation

For Meta ads, create dedicated lightweight landing page route (`/lp/brand-audit`):
- NO navbar navigation links (only logo + CTA button)
- Hero: headline + subheadline + inline form (name, email, website)
- Below form: 3 trust signals (stats, testimonial, client logos)
- "How it works" 4-step process
- 3 case study result cards (non-clickable, showing headline results)
- Full form again with FAQ accordion below
- Total: 3-4 viewport heights maximum
- NO links navigating away from the page
