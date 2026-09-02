import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export const Header = ({ menuOpen, onToggle }) => {
  const { theme } = useHeaderTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = (theme === "light" && !scrolled && !menuOpen) || menuOpen;

  return (
    <header
      data-testid="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ease-out",
        scrolled && !menuOpen ? "border-b border-line/80 bg-ivory/85 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        onDark ? "text-ivory" : "text-charcoal",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between lg:h-20">
        <Link to="/" data-testid="header-logo" className="font-display text-[15px] uppercase tracking-[0.24em] sm:text-[17px]" aria-label="Suvi Interior — Home">
          Suvi Interior
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
              className={({ isActive }) => cn("label link-underline py-1", isActive && "is-active")}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/contact" data-testid="header-cta" className={cn("btn hidden lg:inline-flex", onDark ? "btn-outline-light" : "btn-outline")}>
            Start a Project
          </Link>
          <button
            type="button"
            onClick={onToggle}
            data-testid="mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="label flex items-center gap-3 py-2 lg:hidden"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={cn("absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out", menuOpen && "translate-y-[5.5px] rotate-45")} />
              <span className={cn("absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-500 ease-out", menuOpen && "-translate-y-[5.5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
