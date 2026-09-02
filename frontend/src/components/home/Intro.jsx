import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { ArrowLink } from "@/components/ui-custom/ArrowLink";
import { img, introPortrait } from "@/content/images";
import { site } from "@/content/site";

export const Intro = () => (
  <section data-testid="intro-section" className="container-x py-24 md:py-36">
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Reveal>
          <p className="label text-taupe">Suvi Interior <span className="mx-3 text-line">/</span> {site.city}</p>
        </Reveal>
        <SplitLines inView as="h2" delay={0.1} lines={["Designed around", "the way you live."]} className="mt-6 font-display text-[9vw] uppercase leading-[0.92] tracking-[-0.015em] sm:text-6xl lg:text-7xl xl:text-[5.6rem]" />
      </div>
      <Reveal delay={0.25} className="flex flex-col justify-end gap-8 lg:col-span-4 lg:pb-3">
        <p className="text-base leading-relaxed text-taupe md:text-lg">
          Suvi Interior is an interior design and furniture studio in Nashik. We design and manufacture furniture and interiors for homes — modular kitchens, TV units, bedrooms, cabinets and complete residential interiors — with one aim: that a space works beautifully for the people who live in it.
        </p>
        <ArrowLink to="/about" data-testid="intro-about-link">About the studio</ArrowLink>
      </Reveal>
    </div>

    <div className="mt-20 grid items-end gap-6 md:mt-28 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <ParallaxImage image={img.livingPanels} ratio="4 / 3" sizes="(min-width: 1024px) 58vw, 100vw" strength={7} />
      </Reveal>
      <div className="grid grid-cols-2 gap-6 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
        <Reveal delay={0.15}>
          <ParallaxImage image={introPortrait} ratio="3 / 4" sizes="(min-width: 1024px) 30vw, 50vw" strength={9} />
        </Reveal>
        <Reveal delay={0.25} className="flex flex-col justify-end">
          <p className="label text-taupe">Designed &amp; made in {site.city}</p>
          <p className="mt-3 text-sm leading-relaxed text-taupe">Furniture and interiors, designed and manufactured by one studio — from the first sketch to the final install.</p>
        </Reveal>
      </div>
    </div>
  </section>
);
