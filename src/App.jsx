import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowUp, Mail, Phone, Code as Github, Menu, X } from "lucide-react";

const THEMES = ["dark", "light", "pink"];
const GITHUB_USERNAME = "ithereforedontknow";

const PROJECTS = [
  {
    index: "01",
    title: "Spill the Beans",
    year: "2026",
    description:
      "Find cafes built for deep work. Rated by remote workers on WiFi, power, noise, and more.",
    tags: ["React", "TypeScript","Supabase", "TanStack Query"],
    href: "https://github.com/ithereforedontknow/spillthebeans",

    liveHref: "https://spillthebeans-three.vercel.app/",
    // Add a screenshot path/URL here to show a preview image on the card.
    image: "/screenshots/spillthebeans.png",
  },
  {
    index: "02",
    title: "ClockIn/Out",
    year: "2026",
    description:
      "HR platform with a built-in LMS — time tracking, approvals, and courses with auto-scored quizzes and generated PDF certificates, secured with row-level access rules.",
    tags: ["React", "TypeScript", "Supabase", "TanStack Query"],
    href: "https://github.com/ithereforedontknow/clockinout",
    liveHref: "",
    image: "/screenshots/clockinout.png",
  },
  {
    index: "03",
    title: "Printer ni Ethan",
    year: "2026",
    description:
      "Guided photo-layout generator with three bin-packing algorithms reaching up to 95% sheet efficiency, plus a built-in print-cost calculator — all processed client-side.",
    tags: ["React", "TypeScript", "jsPDF", "Tailwind CSS"],
    href: "https://github.com/ithereforedontknow/photo-layout-pro",
    liveHref: "https://printer-ni-ethan.juleethan.workers.dev/",
    image: "/screenshots/printer-ni-ethan.png",
  },
  // {
  //   index: "04",
  //   title: "music.me",
  //   year: "2026",
  //   description:
  //     "AI-powered music discovery app with a Tinder-like swipe interface, YouTube Music API integration, and Google Gemini for personalized recommendations. Features mood-based genre mapping, audio previews, a 'Surprise Me' feature, and a bento box visualization for saved tracks.",
  //   tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "YouTube Data API v3", "Google Generative AI"],
  //   href: "https://github.com/ithereforedontknow/music.me",
  //   liveHref: "https://music-me-green.vercel.app/",
  //   image: "/screenshots/music-me.png",
  // },
];

const EXPERIENCE = [
  {
    date: "March 2026 — Present",
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

/* ---------------------------------------------------------------------
   GithubContributions — fetches public contribution counts and renders
   a GitHub-style heatmap using the existing theme tokens.
--------------------------------------------------------------------- */
const LEVEL_OPACITY = [0, 28, 52, 76, 100];

function GithubContributions({ username }) {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const days = data.contributions || [];
        if (days.length === 0) throw new Error("empty");

        const total = days.reduce((sum, d) => sum + d.count, 0);

        let longest = 0;
        let current = 0;
        days.forEach((d) => {
          if (d.count > 0) {
            current += 1;
            longest = Math.max(longest, current);
          } else {
            current = 0;
          }
        });

        const startPad = new Date(`${days[0].date}T00:00:00`).getDay();
        const padded = Array.from({ length: startPad }, () => null).concat(days);
        const weeks = [];
        for (let i = 0; i < padded.length; i += 7) {
          weeks.push(padded.slice(i, i + 7));
        }

        const monthLabels = [];
        let lastMonth = null;
        weeks.forEach((week, wi) => {
          const firstDay = week.find(Boolean);
          if (!firstDay) return;
          const month = new Date(`${firstDay.date}T00:00:00`).getMonth();
          if (month !== lastMonth) {
            monthLabels.push({
              week: wi,
              label: new Date(`${firstDay.date}T00:00:00`).toLocaleString("en-US", { month: "short" }),
            });
            lastMonth = month;
          }
        });

        setState({ status: "ready", weeks, monthLabels, total, longest });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (state.status === "error") {
    return (
      <p className="text-base text-muted">
        Couldn't load live contribution data right now — see the full history on{" "}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-ink underline underline-offset-4 decoration-hairline hover:decoration-ink"
        >
          GitHub
        </a>
        .
      </p>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="animate-pulse">
        <div className="h-4 w-40 bg-hairline rounded mb-6" />
        <div className="h-[100px] w-full bg-hairline rounded" />
      </div>
    );
  }

  const { weeks, monthLabels, total, longest } = state;
  const cols = weeks.length;

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 mb-6 font-mono text-sm text-dim">
        <span>
          <span className="text-ink font-semibold">{total.toLocaleString()}</span> contributions in the past year
        </span>
        <span>
          <span className="text-ink font-semibold">{longest}</span>-day longest streak
        </span>
      </div>

      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div style={{ minWidth: cols * 14 }}>
          <div
            className="grid mb-1.5"
            style={{ gridTemplateColumns: `repeat(${cols}, 11px)`, columnGap: "3px" }}
          >
            {weeks.map((_, wi) => {
              const found = monthLabels.find((m) => m.week === wi);
              return (
                <span key={wi} className="text-[10px] font-mono text-dim leading-none whitespace-nowrap">
                  {found ? found.label : ""}
                </span>
              );
            })}
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 11px)`,
              gridTemplateRows: "repeat(7, 11px)",
              gridAutoFlow: "column",
              columnGap: "3px",
              rowGap: "3px",
            }}
          >
            {weeks.map((week, wi) =>
              week.map((day, di) => (
                <span
                  key={`${wi}-${di}`}
                  title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : undefined}
                  className="rounded-[2px]"
                  style={{
                    width: 11,
                    height: 11,
                    background: !day
                      ? "transparent"
                      : day.count === 0
                      ? "var(--color-hairline, rgba(128,128,128,0.16))"
                      : `color-mix(in srgb, var(--color-accent, currentColor) ${LEVEL_OPACITY[Math.min(day.level, 4)]}%, transparent)`,
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-4 font-mono text-[10px] text-dim">
        <span>Less</span>
        {LEVEL_OPACITY.map((op, i) => (
          <span
            key={i}
            className="rounded-[2px]"
            style={{
              width: 11,
              height: 11,
              background:
                op === 0
                  ? "var(--color-hairline, rgba(128,128,128,0.16))"
                  : `color-mix(in srgb, var(--color-accent, currentColor) ${op}%, transparent)`,
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.title = "Jule Ethan Fontanilla — Full-Stack Developer";
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { href: "#work", label: "work" },
    { href: "#activity", label: "github" },
    { href: "#about", label: "about" },
    { href: "#contact", label: "contact" },
  ];

  return (
    <div data-theme={theme} className="min-h-screen bg-bg text-ink font-sans antialiased transition-colors duration-300 overflow-x-hidden">
      {/* NAV */}
      <nav className="sticky top-0 z-30 bg-bg/95 backdrop-blur border-b border-hairline">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="font-semibold text-base sm:text-lg tracking-tight text-ink truncate mr-4">
            Jule Ethan Fontanilla
          </a>
          <div className="hidden md:flex items-center gap-8 font-mono text-sm text-muted">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-label={`Switch to ${t} theme`}
                title={t}
                className={cn(
                  "w-4 h-4 rounded-full border border-hairline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  t === "dark" && "bg-[#0e0e10]",
                  t === "light" && "bg-[#fafaf8]",
                  t === "pink" && "bg-[#ff4fa0]",
                  theme === t && "ring-2 ring-ink ring-offset-2 ring-offset-bg"
                )}
              />
            ))}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden ml-1 p-1 -mr-1 text-ink rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-hairline"
            >
              <div className="max-w-5xl mx-auto px-6 sm:px-8 py-6 flex flex-col gap-5 font-mono text-base text-muted">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
          I make
          <RotatingText
          texts={[
              "websites.",
              "systems.",
              "it work.",
              "things good."
            ]}
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

        <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl leading-relaxed mb-6">
          Hey, I'm Jule Ethan. Full-stack developer focused on simple, high-performance web software that makes work easier.

        </p>
        <p className="font-mono text-sm text-dim mb-10 sm:mb-12">
          Currently: {EXPERIENCE[0].role} at {EXPERIENCE[0].org}
        </p>
        <div className="flex flex-wrap gap-6 sm:gap-9">
          <a
            href="#work"
            className="inline-flex items-center gap-1.5 text-base font-medium text-ink border-b border-ink pb-1 hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
          >
            View work <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-base font-medium text-muted border-b border-hairline pb-1 hover:text-ink hover:border-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
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

                  {p.image && (
                    <div className="mb-5 rounded-lg overflow-hidden border border-hairline">
                      <img
                        src={p.image}
                        alt={`${p.title} preview`}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

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
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {p.liveHref && (
                      <a
                        href={p.liveHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-base font-medium text-ink hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
                      >
                        View live <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-base font-medium text-ink hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
                    >
                      View code <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GITHUB ACTIVITY */}
      <section id="activity" className="relative overflow-hidden border-t border-hairline">
        <span className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-4 sm:right-8 font-mono font-semibold text-[160px] sm:text-[220px] md:text-[260px] leading-none text-ink opacity-[0.045]">
          02
        </span>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28 md:py-36">
          <div className="mb-12 sm:mb-16 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-sm text-accent tracking-wide mb-3">activity</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Shipping in public.</h2>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-medium text-ink hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
            >
              @{GITHUB_USERNAME} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <GithubContributions username={GITHUB_USERNAME} />
        </div>
      </section>

      {/* ABOUT / EXPERIENCE + SKILLS */}
      <section id="about" className="relative overflow-hidden border-t border-hairline">
        <span className="pointer-events-none select-none absolute -top-6 sm:-top-10 right-4 sm:right-8 font-mono font-semibold text-[160px] sm:text-[220px] md:text-[260px] leading-none text-ink opacity-[0.045]">
          03
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
          04
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
            <a href="mailto:juleethan@gmail.com" className="flex items-center gap-2.5 text-base text-ink hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm">
              <Mail className="w-[18px] h-[18px] text-dim shrink-0" /> juleethan@gmail.com
            </a>
            <a href="tel:+639193694589" className="flex items-center gap-2.5 text-base text-ink hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm">
              <Phone className="w-[18px] h-[18px] text-dim shrink-0" /> +63 919 369 4589
            </a>
            <a
              href="https://github.com/ithereforedontknow"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-base text-ink hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
            >
              <Github className="w-[18px] h-[18px] text-dim shrink-0" /> GitHub
            </a>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-8 border-t border-hairline font-mono text-sm text-dim">
            <p className="m-0">© {new Date().getFullYear()} Jule Ethan Fontanilla</p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
