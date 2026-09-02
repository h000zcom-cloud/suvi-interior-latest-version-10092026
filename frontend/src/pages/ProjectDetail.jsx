import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage, Picture } from "@/components/motion/Picture";
import { Lightbox } from "@/components/ui-custom/Lightbox";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { imgUrl } from "@/lib/images";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [lb, setLb] = useState(null);

  if (!project) return <Navigate to="/projects" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const images = [project.hero, ...project.gallery];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ];

  return (
    <PageWrap theme="dark" testId="project-detail-page">
      <Seo title={`${project.title} — ${project.type}`} description={project.summary} path={`/projects/${project.slug}`} image={imgUrl(project.hero, 1200)} type="article" crumbs={crumbs} />

      <section className="container-x pt-28 md:pt-40">
        <Reveal>
          <Link to="/projects" data-testid="project-back" className="arrow-link text-taupe hover:text-charcoal">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> All projects
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SplitLines as="h1" delay={0.1} lines={project.title.split(" ").length > 2 ? [project.title.split(" ").slice(0, -1).join(" "), project.title.split(" ").slice(-1)[0]] : [project.title]} className="font-display text-[12vw] uppercase leading-[0.9] tracking-[-0.015em] sm:text-7xl lg:text-8xl" data-testid="project-title" />
          </div>
          <Reveal delay={0.3} className="flex flex-col justify-end lg:col-span-4">
            <dl className="grid grid-cols-2 gap-y-4 border-t border-line pt-5 text-sm sm:grid-cols-3 lg:grid-cols-2" data-testid="project-meta">
              <div>
                <dt className="label text-taupe">Category</dt>
                <dd className="mt-1">{project.type}</dd>
              </div>
              <div>
                <dt className="label text-taupe">Location</dt>
                <dd className="mt-1">{project.location}</dd>
              </div>
              {project.year && (
                <div>
                  <dt className="label text-taupe">Year</dt>
                  <dd className="mt-1">{project.year}</dd>
                </div>
              )}
            </dl>
            <p className="mt-8 text-base leading-relaxed text-taupe" data-testid="project-summary">{project.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-14 md:mt-20">
        <Reveal>
          <button type="button" onClick={() => setLb(0)} className="img-zoom block w-full text-left" data-testid="project-hero-image" aria-label="Open hero image">
            <ParallaxImage image={project.hero} ratio="16 / 9" priority sizes="100vw" strength={6} />
          </button>
        </Reveal>
        {project.isPlaceholder && <p className="mt-4 text-xs text-taupe">{site.imageryNotice}</p>}
      </section>

      <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label text-taupe">Design Concept</p>
            <p className="mt-6 font-display text-2xl leading-[1.25] tracking-[-0.01em] sm:text-3xl" data-testid="project-concept">{project.concept}</p>
          </Reveal>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.1}>
            <p className="label text-taupe">Materials &amp; Finishes</p>
            <ul className="mt-5 border-t border-line" data-testid="project-materials">
              {project.materials.map((m) => (
                <li key={m} className="border-b border-line py-3 text-sm">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="label text-taupe">Key Features</p>
            <ul className="mt-5 border-t border-line" data-testid="project-features">
              {project.features.map((f) => (
                <li key={f} className="border-b border-line py-3 text-sm">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <Reveal>
          <p className="label text-taupe">Gallery</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-8" data-testid="project-gallery">
          {project.gallery.map((im, i) => {
            const layouts = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5 md:col-start-2", "md:col-span-6 md:col-start-7 md:mt-16"];
            const ratios = ["4 / 3", "4 / 5", "4 / 5", "4 / 3"];
            return (
              <Reveal key={i} delay={(i % 2) * 0.1} className={layouts[i % 4]}>
                <button type="button" onClick={() => setLb(i + 1)} className="img-zoom block w-full" data-testid={`project-gallery-${i}`} aria-label={`Open image ${i + 1}`}>
                  <Picture image={im} ratio={ratios[i % 4]} sizes="(min-width: 768px) 50vw, 100vw" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line">
        <Link to={`/projects/${next.slug}`} data-testid="project-next" className="group container-x flex items-center justify-between gap-6 py-10 md:py-14">
          <div>
            <p className="label text-taupe">Next project</p>
            <p className="mt-3 font-display text-3xl uppercase leading-none tracking-[-0.01em] sm:text-5xl">{next.title}</p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-line transition-[background-color,color,border-color] duration-500 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
          </span>
        </Link>
      </section>

      <CtaBand lines={["Want a", "similar", "space?"]} text="Tell us about your home — we'll begin with a conversation about how you live." whatsappMessage={`Hi Suvi Interior, I saw the "${project.title}" project on your website and would like to discuss something similar for my home.`} testId="project-cta" />

      <Lightbox items={images} index={lb} onClose={() => setLb(null)} onChange={setLb} />
    </PageWrap>
  );
}
