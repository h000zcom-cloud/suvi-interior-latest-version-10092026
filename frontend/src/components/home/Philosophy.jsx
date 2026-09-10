import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { principles } from "@/content/process";
import { img } from "@/content/images";

export const Philosophy = ({ index = "07" }) => (
  <section data-testid="philosophy-section" className="bg-night text-ivory">
    <div className="container-x section">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label flex items-center gap-4 text-ivory/55">
              <span className="text-brass">{index}</span> Philosophy
            </p>
          </Reveal>
          <SplitLines inView as="h2" delay={0.1} lines={["Design.", "Craft.", <span className="italic normal-case">Detail.</span>]} className="h-display mt-8 text-[clamp(3rem,13vw,8.5rem)]" />
          <Reveal delay={0.3} className="mt-12 hidden lg:block">
            <ParallaxImage image={img.woodGrain} ratio="4 / 3" sizes="40vw" strength={5} className="w-3/4" />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.15}>
            <ParallaxImage image={img.kitchenWoodDark} ratio="4 / 5" sizes="(min-width: 1024px) 45vw, 100vw" strength={6} className="lg:-mt-10" />
          </Reveal>
          <ol className="mt-14 border-t border-night-line">
            {principles.map((p, i) => (
              <Reveal key={p.n} as="li" delay={0.1 * i} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-night-line py-7 sm:grid-cols-[5rem_1fr]">
                <span className="label pt-1.5 text-brass">{p.n}</span>
                <div>
                  <h3 className="h-sub">{p.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ivory/65">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);
