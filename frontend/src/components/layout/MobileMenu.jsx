import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { mobileNav, site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";
import { useMenuDialog } from "@/hooks/useMenuDialog";
import { EASE } from "@/lib/motion";

export const MobileMenu = ({ open, onClose }) => {
  const dialog = useRef(null);
  const reduce = useReducedMotion();
  useMenuDialog(open, dialog, onClose);
  if (!open) return null;
  return (
    <motion.div ref={dialog} id="mobile-menu" data-testid="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" className="site-menu" data-lenis-prevent initial={reduce ? false : { y: -8 }} animate={{ y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
      <div className="site-menu-top container-x">
        <Link to="/" onClick={onClose} data-testid="mobile-menu-logo" aria-label="Suvi Interior — Home"><Wordmark data-testid="mobile-menu-wordmark" /></Link>
        <button type="button" onClick={onClose} data-testid="mobile-menu-close" aria-label="Close navigation" className="site-menu-close">Close <X className="h-5 w-5" strokeWidth={1.3} /></button>
      </div>
      <div className="container-x site-menu-content">
        <p className="editorial-label text-brass" data-testid="mobile-menu-label">The studio index</p>
        <nav aria-label="Mobile" data-testid="mobile-menu-nav">
          {mobileNav.map((n, i) => (
            <motion.div key={n.to} initial={reduce ? false : { y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.025, ease: EASE }}>
              <NavLink to={n.to} onClick={onClose} data-testid={`mobile-nav-link-${n.label.toLowerCase()}`} className={({ isActive }) => `site-menu-link ${isActive ? "is-current" : ""}`}>
                <span className="site-menu-index" aria-hidden="true">0{i + 1}</span><span>{n.label}</span><ArrowUpRight className="ml-auto h-5 w-5" strokeWidth={1.2} />
              </NavLink>
            </motion.div>
          ))}
        </nav>
        <Link to="/contact" onClick={onClose} data-testid="mobile-menu-cta" className="site-menu-project">Start a project<ArrowUpRight className="h-4 w-4" /></Link>
        <div className="site-menu-contacts">
          <a href={telLink()} data-testid="mobile-menu-call"><Phone className="h-4 w-4" strokeWidth={1.4} />Call</a>
          {site.whatsapp.enabled && <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="mobile-menu-whatsapp"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a>}
          <Link to="/brochure" onClick={onClose} data-testid="mobile-menu-brochure"><BookOpen className="h-4 w-4" strokeWidth={1.4} />Brochure</Link>
        </div>
        <p className="text-xs leading-relaxed text-white/60" data-testid="mobile-menu-location">{site.address.short}</p>
      </div>
    </motion.div>
  );
};