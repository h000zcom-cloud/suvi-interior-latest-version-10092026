import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { site } from "@/content/site";
import { directionsLink, mapEmbedUrl, telLink, waLink } from "@/lib/contact";

export const Studio = ({ index = "08" }) => (
  <section id="studio" data-testid="studio-section" className="scroll-mt-24 border-t border-line">
    <div className="container-x section grid gap-14 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="label flex items-center gap-4 text-taupe">
            <span className="text-burgundy">{index}</span> The Studio
          </p>
        </Reveal>
        <SplitLines inView as="h2" delay={0.1} lines={["Visit us", "in Nashik."]} className="h-section mt-8" />
        <Reveal delay={0.2} className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <address className="text-[15px] not-italic leading-relaxed" data-testid="studio-address">
            <span className="block font-medium">{site.name}</span>
            {site.address.lines.map((l) => (
              <span key={l} className="block text-taupe">
                {l}
              </span>
            ))}
          </address>
          <div>
            <p className="label text-taupe">Phone</p>
            <a href={telLink()} data-testid="studio-phone" className="link-underline mt-2 inline-block font-display text-3xl tracking-tight hover:text-burgundy">
              {site.phone.display}
            </a>
            {site.hours.length > 0 && (
              <ul className="mt-6 text-sm text-taupe">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-6 border-t border-line py-2">
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
          <a href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="studio-directions" className="btn-text">
            Get directions <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a href={telLink()} data-testid="studio-call" className="arrow-link text-charcoal">
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> Call
          </a>
          {site.whatsapp.enabled && (
            <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="studio-whatsapp" className="arrow-link text-charcoal">
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
            </a>
          )}
        </Reveal>

        {site.googleReviews.enabled && (
          <Reveal delay={0.35} className="mt-12 border-t border-line pt-6" data-testid="google-reviews">
            <p className="font-display text-5xl leading-none">
              {site.googleReviews.rating} <span className="text-2xl text-taupe">/ 5</span>
            </p>
            <p className="label mt-3 text-taupe">Google Reviews{site.googleReviews.count ? ` · ${site.googleReviews.count} reviews` : ""}</p>
            {site.googleReviews.url && (
              <a href={site.googleReviews.url} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block text-sm">
                Read reviews on Google
              </a>
            )}
          </Reveal>
        )}
      </div>

      <Reveal delay={0.2} className="lg:col-span-6 lg:col-start-7">
        <div className="relative overflow-hidden border border-line bg-sand" style={{ aspectRatio: "16 / 11" }}>
          <iframe title="Suvi Interior location map" src={mapEmbedUrl()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="map-frame absolute inset-0 h-full w-full border-0" data-testid="studio-map" />
          <div className="pointer-events-none absolute inset-0 border-[10px] border-ivory sm:border-[14px]" aria-hidden="true" />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-xs text-taupe">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-burgundy" strokeWidth={1.5} /> Opp. Rajat Park, Ambad–Uttam Nagar Road, Nashik 422010
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);
