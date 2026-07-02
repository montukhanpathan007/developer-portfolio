# Portfolio Website — Design Spec

**Date:** 2026-07-02
**Owner:** Muntjirkhan Pathan (montukhanpathan007@gmail.com)
**Status:** Approved (spec supplied in full by owner; this doc records it plus design decisions)

## Goal

Recruiter-focused portfolio for a Backend Developer (Magento 2 B2B / Laravel / PHP, 2.5+ yrs, Ahmedabad, India). Single job: prove backend competence fast, route recruiters to resume / projects / contact.

## Hard constraints (from owner)

- Use only resume information. No invented companies, projects, achievements, certifications, or metrics.
- Missing links (live demo, GitHub repos, LinkedIn URL) → clear placeholders, never fabricated URLs.
- Concise recruiter-friendly copy focused on backend engineering + Magento 2 B2B.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide icons · shadcn/ui-style components · next-themes (dark/light) · EmailJS (contact form, env-gated with mailto fallback) · Vercel deployment target.

## Visual system

- **Light:** paper `#FAFAF9`, ink `#1C1917`, muted `#57534E`, line `#E7E5E4`, accent `#0F766E` (teal-700)
- **Dark:** bg `#0C0A09`, surface `#1C1917`, text `#E7E5E4`, muted `#A8A29E`, line `#292524`, accent `#2DD4BF`
- **Type:** Bricolage Grotesque (display) · Geist Sans (body) · JetBrains Mono (utility: eyebrows, tags, metrics)
- **Signature:** hero right panel = animated GraphQL query + JSON response introducing the developer as an API payload (his actual specialty). Bare bordered code block — no fake terminal chrome.
- **Structure device:** section eyebrows styled as HTTP routes (`GET /about`, `GET /projects`, `POST /contact`). Contact is the only POST — true information.
- **Motion:** one orchestrated hero load, scroll-triggered fade-ups (once), animated counters, hover micro-lifts. `prefers-reduced-motion` respected.

## Sections (order)

1. **Hero** — name, headline "Backend Software Developer specializing in Magento 2, Laravel & PHP", short intro, CTAs (View Projects / Download Resume / Contact Me), socials (GitHub, LinkedIn, Email), GraphQL panel.
2. **About** — professional story from resume summary + B2B specialties list.
3. **Skills** — grouped: Languages / Frameworks / Databases / Backend / Magento Expertise / Tools. Icon + mono chips.
4. **Projects** — 3 cards; Magento B2B featured (larger, impact metrics row: 10+ modules, thousands of monthly users, reduced manual ops, optimized performance); Laravel Admin & API; Spring Boot Movie Booking. Demo/GitHub/Case-study buttons render as disabled placeholders when URL absent.
5. **Experience** — timeline: Cinovic Technologies LLP (Backend Dev, Jun 2023–Present, resume bullets) · Adopt Nettech (Java Intern, Apr–Jun 2023).
6. **Achievements** — animated counters: 2.5+ yrs, 10+ modules, 30+ APIs, 100+ bugs fixed, B2B features (owner-supplied placeholder values).
7. **Blog** — 6 placeholder cards (Magento module dev, GraphQL in M2, Laravel queues, MSI deep dive, ERP integration, PHP performance), marked "coming soon".
8. **Testimonials** — honest empty-state placeholder cards (no fabricated quotes).
9. **Contact** — form (name/email/subject/message) via EmailJS env keys; mailto fallback when unconfigured.
10. **Footer** — socials, resume download, copyright.

## Architecture

- `src/config/site.ts` — single source of all personal data, links, placeholder flags. LinkedIn URL marked TODO.
- `src/components/sections/*` — one component per section.
- `src/components/ui/*` — shadcn-style primitives (button, card, badge, input, textarea, label).
- `src/components/motion/*` — reveal/counter helpers wrapping Framer Motion.
- SEO: metadata API, OpenGraph via `opengraph-image.tsx` (ImageResponse), `sitemap.ts`, `robots.ts`, JSON-LD Person.
- `public/resume.pdf` — placeholder PDF; owner replaces with real file (README notes this).
- `.env.example` — EmailJS keys.

## Performance targets

Lighthouse: Performance 90+, A11y 95+, SEO 100, Best Practices 100. Static-first (single RSC page, client islands only where interactive), next/font, no external requests.

## Testing / verification

`next build` clean · ESLint clean · Playwright visual check of both themes + mobile viewport.
