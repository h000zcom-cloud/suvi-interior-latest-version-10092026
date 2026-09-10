import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SplitLines } from "@/components/motion/Reveal";
import { heroImage, introPortrait, img } from "@/content/images";
import { site } from "@/content/site";
import { imgUrl, srcSetFor } from "@/lib/images";
import { introDelay } from "@/lib/intro";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SLIDES = [
  { image: heroImage, title: "Living Spaces", caption: "Walnut media wall · linen & brass", pos: "object-[78%_center] sm:object-[60%_center] lg:object-center" },
  { image: img.kitchenWoodDark, title: "Modular Kitchens", caption: "Oak cabinetry · stone worktop", pos: "object-center" },
  { image: introPortrait, title: "Bedroom Interiors", caption: "Slatted headboard wall · soft light", pos: "object-[center_35%]" },
];
const INTERVAL = 6800;
const facets = ["Interior Design", "Furniture Manufacturing", "Installation"];

export const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), introDelay * 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [started, reduce, active]);

  const enter = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: introDelay + delay },
  });

  return (
    <section ref={ref} data-testid="hero" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-night text-ivory">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.title}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0 }}
            transition={{ duration: 1.6, ease: EASE }}
            aria-hidden={active !== i}
          >
            <motion.img
              src={imgUrl(s.image, 1920)}
              srcSet={srcSetFor(s.image)}
              sizes="100vw"
              alt={s.image.alt}
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              initial={false}
              animate={{ scale: active === i && started && !reduce ? 1.09 : 1 }}
              transition={{ duration: active === i ? (INTERVAL + 1800) / 1000 : 1.6, ease: "linear" }}
              className={cn("h-full w-full object-cover will-change-transform", s.pos)}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-night/40 sm:bg-night/30" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-night/85 via-night/40 to-transparent sm:h-[55%]" aria-hidden="true" />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: introDelay + 0.6 }} className="frame-inset hidden sm:block" aria-hidden="true" />

      <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="container-x relative z-10 flex h-full flex-col justify-end pb-[calc(env(safe-area-inset-bottom)+6rem)] sm:pb-16 lg:pb-16">
        <motion.p {...enter(0.15)} className="label mb-5 flex items-center gap-4 text-ivory/75" data-testid="hero-meta">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {site.city} · {site.region}
        </motion.p>

        <SplitLines
          as="h1"
          delay={introDelay}
          lines={["Interiors that", "feel like", <span className="italic text-brass">home.</span>]}
          className="h-display text-[clamp(3.25rem,min(12vw,13.5svh),8rem)]"
        />

        <div className="mt-8 grid items-end gap-8 lg:mt-10 lg:grid-cols-12">
          <motion.p {...enter(0.45)} className="max-w-md text-base leading-[1.7] text-ivory/80 md:text-[17px] lg:col-span-5">
            A design and furniture studio in Nashik. We draw the home, then make every piece in it — so what you imagine is exactly what arrives.
          </motion.p>
          <motion.div {...enter(0.55)} className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-7 lg:justify-end">
            <Link to="/contact" data-testid="hero-secondary-cta" className="btn-brand">
              Start a Project
            </Link>
            <Link to="/brochure" data-testid="hero-primary-cta" className="btn-text-light text-[11px]">
              View the Brochure <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        <motion.div {...enter(0.75)} className="mt-8 flex flex-col gap-5 border-t border-ivory/15 pt-5 sm:flex-row sm:items-center sm:justify-between lg:mt-10" data-testid="hero-slides">
          <ul className="hidden items-center gap-6 lg:[@media(min-height:880px)]:flex" aria-label="What we do">
            {facets.map((f, i) => (
              <li key={f} className="label flex items-center gap-6 text-ivory/55">
                {i > 0 && <span className="h-1 w-1 rotate-45 bg-brass/70" aria-hidden="true" />}
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6 sm:ml-auto">
            <AnimatePresence mode="wait">
              <motion.p key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.5, ease: EASE }} className="label text-ivory/70" data-testid="hero-slide-caption">
                <span className="text-brass">0{active + 1}</span> <span className="mx-2 text-ivory/30">/</span> {SLIDES[active].title}
                <span className="hidden text-ivory/45 md:inline"> · {SLIDES[active].caption}</span>
              </motion.p>
            </AnimatePresence>
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Show ${s.title}`}
                  data-testid={`hero-slide-${i}`}
                  onClick={() => setActive(i)}
                  className="group flex h-6 items-center"
                >
                  <span className={cn("relative block h-px overflow-hidden bg-ivory/25 transition-[width] duration-500", active === i ? "w-12" : "w-6 group-hover:bg-ivory/50")}>
                    {active === i && started && (
                      <span key={`${i}-${active}`} className={cn("absolute inset-0 origin-left bg-brass", !reduce && "animate-fillbar")} style={{ animationDuration: `${INTERVAL}ms` }} />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: introDelay + 1 }} data-testid="scroll-indicator" className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 text-ivory/55 sm:right-8 lg:right-14 lg:flex xl:right-20" aria-hidden="true">
        <span className="label [writing-mode:vertical-rl]">Scroll</span>
        <span className="block h-16 w-px overflow-hidden bg-ivory/20">
          <span className="block h-full w-full origin-top animate-scrollline bg-brass" />
        </span>
      </motion.div>
    </section>
  );
};
