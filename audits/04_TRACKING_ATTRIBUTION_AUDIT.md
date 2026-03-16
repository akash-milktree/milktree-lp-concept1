# Tracking and Attribution Audit

**Date:** 2026-03-13
**Pixel ID:** 993503079134900
**GA4 ID:** G-9GHX9JVN9S
**Clarity ID:** n9qw79cpo8

---

## Executive Summary

The tracking implementation is technically sophisticated (dual Pixel + CAPI with deduplication), but the conversion event architecture is causing the campaign to fail. The campaign optimises for "Lead" (fires on thank-you page) while the earlier successful campaign optimised for "Contact" (fires on form Step 1). Additionally, there's quadruple event firing across the funnel that may confuse Meta's attribution.

---

## 1. Meta Pixel Implementation

### 1.1 Pixel Installation (index.html)

```
Pixel ID: 993503079134900
Events: PageView (on every page load)
```

- PageView fires correctly on page load via standard fbq('track', 'PageView')
- Pixel is in the `<head>` section (correct placement)
- No consent management / cookie banner integration detected

**Assessment:** Base installation is correct. Missing GDPR consent gating for EU/UK traffic.

### 1.2 Client-Side Events

| Event | Trigger | Location | File |
|-------|---------|----------|------|
| PageView | Every page load | index.html | index.html |
| Contact | Form Step 1 complete (name + email) | FinalCTA section | sections/FinalCTA.tsx |
| Contact | Hero CTA click | Hero section | sections/Hero.tsx |
| Lead | Thank-you page load | /thank-you route | pages/ThankYouPage.tsx |
| Schedule | Thank-you page load | /thank-you route | pages/ThankYouPage.tsx |

### 1.3 Event Flow Issues

**Issue 1: Contact fires on Hero CTA click (no form data)** [MEDIUM]
The Hero CTA button calls `trackContact({ eventSource: 'Hero CTA' })` on click, before any form interaction. This inflates the Contact event count with clicks that never reach the form.

**Issue 2: Lead and Schedule fire simultaneously on thank-you page** [HIGH]
Both `trackLead` and `trackSchedule` fire on ThankYouPage mount. Two conversion events for the same action is redundant and may confuse attribution.

**Issue 3: Contact fires again on form Step 1 with email** [MEDIUM]
The form Step 1 fires `trackContact({ eventSource: 'Audit Form Step 1', userData: { email } })`. Combined with the Hero CTA Contact event, a single user journey could fire Contact twice.

---

## 2. Conversions API (CAPI) Implementation

### 2.1 Server-Side Setup

- **Endpoint:** `/api/meta-capi` (Vercel serverless function)
- **File:** `api/meta-capi.ts`
- **Token:** Uses `META_CAPI_TOKEN` environment variable
- **Test Event Code:** None set (correct for production)

### 2.2 CAPI Event Flow

```
Client fires fbq() → also calls /api/meta-capi → server sends to Meta Graph API
```

- Uses `event_id` for deduplication between Pixel and CAPI
- Sends hashed email when available (for Contact event on Step 1)
- Sends `event_source_url` and `action_source: 'website'`

### 2.3 CAPI Assessment

| Check | Status |
|-------|--------|
| Dual Pixel + CAPI | YES |
| Event deduplication (event_id) | YES |
| Hashed user data (email) | YES (on Contact Step 1) |
| Server-side token secure | YES (env variable) |
| Test event code removed | YES |

**Assessment:** CAPI implementation is technically sound. The deduplication via `event_id` should prevent double-counting between Pixel and CAPI.

---

## 3. Campaign Conversion Event Analysis

### 3.1 Current Campaign: Optimises for "Lead"

The Lead event fires on ThankYouPage mount:
```
ThankYouPage loads → trackLead() fires → Pixel + CAPI send Lead event
```

For Lead to fire, the user must:
1. Scroll to bottom of page (10 sections)
2. Complete Step 1 (name, email)
3. Complete Step 2 (services, budget, goal)
4. Submit form (Formspree)
5. Get redirected to /thank-you
6. Page loads → Lead fires

**Result:** 0 Lead events in 7 days. Algorithm has zero signal.

### 3.2 Previous Campaign: Optimised for "Contact"

The Contact event fires on form Step 1 completion:
```
User enters name + email → clicks Continue → trackContact() fires
```

For Contact to fire, the user must:
1. Scroll to bottom of page
2. Enter name and email
3. Click Continue

**Result:** 23 contacts in ~7 days at GBP 3.32 each. Algorithm had signal to learn.

### 3.3 The Gap [CRITICAL]

Between Contact (Step 1) and Lead (thank-you page), users must also:
- Select services (required)
- Optionally select budget
- Optionally write their goal
- Submit the form
- Wait for Formspree processing
- Get redirected

Every additional step loses 30-50% of users. If 23 people completed Step 1 (Contact), perhaps only 5-10 would complete Step 2 and submit. Then the redirect to /thank-you must succeed. The funnel math makes it nearly impossible to get 50 Lead events/week at GBP 15/day.

---

## 4. GA4 Tracking

### 4.1 Events Configured

| Event | Trigger | Parameters |
|-------|---------|------------|
| cta_click | Hero CTA button click | event_category: Hero, event_label: Book Your Free Brand Audit |
| form_start | Form Step 1 complete | event_category: Audit Form, event_label: Step 1 Complete |
| generate_lead | Form Step 2 submit | event_category: Audit Form, event_label: services list, value: 1, currency: GBP |

### 4.2 GA4 Assessment

- Events are well-named and follow consistent patterns
- `generate_lead` is a GA4 recommended event (good for reporting)
- Missing: scroll depth tracking, time on page, section visibility
- Missing: GA4 conversion marking (need to mark generate_lead as conversion in GA4 admin)

---

## 5. UTM Parameters

### 5.1 Current Setup

```
utm_source={{campaign.name}}&utm_medium={{placement}}&utm_campaign={{adset.name}}&utm_content={{ad.name}}
```

### 5.2 UTM Assessment

| Parameter | Value | Assessment |
|-----------|-------|------------|
| utm_source | {{campaign.name}} | WRONG - should be "meta" or "facebook" |
| utm_medium | {{placement}} | WRONG - should be "paid_social" or "cpc" |
| utm_campaign | {{adset.name}} | OK but non-standard (usually campaign name) |
| utm_content | {{ad.name}} | OK for ad-level differentiation |
| utm_term | Not set | Missing |

### 5.3 UTM Issues [HIGH]

**utm_source should be the platform name** (e.g., "meta", "facebook"), not the campaign name. Current setup means GA4 will show the campaign name in the Source report, making it impossible to segment by platform.

**utm_medium should be the marketing channel** (e.g., "paid_social", "cpc"), not the placement. Current setup means placement data (feed, stories, reels) appears in the Medium report instead of channel data.

**Recommended UTM string:**
```
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
```

---

## 6. Offline Events

Offline events are enabled with auto-matching via the Milktree Pixel dataset. This allows Meta to match offline conversions (e.g., from CRM data uploads) back to ad impressions.

**Assessment:** Good to have enabled, but only useful if actually uploading offline conversion data. Currently appears unused.

---

## 7. Event Manager Health

### 7.1 What to Verify in Events Manager

- [ ] Lead event showing 0 events (confirms tracking issue)
- [ ] Contact event showing events (confirms it still fires)
- [ ] Event match quality score (should be > 6.0 with hashed email)
- [ ] CAPI events showing as "Server" source
- [ ] No duplicate events (deduplication working)

---

## 8. Priority Fixes

| # | Severity | Fix | Expected Impact |
|---|----------|-----|-----------------|
| 1 | CRITICAL | Switch campaign to optimise for Contact event | Algorithm gets conversion signal |
| 2 | HIGH | Fix UTM parameters to standard format | Accurate GA4 attribution |
| 3 | HIGH | Remove Contact event from Hero CTA click | Accurate event counts |
| 4 | HIGH | Remove redundant Schedule event from thank-you page | Cleaner attribution |
| 5 | MEDIUM | Add GDPR consent gating for UK/EU | Compliance |
| 6 | MEDIUM | Mark generate_lead as conversion in GA4 admin | Better GA4 reporting |
| 7 | LOW | Add scroll depth and section visibility tracking | Better funnel analysis |
