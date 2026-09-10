import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { showIntro } from "@/lib/intro";
import { Wordmark } from "@/components/ui-custom/Wordmark";

export const Preloader = () => {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(showIntro);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduce ? 0 : 1000);
    return () => clearTimeout(timer);
  }, [reduce]);
  if (!visible || reduce) return null;
  return <div className="studio-intro" data-testid="preloader" aria-hidden="true"><Wordmark /><span className="studio-intro-line" /></div>;
};