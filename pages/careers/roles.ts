/**
 * Roles available at Milktree.
 *
 * `id` is also the value submitted as the `role` field in Formspree, so keep
 * these strings stable once campaigns/automations are wired up.
 */
export interface Role {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
}

export const roles: Role[] = [
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    blurb: 'Identity systems, print, and brand applications that look inevitable in hindsight.',
    tags: ['Brand Identity', 'Print', 'Visual Systems'],
  },
  {
    id: 'website-designer',
    title: 'UI/UX Designer',
    blurb: 'Figma-first, conversion-aware. You design for screens people actually click through.',
    tags: ['Figma', 'UX', 'Conversion'],
  },
  {
    id: 'website-developer',
    title: 'Website Developer',
    blurb: 'Webflow, Framer, Vite. Pixel-perfect builds that hit Lighthouse 95+.',
    tags: ['Webflow', 'Framer', 'Vite'],
  },
  {
    id: 'full-stack-developer',
    title: 'Full-Stack Developer',
    blurb: 'TypeScript, React, edge/serverless. You own the stack from form input to inbox.',
    tags: ['TypeScript', 'React', 'Serverless'],
  },
  {
    id: 'ppc-specialist',
    title: 'PPC Specialist',
    blurb: 'Meta and Google Ads with full-funnel measurement. CAPI, GA4, Looker. You live there.',
    tags: ['Meta Ads', 'Google Ads', 'Analytics'],
  },
  {
    id: 'ai-growth-strategist',
    title: 'AI Growth Strategist',
    blurb: 'You build strategy, content, and campaigns using AI as your primary toolset. Automation, copy, creative and funnel thinking shipped faster because of how you work.',
    tags: ['AI Tools', 'Content Strategy', 'Growth'],
  },
];

export const roleTitleById = (id: string): string =>
  roles.find((r) => r.id === id)?.title ?? '';
