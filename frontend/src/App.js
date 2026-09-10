import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "@/App.css";
import "@/atelier.css";
import { HeaderThemeProvider } from "@/components/layout/HeaderTheme";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Process from "@/pages/Process";
import Brochure from "@/pages/Brochure";
import { Privacy, Terms, NotFound } from "@/pages/Legal";

function Shell() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <HeaderThemeProvider>
      <a href="#main" className="skip-link" data-testid="skip-to-content">
        Skip to content
      </a>
      <Preloader />
      <Header menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        <Routes key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/process" element={<Process />} />
          <Route path="/brochure" element={<Brochure />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      <WhatsAppFloat hidden={menuOpen} />
    </HeaderThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 }}>
        <Shell />
      </ReactLenis>
    </BrowserRouter>
  );
}
