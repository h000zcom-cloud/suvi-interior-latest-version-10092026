import { Picture } from "@/components/motion/Picture";
import { materials } from "@/content/images";

export const Materials = ({ index = "05" }) => (
  <section className="border-t border-line bg-white" data-testid="materials-section"><div className="container-x section">
    <div className="chapter-top"><p className="editorial-label">{index} / The material library</p><p className="text-xs leading-relaxed">Honest textures. Thoughtful finishes. Details you notice every day.</p></div>
    <h2 className="editorial-heading mb-10 text-oxblood" data-testid="materials-heading">Beauty you can <em>feel.</em></h2>
    <div className="material-grid">{materials.map((m,i)=><figure key={m.title} data-testid={`material-${i}`}><Picture image={m} ratio="4 / 3" sizes="(min-width:768px) 30vw,48vw" className="editorial-image" /><figcaption className="mt-4 border-t border-line pt-3"><div className="flex items-baseline justify-between gap-2"><h3>{m.title}</h3><span className="text-[10px] text-oxblood">0{i+1}</span></div><p className="mt-1 text-[11px] leading-relaxed text-taupe">{m.note}</p></figcaption></figure>)}</div>
  </div></section>
);