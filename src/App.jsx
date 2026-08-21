import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowUp, Mail, Phone, Code as Github } from "lucide-react";

const THEMES = ["dark", "light", "pink"];

const PROJECTS = [
  {
    index: "01",
    title: "Spill the Beans",
    year: "2026",
    description:
      "Find cafes built for deep work. Rated by remote workers on WiFi, power, noise, and more.",
    tags: ["React", "TypeScript","Supabase", "TanStack Query"],
    href: "https://github.com/ithereforedontknow/spillthebeans",
  },
  {
    index: "02",
    title: "ClockIn/Out",
    year: "2025",
    description:
      "HR platform with a built-in LMS — time tracking, approvals, and courses with auto-scored quizzes and generated PDF certificates, secured with row-level access rules.",
    tags: ["React", "TypeScript", "Supabase", "TanStack Query"],
    href: "https://github.com/ithereforedontknow/clockinout",
  },
  {
    index: "03",
    title: "Photo Layout Pro",
    year: "2025",
    description:
      "Guided photo-layout generator with three bin-packing algorithms reaching up to 95% sheet efficiency, plus a built-in print-cost calculator — all processed client-side.",
    tags: ["React", "TypeScript", "jsPDF", "Tailwind CSS"],
    href: "https://github.com/ithereforedontknow/photo-layout-pro",
  },
];

const EXPERIENCE = [
  {
    date: "Jan 2026 — Present",
    role: "Government Internship Program (GIP)",
    org: "LGU — Agoo, La Union",
    detail:
      "Maintaining 2,000+ citizen records at 99.9% accuracy, cutting IT support resolution time by 40%, and shipping an internal tracking tool that saves staff 8 hours a week.",
  },
  {
    date: "Feb 2025 — May 2025",
    role: "Information Technology Intern",
    org: "COMELEC — Agoo, La Union",
    detail:
      "Kept tracking sheets for 500+ election data points, ran hardware diagnostics under 48-hour deadlines, and cut system downtime by 25% through proactive maintenance.",
  },
];

/* ---------------------------------------------------------------------
   RotatingText — from React Bits, ported as-is (JS + CSS variant).
--------------------------------------------------------------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span className={cn("text-rotate", mainClassName)} {...rest} layout transition={transition}>
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cn(splitBy === "lines" ? "text-rotate-lines" : "text-rotate")}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn("text-rotate-word", splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce((sum, word) => sum + word.characters.length, 0)
                      ),
                    }}
                    className={cn("text-rotate-element", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});
RotatingText.displayName = "RotatingText";

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div data-theme={theme} className="min-h-screen bg-bg text-ink font-sans antialiased transition-colors duration-300 overflow-x-hidden">
      {/* NAV */}
      <nav className="sticky top-0 z-30 bg-bg/95 backdrop-blur border-b border-hairline">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="font-semibold text-base sm:text-lg tracking-tight text-ink truncate mr-4">
            Jule Ethan Fontanilla
          </a>
          <div className="hidden md:flex items-center gap-8 font-mono text-sm text-muted">
            <a href="#work" className="hover:text-ink transition-colors">work</a>
            <a href="#about" className="hover:text-ink transition-colors">about</a>
            <a href="#contact" className="hover:text-ink transition-colors">contact</a>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-label={`Switch to ${t} theme`}
                title={t}
                className={cn(
                  "w-4 h-4 rounded-full border border-hairline",
                  t === "dark" && "bg-[#0e0e10]",
                  t === "light" && "bg-[#fafaf8]",
                  t === "pink" && "bg-[#ff4fa0]",
                  theme === t && "ring-2 ring-ink ring-offset-2 ring-offset-bg"
                )}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 md:pt-36 pb-20 sm:pb-28 md:pb-32">
        <p className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-dim tracking-wide mb-6 sm:mb-9">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          FULL-STACK DEVELOPER — AGOO, PHILIPPINES
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] sm:leading-[0.96] mb-8 sm:mb-10 max-w-4xl">
          I build software
          <br />
          for{" "}
          <RotatingText
            texts={["barangays.", "HR teams.", "print shops."]}
            mainClassName="inline-flex text-accent"
            staggerFrom="last"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            staggerDuration={0.02}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            rotationInterval={2200}
          />
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl leading-relaxed mb-10 sm:mb-12">
          Jule Ethan Fontanilla. Three production systems shipped this year —
          a multi-tenant e-governance platform, an HR/LMS suite, and a client
          photo-layout tool. React, TypeScript, Node, PostgreSQL, end to end.
        </p>

        <div className="flex flex-wrap gap-6 sm:gap-9">
          <a
            href="#work"
            className="inline-flex items-center gap-1.5 text-base font-medium text-ink border-b border-ink pb-1 hover:opacity-70 transition-opacity"
          >
            View work <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-base font-medium text-muted border-b border-hairline pb-1 hover:text-ink hover:border-ink transition-colors"
          >
            Get in touch <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative overflow-hidden border-t border-hairline">
        <span className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-4 sm:right-8 font-mono font-semibold text-[160px] sm:text-[220px] md:text-[260px] leading-none text-ink opacity-[0.045]">
          01
        </span>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28 md:py-36">
          <div className="mb-12 sm:mb-16">
            <p className="font-mono text-sm text-accent tracking-wide mb-3">selected work</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Impact delivered, not just code written.
            </h2>
          </div>

          <div>
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-[48px_1fr] md:grid-cols-[56px_1fr] gap-4 sm:gap-6 py-8 sm:py-10",
                  i !== 0 && "border-t border-hairline"
                )}
              >
                <div className="font-mono text-sm sm:text-base text-dim pt-1 hidden sm:block">{p.index}</div>
                <div>
                  <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs sm:text-sm text-dim sm:hidden">[{p.index}]</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{p.title}</h3>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-dim">{p.year}</span>
                  </div>
                  <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed mb-5">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs sm:text-sm text-muted border border-hairline rounded px-2.5 sm:px-3 py-1 sm:py-1.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-base font-medium text-ink hover:opacity-70 transition-opacity"
                  >
                    View code <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / EXPERIENCE + SKILLS */}
      <section id="about" className="relative overflow-hidden border-t border-hairline">
        <span className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-4 sm:right-8 font-mono font-semibold text-[160px] sm:text-[220px] md:text-[260px] leading-none text-ink opacity-[0.045]">
          02
        </span>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28 md:py-36">
          <div className="mb-12 sm:mb-16">
            <p className="font-mono text-sm text-accent tracking-wide mb-3">background</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Professional timeline</h2>
          </div>

          <div>
            {EXPERIENCE.map((e, i) => (
              <div
                key={e.role}
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-[180px_1fr] md:grid-cols-[200px_1fr] gap-2 sm:gap-8 py-8 sm:py-10",
                  i !== 0 && "border-t border-hairline"
                )}
              >
                <div className="font-mono text-xs sm:text-sm text-dim pt-1">{e.date}</div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-1">{e.role}</h3>
                  <p className="text-sm sm:text-base text-dim mb-3">{e.org}</p>
                  <p className="text-base md:text-lg text-muted leading-relaxed">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-hairline space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="font-mono text-sm text-dim min-w-[92px]">Core</span>
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {["React", "TypeScript", "Node.js / Express", "PostgreSQL", "Docker", "Tailwind CSS"].map(
                  (s, i, arr) => (
                    <span key={s} className="text-base text-ink">
                      {s}
                      {i !== arr.length - 1 && <span className="text-dim ml-2 hidden sm:inline">·</span>}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="font-mono text-sm text-dim min-w-[92px]">Exploring</span>
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {["Next.js", "Supabase", "Drizzle ORM", "Socket.IO"].map((s, i, arr) => (
                  <span key={s} className="text-base text-ink">
                    {s}
                    {i !== arr.length - 1 && <span className="text-dim ml-2 hidden sm:inline">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="relative overflow-hidden border-t border-hairline">
        <span className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-4 sm:right-8 font-mono font-semibold text-[160px] sm:text-[220px] md:text-[260px] leading-none text-ink opacity-[0.045]">
          03
        </span>

        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28 md:py-36">
          <div className="mb-12 sm:mb-16 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Seeking full-stack roles or freelance web builds.
            </h3>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Ready to audit your current system or build your MVP from scratch. Response within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10 mb-16 sm:mb-20">
            <a href="mailto:juleethan@gmail.com" className="flex items-center gap-2.5 text-base text-ink hover:opacity-70 transition-opacity">
              <Mail className="w-[18px] h-[18px] text-dim shrink-0" /> juleethan@gmail.com
            </a>
            <a href="tel:+639193694589" className="flex items-center gap-2.5 text-base text-ink hover:opacity-70 transition-opacity">
              <Phone className="w-[18px] h-[18px] text-dim shrink-0" /> +63 919 369 4589
            </a>
            <a
              href="https://github.com/ithereforedontknow"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-base text-ink hover:opacity-70 transition-opacity"
            >
              <Github className="w-[18px] h-[18px] text-dim shrink-0" /> GitHub
            </a>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-8 border-t border-hairline font-mono text-sm text-dim">
            <p className="m-0">© {new Date().getFullYear()} Jule Ethan Fontanilla</p>
            <button onClick={scrollToTop} className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-pointer">
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
