import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { ProjectTile } from "@/components/ui-custom/ProjectTile";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { projectCategories, projects } from "@/content/projects";
import { site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
];

const LAYOUT = [
  { className: "md:col-span-7", ratio: "16 / 11" },
  { className: "md:col-span-5 md:mt-28", ratio: "4 / 5" },
  { className: "md:col-span-4 md:col-start-2", ratio: "4 / 5" },
  { className: "md:col-span-6 md:col-start-7 md:mt-20", ratio: "4 / 3" },
  { className: "md:col-span-6", ratio: "4 / 3" },
  { className: "md:col-span-5 md:col-start-8 md:mt-28", ratio: "4 / 5" },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <PageWrap theme="dark" testId="projects-page">
      <Seo title="Projects — Interior Design Work in Nashik" description="Residential interiors, modular kitchens, living rooms, bedrooms and custom furniture by Suvi Interior, Nashik." path="/projects" crumbs={CRUMBS} />
      <PageHero label={`Projects · ${site.city}`} lines={["Selected", "work"]} text="Homes, kitchens, bedrooms and furniture — a growing archive of what we design and make." />

      <section className="container-x pb-24 md:pb-32">
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5" data-testid="project-filters">
          {projectCategories.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={filter === c.key}
              onClick={() => setFilter(c.key)}
              data-testid={`project-filter-${c.key}`}
              className={cn("label link-underline py-1 transition-colors duration-300", filter === c.key ? "is-active text-charcoal" : "text-taupe hover:text-charcoal")}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-14 grid gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-20"
            data-testid="project-grid"
          >
            {list.map((p, i) => {
              const l = LAYOUT[i % LAYOUT.length];
              return <ProjectTile key={p.slug} project={p} className={l.className} ratio={l.ratio} sizes="(min-width: 768px) 50vw, 100vw" delay={(i % 2) * 0.1} />;
            })}
            {list.length === 0 && (
              <p className="md:col-span-12 text-taupe" data-testid="project-empty">
                Projects in this category will be added soon.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-16 border-t border-line pt-5 text-xs text-taupe" data-testid="imagery-notice">{site.imageryNotice}</p>
      </section>

      <CtaBand lines={["Want a", "space like", "these?"]} text="Tell us about your home and we'll begin with a conversation." />
    </PageWrap>
  );
}
