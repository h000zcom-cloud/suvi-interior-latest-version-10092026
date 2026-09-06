import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { introPortrait } from "@/content/images";
import { site } from "@/content/site";

export const Intro = () => (
  <section data-testid="intro-section" className="container-x section">
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        <Reveal>
          <p className="label flex items-center gap-4 text-taupe">
            <span className="text-burgundy">01</span> The Studio <span className="text-line">/</span> {site.city}
          </p>
        </Reveal>
        <SplitLines inView as="h2" delay={0.1} lines={["Designing", "spaces that", "feel like you."]} className="h-display mt-8 text-[clamp(2.5rem,8vw,6rem)]" />
        <Reveal delay={0.25} className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14">
          <p className="lede">
            Suvi Interior is an interior design and furniture studio in Nashik. We design homes and make the furniture that goes into them — modular kitchens, wardrobes, TV units, cabinets and complete interiors.
          </p>
          <div className="flex flex-col items-start gap-6">
            <p className="lede">Because design and making happen under one roof, what is drawn is what gets built — to the millimetre, in the finish you chose.</p>
            <Link to="/about" data-testid="intro-about-link" className="btn-text">
              About the studio <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:pt-24">
        <ParallaxImage image={introPortrait} ratio="3 / 4" sizes="(min-width: 1024px) 30vw, 100vw" strength={8} imgClassName="object-[center_30%]" />
        <p className="label mt-4 flex items-center justify-between text-taupe">
          <span>Bedroom · walnut slat wall</span>
          <span className="text-brass">Representative</span>
        </p>
      </Reveal>
    </div>
  </section>
);
