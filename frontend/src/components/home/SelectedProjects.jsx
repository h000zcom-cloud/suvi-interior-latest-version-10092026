import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHead } from "@/components/ui-custom/SectionHead";
import { ProjectTile } from "@/components/ui-custom/ProjectTile";
import { Reveal } from "@/components/motion/Reveal";
import { selectedProjects } from "@/content/projects";
import { site } from "@/content/site";

export const SelectedProjects = () => {
  const [a, b, c] = selectedProjects;
  return (
    <section data-testid="selected-projects" className="border-t border-line">
      <div className="container-x section">
        <SectionHead
          index="02"
          label="Selected Projects"
          title={<>Work that <span className="italic">lives well.</span></>}
          action={
            <Link to="/projects" data-testid="projects-all-link" className="btn-text">
              All projects <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          }
        />

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-16 lg:mt-20">
          {a && <ProjectTile project={a} index="01" className="md:col-span-7" ratio="16 / 11" sizes="(min-width: 768px) 58vw, 100vw" />}
          {b && <ProjectTile project={b} index="02" className="md:col-span-4 md:col-start-9 md:mt-28" ratio="4 / 5" sizes="(min-width: 768px) 33vw, 100vw" delay={0.1} />}
          {c && <ProjectTile project={c} index="03" className="md:col-span-5 md:col-start-3" ratio="1 / 1" sizes="(min-width: 768px) 41vw, 100vw" />}
        </div>

        <Reveal className="mt-10 border-t border-line pt-4">
          <p className="text-xs text-taupe" data-testid="imagery-notice">{site.imageryNotice}</p>
        </Reveal>
      </div>
    </section>
  );
};
