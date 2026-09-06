import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { directionsLink, telLink, waLink } from "@/lib/contact";

const studioLinks = [
  { label: "Studio", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const col = "label text-ivory/45";
const link = "link-underline inline-block py-0.5 text-sm text-ivory/85 hover:text-ivory";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-night-line bg-charcoal text-ivory pb-16 lg:pb-0">
    <div className="container-x">
      <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <p className="font-display text-[17px] uppercase tracking-[0.24em]">Suvi Interior</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-ivory/55">{site.descriptor}</p>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-ivory/65">{site.positioning}</p>
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
              <a href={telLink()} data-testid="footer-phone" className={link}>
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
                Location
              </a>
            </li>
          </ul>
          <address className="mt-8 text-xs not-italic leading-relaxed text-ivory/50" data-testid="footer-address">
            {site.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>
      </div>

      <div className="overflow-hidden border-t border-night-line pt-8 md:pt-12" aria-hidden="true">
        <p className="font-display text-[17vw] uppercase leading-[0.84] tracking-[-0.02em] text-ivory select-none">Suvi Interior</p>
      </div>

      <div className="flex flex-col gap-3 border-t border-night-line py-6 text-[11px] uppercase tracking-[0.14em] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
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
