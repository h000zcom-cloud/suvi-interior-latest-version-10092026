import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { SplitLines, Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";

export const CtaBand = ({
  lines = ["Let's create", "a space", "that feels", "like yours."],
  text = "Tell us about your space, your vision and what you want it to feel like.",
  primaryLabel = "Start a Project",
  whatsappMessage,
  testId = "final-cta",
}) => (
  <section data-testid={testId} className="bg-charcoal text-ivory">
    <div className="container-x section grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Reveal>
          <p className="label flex items-center gap-4 text-ivory/55"><span className="h-px w-8 bg-brass" />Begin</p>
        </Reveal>
        <SplitLines inView as="h2" lines={lines} delay={0.1} className="h-display mt-8 text-[clamp(2.75rem,9vw,6.5rem)]" />
      </div>
      <Reveal delay={0.25} className="flex flex-col justify-end gap-10 lg:col-span-4 lg:col-start-9">
        <p className="max-w-sm text-base leading-relaxed text-ivory/70">{text}</p>
        <div className="flex flex-col items-start gap-6">
          <Link to="/contact" data-testid={`${testId}-start`} className="btn-text-light text-[12px]">
            {primaryLabel} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-night-line pt-6">
            <a href={telLink()} data-testid={`${testId}-call`} className="arrow-link text-ivory/75 hover:text-brass">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> {site.phone.display}
            </a>
            {site.whatsapp.enabled && (
              <a href={waLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" data-testid={`${testId}-whatsapp`} className="arrow-link text-ivory/75 hover:text-brass">
                <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
