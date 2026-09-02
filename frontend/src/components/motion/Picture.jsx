import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { imgUrl, srcSetFor } from "@/lib/images";

export const Picture = ({ image, className, imgClassName, sizes = "100vw", priority = false, ratio, ...rest }) => (
  <div className={cn("relative overflow-hidden bg-ivory-2", className)} style={ratio ? { aspectRatio: ratio } : undefined} {...rest}>
    <img
      src={imgUrl(image, 1440)}
      srcSet={srcSetFor(image)}
      sizes={sizes}
      alt={image.alt || ""}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
    />
  </div>
);

export const ParallaxImage = ({ image, className, imgClassName, strength = 8, sizes = "100vw", priority = false, ratio, ...rest }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-ivory-2", className)} style={ratio ? { aspectRatio: ratio } : undefined} {...rest}>
      <motion.img
        src={imgUrl(image, 1440)}
        srcSet={srcSetFor(image)}
        sizes={sizes}
        alt={image.alt || ""}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={reduce ? undefined : { y, scale: 1 + strength / 45 }}
        className={cn("absolute inset-0 h-full w-full object-cover will-change-transform", imgClassName)}
      />
    </div>
  );
};
