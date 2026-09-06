import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

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
          "fixed bottom-7 right-7 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-charcoal text-ivory transition-[background-color,transform,opacity] duration-500 ease-out hover:bg-burgundy lg:flex",
          hidden ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>

      <div
        data-testid="mobile-sticky-bar"
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-line bg-ivory transition-transform duration-500 ease-out lg:hidden",
          hidden && "translate-y-full",
        )}
      >
        <a href={telLink()} data-testid="mobile-sticky-call" className="flex min-h-[56px] items-center justify-center gap-3 py-4 label text-charcoal">
          <Phone className="h-4 w-4" strokeWidth={1.5} /> Call
        </a>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="mobile-sticky-whatsapp" className="flex min-h-[56px] items-center justify-center gap-3 bg-charcoal py-4 label text-ivory">
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </>
  );
};
