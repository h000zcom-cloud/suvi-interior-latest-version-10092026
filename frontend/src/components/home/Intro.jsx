import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { introPortrait } from "@/content/images";
import { site } from "@/content/site";
import { EASE, VIEWPORT } from "@/lib/motion";

const pillars = [
  { n: "01", title: "Design", text: "Concept, space planning and material direction." },
  { n: "02", title: "Make", text: "Furniture manufactured in our own workshop." },
  { n: "03", title: "Install", text: "Fitted, finished and handed over by the same team." },
];

export const Intro = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section ref={ref} data-testid="intro-section" className="container-x section relative">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7 lg:pl-10">
          <span className="absolute -left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-line lg:block" aria-hidden="true">
            <motion.span className="block w-full origin-top bg-oxblood" style={reduce ? { height: "100%" } : { height: lineH }} />
          </span>
          <Reveal>
            <p className="label flex items-center gap-4 text-taupe">
              <span className="text-oxblood">01</span> The Studio <span className="text-line">/</span> {site.city}
            </p>
          </Reveal>
          <SplitLines inView as="h2" delay={0.1} lines={["Designing", "spaces that", <span className="italic">feel like you.</span>]} className="h-display mt-8 text-[clamp(2.75rem,8vw,6.5rem)]" />
          <Reveal delay={0.25} className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14">
            <p className="lede">
              Suvi Interior is an interior design and furniture studio in Nashik. We design homes and make the furniture that goes into them — modular kitchens, wardrobes, TV units, cabinets and complete interiors.
            </p>
            <div className="flex flex-col items-start gap-6">
              <p className="lede">Because design and making happen under one roof, what is drawn is what gets built — to the millimetre, in the finish you chose.</p>
              <Link to="/about" data-testid="intro-about-link" className="btn-text">
                About the studio <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>

          <ol className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:mt-20" data-testid="intro-pillars">
            {pillars.map((p, i) => (
              <motion.li
                key={p.n}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
                className="group relative pt-5"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true">
                  <motion.span className="block h-full origin-left bg-oxblood" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VIEWPORT} transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.12 }} />
                </span>
                <div className="flex items-baseline gap-4">
                  <span className="label text-oxblood">{p.n}</span>
                  <h3 className="font-display text-3xl font-light leading-none transition-transform duration-500 ease-out group-hover:translate-x-1">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-taupe">{p.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:pt-24">
          <motion.div
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
            className="img-zoom"
          >
            <ParallaxImage image={introPortrait} ratio="3 / 4" sizes="(min-width: 1024px) 30vw, 100vw" strength={8} imgClassName="object-[center_30%]" />
          </motion.div>
          <Reveal delay={0.4} className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <p className="label text-taupe">Bedroom · walnut slat wall</p>
            <p className="label text-oxblood">Representative</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
