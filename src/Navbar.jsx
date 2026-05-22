// Navbar.jsx - MINOR FIXES (removed "skills" from nav to match actual sections)
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Terminal, Code as Github, FileText } from "lucide-react";

export function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/70 backdrop-blur-md px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity */}
        <a
          href="#"
          className="flex items-center gap-2 group text-white font-mono font-bold tracking-tight"
        >
          <Terminal className="w-5 h-5 text-pink-500 transition-transform group-hover:rotate-12" />
          <span>
            juleethan<span className="text-pink-500">.dev</span>
          </span>
        </a>

        {/* Navigation Links - FIXED: removed "skills" (now part of experience) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {["projects", "experience", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="hover:text-white transition-colors capitalize relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Action Elements */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ithereforedontknow"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          {/* FIXED: Resume link now works (points to # which triggers download in footer) */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-pink-500 transition-all duration-300"
          >
            <FileText className="w-3.5 h-3.5 text-pink-500" />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
