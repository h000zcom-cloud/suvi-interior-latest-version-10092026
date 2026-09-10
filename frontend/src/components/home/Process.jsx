import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { processSteps } from "@/content/process";

export const Process = ({ index = "04", id = "process" }) => (
  <section id={id} className="container-x section scroll-mt-24" data-testid="process-section">
    <div className="chapter-top"><p className="editorial-label">{index} / From idea to everyday</p><p className="text-xs leading-relaxed">One studio beside you. At every step.</p></div>
    <div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><h2 className="editorial-heading text-oxblood" data-testid="home-process-heading">A clear path.<br /><em>A considered result.</em></h2><Link to="/process" className="btn-text mt-8" data-testid="home-process-link">Our way of working<ArrowUpRight className="h-4 w-4" /></Link></div><ol className="lg:col-span-6 lg:col-start-7">{processSteps.map(s=><li key={s.n} data-testid={`home-process-step-${s.n}`} className="grid grid-cols-[38px_1fr] gap-5 border-b border-line py-6 first:pt-0"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-oxblood/40 text-[10px] text-oxblood">{s.n}</span><div><h3 className="font-display text-3xl text-oxblood">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-taupe">{s.text}</p></div></li>)}</ol></div>
  </section>
);