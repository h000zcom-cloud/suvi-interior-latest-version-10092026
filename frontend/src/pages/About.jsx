import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Picture } from "@/components/motion/Picture";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { about } from "@/content/about";
import { materials } from "@/content/images";

export default function About() {
  const story=about.sections.find(s=>s.key==="story"), philosophy=about.sections.find(s=>s.key==="philosophy"), craft=about.sections.find(s=>s.key==="craft");
  return <PageWrap testId="about-page">
    <Seo title="The Studio — Suvi Interior, Nashik" description={about.intro} path="/about" crumbs={[{name:"Home",path:"/"},{name:"Studio",path:"/about"}]} />
    <PageHero label="03 / The studio" lines={["Drawn with care.", <em>Made with purpose.</em>]} image={about.heroImage} text="Suvi Interior. An interior design and furniture studio rooted in Nashik." />
    <section className="container-x section" data-testid="about-story"><div className="chapter-top"><p className="editorial-label">Our story / Nashik</p><p className="text-xs">Designers. Makers. One studio.</p></div><div className="grid gap-10 lg:grid-cols-12"><h2 className="editorial-heading text-oxblood lg:col-span-5">A studio built<br /><em>on making.</em></h2><div className="lg:col-span-6 lg:col-start-7"><p className="editorial-lede text-charcoal" data-testid="about-intro">{about.intro}</p>{story.body.map((p,i)=><p className="mt-5 text-sm leading-[1.9] text-taupe" key={i}>{p}</p>)}</div></div></section>
    <section className="bg-oxblood text-white" data-testid="about-philosophy"><div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-2"><Picture image={philosophy.image} ratio="4 / 5" className="max-w-lg" sizes="(min-width:1024px) 40vw,100vw" /><div className="flex flex-col justify-center"><p className="editorial-label mb-8 text-white/65">Our point of view</p><h2 className="editorial-heading">Less noise.<br /><em>More meaning.</em></h2>{philosophy.body.map((p,i)=><p className="editorial-lede mt-7 text-white/80" key={i}>{p}</p>)}<div className="mt-10 grid grid-cols-3 gap-5 border-t border-white/20 pt-6" data-testid="about-believe">{["Function","Craft","Personal"].map((p,i)=><div key={p}><p className="text-[10px] text-white/60">0{i+1}</p><p className="mt-3 font-display text-2xl">{p}</p></div>)}</div></div></div></section>
    <section className="container-x section" data-testid="about-craft"><div className="chapter-top"><p className="editorial-label">The maker's perspective</p><p className="text-xs">It's in the details.</p></div><div className="grid gap-12 lg:grid-cols-2"><div><h2 className="editorial-heading text-oxblood">The hand.<br />The eye.<br /><em>The finished piece.</em></h2>{craft.body.map((p,i)=><p className="editorial-lede mt-6 text-taupe" key={i}>{p}</p>)}<Link to="/process" data-testid="about-process-link" className="btn-text mt-8">How it comes together<ArrowUpRight className="h-4 w-4" /></Link></div><div className="grid grid-cols-2 items-start gap-5"><Picture image={materials[0]} ratio="3 / 4" /><Picture image={materials[4]} ratio="3 / 4" className="mt-20" /><p className="col-span-2 text-xs text-taupe">Grain. Joinery. The detail that makes a difference.</p></div></div></section>
    <section data-testid="about-approach" className="container-x border-t border-line py-10"><Link to="/process" className="flex items-center justify-between gap-8 text-oxblood" data-testid="about-approach-link"><span className="font-display text-3xl">Five steps. One conversation.</span><ArrowUpRight className="h-6 w-6 shrink-0" /></Link></section>
    {about.founder && <section className="container-x section" data-testid="about-founder"><h2 className="editorial-heading text-oxblood">{about.founder.name}</h2><p className="editorial-lede mt-5">{about.founder.bio}</p></section>}
    <CtaBand />
  </PageWrap>;
}