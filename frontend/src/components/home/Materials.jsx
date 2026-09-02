import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { materials } from "@/content/images";

export const Materials = () => (
  <section data-testid="materials-section" className="border-t border-line">
    <div className="container-x py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label text-taupe">Material &amp; Craft</p>
          </Reveal>
          <SplitLines inView as="h2" delay={0.1} lines={["Made to", "be touched."]} className="mt-6 font-display text-[11vw] uppercase leading-[0.9] tracking-[-0.015em] sm:text-6xl lg:text-7xl" />
        </div>
        <Reveal delay={0.2} className="flex items-end lg:col-span-5 lg:col-start-8">
          <p className="max-w-md text-base leading-relaxed text-taupe md:text-lg">
            Wood, laminate, stone and hardware are chosen for how they feel in the hand and how they age in a home. Grain is matched across doors, edges are finished cleanly and every handle sits exactly where the hand expects it.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar md:mt-24 md:grid md:grid-cols-12 md:items-end md:gap-6 md:overflow-visible md:pb-0">
        {materials.map((m, i) => {
          const spans = ["md:col-span-3", "md:col-span-3 md:mb-16", "md:col-span-2 md:mb-6", "md:col-span-4"];
          return (
            <Reveal key={m.title} delay={i * 0.08} className={`w-[72vw] shrink-0 snap-start sm:w-[48vw] md:w-auto ${spans[i]}`}>
              <ParallaxImage image={m} ratio={m.ratio} strength={5 + i * 2} sizes="(min-width: 768px) 30vw, 72vw" data-testid={`material-${i}`} />
              <p className="label mt-4 text-taupe">{m.title}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
