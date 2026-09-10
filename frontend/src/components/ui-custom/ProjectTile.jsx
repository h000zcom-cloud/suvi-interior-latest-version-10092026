import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/motion/Picture";

export const ProjectTile = ({ project, index, className, ratio = "4 / 3", sizes = "50vw", imgClassName }) => (
  <article className={className}>
    <Link to={`/projects/${project.slug}`} className="group block" data-testid={`project-tile-${project.slug}`}>
      <div className="editorial-image">
        <Picture image={project.hero} ratio={ratio} sizes={sizes} imgClassName={imgClassName} />
        {project.isPlaceholder && <span className="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[9px] text-oxblood" data-testid={`project-study-${project.slug}`}>DESIGN STUDY</span>}
      </div>
      <div className="flex items-center justify-between gap-5 border-b border-line py-5">
        <div className="min-w-0"><p className="project-tile-meta mb-2">{index ? `${index} / ` : ""}{project.type}</p><h3 className="project-tile-title">{project.title}</h3></div>
        <span className="project-tile-arrow" aria-hidden="true"><ArrowUpRight className="h-5 w-5" strokeWidth={1.3} /></span>
      </div>
    </Link>
  </article>
);