import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imgUrl } from "@/lib/images";
import { EASE } from "@/lib/motion";

export const Lightbox = ({ items, index, onClose, onChange }) => {
  const lenis = useLenis();
  const touchX = useRef(null);
  const open = index !== null && index >= 0;

  const go = useCallback(
    (dir) => {
      if (!open) return;
      onChange((index + dir + items.length) % items.length);
    },
    [open, index, items.length, onChange],
  );

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  const item = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          data-testid="lightbox"
          className="fixed inset-0 z-[80] flex flex-col bg-night text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="container-x flex h-16 items-center justify-between lg:h-20">
            <p className="label text-ivory/60" data-testid="lightbox-counter">
              {String(index + 1).padStart(2, "0")} <span className="mx-2 text-ivory/30">/</span> {String(items.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={onClose} data-testid="lightbox-close" className="label flex items-center gap-3 py-2" aria-label="Close image viewer">
              Close <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-5 pb-8 sm:px-16">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={imgUrl(item, 1920)}
                alt={item.alt || ""}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </AnimatePresence>

            <button type="button" onClick={() => go(-1)} data-testid="lightbox-prev" aria-label="Previous image" className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-ivory/20 bg-night/40 text-ivory/70 transition-[border-color,color] hover:border-ivory hover:text-ivory sm:h-12 sm:w-12 sm:bg-transparent lg:left-6">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => go(1)} data-testid="lightbox-next" aria-label="Next image" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-ivory/20 bg-night/40 text-ivory/70 transition-[border-color,color] hover:border-ivory hover:text-ivory sm:h-12 sm:w-12 sm:bg-transparent lg:right-6">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="container-x flex items-center justify-between pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-2 text-xs text-ivory/55">
            <p className="max-w-md truncate" data-testid="lightbox-caption">{item.alt}</p>
            <p className="hidden sm:block">← → to navigate · Esc to close</p>
            <p className="sm:hidden">Swipe to navigate</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
