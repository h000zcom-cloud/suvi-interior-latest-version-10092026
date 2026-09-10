import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Wordmark } from "@/components/ui-custom/Wordmark";

export const Header = ({ menuOpen, onToggle }) => (
  <header className="atelier-header" data-testid="site-header">
    <div className="container-x flex h-[68px] items-center justify-between gap-6 lg:h-20">
      <Link to="/" data-testid="header-logo" aria-label="Suvi Interior — Home" className="shrink-0">
        <Wordmark />
      </Link>
      <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to} data-testid={`nav-link-${n.label.toLowerCase()}`} className={({ isActive }) => `atelier-nav ${isActive ? "is-current" : ""}`}>
            {n.label}
          </NavLink>
        ))}
      </nav>
      <Link to="/contact" data-testid="header-cta" className="hidden items-center gap-5 border-b border-white/60 py-2 text-xs text-white transition-colors hover:text-brass xl:inline-flex">
        Start a project <ArrowUpRight className="h-4 w-4" />
      </Link>
      <button type="button" onClick={onToggle} data-testid="mobile-menu-button" aria-expanded={menuOpen} aria-controls="mobile-menu" className="flex h-11 items-center gap-3 text-xs xl:hidden">
        {menuOpen ? "Close" : "Menu"}{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  </header>
);