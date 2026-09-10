import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export const Header = ({ menuOpen, onToggle }) => {
  const { theme } = useHeaderTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = (theme === "light" && !scrolled) || menuOpen;

  return (
    <header
      data-testid="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ease-out",
        scrolled && !menuOpen ? "glass border-b border-charcoal/10" : "border-b border-transparent bg-transparent",
        onDark ? "text-ivory" : "text-charcoal",
      )}
    >
      <div className="container-x flex h-[68px] items-center justify-between lg:h-[84px]">
        <Link to="/" data-testid="header-logo" className="group flex flex-col gap-2" aria-label="Suvi Interior — Home">
          <Wordmark roll />
          <span className={cn("hidden text-[9px] uppercase tracking-[0.24em] transition-colors duration-500 lg:block", onDark ? "text-ivory/55" : "text-taupe")}>
            Interior Design &amp; Furniture · Nashik
          </span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          <nav aria-label="Primary" className="flex items-center gap-8">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} data-testid={`nav-link-${n.label.toLowerCase()}`} className={({ isActive }) => cn("label link-underline py-1", isActive && "is-active")}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <span className={cn("h-5 w-px transition-colors duration-500", onDark ? "bg-ivory/25" : "bg-charcoal/15")} aria-hidden="true" />
          <Link to="/contact" data-testid="header-cta" className={cn(onDark ? "btn-ghost-light" : "btn-ghost")}>
            Start a Project
          </Link>
        </div>

        <button
          type="button"
          onClick={onToggle}
          data-testid="mobile-menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="label -mr-2 flex min-h-[44px] items-center gap-3 px-2 lg:hidden"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className="relative block h-3 w-7" aria-hidden="true">
            <span className={cn("absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out", menuOpen && "translate-y-[5.5px] rotate-45")} />
            <span className={cn("absolute bottom-0 left-0 h-px w-full bg-current transition-[transform,width] duration-500 ease-out", menuOpen ? "-translate-y-[5.5px] -rotate-45" : "w-2/3")} />
          </span>
        </button>
      </div>
    </header>
  );
};
