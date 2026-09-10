import { useSearchParams } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { site } from "@/content/site";
import { directionsLink, mapEmbedUrl, telLink, waLink } from "@/lib/contact";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function Contact() {
  const [params] = useSearchParams();
  const preset = params.get("type");

  return (
    <PageWrap theme="dark" testId="contact-page">
      <Seo title="Contact — Start Your Interior Project in Nashik" description={`Contact Suvi Interior in Nashik. Call ${site.phone.display}, WhatsApp us or request a consultation for modular kitchens, custom furniture and complete home interiors.`} path="/contact" crumbs={CRUMBS} />

      <section className="container-x pt-32 pb-14 md:pt-44 md:pb-20">
        <Reveal>
          <p className="label flex items-center gap-4 text-taupe"><span className="h-px w-8 bg-burgundy" />Contact</p>
        </Reveal>
        <SplitLines as="h1" delay={0.15} lines={["Let's talk", "about your", "space."]} className="h-display mt-7" />
      </section>

      <section className="container-x grid gap-16 pb-20 md:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal delay={0.3}>
            <p className="font-display text-3xl leading-none tracking-[-0.01em]">{site.name}</p>
            <p className="mt-2 text-sm text-taupe">
              {site.city} · {site.region}
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mt-10">
            <p className="label text-taupe">Phone</p>
            <a href={telLink()} data-testid="contact-phone" className="link-underline mt-3 inline-block font-display text-3xl tracking-tight hover:text-burgundy sm:text-4xl">
              {site.phone.display}
            </a>
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <p className="label text-taupe">Studio</p>
            <address className="mt-3 text-[15px] not-italic leading-relaxed text-charcoal/85" data-testid="contact-address">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </Reveal>
          {site.email && (
            <Reveal delay={0.42} className="mt-10">
              <p className="label text-taupe">Email</p>
              <a href={`mailto:${site.email}`} className="link-underline mt-3 inline-block text-sm">
                {site.email}
              </a>
            </Reveal>
          )}
          {site.hours.length > 0 && (
            <Reveal delay={0.44} className="mt-10">
              <p className="label text-taupe">Hours</p>
              <ul className="mt-3 text-sm">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-6 border-t border-line py-2">
                    <span>{h.days}</span>
                    <span className="text-taupe">{h.time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={0.45} className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8">
            <a href={telLink()} data-testid="contact-call-button" className="btn-text">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> Call now
            </a>
            {site.whatsapp.enabled && (
              <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-button" className="btn-text">
                <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
              </a>
            )}
            <a href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="contact-directions-button" className="btn-text">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> Get directions
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.35} className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-line pt-8">
            <p className="label text-taupe">Enquiry</p>
            <h2 className="h-sub mt-4">Request a consultation</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-taupe">Share a few details and we'll get back to you to arrange a conversation about your space.</p>
          </div>
          <div className="mt-10">
            <EnquiryForm presetType={preset} />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-sand" aria-label="Location">
        <div className="container-x grid gap-10 py-20 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label text-taupe">Find us</p>
            <p className="h-sub mt-6">
              Opp. Rajat Park, Ambad–Uttam Nagar Road
            </p>
            <p className="mt-6 text-sm leading-relaxed text-taupe">Pandhari Mala, Shree Kulswamini Business Centre, Nashik 422010.</p>
            <a href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="map-directions" className="btn-text mt-8">
              Open in Google Maps <MapPin className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
            <div className="relative overflow-hidden border border-line bg-sand" style={{ aspectRatio: "16 / 9" }}>
              <iframe title="Suvi Interior on Google Maps" src={mapEmbedUrl()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="map-frame absolute inset-0 h-full w-full border-0" data-testid="contact-map" />
              <div className="pointer-events-none absolute inset-0 border-[10px] border-sand sm:border-[14px]" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrap>
  );
}
