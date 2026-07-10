// Hero.jsx — white canvas, ink type, Rausch used once for emphasis
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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.4 },
      )
        .fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.35",
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-canvas px-6 pt-36 pb-16 md:pb-24"
    >
      {/* Faint warmth instead of a neon glow — surface-soft tint, barely there */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rausch/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Same max-w-7xl as every other section, so the headline's left edge
          lines up with the project cards and footer below it. */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-soft border border-hairline-soft text-sm text-body mb-6">
          <span className="w-2 h-2 rounded-full bg-rausch" />
          Open for select contracts &amp; full-stack roles
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-ink tracking-tight leading-[1.08] mb-6 max-w-4xl"
        >
          I turn manual chaos into <br />
          <span className="text-rausch">web dashboards that save 15+ hours weekly.</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-body max-w-2xl font-normal leading-relaxed mb-8"
        >
          Jule Ethan Fontanilla — full-stack developer bridging government
          inefficiency with modern UI. Based in{" "}
          <span className="inline-flex items-center gap-1 text-ink font-medium whitespace-nowrap">
            <MapPin className="w-4 h-4 text-rausch inline" /> Agoo, La Union
          </span>
        </p>

        <div className="flex flex-wrap gap-6 mb-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-soft">
            <TrendingUp className="w-4 h-4 text-rausch" />
            <span className="text-sm text-body">2,000+ records managed</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-soft">
            <Clock className="w-4 h-4 text-rausch" />
            <span className="text-sm text-body">15hrs/week saved for logistics</span>
          </div>
        </div>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 h-12 bg-rausch hover:bg-rausch-active text-white font-medium rounded-[8px] shadow-airbnb transition-colors duration-200"
          >
            View measurable impact
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="px-6 h-12 flex items-center bg-white border border-ink text-ink font-medium rounded-[8px] hover:bg-surface-soft transition-colors duration-200"
          >
            Request portfolio audit
          </a>
        </div>
      </div>
    </section>
  );
}
