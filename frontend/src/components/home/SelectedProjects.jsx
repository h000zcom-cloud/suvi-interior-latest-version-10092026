import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectTile } from "@/components/ui-custom/ProjectTile";
import { selectedProjects } from "@/content/projects";
import { site } from "@/content/site";

export const SelectedProjects = () => (
  <section className="container-x section" data-testid="selected-projects">
    <div className="chapter-top"><p className="editorial-label">02 / Spaces &amp; stories</p><p className="text-xs leading-relaxed">Different rooms. The same attention to how they look, feel and live.</p></div>
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><h2 className="editorial-heading text-oxblood" data-testid="selected-projects-heading">Spaces to <em>belong in.</em></h2><Link to="/projects" data-testid="projects-all-link" className="btn-text">Explore the collection<ArrowUpRight className="h-4 w-4" /></Link></div>
    <div className="grid gap-12 md:grid-cols-12">
      {selectedProjects.map((p,i)=><ProjectTile key={p.slug} project={p} index={`0${i+1}`} ratio={i===0?"4 / 3":i===1?"4 / 5":"16 / 8"} className={i===0?"md:col-span-7":i===1?"md:col-span-5 md:mt-24":"md:col-span-12"} sizes="(min-width:768px) 70vw,100vw" />)}
    </div>
    <p className="mt-7 text-[11px] text-taupe" data-testid="imagery-notice">{site.imageryNotice}</p>
  </section>
);