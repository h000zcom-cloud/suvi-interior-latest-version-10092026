import { SectionHead } from "@/components/ui-custom/SectionHead";
import { ArrowLink } from "@/components/ui-custom/ArrowLink";
import { ProjectTile } from "@/components/ui-custom/ProjectTile";
import { Reveal } from "@/components/motion/Reveal";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";

export const FeaturedProjects = () => {
  const [a, b, c, d] = featuredProjects;
  return (
    <section data-testid="featured-projects" className="border-t border-line">
      <div className="container-x py-24 md:py-32">
        <SectionHead label="Selected Work" title={<>Featured <span className="italic normal-case">projects</span></>} action={<ArrowLink to="/projects" data-testid="projects-all-link">View all projects</ArrowLink>} />

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-20 lg:mt-24">
          {a && <ProjectTile project={a} className="md:col-span-8" ratio="16 / 11" sizes="(min-width: 768px) 66vw, 100vw" />}
          {b && <ProjectTile project={b} className="md:col-span-4 md:mt-32" ratio="4 / 5" sizes="(min-width: 768px) 33vw, 100vw" delay={0.1} />}
          {c && <ProjectTile project={c} className="md:col-span-4 md:col-start-2" ratio="4 / 5" sizes="(min-width: 768px) 33vw, 100vw" />}
          {d && <ProjectTile project={d} className="md:col-span-6 md:col-start-7 md:mt-24" ratio="4 / 3" sizes="(min-width: 768px) 50vw, 100vw" delay={0.1} />}
        </div>

        <Reveal className="mt-14 border-t border-line pt-5">
          <p className="text-xs text-taupe" data-testid="imagery-notice">{site.imageryNotice}</p>
        </Reveal>
      </div>
    </section>
  );
};
