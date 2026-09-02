import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { SplitLines, Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";

export const CtaBand = ({ lines = ["Let's create", "a space", "that feels", "like yours."], text = "Tell us about your space, your ideas and what you want to create.", whatsappMessage, testId = "final-cta" }) => (
  <section data-testid={testId} className="bg-night text-ivory">
    <div className="container-x grid gap-12 py-28 md:py-40 lg:grid-cols-12">
      <SplitLines
        inView
        as="h2"
        lines={lines}
        className="font-display text-[12.5vw] uppercase leading-[0.88] tracking-[-0.015em] sm:text-7xl lg:col-span-7 lg:text-[6.8vw] xl:text-[6.2vw]"
      />
      <Reveal delay={0.25} className="flex flex-col justify-end gap-10 lg:col-span-4 lg:col-start-9">
        <p className="max-w-sm text-base leading-relaxed text-ivory/65">{text}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to="/contact" data-testid={`${testId}-start`} className="btn btn-light">
            Start Your Project
          </Link>
          <a href={telLink()} data-testid={`${testId}-call`} className="btn btn-outline-light">
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> Call {site.name}
          </a>
          {site.whatsapp.enabled && (
            <a href={waLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" data-testid={`${testId}-whatsapp`} className="btn btn-outline-light">
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp Us
            </a>
          )}
        </div>
      </Reveal>
    </div>
  </section>
);
