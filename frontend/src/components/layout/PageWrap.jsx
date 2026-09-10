import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
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
    <main
      id="main"
      data-testid={testId}
      className={cn("relative min-h-screen page-content", className)}
    >
      {children}
    </main>
  );
};
