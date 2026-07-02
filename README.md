# Muntjirkhan Pathan — Portfolio

Recruiter-focused portfolio for a Backend Developer (Magento 2 B2B · Laravel · PHP).
Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lucide icons.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before you deploy — checklist

1. **Resume:** replace `public/resume.pdf` (placeholder) with the real `Muntjirkhan_Pathan_Resume_1Page.pdf`.
2. **LinkedIn URL:** verify the slug in `src/config/site.ts` (`links.linkedin`) matches your public profile.
3. **Site URL:** set `NEXT_PUBLIC_SITE_URL` to your production domain (drives sitemap, robots, Open Graph).
4. **EmailJS:** create a free service + template at [emailjs.com](https://www.emailjs.com) with variables `name`, `email`, `subject`, `message`, then set the three `NEXT_PUBLIC_EMAILJS_*` env vars (see `.env.example`). Until then the contact form opens the visitor's mail client instead.
5. **Project links:** when a GitHub repo, live demo, or case study becomes available, set its `href` in `src/config/site.ts` — placeholder labels swap to real links automatically.

## Content

All content lives in [`src/config/site.ts`](src/config/site.ts) — one file to edit copy, skills,
projects, experience, stats, and blog placeholders. Everything is sourced from the resume;
placeholders are used where links or testimonials don't exist yet (nothing is fabricated).

## Deploy on Vercel

```bash
npx vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
Set the env vars from `.env.example` in the Vercel project settings.

## Structure

```
src/
  app/            layout, page, globals.css, sitemap, robots, OG image
  components/
    sections/     navbar, hero, about, skills, projects, experience,
                  achievements, blog, testimonials, contact, footer
    motion/       Reveal (scroll fade-up), Counter (count-up)
    ui/           button, chip, section-heading, form fields
  config/site.ts  all portfolio content (single source of truth)
  hooks/          useMounted
  lib/            cn() utility
```
