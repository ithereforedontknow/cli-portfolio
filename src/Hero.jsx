// Hero.jsx - FIXED with outcome-driven headline
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, MapPin, TrendingUp, Clock } from "lucide-react";

export function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5 },
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-zinc-950 flex flex-col justify-center px-6 overflow-hidden pt-20"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* REPLACED: "Available immediately" with confident positioning */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 mb-6 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Open for select contracts & full-stack roles
        </div>

        {/* NEW: Outcome-driven headline - tells value, not task */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
        >
          I turn manual chaos into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-400 to-white">
            web dashboards that save 15+ hours weekly.
          </span>
        </h1>

        {/* Profile Summary - tightened, less fluff */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed mb-8"
        >
          Jule Ethan Fontanilla • Full-stack developer bridging government
          inefficiency with modern UI. Based in{" "}
          <span className="inline-flex items-center gap-1 text-zinc-300 whitespace-nowrap">
            <MapPin className="w-4 h-4 text-pink-500 inline" /> Agoo, La Union
          </span>
        </p>

        {/* NEW: Impact badges - social proof without desperation */}
        <div className="flex flex-wrap gap-6 mb-10">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-zinc-400">
              2,000+ records managed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-zinc-400">
              15hrs/week saved for logistics
            </span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-lg shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            View measurable impact
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold rounded-lg hover:text-white hover:border-zinc-700 transition-colors duration-300"
          >
            Request portfolio audit
          </a>
        </div>
      </div>
    </section>
  );
}
