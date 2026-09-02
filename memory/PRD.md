# Suvi Interior — Website PRD

## Original problem statement
Build a complete, production-quality, premium editorial website for **SUVI INTERIOR** (interior design + furniture manufacturing studio, Nashik, Maharashtra). Must feel like a top-tier international architecture/interior studio — not a generic template. Pages: Home, About, Services, Projects (+ detail), Gallery, Contact, legal. WhatsApp + click-to-call as major conversion channels. Strong local SEO. Strict **no fake information** rule: no invented testimonials, reviews, founders, stats, hours, email, socials. Content must be separated from design (editable config).

## User choices (session 1)
- WhatsApp uses primary phone (+91 97020 39381 → wa.me/919702039381).
- Form enquiries: save to MongoDB (default). Google reviews: hidden placeholder. Imagery: curated stock + generated representative imagery (labelled). Founder/testimonials/hours/email/social: editable placeholders (hidden until provided).

## Architecture
- **Frontend**: React 19 (CRA/craco), Tailwind, framer-motion (reveals, masked line reveals, parallax, page transitions), Lenis smooth scroll, react-router v7. Fonts: Bodoni Moda (display) + Hanken Grotesk (sans). Palette: ivory #F4F1EA, charcoal #1C1A17, taupe #8A8078, walnut #5A3E2B, night #161412.
- **Content layer** (`/app/frontend/src/content/`): `site.js` (business info, phone, WhatsApp, email/social/hours/googleReviews placeholders, nav, project types), `services.js`, `projects.js` (placeholder archive, `isPlaceholder: true`), `gallery.js`, `testimonials.js` (empty → section hidden), `about.js` (founder null → hidden), `images.js` (all imagery; swap here), `process.js`.
- **Backend**: FastAPI + Motor. `GET /api/health`, `GET /api/enquiries/project-types`, `POST /api/enquiries` (public, validated), `GET /api/enquiries` (requires `X-Admin-Key` from backend `.env`). Pydantic `BaseDocument` with `PyObjectId`.
- **SEO**: per-page title/description/canonical/OG via `Seo.jsx`; JSON-LD LocalBusiness (site-wide) + BreadcrumbList; `public/robots.txt`, `public/sitemap.xml` (domain currently the preview URL — update on custom domain).

## User personas
1. Homeowner seeking complete interiors. 2. Modular kitchen buyer. 3. Custom furniture / TV unit buyer. 4. Google searcher ("interior designer Nashik"). 5. Mobile user wanting to call/WhatsApp fast. 6. Premium client comparing studios.

## Core requirements (static)
Premium editorial design; mobile-first; restrained motion + reduced-motion support; WhatsApp/call everywhere; enquiry form with success state; content editable without redesign; no fabricated facts; local SEO.

## Implemented (2026-06 — session 1)
- All pages: Home (hero w/ masked reveal + parallax + mouse tilt, marquee, intro, services list w/ hover crossfade, editorial featured projects, philosophy, 5-step process, materials close-ups, studio/map, dark CTA), About, Services (anchored sections), Projects (filters + editorial grid), Project Detail (lightbox, next project, WhatsApp prefill), Gallery (strip + filters + masonry + lightbox w/ keyboard & swipe), Contact (form → MongoDB, validation, success state, map), Privacy, Terms, 404.
- Header (transparent → solid), full-screen mobile menu, dark footer with giant wordmark, floating WhatsApp (desktop) + sticky Call/WhatsApp bar (mobile), session preloader.
- Backend enquiries API with admin-key listing. Testing agent iteration 1: 100% backend + frontend pass.

## Backlog / next tasks
- **P0**: Replace representative imagery with real Suvi Interior project photos (`content/images.js`, `projects.js`, `gallery.js`); confirm service copy; add real project names/years.
- **P1**: Email/WhatsApp notification on new enquiry (needs receiving email — Resend); founder/team story; verified Google rating + Business link (`site.googleReviews`); business hours; email + social links; update sitemap/robots domain on launch.
- **P2**: Rate limiting/honeypot on `POST /api/enquiries`; simple admin view for enquiries; testimonials once approved; blog/journal.
