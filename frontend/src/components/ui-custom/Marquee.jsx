import { cn } from "@/lib/utils";

export const Marquee = ({ items, className, dark = false }) => (
  <div className={cn("overflow-hidden border-y py-5 md:py-7", dark ? "border-night-line" : "border-line", className)} aria-hidden="true" data-testid="editorial-marquee">
    <div className="flex w-max animate-marquee will-change-transform">
      {[...items, ...items].map((item, i) => (
        <span key={i} className={cn("flex items-center whitespace-nowrap pr-10 font-display text-2xl italic tracking-tight md:pr-16 md:text-4xl", dark ? "text-ivory/70" : "text-charcoal/75")}>
          {item}
          <span className={cn("ml-10 h-1 w-1 rounded-full md:ml-16", dark ? "bg-ivory/40" : "bg-walnut/50")} />
        </span>
      ))}
    </div>
  </div>
);
