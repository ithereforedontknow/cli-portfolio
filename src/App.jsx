import { useState, useEffect, useRef } from "react";
import {
  Code as Github,
  Mail,
  Phone,
  MapPin,
  Download,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Terminal,
  Star,
  ArrowUpRight,
  ArrowUp,
  Image,
  User,
} from "lucide-react";

// ── Scroll fade‑up hook ───────────────────────────────────────────────────────
function useInView(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ── FadeUp wrapper ────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Terminal prompt ───────────────────────────────────────────────────────────
function Prompt({ path = "~" }) {
  return (
    <span className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[13px] select-none text-[#6c7086]">
      <span className="text-[#a6e3a1]">jule</span>
      <span className="text-[#6c7086]">@</span>
      <span className="text-[#89b4fa]">portfolio</span>
      <span className="text-[#6c7086]">:</span>
      <span className="text-[#cba6f7]">{path}</span>
      <span className="text-[#6c7086]">$</span>
    </span>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ path, accent = "#cba6f7" }) {
  return (
    <div className="flex items-center gap-4 mb-14 justify-center">
      <div className="flex-1 h-px bg-[#313244]" />
      <Prompt path={path} />
      <div className="flex-1 h-px bg-[#313244]" />
    </div>
  );
}

// ── Tag ───────────────────────────────────────────────────────────────────────
function Tag({ children, accent = "#cba6f7" }) {
  return (
    <span
      className="inline-block px-[11px] py-1 rounded font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs tracking-wider border bg-[#313244]"
      style={{ color: accent, borderColor: accent + "44" }}
    >
      {children}
    </span>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function Card({
  children,
  accent = "#cba6f7",
  featured = false,
  className = "",
}) {
  return (
    <div
      className={`relative rounded-lg p-6 lg:p-7 border-t border-r border-b border-[#313244] bg-[#181825] ${className}`}
      style={{ borderLeftWidth: "3px", borderLeftColor: accent }}
    >
      {featured && (
        <div
          className="absolute top-4 right-4 font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase flex items-center gap-1"
          style={{ color: accent }}
        >
          <Star size={12} />
          featured
        </div>
      )}
      {children}
    </div>
  );
}

// ── Image placeholder component ───────────────────────────────────────────────
function ImagePlaceholder({
  accent = "#cba6f7",
  height = "h-48",
  text = "Screenshot coming soon",
}) {
  return (
    <div
      className={`${height} rounded-md border border-dashed flex flex-col items-center justify-center gap-2 bg-[#1e1e2e]`}
      style={{ borderColor: accent + "66" }}
    >
      <Image size={32} style={{ color: accent + "88" }} />
      <span
        className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs"
        style={{ color: accent + "88" }}
      >
        {text}
      </span>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "ovms",
    featured: true,
    accent: "#74c7ec",
    name: "Online Vehicle Management System",
    client: "Universal Leaf Philippines, Inc.",
    type: "Capstone · Full-Stack",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    summary:
      "Led end-to-end development for a real corporate client — replaced a manual spreadsheet process used by their ~20-person logistics team with a real-time web dashboard.",
    bullets: [
      "Replaced manual Excel tracking with a real-time web dashboard, saving an estimated 15+ hours/week for the logistics team.",
      "Designed full database schema (vehicles, drivers, trip logs, maintenance) handling 500+ trip records with zero data loss.",
      "Sole developer from requirements gathering through client delivery — integrated feedback from 3 department heads.",
    ],
    challenge:
      "Modeling trip state transitions (idle → dispatched → in-transit → returned) in a way non-technical staff could actually operate.",
    images: [
      { label: "Dashboard view", height: "h-56" },
      { label: "Database schema (ERD)", height: "h-48" },
    ],
    demoUrl: null,
    githubUrl: "https://github.com/ithereforedontknow/ovms",
  },
  {
    id: "spillthebeans",
    featured: false,
    accent: "#f5c2e7",
    name: "SpillTheBeans",
    client: "Personal Project",
    type: "Social Media · Full-Stack",
    stack: ["React", "Tailwind CSS", "Appwrite"],
    summary:
      "Full-stack social media web app on a modern BaaS architecture — auth, real-time data, and file storage without a custom backend.",
    bullets: [
      "Implemented auth, post creation, likes, and follow system using Appwrite, supporting multiple concurrent users.",
      "Designed component architecture in React with shared state across feeds and profiles.",
      "Demonstrated ability to ship a production-grade app solo using modern cloud services.",
    ],
    challenge:
      "Learned Appwrite from scratch mid-project — had to rethink data relationships without a traditional relational DB.",
    images: [
      { label: "Feed page", height: "h-56" },
      { label: "Profile page", height: "h-48" },
    ],
    demoUrl: null,
    githubUrl: "https://github.com/ithereforedontknow/spillthebeans",
  },
];

const EXPERIENCE = [
  {
    title: "Government Internship Program (GIP)",
    org: "LGU — Agoo, La Union",
    period: "Mar 2026 – Present",
    accent: "#89b4fa",
    bullets: [
      "Data encoding and database management for active LGU projects (2000+ citizen records maintained).",
      "Technical support: hardware troubleshooting and software setup for staff, reducing average ticket resolution time.",
      "Contributed to internal database development and maintenance.",
    ],
  },
  {
    title: "Information Technology Intern",
    org: "COMELEC — Agoo, La Union",
    period: "Feb 2025 – May 2025",
    accent: "#94e2d5",
    bullets: [
      "Built and maintained Excel spreadsheets for election data tracking, improving reporting accuracy.",
      "Processed official documents, assisted clients, performed accurate data entry under tight deadlines.",
      "IT support: tested components, diagnosed connectivity, replaced faulty hardware.",
    ],
  },
];

const SKILLS = [
  {
    label: "Languages & Frameworks",
    accent: "#89b4fa",
    items: ["PHP", "JavaScript", "HTML5", "CSS3", "React", "Tailwind CSS"],
  },
  {
    label: "Backend & Database",
    accent: "#94e2d5",
    items: ["MySQL", "Appwrite", "REST APIs", "Database Design"],
  },
  {
    label: "Tools & Workflow",
    accent: "#cba6f7",
    items: ["VS Code", "Zed", "Git", "Google Suite", "MS Office"],
  },
  {
    label: "Design",
    accent: "#f5c2e7",
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { threshold: 0.35 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#11111b]/95 border-b border-[#313244] backdrop-blur-[14px]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[13px] font-bold border-0 bg-transparent cursor-pointer text-[#cba6f7] flex items-center gap-1.5"
        >
          <Terminal size={14} />
          jule@portfolio
        </button>

        {/* Desktop nav + resume */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs px-3 py-1.5 rounded border-0 cursor-pointer transition-all duration-200 ${
                active === id
                  ? "bg-[#cba6f7]/20 text-[#cba6f7]"
                  : "bg-transparent text-[#6c7086]"
              }`}
            >
              {label}
            </button>
          ))}
          {/* Resume button in navbar */}
          <a
            href="/resume.pdf"
            download
            className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs px-3 py-1.5 rounded border cursor-pointer transition-all duration-200 flex items-center gap-1.5 ml-2 border-[#cba6f7]/40 text-[#cba6f7] hover:bg-[#cba6f7]/15"
          >
            <Download size={12} />
            resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 border-0 bg-transparent cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-[#cba6f7] transition-all ${
              mobileOpen ? "rotate-45 translate-y-[5px] translate-x-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#cba6f7] transition-all ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#cba6f7] transition-all ${
              mobileOpen
                ? "-rotate-45 -translate-y-[5px] translate-x-[5px]"
                : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 border-t border-[#313244] bg-[#11111b]/95 backdrop-blur-[14px]">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`w-full text-left font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm px-4 py-3 rounded border-0 cursor-pointer transition-all flex items-center gap-2 ${
                active === id
                  ? "bg-[#cba6f7]/20 text-[#cba6f7]"
                  : "bg-transparent text-[#7f849c]"
              }`}
            >
              <ChevronRight size={12} />
              {label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            download
            className="w-full text-left font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm px-4 py-3 rounded cursor-pointer transition-all flex items-center gap-2 mt-1 border border-[#cba6f7]/40 text-[#cba6f7]"
          >
            <Download size={12} />
            download resume
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8 py-20 sm:py-16 text-center bg-[#11111b]">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #313244 2px, transparent 2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none bg-[#cba6f7]/20" />
      <div className="absolute bottom-1/4 translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 pointer-events-none bg-[#89b4fa]/20" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(17,17,27,0) 0%, rgba(17,17,27,0.8) 52%, rgba(17,17,27,1) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[680px] mx-auto">
        {/* Tagline */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-5 py-2 rounded font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm border border-[#313244] bg-[#181825] text-[#74c7ec] gap-2">
            <Terminal size={14} />
            Full-Stack Developer — I build apps from database to deployment
          </div>
        </div>

        {/* Name */}
        <h1
          className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] font-bold leading-none mb-4 tracking-tight text-[#cdd6f4]"
          style={{ fontSize: "clamp(40px, 8vw, 86px)" }}
        >
          Jule Ethan
          <br />
          <span className="text-[#cba6f7]">Fontanilla</span>
        </h1>

        {/* Role */}
        <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-lg sm:text-xl mb-6 tracking-wide text-[#74c7ec]">
          <span className="text-[#6c7086]"># </span>
          Full-Stack Web Developer — PHP · React · MySQL
        </p>

        {/* Bio */}
        <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-lg leading-relaxed mb-10 max-w-[560px] mx-auto text-[#bac2de]">
          BS Information Technology graduate (Saint Louis College, 2025) who
          builds web applications end-to-end — from database schema to deployed
          UI. Open to full-stack roles — available immediately.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[15px] font-bold px-8 py-3.5 rounded-md border-0 cursor-pointer transition-all duration-200 hover:brightness-110 bg-[#cba6f7] text-[#1e1e2e] flex items-center justify-center gap-2"
          >
            <ArrowUpRight size={16} />
            view projects
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[15px] px-8 py-3.5 rounded-md border cursor-pointer transition-all duration-200 hover:bg-[#cba6f7]/20 border-[#cba6f7] text-[#cba6f7] bg-[#cba6f7]/10"
          >
            get in touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-[#6c7086]" />
      </div>
    </section>
  );
}

// ── Section background wrapper ────────────────────────────────────────────────
function SectionBg({ id, children, bg = "bg-[#1e1e2e]", padY = 96 }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${bg}`}
      style={{
        paddingTop: `${padY}px`,
        paddingBottom: `${padY}px`,
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, #313244 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8">
        {children}
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <SectionBg id="about" bg="bg-[#1e1e2e]">
      <FadeUp>
        <SectionLabel path="~/about" accent="#b4befe" />
      </FadeUp>
      <FadeUp delay={80}>
        <div
          className="relative rounded-lg p-6 lg:p-7 border-t border-r border-b border-[#313244] bg-[#181825]"
          style={{ borderLeftWidth: "3px", borderLeftColor: "#b4befe" }}
        >
          <div className="flex flex-col sm:flex-row gap-6 mb-6 items-center sm:items-start">
            {/* Profile photo placeholder */}
            <div className="flex-shrink-0 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full border-2 border-[#b4befe]/40 bg-[#1e1e2e] flex items-center justify-center overflow-hidden">
              <User size={48} className="text-[#b4befe]/60" />
            </div>

            {/* Terminal window */}
            <div className="flex-1 w-full rounded-md p-4 sm:p-5 font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm sm:text-[15px] leading-loose border border-[#313244] bg-[#1e1e2e]">
              <div className="flex gap-1.5 mb-3">
                <div className="w-[11px] h-[11px] rounded-full bg-[#f38ba8]" />
                <div className="w-[11px] h-[11px] rounded-full bg-[#f9e2af]" />
                <div className="w-[11px] h-[11px] rounded-full bg-[#a6e3a1]" />
              </div>
              {[
                { k: "name", v: "Jule Ethan E. Fontanilla", col: "#cdd6f4" },
                { k: "role", v: "Full-Stack Web Developer", col: "#74c7ec" },
                { k: "location", v: "Agoo, La Union, PH", col: "#a6e3a1" },
                {
                  k: "degree",
                  v: "BSIT — Saint Louis College",
                  col: "#f9e2af",
                },
                { k: "email", v: "juleethan@gmail.com", col: "#94e2d5" },
              ].map(({ k, v, col }) => (
                <div key={k} className="flex gap-2.5">
                  <span className="text-[#cba6f7] min-w-[82px]">{k}</span>
                  <span className="text-[#6c7086]">~</span>
                  <span style={{ color: col }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-lg leading-relaxed mb-4 text-[#bac2de]">
            I build web applications from the ground up — database design,
            server-side logic, and the UI that users actually touch. My capstone
            project was delivered to a real corporate client (Universal Leaf
            Philippines), giving me early exposure to requirements gathering,
            iterative feedback, and shipping under deadline.
          </p>
          <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-lg leading-relaxed text-[#bac2de]">
            I learn new tools rapidly and I'm comfortable being the only
            developer in the room.
          </p>
        </div>
      </FadeUp>
    </SectionBg>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ p }) {
  const accent = p.accent;
  return (
    <div
      className="relative rounded-lg p-6 lg:p-7 border-t border-r border-b border-[#313244] bg-[#181825]"
      style={{ borderLeftWidth: "3px", borderLeftColor: accent }}
    >
      {p.featured && (
        <div
          className="absolute top-4 right-4 font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase flex items-center gap-1"
          style={{ color: accent }}
        >
          <Star size={12} />
          featured
        </div>
      )}

      <div className="mb-3">
        <h3
          className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] font-bold text-xl sm:text-2xl mb-1.5"
          style={{ color: accent }}
        >
          {p.name}
        </h3>
        <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[13px] text-[#7f849c]">
          {p.client} · {p.type}
        </p>
      </div>

      <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-[17px] leading-relaxed mb-4 text-[#bac2de]">
        {p.summary}
      </p>

      {/* Screenshots / image placeholders */}
      {p.images && p.images.length > 0 && (
        <div
          className={`grid gap-3 mb-5 ${p.images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
        >
          {p.images.map((img, i) => (
            <ImagePlaceholder
              key={i}
              accent={accent}
              height={img.height || "h-48"}
              text={img.label || "Screenshot coming soon"}
            />
          ))}
        </div>
      )}

      {/* Bullets */}
      <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase mb-3 text-[#6c7086]">
        what i built
      </p>
      <ul className="list-none p-0 mb-5 space-y-2.5">
        {p.bullets.map((b, i) => (
          <li
            key={i}
            className="flex gap-2.5 font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-[16px] leading-relaxed text-[#bac2de]"
          >
            <span className="flex-shrink-0" style={{ color: accent }}>
              ▸
            </span>
            {b}
          </li>
        ))}
      </ul>

      {/* Challenge */}
      {p.challenge && (
        <>
          <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase mb-2.5 text-[#6c7086]">
            technical challenge
          </p>
          <p
            className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-[16px] leading-relaxed italic p-3 sm:p-4 rounded border-l-2 mb-5 bg-[#1e1e2e] text-[#a6adc8]"
            style={{ borderColor: accent }}
          >
            {p.challenge}
          </p>
        </>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-3 mb-5">
        {p.demoUrl && (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[13px] px-4 py-2 rounded border cursor-pointer transition-all duration-200 hover:opacity-80 flex items-center gap-1.5"
            style={{
              color: accent,
              borderColor: accent + "66",
              backgroundColor: accent + "10",
            }}
          >
            <ExternalLink size={13} />
            live demo
          </a>
        )}
        {p.githubUrl && (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[13px] px-4 py-2 rounded border cursor-pointer transition-all duration-200 hover:opacity-80 flex items-center gap-1.5"
            style={{
              color: accent,
              borderColor: accent + "66",
              backgroundColor: accent + "10",
            }}
          >
            <Github size={13} />
            source code
          </a>
        )}
        {!p.demoUrl && !p.githubUrl && (
          <span className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[13px] text-[#6c7086] italic">
            links coming soon
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {p.stack.map((t) => (
          <span
            key={t}
            className="inline-block px-[11px] py-1 rounded font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs tracking-wider border bg-[#313244]"
            style={{ color: accent, borderColor: accent + "44" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <SectionBg id="projects" bg="bg-[#11111b]">
      <FadeUp>
        <SectionLabel path="~/projects" accent="#89b4fa" />
      </FadeUp>
      <div className="flex flex-col gap-5">
        {PROJECTS.map((p, i) => (
          <FadeUp key={p.id} delay={i * 90}>
            <ProjectCard p={p} />
          </FadeUp>
        ))}
      </div>
    </SectionBg>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function Experience() {
  return (
    <SectionBg id="experience" bg="bg-[#1e1e2e]">
      <FadeUp>
        <SectionLabel path="~/experience" accent="#94e2d5" />
      </FadeUp>

      {/* Timeline */}
      <div className="border-l-2 border-[#45475a] pl-8 sm:pl-9 mb-14">
        {EXPERIENCE.map((exp, i) => {
          const accent = exp.accent;
          return (
            <FadeUp key={i} delay={i * 100}>
              <div
                className={`relative ${i < EXPERIENCE.length - 1 ? "mb-10" : ""}`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[42px] sm:-left-[45px] top-2 w-3.5 h-3.5 rounded-full border-2 border-[#1e1e2e]"
                  style={{ backgroundColor: accent }}
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                  <h3
                    className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] font-bold text-lg sm:text-[21px] m-0"
                    style={{ color: accent }}
                  >
                    {exp.title}
                  </h3>
                  <span className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[13px] text-[#6c7086]">
                    {exp.period}
                  </span>
                </div>
                <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm sm:text-[15px] mb-3.5 text-[#7f849c]">
                  {exp.org}
                </p>
                <div
                  className="relative rounded-lg p-6 lg:p-7 border-t border-r border-b border-[#313244] bg-[#181825]"
                  style={{ borderLeftWidth: "3px", borderLeftColor: accent }}
                >
                  {exp.bullets.map((b, j) => (
                    <div
                      key={j}
                      className={`flex gap-2.5 font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-[16px] leading-relaxed text-[#bac2de] ${
                        j < exp.bullets.length - 1 ? "mb-3" : ""
                      }`}
                    >
                      <span className="flex-shrink-0 text-[#a6e3a1]">▸</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>

      {/* Education */}
      <FadeUp delay={200}>
        <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase mb-4 text-[#6c7086]">
          education
        </p>
        <div
          className="relative rounded-lg p-6 lg:p-7 border-t border-r border-b border-[#313244] bg-[#181825]"
          style={{ borderLeftWidth: "3px", borderLeftColor: "#a6e3a1" }}
        >
          <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
            <h3 className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] font-bold text-lg sm:text-[21px] m-0 text-[#a6e3a1]">
              BS Information Technology
            </h3>
            <span className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm sm:text-[15px] text-[#fab387]">
              July 2025
            </span>
          </div>
          <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-[17px] mb-4 text-[#bac2de]">
            Saint Louis College — San Fernando, La Union
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Database Systems",
              "Software Development",
              "Systems Analysis",
              "Web Development",
            ].map((c) => (
              <span
                key={c}
                className="inline-block px-[11px] py-1 rounded font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs tracking-wider border bg-[#313244] text-[#a6e3a1]"
                style={{ borderColor: "#a6e3a144" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </FadeUp>
    </SectionBg>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <SectionBg id="skills" bg="bg-[#11111b]">
      <FadeUp>
        <SectionLabel path="~/skills" accent="#f5c2e7" />
      </FadeUp>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SKILLS.map((g, i) => {
          const accent = g.accent;
          return (
            <FadeUp key={g.label} delay={i * 70}>
              <div
                className="relative rounded-lg p-6 lg:p-7 border-t border-r border-b border-[#313244] bg-[#181825]"
                style={{ borderLeftWidth: "3px", borderLeftColor: accent }}
              >
                <p
                  className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-[11px] tracking-widest uppercase mb-3.5"
                  style={{ color: accent }}
                >
                  {g.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block px-[11px] py-1 rounded font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs tracking-wider border bg-[#313244]"
                      style={{ color: accent, borderColor: accent + "44" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          );
        })}
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
      accent: "#a6e3a1",
      icon: Mail,
    },
    {
      label: "phone",
      value: "+63 919 369 4589",
      href: "tel:+639193694589",
      accent: "#94e2d5",
      icon: Phone,
    },
    {
      label: "github",
      value: "ithereforedontknow",
      href: "https://github.com/ithereforedontknow",
      accent: "#cba6f7",
      icon: Github,
    },
    {
      label: "location",
      value: "Agoo, La Union, PH",
      href: null,
      accent: "#f9e2af",
      icon: MapPin,
    },
  ];

  return (
    <SectionBg id="contact" bg="bg-[#1e1e2e]">
      <FadeUp>
        <SectionLabel path="~/contact" accent="#cba6f7" />
      </FadeUp>
      <FadeUp delay={60}>
        <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-lg leading-relaxed mb-8 max-w-[520px] mx-auto text-center text-[#bac2de]">
          I'm seeking full-stack or web development roles. If you need someone
          who can own the full build — let's talk.
        </p>
      </FadeUp>
      <FadeUp delay={130}>
        <div
          className="relative rounded-lg p-6 lg:p-7 border-t border-r border-b border-[#313244] bg-[#181825] max-w-[520px] mx-auto"
          style={{ borderLeftWidth: "3px", borderLeftColor: "#cba6f7" }}
        >
          {items.map(({ label, value, href, accent, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm min-w-[76px] flex items-center gap-2 text-[#6c7086]">
                <Icon size={14} />
                {label}
              </span>
              <span className="text-[#585b70]">│</span>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-[17px] no-underline transition-opacity duration-200 hover:opacity-70 flex items-center gap-1"
                  style={{ color: accent }}
                >
                  {value}
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span
                  className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-base sm:text-[17px]"
                  style={{ color: accent }}
                >
                  {value}
                </span>
              )}
            </div>
          ))}

          {/* Resume download */}
          <div className="mt-4 pt-4 border-t border-[#313244]">
            <a
              href="/resume.pdf"
              download
              className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm sm:text-[15px] no-underline inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-70 text-[#cba6f7]"
            >
              <Download size={16} />
              Download Resume (PDF)
            </a>
          </div>

          <div className="mt-3 font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-sm text-[#a6e3a1]">
            ✓ Available for full-time roles and freelance projects.
          </div>
        </div>
      </FadeUp>
    </SectionBg>
  );
}

// ── Back to top button ────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center bg-[#181825] border-[#cba6f7]/40 text-[#cba6f7] shadow-lg"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[#313244] bg-[#11111b] px-4 sm:px-8 py-7">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
        <p className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs m-0 text-[#6c7086]">
          © 2025 Jule Ethan Fontanilla · Built with React + Tailwind CSS +
          Catppuccin Mocha
        </p>
        <div className="flex gap-5">
          {[
            { l: "email", h: "mailto:juleethan@gmail.com", icon: Mail },
            {
              l: "github",
              h: "https://github.com/ithereforedontknow",
              icon: Github,
            },
          ].map(({ l, h, icon: Icon }) => (
            <a
              key={l}
              href={h}
              target="_blank"
              rel="noreferrer"
              className="font-['Cascadia_Code','Fira_Code','JetBrains_Mono',monospace] text-xs no-underline transition-opacity duration-200 hover:opacity-70 flex items-center gap-1 text-[#7f849c]"
            >
              <Icon size={13} />
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
    <div className="min-h-screen overflow-x-hidden bg-[#1e1e2e] text-[#cdd6f4]">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
