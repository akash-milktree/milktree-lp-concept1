# Milktree LP — Critical Rules & Lessons Learned

> This file is loaded automatically by Claude Code at the start of every session.
> It documents hard-won lessons from production debugging. Follow these rules on this project and all future projects.

---

## 🔴 RULE 1: Never use JS animation libraries for infinite loops on large DOM elements

**What broke:** Framer Motion `animate={{ x: ['-9088px', '0px'] }}` with `repeat: Infinity` on the ~9000px-wide hero carousel blocked Chrome's main JS thread. Page became unresponsive within seconds in production.

**Fix:** Use CSS `@keyframes` + `will-change: transform` for ALL infinite/looping animations. CSS runs on the GPU compositor thread — zero JS cost.

```css
@keyframes marquee-scroll {
  from { transform: translateX(0%); }
  to   { transform: translateX(-50%); }
}
.track {
  animation: marquee-scroll 40s linear infinite;
  will-change: transform;
}
```

**Rule:** Any element wider/taller than ~500px that animates infinitely → CSS only, never a JS animation library.

---

## 🔴 RULE 2: Always unregister old service workers when migrating platforms

**What broke:** The previous milktreeagency.com was on Framer. Framer registers a service worker. When the domain pointed to the new Vite/React app, returning visitors had a zombie SW intercepting every request — infinite loading loop.

**Fix:** Add to `<head>` of the new site immediately after migration. Keep for ≥30 days:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(regs => regs.forEach(r => r.unregister()));
  }
</script>
```

Platforms that register SWs: **Framer, Next.js, Gatsby, any PWA.**
Always test in a Chrome profile that previously visited the old domain — not just incognito.

---

## 🟠 RULE 3: Defer ALL third-party iframe embeds with IntersectionObserver

**What broke:** Cal.com `embed.js` is a full Next.js app (~400KB). Loading it on page mount alongside the site's own JS caused the browser to crash on mobile and low-end hardware.

**Fix:** Inject embed scripts only when the section is near the viewport. Also do an immediate check at mount (critical for React.lazy components that mount while already in view):

```tsx
useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;
  const init = () => { /* inject script */ };

  // Already in/near viewport at mount time (lazy-loaded component)
  if (section.getBoundingClientRect().top < window.innerHeight + 300) {
    init(); return;
  }
  // Otherwise defer until scrolled into range
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect(); init();
  }, { rootMargin: '200px' });
  io.observe(section);
  return () => io.disconnect();
}, []);
```

**Rule:** No iframe embed (Cal.com, Calendly, HubSpot, Intercom, Drift, etc.) ever loads at page start. No exceptions.

---

## 🟡 RULE 4: Keep animation wrapper components to ≤1 hook

**What broke:** The `<Reveal>` component had 5 hooks (useAnimation, useInView, useState, 2× useEffect). With 40+ instances = 200+ hooks initialising simultaneously on first render + 200+ IntersectionObservers. Caused severe render blocking.

**Fix:** Single `whileInView` motion.div — Framer handles intersection internally:

```tsx
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-75px' }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);
```

---

## 🟡 RULE 5: Always code-split below-fold sections with React.lazy()

**What broke:** Single 349KB JS bundle — browser parsed the entire app before rendering anything. All heavy sections initialised at once.

**Fix:**

```tsx
const FinalCTA = lazy(() => import('./sections/FinalCTA').then(m => ({ default: m.FinalCTA })));

<Suspense fallback={null}>
  <Problem /><WhatWeDo /><FinalCTA />
</Suspense>
```

**Target:** Main bundle under 150KB gzipped. Each lazy section chunk under 10KB.

---

## 🟡 RULE 6: Add SPA routing fallback before deploying

Without these, direct URL navigation and hard refreshes return 404:

- **Netlify:** `public/_redirects` → `/* /index.html 200`
- **Vercel:** `vercel.json` → `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}`

---

## Stack Notes for This Project

- **Vite + React + Framer Motion + TypeScript** — keep as-is, the crashes were usage pattern issues, not stack issues.
- **Framer Motion** is fine for: hover states, tap feedback, one-shot entrance animations (`whileInView` with `once: true`). Never for infinite loops on large elements.
- **Cal.com embed** uses namespace pattern: `Cal("init", "namespace", ...)` + `Cal.ns["namespace"]("inline", ...)`. Current link: `milktree-agency/free-brand-digital-presence-audit-30-minutes`.
- **Analytics:** GA4 `G-9GHX9JVN9S`, Microsoft Clarity `n9qw79cpo8`. Both installed in `index.html`.

---

## Pre-Launch Checklist (run before every deploy)

- [ ] No JS `repeat: Infinity` on elements > 500px → use CSS keyframes
- [ ] SW unregistration script in `<head>` if migrating from another platform
- [ ] All iframe embeds (cal.com, forms, chat) deferred via IntersectionObserver
- [ ] Animation wrapper components use ≤1 hook
- [ ] `React.lazy()` on all below-fold sections
- [ ] SPA routing fallback file present (`_redirects` or `vercel.json`)
- [ ] `vite build` output: main chunk < 150KB gzipped
- [ ] Test in a Chrome profile that visited the previous version of the domain
- [ ] Test on a real Android mid-range device or Chrome DevTools CPU 4× slowdown

---

## For Future Projects (not just this one)

These rules apply universally to any Vite/React/Next.js/Astro marketing site:

1. Infinite CSS animations → GPU thread (CSS keyframes), never JS
2. Platform migrations → SW unregistration for 30 days
3. Third-party embeds → IntersectionObserver deferred loading
4. Reusable animation components → ≤1 hook, prefer Framer's built-in whileInView
5. All sections → code-split with React.lazy
6. Consider **Astro** for future purely-marketing sites — ships zero JS by default
