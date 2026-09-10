import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { site } from "@/content/site";
import { directionsLink, mapEmbedUrl, telLink, waLink } from "@/lib/contact";

export default function Contact() {
  const [params] = useSearchParams();
  return <PageWrap testId="contact-page">
    <Seo title="Let's Begin — Contact Suvi Interior" description={`Start your interior project with Suvi Interior, Nashik. Call ${site.phone.display}, WhatsApp us or request a consultation.`} path="/contact" crumbs={[{name:"Home",path:"/"},{name:"Contact",path:"/contact"}]} />
    <section className="masthead"><div className="container-x"><p className="editorial-label">07 / Begin a conversation</p><h1 className="editorial-heading" data-testid="page-heading">Your home.<br /><em>Our next conversation.</em></h1></div></section>
    <section className="container-x grid gap-12 py-12 md:py-20 lg:grid-cols-12">
      <div className="lg:col-span-4"><p className="editorial-lede text-taupe">A new home, a room to rethink, a piece you can't quite find. Tell us where you are, and we'll begin there.</p><div className="mt-10 border-t border-line pt-6"><p className="editorial-label mb-4 text-oxblood">Speak with the studio</p><a href={telLink()} className="font-display text-3xl text-oxblood" data-testid="contact-phone">{site.phone.display}</a><div className="mt-6 flex gap-5"><a href={telLink()} className="btn-text" data-testid="contact-call-button"><Phone className="h-4 w-4" />Call</a><a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-text" data-testid="contact-whatsapp-button">WhatsApp<ArrowUpRight className="h-4 w-4" /></a></div></div><div className="mt-10 border-t border-line pt-6"><p className="editorial-label mb-4 text-oxblood">Come by</p><address className="text-sm not-italic leading-[1.9] text-taupe" data-testid="contact-address">{site.address.lines.map(l=><span key={l} className="block">{l}</span>)}</address><a href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="contact-directions-button" className="btn-text mt-5">Get directions<MapPin className="h-4 w-4" /></a></div></div>
      <div className="consultation-form lg:col-span-7 lg:col-start-6"><div className="mb-8"><p className="editorial-label text-oxblood">Your project</p><h2 className="mt-4 font-display text-3xl text-oxblood" data-testid="consultation-heading">Let's get to know your space.</h2></div><EnquiryForm key={params.get("type")} presetType={params.get("type")} /></div>
    </section>
    <section className="border-t border-line bg-[#eeece7]"><div className="container-x py-12"><div className="mb-7 flex flex-wrap justify-between gap-5"><p className="editorial-label text-oxblood">Suvi Interior / Nashik</p><a href={directionsLink()} target="_blank" rel="noopener noreferrer" data-testid="map-directions" className="inline-flex items-center gap-5 text-xs text-oxblood">Open in Google Maps<ArrowUpRight className="h-4 w-4" /></a></div><iframe title="Suvi Interior on Google Maps" src={mapEmbedUrl()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="map-frame h-[320px] w-full border-0 md:h-[400px]" data-testid="contact-map" /></div></section>
  </PageWrap>;
}