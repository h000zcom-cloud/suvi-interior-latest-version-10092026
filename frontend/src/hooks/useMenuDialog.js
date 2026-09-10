import { useEffect } from "react";
import { useLenis } from "lenis/react";

export const useMenuDialog = (open, ref, onClose) => {
  const lenis = useLenis();
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const background = [...document.querySelectorAll("header, main, footer, [data-testid='mobile-sticky-bar']")];
    const previousInert = background.map(el => el.inert);
    background.forEach(el => { el.inert = true; });
    document.body.style.overflow = "hidden";
    lenis?.stop();
    ref.current?.querySelector("[data-testid='mobile-menu-close']")?.focus();

    const onKey = e => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key !== "Tab") return;
      const controls = [...ref.current.querySelectorAll("a[href], button")].filter(el => el.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      background.forEach((el, i) => { el.inert = previousInert[i]; });
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open, ref, onClose, lenis]);
};