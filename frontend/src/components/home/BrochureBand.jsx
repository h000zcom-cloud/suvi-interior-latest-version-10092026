import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { DownloadButton } from "@/components/brochure/DownloadButton";

export const BrochureBand = () => (
  <section className="bg-oxblood text-white" data-testid="home-brochure-band"><div className="container-x grid gap-10 py-14 md:grid-cols-[1.5fr_1fr] md:items-center md:py-20"><div><p className="editorial-label mb-6 text-white/65">The studio, in seven pages</p><h2 className="editorial-heading" data-testid="home-brochure-heading">A little Suvi.<br /><em>To take with you.</em></h2></div><div className="md:justify-self-end"><p className="mb-7 max-w-sm text-sm leading-relaxed text-white/80">Our approach, our materials and the spaces we imagine. Keep a copy of the studio brochure.</p><DownloadButton className="btn-light" testId="home-brochure-download" /><Link to="/brochure" data-testid="home-brochure-preview" className="mt-6 flex items-center gap-8 text-xs">A look inside<ArrowUpRight className="h-4 w-4" /></Link></div></div></section>
);