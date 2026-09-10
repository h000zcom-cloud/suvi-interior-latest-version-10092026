import { cn } from "@/lib/utils";

// Essential content is never hidden behind observers or animation lifecycles.
export const Reveal = ({ children, delay, y, duration, className, as: Tag = "div", ...rest }) => (
  <Tag className={cn("content-reveal", className)} {...rest}>{children}</Tag>
);

export const SplitLines = ({ lines, className, lineClassName, delay, stagger, inView, as: Tag = "h1", ...rest }) => (
  <Tag className={cn("split-heading", className)} {...rest}>
    {lines.map((line, i) => <span key={i} className={cn("split-line block", lineClassName)}>{line}{i < lines.length - 1 ? " " : null}</span>)}
  </Tag>
);