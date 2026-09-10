import { Link } from "react-router-dom";
import { ArrowRight, Download, Printer } from "lucide-react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ParallaxImage, Picture } from "@/components/motion/Picture";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { ProjectTile } from "@/components/ui-custom/ProjectTile";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { Process } from "@/components/home/Process";
import { Materials } from "@/components/home/Materials";
import { Studio } from "@/components/home/Studio";
import { about } from "@/content/about";
import { heroImage, introPortrait } from "@/content/images";
import { principles } from "@/content/process";
import { selectedProjects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

const PDF_URL = `${process.env.REACT_APP_BACKEND_URL}/api/brochure.pdf`;
const YEAR = new Date().getFullYear();

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Brochure", path: "/brochure" },
];

const DownloadButton = ({ className = "btn-gold", testId = "brochure-download-btn", compact = false }) => (
  <a href={PDF_URL} download="Suvi-Interior-Brochure.pdf" target="_blank" rel="noopener noreferrer" data-testid={testId} className={`${className} whitespace-nowrap`}>
    <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} /> Download{compact ? <span className="hidden sm:inline"> PDF</span> : " PDF"}
  </a>
);

const Cover = () => (
  <section data-testid="brochure-cover" className="relative min-h-[100svh] overflow-hidden bg-night text-ivory">
    <ParallaxImage image={heroImage} priority className="absolute inset-0 h-full w-full" strength={5} imgClassName="opacity-80" />
    <div className="absolute inset-0 bg-night/45" aria-hidden="true" />
    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-night via-night/50 to-transparent" aria-hidden="true" />
    <div className="frame-inset hidden sm:block" aria-hidden="true" />

    <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-between pb-[calc(env(safe-area-inset-bottom)+6.5rem)] pt-32 sm:pb-20 lg:pt-40">
      <Reveal className="flex items-center justify-between sm:justify-between">
        <Wordmark size="sm" className="hidden text-ivory/80 sm:inline-flex" />
        <span className="label text-ivory/55">
          Studio Brochure · {YEAR}
        </span>
      </Reveal>

      <div>
        <Reveal delay={0.1}>
          <p className="label flex items-center gap-4 text-ivory/75">
            <span className="h-px w-8 bg-brass" aria-hidden="true" />
            {site.city} · {site.region}
          </p>
        </Reveal>
        <SplitLines as="h1" delay={0.2} lines={["Interiors that", <>feel like <span className="italic text-brass">home.</span></>]} className="h-display mt-7 text-[clamp(3rem,min(11vw,16svh),7.5rem)]" />
        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <Reveal delay={0.5} className="lg:col-span-5">
            <p className="max-w-md text-base leading-[1.7] text-ivory/80 md:text-[17px]">{site.positioning}</p>
          </Reveal>
          <Reveal delay={0.6} className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-7 lg:justify-end">
            <DownloadButton />
            <Link to="/contact" data-testid="brochure-cover-contact" className="btn-text-light text-[11px]">
              Start a Project <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const ActionBar = () => (
  <div data-testid="brochure-action-bar" className="glass no-print sticky top-[68px] z-30 border-b border-charcoal/10 lg:top-[84px]">
    <div className="container-x flex h-14 items-center justify-between gap-4">
      <p className="label flex items-center gap-3 whitespace-nowrap text-taupe">
        <span className="h-px w-5 bg-brass" aria-hidden="true" />
        <span className="hidden sm:inline">Suvi Interior · </span>Brochure {YEAR}
      </p>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => window.print()} data-testid="brochure-print-btn" className="btn-ghost hidden md:inline-flex">
          <Printer className="h-3.5 w-3.5" strokeWidth={1.5} /> Print
        </button>
        <DownloadButton className="btn-solid px-5 py-2.5" testId="brochure-download-btn-bar" compact />
      </div>
    </div>
  </div>
);

const Head = ({ index, label, title, className = "" }) => (
  <div className={className}>
    <Reveal>
      <p className="label flex items-center gap-4 text-taupe">
        <span className="text-bronze">{index}</span> {label}
      </p>
    </Reveal>
    <SplitLines inView as="h2" delay={0.1} lines={title} className="h-section mt-8" />
  </div>
);

const StudioNote = () => {
  const story = about.sections.find((s) => s.key === "story");
  const philosophy = about.sections.find((s) => s.key === "philosophy");
  return (
    <section data-testid="brochure-studio" className="container-x section">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Head index="01" label="The Studio" title={["Designing", "spaces that", <span className="italic">feel like you.</span>]} />
          <Reveal delay={0.25} className="mt-10 flex flex-col gap-6 lg:mt-14">
            <p className="lede">{about.intro}</p>
            {[...story.body.slice(0, 1), ...philosophy.body].map((p) => (
              <p key={p} className="text-[15px] leading-[1.75] text-charcoal/80">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.3} className="mt-12">
            <p className="label text-taupe">What we believe</p>
            <ol className="mt-4 border-t border-line">
              {principles.map((p) => (
                <li key={p.n} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[5rem_1fr]">
                  <span className="label pt-1.5 text-bronze">{p.n}</span>
                  <div>
                    <h3 className="h-sub">{p.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-taupe">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5 lg:col-start-8 lg:pt-20">
          <ParallaxImage image={introPortrait} ratio="3 / 4" sizes="(min-width: 1024px) 38vw, 100vw" strength={8} imgClassName="object-[center_30%]" />
          <p className="label mt-4 flex items-center justify-between text-taupe">
            <span>Bedroom · walnut slat wall</span>
            <span className="text-brass">Representative</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Capabilities = () => (
  <section data-testid="brochure-capabilities" className="border-t border-line bg-soft">
    <div className="container-x section">
      <div className="grid gap-10 lg:grid-cols-12">
        <Head index="02" label="Capabilities" title={["What we", <span className="italic">design & make.</span>]} className="lg:col-span-7" />
        <Reveal delay={0.2} className="flex items-end lg:col-span-4 lg:col-start-9">
          <p className="lede">Six ways of working with the studio — from a single made-to-measure piece to a complete home, designed and manufactured under one roof.</p>
        </Reveal>
      </div>

      <ol className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-24">
        {services.map((s, i) => (
          <Reveal key={s.slug} as="li" delay={(i % 2) * 0.1} data-testid={`brochure-service-${s.slug}`} className={i % 2 === 1 ? "md:mt-16" : ""}>
            <Picture image={s.image} ratio="4 / 3" sizes="(min-width: 768px) 48vw, 100vw" className="img-zoom" />
            <div className="mt-6 flex items-start justify-between gap-6 border-t border-line pt-5">
              <div>
                <p className="label text-bronze">{s.number}</p>
                <h3 className="h-sub mt-3">{s.title}</h3>
              </div>
              <Link to={`/services#${s.slug}`} className="arrow-link mt-1 shrink-0 text-charcoal">
                Details <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
            <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-charcoal/80">{s.description}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="label text-taupe">Includes</p>
                <ul className="mt-3 flex flex-col gap-1.5 text-sm text-charcoal/85">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-baseline gap-3">
                      <span className="h-px w-3 shrink-0 translate-y-[-3px] bg-brass" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label text-taupe">Ideal for</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-charcoal/75">
                  {s.idealFor.map((f) => (
                    <li key={f} className="border-b border-charcoal/25 pb-0.5">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

const SelectedWork = () => (
  <section data-testid="brochure-work" className="border-t border-line">
    <div className="container-x section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Head index="05" label="Selected Work" title={["Work that", <span className="italic">lives well.</span>]} />
        <Reveal delay={0.15} className="md:pb-2">
          <Link to="/projects" data-testid="brochure-projects-link" className="btn-text">
            All projects <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {selectedProjects.map((p, i) => (
          <ProjectTile key={p.slug} project={p} index={`0${i + 1}`} ratio="4 / 5" sizes="(min-width: 768px) 33vw, 100vw" delay={i * 0.08} className={i === 1 ? "md:mt-16" : ""} />
        ))}
      </div>
      <Reveal className="mt-14 border-t border-line pt-4">
        <p className="text-xs text-taupe">{site.imageryNotice}</p>
      </Reveal>
    </div>
  </section>
);

export default function Brochure() {
  return (
    <PageWrap theme="light" testId="brochure-page">
      <Seo title="Studio Brochure — Interior Design & Furniture in Nashik" description="Download the Suvi Interior studio brochure: modular kitchens, living and bedroom interiors, TV & wall systems, custom furniture and complete home interiors, designed and made in Nashik." path="/brochure" crumbs={CRUMBS} />
      <Cover />
      <ActionBar />
      <StudioNote />
      <Capabilities />
      <Process index="03" id="brochure-process" />
      <Materials index="04" />
      <SelectedWork />
      <Studio index="06" />
      <section className="border-t border-line bg-sand no-print" data-testid="brochure-download-band">
        <div className="container-x flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <p className="label flex items-center gap-4 text-taupe">
              <span className="h-px w-8 bg-brass" aria-hidden="true" />
              Keep a copy
            </p>
            <p className="h-statement mt-5 max-w-xl">
              Take the studio with you — a seven-page <span className="italic">A4 brochure</span> to read, share or print.
            </p>
          </div>
          <DownloadButton className="btn-solid self-start md:self-auto" testId="brochure-download-btn-bottom" />
        </div>
      </section>
      <CtaBand lines={["Let's begin", "with your", <span className="italic">space.</span>]} text="Share a few details about your home and we'll arrange a conversation at the studio or on site." whatsappMessage="Hi Suvi Interior, I read your brochure and would like to discuss an interior project." testId="brochure-cta" />
    </PageWrap>
  );
}
