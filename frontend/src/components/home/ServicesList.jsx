import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { Picture } from "@/components/motion/Picture";
import { services } from "@/content/services";

export const ServicesList = () => {
  const [active, setActive] = useState(0);
  return <section className="bg-[#eeece7]" data-testid="services-section"><div className="container-x section">
    <div className="chapter-top"><p className="editorial-label">03 / What we do</p><Link to="/services" data-testid="services-all-link" className="inline-flex gap-6 text-xs">The complete offering<ArrowUpRight className="h-4 w-4" /></Link></div>
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5"><h2 className="editorial-heading text-oxblood" data-testid="services-heading">Every room.<br /><em>Considered.</em></h2><div className="mt-10 hidden lg:block" data-testid="services-preview"><Picture image={services[Math.max(active,0)].image} ratio="4 / 3" sizes="40vw" /><p className="mt-5 text-sm leading-relaxed text-taupe" data-testid="services-preview-description">{services[Math.max(active,0)].short}</p></div></div>
      <div className="lg:col-span-6 lg:col-start-7" data-testid="services-accordion">{services.map((s,i)=><div key={s.slug} className="border-b border-oxblood/25">
        <Link to={`/services#${s.slug}`} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} data-testid={`service-row-${s.slug}`} className="group hidden items-center gap-5 py-7 text-oxblood lg:flex"><span className="w-7 font-display text-xl text-oxblood/50">{s.number}</span><span className="font-display text-3xl transition-transform duration-300 group-hover:translate-x-2">{s.title}</span><ArrowUpRight className="ml-auto h-5 w-5 shrink-0" /></Link>
        <button type="button" onClick={()=>setActive(active===i?-1:i)} aria-expanded={active===i} aria-controls={`service-panel-${s.slug}`} data-testid={`service-toggle-${s.slug}`} className="flex w-full items-center gap-4 py-6 text-left text-oxblood lg:hidden"><span className="text-xs opacity-60">{s.number}</span><span className="font-display text-2xl">{s.title}</span>{active===i?<Minus className="ml-auto h-4 w-4 shrink-0" />:<Plus className="ml-auto h-4 w-4 shrink-0" />}</button>
        {active===i && <div id={`service-panel-${s.slug}`} className="pb-7 lg:hidden" data-testid={`service-panel-${s.slug}`}><Picture image={s.image} ratio="4 / 3" /><p className="mt-4 text-sm leading-relaxed text-taupe">{s.short}</p><Link to={`/services#${s.slug}`} data-testid={`service-mobile-link-${s.slug}`} className="btn-brand mobile-service-link mt-5">Explore service<ArrowUpRight className="h-4 w-4" /></Link></div>}
      </div>)}</div>
    </div>
  </div></section>;
};