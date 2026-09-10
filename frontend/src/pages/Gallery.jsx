import { useMemo, useState } from "react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Picture } from "@/components/motion/Picture";
import { Lightbox } from "@/components/ui-custom/Lightbox";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { galleryCategories, galleryItems } from "@/content/gallery";
import { site } from "@/content/site";

export default function Gallery() {
  const [filter,setFilter] = useState("all");
  const [lb,setLb] = useState(null);
  const items = useMemo(()=>filter==="all"?galleryItems:galleryItems.filter(g=>g.category===filter),[filter]);
  return <PageWrap testId="gallery-page" className="gallery-canvas">
    <Seo title="The Detail Edit — Interior Gallery" description="A visual library of interiors, furniture, materials and considered details from Suvi Interior, Nashik." path="/gallery" crumbs={[{name:"Home",path:"/"},{name:"Gallery",path:"/gallery"}]} />
    <PageHero label="05 / A visual notebook" lines={["The detail", <em>edit.</em>]} text="The sweep of a room. The grain of a cabinet. Sometimes, the smallest things say the most." />
    <section className="container-x pb-20 pt-6">
      <div className="archive-filters" role="tablist" aria-label="Filter gallery" data-testid="gallery-filters">{galleryCategories.map(c=><button key={c.key} type="button" role="tab" aria-selected={filter===c.key} onClick={()=>setFilter(c.key)} data-testid={`gallery-filter-${c.key}`} className="archive-filter">{c.label}</button>)}<span className="ml-auto text-[10px] text-white/70" data-testid="gallery-result-count" aria-live="polite">{items.length} images</span></div>
      <div className="mt-8 columns-2 gap-4 lg:columns-3 lg:gap-7" data-testid="gallery-grid">{items.map((g,i)=><button key={`${g.id||g.src}-${i}`} type="button" onClick={()=>setLb(galleryItems.indexOf(g))} className="editorial-image mb-6 block w-full break-inside-avoid text-left" data-testid={`gallery-item-${i}`} aria-label={`View ${g.alt}`}><Picture image={g} ratio={g.ratio} sizes="(min-width:1024px) 32vw,48vw" /><div className="flex justify-between gap-2 py-3 text-[9px] text-white/65"><span>{galleryCategories.find(c=>c.key===g.category)?.label}</span><span>0{i+1} ↗</span></div></button>)}</div>
      <p className="gallery-note border-t border-white/20 pt-5 text-xs" data-testid="imagery-notice">{site.imageryNotice}</p>
    </section>
    <CtaBand lines={["Something caught", <em>your eye?</em>]} text="We'd love to hear what you have in mind for your own space." />
    <Lightbox items={galleryItems} index={lb} onClose={()=>setLb(null)} onChange={setLb} />
  </PageWrap>;
}