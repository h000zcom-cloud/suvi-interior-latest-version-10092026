import { Link } from "react-router-dom";
import { BookOpen, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

const cell = "flex min-h-[60px] flex-col items-center justify-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-300";

export const WhatsAppFloat = ({ hidden }) => {
  if (!site.whatsapp.enabled) return null;
  return (
    <>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float"
        aria-label="Chat with Suvi Interior on WhatsApp"
        className={cn(
          "group fixed bottom-8 right-8 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-oxblood text-ivory shadow-lg transition-[background-color,transform,opacity] duration-300 hover:-translate-y-1 hover:bg-oxblood-deep xl:flex",
          hidden ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <span className="absolute inset-0 rounded-full border border-brass/40 transition-transform duration-700 ease-out group-hover:scale-125 group-hover:opacity-0" aria-hidden="true" />
        <WhatsAppIcon className="h-6 w-6" />
      </a>

      <div
        data-testid="mobile-sticky-bar"
        className={cn(
          "bg-oxblood-deep fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1.35fr_1fr] border-t border-white/20 pb-[env(safe-area-inset-bottom)] text-ivory transition-transform duration-300 xl:hidden",
          hidden && "translate-y-full",
        )}
      >
        <a href={telLink()} data-testid="mobile-sticky-call" className={cn(cell, "text-ivory/85")}>
          <Phone className="h-4 w-4" strokeWidth={1.4} /> Call
        </a>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="mobile-sticky-whatsapp" className={cn(cell, "bg-oxblood text-white")}>
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </a>
        <Link to="/brochure" data-testid="mobile-sticky-brochure" className={cn(cell, "text-ivory/85")}>
          <BookOpen className="h-4 w-4" strokeWidth={1.4} /> Brochure
        </Link>
      </div>
    </>
  );
};
