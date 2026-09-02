import { SplitLines, Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { cn } from "@/lib/utils";

export const PageHero = ({ label, lines, image, text, dark = true, className }) => {
  if (!image) {
    return (
      <section className={cn("container-x pt-32 pb-16 md:pt-44 md:pb-24", className)}>
        <Reveal>{label && <p className="label text-taupe">{label}</p>}</Reveal>
        <SplitLines as="h1" lines={lines} delay={0.15} className="mt-6 font-display text-[13vw] uppercase leading-[0.9] tracking-[-0.015em] sm:text-7xl lg:text-8xl xl:text-[7.5rem]" />
        {text && (
          <Reveal delay={0.4} className="mt-10 max-w-xl">
            <p className="text-base leading-relaxed text-taupe md:text-lg">{text}</p>
          </Reveal>
        )}
      </section>
    );
  }

  return (
    <section className={cn("relative h-[78svh] min-h-[520px] overflow-hidden bg-night text-ivory", className)}>
      <ParallaxImage image={image} priority className="absolute inset-0 h-full w-full" strength={6} imgClassName="opacity-90" />
      <div className="absolute inset-0 bg-night/35" aria-hidden="true" />
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-14 md:pb-20">
        {label && (
          <Reveal delay={0.1}>
            <p className="label text-ivory/70">{label}</p>
          </Reveal>
        )}
        <SplitLines as="h1" lines={lines} delay={0.2} className="mt-6 font-display text-[13vw] uppercase leading-[0.9] tracking-[-0.015em] sm:text-7xl lg:text-8xl xl:text-[7.5rem]" />
        {text && (
          <Reveal delay={0.5} className="mt-8 max-w-xl">
            <p className="text-base leading-relaxed text-ivory/75 md:text-lg">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
