import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { principles } from "@/content/process";

export const Philosophy = () => (
  <section data-testid="philosophy-section" className="border-y border-line bg-ivory-2">
    <div className="container-x grid gap-14 py-24 md:py-36 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="label text-taupe">Philosophy</p>
        </Reveal>
        <SplitLines inView as="h2" delay={0.1} lines={["Design.", "Craft.", "Detail."]} className="mt-6 font-display text-[17vw] uppercase leading-[0.86] tracking-[-0.02em] sm:text-8xl lg:text-[7.5rem] xl:text-[9rem]" />
      </div>
      <ol className="lg:col-span-6 lg:col-start-7 lg:pt-4">
        {principles.map((p, i) => (
          <Reveal key={p.n} as="li" delay={0.1 * i} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-8 last:border-b sm:grid-cols-[6rem_1fr] md:py-10">
            <span className="label pt-2 text-taupe">{p.n} —</span>
            <div>
              <h3 className="font-display text-3xl uppercase leading-none tracking-[-0.01em] md:text-4xl">{p.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-taupe">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
