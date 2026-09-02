import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Picture } from "@/components/motion/Picture";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "@/components/ui-custom/Lightbox";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { galleryCategories, galleryItems, galleryStrip } from "@/content/gallery";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lb, setLb] = useState(null);
  const items = useMemo(() => (filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter)), [filter]);

  return (
    <PageWrap theme="dark" testId="gallery-page">
      <Seo title="Gallery — Interiors & Furniture" description="A visual gallery of living rooms, bedrooms, kitchens, dining spaces, TV units, furniture and material details by Suvi Interior, Nashik." path="/gallery" crumbs={CRUMBS} />
      <PageHero label="Gallery" lines={["Spaces,", "in detail"]} text="Rooms, furniture and the close-up details that make them feel finished." />

      <section className="pb-16 md:pb-24" aria-label="Featured gallery strip">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 no-scrollbar sm:px-8 lg:px-14 xl:px-20" data-testid="gallery-strip">
          {galleryStrip.map((im, i) => (
            <Reveal key={i} delay={i * 0.05} className={cn("shrink-0 snap-start", i % 2 === 0 ? "w-[82vw] sm:w-[60vw] lg:w-[46vw]" : "w-[64vw] sm:w-[40vw] lg:w-[28vw] lg:mt-16")}>
              <button type="button" onClick={() => setLb(galleryItems.findIndex((g) => g.id === im.id))} className="img-zoom block w-full" aria-label={`Open ${im.alt}`} data-testid={`gallery-strip-${i}`}>
                <Picture image={im} ratio={i % 2 === 0 ? "3 / 2" : "4 / 5"} sizes="(min-width: 1024px) 46vw, 82vw" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5" data-testid="gallery-filters">
          {galleryCategories.map((c) => (
            <button key={c.key} role="tab" aria-selected={filter === c.key} onClick={() => setFilter(c.key)} data-testid={`gallery-filter-${c.key}`} className={cn("label link-underline py-1 transition-colors duration-300", filter === c.key ? "is-active text-charcoal" : "text-taupe hover:text-charcoal")}>
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8" data-testid="gallery-grid">
            {items.map((g, i) => (
              <Reveal key={`${g.id || g.src}-${i}`} delay={(i % 3) * 0.06} className="mb-6 break-inside-avoid lg:mb-8">
                <button type="button" onClick={() => setLb(galleryItems.indexOf(g))} className="img-zoom group block w-full text-left" data-testid={`gallery-item-${i}`} aria-label={`Open ${g.alt}`}>
                  <Picture image={g} ratio={g.ratio} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                  <p className="label mt-3 text-taupe transition-colors duration-300 group-hover:text-charcoal">{galleryCategories.find((c) => c.key === g.category)?.label}</p>
                </button>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 border-t border-line pt-5 text-xs text-taupe" data-testid="imagery-notice">{site.imageryNotice}</p>
      </section>

      <CtaBand lines={["See something", "you like?"]} text="Tell us which spaces caught your eye and we'll talk about how they could work in your home." />

      <Lightbox items={galleryItems} index={lb} onClose={() => setLb(null)} onChange={setLb} />
    </PageWrap>
  );
}
