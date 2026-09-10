import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { site, mobileNav } from "@/content/site";
import { directionsLink, telLink, waLink } from "@/lib/contact";

export const Footer = () => (
  <footer className="atelier-footer" data-testid="site-footer">
    <div className="container-x">
      <div className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div><Link to="/" data-testid="footer-logo" aria-label="Suvi Interior home"><Wordmark /></Link><p className="mt-7 max-w-xs text-sm leading-relaxed text-white/65">Interior design. Furniture manufacturing.<br />Thoughtfully brought together in Nashik.</p><Link to="/contact" data-testid="footer-cta" className="mt-7 inline-flex items-center gap-8 border-b border-white/40 pb-2 text-sm">Tell us about your space<ArrowUpRight className="h-4 w-4" /></Link></div>
        <div><p className="editorial-label mb-6 text-white/60">Explore</p><div className="grid grid-cols-2 gap-x-6 gap-y-3">{mobileNav.map(n=><Link key={n.to} to={n.to} className="footer-link" data-testid={`footer-nav-${n.label.toLowerCase()}`}>{n.label}</Link>)}</div></div>
        <div><p className="editorial-label mb-6 text-white/60">Visit the studio</p><address className="text-xs not-italic leading-[1.9] text-white/70" data-testid="footer-address">{site.address.lines.map(l=><span className="block" key={l}>{l}</span>)}</address><div className="mt-5 flex flex-wrap gap-5"><a className="footer-link" href={telLink()} data-testid="footer-phone">{site.phone.display}</a><a className="footer-link" href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp">WhatsApp</a><a className="footer-link" href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-location">Directions ↗</a></div></div>
      </div>
      <p className="footer-signature" aria-hidden="true">suvi interior.</p>
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/20 py-6 text-[10px] text-white/60"><p>© {new Date().getFullYear()} Suvi Interior · Nashik, India</p><div className="flex gap-6"><Link to="/privacy" data-testid="footer-privacy">Privacy</Link><Link to="/terms" data-testid="footer-terms">Terms</Link></div></div>
    </div>
  </footer>
);