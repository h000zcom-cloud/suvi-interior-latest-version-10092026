import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { mobileNav, site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-charcoal text-ivory lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <nav className="container-x flex flex-1 flex-col justify-center pt-20 pb-8" aria-label="Mobile">
            <p className="label mb-6 flex items-center gap-4 text-ivory/45"><span className="h-px w-6 bg-brass" />Menu</p>
            <ul className="flex flex-col border-t border-night-line">
              {mobileNav.map((n, i) => (
                <li key={n.to} className="overflow-hidden border-b border-night-line">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.045 }}>
                    <NavLink
                      to={n.to}
                      onClick={onClose}
                      data-testid={`mobile-nav-link-${n.label.toLowerCase()}`}
                      className={({ isActive }) => cn("flex min-h-[56px] items-center justify-between py-3 font-display text-[clamp(2rem,9vw,3.5rem)] uppercase leading-none tracking-[-0.01em]", isActive ? "text-brass" : "text-ivory")}
                    >
                      {n.label}
                      <span className="label text-ivory/35">0{i + 1}</span>
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.4 }} className="mt-8">
              <Link to="/contact" onClick={onClose} data-testid="mobile-menu-cta" className="btn-text-light text-[12px]">
                Start a Project <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </nav>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="container-x border-t border-night-line pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5">
            <div className="grid grid-cols-2 gap-4">
              <a href={telLink()} data-testid="mobile-menu-call" className="flex min-h-[44px] items-center gap-3 text-sm text-ivory/80">
                <Phone className="h-4 w-4" strokeWidth={1.5} /> {site.phone.display}
              </a>
              {site.whatsapp.enabled && (
                <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="mobile-menu-whatsapp" className="flex min-h-[44px] items-center gap-3 text-sm text-ivory/80">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              )}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ivory/45">{site.address.short}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
