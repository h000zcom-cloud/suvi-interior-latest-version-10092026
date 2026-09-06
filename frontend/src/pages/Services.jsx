import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage, Picture } from "@/components/motion/Picture";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { WhatsAppIcon } from "@/components/ui-custom/WhatsAppIcon";
import { services } from "@/content/services";
import { img } from "@/content/images";
import { site } from "@/content/site";
import { waLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const ServiceSection = ({ s, index }) => {
  const flip = index % 2 === 1;
  const portrait = index % 3 === 2;
  return (
    <section id={s.slug} data-testid={`service-section-${s.slug}`} className="scroll-mt-24 border-t border-line">
      <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
        <div className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
          <Reveal>
            <ParallaxImage image={s.image} ratio={portrait ? "4 / 5" : "16 / 11"} sizes="(min-width: 1024px) 58vw, 100vw" strength={6} />
          </Reveal>
          {s.secondary && (
            <Reveal delay={0.15} className={cn("mt-6 hidden w-1/2 lg:block", flip ? "ml-auto" : "")}>
              <Picture image={s.secondary} ratio="4 / 3" sizes="30vw" />
            </Reveal>
          )}
        </div>

        <div className={cn("flex flex-col lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
          <Reveal>
            <p className="font-display text-6xl leading-none text-burgundy/80 md:text-7xl">{s.number}</p>
          </Reveal>
          <SplitLines inView as="h2" delay={0.1} lines={s.title.split(" & ").length > 1 ? s.title.split(" & ").map((t, i) => (i === 0 ? `${t} &` : t)) : [s.title]} className="h-section mt-8 text-[clamp(2rem,4.2vw,3.5rem)]" />
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
            <Link to={`/contact?type=${encodeURIComponent(s.projectType)}`} data-testid={`service-cta-${s.slug}`} className="btn-text">
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
    const el = document.querySelector(hash);
    if (!el) return;
    const t = setTimeout(() => {
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ block: "start" });
    }, 350);
    return () => clearTimeout(t);
  }, [hash, lenis]);

  return (
    <PageWrap theme="light" testId="services-page">
      <Seo title="Interior Design & Modular Furniture Services in Nashik" description="Modular kitchens, living spaces, bedroom interiors, TV & wall systems, custom furniture and complete home interiors — designed and manufactured by Suvi Interior in Nashik." path="/services" crumbs={CRUMBS} />
      <PageHero label="Services" lines={["What we", "design & make"]} image={img.kitchenWoodDark} text="Interior design and furniture manufacturing under one roof — from a single TV unit to a complete home." />

      <section className="container-x section-sm">
        <Reveal>
          <ol className="grid gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} data-testid={`service-index-${s.slug}`} className="group flex min-h-[44px] items-baseline gap-4 py-2">
                  <span className="label text-burgundy">{s.number}</span>
                  <span className="link-underline font-display text-xl uppercase leading-none tracking-[-0.01em] sm:text-2xl">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {services.map((s, i) => (
        <ServiceSection key={s.slug} s={s} index={i} />
      ))}

      <CtaBand lines={["Not sure", "where to", "begin?"]} text="Tell us what you have in mind and we'll help you find the right starting point." />
    </PageWrap>
  );
}
