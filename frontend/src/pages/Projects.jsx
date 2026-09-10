import { useMemo, useState } from "react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { ProjectTile } from "@/components/ui-custom/ProjectTile";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { projectCategories, projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => filter === "all" ? projects : projects.filter(p => p.category === filter), [filter]);
  return <PageWrap testId="projects-page">
    <Seo title="Spaces & Stories — Interior Design in Nashik" description="Explore Suvi Interior's design directions for homes, modular kitchens, living rooms, bedrooms and custom furniture." path="/projects" crumbs={[{name:"Home",path:"/"},{name:"Projects",path:"/projects"}]} />
    <PageHero label="01 / The collection" lines={["Spaces &", <em>stories.</em>]} text="A study in how we live. Explore interiors and furniture through the lens of material, light and everyday life." />
    <section className="container-x pb-20 pt-8 md:pb-28">
      <div className="archive-filters" role="tablist" aria-label="Filter projects" data-testid="project-filters">{projectCategories.map(c=><button key={c.key} type="button" role="tab" aria-selected={filter===c.key} onClick={()=>setFilter(c.key)} className="archive-filter" data-testid={`project-filter-${c.key}`}>{c.label}</button>)}<span className="ml-auto pr-2 text-[10px] text-taupe" data-testid="project-result-count" aria-live="polite">{String(list.length).padStart(2,"0")} studies</span></div>
      <div className="mt-9 grid gap-x-8 gap-y-12 md:grid-cols-12" data-testid="project-grid">{list.map((p,i)=><ProjectTile key={p.slug} project={p} index={String(i+1).padStart(2,"0")} ratio={i%4===1?"4 / 5":"4 / 3"} className={i%4===0?"md:col-span-7":i%4===1?"md:col-span-5 md:pt-20":"md:col-span-6"} sizes="(min-width:768px) 55vw,100vw" />)}{!list.length && <p className="py-12 text-taupe md:col-span-12" data-testid="project-empty">More design studies are being prepared.</p>}</div>
      <p className="mt-10 border-t border-line pt-5 text-xs text-taupe" data-testid="imagery-notice">{site.imageryNotice}</p>
    </section>
    <CtaBand lines={["Your space.", <em>Your own story.</em>]} text="Seen a direction you connect with? Let's explore what it could become in your home." />
  </PageWrap>;
}