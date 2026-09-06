import { PageWrap } from "@/components/layout/PageWrap";
import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { ServicesList } from "@/components/home/ServicesList";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { Process } from "@/components/home/Process";
import { Materials } from "@/components/home/Materials";
import { Philosophy } from "@/components/home/Philosophy";
import { Testimonials } from "@/components/home/Testimonials";
import { Studio } from "@/components/home/Studio";
import { CtaBand } from "@/components/ui-custom/CtaBand";

export default function Home() {
  return (
    <PageWrap theme="light" testId="home-page">
      <Seo path="/" />
      <Hero />
      <Intro />
      <SelectedProjects />
      <ServicesList />
      <FeaturedProject />
      <Process />
      <Materials />
      <Philosophy />
      <Testimonials />
      <Studio />
      <CtaBand />
    </PageWrap>
  );
}
