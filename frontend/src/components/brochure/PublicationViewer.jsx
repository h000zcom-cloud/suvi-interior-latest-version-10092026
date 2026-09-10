import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Lightbox } from "@/components/ui-custom/Lightbox";

const titles = ["The studio", "Our approach", "Living & kitchens", "Furniture & interiors", "The process", "Materials & craft", "A conversation"];
export const brochurePages = titles.map((title,i)=>({src:`/brochures/previews/page-${i+1}.jpg`,alt:`Suvi Interior brochure — ${title}, page ${i+1}`}));

export const PublicationViewer = () => {
  const [active,setActive]=useState(0);
  const [expanded,setExpanded]=useState(null);
  return <section className="container-x py-10 md:py-16" data-testid="brochure-cover">
    <div className="mb-8 flex items-center justify-between gap-5 border-b border-oxblood/20 pb-5"><p className="editorial-label text-oxblood">Inside the brochure</p><div className="flex items-center gap-3"><button type="button" onClick={()=>setActive(a=>(a+6)%7)} aria-label="Previous brochure page" className="flex h-10 w-10 items-center justify-center border border-oxblood/30 text-oxblood transition-colors hover:bg-white" data-testid="brochure-preview-prev"><ChevronLeft className="h-4 w-4" /></button><p className="text-xs text-oxblood" data-testid="brochure-preview-counter" aria-live="polite">{active+1} / 7</p><button type="button" onClick={()=>setActive(a=>(a+1)%7)} aria-label="Next brochure page" className="flex h-10 w-10 items-center justify-center border border-oxblood/30 text-oxblood transition-colors hover:bg-white" data-testid="brochure-preview-next"><ChevronRight className="h-4 w-4" /></button></div></div>
    <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2 md:gap-10" data-testid="brochure-preview-spread">
      {[active,(active+1)%7].map((n,i)=><button key={`${n}-${i}`} type="button" onClick={()=>setExpanded(n)} className={`group relative text-left ${i===1?"hidden md:block":""}`} data-testid={`brochure-preview-page-${i}`} aria-label={`Enlarge brochure page ${n+1}`}><div className="publication-sheet"><img src={brochurePages[n].src} alt={brochurePages[n].alt} /></div><span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-oxblood text-white transition-transform group-hover:scale-110"><Expand className="h-4 w-4" /></span></button>)}
    </div>
    <div className="publication-thumbs mt-10 grid grid-cols-4 gap-3 sm:grid-cols-7" role="tablist" aria-label="Brochure pages">{brochurePages.map((p,i)=><button key={p.src} type="button" role="tab" aria-selected={active===i} onClick={()=>setActive(i)} className="publication-thumb text-left" data-testid={`brochure-preview-select-${i}`} aria-label={`Show brochure page ${i+1}`}><img src={p.src} alt="" loading="lazy" className="aspect-[210/297] w-full object-contain" /><span className="mt-2 block text-[10px] text-oxblood">0{i+1}<span className="ml-2 hidden lg:inline">{titles[i]}</span></span></button>)}</div>
    <Lightbox items={brochurePages} index={expanded} onClose={()=>setExpanded(null)} onChange={setExpanded} />
  </section>;
};