import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export const SectionHead = ({ label, title, action, className, dark = false, titleClassName }) => (
  <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
    <Reveal>
      {label && <p className={cn("label mb-5", dark ? "text-ivory/50" : "text-taupe")}>{label}</p>}
      <h2 className={cn("font-display text-4xl uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl lg:text-6xl", titleClassName)}>{title}</h2>
    </Reveal>
    {action && <Reveal delay={0.15} className="md:pb-2">{action}</Reveal>}
  </div>
);
