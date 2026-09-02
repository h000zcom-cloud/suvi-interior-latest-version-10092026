import { Link } from "react-router-dom";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { telLink, waLink } from "@/lib/contact";
import { Reveal } from "@/components/motion/Reveal";

const socials = Object.entries(site.social).filter(([, url]) => Boolean(url));

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-night text-ivory pb-16 lg:pb-0">
    <div className="container-x">
      <div className="grid gap-12 border-b border-night-line py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="label text-ivory/45">Suvi Interior — Nashik</p>
          <p className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl lg:text-6xl xl:text-7xl">
            Interiors,
            <br />
            crafted
            <br />
            with <span className="italic normal-case">intent.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
          <p className="max-w-sm text-sm leading-relaxed text-ivory/60">{site.positioning}</p>
          <Link to="/contact" data-testid="footer-cta" className="btn btn-light w-fit">
            Start a Project
          </Link>
        </Reveal>
      </div>

      <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-3">
          <p className="label text-ivory/45">Navigation</p>
          <ul className="mt-6 flex flex-col gap-3">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} data-testid={`footer-nav-${n.label.toLowerCase()}`} className="link-underline text-sm text-ivory/80 hover:text-ivory">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="label text-ivory/45">Services</p>
          <ul className="mt-6 flex flex-col gap-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="link-underline text-sm text-ivory/80 hover:text-ivory">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="label text-ivory/45">Studio</p>
          <address className="mt-6 text-sm not-italic leading-relaxed text-ivory/80" data-testid="footer-address">
            {site.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>
        <div className="lg:col-span-3">
          <p className="label text-ivory/45">Contact</p>
          <ul className="mt-6 flex flex-col gap-3 text-sm">
            <li>
              <a href={telLink()} data-testid="footer-phone" className="link-underline text-ivory/80 hover:text-ivory">
                {site.phone.display}
              </a>
            </li>
            {site.whatsapp.enabled && (
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className="link-underline text-ivory/80 hover:text-ivory">
                  WhatsApp
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="link-underline text-ivory/80 hover:text-ivory">
                  {site.email}
                </a>
              </li>
            )}
            {socials.map(([key, url]) => (
              <li key={key}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="link-underline capitalize text-ivory/80 hover:text-ivory">
                  {key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="overflow-hidden border-t border-night-line pt-10 pb-3 md:pt-14" aria-hidden="true">
        <p className="font-display text-[17.5vw] uppercase leading-[0.84] tracking-[-0.02em] text-ivory/95 select-none">
          Suvi Interior
        </p>
      </div>

      <div className="flex flex-col gap-4 border-t border-night-line py-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. {site.city}, {site.region}.</p>
        <div className="flex gap-6">
          <Link to="/privacy" data-testid="footer-privacy" className="link-underline hover:text-ivory">
            Privacy Policy
          </Link>
          <Link to="/terms" data-testid="footer-terms" className="link-underline hover:text-ivory">
            Terms
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
