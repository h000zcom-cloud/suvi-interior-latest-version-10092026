import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui-custom/SectionHead";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/utils";

export const Process = ({ index = "05", id = "process" }) => (
  <section id={id} data-testid="process-section" className="scroll-mt-24 border-t border-line">
    <div className="container-x section">
      <SectionHead index={index} label="Process" title={<>From first conversation to a <span className="italic">finished home.</span></>} titleClassName="max-w-3xl" />

      <ol className="mt-14 grid gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-x-8">
        {processSteps.map((s, i) => (
          <Reveal key={s.n} as="li" delay={i * 0.08} className={cn("border-t border-line pt-6 lg:pt-8", i === processSteps.length - 1 && "lg:border-t-burgundy")}>
            <span className={cn("label", i === processSteps.length - 1 ? "text-burgundy" : "text-taupe")}>{s.n}</span>
            <h3 className="h-sub mt-8 md:mt-12">{s.title}</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-taupe md:text-[15px]">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
