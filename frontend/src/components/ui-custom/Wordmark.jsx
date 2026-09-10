import { cn } from "@/lib/utils";

const SIZES = {
  sm: "text-[12px]",
  md: "text-[14px] sm:text-[16px]",
  lg: "text-[clamp(1.375rem,5.5vw,2.5rem)]",
};

const RollWord = ({ word, offset = 0 }) => (
  <span className="wm-word" aria-hidden="true">
    {word.split("").map((ch, i) => (
      <span key={i} className="wm-l">
        <span style={{ transitionDelay: `${(offset + i) * 28}ms` }}>
          <span>{ch}</span>
          <span>{ch}</span>
        </span>
      </span>
    ))}
  </span>
);

export const Wordmark = ({ className, size = "md", roll = false, ...rest }) => (
  <span className={cn("wordmark", SIZES[size], className)} aria-label="Suvi Interior" {...rest}>
    {roll ? <RollWord word="Suvi" /> : <span>Suvi</span>}
    <span className="wordmark-dot" aria-hidden="true" />
    {roll ? <RollWord word="Interior" offset={4} /> : <span>Interior</span>}
  </span>
);
