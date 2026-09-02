import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const Reveal = ({ children, delay = 0, y = 28, className, as = "div", duration = 1, ...rest }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export const SplitLines = ({ lines, className, lineClassName, delay = 0, stagger = 0.11, inView = false, as: Tag = "h1", ...rest }) => {
  const reduce = useReducedMotion();
  const anim = inView ? { whileInView: "show", viewport: VIEWPORT } : { animate: "show" };
  return (
    <Tag className={className} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            variants={{ hidden: { y: "112%" }, show: { y: "0%" } }}
            initial={reduce ? "show" : "hidden"}
            {...anim}
            transition={{ duration: 1.15, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
