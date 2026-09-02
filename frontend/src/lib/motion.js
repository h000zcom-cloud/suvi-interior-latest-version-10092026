export const EASE = [0.22, 1, 0.36, 1];

export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});
