const WIDTHS = [480, 768, 1080, 1440, 1920];

export const unsplash = (id, w, extra = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}${extra}`;

export const imgUrl = (image, w = 1200) => (image.id ? unsplash(image.id, w) : image.src);

export const srcSetFor = (image) =>
  image.id ? WIDTHS.map((w) => `${unsplash(image.id, w)} ${w}w`).join(", ") : undefined;

export const u = (id, alt) => ({ id, alt });
