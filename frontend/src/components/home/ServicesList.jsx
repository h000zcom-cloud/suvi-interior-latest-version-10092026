import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/motion/Picture";
import { SectionHead } from "@/components/ui-custom/SectionHead";
import { services } from "@/content/services";
import { imgUrl, srcSetFor } from "@/lib/images";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DesktopList = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="hidden gap-8 lg:grid lg:grid-cols-12">
      <ul className="lg:col-span-7 border-t border-line" onMouseLeave={() => setActive(active)}>
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              to={`/services#${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-testid={`service-row-${s.slug}`}
              className="group flex items-center gap-8 py-7"
            >
              <span className={cn("label w-6 shrink-0 transition-colors duration-500", active === i ? "text-burgundy" : "text-taupe")}>{s.number}</span>
              <span className={cn("font-display text-[clamp(1.75rem,3.2vw,2.75rem)] uppercase leading-none tracking-[-0.01em] transition-[transform,color] duration-700 ease-out group-hover:translate-x-3", active === i ? "text-charcoal" : "text-charcoal/50")}>
                {s.title}
              </span>
              <span className={cn("ml-auto hidden max-w-[220px] text-right text-xs leading-relaxed text-taupe transition-opacity duration-500 xl:block", active === i ? "opacity-100" : "opacity-0")}>{s.short}</span>
              <ArrowUpRight className={cn("h-5 w-5 shrink-0 transition-[transform,opacity,color] duration-500 ease-out", active === i ? "translate-x-0 opacity-100 text-burgundy" : "-translate-x-2 opacity-0")} strokeWidth={1.25} />
            </Link>
          </li>
        ))}
      </ul>

      <div className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28 self-start">
        <div className="relative overflow-hidden bg-sand" style={{ aspectRatio: "4 / 5" }} data-testid="services-preview">
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
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
        </div>
        <div className="mt-4 flex items-start justify-between gap-6 border-t border-line pt-4">
          <p className="label text-burgundy">{services[active].number}</p>
          <p className="label text-taupe">{services[active].title}</p>
        </div>
      </div>
    </div>
  );
};

const MobileAccordion = () => {
  const [open, setOpen] = useState(0);
  return (
    <ul className="border-t border-line lg:hidden" data-testid="services-accordion">
      {services.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.slug} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`service-panel-${s.slug}`}
              id={`service-tab-${s.slug}`}
              data-testid={`service-toggle-${s.slug}`}
              className="flex min-h-[64px] w-full items-center gap-5 py-4 text-left"
            >
              <span className={cn("label w-6 shrink-0", isOpen ? "text-burgundy" : "text-taupe")}>{s.number}</span>
              <span className={cn("font-display text-[clamp(1.375rem,6vw,2rem)] uppercase leading-[0.95] tracking-[-0.01em] transition-colors duration-300", isOpen ? "text-charcoal" : "text-charcoal/70")}>{s.title}</span>
              <Plus className={cn("ml-auto h-4 w-4 shrink-0 text-taupe transition-transform duration-500 ease-out", isOpen && "rotate-45 text-burgundy")} strokeWidth={1.5} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`service-panel-${s.slug}`}
                  role="region"
                  aria-labelledby={`service-tab-${s.slug}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-7 pl-11">
                    <Picture image={s.image} ratio="4 / 3" sizes="100vw" />
                    <p className="mt-5 text-sm leading-relaxed text-taupe">{s.short}</p>
                    <Link to={`/services#${s.slug}`} data-testid={`service-row-${s.slug}`} className="btn-text mt-5">
                      Learn more <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
};

export const ServicesList = () => (
  <section data-testid="services-section" className="border-t border-line bg-soft">
    <div className="container-x section">
      <SectionHead
        index="03"
        label="What we design"
        title={<>Kitchens, furniture &amp; <span className="italic normal-case">complete</span> interiors</>}
        titleClassName="max-w-3xl"
        action={
          <Link to="/services" data-testid="services-all-link" className="btn-text">
            All services <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        }
      />
      <Reveal className="mt-14 lg:mt-20">
        <DesktopList />
        <MobileAccordion />
      </Reveal>
    </div>
  </section>
);
