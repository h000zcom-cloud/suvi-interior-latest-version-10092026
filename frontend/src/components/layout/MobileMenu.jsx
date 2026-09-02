import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { nav, site } from "@/content/site";
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
          className="fixed inset-0 z-40 flex flex-col bg-night text-ivory lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <nav className="container-x flex flex-1 flex-col justify-center pt-16" aria-label="Mobile">
            <ul className="flex flex-col">
              {nav.map((n, i) => (
                <li key={n.to} className="overflow-hidden border-b border-night-line">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.05 }}>
                    <NavLink
                      to={n.to}
                      end={n.to === "/"}
                      onClick={onClose}
                      data-testid={`mobile-nav-link-${n.label.toLowerCase()}`}
                      className={({ isActive }) => cn("flex items-baseline justify-between py-4 font-display text-[11vw] uppercase leading-none tracking-[-0.01em] sm:text-6xl", isActive ? "text-ivory" : "text-ivory/75")}
                    >
                      {n.label}
                      <span className="label text-ivory/40">0{i + 1}</span>
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.45 }} className="mt-8">
              <Link to="/contact" onClick={onClose} data-testid="mobile-menu-cta" className="btn btn-light w-full sm:w-auto">
                Start a Project
              </Link>
            </motion.div>
          </nav>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }} className="container-x grid grid-cols-2 gap-px border-t border-night-line pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-5">
            <a href={telLink()} data-testid="mobile-menu-call" className="flex items-center gap-3 py-3 text-sm text-ivory/80">
              <Phone className="h-4 w-4" strokeWidth={1.5} /> {site.phone.display}
            </a>
            {site.whatsapp.enabled && (
              <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="mobile-menu-whatsapp" className="flex items-center gap-3 py-3 text-sm text-ivory/80">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            )}
            <p className="col-span-2 mt-2 text-xs leading-relaxed text-ivory/45">{site.address.short}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
