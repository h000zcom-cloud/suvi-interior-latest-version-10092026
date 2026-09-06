import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/motion/Picture";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export const ProjectTile = ({ project, index, className, ratio = "4 / 3", sizes = "(min-width: 1024px) 50vw, 100vw", delay = 0, imgClassName }) => (
  <Reveal delay={delay} className={className}>
    <Link to={`/projects/${project.slug}`} className="group block" data-testid={`project-tile-${project.slug}`}>
      <Picture image={project.hero} ratio={ratio} sizes={sizes} className="img-zoom" imgClassName={imgClassName} />
      <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4 transition-colors duration-500 group-hover:border-charcoal/60">
        <div className="min-w-0">
          {index && <p className="label mb-3 text-burgundy">Project {index}</p>}
          <h3 className="h-sub">{project.title}</h3>
          <p className="label mt-3 text-taupe">
            {project.type} <span className="mx-2 text-line">/</span> {project.location}
            {project.year && (
              <>
                <span className="mx-2 text-line">/</span> {project.year}
              </>
            )}
          </p>
        </div>
        <span className={cn("mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-charcoal transition-[background-color,color,border-color] duration-500 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-ivory")}>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  </Reveal>
);
