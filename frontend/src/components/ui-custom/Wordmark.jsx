import { cn } from "@/lib/utils";

export const Wordmark = ({ className, size = "md", roll, ...rest }) => (
  <span className={cn("studio-wordmark", size === "sm" && "studio-wordmark-small", className)} aria-label="Suvi Interior" {...rest}>
    <span className="studio-wordmark-name">suvi<span aria-hidden="true">.</span></span>
    <span className="studio-wordmark-caption">INTERIOR<br />DESIGN &amp; MAKE</span>
  </span>
);