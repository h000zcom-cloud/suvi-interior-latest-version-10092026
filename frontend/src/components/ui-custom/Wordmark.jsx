import { cn } from "@/lib/utils";

export const Wordmark = ({ className, variant = "header", size, roll, ...rest }) => (
  <span className={cn("studio-wordmark", `studio-wordmark--${variant}`, size === "sm" && "studio-wordmark-small", className)} aria-label="Suvi Interior" {...rest}>
    {variant === "signature" ? (
      <span className="studio-wordmark-signature-text">suvi interior.</span>
    ) : (
      <>
        <span className="studio-wordmark-name">suvi.</span>
        <span className="studio-wordmark-caption"><span>INTERIOR</span><span className="studio-wordmark-detail">DESIGN &amp; MAKE</span></span>
      </>
    )}
  </span>
);