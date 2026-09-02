import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const Section = ({ s, index }) => {
  const flip = index % 2 === 1;
  return (
    <section id={s.key} data-testid={`about-${s.key}`} className="border-t border-line">
      <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
        <div className={cn("lg:col-span-5", flip ? "lg:col-start-8 lg:order-2" : "lg:col-start-1")}>
          <Reveal>
            <p className="label text-taupe">{s.label}</p>
          </Reveal>
          <SplitLines inView as="h2" delay={0.1} lines={s.heading} className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl xl:text-[3.5rem]" />
          <Reveal delay={0.2} className="mt-8 flex flex-col gap-5">
            {s.body.map((p, i) => (
              <p key={i} className="max-w-md text-base leading-relaxed text-taupe">
                {p}
              </p>
            ))}
            {s.ownerNote && <p className="max-w-md text-base leading-relaxed text-charcoal">{s.ownerNote}</p>}
          </Reveal>
          {s.principles && (
            <ol className="mt-12 border-t border-line">
              {s.principles.map((p, i) => (
                <Reveal key={p.n} as="li" delay={0.1 * i} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-6">
                  <span className="label pt-1 text-taupe">{p.n}</span>
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-none">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-taupe">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
        {s.image && (
          <Reveal delay={0.15} className={cn("lg:col-span-6", flip ? "lg:col-start-1 lg:order-1" : "lg:col-start-7", index % 3 === 1 && "lg:col-span-5 lg:pt-16")}>
            <ParallaxImage image={s.image} ratio={index % 3 === 1 ? "3 / 4" : "4 / 3"} sizes="(min-width: 1024px) 50vw, 100vw" strength={6} />
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default function About() {
  return (
    <PageWrap theme="light" testId="about-page">
      <Seo title="About" description={`About Suvi Interior — an interior design and furniture manufacturing studio at Pandhari Mala, Ambad–Uttam Nagar Road, Nashik. ${site.positioning}`} path="/about" crumbs={CRUMBS} />
      <PageHero label={`About · ${site.city}`} lines={["About", "Suvi Interior"]} image={about.heroImage} />

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label text-taupe">The Studio</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8 lg:col-start-5">
            <p className="font-display text-2xl leading-[1.25] tracking-[-0.01em] sm:text-3xl lg:text-4xl" data-testid="about-intro">
              {about.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {about.sections.map((s, i) => (
        <Section key={s.key} s={s} index={i} />
      ))}

      {about.founder && (
        <section className="border-t border-line" data-testid="about-founder">
          <div className="container-x grid gap-12 py-20 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label text-taupe">Founder</p>
              <h2 className="mt-6 font-display text-4xl uppercase leading-none">{about.founder.name}</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-taupe">{about.founder.bio}</p>
            </div>
          </div>
        </section>
      )}

      <CtaBand lines={["Let's talk", "about your", "home."]} text="Tell us about your space and what you want it to become." />
    </PageWrap>
  );
}
