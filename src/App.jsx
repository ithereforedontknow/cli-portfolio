import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Code as Github,
  Mail,
  Phone,
  FileText,
  ArrowUp,
  ArrowRight,
  ExternalLink,
  Clock,
  MapPin,
  Award,
  Cpu,
} from "lucide-react";

const PROJECTS = [
  {
    type: "Enterprise production system",
    client: "Universal Leaf Philippines, Inc.",
    title: "Online Vehicle Management System",
    problem:
      "Logistics team spent 15 hours weekly manually copying trip data between Excel sheets, causing data entry errors and delayed dispatches.",
    solution:
      "Built OVMS with state tracking (idle → dispatched → returned) and automated reporting.",
    result:
      "15 hours/week recovered — an estimated $7,800 annual savings, with zero data entry errors post-launch.",
    keyDecision:
      "Chose PHP + MySQL over Node.js due to existing company infrastructure and IT team familiarity.",
    metrics: [
      ["hours saved", "15+"],
      ["records", "2,000+"],
      ["error reduction", "100%"],
    ],
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/ithereforedontknow/ovms",
  },
  {
    type: "Social platform MVP",
    client: "Independent project",
    title: "SpillTheBeans",
    problem:
      "No lightweight, privacy-focused discussion platform for niche communities tired of algorithm-driven feeds.",
    solution:
      "Built a full-stack social MVP with real-time posts, user auth, and zero trackers.",
    result:
      "50+ beta users in the first month, 200+ organic posts, deployed on the free tier with 99.9% uptime.",
    keyDecision:
      "Selected Appwrite over Firebase for better cost predictability and simpler React integration.",
    metrics: [
      ["users", "50+"],
      ["posts", "200+"],
      ["uptime", "99.9%"],
    ],
    stack: ["React", "Tailwind CSS", "Appwrite"],
    github: "https://github.com/ithereforedontknow/spillthebeans",
  },
];

const TIMELINE = [
  {
    current: true,
    date: "Jan 2026 — Present",
    role: "Government Internship Program (GIP)",
    org: "LGU — Agoo, La Union",
    bullets: [
      ["2,000+ citizen records", " maintained with 99.9% data accuracy"],
      [
        "Technical support",
        ": hardware troubleshooting and software deployment, reducing resolution time by 40%",
      ],
      ["Built internal tracking system", " that saved staff 8 hours/week"],
    ],
  },
  {
    current: false,
    date: "Feb 2025 — May 2025",
    role: "Information Technology Intern",
    org: "COMELEC — Agoo, La Union",
    bullets: [
      ["Maintained tracking sheets", " for 500+ election operational data points"],
      [
        "Diagnostic hardware checks",
        " and setup modifications under 48-hour deadlines",
      ],
      ["Reduced system downtime", " by 25% through proactive maintenance"],
    ],
  },
];

const FACTS = [
  ["Focus", "Full-stack (PHP / React)"],
  ["Based in", "Agoo, La Union, PH"],
  ["Response time", "Within 24 hours"],
  ["Currently", "Government Internship Program"],
];

const TERMINAL_LINES = [
  { text: "❯ whoami", cls: "term-prompt" },
  { text: "jule_fontanilla — full-stack developer", cls: "term-muted" },
  { text: "\u00A0", cls: "" },
  { text: "❯ cat mission.txt", cls: "term-prompt" },
  { text: '"find the manual, error-prone process', cls: "term-str" },
  { text: 'and replace it with something that works."', cls: "term-str" },
  { text: "\u00A0", cls: "" },
  { text: "❯ ./status --check", cls: "term-prompt" },
];

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="app" data-theme={theme}>
      <style>{`
        :root {
          --accent: #F55EF5;
          --accent-soft: rgba(245, 94, 245, 0.12);
          --accent-line: rgba(245, 94, 245, 0.35);
          --term-green: #6EE7A8;
          --term-blue: #7DD3FC;
          --term-amber: #FBBF6E;
          --radius-sm: 6px;
          --radius-md: 10px;
          --radius-lg: 16px;
        }
        .app[data-theme="dark"] {
          --bg: #09090b;
          --bg-grid-line: rgba(255,255,255,0.05);
          --bg-grid-fade: rgba(9,9,11,0);
          --surface: #131316;
          --surface-2: #18181c;
          --border: #26262b;
          --border-soft: #1c1c20;
          --text: #f4f4f5;
          --text-muted: #9c9ca6;
          --text-dim: #67676f;
          --shadow: 0 8px 30px rgba(0,0,0,0.45);
          --glow: rgba(245, 94, 245, 0.28);
          color-scheme: dark;
        }
        .app[data-theme="light"] {
          --bg: #fafafa;
          --bg-grid-line: rgba(24,24,27,0.055);
          --bg-grid-fade: rgba(250,250,250,0);
          --surface: #ffffff;
          --surface-2: #f4f4f6;
          --border: #e6e6ea;
          --border-soft: #ececef;
          --text: #18181b;
          --text-muted: #5b5b64;
          --text-dim: #9494a0;
          --shadow: 0 8px 30px rgba(24,24,27,0.08);
          --glow: rgba(109, 94, 245, 0.16);
          color-scheme: light;
        }
        .app * { box-sizing: border-box; }
        .app {
          position: relative;
          min-height: 100vh;
          background-color: var(--bg);
          color: var(--text);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          background-image:
            linear-gradient(var(--bg-grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--bg-grid-line) 1px, transparent 1px);
          background-size: 44px 44px;
          background-position: -1px -1px;
          transition: background-color 0.3s ease;
        }
        .app::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 900px 560px at 50% -8%, var(--glow), var(--bg-grid-fade) 70%);
          z-index: 0;
        }
        .mono { font-family: "JetBrains Mono", "SF Mono", Menlo, monospace; }
        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

        nav.topbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          background: color-mix(in srgb, var(--bg) 72%, transparent);
          border-bottom: 1px solid var(--border-soft);
        }
        .topbar-inner { max-width: 1180px; margin: 0 auto; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: flex; align-items: center; gap: 9px; font-weight: 700; letter-spacing: -0.01em; color: var(--text); text-decoration: none; }
        .brand-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); flex-shrink: 0; }
        .brand-mono { font-family: "JetBrains Mono", monospace; font-size: 13px; color: var(--text-dim); }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 13.5px; font-weight: 500; font-family: "JetBrains Mono", monospace; letter-spacing: -0.01em; transition: color 0.15s ease; }
        .nav-links a:hover { color: var(--text); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .icon-btn { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); color: var(--text-muted); cursor: pointer; transition: all 0.15s ease; }
        .icon-btn:hover { color: var(--text); border-color: var(--accent-line); }
        .btn { display: inline-flex; align-items: center; gap: 7px; padding: 0 16px; height: 36px; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 600; text-decoration: none; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; font-family: "Inter", sans-serif; }
        .btn-primary { background: var(--accent); color: #ffffff; box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02); }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .btn-ghost { background: var(--surface); border-color: var(--border); color: var(--text); }
        .btn-ghost:hover { border-color: var(--accent-line); color: var(--text); }

        .hero { padding: 168px 0 96px; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 10px 5px 8px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--text-muted); margin-bottom: 22px; }
        .eyebrow .pulse { width: 6px; height: 6px; border-radius: 50%; background: var(--term-green); position: relative; }
        .eyebrow .pulse::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid var(--term-green); opacity: 0.5; animation: pulse 2s ease-out infinite; }
        @keyframes pulse { 0% { transform: scale(0.6); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
        h1.headline { font-size: 52px; line-height: 1.06; letter-spacing: -0.03em; font-weight: 800; margin: 0 0 22px; color: var(--text); }
        h1.headline .accent-text { color: var(--accent); }
        p.bio { font-family: "JetBrains Mono", monospace; font-size: 14px; line-height: 1.75; color: var(--text-muted); max-width: 480px; margin: 0 0 32px; }
        p.bio .hl { color: var(--text); }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 34px; }
        .hero-meta { display: flex; gap: 22px; flex-wrap: wrap; }
        .hero-meta-item { display: flex; align-items: center; gap: 7px; font-family: "JetBrains Mono", monospace; font-size: 12.5px; color: var(--text-dim); }
        .hero-meta-item svg { width: 13px; height: 13px; }

        .terminal-wrap { position: relative; }
        .terminal-wrap::before { content: ""; position: absolute; inset: -30px; background: radial-gradient(circle at 60% 30%, var(--glow), transparent 65%); filter: blur(10px); z-index: -1; }
        .terminal { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow); overflow: hidden; }
        .terminal-bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid var(--border-soft); background: var(--surface-2); }
        .terminal-dots { display: flex; gap: 6px; }
        .terminal-dots span { width: 9px; height: 9px; border-radius: 50%; background: var(--border); }
        .terminal-title { font-family: "JetBrains Mono", monospace; font-size: 11.5px; color: var(--text-dim); }
        .terminal-body { padding: 20px 22px 24px; font-family: "JetBrains Mono", monospace; font-size: 13px; line-height: 1.9; }
        .term-line { opacity: 0; transform: translateY(4px); animation: termIn 0.45s ease forwards; }
        .term-line:nth-child(1) { animation-delay: 0.15s; }
        .term-line:nth-child(2) { animation-delay: 0.45s; }
        .term-line:nth-child(3) { animation-delay: 0.7s; }
        .term-line:nth-child(4) { animation-delay: 0.95s; }
        .term-line:nth-child(5) { animation-delay: 1.25s; }
        .term-line:nth-child(6) { animation-delay: 1.5s; }
        .term-line:nth-child(7) { animation-delay: 1.75s; }
        .term-line:nth-child(8) { animation-delay: 2.0s; }
        .term-line:nth-child(9) { animation-delay: 2.3s; }
        .term-line:nth-child(10) { animation-delay: 2.55s; }
        .term-line:nth-child(11) { animation-delay: 2.8s; }
        @keyframes termIn { to { opacity: 1; transform: translateY(0); } }
        .term-prompt { color: var(--accent); }
        .term-str { color: var(--term-green); }
        .term-key { color: var(--term-blue); }
        .term-ok { color: var(--term-green); }
        .term-pending { color: var(--term-amber); }
        .term-muted { color: var(--text-muted); }
        .cursor { display: inline-block; width: 6px; height: 13px; background: var(--accent); margin-left: 4px; vertical-align: -2px; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        section.sec { padding: 76px 0; border-top: 1px solid var(--border-soft); position: relative; z-index: 1; }
        .section-head { margin-bottom: 40px; }
        .section-eyebrow { font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 10px; display: flex; align-items: center; gap: 8px; }
        .section-eyebrow::before { content: "//"; color: var(--text-dim); }
        h2.section-title { font-size: 30px; letter-spacing: -0.02em; font-weight: 700; margin: 0; color: var(--text); }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
        .stat-card { background: var(--surface); padding: 22px 20px; }
        .stat-label { font-family: "JetBrains Mono", monospace; font-size: 11.5px; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.04em; }
        .stat-value { font-size: 16px; font-weight: 600; color: var(--text); letter-spacing: -0.01em; }

        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .project-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 26px; display: flex; flex-direction: column; transition: border-color 0.2s ease, transform 0.2s ease; }
        .project-card:hover { border-color: var(--accent-line); transform: translateY(-2px); }
        .project-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 16px; }
        .project-type { font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.04em; }
        .project-client { font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--text-dim); background: var(--surface-2); border: 1px solid var(--border-soft); padding: 3px 9px; border-radius: 999px; }
        .project-title { font-size: 20px; font-weight: 700; letter-spacing: -0.015em; margin: 0 0 18px; }
        .psr-row { display: flex; gap: 10px; padding: 10px 0; border-top: 1px dashed var(--border); }
        .psr-row:first-of-type { border-top: none; }
        .psr-label { font-family: "JetBrains Mono", monospace; font-size: 10.5px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; width: 64px; flex-shrink: 0; padding-top: 2px; }
        .psr-text { font-size: 13.5px; line-height: 1.6; color: var(--text-muted); }
        .psr-row.result .psr-label { color: var(--accent); }
        .psr-row.result .psr-text { color: var(--text); }
        .key-decision { margin-top: 16px; padding: 12px 14px; background: var(--surface-2); border-radius: var(--radius-sm); border-left: 2px solid var(--accent); }
        .key-decision-label { font-family: "JetBrains Mono", monospace; font-size: 10.5px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .key-decision-text { font-size: 12.5px; line-height: 1.6; color: var(--text-muted); }
        .metrics-row { display: flex; gap: 8px; flex-wrap: wrap; margin: 18px 0 16px; }
        .metric-pill { font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--text-muted); background: var(--surface-2); border: 1px solid var(--border-soft); padding: 5px 10px; border-radius: 999px; }
        .metric-pill b { color: var(--text); font-weight: 600; }
        .stack-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 20px; }
        .stack-tag { font-family: "JetBrains Mono", monospace; font-size: 11px; color: var(--text-muted); border: 1px solid var(--border); padding: 4px 9px; border-radius: var(--radius-sm); }
        .project-links { display: flex; gap: 18px; padding-top: 16px; border-top: 1px solid var(--border-soft); margin-top: auto; }
        .project-links a { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; text-decoration: none; color: var(--text-muted); }
        .project-links a:hover { color: var(--text); }
        .project-links a.primary { color: var(--accent); }
        .project-links svg { width: 14px; height: 14px; }

        .exp-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; }
        .timeline { position: relative; padding-left: 26px; }
        .timeline::before { content: ""; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 1px; background: var(--border); }
        .tl-item { position: relative; margin-bottom: 34px; }
        .tl-item:last-child { margin-bottom: 0; }
        .tl-dot { position: absolute; left: -26px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: var(--bg); border: 2px solid var(--border); }
        .tl-item.current .tl-dot { border-color: var(--accent); background: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
        .tl-date { font-family: "JetBrains Mono", monospace; font-size: 11.5px; color: var(--text-dim); }
        .tl-item.current .tl-date { color: var(--accent); }
        .tl-role { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; margin: 4px 0 2px; }
        .tl-org { font-size: 13px; color: var(--text-dim); margin-bottom: 10px; }
        .tl-list { margin: 0; padding: 0; list-style: none; }
        .tl-list li { font-size: 13.5px; line-height: 1.65; color: var(--text-muted); padding-left: 16px; position: relative; margin-bottom: 6px; }
        .tl-list li::before { content: "▸"; position: absolute; left: 0; color: var(--accent); font-size: 11px; top: 3px; }
        .tl-list b { color: var(--text); font-weight: 600; }

        .skill-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 22px; margin-bottom: 16px; }
        .skill-panel.core { border-color: var(--accent-line); background: linear-gradient(180deg, var(--accent-soft), transparent 60%); }
        .skill-panel-head { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13.5px; margin-bottom: 14px; }
        .skill-panel-head svg { width: 15px; height: 15px; color: var(--accent); }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag { font-family: "JetBrains Mono", monospace; font-size: 12px; padding: 6px 11px; border-radius: var(--radius-sm); background: var(--surface); border: 1px solid var(--border); color: var(--text); }
        .skill-panel.core .skill-tag { background: var(--surface); border-color: var(--accent-line); color: var(--accent); }
        .skill-note { font-family: "JetBrains Mono", monospace; font-size: 11.5px; color: var(--text-dim); margin-top: 14px; font-style: italic; }

        footer.foot { padding: 76px 0 0; position: relative; z-index: 1; }
        .footer-cta { max-width: 560px; margin-bottom: 48px; }
        .footer-cta h3 { font-size: 24px; font-weight: 700; letter-spacing: -0.015em; margin: 0 0 10px; }
        .footer-cta p { font-size: 14px; color: var(--text-muted); margin: 0; line-height: 1.6; }
        .footer-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding-bottom: 40px; border-bottom: 1px solid var(--border-soft); }
        .footer-col-title { font-family: "JetBrains Mono", monospace; font-size: 11.5px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; }
        .footer-link { display: flex; align-items: center; gap: 9px; font-size: 13.5px; color: var(--text-muted); text-decoration: none; margin-bottom: 10px; }
        .footer-link:hover { color: var(--text); }
        .footer-link svg { width: 14px; height: 14px; color: var(--accent); flex-shrink: 0; }
        .legal-band { display: flex; align-items: center; justify-content: space-between; padding: 22px 0; font-family: "JetBrains Mono", monospace; font-size: 11.5px; color: var(--text-dim); flex-wrap: wrap; gap: 10px; }
        .legal-band button { background: none; border: none; color: var(--text-dim); font-family: "JetBrains Mono", monospace; font-size: 11.5px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .legal-band button:hover { color: var(--text); }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding-top: 128px; gap: 44px; }
          h1.headline { font-size: 38px; }
          .projects-grid { grid-template-columns: 1fr; }
          .exp-grid { grid-template-columns: 1fr; gap: 44px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-cols { grid-template-columns: 1fr; gap: 26px; }
          .nav-links { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor, .eyebrow .pulse::after, .term-line { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <nav className="topbar">
        <div className="topbar-inner">
          <a href="#" className="brand">
            <span className="brand-dot" />
            Jule Ethan <span className="brand-mono">/fontanilla</span>
          </a>
          <div className="nav-links">
            <a href="#projects">projects</a>
            <a href="#experience">experience</a>
            <a href="#skills">skills</a>
            <a href="#contact">contact</a>
          </div>
          <div className="nav-right">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a
              className="btn btn-ghost"
              href="https://github.com/ithereforedontknow"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="wrap">
        {/* HERO */}
        <section className="hero" style={{ borderTop: "none", paddingTop: 168 }}>
          <div>
            <div className="eyebrow">
              <span className="pulse" />
              open for select contracts &amp; full-stack roles
            </div>
            <h1 className="headline">
              Hi, I'm Jule —
              <br />
              building fast,
              <br />
              <span className="accent-text">reliable tools</span> for slow
              processes.
            </h1>
            <p className="bio">
              <span className="hl">$ whoami</span>
              <br />
              BS Information Technology, Saint Louis College '25. Full-stack
              developer based in <span className="hl">Agoo, La Union, PH</span>.
              Daily drivers: PHP, MySQL, React. Actively shipping in
              TypeScript, Node.js, Next.js and Docker. Currently serving a
              Government Internship Program while building production tools
              on the side.
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary">
                View measurable impact
                <ArrowRight size={14} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Request portfolio audit
              </a>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <Clock size={13} />
                Response within 24h
              </div>
              <div className="hero-meta-item">
                <MapPin size={13} />
                Agoo, La Union, PH
              </div>
            </div>
          </div>

          <div className="terminal-wrap">
            <div className="terminal">
              <div className="terminal-bar">
                <div className="terminal-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="terminal-title">jule@devbox — zsh</div>
                <div style={{ width: 40 }} />
              </div>
              <div className="terminal-body">
                {TERMINAL_LINES.map((line, i) => (
                  <div className={`term-line ${line.cls}`} key={i}>
                    {line.text}
                  </div>
                ))}
                <div className="term-line">
                  <span className="term-ok">[✓]</span>{" "}
                  <span className="term-key">2,000+</span> records managed
                </div>
                <div className="term-line">
                  <span className="term-ok">[✓]</span>{" "}
                  <span className="term-key">15hrs</span>/week saved for
                  logistics
                </div>
                <div className="term-line">
                  <span className="term-pending">[…]</span> shipping next.js
                  migration
                  <span className="cursor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          className="sec"
          style={{ paddingTop: 0, paddingBottom: 0, borderTop: "none" }}
        >
          <div className="stats-grid">
            {FACTS.map(([label, value]) => (
              <div className="stat-card" key={label}>
                <div className="stat-label">{label}</div>
                <div className="stat-value">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="sec">
          <div className="section-head">
            <p className="section-eyebrow">measurable outcomes</p>
            <h2 className="section-title">
              Impact delivered, not just code written.
            </h2>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div className="project-card" key={p.title}>
                <div className="project-top">
                  <span className="project-type">{p.type}</span>
                  <span className="project-client">{p.client}</span>
                </div>
                <h3 className="project-title">{p.title}</h3>

                <div className="psr-row">
                  <div className="psr-label">Problem</div>
                  <div className="psr-text">{p.problem}</div>
                </div>
                <div className="psr-row">
                  <div className="psr-label">Solution</div>
                  <div className="psr-text">{p.solution}</div>
                </div>
                <div className="psr-row result">
                  <div className="psr-label">Result</div>
                  <div className="psr-text">{p.result}</div>
                </div>

                <div className="key-decision">
                  <div className="key-decision-label">Key decision</div>
                  <div className="key-decision-text">{p.keyDecision}</div>
                </div>

                <div className="metrics-row">
                  {p.metrics.map(([k, v]) => (
                    <span className="metric-pill" key={k}>
                      {k}: <b>{v}</b>
                    </span>
                  ))}
                </div>
                <div className="stack-row">
                  {p.stack.map((s) => (
                    <span className="stack-tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={p.github} target="_blank" rel="noreferrer">
                    <Github size={14} />
                    View code
                  </a>
                  <a
                    className="primary"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ExternalLink size={14} />
                    Live demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE + SKILLS */}
        <section id="experience" className="sec">
          <div className="exp-grid">
            <div>
              <div className="section-head">
                <p className="section-eyebrow">verified track record</p>
                <h2 className="section-title" style={{ fontSize: 26 }}>
                  Professional timeline
                </h2>
              </div>
              <div className="timeline">
                {TIMELINE.map((item) => (
                  <div
                    className={`tl-item ${item.current ? "current" : ""}`}
                    key={item.role}
                  >
                    <div className="tl-dot" />
                    <div className="tl-date">{item.date}</div>
                    <div className="tl-role">{item.role}</div>
                    <div className="tl-org">{item.org}</div>
                    <ul className="tl-list">
                      {item.bullets.map(([bold, rest], i) => (
                        <li key={i}>
                          <b>{bold}</b>
                          {rest}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div id="skills">
              <div className="section-head">
                <p className="section-eyebrow">technical proficiency</p>
                <h2 className="section-title" style={{ fontSize: 26 }}>
                  Core vs. familiar stack
                </h2>
              </div>

              <div className="skill-panel core">
                <div className="skill-panel-head">
                  <Award size={15} />
                  Production-ready (daily drivers)
                </div>
                <div className="skill-tags">
                  {["PHP", "MySQL", "JavaScript", "React", "Tailwind CSS", "Git"].map(
                    (s) => (
                      <span className="skill-tag" key={s}>
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="skill-panel">
                <div className="skill-panel-head">
                  <Cpu size={15} />
                  Familiar (actively mastering)
                </div>
                <div className="skill-tags">
                  {["Appwrite", "Node.js", "TypeScript", "Next.js", "Docker"].map(
                    (s) => (
                      <span className="skill-tag" key={s}>
                        {s}
                      </span>
                    )
                  )}
                </div>
                <div className="skill-note">
                  currently building with: Appwrite + React → live project in
                  beta
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer id="contact" className="foot">
        <div
          className="wrap"
          style={{ borderTop: "1px solid var(--border-soft)", paddingTop: 76 }}
        >
          <div className="footer-cta">
            <h3>
              Seeking full-stack roles (remote / La Union) or freelance web
              builds.
            </h3>
            <p>
              Ready to audit your current logistics dashboard or build your
              MVP from scratch. Response within 24 hours.
            </p>
          </div>

          <div className="footer-cols">
            <div>
              <div className="footer-col-title">Contact</div>
              <a className="footer-link" href="mailto:juleethan@gmail.com">
                <Mail size={14} />
                juleethan@gmail.com
              </a>
              <a className="footer-link" href="tel:+639193694589">
                <Phone size={14} />
                +63 919 369 4589
              </a>
            </div>
            <div>
              <div className="footer-col-title">Elsewhere</div>
              <a
                className="footer-link"
                href="https://github.com/ithereforedontknow"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={14} />
                GitHub
              </a>
            </div>
            <div>
              <div className="footer-col-title">Resume</div>
              <a
                className="footer-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    "Resume PDF would download here. In production, link to the actual /resume.pdf"
                  );
                }}
              >
                <FileText size={14} />
                Download resume (PDF)
              </a>
            </div>
          </div>

          <div className="legal-band">
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Jule Ethan Fontanilla • Full-stack
              developer
            </p>
            <button onClick={scrollToTop}>
              Back to top
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
