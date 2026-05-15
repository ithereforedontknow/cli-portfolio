import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ── Catppuccin Mocha ──────────────────────────────────────────────────────────
const C = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8",
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
};

const MONO =
  "'Cascadia Code','Cascadia Mono','Fira Code','JetBrains Mono',monospace";

// ── Hex → RGB ─────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

// ── DotGrid — faithful recreation of the ReactBits component ─────────────────
// Mirrors the full prop API. Uses vanilla rAF + spring physics so it works
// without GSAP InertiaPlugin (which requires a paid GSAP license).
function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = C.surface0,
  activeColor = C.mauve,
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  resistance = 750,
  returnDuration = 1.5,
  style = {},
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const ptr = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
  });
  const rafRef = useRef(null);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  // Build / rebuild dot grid
  const buildGrid = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const { width, height } = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const cell = dotSize + gap;
    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const sx = (width - gridW) / 2 + dotSize / 2;
    const sy = (height - gridH) / 2 + dotSize / 2;

    const dots = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        dots.push({
          cx: sx + c * cell,
          cy: sy + r * cell,
          ox: 0,
          oy: 0, // current offset
          vx: 0,
          vy: 0, // velocity for spring return
        });
    dotsRef.current = dots;
  }, [dotSize, gap]);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const proxSq = proximity * proximity;

    // Reusable circle path
    let circlePath = null;
    if (window.Path2D) {
      circlePath = new window.Path2D();
      circlePath.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    }

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: px, y: py } = ptr.current;

      for (const dot of dotsRef.current) {
        // Spring return physics — runs every frame
        const stiffness = 1 - Math.pow(0.001, 1 / (returnDuration * 60));
        dot.ox += (0 - dot.ox) * stiffness;
        dot.oy += (0 - dot.oy) * stiffness;
        if (Math.abs(dot.ox) < 0.01) dot.ox = 0;
        if (Math.abs(dot.oy) < 0.01) dot.oy = 0;

        const rx = dot.cx + dot.ox;
        const ry = dot.cy + dot.oy;
        const dx = dot.cx - px,
          dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let fillStyle = baseColor;
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          fillStyle = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(rx, ry);
        ctx.fillStyle = fillStyle;
        if (circlePath) {
          ctx.fill(circlePath);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [proximity, baseColor, baseRgb, activeRgb, dotSize, returnDuration]);

  // Build grid + ResizeObserver
  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  // Pointer events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e) => {
      const now = performance.now();
      const p = ptr.current;
      const dt = p.lastT ? now - p.lastT : 16;
      const ddx = e.clientX - p.lastX;
      const ddy = e.clientY - p.lastY;
      let vx = (ddx / dt) * 1000,
        vy = (ddy / dt) * 1000;
      const speed = Math.hypot(vx, vy);
      p.lastT = now;
      p.lastX = e.clientX;
      p.lastY = e.clientY;
      p.vx = vx;
      p.vy = vy;
      p.speed = speed;

      const rect = canvas.getBoundingClientRect();
      p.x = e.clientX - rect.left;
      p.y = e.clientY - rect.top;

      if (speed > speedTrigger) {
        for (const dot of dotsRef.current) {
          const dist = Math.hypot(dot.cx - p.x, dot.cy - p.y);
          if (dist < proximity) {
            const pushX = dot.cx - p.x + vx * 0.004;
            const pushY = dot.cy - p.y + vy * 0.004;
            const mag = Math.hypot(pushX, pushY);
            const scale = Math.min(mag, 60) / mag;
            dot.ox += pushX * scale * (1 - dist / proximity);
            dot.oy += pushY * scale * (1 - dist / proximity);
          }
        }
      }
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          dot.ox += (dot.cx - cx) * shockStrength * falloff * 0.8;
          dot.oy += (dot.cy - cy) * shockStrength * falloff * 0.8;
        }
      }
    };

    const onLeave = () => {
      ptr.current.x = -9999;
      ptr.current.y = -9999;
    };

    // Throttle mousemove to ~50ms
    let lastMove = 0;
    const throttled = (e) => {
      const now = performance.now();
      if (now - lastMove >= 50) {
        lastMove = now;
        onMove(e);
      }
    };

    window.addEventListener("mousemove", throttled, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", throttled);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [proximity, speedTrigger, shockRadius, shockStrength, returnDuration]);

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", height: "100%", position: "relative", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ── Thin dot-row divider between sections ─────────────────────────────────────
function DotDivider({ color = C.mauve }) {
  return (
    <div
      style={{
        height: 36,
        position: "relative",
        overflow: "hidden",
        background: C.crust,
      }}
    >
      <DotGrid
        dotSize={3}
        gap={10}
        baseColor={color + "55"}
        activeColor={color}
        proximity={60}
        shockRadius={80}
        shockStrength={3}
        returnDuration={1.2}
        style={{ height: "100%" }}
      />
    </div>
  );
}

// ── Scroll fade-up ────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      { threshold },
    );
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const v = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ease ${delay}ms,transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Shared primitives ─────────────────────────────────────────────────────────
function Prompt({ path = "~" }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 13,
        color: C.overlay0,
        userSelect: "none",
      }}
    >
      <span style={{ color: C.green }}>jule</span>
      <span style={{ color: C.overlay0 }}>@</span>
      <span style={{ color: C.blue }}>portfolio</span>
      <span style={{ color: C.overlay0 }}>:</span>
      <span style={{ color: C.mauve }}>{path}</span>
      <span style={{ color: C.overlay0 }}>$</span>
    </span>
  );
}

function SectionLabel({ path, accent = C.mauve }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 52,
        justifyContent: "center",
      }}
    >
      <div style={{ flex: 1, height: 1, background: C.surface0 }} />
      <Prompt path={path} />
      <div style={{ flex: 1, height: 1, background: C.surface0 }} />
    </div>
  );
}

function Tag({ children, accent = C.mauve }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 11px",
        borderRadius: 3,
        fontFamily: MONO,
        fontSize: 12,
        border: `1px solid ${accent}44`,
        background: C.surface0,
        color: accent,
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  );
}

function Card({ children, accent = C.mauve, featured = false, style = {} }) {
  return (
    <div
      style={{
        background: C.mantle,
        border: `1px solid ${C.surface0}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 8,
        padding: "24px 28px",
        position: "relative",
        ...style,
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          ★ featured
        </div>
      )}
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "ovms",
    featured: true,
    accent: "sapphire",
    name: "Online Vehicle Management System",
    client: "Universal Leaf Philippines, Inc.",
    type: "Capstone · Full-Stack",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    summary:
      "Led end-to-end development for a real corporate client — replaced a manual spreadsheet process used by their ~20-person logistics team with a real-time web dashboard.",
    bullets: [
      "Replaced manual Excel tracking with a real-time web dashboard used by the logistics team",
      "Designed the full database schema: vehicles, drivers, trip logs, maintenance records",
      "Sole developer from requirements gathering through client delivery",
    ],
    challenge:
      "Modeling trip state transitions (idle → dispatched → in-transit → returned) in a way non-technical staff could actually operate.",
  },
  {
    id: "spillthebeans",
    featured: false,
    accent: "pink",
    name: "SpillTheBeans",
    client: "Personal Project",
    type: "Social Media · Full-Stack",
    stack: ["React", "Tailwind CSS", "Appwrite"],
    summary:
      "Full-stack social media web app on a modern BaaS architecture — auth, real-time data, and file storage without a custom backend.",
    bullets: [
      "Implemented auth, post creation, likes, and follow system using Appwrite",
      "Designed component architecture in React with shared state across feeds and profiles",
      "Demonstrates ability to ship a production-grade app solo using modern cloud services",
    ],
    challenge:
      "Learned Appwrite from scratch mid-project — had to rethink data relationships without a traditional relational DB.",
  },
  {
    id: "musicme",
    featured: false,
    accent: "peach",
    name: "music.me",
    client: "Personal Project",
    type: "Frontend · React",
    stack: ["React", "Tailwind CSS"],
    summary:
      "A music discovery interface focused on clean component design and personalized playlist UX.",
    bullets: [
      "Built reusable card and playlist components with smooth state transitions",
      "Focused on visual hierarchy and typography for a media-forward layout",
    ],
    challenge: null,
  },
];

const EXPERIENCE = [
  {
    title: "Government Internship Program (GIP)",
    org: "LGU — Agoo, La Union",
    period: "Mar 2026 – Present",
    accent: "blue",
    bullets: [
      "Data encoding and database management for active LGU projects",
      "Technical support: hardware troubleshooting and software setup for staff",
      "Contributed to internal database development and maintenance",
    ],
  },
  {
    title: "Information Technology Intern",
    org: "COMELEC — Agoo, La Union",
    period: "Feb 2025 – May 2025",
    accent: "teal",
    bullets: [
      "Built and maintained Excel spreadsheets for election data tracking and reporting",
      "Processed official documents, assisted clients, performed accurate data entry",
      "IT support: tested components, diagnosed connectivity, replaced faulty hardware",
    ],
  },
];

const SKILLS = [
  {
    label: "Languages & Frameworks",
    accent: "blue",
    items: ["PHP", "JavaScript", "HTML5", "CSS3", "React", "Tailwind CSS"],
  },
  {
    label: "Backend & Database",
    accent: "teal",
    items: ["MySQL", "Appwrite", "REST APIs", "Database Design"],
  },
  {
    label: "Tools & Workflow",
    accent: "mauve",
    items: ["VS Code", "Zed", "Git", "Google Suite", "MS Office"],
  },
  {
    label: "Design",
    accent: "pink",
    items: ["Canva", "Adobe Photoshop", "Web Design", "Typography"],
  },
];

const NAV = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const o = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.35 },
    );
    els.forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? C.crust + "ee" : "transparent",
        borderBottom: scrolled
          ? `1px solid ${C.surface0}`
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 32px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 700,
            color: C.mauve,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          jule@portfolio
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                fontFamily: MONO,
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 4,
                background: active === id ? C.mauve + "20" : "transparent",
                color: active === id ? C.mauve : C.overlay0,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Hero — full DotGrid background ───────────────────────────────────────────
function Hero() {
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 32px 60px",
        textAlign: "center",
        background: C.crust,
      }}
    >
      {/* DotGrid fills the entire hero */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DotGrid
          dotSize={8}
          gap={24}
          baseColor={C.surface0}
          activeColor={C.mauve}
          proximity={140}
          speedTrigger={80}
          shockRadius={260}
          shockStrength={6}
          returnDuration={1.5}
          style={{ height: "100%" }}
        />
      </div>

      {/* Radial vignette so text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${C.crust}00 0%, ${C.crust}bb 52%, ${C.crust}ff 100%)`,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
        {/* Prompt chip */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              borderRadius: 4,
              background: C.mantle,
              border: `1px solid ${C.surface0}`,
            }}
          >
            <Prompt path="~" />
            <span style={{ fontFamily: MONO, fontSize: 13, color: C.text }}>
              cat introduction.txt
            </span>
          </div>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: "0 0 14px",
            fontSize: "clamp(46px,8.5vw,90px)",
            color: C.text,
            letterSpacing: "-0.03em",
          }}
        >
          Jule Ethan
          <br />
          <span style={{ color: C.mauve }}>Fontanilla</span>
          <span
            style={{
              display: "inline-block",
              width: "0.5em",
              height: "0.82em",
              background: C.mauve,
              marginLeft: 8,
              verticalAlign: "baseline",
              marginBottom: "0.05em",
              opacity: cursor ? 1 : 0,
              transition: "opacity 0.1s",
              borderRadius: 2,
            }}
          />
        </h1>

        {/* Role */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: 19,
            color: C.sapphire,
            margin: "0 0 22px",
            letterSpacing: "0.01em",
          }}
        >
          <span style={{ color: C.overlay0 }}># </span>
          Full-Stack Web Developer — PHP · React · MySQL
        </p>

        {/* Bio */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: 18,
            lineHeight: 1.85,
            color: C.subtext1,
            margin: "0 0 40px",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          BS Information Technology graduate (Saint Louis College, 2025) who
          builds web applications end-to-end — from database schema to deployed
          UI. Currently open to full-stack roles.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: MONO,
              fontSize: 15,
              fontWeight: 700,
              padding: "13px 32px",
              borderRadius: 6,
              background: C.mauve,
              color: C.base,
              border: "none",
              cursor: "pointer",
              transition: "filter 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.filter = "brightness(1.12)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.filter = "brightness(1)")
            }
          >
            view projects
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: MONO,
              fontSize: 15,
              padding: "13px 32px",
              borderRadius: 6,
              background: C.mauve + "15",
              color: C.mauve,
              border: `1px solid ${C.mauve}`,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = C.mauve + "28")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = C.mauve + "15")
            }
          >
            get in touch
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Section wrapper with subtle dot background ────────────────────────────────
function SectionBg({
  id,
  children,
  bg = C.base,
  dotColor = C.surface0,
  dotActive = C.surface1,
  padY = 96,
}) {
  return (
    <section
      id={id}
      style={{
        padding: `${padY}px 32px`,
        position: "relative",
        overflow: "hidden",
        background: bg,
      }}
    >
      {/* Very subtle, fine dot grid — purely decorative, low contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.6,
          pointerEvents: "none",
        }}
      >
        <DotGrid
          dotSize={3}
          gap={18}
          baseColor={dotColor}
          activeColor={dotActive}
          proximity={80}
          speedTrigger={120}
          shockRadius={120}
          shockStrength={2}
          returnDuration={1.8}
          style={{ height: "100%" }}
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <SectionBg
      id="about"
      bg={C.base}
      dotColor={C.surface0}
      dotActive={C.surface1}
    >
      <FadeUp>
        <SectionLabel path="~/about" />
      </FadeUp>
      <FadeUp delay={80}>
        <Card accent={C.lavender}>
          <div
            style={{
              background: C.base,
              borderRadius: 6,
              padding: "18px 22px",
              marginBottom: 28,
              fontFamily: MONO,
              fontSize: 15,
              lineHeight: 2,
              border: `1px solid ${C.surface0}`,
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[C.red, C.yellow, C.green].map((col) => (
                <div
                  key={col}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: col,
                  }}
                />
              ))}
            </div>
            {[
              { k: "name", v: "Jule Ethan E. Fontanilla", col: C.text },
              { k: "role", v: "Full-Stack Web Developer", col: C.sapphire },
              { k: "location", v: "Agoo, La Union, PH", col: C.green },
              { k: "degree", v: "BSIT — Saint Louis College", col: C.yellow },
              { k: "email", v: "juleethan@gmail.com", col: C.teal },
              { k: "status", v: "open to work ✓", col: C.green },
            ].map(({ k, v, col }) => (
              <div key={k} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: C.mauve, minWidth: 82 }}>{k}</span>
                <span style={{ color: C.overlay0 }}>~</span>
                <span style={{ color: col }}>{v}</span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 18,
              lineHeight: 1.85,
              color: C.subtext1,
              margin: "0 0 18px",
            }}
          >
            I build web applications from the ground up — database design,
            server-side logic, and the UI that users actually touch. My capstone
            project was delivered to a real corporate client (Universal Leaf
            Philippines), giving me early exposure to requirements gathering,
            iterative feedback, and shipping under deadline.
          </p>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 18,
              lineHeight: 1.85,
              color: C.subtext1,
              margin: 0,
            }}
          >
            I pick up new tools fast and I'm comfortable being the only
            developer in the room.
          </p>
        </Card>
      </FadeUp>
    </SectionBg>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function ProjectCard({ p }) {
  const [open, setOpen] = useState(false);
  const acc = C[p.accent] || C.mauve;
  return (
    <Card accent={acc} featured={p.featured}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 10,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 22,
              color: acc,
              margin: "0 0 5px",
            }}
          >
            {p.name}
          </h3>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 13,
              color: C.overlay1,
              margin: 0,
            }}
          >
            {p.client} · {p.type}
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            fontFamily: MONO,
            fontSize: 12,
            padding: "5px 13px",
            borderRadius: 4,
            border: `1px solid ${open ? acc : C.surface1}`,
            color: open ? acc : C.overlay0,
            background: open ? acc + "18" : "transparent",
            cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: 0,
            marginTop: 3,
          }}
        >
          {open ? "collapse ↑" : "expand ↓"}
        </button>
      </div>
      <p
        style={{
          fontFamily: MONO,
          fontSize: 17,
          lineHeight: 1.82,
          color: C.subtext1,
          margin: "0 0 14px",
        }}
      >
        {p.summary}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.stack.map((t) => (
          <Tag key={t} accent={acc}>
            {t}
          </Tag>
        ))}
      </div>
      {open && (
        <div
          style={{
            marginTop: 22,
            paddingTop: 22,
            borderTop: `1px solid ${C.surface0}`,
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: C.overlay0,
              margin: "0 0 12px",
            }}
          >
            what i built
          </p>
          <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none" }}>
            {p.bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 10,
                  fontFamily: MONO,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: C.subtext1,
                }}
              >
                <span style={{ color: acc, flexShrink: 0 }}>▸</span>
                {b}
              </li>
            ))}
          </ul>
          {p.challenge && (
            <>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: C.overlay0,
                  margin: "0 0 10px",
                }}
              >
                technical challenge
              </p>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: C.subtext0,
                  padding: "12px 18px",
                  borderRadius: 4,
                  background: C.base,
                  borderLeft: `2px solid ${acc}`,
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                {p.challenge}
              </p>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

function Projects() {
  return (
    <SectionBg
      id="projects"
      bg={C.crust}
      dotColor={C.surface0 + "cc"}
      dotActive={C.blue + "88"}
    >
      <FadeUp>
        <SectionLabel path="~/projects" accent={C.blue} />
      </FadeUp>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {PROJECTS.map((p, i) => (
          <FadeUp key={p.id} delay={i * 90}>
            <ProjectCard p={p} />
          </FadeUp>
        ))}
      </div>
    </SectionBg>
  );
}

// ── Experience + Education ────────────────────────────────────────────────────
function Experience() {
  return (
    <SectionBg
      id="experience"
      bg={C.base}
      dotColor={C.surface0}
      dotActive={C.teal + "66"}
    >
      <FadeUp>
        <SectionLabel path="~/experience" accent={C.teal} />
      </FadeUp>

      <div
        style={{
          borderLeft: `2px solid ${C.surface1}`,
          paddingLeft: 36,
          marginBottom: 60,
        }}
      >
        {EXPERIENCE.map((exp, i) => {
          const acc = C[exp.accent];
          return (
            <FadeUp key={i} delay={i * 100}>
              <div
                style={{
                  position: "relative",
                  marginBottom: i < EXPERIENCE.length - 1 ? 40 : 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: -45,
                    top: 7,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: acc,
                    border: `2px solid ${C.base}`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                    gap: "8px 16px",
                    marginBottom: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: MONO,
                      fontWeight: 700,
                      fontSize: 21,
                      color: acc,
                      margin: 0,
                    }}
                  >
                    {exp.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 13,
                      color: C.overlay0,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: 15,
                    color: C.overlay1,
                    margin: "0 0 14px",
                  }}
                >
                  {exp.org}
                </p>
                <Card accent={acc}>
                  {exp.bullets.map((b, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: 10,
                        marginBottom: j < exp.bullets.length - 1 ? 12 : 0,
                        fontFamily: MONO,
                        fontSize: 16,
                        lineHeight: 1.75,
                        color: C.subtext1,
                      }}
                    >
                      <span style={{ color: C.green, flexShrink: 0 }}>▸</span>
                      {b}
                    </div>
                  ))}
                </Card>
              </div>
            </FadeUp>
          );
        })}
      </div>

      <FadeUp delay={200}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: C.overlay0,
            margin: "0 0 16px",
          }}
        >
          education
        </p>
        <Card accent={C.green}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <h3
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 21,
                color: C.green,
                margin: 0,
              }}
            >
              BS Information Technology
            </h3>
            <span style={{ fontFamily: MONO, fontSize: 15, color: C.peach }}>
              July 2025
            </span>
          </div>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 17,
              color: C.subtext1,
              margin: "0 0 18px",
            }}
          >
            Saint Louis College — San Fernando, La Union
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              "Database Systems",
              "Software Development",
              "Systems Analysis",
              "Web Development",
            ].map((c) => (
              <Tag key={c} accent={C.green}>
                {c}
              </Tag>
            ))}
          </div>
        </Card>
      </FadeUp>
    </SectionBg>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <SectionBg
      id="skills"
      bg={C.crust}
      dotColor={C.surface0 + "cc"}
      dotActive={C.pink + "77"}
    >
      <FadeUp>
        <SectionLabel path="~/skills" accent={C.pink} />
      </FadeUp>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 16,
        }}
      >
        {SKILLS.map((g, i) => (
          <FadeUp key={g.label} delay={i * 70}>
            <Card accent={C[g.accent]}>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: C[g.accent],
                  margin: "0 0 14px",
                }}
              >
                {g.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {g.items.map((item) => (
                  <Tag key={item} accent={C[g.accent]}>
                    {item}
                  </Tag>
                ))}
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>
    </SectionBg>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const items = [
    {
      label: "email",
      value: "juleethan@gmail.com",
      href: "mailto:juleethan@gmail.com",
      accent: "green",
    },
    {
      label: "phone",
      value: "+63 919 369 4589",
      href: "tel:+639193694589",
      accent: "teal",
    },
    {
      label: "github",
      value: "ithereforedontknow",
      href: "https://github.com/ithereforedontknow",
      accent: "mauve",
    },
    {
      label: "location",
      value: "Agoo, La Union, PH",
      href: null,
      accent: "yellow",
    },
  ];
  return (
    <SectionBg
      id="contact"
      bg={C.base}
      dotColor={C.surface0}
      dotActive={C.mauve + "66"}
    >
      <FadeUp>
        <SectionLabel path="~/contact" accent={C.mauve} />
      </FadeUp>
      <FadeUp delay={60}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 18,
            lineHeight: 1.85,
            color: C.subtext1,
            marginBottom: 32,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          I'm actively looking for full-stack or web development roles. If you
          need someone who can own the full build — let's talk.
        </p>
      </FadeUp>
      <FadeUp delay={130}>
        <Card accent={C.mauve} style={{ maxWidth: 520, margin: "0 auto" }}>
          {items.map(({ label, value, href, accent }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  color: C.overlay0,
                  minWidth: 76,
                }}
              >
                {label}
              </span>
              <span style={{ color: C.surface2 }}>│</span>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: MONO,
                    fontSize: 17,
                    color: C[accent],
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.68")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {value}
                </a>
              ) : (
                <span
                  style={{ fontFamily: MONO, fontSize: 17, color: C[accent] }}
                >
                  {value}
                </span>
              )}
            </div>
          ))}
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: `1px solid ${C.surface0}`,
              fontFamily: MONO,
              fontSize: 14,
              color: C.green,
            }}
          >
            ✓ Available for full-time roles and freelance projects.
          </div>
        </Card>
      </FadeUp>
    </SectionBg>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: C.crust,
        borderTop: `1px solid ${C.surface0}`,
        padding: "28px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: C.overlay0,
            margin: 0,
          }}
        >
          © 2025 Jule Ethan Fontanilla · Built with React + Catppuccin Mocha
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { l: "email", h: "mailto:juleethan@gmail.com" },
            { l: "github", h: "https://github.com/ithereforedontknow" },
          ].map(({ l, h }) => (
            <a
              key={l}
              href={h}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: MONO,
                fontSize: 12,
                color: C.overlay1,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.mauve)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.overlay1)}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div
      style={{
        background: C.base,
        color: C.text,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Hero />
      <DotDivider color={C.sapphire} />
      <About />
      <DotDivider color={C.pink} />
      <Projects />
      <DotDivider color={C.teal} />
      <Experience />
      <DotDivider color={C.mauve} />
      <Skills />
      <DotDivider color={C.green} />
      <Contact />
      <Footer />
    </div>
  );
}
