import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useHeaderSurface = (menuOpen) => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  const photoHero = pathname === "/" || pathname === "/about";
  return menuOpen ? "menu" : photoHero && !scrolled ? "hero" : "solid";
};