import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SplitLines } from "@/components/motion/Reveal";
import { heroImage } from "@/content/images";
import { site } from "@/content/site";
import { introDelay } from "@/lib/intro";
import { EASE } from "@/lib/motion";

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
    <section ref={ref} onMouseMove={onMove} data-testid="hero" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal text-ivory">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
        <motion.div className="absolute -inset-[2%]" style={reduce ? undefined : { x: tiltX, y: tiltY }}>
          <motion.img
            src={heroImage.src}
            alt={heroImage.alt}
            fetchPriority="high"
            decoding="async"
            initial={reduce ? false : { scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: EASE, delay: Math.max(introDelay - 0.5, 0) }}
            className="h-full w-full object-cover object-[78%_center] sm:object-[60%_center] lg:object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal/45 sm:bg-charcoal/30" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-charcoal/80 via-charcoal/35 to-transparent sm:h-1/2" aria-hidden="true" />
      </motion.div>

      <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="container-x relative z-10 flex h-full flex-col justify-end pb-24 sm:pb-16 lg:pb-20">
        <motion.p {...enter(0.15)} className="label mb-7 flex items-center gap-4 text-ivory/80" data-testid="hero-meta">
          <span className="h-px w-8 bg-brass" aria-hidden="true" />
          {site.city} · {site.region}
        </motion.p>

        <SplitLines
          as="h1"
          delay={introDelay}
          lines={["Interiors", "that feel", <>like <span className="italic normal-case tracking-normal">home.</span></>]}
          className="h-display text-[clamp(2.75rem,12vw,7.5rem)]"
        />

        <div className="mt-10 grid items-end gap-8 lg:mt-12 lg:grid-cols-12">
          <motion.p {...enter(0.45)} className="max-w-md text-base leading-relaxed text-ivory/85 md:text-[17px] lg:col-span-5">
            Thoughtfully designed interiors, crafted around the way you live.
          </motion.p>
          <motion.div {...enter(0.55)} className="flex flex-wrap items-center gap-x-10 gap-y-5 lg:col-span-7 lg:justify-end">
            <Link to="/projects" data-testid="hero-primary-cta" className="btn-text-light text-[12px]">
              Explore Projects <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link to="/contact" data-testid="hero-secondary-cta" className="btn-outline-light">
              Start a Project
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: introDelay + 1 }} data-testid="scroll-indicator" className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 text-ivory/60 sm:right-8 lg:right-14 lg:flex xl:right-20" aria-hidden="true">
        <span className="label [writing-mode:vertical-rl]">Scroll</span>
        <span className="block h-16 w-px overflow-hidden bg-ivory/20">
          <span className="block h-full w-full origin-top animate-scrollline bg-brass" />
        </span>
      </motion.div>
    </section>
  );
};
