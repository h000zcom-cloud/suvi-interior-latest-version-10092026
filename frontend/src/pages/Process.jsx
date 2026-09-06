import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Picture";
import { Materials } from "@/components/home/Materials";
import { Philosophy } from "@/components/home/Philosophy";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { processSteps } from "@/content/process";
import { img } from "@/content/images";
import { cn } from "@/lib/utils";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/process" },
];

const stepImages = [img.livingGarden, img.openPlan, img.kitchenTap, img.woodGrain, img.livingLounge];

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
      <PageHero label="Process" lines={["How we", "work."]} text="Five steps, one conversation — from understanding how you live to handing over a finished home." />

      <section className="container-x pb-20 md:pb-28 xl:pb-36">
        <ol className="border-t border-line">
          {processSteps.map((s, i) => (
            <li key={s.n} id={s.title.toLowerCase()} className="grid gap-8 border-b border-line py-14 md:grid-cols-12 md:py-20" data-testid={`process-step-${s.n}`}>
              <Reveal className="md:col-span-2">
                <span className="font-display text-5xl leading-none text-burgundy md:text-6xl">{s.n}</span>
              </Reveal>
              <Reveal delay={0.1} className="md:col-span-5">
                <h2 className="h-section">{s.title}</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed">{s.text}</p>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-taupe">{detail[i]}</p>
              </Reveal>
              <Reveal delay={0.2} className={cn("md:col-span-4 md:col-start-9", i % 2 === 1 && "md:pt-10")}>
                <ParallaxImage image={stepImages[i]} ratio={i % 2 === 0 ? "4 / 3" : "4 / 5"} sizes="(min-width: 768px) 33vw, 100vw" strength={5} />
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <Materials index="—" />
      <Philosophy index="—" />
      <CtaBand lines={["Ready to", "begin?"]} text="Tell us about your space and we'll take the first step together." primaryLabel="Begin a conversation" />
    </PageWrap>
  );
}
