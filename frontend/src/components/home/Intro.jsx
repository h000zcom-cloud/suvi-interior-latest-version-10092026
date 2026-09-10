import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/motion/Picture";
import { introPortrait } from "@/content/images";

const pillars = [
  { title: "Design", text: "Considered around your life." },
  { title: "Make", text: "Made to the measure of your home." },
  { title: "Install", text: "Every last detail, brought together." },
];

export const Intro = () => (
  <section className="bg-oxblood text-white" data-testid="intro-section">
    <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className="flex flex-col justify-between lg:col-span-6">
        <div><p className="editorial-label mb-8 text-white/70">01 / The Suvi approach</p><h2 className="editorial-heading" data-testid="intro-heading">A home should<br />feel like <em>you.</em></h2><p className="editorial-lede mt-8 text-white/80">Not a showroom. Not a trend. A place that understands the way you live. We design your space and make the furniture that belongs in it—under one roof, in Nashik.</p><Link to="/about" data-testid="intro-about-link" className="mt-8 inline-flex items-center gap-10 border-b border-white/50 pb-3 text-xs">Meet the studio<ArrowUpRight className="h-4 w-4" /></Link></div>
        <ol className="mt-12 grid grid-cols-3 gap-4 border-t border-white/25 pt-6" data-testid="intro-pillars">{pillars.map((p,i)=><li key={p.title} data-testid={`intro-pillar-${p.title.toLowerCase()}`}><p className="mb-3 text-[10px] text-white/55">0{i+1}</p><h3 className="font-display text-2xl md:text-3xl">{p.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-white/65">{p.text}</p></li>)}</ol>
      </div>
      <figure className="lg:col-span-5 lg:col-start-8" data-testid="intro-image"><Picture image={introPortrait} ratio="4 / 5" sizes="(min-width:1024px) 40vw,100vw" /><figcaption className="atelier-caption !text-white/65"><span>Material, proportion, everyday life.</span><span>Representative interior</span></figcaption></figure>
    </div>
  </section>
);