// Navbar.jsx — floating pill nav, modeled on the search-bar-pill component
// (white surface, rounded-full, hairline border, single shadow tier),
// with a light frosted-glass treatment layered on top since Airbnb's
// own top-nav has none — this is the "just enough to align" translation.
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Terminal, Code as Github, FileText, Menu, X } from "lucide-react";

const LINKS = ["about", "projects", "experience", "contact"];

export function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 },
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
    >
      <div
        className={`flex items-center justify-between gap-4 rounded-full border px-4 sm:px-6 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-white/75 backdrop-blur-xl backdrop-saturate-150 border-hairline shadow-airbnb"
            : "bg-white/55 backdrop-blur-md backdrop-saturate-150 border-hairline-soft"
        }`}
      >
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 text-ink font-bold tracking-tight shrink-0"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rausch text-white">
            <Terminal className="w-4 h-4" />
          </span>
          <span className="hidden sm:inline">
            juleethan<span className="text-rausch">.dev</span>
          </span>
        </a>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-8 text-[16px] font-semibold text-ink">
          {LINKS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="capitalize relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rausch after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://github.com/ithereforedontknow"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-ink hover:bg-surface-soft transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium text-ink border border-ink hover:bg-ink hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-ink hover:bg-surface-soft transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden mt-2 rounded-[20px] border border-hairline bg-white/90 backdrop-blur-xl shadow-airbnb p-4 flex flex-col gap-1">
          {LINKS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setOpen(false)}
              className="capitalize px-3 py-2.5 rounded-[8px] text-ink font-semibold hover:bg-surface-soft transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 mt-1 px-3 py-2.5 rounded-[8px] text-sm font-medium text-ink border border-ink justify-center"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
