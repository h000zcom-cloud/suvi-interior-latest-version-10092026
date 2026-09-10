# Suvi Interior — Website PRD

## Original problem statement
Build a complete, production-quality, premium editorial website for **SUVI INTERIOR** (interior design + furniture manufacturing studio, Nashik, Maharashtra). Must feel like a top-tier international architecture/interior studio — not a generic template. Pages: Home, About, Services, Projects (+ detail), Gallery, Contact, legal. WhatsApp + click-to-call as major conversion channels. Strong local SEO. Strict **no fake information** rule: no invented testimonials, reviews, founders, stats, hours, email, socials. Content must be separated from design (editable config).

## User choices (session 1)
- WhatsApp uses primary phone (+91 97020 39381 → wa.me/919702039381).
- Form enquiries: save to MongoDB (default). Google reviews: hidden placeholder. Imagery: curated stock + generated representative imagery (labelled). Founder/testimonials/hours/email/social: editable placeholders (hidden until provided).

## Latest user requirements (2026-09-10 — supersede earlier brochure gating)
- User reported the name/phone brochure pop-up failing with a studio-server error and explicitly requested **direct Download PDF, without a pop-up or form**.
- User reported homepage content missing, especially the large Intro heading above the studio description, and requested a broader visibility fix.
- User authorized autonomous repairs: “Do it from your side. Whatever is best.” Preserve the existing luxury visual identity and oxblood #58130E.

## Architecture
- **Frontend**: React 19 (CRA/craco), Tailwind, framer-motion (reveals, masked line reveals, parallax, page transitions), Lenis smooth scroll, react-router v7. Fonts (session 2 luxury redesign): Cormorant Garamond (display, mixed-case light) + Plus Jakarta Sans (body). Palette: ivory #F8F6F0, night/charcoal #141210, taupe #766C63, brass #C5A880, bronze accent #8A6A42 (tailwind key `burgundy`/`bronze`), line #DCD5C8. Wordmark = `Wordmark.jsx` (SUVI ◆ INTERIOR, tracking 0.32em).
- **Content layer** (`/app/frontend/src/content/`): `site.js` (business info, phone, WhatsApp, email/social/hours/googleReviews placeholders, nav, project types), `services.js`, `projects.js` (placeholder archive, `isPlaceholder: true`), `gallery.js`, `testimonials.js` (empty → section hidden), `about.js` (founder null → hidden), `images.js` (all imagery; swap here), `process.js`.
- **Backend**: FastAPI + Motor. `GET /api/health`, `GET /api/enquiries/project-types`, `POST /api/enquiries` (public, validated), `GET /api/enquiries` (requires `X-Admin-Key` from backend `.env`). Pydantic `BaseDocument` with `PyObjectId`.
- **Current brochure delivery**: native same-origin `<a download>` via `components/brochure/DownloadButton.jsx` → `frontend/public/brochures/Suvi-Interior-Brochure.pdf` (7-page A4, ~3.15 MB). No lead gate, localStorage requirement, API call, DB call, new tab or pop-up. Existing `GET /api/brochure.pdf` retained with attachment disposition. Regenerate the public asset with `python backend/export_brochure.py` after changing brochure content/images; keep the generated file with the website. This is a real brochure, not a mocked download.
- **SEO**: per-page title/description/canonical/OG via `Seo.jsx`; JSON-LD LocalBusiness (site-wide) + BreadcrumbList; `public/robots.txt`, `public/sitemap.xml` (domain currently the preview URL — update on custom domain).

## User personas
1. Homeowner seeking complete interiors. 2. Modular kitchen buyer. 3. Custom furniture / TV unit buyer. 4. Google searcher ("interior designer Nashik"). 5. Mobile user wanting to call/WhatsApp fast. 6. Premium client comparing studios.

## Core requirements (static)
Premium editorial design; mobile-first; restrained motion + reduced-motion support; WhatsApp/call everywhere; enquiry form with success state; content editable without redesign; no fabricated facts; local SEO.

## Implemented (2026-06 — session 1)
- All pages: Home (hero w/ masked reveal + parallax + mouse tilt, marquee, intro, services list w/ hover crossfade, editorial featured projects, philosophy, 5-step process, materials close-ups, studio/map, dark CTA), About, Services (anchored sections), Projects (filters + editorial grid), Project Detail (lightbox, next project, WhatsApp prefill), Gallery (strip + filters + masonry + lightbox w/ keyboard & swipe), Contact (form → MongoDB, validation, success state, map), Privacy, Terms, 404.
- Header (transparent → solid), full-screen mobile menu, dark footer with giant wordmark, floating WhatsApp (desktop) + sticky Call/WhatsApp bar (mobile), session preloader.
- Backend enquiries API with admin-key listing. Testing agent iteration 1: 100% backend + frontend pass.

## Implemented (2026-06 — session 2: luxury redesign + brochure)
- Global typography/palette overhaul (index.css, tailwind.config.js, index.html fonts). Headings now Cormorant Garamond mixed-case with italic brass accents; body Plus Jakarta Sans; film-grain overlay; hairline `frame-inset` on heroes.
- Redesigned: Header (glass on scroll, wordmark + descriptor, ghost CTA, Brochure nav), MobileMenu (large serif nav, gold CTA, Call/WhatsApp/Brochure tiles), Footer (CTA row, serif phone, italic giant wordmark), Preloader, Hero (new copy, gold CTA + brochure link, facets row on tall screens), marquee `Strip.jsx`, CtaBand gold button, mobile sticky bar (Call / WhatsApp[brass] / Brochure, glass-dark).
- NEW `/brochure` page (`pages/Brochure.jsx`): cover, sticky action bar (Download PDF + Print), studio note, 6 capabilities, process, materials, selected work, studio/map, download band, CTA. Print CSS in index.css.
- NEW backend `GET /api/brochure.pdf` (`backend/brochure.py` + `brochure_content.py`, reportlab, bundled TTFs in `backend/fonts/`, image cache `backend/cache/`, in-memory PDF cache): 7-page A4 brochure (cover, studio, 2× capabilities, process [dark], materials, studio contact with WhatsApp QR). `SITE_URL` env in backend/.env prints website on last page. ~3 MB.
- Testing agent iteration 2: 100% pass (backend 15 tests, frontend desktop + mobile, no console errors, no overflow).

## Implemented (2026-06 — session 3: brand colour, preloader, hero, lead gate)
- Brand colour **#58130E (oxblood)** added to Tailwind (`oxblood`, `oxblood-light #7A2A22`, `oxblood-soft`, `oxblood-deep`); `burgundy` alias remapped to it so all section numerals/hover states use brand. New `.btn-brand`. Philosophy section is now a full-bleed oxblood band. Brass stays as the metallic secondary.
- NEW cinematic preloader (`Preloader.jsx`): letter-by-letter wordmark reveal, brass progress hairline + 0–100 italic counter, looping brass shimmer sweep (mask-image), letters exit upward, oxblood wipe + clip-path curtain exit. `introDelay` = 2.75s.
- Wordmark `roll` prop: letter-roll hover animation on header + footer logos. Footer giant italic wordmark is an infinite slow marquee loop.
- Home hero is now a 3-slide editorial slideshow (living / kitchen / bedroom) with crossfade + Ken Burns, brass progress bars, caption + index, oxblood primary CTA. Home section spacing tightened.
- Brochure lead capture (`components/brochure/LeadGate.jsx`): every Download PDF button opens a modal (name + WhatsApp number) → POST /api/enquiries (project_type Other, requirement "Brochure download", source_page /brochure) → PDF opens, success state, localStorage `suvi-brochure-lead` unlocks direct links thereafter.
- Testing agent iteration 3: 100% pass (backend 15/15; preloader, slideshow, brand colours, loops, gate flow, admin listing, mobile, regression).

## Implemented (2026-06 — session 4: header, longer preloader, home polish, brochure brand)
- Header redesigned: 3-column (wordmark · centred nav with oxblood/brass diamond active marker · serif phone + oxblood "Start a Project"), glass + soft shadow on scroll, descriptor removed.
- Preloader lengthened to ~4.3s (HOLD 3300ms) with more motion: frame lines draw in, slow orbiting brass dot on a faint ring, cycling italic words (Design / Craft / Detail / Home), counter, shimmer loop, oxblood wipe exit. `introDelay` 4.3s.
- Home polish: Intro (scroll-driven oxblood vertical rule, 3 pillars Design/Make/Install with animated oxblood rules, clip-path image reveal), ServicesList (oxblood diamond `layoutId` indicator, animated 01/06 progress rule, animated title swap, oxblood top band), Materials (rebalanced 2-row asymmetric grid, clip-path reveals, numbered captions, ivory-2 bg).
- Brochure PDF: oxblood cover spread with inset image panel, oxblood process page, brand-coloured numerals/rules throughout.
- LeadGate error state now shows server validation detail or a WhatsApp fallback link (user saw a generic failure on the deployed domain; deployed API verified healthy via curl — likely transient).
- Self-tested via screenshots (desktop + mobile), gate flow PASS, PDF regenerated. Testing agent not run this session (user asked to conserve credits).

## Implemented (2026-09-10 — direct download and content visibility repairs)
- Deleted `components/brochure/LeadGate.jsx` and removed `GateProvider` from the brochure page. All three Download PDF buttons are native downloads with no lead capture, and retain their established test IDs. PDF delivery remains functional even when `/api/**` requests fail. Contact enquiry submission is unchanged and still works.
- Added `backend/export_brochure.py` and published the real seven-page brochure as a bundled website asset. API endpoint now also requests attachment delivery rather than opening the browser PDF viewer. Exporter loads backend environment before brochure content.
- Shared `SplitLines` now observes the stable heading parent rather than translated child text inside a clipping mask. Removed masking and opacity hiding; lines use a small, readable vertical entrance. Shared `Reveal` content is visible by default even if an intersection event is missed. Viewport margin now uses a predictable 40px instead of width-relative percentages.
- Removed full clipping-mask image reveals from Intro and Materials and removed the homepage hero's scroll-driven text fade to zero. Added specific heading/image/pillar test IDs. Print output forces shared reveals to their visible, untransformed state.
- Aligned brochure sticky action bar to the actual desktop header height; added test IDs to brochure service-detail links.
- Regression found initial service hash links could fail to scroll. Services now waits for a layout frame, refreshes scroll dimensions and uses a numeric destination with a single scroll-margin offset. Index navigation uses React Router links; invalid encoded hashes are safely ignored.
- Verification: testing agent report `test_reports/iteration_4.json`: **18/18 backend tests pass**, all brochure downloads and homepage visibility pass on desktop/mobile, including fast/slow scroll, reduced motion, fresh visits and API-outage simulation. Verified zero enquiry POSTs for download-only flows. Normal API integration is not mocked.
- Follow-up after fixing the one reported service-link issue: desktop/mobile direct hash links, same-page index links, home-to-service and brochure-to-service navigation all pass (section top ~96px below the header); download rechecked successfully. See `test_reports/iteration_4_followup.json`.
- Desktop 1920×800 and mobile 390×844 screenshots show the restored Intro heading and image; no document overflow observed. Production build compiled successfully and includes the bundled PDF.

## Backlog / next tasks
- **P0**: No known open blockers for the reported download and missing-content issues. User verification pending on the current preview.
- **P1**: Replace representative imagery with real Suvi Interior project photos (`content/images.js`, `projects.js`, `gallery.js`, brochure content); confirm service copy and real project names/years. Extend existing visual polish to Projects/Services only if requested. Regenerate bundled brochure after content updates.
- **P2**: Automatic brochure publication on content changes; email/WhatsApp notification on new contact enquiry (requires provider/receiving details); founder/team story; verified Google rating + Business link; business hours, email/social details; rate limiting/honeypot on enquiry endpoint; simple admin view; approved testimonials; blog/journal; optional desktop project-hover cursor. Update sitemap/robots domain when final business domain is confirmed.
