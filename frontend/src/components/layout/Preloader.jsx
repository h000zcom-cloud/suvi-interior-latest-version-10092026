import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { showIntro } from "@/lib/intro";
import { EASE } from "@/lib/motion";

export const Preloader = () => {
  const [visible, setVisible] = useState(showIntro);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 1450);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night text-ivory"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE }}
          aria-hidden="true"
          data-testid="preloader"
        >
          <div className="overflow-hidden">
            <motion.div initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              <Wordmark size="lg" className="font-light" />
            </motion.div>
          </div>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: EASE, delay: 0.35 }} className="mt-6 block h-px w-24 origin-left bg-brass" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="label mt-5 text-ivory/45">
            Nashik · Maharashtra
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
