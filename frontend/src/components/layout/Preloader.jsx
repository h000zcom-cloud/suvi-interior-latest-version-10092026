import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { showIntro } from "@/lib/intro";
import { EASE } from "@/lib/motion";

const WORDS = ["Suvi", "Interior"];
const HOLD = 3300;
const OUT = 3300 + 560;
const WORDS_CYCLE = ["Design", "Craft", "Detail", "Home"];

const Letters = ({ phase }) => {
  let idx = 0;
  return (
    <span className="wordmark font-light text-[clamp(1.75rem,8vw,4.25rem)] tracking-[0.3em]" aria-label="Suvi Interior">
      {WORDS.map((w, wi) => (
        <span key={w} className="inline-flex">
          {wi === 1 && (
            <motion.span
              className="wordmark-dot mx-[0.5em] self-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={phase === "out" ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: phase === "out" ? 0 : 0.55 }}
              aria-hidden="true"
            />
          )}
          {w.split("").map((ch) => {
            const i = idx++;
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={phase === "out" ? { y: "-115%", opacity: 0 } : { y: "0%", opacity: 1 }}
                  transition={{ duration: phase === "out" ? 0.6 : 1.05, ease: EASE, delay: 0.12 + i * (phase === "out" ? 0.022 : 0.045) }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export const Preloader = () => {
  const [visible, setVisible] = useState(showIntro);
  const [phase, setPhase] = useState("in");
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS_CYCLE.length), 780);
    return () => clearInterval(id);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / (HOLD - 250), 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t1 = setTimeout(() => setPhase("out"), HOLD);
    const t2 = setTimeout(() => setVisible(false), OUT);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-night text-ivory"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
          data-testid="preloader"
        >
          <motion.div className="pointer-events-none absolute inset-0 bg-oxblood" initial={{ y: "100%" }} animate={{ y: "100%" }} exit={{ y: "0%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} />

          <motion.span className="absolute left-4 right-4 top-4 h-px origin-left bg-ivory/15 sm:left-6 sm:right-6 sm:top-6 lg:left-8 lg:right-8 lg:top-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} />
          <motion.span className="absolute bottom-4 left-4 right-4 h-px origin-right bg-ivory/15 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} />
          <motion.span className="absolute bottom-4 left-4 top-4 w-px origin-bottom bg-ivory/15 sm:bottom-6 sm:left-6 sm:top-6 lg:bottom-8 lg:left-8 lg:top-8" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 0.5 }} />
          <motion.span className="absolute bottom-4 right-4 top-4 w-px origin-top bg-ivory/15 sm:bottom-6 sm:right-6 sm:top-6 lg:bottom-8 lg:right-8 lg:top-8" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, ease: EASE, delay: 0.5 }} />

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(78vw,34rem)] w-[min(78vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/[0.07]"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: phase === "out" ? 0 : 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
          >
            <motion.span className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 9, ease: "linear", repeat: Infinity }}>
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-brass" />
            </motion.span>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: phase === "out" ? 0 : 1 }} transition={{ duration: 0.8, delay: phase === "out" ? 0 : 0.6 }} className="label absolute left-8 top-8 text-ivory/50 sm:left-12 sm:top-12">
            Interior Design &amp; Furniture
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: phase === "out" ? 0 : 1 }} transition={{ duration: 0.8, delay: phase === "out" ? 0 : 0.7 }} className="label absolute right-8 top-8 text-ivory/50 sm:right-12 sm:top-12">
            Nashik · Maharashtra
          </motion.p>

          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative">
              <Letters phase={phase} />
              <motion.span
                className="shimmer-mask pointer-events-none absolute inset-0 animate-shimmer text-brass"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "out" ? 0 : 1 }}
                transition={{ duration: 0.6, delay: phase === "out" ? 0 : 1.1 }}
                aria-hidden="true"
              >
                <span className="wordmark font-light text-[clamp(1.75rem,8vw,4.25rem)] tracking-[0.3em]">
                  <span>Suvi</span>
                  <span className="wordmark-dot mx-[0.5em] bg-brass" />
                  <span>Interior</span>
                </span>
              </motion.span>
            </div>

            <div className="mt-8 h-px w-[min(60vw,22rem)] overflow-hidden bg-ivory/10">
              <motion.span className="block h-full origin-left bg-brass" initial={{ scaleX: 0 }} animate={{ scaleX: phase === "out" ? 1 : count / 100 }} transition={{ duration: 0.25, ease: "linear" }} />
            </div>
            <div className="mt-6 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p key={word} initial={{ y: "110%", opacity: 0 }} animate={{ y: phase === "out" ? "-110%" : "0%", opacity: phase === "out" ? 0 : 1 }} exit={{ y: "-110%", opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="font-display text-xl font-light italic tracking-wide text-ivory/70">
                  {WORDS_CYCLE[word]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase === "out" ? 0 : 1 }} transition={{ duration: 0.7, delay: phase === "out" ? 0 : 0.5 }} className="absolute bottom-8 left-8 flex items-baseline gap-3 sm:bottom-12 sm:left-12">
            <span className="font-display text-5xl font-light italic leading-none tabular-nums sm:text-6xl">{String(count).padStart(2, "0")}</span>
            <span className="label text-ivory/45">/ 100</span>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: phase === "out" ? 0 : 1 }} transition={{ duration: 0.7, delay: phase === "out" ? 0 : 0.8 }} className="label absolute bottom-8 right-8 text-ivory/45 sm:bottom-12 sm:right-12">
            Designed &amp; made under one roof
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
