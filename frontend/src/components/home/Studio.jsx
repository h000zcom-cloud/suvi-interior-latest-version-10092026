import { Phone, MapPin } from "lucide-react";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { site } from "@/content/site";
import { directionsLink, mapEmbedUrl, telLink, waLink } from "@/lib/contact";

export const Studio = ({ compact = false }) => (
  <section data-testid="studio-section" className="border-t border-line">
    <div className="container-x grid gap-12 py-24 md:py-32 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="label text-taupe">The Studio</p>
        </Reveal>
        {!compact && (
          <SplitLines inView as="h2" delay={0.1} lines={["Visit us", "in Nashik."]} className="mt-6 font-display text-[11vw] uppercase leading-[0.9] tracking-[-0.015em] sm:text-6xl lg:text-7xl" />
        )}
        <Reveal delay={0.2} className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <address className="text-base not-italic leading-relaxed" data-testid="studio-address">
            <span className="block font-medium">{site.name}</span>
            {site.address.lines.map((l) => (
              <span key={l} className="block text-taupe">
                {l}
              </span>
            ))}
          </address>
          <div>
            <a href={telLink()} data-testid="studio-phone" className="link-underline font-display text-3xl tracking-tight">
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
        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
          <a href={telLink()} data-testid="studio-call" className="btn btn-solid">
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> Call Now
          </a>
          {site.whatsapp.enabled && (
            <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="studio-whatsapp" className="btn btn-outline">
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
            </a>
          )}
          <a href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="studio-directions" className="btn btn-outline">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> Get Directions
          </a>
        </Reveal>

        {site.googleReviews.enabled && (
          <Reveal delay={0.35} className="mt-14 border-t border-line pt-6" data-testid="google-reviews">
            <p className="font-display text-5xl leading-none">
              {site.googleReviews.rating} <span className="text-2xl text-taupe">/ 5</span>
            </p>
            <p className="label mt-3 text-taupe">
              Google Reviews{site.googleReviews.count ? ` · ${site.googleReviews.count} reviews` : ""}
            </p>
            {site.googleReviews.url && (
              <a href={site.googleReviews.url} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block text-sm">
                Read reviews on Google
              </a>
            )}
          </Reveal>
        )}
      </div>

      <Reveal delay={0.2} className="lg:col-span-6 lg:col-start-7">
        <div className="relative overflow-hidden border border-line bg-ivory-2" style={{ aspectRatio: "16 / 11" }}>
          <iframe
            title="Suvi Interior location map"
            src={mapEmbedUrl()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-frame absolute inset-0 h-full w-full border-0"
            data-testid="studio-map"
          />
        </div>
        <p className="mt-4 text-xs text-taupe">Opp. Rajat Park, Ambad–Uttam Nagar Road, Nashik 422010</p>
      </Reveal>
    </div>
  </section>
);
