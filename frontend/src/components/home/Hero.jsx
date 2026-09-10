import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SplitLines } from "@/components/motion/Reveal";
import { heroImage } from "@/content/images";
import { site } from "@/content/site";
import { introDelay } from "@/lib/intro";
import { EASE } from "@/lib/motion";

const facets = ["Interior Design", "Furniture Manufacturing", "Installation"];

export const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(mx, [-0.5, 0.5], ["-1%", "1%"]), { stiffness: 40, damping: 22 });
  const tiltY = useSpring(useTransform(my, [-0.5, 0.5], ["-0.6%", "0.6%"]), { stiffness: 40, damping: 22 });

  const onMove = (e) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const enter = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: introDelay + delay },
  });

  return (
    <section ref={ref} onMouseMove={onMove} data-testid="hero" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-night text-ivory">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
        <motion.div className="absolute -inset-[2%]" style={reduce ? undefined : { x: tiltX, y: tiltY }}>
          <motion.img
            src={heroImage.src}
            alt={heroImage.alt}
            fetchPriority="high"
            decoding="async"
            initial={reduce ? false : { scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: EASE, delay: Math.max(introDelay - 0.5, 0) }}
            className="h-full w-full object-cover object-[78%_center] sm:object-[60%_center] lg:object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-night/40 sm:bg-night/30" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-night/85 via-night/40 to-transparent sm:h-[55%]" aria-hidden="true" />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: introDelay + 0.6 }} className="frame-inset hidden sm:block" aria-hidden="true" />

      <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="container-x relative z-10 flex h-full flex-col justify-end pb-[calc(env(safe-area-inset-bottom)+6.5rem)] sm:pb-20 lg:pb-24">
        <motion.p {...enter(0.15)} className="label mb-7 flex items-center gap-4 text-ivory/75" data-testid="hero-meta">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {site.city} · {site.region}
        </motion.p>

        <SplitLines
          as="h1"
          delay={introDelay}
          lines={["Interiors that", "feel like", <span className="italic text-brass">home.</span>]}
          className="h-display text-[clamp(3.25rem,min(12vw,16svh),8rem)]"
        />

        <div className="mt-10 grid items-end gap-8 lg:mt-12 lg:grid-cols-12">
          <motion.p {...enter(0.45)} className="max-w-md text-base leading-[1.7] text-ivory/80 md:text-[17px] lg:col-span-5">
            A design and furniture studio in Nashik. We draw the home, then make every piece in it — so what you imagine is exactly what arrives.
          </motion.p>
          <motion.div {...enter(0.55)} className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-7 lg:justify-end">
            <Link to="/contact" data-testid="hero-secondary-cta" className="btn-gold">
              Start a Project
            </Link>
            <Link to="/brochure" data-testid="hero-primary-cta" className="btn-text-light text-[11px]">
              View the Brochure <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        <motion.ul {...enter(0.75)} className="mt-12 hidden items-center gap-6 border-t border-ivory/15 pt-5 lg:[@media(min-height:880px)]:flex" aria-label="What we do">
          {facets.map((f, i) => (
            <li key={f} className="label flex items-center gap-6 text-ivory/55">
              {i > 0 && <span className="h-1 w-1 rotate-45 bg-brass/70" aria-hidden="true" />}
              {f}
            </li>
          ))}
        </motion.ul>
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
