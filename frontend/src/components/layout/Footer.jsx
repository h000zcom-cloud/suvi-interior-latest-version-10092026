import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { directionsLink, telLink, waLink } from "@/lib/contact";

const studioLinks = [
  { label: "Studio", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Gallery", to: "/gallery" },
  { label: "Brochure", to: "/brochure" },
  { label: "Contact", to: "/contact" },
];

const col = "label text-ivory/40";
const link = "link-underline inline-block py-0.5 text-sm text-ivory/80 hover:text-ivory";

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-night text-ivory pb-[72px] lg:pb-0">
    <div className="container-x">
      <div className="flex flex-col gap-10 border-b border-night-line py-14 md:flex-row md:items-end md:justify-between lg:py-20">
        <div>
          <p className="label flex items-center gap-4 text-ivory/40">
            <span className="h-px w-8 bg-brass" />
            Begin a conversation
          </p>
          <p className="h-section mt-6 max-w-xl text-ivory">
            Designed and made <span className="italic">in Nashik.</span>
          </p>
        </div>
        <Link to="/contact" data-testid="footer-cta" className="btn-gold self-start md:self-auto">
          Start a Project <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link to="/" className="group inline-flex" aria-label="Suvi Interior — Home"><Wordmark size="md" roll /></Link>
          <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ivory/45">{site.descriptor}</p>
          <p className="mt-8 max-w-xs text-sm leading-[1.75] text-ivory/60">{site.positioning}</p>
        </div>
        <div className="lg:col-span-2">
          <p className={col}>Studio</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {studioLinks.map((n) => (
              <li key={n.to}>
                <Link to={n.to} data-testid={`footer-nav-${n.label.toLowerCase()}`} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className={col}>Projects &amp; Services</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            <li>
              <Link to="/projects" data-testid="footer-nav-projects" className={link}>
                All Projects
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className={link}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className={col}>Contact</p>
          <ul className="mt-6 flex flex-col gap-2.5 text-sm">
            <li>
              <a href={telLink()} data-testid="footer-phone" className="link-underline inline-block font-display text-2xl tracking-tight text-ivory hover:text-brass">
                {site.phone.display}
              </a>
            </li>
            {site.whatsapp.enabled && (
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className={link}>
                  WhatsApp
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
              </li>
            )}
            {site.social.instagram && (
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                  Instagram
                </a>
              </li>
            )}
            <li>
              <a href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-location" className={link}>
                Directions
              </a>
            </li>
          </ul>
          <address className="mt-8 text-xs not-italic leading-relaxed text-ivory/45" data-testid="footer-address">
            {site.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>
      </div>

      <div className="overflow-hidden border-t border-night-line py-8 md:py-10" aria-hidden="true" data-testid="footer-wordmark-loop">
        <div className="flex w-max animate-marquee-slow will-change-transform">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex select-none items-center font-display font-light text-[13vw] italic leading-[0.85] tracking-[-0.03em] text-ivory/95">
              Suvi Interior
              <span className="mx-[0.35em] inline-block h-[0.12em] w-[0.12em] rotate-45 bg-oxblood-light" />
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-night-line py-6 text-[10px] uppercase tracking-[0.16em] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Suvi Interior · All rights reserved · Nashik, India</p>
        <div className="flex gap-6">
          <Link to="/privacy" data-testid="footer-privacy" className="link-underline hover:text-ivory">
            Privacy
          </Link>
          <Link to="/terms" data-testid="footer-terms" className="link-underline hover:text-ivory">
            Terms
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
