import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, BookOpen, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { mobileNav, site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const tile = "flex min-h-[60px] flex-col items-center justify-center gap-2 border border-night-line text-[10px] uppercase tracking-[0.18em] text-ivory/80 transition-colors duration-300 hover:border-brass hover:text-brass";

export const MobileMenu = ({ open, onClose }) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          data-testid="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-oxblood-deep text-ivory xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <nav className="container-x flex flex-1 flex-col justify-center pt-24 pb-6" aria-label="Mobile">
            <p className="label mb-5 flex items-center gap-4 text-ivory/40">
              <span className="h-px w-6 bg-brass" />
              Navigate
            </p>
            <ul className="flex flex-col border-t border-night-line">
              {mobileNav.map((n, i) => (
                <li key={n.to} className="overflow-hidden border-b border-night-line">
                  <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.75, ease: EASE, delay: 0.08 + i * 0.05 }}>
                    <NavLink
                      to={n.to}
                      onClick={onClose}
                      data-testid={`mobile-nav-link-${n.label.toLowerCase()}`}
                      className={({ isActive }) => cn("flex min-h-[58px] items-center justify-between py-2.5 font-display font-light text-[clamp(2.25rem,10vw,3.5rem)] leading-none tracking-[-0.02em]", isActive ? "italic text-brass" : "text-ivory")}
                    >
                      {n.label}
                      <span className="label text-ivory/30">0{i + 1}</span>
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.42 }} className="mt-8">
              <Link to="/contact" onClick={onClose} data-testid="mobile-menu-cta" className="btn-gold w-full">
                Start a Project <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </nav>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="container-x pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
            <div className="grid grid-cols-3 gap-2">
              <a href={telLink()} data-testid="mobile-menu-call" className={tile}>
                <Phone className="h-4 w-4" strokeWidth={1.4} /> Call
              </a>
              {site.whatsapp.enabled && (
                <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="mobile-menu-whatsapp" className={tile}>
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              )}
              <Link to="/brochure" onClick={onClose} data-testid="mobile-menu-brochure" className={tile}>
                <BookOpen className="h-4 w-4" strokeWidth={1.4} /> Brochure
              </Link>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-ivory/40">{site.address.short}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
