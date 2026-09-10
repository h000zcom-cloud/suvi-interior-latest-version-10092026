import { cn } from "@/lib/utils";

const SIZES = {
  sm: "text-[12px]",
  md: "text-[14px] sm:text-[16px]",
  lg: "text-[clamp(1.375rem,5.5vw,2.5rem)]",
};

export const Wordmark = ({ className, size = "md", ...rest }) => (
  <span className={cn("wordmark", SIZES[size], className)} aria-label="Suvi Interior" {...rest}>
    <span>Suvi</span>
    <span className="wordmark-dot" aria-hidden="true" />
    <span>Interior</span>
  </span>
);
