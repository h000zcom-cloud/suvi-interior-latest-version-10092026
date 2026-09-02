import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const PageWrap = ({ children, theme = "dark", className, testId }) => {
  const lenis = useLenis();
  const { setTheme } = useHeaderTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis]);

  return (
    <motion.main
      data-testid={testId}
      className={cn("relative", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.main>
  );
};
