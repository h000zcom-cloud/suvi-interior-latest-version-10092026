import { Picture } from "@/components/motion/Picture";
import { cn } from "@/lib/utils";

export const PageHero = ({ label, lines, image, text, className, imgClassName, children }) => (
  image ? <section className={cn("photo-masthead", className)} data-testid="page-hero">
    <Picture image={image} priority className="absolute inset-0" imgClassName={imgClassName} />
    <div className="container-x photo-masthead-copy">
      <p className="editorial-label mb-6" data-testid="page-hero-label">{label}</p>
      <h1 className="editorial-heading" data-testid="page-heading">{lines.map((line, i) => <span className="block" key={i}>{line}{i < lines.length - 1 ? " " : null}</span>)}</h1>
      {text && <p className="editorial-lede mt-6 text-white/85" data-testid="page-hero-description">{text}</p>}
      {children}
    </div>
  </section> : <section className={cn("masthead", className)} data-testid="page-hero">
    <div className="container-x masthead-inner">
      <div><p className="editorial-label" data-testid="page-hero-label">{label}</p><h1 className="editorial-heading" data-testid="page-heading">{lines.map((line, i) => <span className="block" key={i}>{line}{i < lines.length - 1 ? " " : null}</span>)}</h1></div>
      <div className="masthead-note">{text && <p data-testid="page-hero-description">{text}</p>}{children}</div>
    </div>
  </section>
);