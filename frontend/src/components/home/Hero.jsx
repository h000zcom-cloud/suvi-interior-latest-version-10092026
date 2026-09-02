import { useRef } from "react";
import { Link } from "react-router-dom";
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
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(mx, [-0.5, 0.5], ["-1.2%", "1.2%"]), { stiffness: 40, damping: 22 });
  const tiltY = useSpring(useTransform(my, [-0.5, 0.5], ["-0.8%", "0.8%"]), { stiffness: 40, damping: 22 });

  const onMove = (e) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={ref} onMouseMove={onMove} data-testid="hero" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-night text-ivory">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
        <motion.div className="absolute -inset-[2.5%]" style={reduce ? undefined : { x: tiltX, y: tiltY }}>
          <motion.img
            src={heroImage.src}
            alt={heroImage.alt}
            fetchPriority="high"
            decoding="async"
            initial={reduce ? false : { scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: EASE, delay: Math.max(introDelay - 0.5, 0) }}
            className="h-full w-full object-cover object-[62%_center] sm:object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-night/40 sm:bg-night/30" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night/75 via-night/30 to-transparent" aria-hidden="true" />
      </motion.div>

      <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="container-x relative z-10 flex h-full flex-col justify-end pb-24 sm:pb-20 lg:pb-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: introDelay + 0.2 }} className="label mb-6 text-ivory/70">
          Interior Design &amp; Furniture
          <span className="hidden sm:inline">
            <span className="mx-3 text-ivory/30">/</span> {site.city}, {site.region}
          </span>
        </motion.p>

        <SplitLines
          as="h1"
          delay={introDelay}
          lines={["Interiors", "that feel", <>like <span className="italic normal-case tracking-normal">home.</span></>]}
          className="font-display text-[14vw] uppercase leading-[0.88] tracking-[-0.015em] sm:text-[11vw] lg:text-[8.6vw] xl:text-[8vw]"
        />

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: introDelay + 0.45 }} className="max-w-md text-sm leading-relaxed text-ivory/80 sm:text-base lg:col-span-5">
            Thoughtfully designed interiors and custom furniture crafted around the way you live.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: introDelay + 0.55 }} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-7 lg:justify-end">
            <Link to="/projects" data-testid="hero-primary-cta" className="btn btn-light w-full sm:w-auto">
              Explore Our Work
            </Link>
            <Link to="/contact" data-testid="hero-secondary-cta" className="btn btn-outline-light w-full sm:w-auto">
              Start a Project
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: introDelay + 1 }} data-testid="scroll-indicator" className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 text-ivory/60 sm:right-8 lg:right-14 lg:flex xl:right-20" aria-hidden="true">
        <span className="label [writing-mode:vertical-rl]">Scroll</span>
        <span className="block h-16 w-px overflow-hidden bg-ivory/20">
          <span className="block h-full w-full origin-top animate-scrollline bg-ivory" />
        </span>
      </motion.div>
    </section>
  );
};
