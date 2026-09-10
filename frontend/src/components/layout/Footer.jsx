import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { DownloadButton } from "@/components/brochure/DownloadButton";
import { site, mobileNav } from "@/content/site";
import { directionsLink, telLink, waLink } from "@/lib/contact";
import { EASE } from "@/lib/motion";

export const Footer = () => {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.08 });
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const reveal = delay => ({ initial: reduce ? false : { y: 16 }, animate: { y: seen || reduce ? 0 : 16 }, transition: { duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : delay } });
  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2, immediate: !!reduce, force: true });
    else window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    document.querySelector("[data-testid='header-logo']")?.focus({ preventScroll: true });
  };

  return (
    <footer ref={ref} className="atelier-footer" data-testid="site-footer">
      <div className="container-x">
        <div className="footer-overline"><p data-testid="footer-overline">Design with intention. Made with care.</p><p>Nashik, India</p></div>
        <div className="footer-grid">
          <motion.div {...reveal(0)} className="footer-studio">
            <Link to="/" data-testid="footer-logo" aria-label="Suvi Interior — Home"><Wordmark variant="footer" data-testid="footer-wordmark" /></Link>
            <p className="footer-description" data-testid="footer-description">Interiors to live in.<br />Furniture to live with.</p>
            <p className="footer-note">Designed and made together,<br />by one studio in Nashik.</p>
            <Link to="/contact" data-testid="footer-cta" className="footer-inquiry">Tell us about your space<ArrowUpRight className="h-4 w-4" strokeWidth={1.4} /></Link>
          </motion.div>
          <motion.div {...reveal(0.07)} className="footer-directory">
            <h2 className="footer-heading" data-testid="footer-explore-heading">Explore</h2>
            <nav aria-label="Footer" data-testid="footer-nav">{mobileNav.map(n => <Link key={n.to} to={n.to} className="footer-link" data-testid={`footer-nav-${n.label.toLowerCase()}`}>{n.label}</Link>)}</nav>
          </motion.div>
          <motion.div {...reveal(0.14)} className="footer-visit">
            <h2 className="footer-heading" data-testid="footer-visit-heading">Visit the studio</h2>
            <address data-testid="footer-address">{site.address.lines.map(l => <span key={l}>{l}</span>)}</address>
            <a href={directionsLink()} target="_blank" rel="noopener noreferrer" className="footer-direction" data-testid="footer-location">Get directions<ArrowUpRight className="h-3.5 w-3.5" /></a>
            <div className="footer-contact-links"><a href={telLink()} className="footer-phone" data-testid="footer-phone">{site.phone.display}</a>{site.whatsapp.enabled && <a href={waLink()} target="_blank" rel="noopener noreferrer" className="footer-link" data-testid="footer-whatsapp">Message us on WhatsApp ↗</a>}</div>
          </motion.div>
          <motion.div {...reveal(0.21)} className="footer-publication">
            <h2 className="footer-heading" data-testid="footer-publication-heading">The studio edition</h2>
            <Link to="/brochure" className="footer-publication-preview" data-testid="footer-brochure-preview" aria-label="Preview the studio brochure">
              <img src="/brochures/previews/page-1.jpg" alt="Suvi Interior studio brochure cover" loading="lazy" width="210" height="297" />
              <span>Our approach,<br />in seven pages.<ArrowUpRight className="mt-3 h-4 w-4" strokeWidth={1.2} /></span>
            </Link>
            <DownloadButton className="footer-download" testId="footer-brochure-download" />
            <p className="footer-file-meta" data-testid="footer-brochure-info">PDF · 7 pages · 3 MB</p>
          </motion.div>
        </div>
        <motion.div {...reveal(0.12)} className="footer-signature" aria-hidden="true" data-testid="footer-signature"><Wordmark variant="signature" /></motion.div>
        <div className="footer-bottom">
          <p data-testid="footer-copyright">© {new Date().getFullYear()} Suvi Interior. All rights reserved.</p>
          <nav aria-label="Legal" className="footer-legal"><Link to="/privacy" data-testid="footer-privacy">Privacy</Link><Link to="/terms" data-testid="footer-terms">Terms</Link></nav>
          <button type="button" onClick={backToTop} className="footer-back-top" data-testid="footer-back-to-top">Back to top<ArrowUp className="h-4 w-4" strokeWidth={1.3} /></button>
        </div>
      </div>
    </footer>
  );
};