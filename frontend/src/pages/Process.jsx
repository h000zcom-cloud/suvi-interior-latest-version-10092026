import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { processSteps } from "@/content/process";
import { img } from "@/content/images";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/process" },
];

const stepImages = [img.livingGarden, img.openPlan, img.kitchenTap, img.woodGrain, img.livingLounge];
const deliverables = ["Your space, needs and priorities understood.", "A shared direction for layout and material.", "Finishes, fittings and details resolved together.", "Furniture made, fitted and finished for your home.", "A finished space, ready for everyday life."];

const detail = [
  "We start in your home or at the studio — measuring, listening and understanding how the space is really used.",
  "Layouts, references, materials and a clear visual direction, discussed together until the idea is right.",
  "Finishes, hardware, proportions, storage and lighting are resolved before anything is made.",
  "Furniture and interior elements are manufactured to the drawing, then installed and finished on site.",
  "Handover of a complete space — and the same people to call if anything needs attention.",
];

export default function Process() {
  return (
    <PageWrap theme="dark" testId="process-page">
      <Seo title="Our Process — Interior Design in Nashik" description="How Suvi Interior works: Discover, Design, Detail, Craft, Live. A clear five-step interior design and furniture process for homes in Nashik." path="/process" crumbs={CRUMBS} />
      <PageHero label="04 / A considered process" lines={["From a thought", <em>to a home.</em>]} text="No disconnected handovers. Five clear steps, with the same studio from the first sketch to the final detail." />

      <section className="container-x py-12 md:py-20">
        <ol className="border-t border-line">
          {processSteps.map((s, i) => (
            <li key={s.n} id={s.title.toLowerCase()} className="grid gap-8 border-b border-line py-12 md:grid-cols-12 md:py-16" data-testid={`process-step-${s.n}`}>
              <Reveal className="md:col-span-2">
                <span className="font-display text-7xl leading-none text-oxblood/40 md:text-8xl">{s.n}</span>
              </Reveal>
              <Reveal delay={0.1} className="md:col-span-5">
                <h2 className="h-section text-oxblood">{s.title}</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed">{s.text}</p>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-taupe">{detail[i]}</p>
                <p className="process-deliverable" data-testid={`process-outcome-${s.n}`}>{deliverables[i]}</p>
              </Reveal>
              <Reveal delay={0.2} className={cn("md:col-span-4 md:col-start-9", i % 2 === 1 && "md:pt-10")}>
                <ParallaxImage image={stepImages[i]} ratio={i % 2 === 0 ? "4 / 3" : "4 / 5"} sizes="(min-width: 768px) 33vw, 100vw" strength={5} />
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand lines={["Ready to", "begin?"]} text="Tell us about your space and we'll take the first step together." primaryLabel="Begin a conversation" />
    </PageWrap>
  );
}
