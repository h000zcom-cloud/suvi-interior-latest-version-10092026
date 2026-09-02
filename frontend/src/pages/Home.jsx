import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui-custom/Marquee";
import { Intro } from "@/components/home/Intro";
import { ServicesList } from "@/components/home/ServicesList";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Philosophy } from "@/components/home/Philosophy";
import { Process } from "@/components/home/Process";
import { Materials } from "@/components/home/Materials";
import { Testimonials } from "@/components/home/Testimonials";
import { Studio } from "@/components/home/Studio";
import { CtaBand } from "@/components/ui-custom/CtaBand";
import { marqueeItems } from "@/content/process";

export default function Home() {
  return (
    <PageWrap theme="light" testId="home-page">
      <Seo path="/" />
      <Hero />
      <Marquee items={marqueeItems} />
      <Intro />
      <ServicesList />
      <FeaturedProjects />
      <Philosophy />
      <Process />
      <Materials />
      <Testimonials />
      <Studio />
      <CtaBand />
    </PageWrap>
  );
}
