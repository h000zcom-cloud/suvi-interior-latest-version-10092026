import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const Reveal = ({ children, delay = 0, y = 28, className, as = "div", duration = 1, ...rest }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={reduce ? false : { y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
      className={cn("content-reveal", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export const SplitLines = ({ lines, className, lineClassName, delay = 0, stagger = 0.11, inView = false, as = "h1", ...rest }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.h1;
  // Observe the stable heading, never a translated line inside a clipping mask.
  // Lines remain readable even if an intersection event is delayed or missed.
  const anim = inView && !reduce ? { whileInView: "show", viewport: VIEWPORT } : { animate: "show" };
  return (
    <Tag initial={reduce ? false : "hidden"} {...anim} className={cn("split-heading", className)} {...rest}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={cn("split-line block", lineClassName)}
          variants={{ hidden: { y: 14 }, show: { y: 0 } }}
          transition={{ duration: reduce ? 0 : 0.85, ease: EASE, delay: reduce ? 0 : delay + i * stagger }}
        >
          {line}{i < lines.length - 1 ? " " : null}
        </motion.span>
      ))}
    </Tag>
  );
};
