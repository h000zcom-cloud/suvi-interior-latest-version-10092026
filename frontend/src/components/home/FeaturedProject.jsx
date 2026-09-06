import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { featureStory } from "@/content/projects";

export const FeaturedProject = () => {
  const p = featureStory;
  if (!p) return null;
  return (
    <section data-testid="featured-project" className="border-t border-line">
      <div className="container-x pt-20 md:pt-28 xl:pt-36">
        <Reveal>
          <p className="label flex items-center gap-4 text-taupe">
            <span className="text-burgundy">04</span> Featured Project
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-10 md:mt-14">
        <Link to={`/projects/${p.slug}`} className="img-zoom block" data-testid="featured-project-image" aria-label={`View project: ${p.title}`}>
          <ParallaxImage image={p.hero} className="h-[62svh] min-h-[380px] md:h-[78svh]" sizes="100vw" strength={7} />
        </Link>
      </Reveal>
      <div className="container-x grid gap-10 pb-20 pt-10 md:grid-cols-12 md:pb-28 md:pt-14 xl:pb-36">
        <Reveal className="md:col-span-6">
          <h2 className="h-section">{p.title}</h2>
          <p className="label mt-5 text-taupe">
            {p.type} <span className="mx-2 text-line">/</span> {p.location}
            {p.year && (
              <>
                <span className="mx-2 text-line">/</span> {p.year}
              </>
            )}
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex flex-col items-start gap-8 md:col-span-5 md:col-start-8 md:pt-2">
          <p className="lede">{p.summary}</p>
          <p className="text-sm leading-relaxed text-taupe">{p.concept}</p>
          <Link to={`/projects/${p.slug}`} data-testid="featured-project-link" className="btn-text">
            View project <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
