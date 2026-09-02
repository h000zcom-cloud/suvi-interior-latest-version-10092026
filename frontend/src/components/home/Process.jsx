import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui-custom/SectionHead";
import { processSteps } from "@/content/process";

export const Process = () => (
  <section data-testid="process-section" className="container-x py-24 md:py-32">
    <SectionHead label="Process" title={<>From first <span className="italic normal-case">conversation</span> to finished home</>} titleClassName="max-w-3xl" />

    <ol className="mt-16 grid gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-x-8 lg:pt-0">
      {processSteps.map((s, i) => (
        <Reveal key={s.n} as="li" delay={i * 0.08} className="lg:border-l lg:border-line lg:py-12 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
          <span className="font-display text-5xl leading-none text-taupe/60 md:text-6xl">{s.n}</span>
          <h3 className="mt-8 font-display text-2xl uppercase leading-none tracking-[-0.01em] md:mt-12 md:text-3xl">{s.title}</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-taupe">{s.text}</p>
        </Reveal>
      ))}
    </ol>
  </section>
);
