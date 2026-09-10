import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { Picture } from "@/components/motion/Picture";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { waLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const ServiceSection = ({ s, index }) => {
  const flip = index % 2 === 1;
  return (
    <section id={s.slug} data-testid={`service-section-${s.slug}`} className="scroll-mt-24 border-t border-line">
      <div className="container-x grid items-start gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12">
        <div className={cn("lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
          <Reveal>
            <Picture image={s.image} ratio="4 / 5" sizes="(min-width: 1024px) 50vw, 100vw" className="service-photo" />
          </Reveal>
          <p className="atelier-caption"><span>Suvi / {s.title}</span><span>Representative interior</span></p>
        </div>

        <div className={cn("flex flex-col lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
          <Reveal>
            <p className="editorial-label text-oxblood">{s.number} / Design &amp; make</p>
          </Reveal>
          <SplitLines as="h2" lines={[s.title]} className="editorial-heading mt-7 !text-4xl md:!text-5xl" data-testid={`service-heading-${s.slug}`} />
          <Reveal delay={0.2} className="mt-8">
            <p className="lede">{s.description}</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="label text-taupe">Key features</p>
              <ul className="mt-4 border-t border-line">
                {s.features.map((f) => (
                  <li key={f} className="border-b border-line py-3 text-sm">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-taupe">Ideal for</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-charcoal/80">
                {s.idealFor.map((f) => (
                  <li key={f} className="border-b border-charcoal/30 pb-0.5">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
            <Link to={`/contact?type=${encodeURIComponent(s.projectType)}`} data-testid={`service-cta-${s.slug}`} className="btn-brand">
              Start a Project <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            {site.whatsapp.enabled && (
              <a href={waLink(`Hi Suvi Interior, I'm interested in ${s.title.toLowerCase()} for my home and would like to discuss.`)} target="_blank" rel="noopener noreferrer" data-testid={`service-whatsapp-${s.slug}`} className="arrow-link text-charcoal">
                <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default function Services() {
  const { hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) return;
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    // Measure the newly rendered route before scrolling. Its height may not
    // yet be reflected in Lenis's cached dimensions on first navigation.
    const frame = requestAnimationFrame(() => {
      const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      if (lenis) {
        lenis.resize();
        // A numeric destination avoids applying scroll-margin twice and uses
        // the browser's actual position rather than a stale animated position.
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        lenis.scrollTo(top, { immediate: true, force: true });
      } else {
        el.scrollIntoView({ block: "start", behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, lenis]);

  return (
    <PageWrap theme="light" testId="services-page">
      <Seo title="Interior Design & Modular Furniture Services in Nashik" description="Modular kitchens, living spaces, bedroom interiors, TV & wall systems, custom furniture and complete home interiors — designed and manufactured by Suvi Interior in Nashik." path="/services" crumbs={CRUMBS} />
      <PageHero label="02 / Design & make" lines={["Made for", <em>real living.</em>]} text="From one beautifully resolved piece to a home that works as a whole. Six ways to work with Suvi." />

      <section className="container-x py-10 md:py-14">
        <Reveal>
          <ol className="grid gap-x-8 gap-y-5 grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`#${s.slug}`} data-testid={`service-index-${s.slug}`} className="group block">
                  <Picture image={s.image} ratio="16 / 8" sizes="(min-width:1024px) 30vw,48vw" className="editorial-image" />
                  <span className="service-index-link"><span className="flex items-center gap-3"><span className="text-[10px] text-oxblood/60">{s.number}</span>{s.title}</span><ArrowRight className="hidden h-4 w-4 shrink-0 sm:block" /></span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <div className="service-catalogue">{services.map((s, i) => (
        <ServiceSection key={s.slug} s={s} index={i} />
      ))}</div>

      <CtaBand lines={["Not sure", "where to", "begin?"]} text="Tell us what you have in mind and we'll help you find the right starting point." />
    </PageWrap>
  );
}
