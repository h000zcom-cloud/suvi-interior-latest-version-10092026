import { Printer, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/ui-custom/PageHero";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { DownloadButton } from "@/components/brochure/DownloadButton";
import { PublicationViewer } from "@/components/brochure/PublicationViewer";

export default function Brochure() {
  return <PageWrap className="publication-page" testId="brochure-page">
    <Seo title="Inside Suvi — The Studio Brochure" description="Explore the Suvi Interior studio brochure. Seven pages of interiors, furniture, materials and our process. Download the PDF directly." path="/brochure" crumbs={[{name:"Home",path:"/"},{name:"Brochure",path:"/brochure"}]} />
    <PageHero label="06 / The studio publication" lines={["Inside", <em>Suvi.</em>]} text="Our point of view, in seven pages. A closer look at the spaces, materials and considered details that shape our work."><div className="mt-7"><DownloadButton className="btn-light" /><p className="mt-4 text-[10px] text-white/65" data-testid="brochure-file-info">PDF · 7 pages · A4 · 3 MB</p></div></PageHero>
    <div className="no-print sticky top-[68px] z-30 border-b border-oxblood/20 bg-white lg:top-20" data-testid="brochure-action-bar"><div className="container-x flex min-h-[64px] items-center justify-between gap-4 py-2"><p className="text-[10px] uppercase text-oxblood">Suvi Interior<span className="hidden sm:inline"> / Studio brochure</span></p><div className="flex items-center gap-3"><button type="button" onClick={()=>window.print()} data-testid="brochure-print-btn" className="hidden items-center gap-2 p-3 text-xs text-oxblood md:flex"><Printer className="h-4 w-4" />Print</button><DownloadButton className="btn-brand !px-4 !py-3" testId="brochure-download-btn-bar" /></div></div></div>
    <PublicationViewer />
    <section className="bg-white" data-testid="brochure-download-band"><div className="container-x grid gap-8 py-12 md:grid-cols-[1.5fr_1fr] md:items-center md:py-16"><div><p className="editorial-label mb-5 text-oxblood">Keep it close</p><h2 className="font-display text-4xl text-oxblood" data-testid="brochure-download-heading">Read it. Save it. <em>Make it your own.</em></h2><p className="mt-5 max-w-lg text-sm leading-relaxed text-taupe">A reference for the first ideas, the materials you love and the conversations to come.</p></div><div className="md:justify-self-end"><DownloadButton testId="brochure-download-btn-bottom" /><Link to="/services" data-testid="brochure-services-link" className="mt-6 flex items-center gap-8 text-xs text-oxblood">Explore our services<ArrowUpRight className="h-4 w-4" /></Link></div></div></section>
    <CtaBand testId="brochure-cta" lines={["Imagine what", <em>comes next.</em>]} text="When you're ready, let's turn the first ideas into a home that feels like yours." />
  </PageWrap>;
}