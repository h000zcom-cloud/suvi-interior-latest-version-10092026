import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export const SectionHead = ({ index, label, title, action, className, dark = false, titleClassName }) => (
  <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
    <Reveal>
      {(label || index) && (
        <p className={cn("label mb-6 flex items-center gap-4", dark ? "text-ivory/55" : "text-taupe")}>
          {index && <span className="text-burgundy">{index}</span>}
          {label && <span>{label}</span>}
        </p>
      )}
      <h2 className={cn("h-section", titleClassName)}>{title}</h2>
    </Reveal>
    {action && <Reveal delay={0.15} className="md:pb-2">{action}</Reveal>}
  </div>
);
