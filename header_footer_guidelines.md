# Blueprint & Design Guidelines: Suvi Interior Header, Wordmark, and Footer System

## 1. Executive Direction & Problem Diagnosis

### The Problem
1. **Header Clashing with Hero**: The header sits as a flat, heavy solid strip (`#58130e` background with a crude 1px white/15 border) clamped directly on top of the hero’s rich, warm walnut & linen photography. It creates an aggressive color-block seam rather than framing the architectural view.
2. **Wordmark Flaws**: The current logo uses lowercase `suvi.` with an awkward pipe separator and stacked tiny text (`INTERIOR \n DESIGN & MAKE`) that turns into illegible noise on mobile screens, and feels like a generic template rather than a bespoke interior studio wordmark.
3. **Footer Visual Disconnect**: The footer is cramped in density yet ends abruptly with an oversized lowercase `suvi interior.` banner that lacks editorial poise, architectural proportion, and responsive typography scaling.
4. **Technical Invariants**: The plain main content must always stay visible; no page-wide opacity gates, waiting route exit blockers, or hiding essential layout elements.

### The Solution: Haute Editorial & Architectural Craft
- **Theme**: Warm luxury atelier. Base color is authentic oxblood `#58130e`, paired with polished brass `#c5a880`, ivory cream `#faf9f6`, and deep obsidian/warm wood `#141210`.
- **Header Surface**: Dual-state architectural frame.
  - **On Top/Hero Mode**: Deep translucent obsidian/oxblood veil (`bg-[#141210]/65` or `bg-[#3e0c09]/75` with `backdrop-blur-xl backdrop-saturate-150` and an ultra-fine `border-b border-white/10`). It melts effortlessly into the dark hero living room, letting the ambient wood and warm lighting glow beneath without obscuring content or creating a harsh boundary.
  - **Scrolled State / Transition**: As the user scrolls past 40px, the header subtly condenses into a sculpted, grounded bar with an elevated `border-b border-[#c5a880]/20` and slight shadow `shadow-[0_12px_36px_rgba(20,18,16,0.35)]`.
- **Wordmark Identity ("SUVI INTERIOR")**:
  - Pure, balanced architectural typography in `Cormorant Garamond` and `Plus Jakarta Sans`.
  - Primary brand name: **SUVI** in stately small-caps/capital serif with refined optical tracking (`tracking-[0.14em]`), paired with **INTERIOR** in crisp uppercase geometric sans (`tracking-[0.28em] font-medium text-[9px] sm:text-[10px] text-[#c5a880]`).
  - Deliberately responsive:
    - **Desktop (>= 1280px)**: Refined horizontal lockup with an understated brass hairline accent or dot separator, maintaining perfect optical baseline.
    - **Tablet (768px - 1279px)**: Proportional medium lockup that fits comfortable top navigation without crowding.
    - **Mobile (< 768px)**: Compact stacked or inline balanced mark that retains high legibility, avoiding any squashed sub-text or awkward line-breaks.
- **Footer**:
  - High-impact editorial layout featuring an asymmetrical 4-column architectural grid:
    1. Studio colophon with redesigned wordmark, Nashik coordinates, and tactile project inquiry trigger.
    2. Quick index / services navigation with hover brass line micro-interactions.
    3. Atelier address, direct phone, WhatsApp link, and Google Maps directions link.
    4. Studio catalog / direct brochure PDF download badge.
  - Monumental yet restrained architectural signature: **SUVI INTERIOR** rendered in monumental serif outline / brass shimmer with fluid viewport sizing (`clamp(2.5rem, 8vw, 7rem)`), grounded by copyright and legal terms.

---

## 2. Responsive Typography & Font Scale

| Element | Font Family | Size / Leading | Weight & Tracking | Color / States |
| :--- | :--- | :--- | :--- | :--- |
| **Wordmark Primary ("SUVI")** | Cormorant Garamond, serif | Mobile: `24px` (`text-2xl`)<br>Tablet: `28px`<br>Desktop: `32px` | `font-medium`, `tracking-[0.14em]`, uppercase | `#FAF9F6`, hover: `#C5A880` |
| **Wordmark Descriptor ("INTERIOR")** | Plus Jakarta Sans, sans-serif | Mobile: `8.5px`<br>Tablet: `9.5px`<br>Desktop: `10px` | `font-semibold`, `tracking-[0.28em]`, uppercase | `#C5A880` (Brass) |
| **Header Nav Links** | Plus Jakarta Sans, sans-serif | `11.5px` (`text-[11.5px]`) | `font-medium`, `tracking-[0.16em]`, uppercase | Default: `#FAF9F6/85`<br>Hover/Active: `#FFFFFF` + brass hairline dot/underline |
| **Header CTA ("Start a Project")** | Plus Jakarta Sans, sans-serif | `11px` | `font-medium`, `tracking-[0.18em]`, uppercase | Pill or micro-bordered link with brass arrow |
| **Footer Columns Headings** | Cormorant Garamond, serif | `16px` (`text-base`) | `font-normal`, italic or small-caps, `tracking-[0.06em]` | `#C5A880` with fine horizontal brass rule |
| **Footer Links** | Plus Jakarta Sans, sans-serif | `12.5px` (`text-[12.5px]`) | `font-normal`, `leading-loose`, `tracking-[0.04em]` | `#FAF9F6/70`, hover: `#FFFFFF` with slight indent |
| **Footer Monumental Mark** | Cormorant Garamond, serif | `clamp(2.75rem, 8vw, 6.5rem)` | `font-light`, `tracking-[0.08em]`, uppercase | `#FAF9F6/15` or refined gradient brass outline |

---

## 3. Responsive Header Architecture

### Height & Layout System
- **Mobile (< 768px)**: `h-[64px]`, padding `px-5`. Logo on left, Hamburger trigger with brass touch-target on right.
- **Tablet (768px - 1279px)**: `h-[72px]`, padding `px-8`. Logo on left, tablet quick-links or streamlined nav + phone icon + Hamburger.
- **Desktop (>= 1280px)**: `h-[80px]`, padding `px-12` to `px-20`. Balanced 3-zone layout:
  - **Zone 1 (Left)**: The refined `SUVI INTERIOR` wordmark.
  - **Zone 2 (Center)**: Primary Navigation (`Projects`, `Services`, `Studio`, `Process`, `Gallery`, `Brochure`).
  - **Zone 3 (Right)**: Direct phone quick-dial + "Start a Project" magnetic CTA button with brass micro-interaction.

### Glassmorphism & Scrolled Dynamics
- **Initial Top State**:
  ```css
  background: linear-gradient(180deg, rgba(20, 18, 16, 0.72) 0%, rgba(20, 18, 16, 0.45) 70%, rgba(20, 18, 16, 0) 100%), rgba(62, 12, 9, 0.35);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  ```
  *Why this fixes the problem:* It softens the transition between the browser chrome and the hero photograph, allowing the warm amber and walnut tones of the living room image to shine through gracefully.
- **Scrolled State (`scrollY > 30px`)**:
  ```css
  background: rgba(30, 8, 6, 0.92);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border-bottom: 1px solid rgba(197, 168, 128, 0.22);
  box-shadow: 0 10px 30px -5px rgba(10, 8, 7, 0.45);
  ```

---

## 4. Redesigned Wordmark Component Specification (`Wordmark.jsx`)

### Brand Composition
- **Main Heading**: `SUVI`
  - Font: `Cormorant Garamond`
  - Case: Capitalized with classical serif proportion (`font-medium`)
- **Separator**: Refined 45-degree diamond or hairline vertical stroke (`bg-[#c5a880]`)
- **Sub-element**: `INTERIOR`
  - Font: `Plus Jakarta Sans`
  - Case: Uppercase geometric
  - Tracking: `tracking-[0.24em]`
- **Variants**:
  - `header`: Perfectly balanced inline lockup (`flex items-center gap-2.5 sm:gap-3.5`).
  - `footer`: Scaled signature with studio heritage subtitle.
  - `compact`: Mobile-optimized lockup ensuring zero word clipping.

---

## 5. Responsive Footer Architecture (`Footer.jsx`)

### Grid System
- Desktop: `grid grid-cols-12 gap-10 lg:gap-14 py-16 lg:py-20`
  - **Col 1 (Cols 1-4)**: Colophon & Brand Vision. Logo + description + Nashik address summary + direct WhatsApp / Call buttons.
  - **Col 2 (Cols 5-7)**: Studio Archive & Services Navigation. Two-column sub-list of primary pages and interior categories.
  - **Col 3 (Cols 8-10)**: Studio Visit & Working Hours. Exact address, studio hours, and directions link with external arrow.
  - **Col 4 (Cols 11-12)**: Direct Brochure Download card with PDF metadata (`PDF · 12.4 MB`) and instant download trigger.
- **Monumental Architectural Banner**:
  - Large restrained typography spanning the full width above the copyright bar:
  - `SUVI INTERIOR` in classical serif, subtly tinted `#c5a880` with low opacity (`opacity-20` to `opacity-30`), creating the feel of an embossed architectural drawing.
- **Sub-Footer / Legal Row**:
  - Copyright line: `© 2026 Suvi Interior · Nashik, Maharashtra`
  - Secondary navigation: `Privacy Policy`, `Terms of Service`, `Back to top ↗`.

---

## 6. Motion & Interactive Details (Framer Motion & CSS)

1. **Header Scroll Sensing**:
   - `useScroll` hook detecting `scrollY > 24` to seamlessly transition class names without layout shift or jank.
2. **Nav Links Hover Effect**:
   - Brass underline sliding in from left (`origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`).
3. **Mobile Menu Drawer**:
   - Staggered entrance for navigation links with numeric counters (`01`, `02`, `03` in brass).
   - Solid backdrop with `bg-[#240604]/96` and `backdrop-blur-2xl` ensuring complete legibility and no transparent collision.
4. **Safety & Zero Opacity Blocker**:
   - No route transition delaying page visibility. `page-content` remains strictly `opacity: 1; visibility: visible;`.
   - Motion is strictly additive micro-interactions.

---

## 7. Testing & Quality Attributes (`data-testid`)

- `data-testid="site-header"`
- `data-testid="header-logo"`
- `data-testid="header-wordmark"`
- `data-testid="header-nav"`
- `data-testid="nav-link-[item]"`
- `data-testid="header-cta"`
- `data-testid="mobile-menu-button"`
- `data-testid="site-footer"`
- `data-testid="footer-logo"`
- `data-testid="footer-nav-[item]"`
- `data-testid="footer-address"`
- `data-testid="footer-phone"`
- `data-testid="footer-whatsapp"`
- `data-testid="footer-brochure-download"`
- `data-testid="footer-back-to-top"`
- `data-testid="footer-copyright"`
