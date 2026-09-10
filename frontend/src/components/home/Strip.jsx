const items = ["Modular Kitchens", "Custom Furniture", "Complete Interiors", "Designed & Made in Nashik", "TV & Wall Systems", "Bedroom Interiors", "Living Spaces"];

export const Strip = () => (
  <div data-testid="marquee-strip" className="overflow-hidden border-b border-line bg-soft py-[18px]" aria-hidden="true">
    <div className="flex w-max animate-marquee will-change-transform">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="label flex items-center gap-10 pr-10 text-taupe">
          <span className="font-display text-lg font-normal normal-case tracking-[0.02em] text-charcoal/80">{t}</span>
          <span className="h-1 w-1 rotate-45 bg-oxblood" />
        </span>
      ))}
    </div>
  </div>
);
