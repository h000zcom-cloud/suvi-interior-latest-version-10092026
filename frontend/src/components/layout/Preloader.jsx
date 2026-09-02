import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { showIntro } from "@/lib/intro";
import { EASE } from "@/lib/motion";

export const Preloader = () => {
  const [visible, setVisible] = useState(showIntro);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 1350);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory text-charcoal"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
          data-testid="preloader"
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[11vw] uppercase leading-none tracking-[0.08em] sm:text-6xl"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            >
              Suvi <span className="italic">Interior</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
