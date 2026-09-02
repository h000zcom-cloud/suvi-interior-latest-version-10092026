import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui-custom/SectionHead";
import { ArrowLink } from "@/components/ui-custom/ArrowLink";
import { services } from "@/content/services";
import { imgUrl, srcSetFor } from "@/lib/images";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const ServicesList = () => {
  const [active, setActive] = useState(0);

  return (
    <section data-testid="services-section" className="border-t border-line">
      <div className="container-x py-24 md:py-32">
        <SectionHead label="Services" title={<>What we <span className="italic normal-case">design</span> &amp; make</>} action={<ArrowLink to="/services" data-testid="services-all-link">All services</ArrowLink>} />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ul className="border-t border-line">
              {services.map((s, i) => (
                <li key={s.slug} className="border-b border-line">
                  <Link
                    to={`/services#${s.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-testid={`service-row-${s.slug}`}
                    className="group flex items-baseline gap-5 py-6 sm:gap-8 md:py-8"
                  >
                    <span className="label w-6 shrink-0 text-taupe">{s.number}</span>
                    <span className={cn("font-display text-[6.8vw] uppercase leading-[0.95] tracking-[-0.01em] transition-[transform,color] duration-700 ease-out sm:text-4xl md:text-5xl group-hover:translate-x-3", active === i ? "text-charcoal" : "text-charcoal/80 lg:text-charcoal/55")}>
                      {s.title}
                    </span>
                    <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 -translate-x-2 self-center opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.25} />
                  </Link>
                  <p className="pb-6 pl-11 pr-6 text-sm leading-relaxed text-taupe sm:pl-14 lg:hidden">{s.short}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="hidden self-start lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:block">
            <div className="relative overflow-hidden bg-ivory-2" style={{ aspectRatio: "4 / 5" }} data-testid="services-preview">
              {services.map((s, i) => (
                <motion.img
                  key={s.slug}
                  src={imgUrl(s.image, 1080)}
                  srcSet={srcSetFor(s.image)}
                  sizes="33vw"
                  alt={s.image.alt}
                  loading="lazy"
                  decoding="async"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.06 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
            </div>
            <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
              <p className="label text-taupe">{services[active].number}</p>
              <p className="max-w-xs text-sm leading-relaxed text-taupe">{services[active].short}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
