import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "@assets/index";
import { TextShimmer } from "@components/ui/motion-primitives/text-shimmer";
import { navBarRoutes } from "@routes/navBar.routes";
import { Menu, X } from "lucide-react";
import { InfiniteSlider } from "@components/ui/motion-primitives/infinite-slider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Locks body scrolling while the sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="w-full bg-background border-b border-border px-6 py-3 relative z-50">
        <div className="flex items-center justify-between md:grid md:grid-cols-3 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center md:col-start-1 md:justify-self-start">
            <img src={logo} alt="Cosmos" className="w-[150px] h-auto" />
          </Link>

          {/* Links - desktop */}
          <div className="hidden md:flex md:col-start-2 items-center gap-8 md:justify-self-center">
            {navBarRoutes.map((link) => (
              <Link
                key={link.label}
                to={link.route}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* mobile trigger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          >
            <Menu className="text-secondary size-8" />
          </button>
        </div>

        {/* Overlay - mobile */}
        <div
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300
            ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        />

        {/* Sidebar - mobile */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className={`fixed top-2 right-2 left-3 w-[97dvw] rounded-3xl bg-background border-l border-border
            flex flex-col transition-transform duration-300 ease-out md:hidden shadow-2xl
            ${isMenuOpen ? "translate-x-0" : "translate-x-[110%]"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background
                          rounded-t-2xl">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <img src={logo} alt="Cosmos" className="w-[110px] h-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fechar menu"
              className="flex items-center justify-center w-9 h-9 rounded-full text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors text-xl leading-none"
            >
              <X />
            </button>
          </div>

          {/* Topics Line */}
          <div className="bg-secondary py-1 text-[11px] text-gray-500 font-medium font-geist">
            <InfiniteSlider speed={30} gap={24}>
              {Array.from({ length: 8 }).map((_ , index) => (
                <p key={index}>TÓPICOS</p>
              ))}
            </InfiniteSlider>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            {navBarRoutes.map((link, i) => {
              const Icon = link.icon

              return (
              <Link
                key={link.label}
                to={link.route}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: isMenuOpen ? `${i * 40}ms` : "0ms" }}
                className={`text-base font-extrabold font-syne text-text-secondary hover:text-text-primary hover:bg-white/5
                  border-border border-b px-4 py-3 transition-all duration-300 ease-out flex items-center gap-5
                  ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                <Icon />
                <div className="flex flex-col">
                  {link.label}
                  <p className="font-geist text-text-secondary/50 text-[13px] font-light">{link.description}</p>
                </div>
              </Link>
              )})}
          </div>

          <div className="flex justify-between description text-text-secondary/50 px-4 py-6 text-[12px]">
            <p>SPACED v2</p>
            <p>Em Atualização</p>
          </div>
        </div>
      </nav>

      <div className="bg-gray-100 flex items-center justify-center w-full py-1 border-b border-border">
        <TextShimmer className="font-geist text-[12px]" duration={2}>
          SPACED está de volta com uma nova versão
        </TextShimmer>
      </div>
    </>
  );
}