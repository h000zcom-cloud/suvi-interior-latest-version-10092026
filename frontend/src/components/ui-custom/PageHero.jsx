import { SplitLines, Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { cn } from "@/lib/utils";

export const PageHero = ({ label, lines, image, text, className, imgClassName }) => {
  if (!image) {
    return (
      <section className={cn("container-x pt-32 pb-14 md:pt-44 md:pb-20", className)}>
        <Reveal>{label && <p className="label flex items-center gap-4 text-taupe"><span className="h-px w-8 bg-burgundy" />{label}</p>}</Reveal>
        <SplitLines as="h1" lines={lines} delay={0.15} className="h-display mt-7" />
        {text && (
          <Reveal delay={0.4} className="mt-8 max-w-xl">
            <p className="lede">{text}</p>
          </Reveal>
        )}
      </section>
    );
  }

  return (
    <section className={cn("relative h-[72svh] min-h-[520px] overflow-hidden bg-charcoal text-ivory", className)}>
      <ParallaxImage image={image} priority className="absolute inset-0 h-full w-full" strength={6} imgClassName={cn("opacity-90", imgClassName)} />
      <div className="absolute inset-0 bg-charcoal/40" aria-hidden="true" />
      <div className="frame-inset hidden sm:block" aria-hidden="true" />
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-14 md:pb-20">
        {label && (
          <Reveal delay={0.1}>
            <p className="label flex items-center gap-4 text-ivory/75"><span className="h-px w-8 bg-brass" />{label}</p>
          </Reveal>
        )}
        <SplitLines as="h1" lines={lines} delay={0.2} className="h-display mt-7" />
        {text && (
          <Reveal delay={0.5} className="mt-8 max-w-xl">
            <p className="text-base leading-relaxed text-ivory/80 md:text-[17px]">{text}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
