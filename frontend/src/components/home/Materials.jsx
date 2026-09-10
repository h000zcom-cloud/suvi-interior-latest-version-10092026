import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { EASE, VIEWPORT } from "@/lib/motion";
import { ParallaxImage } from "@/components/motion/Picture";
import { materials } from "@/content/images";
import { cn } from "@/lib/utils";

const LAYOUT = [
  "md:col-span-4",
  "md:col-span-4 md:col-start-6 md:mt-14",
  "md:col-span-3 md:col-start-10",
  "md:col-span-3 md:col-start-2 md:mt-6",
  "md:col-span-4 md:col-start-6 md:mt-6",
  "md:col-span-3 md:col-start-10 md:mt-20",
];

export const Materials = ({ index = "06" }) => {
  const reduce = useReducedMotion();
  return (
    <section
      data-testid="materials-section"
      className="border-t border-line bg-ivory-2"
    >
      <div className="container-x section">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="label flex items-center gap-4 text-taupe">
                <span className="text-oxblood">{index}</span> Materials &amp;
                Craft
              </p>
            </Reveal>
            <SplitLines
              inView
              as="h2"
              delay={0.1}
              lines={["Made to be", "touched."]}
              className="h-section mt-8"
            />
          </div>
          <Reveal
            delay={0.2}
            className="flex items-end lg:col-span-5 lg:col-start-8"
          >
            <p className="lede max-w-md">
              Wood, stone, metal and fabric are chosen for how they feel in the
              hand and how they age in a home. Grain is matched across doors,
              edges are finished cleanly and every handle sits exactly where the
              hand expects it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar md:mt-20 md:grid md:grid-cols-12 md:items-start md:gap-6 md:overflow-visible md:pb-0">
          {materials.map((m, i) => (
            <Reveal
              key={m.title}
              delay={(i % 3) * 0.08}
              className={cn(
                "w-[70vw] shrink-0 snap-start sm:w-[46vw] md:w-auto",
                LAYOUT[i],
              )}
            >
              <motion.div
                initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, ease: EASE, delay: (i % 3) * 0.1 }}
                className="img-zoom"
              >
                <ParallaxImage
                  image={m}
                  ratio={m.ratio}
                  strength={4 + (i % 3) * 2}
                  sizes="(min-width: 768px) 33vw, 70vw"
                  data-testid={`material-${i}`}
                />
              </motion.div>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line/80 pt-3">
                <p className="flex items-baseline gap-3 font-display text-2xl leading-none">
                  <span className="label text-oxblood">0{i + 1}</span>
                  {m.title}
                </p>
                <p className="label text-right text-taupe">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
