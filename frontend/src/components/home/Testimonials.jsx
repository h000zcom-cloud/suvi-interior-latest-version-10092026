import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/content/testimonials";

export const Testimonials = () => {
  if (!testimonials.length) return null;
  return (
    <section data-testid="testimonials-section" className="border-t border-line">
      <div className="container-x py-24 md:py-32">
        <Reveal>
          <p className="label text-taupe">Client Words</p>
        </Reveal>
        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} as="blockquote" className={i === 0 ? "lg:col-span-8" : "lg:col-span-5"}>
              <p className="font-display text-3xl leading-[1.15] tracking-[-0.01em] md:text-4xl lg:text-5xl">“{t.quote}”</p>
              <footer className="label mt-8 text-taupe">
                {t.name}
                {t.attribution && <> <span className="mx-2 text-line">/</span> {t.attribution}</>}
                {t.projectType && <> <span className="mx-2 text-line">/</span> {t.projectType}</>}
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
