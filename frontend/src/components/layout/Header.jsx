import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone } from "lucide-react";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { Wordmark } from "@/components/ui-custom/Wordmark";
import { nav, site } from "@/content/site";
import { telLink } from "@/lib/contact";
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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,box-shadow] duration-500 ease-out",
        scrolled && !menuOpen ? "glass border-b border-charcoal/10 shadow-[0_12px_40px_-24px_rgba(20,18,16,0.35)]" : "border-b border-transparent bg-transparent",
        onDark ? "text-ivory" : "text-charcoal",
      )}
    >
      <div className="container-x grid h-[68px] grid-cols-2 items-center lg:h-[80px] lg:grid-cols-[1fr_auto_1fr]">
        <Link to="/" data-testid="header-logo" className="group inline-flex w-max items-center" aria-label="Suvi Interior — Home">
          <Wordmark roll className={cn("transition-colors duration-500", onDark ? "text-ivory" : "text-charcoal")} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
              className={({ isActive }) => cn("group/nav label relative flex items-center gap-2 py-1 transition-colors duration-300", isActive ? "" : onDark ? "text-ivory/75 hover:text-ivory" : "text-charcoal/70 hover:text-charcoal")}
            >
              {({ isActive }) => (
                <>
                  <span className={cn("h-1 w-1 rotate-45 transition-[opacity,transform] duration-500", isActive ? "bg-oxblood opacity-100 scale-100" : "scale-0 opacity-0 group-hover/nav:scale-100 group-hover/nav:opacity-100", onDark && isActive && "bg-brass", onDark && !isActive && "bg-brass")} aria-hidden="true" />
                  {n.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-7 lg:flex">
          <a href={telLink()} data-testid="header-phone" className={cn("group/tel hidden items-center gap-2.5 xl:inline-flex", onDark ? "text-ivory/80 hover:text-ivory" : "text-charcoal/75 hover:text-oxblood")}>
            <Phone className="h-3.5 w-3.5" strokeWidth={1.4} />
            <span className="font-display text-[17px] leading-none tracking-tight">{site.phone.display}</span>
          </a>
          <span className={cn("hidden h-5 w-px xl:block", onDark ? "bg-ivory/20" : "bg-charcoal/15")} aria-hidden="true" />
          <Link to="/contact" data-testid="header-cta" className="btn-brand px-6 py-3 text-[10px]">
            Start a Project
          </Link>
        </div>

        <button
          type="button"
          onClick={onToggle}
          data-testid="mobile-menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="label -mr-2 flex min-h-[44px] items-center justify-self-end gap-3 px-2 lg:hidden"
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
