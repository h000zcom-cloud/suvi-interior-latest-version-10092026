import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/contact";

export const CtaBand = ({ lines = ["Good spaces begin", <em>with a conversation.</em>], text = "Tell us about the home you have in mind. We'll take it from there.", primaryLabel = "Start a project", whatsappMessage, testId = "final-cta" }) => (
  <section className="brand-cta border-t border-oxblood/20" data-testid={testId}>
    <div className="container-x py-16 md:py-24">
      <p className="editorial-label mb-8">A place for your next chapter</p>
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <h2 className="editorial-heading" data-testid={`${testId}-heading`}>{lines.map((l,i)=><span key={i}>{l}{i < lines.length - 1 ? " " : ""}</span>)}</h2>
        <div className="lg:justify-self-end"><p className="editorial-lede mb-7">{text}</p><Link to="/contact" className="btn-brand" data-testid={`${testId}-start`}>{primaryLabel}<ArrowUpRight className="h-4 w-4" /></Link><div className="mt-6 flex flex-wrap gap-6 text-xs"><a href={telLink()} data-testid={`${testId}-call`} className="link-underline">{site.phone.display}</a><a href={waLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" data-testid={`${testId}-whatsapp`} className="link-underline">WhatsApp</a></div></div>
      </div>
    </div>
  </section>
);