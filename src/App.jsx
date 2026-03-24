import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ── Catppuccin palettes ───────────────────────────────────────────────────────
const THEMES = {
  latte: {
    name: "latte",
    rosewater: "#dc8a78",
    flamingo: "#dd7878",
    pink: "#ea76cb",
    mauve: "#8839ef",
    red: "#d20f39",
    maroon: "#e64553",
    peach: "#fe640b",
    yellow: "#df8e1d",
    green: "#40a02b",
    teal: "#179299",
    sky: "#04a5e5",
    sapphire: "#209fb5",
    blue: "#1e66f5",
    lavender: "#7287fd",
    text: "#4c4f69",
    subtext1: "#5c5f77",
    subtext0: "#6c6f85",
    overlay2: "#7c7f93",
    overlay1: "#8c8fa1",
    overlay0: "#9ca0b0",
    surface2: "#acb0be",
    surface1: "#bcc0cc",
    surface0: "#ccd0da",
    base: "#eff1f5",
    mantle: "#e6e9ef",
    crust: "#dce0e8",
  },
  frappe: {
    name: "frappe",
    rosewater: "#f2d5cf",
    flamingo: "#eebebe",
    pink: "#f4b8e4",
    mauve: "#ca9ee6",
    red: "#e78284",
    maroon: "#ea999c",
    peach: "#ef9f76",
    yellow: "#e5c890",
    green: "#a6d189",
    teal: "#81c8be",
    sky: "#99d1db",
    sapphire: "#85c1dc",
    blue: "#8caaee",
    lavender: "#babbf1",
    text: "#c6d0f5",
    subtext1: "#b5bfe2",
    subtext0: "#a5adce",
    overlay2: "#949cbb",
    overlay1: "#838ba7",
    overlay0: "#737994",
    surface2: "#626880",
    surface1: "#51576d",
    surface0: "#414559",
    base: "#303446",
    mantle: "#292c3c",
    crust: "#232634",
  },
  macchiato: {
    name: "macchiato",
    rosewater: "#f4dbd6",
    flamingo: "#f0c6c6",
    pink: "#f5bde6",
    mauve: "#c6a0f6",
    red: "#ed8796",
    maroon: "#ee99a0",
    peach: "#f5a97f",
    yellow: "#eed49f",
    green: "#a6da95",
    teal: "#8bd5ca",
    sky: "#91d7e3",
    sapphire: "#7dc4e4",
    blue: "#8aadf4",
    lavender: "#b7bdf8",
    text: "#cad3f5",
    subtext1: "#b8c0e0",
    subtext0: "#a5adcb",
    overlay2: "#939ab7",
    overlay1: "#8087a2",
    overlay0: "#6e738d",
    surface2: "#5b6078",
    surface1: "#494d64",
    surface0: "#363a4f",
    base: "#24273a",
    mantle: "#1e2030",
    crust: "#181926",
  },
  mocha: {
    name: "mocha",
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
  },
};

// ── CSS custom property injection ─────────────────────────────────────────────
function useThemeVars(C) {
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(C).forEach(([k, v]) => {
      if (typeof v === "string" && v.startsWith("#")) {
        root.style.setProperty(`--c-${k}`, v);
      }
    });
  }, [C]);
}

// ── Responsive window width hook (replaces window.innerWidth in render) ───────
function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ── Typing animation hook ─────────────────────────────────────────────────────
function useTypewriter(text, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) {
      setDone(true);
      return;
    }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return { displayed, done };
}

// ── Shared prompt prefix — single source of truth ────────────────────────────
function PromptPrefix({ C }) {
  return (
    <>
      <span
        className="font-semibold text-[13px] flex-shrink-0"
        style={{ color: C.green }}
      >
        jule
      </span>
      <span style={{ color: C.overlay0 }}>@</span>
      <span
        className="font-semibold text-[13px] flex-shrink-0"
        style={{ color: C.blue }}
      >
        portfolio
      </span>
      <span style={{ color: C.overlay0 }}>:</span>
      <span className="text-[13px] flex-shrink-0" style={{ color: C.mauve }}>
        ~
      </span>
      <span style={{ color: C.overlay0 }}>$</span>
    </>
  );
}

// ── Contact info — shared between Fastfetch and AboutOutput ──────────────────
const CONTACT_INFO = [
  { icon: "📍", label: "Agoo, La Union" },
  { icon: "📞", label: "+63 919 369 4589" },
  { icon: "✉", label: "juleethan@gmail.com" },
  { icon: "🌐", label: "juleethan.vercel.app" },
];

// ── Fastfetch panel ───────────────────────────────────────────────────────────
function Fastfetch({ C }) {
  const swatches = [
    C.red,
    C.peach,
    C.yellow,
    C.green,
    C.teal,
    C.blue,
    C.mauve,
    C.pink,
  ];
  const rows = [
    { key: "user" },
    { key: null },
    { key: "name", val: "Jule Ethan E. Fontanilla", col: C.text },
    { key: "role", val: "Full-Stack Web Developer", col: C.sapphire },
    { key: "location", val: "Agoo, La Union, PH", col: C.green },
    { key: null },
    { key: "OS", val: "JULE-ETHAN-OS v1.0.0 LTS", col: C.text },
    { key: "shell", val: "bash 5.2.0", col: C.text },
    { key: "theme", val: `catppuccin-${C.name}`, col: C.mauve },
    { key: "editor", val: "VS Code / Zed", col: C.blue },
    { key: "stack", val: "React · PHP · MySQL · Tailwind", col: C.peach },
    { key: "degree", val: "BS Information Technology (2025)", col: C.yellow },
    { key: "email", val: "juleethan@gmail.com", col: C.teal },
    { key: "web", val: "juleethan.vercel.app", col: C.lavender },
    { key: null },
    { key: "colors" },
  ];

  return (
    <div
      className="flex flex-col md:flex-row gap-4 md:gap-6 mb-5 p-3 md:p-4 rounded-lg border"
      style={{ background: C.mantle, borderColor: C.surface0 }}
    >
      {/* Avatar — hidden on mobile */}
      <div className="hidden md:flex flex-shrink-0">
        <img
          src="/avatar.jpg"
          alt="Jule Ethan"
          className="rounded-md object-cover"
          style={{ width: 220, height: 220, border: `2px solid ${C.lavender}` }}
        />
      </div>

      {/* Info rows */}
      <div
        className="flex-1 min-w-0"
        style={{ fontSize: "clamp(12px,2.8vw,13.5px)", lineHeight: 1.0 }}
      >
        {rows.map((row, i) => {
          if (row.key === null) return <div key={i} className="h-1.5" />;
          if (row.key === "user")
            return (
              <div key={i} className="mb-1">
                <span
                  className="font-bold text-[13px]"
                  style={{ color: C.green }}
                >
                  jule
                </span>
                <span style={{ color: C.overlay0 }}>@</span>
                <span
                  className="font-bold text-[13px]"
                  style={{ color: C.blue }}
                >
                  portfolio
                </span>
              </div>
            );
          if (row.key === "colors")
            return (
              <div key={i} className="flex flex-wrap gap-1 mt-1">
                {swatches.map((s) => (
                  <div
                    key={s}
                    className="w-3.5 h-3.5 rounded-[3px]"
                    style={{ background: s }}
                  />
                ))}
                {swatches.map((s) => (
                  <div
                    key={s + "dim"}
                    className="w-3.5 h-3.5 rounded-[3px] opacity-40"
                    style={{ background: s }}
                  />
                ))}
              </div>
            );
          return (
            <div key={i} className="flex gap-0 mb-[5px] items-baseline">
              <span
                className="font-semibold"
                style={{ color: C.mauve, minWidth: 72 }}
              >
                {row.key}
              </span>
              <span className="mr-2" style={{ color: C.overlay0 }}>
                ~
              </span>
              <span style={{ color: row.col }}>{row.val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Typed prompt line (boot animation) ───────────────────────────────────────
function TypedPromptLine({ cmd, C, onDone }) {
  const { displayed, done } = useTypewriter(cmd, 55);
  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);
  return (
    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
      <PromptPrefix C={C} />
      <span className="text-[13px]" style={{ color: C.text }}>
        {displayed}
      </span>
      {!done && <span style={{ color: C.mauve }}>█</span>}
    </div>
  );
}

// ── Fade-in wrapper for command output ────────────────────────────────────────
function FadeIn({ children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.18s ease-out, transform 0.18s ease-out",
      }}
    >
      {children}
    </div>
  );
}

// ── Single history entry ──────────────────────────────────────────────────────
function TerminalEntry({ cmd, C, onTheme, animate, cmdHistory }) {
  const [showOutput, setShowOutput] = useState(!animate);
  const output = getCommandOutput(cmd, C, onTheme, cmdHistory);

  return (
    <div className="mb-[18px]">
      {animate ? (
        <TypedPromptLine cmd={cmd} C={C} onDone={() => setShowOutput(true)} />
      ) : (
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <PromptPrefix C={C} />
          <span className="text-[13px]" style={{ color: C.text }}>
            {cmd}
          </span>
        </div>
      )}
      {showOutput && (
        <FadeIn>
          <div className="text-[13px] font-[inherit]">{output}</div>
        </FadeIn>
      )}
    </div>
  );
}

// ── Command output resolver (pure function, not a hook) ───────────────────────
function getCommandOutput(cmd, C, onTheme, cmdHistory) {
  const parts = cmd.trim().split(/\s+/);
  const base = parts[0];
  const arg = parts[1] || "";

  switch (base) {
    case "help":
      return <HelpOutput C={C} />;
    case "fetch":
      return <Fastfetch C={C} />;
    case "about":
      return <AboutOutput C={C} />;
    case "skills":
      return <SkillsOutput C={C} />;
    case "projects":
      return <ProjectsOutput C={C} />;
    case "experience":
      return <ExperienceOutput C={C} />;
    case "education":
      return <EducationOutput C={C} />;
    case "contact":
      return <ContactOutput C={C} />;
    case "neofetch":
      return <NeofetchEgg C={C} />;
    case "theme":
      return <ThemeOutput C={C} arg={arg} onTheme={onTheme} />;
    case "open":
      return <OpenOutput C={C} arg={arg} />;
    case "sudo":
      return <SudoOutput C={C} arg={arg} />;
    case "cmatrix":
      return <CmatrixOutput C={C} />;
    case "ls":
      return <LsOutput C={C} />;
    case "fortune":
      return <FortuneOutput C={C} />;
    case "cowsay":
      return <CowsayOutput C={C} arg={parts.slice(1).join(" ")} />;
    case "pwd":
      return <PwdOutput C={C} />;
    case "exit":
      return <ExitOutput C={C} />;
    case "ping":
      return <PingOutput C={C} />;
    case "history":
      return <HistoryOutput C={C} cmdHistory={cmdHistory} />;
    case "whoami":
      return (
        <p className="text-[13px]" style={{ color: C.text }}>
          guest — visiting{" "}
          <span style={{ color: C.mauve }}>jule@portfolio</span>
        </p>
      );
    default:
      return (
        <p className="text-[13px]" style={{ color: C.red }}>
          command not found: <span style={{ color: C.maroon }}>{cmd}</span>.
          Type <span style={{ color: C.blue }}>help</span> for available
          commands.
        </p>
      );
  }
}

// ── Output components ─────────────────────────────────────────────────────────
function HistoryOutput({ C, cmdHistory }) {
  const list = [...cmdHistory].reverse();
  return (
    <div
      className="rounded-md border p-3"
      style={{ background: C.mantle, borderColor: C.surface0 }}
    >
      {list.length === 0 ? (
        <p className="text-[12px]" style={{ color: C.overlay0 }}>
          No history yet.
        </p>
      ) : (
        list.map((cmd, i) => (
          <div key={i} className="flex gap-4 mb-[3px] text-[12px]">
            <span
              className="min-w-[28px] text-right"
              style={{ color: C.overlay0 }}
            >
              {i + 1}
            </span>
            <span style={{ color: C.text }}>{cmd}</span>
          </div>
        ))
      )}
    </div>
  );
}

function HelpOutput({ C }) {
  const cmds = [
    ["about", "Who is Jule Ethan?"],
    ["skills", "Technical & design skills"],
    ["projects", "View portfolio projects"],
    ["experience", "Work history"],
    ["education", "Academic background"],
    ["contact", "Get in touch"],
    ["fetch", "Show fastfetch panel again"],
    ["theme <n>", "Switch theme: latte frappe macchiato mocha"],
    ["open <target>", "Open github | portfolio | email"],
    ["neofetch", "???"],
    ["clear", "Clear the terminal"],
    ["help", "Show this message"],
    ["sudo <cmd>", "Try your luck..."],
    ["cmatrix", "Enter the matrix"],
    ["ls", "List directory contents"],
    ["fortune", "Random quote or joke"],
    ["cowsay <msg>", "An ASCII cow speaks"],
    ["pwd", "Print working directory"],
    ["exit", "Shut down gracefully"],
    ["ping", "Ping the developer's brain"],
  ];
  return (
    <div style={{ lineHeight: 1.8 }}>
      <p className="mb-2 font-semibold" style={{ color: C.yellow }}>
        Available commands:
      </p>
      {cmds.map(([cmd, desc]) => (
        <div key={cmd} className="flex gap-4 mb-[2px] flex-wrap md:flex-nowrap">
          <span
            className="font-semibold w-[140px] flex-shrink-0 text-[12px] md:text-[13px]"
            style={{ color: C.blue }}
          >
            {cmd}
          </span>
          <span
            className="text-[12px] md:text-[13px]"
            style={{ color: C.subtext1 }}
          >
            {desc}
          </span>
        </div>
      ))}
    </div>
  );
}

function ThemeOutput({ C, arg, onTheme }) {
  const valid = ["latte", "frappe", "macchiato", "mocha"];
  useEffect(() => {
    if (valid.includes(arg)) onTheme?.(arg);
  }, [arg, onTheme]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!arg)
    return (
      <p className="text-[13px]" style={{ color: C.red }}>
        Usage: <span style={{ color: C.blue }}>theme &lt;name&gt;</span> —
        available:{" "}
        {valid.map((t) => (
          <span key={t} className="mr-2" style={{ color: C.mauve }}>
            {t}
          </span>
        ))}
      </p>
    );
  if (!valid.includes(arg))
    return (
      <p className="text-[13px]" style={{ color: C.red }}>
        Unknown theme <span style={{ color: C.maroon }}>{arg}</span>. Available:{" "}
        {valid.map((t) => (
          <span key={t} className="mr-2" style={{ color: C.mauve }}>
            {t}
          </span>
        ))}
      </p>
    );
  return (
    <p className="text-[13px]" style={{ color: C.green }}>
      ✓ Theme switched to{" "}
      <span className="font-semibold" style={{ color: C.mauve }}>
        catppuccin-{arg}
      </span>
    </p>
  );
}

function OpenOutput({ C, arg }) {
  const targets = {
    github: "https://github.com/ithereforedontknow",
    portfolio: "https://juleethan.vercel.app",
    email: "mailto:juleethan@gmail.com",
    resume: "/resume.pdf",
  };
  useEffect(() => {
    if (targets[arg]) {
      const t = setTimeout(() => window.open(targets[arg], "_blank"), 300);
      return () => clearTimeout(t);
    }
  }, [arg]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!arg || !targets[arg])
    return (
      <p className="text-[13px]" style={{ color: C.red }}>
        Usage: <span style={{ color: C.blue }}>open</span>{" "}
        {Object.keys(targets).map((t) => (
          <span key={t} className="mr-2" style={{ color: C.mauve }}>
            {t}
          </span>
        ))}
      </p>
    );
  return (
    <p className="text-[13px]" style={{ color: C.green }}>
      ↗ Opening <span style={{ color: C.lavender }}>{targets[arg]}</span> ...
    </p>
  );
}

function NeofetchEgg({ C }) {
  const lines = [
    { t: "        _nnnn_", c: C.blue },
    { t: "       dGGGGMMb", c: C.blue },
    { t: "      @p~qp~~qMb", c: C.blue },
    { t: "      M|@||@) M|", c: C.sapphire },
    { t: "      @,----.JM|", c: C.sapphire },
    { t: "     JS^\\__/  qKL", c: C.teal },
    { t: "    dZP        qKRb", c: C.teal },
    { t: "   dZP          qKKb", c: C.green },
    { t: "  fZP            SMMb", c: C.green },
    { t: "  HZM            MMMM", c: C.yellow },
    { t: "  FqM            MMMM", c: C.yellow },
    { t: '__| ".        |\\dS"qML', c: C.peach },
    { t: "|    `.       | `' \\Zq", c: C.peach },
    { t: "_)      \\.___.,|     .'", c: C.red },
    { t: "\\____   )MMMMMP|   .'", c: C.red },
    { t: "     `-'       `--'", c: C.maroon },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      <pre className="m-0 text-[11px] leading-[1.4] hidden md:block">
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.c }}>
            {l.t}
          </div>
        ))}
      </pre>
      <div
        className="text-[12px] leading-[1.8] self-start md:self-center"
        style={{ color: C.subtext1 }}
      >
        <p className="font-semibold mb-1" style={{ color: C.mauve }}>
          jule@portfolio
        </p>
        <p className="mb-2" style={{ color: C.surface0 }}>
          ──────────────────
        </p>
        {[
          ["OS", "JULE-ETHAN-OS v1.0.0"],
          ["Host", "portfolio.exe"],
          ["Shell", "bash 5.2.0"],
          ["WM", "React DOM"],
          ["Theme", "Catppuccin"],
          ["Icons", "Unicode block chars"],
          ["Memory", "64MB / ∞MB"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <span
              className="font-semibold min-w-[60px]"
              style={{ color: C.blue }}
            >
              {k}
            </span>
            <span style={{ color: C.text }}>{v}</span>
          </div>
        ))}
        <div className="flex gap-1 mt-2.5">
          {[
            C.red,
            C.peach,
            C.yellow,
            C.green,
            C.teal,
            C.blue,
            C.mauve,
            C.pink,
          ].map((s) => (
            <div
              key={s}
              className="w-4 h-4 rounded-[3px]"
              style={{ background: s }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutOutput({ C }) {
  return (
    <div>
      <p className="mb-3 font-semibold" style={{ color: C.yellow }}>
        $ whoami
      </p>
      <div className="pl-4 border-l-2" style={{ borderColor: C.lavender }}>
        <p className="leading-[1.8]" style={{ color: C.text }}>
          Recent{" "}
          <span className="font-semibold" style={{ color: C.sapphire }}>
            BS Information Technology
          </span>{" "}
          graduate from{" "}
          <span className="font-semibold" style={{ color: C.green }}>
            Saint Louis College
          </span>
          .
        </p>
        <p className="leading-[1.8] mt-2" style={{ color: C.text }}>
          Proficient in{" "}
          <span className="font-semibold" style={{ color: C.mauve }}>
            PHP, HTML, CSS, JavaScript
          </span>{" "}
          and database management through capstone projects and personal web
          applications.
        </p>
        <p className="leading-[1.8] mt-2" style={{ color: C.text }}>
          Eager to contribute technical skills and quick learning ability.
        </p>
        {/* Fixed: each pill correctly renders icon + label from shared CONTACT_INFO */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CONTACT_INFO.map(({ icon, label }) => (
            <span
              key={label}
              className="px-2.5 py-[3px] rounded text-[12px] border"
              style={{
                background: C.mantle,
                borderColor: C.surface0,
                color: C.subtext0,
              }}
            >
              {icon} {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsOutput({ C }) {
  const width = useWindowWidth();
  // Drives grid layout reactively — no more stale window.innerWidth snapshot
  const _isMobile = width < 768; // kept for future use; grid handled by Tailwind

  const groups = [
    {
      title: "Technical",
      accent: C.sapphire,
      bar: C.blue,
      items: [
        { n: "Web Development", l: 90 },
        { n: "PHP / MySQL", l: 85 },
        { n: "React / Tailwind", l: 80 },
        { n: "Database Mgmt", l: 82 },
        { n: "Hardware Support", l: 75 },
      ],
    },
    {
      title: "Design",
      accent: C.pink,
      bar: C.mauve,
      items: [
        { n: "Canva", l: 90 },
        { n: "Adobe Photoshop", l: 78 },
        { n: "Web Design (HTML/CSS)", l: 88 },
        { n: "Typography", l: 80 },
        { n: "Social Media Graphics", l: 85 },
      ],
    },
  ];

  return (
    <div>
      <p className="mb-3 font-semibold" style={{ color: C.yellow }}>
        $ cat skills.json
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map(({ title, accent, bar, items }) => (
          <div
            key={title}
            className="rounded-md border p-3.5"
            style={{ background: C.mantle, borderColor: C.surface0 }}
          >
            <p
              className="font-semibold mb-3 text-[11px] tracking-wider uppercase"
              style={{ color: accent }}
            >
              {title}
            </p>
            {items.map(({ n, l }) => (
              <div key={n} className="mb-2.5">
                <div className="flex justify-between mb-1">
                  <span className="text-[12px]" style={{ color: C.text }}>
                    {n}
                  </span>
                  <span className="text-[11px]" style={{ color: C.overlay0 }}>
                    {l}%
                  </span>
                </div>
                <div
                  className="h-1 rounded-sm overflow-hidden"
                  style={{ background: C.surface0 }}
                >
                  <div
                    className="h-full rounded-sm"
                    style={{ width: `${l}%`, background: bar }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[
          "HTML5",
          "CSS3",
          "JavaScript",
          "PHP",
          "MySQL",
          "React",
          "Tailwind CSS",
          "Appwrite",
          "MS Office",
          "Google Suite",
        ].map((tag) => (
          <span
            key={tag}
            className="px-2 py-[2px] rounded-[3px] text-[11px] border"
            style={{
              background: C.mantle,
              borderColor: C.lavender,
              color: C.mauve,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectsOutput({ C }) {
  const projects = [
    {
      name: "Online Vehicle Management System",
      client: "Universal Leaf Philippines, Inc.",
      type: "Capstone Project",
      color: C.sapphire,
      stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      desc: "Led full-stack development of an Online Vehicle Management System, delivering a functional web application for efficient vehicle logistics and data management.",
    },
    {
      name: "SpillTheBeans",
      client: "Personal Project",
      type: "Social Media Web App",
      color: C.pink,
      stack: ["React", "Tailwind CSS", "Appwrite"],
      desc: "Full-stack social media web application demonstrating advanced proficiency with a modern BaaS (Backend-as-a-Service) architecture.",
    },
    {
      name: "music.me",
      client: "Personal Project",
      type: "Music Recommendation App",
      color: C.peach,
      stack: ["React", "Tailwind CSS"],
      desc: "Sleek, user-centric music discovery platform leveraging React's component-based architecture for curated recommendations and personalized playlists.",
    },
    {
      name: "printer-ni-ethan",
      client: "Personal Project",
      type: "Photo Layout",
      color: C.red,
      stack: ["React", "Tailwind CSS"],
      desc: "The Ultimate Professional Photo Layout Generator with guided multi-step workflow, advanced features, and comprehensive tooling.",
    },
  ];
  return (
    <div>
      <p className="mb-3 font-semibold" style={{ color: C.yellow }}>
        $ ls ~/projects/
      </p>
      {projects.map(({ name, client, type, color, stack, desc }) => (
        <div
          key={name}
          className="rounded-md border border-l-[3px] p-3.5 mb-2.5"
          style={{
            background: C.mantle,
            borderColor: C.surface0,
            borderLeftColor: color,
          }}
        >
          <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
            <p className="font-semibold text-[14px]" style={{ color }}>
              {name}
            </p>
            <span
              className="px-2 py-[2px] rounded-[3px] text-[10px]"
              style={{ background: C.surface0, color: C.subtext0 }}
            >
              {type}
            </span>
          </div>
          <p className="text-[11px] mb-2" style={{ color: C.overlay1 }}>
            {client}
          </p>
          <p
            className="text-[12px] leading-[1.7] mb-2.5"
            style={{ color: C.subtext1 }}
          >
            {desc}
          </p>
          <div className="flex flex-wrap gap-1">
            {stack.map((t) => (
              <span
                key={t}
                className="px-1.5 py-[1px] rounded-[3px] text-[10px] border"
                style={{
                  background: C.base,
                  borderColor: C.surface1,
                  color: C.subtext0,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceOutput({ C }) {
  return (
    <div>
      <p className="mb-3 font-semibold" style={{ color: C.yellow }}>
        $ cat experience.log
      </p>
      <div className="border-l-2 pl-4" style={{ borderColor: C.surface1 }}>
        <div className="relative">
          <div
            className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
            style={{ background: C.teal }}
          />
          <p className="font-semibold text-[14px]" style={{ color: C.teal }}>
            Information Technology Intern
          </p>
          <p className="text-[12px] mb-2" style={{ color: C.overlay1 }}>
            Commission on Elections (COMELEC) — Agoo · Feb 2025 – May 2025
          </p>
          <div
            className="rounded-md border p-3"
            style={{ background: C.mantle, borderColor: C.surface0 }}
          >
            {[
              "Created and managed spreadsheets for tracking data and calculations using Microsoft Excel.",
              "Processed documents, assisted visitors and clients, and performed accurate data entry.",
              "Supported IT-related tasks, including checking connections, testing components, and replacing faulty hardware.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-2 mb-1.5 text-[12px] leading-[1.6]"
                style={{ color: C.subtext1 }}
              >
                <span className="flex-shrink-0" style={{ color: C.green }}>
                  ▸
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationOutput({ C }) {
  return (
    <div>
      <p className="mb-3 font-semibold" style={{ color: C.yellow }}>
        $ cat education.txt
      </p>
      <div
        className="rounded-md border border-l-[3px] p-3.5"
        style={{
          background: C.mantle,
          borderColor: C.surface0,
          borderLeftColor: C.green,
        }}
      >
        <div className="flex justify-between items-start flex-wrap gap-2">
          <p className="font-semibold text-[14px]" style={{ color: C.green }}>
            Bachelor of Science in Information Technology
          </p>
          <span className="text-[12px]" style={{ color: C.peach }}>
            July 2025
          </span>
        </div>
        <p className="text-[13px] mt-1" style={{ color: C.subtext1 }}>
          Saint Louis College
        </p>
        <div className="mt-3">
          <p
            className="text-[11px] mb-1.5 tracking-wider uppercase"
            style={{ color: C.overlay0 }}
          >
            Related Coursework
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Database Systems", "Management", "Software Development"].map(
              (c) => (
                <span
                  key={c}
                  className="px-2.5 py-[3px] rounded-[3px] text-[12px] border"
                  style={{
                    background: C.base,
                    borderColor: C.surface1,
                    color: C.subtext1,
                  }}
                >
                  {c}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactOutput({ C }) {
  return (
    <div>
      <p className="mb-3 font-semibold" style={{ color: C.yellow }}>
        $ ping jule-ethan
      </p>
      <div
        className="rounded-md border p-3.5"
        style={{ background: C.mantle, borderColor: C.surface0 }}
      >
        {[
          {
            label: "Location",
            value: "Agoo, La Union, Philippines",
            color: C.pink,
          },
          { label: "Phone", value: "+63 919 369 4589", color: C.teal },
          { label: "Email", value: "juleethan@gmail.com", color: C.green },
          { label: "Portfolio", value: "juleethan.vercel.app", color: C.blue },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex gap-4 mb-2.5 items-center flex-wrap">
            <span
              className="text-[12px] min-w-[70px]"
              style={{ color: C.overlay0 }}
            >
              {label}
            </span>
            <span style={{ color: C.surface2 }}>│</span>
            <span className="text-[13px] break-all" style={{ color }}>
              {value}
            </span>
          </div>
        ))}
        <div
          className="mt-3 border-t pt-3 text-[12px]"
          style={{ borderColor: C.surface0, color: C.green }}
        >
          ✓ Connection established. Ready to collaborate.
        </div>
      </div>
    </div>
  );
}

function SudoOutput({ C, arg }) {
  const restricted = ["root", "admin", "rm -rf", "shutdown", "hack"];
  const isRestricted = restricted.some((r) => arg.includes(r)) || !arg;
  if (isRestricted)
    return (
      <div>
        <p className="text-[13px] mb-1.5" style={{ color: C.red }}>
          🚨 Access denied. This incident will be reported.
        </p>
        <p className="text-[12px]" style={{ color: C.subtext0 }}>
          Nice try. Redirecting to reeducation...{" "}
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="ml-1"
            style={{ color: C.blue }}
          >
            click here to proceed
          </a>
        </p>
      </div>
    );
  return (
    <p className="text-[13px]" style={{ color: C.yellow }}>
      sudo: {arg}: Permission denied — you are not in the sudoers file.
    </p>
  );
}

function CmatrixOutput({ C }) {
  const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";
  const COLS = 28,
    ROWS = 8;
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const [grid, setGrid] = useState(() =>
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        ch: rand([...chars, " ", " "]),
        bright: Math.random() > 0.85,
      })),
    ),
  );
  useEffect(() => {
    const t = setInterval(() => {
      setGrid((g) =>
        g.map((row) =>
          row.map((cell) => ({
            ch: Math.random() > 0.7 ? rand([...chars]) : cell.ch,
            bright: Math.random() > 0.88,
          })),
        ),
      );
    }, 80);
    const stop = setTimeout(() => clearInterval(t), 6000);
    return () => {
      clearInterval(t);
      clearTimeout(stop);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="rounded-md border p-3"
      style={{ background: C.mantle, borderColor: C.surface0 }}
    >
      <p className="text-[11px] mb-2" style={{ color: C.green }}>
        cmatrix — press any key to exit (or just wait 6s)
      </p>
      <pre className="m-0 text-[11px] leading-[1.4] tracking-widest overflow-x-auto">
        {grid.map((row, ri) => (
          <div key={ri}>
            {row.map((cell, ci) => (
              <span
                key={ci}
                style={{
                  color: cell.bright ? "#ffffff" : C.green,
                  opacity: cell.bright ? 1 : 0.6 + Math.random() * 0.3,
                }}
              >
                {cell.ch}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  );
}

function LsOutput({ C }) {
  const files = [
    { name: "about.txt", size: "2.1K", color: C.text },
    { name: "skills.json", size: "4.8K", color: C.yellow },
    { name: "projects/", size: "--", color: C.blue },
    { name: "experience.log", size: "1.3K", color: C.text },
    { name: "education.txt", size: "0.9K", color: C.text },
    { name: "contact.cfg", size: "0.4K", color: C.teal },
    { name: ".secrets", size: "???", color: C.overlay0 },
    { name: "resume.pdf", size: "156K", color: C.red },
    { name: "README.md", size: "3.2K", color: C.green },
  ];
  return (
    <div>
      <p className="mb-2.5 font-semibold" style={{ color: C.yellow }}>
        $ ls -la ~/
      </p>
      <div
        className="rounded-md border p-3"
        style={{ background: C.mantle, borderColor: C.surface0 }}
      >
        <p className="text-[11px] mb-2" style={{ color: C.overlay0 }}>
          total {files.length}
        </p>
        {files.map(({ name, size, color }) => (
          <div key={name} className="flex gap-4 mb-1 text-[12px]">
            <span className="min-w-[40px]" style={{ color: C.overlay0 }}>
              {size}
            </span>
            <span style={{ color }}>{name}</span>
          </div>
        ))}
        <p className="text-[11px] mt-2" style={{ color: C.overlay0 }}>
          hint: <span style={{ color: C.mauve }}>cat</span> a file to view it
        </p>
      </div>
    </div>
  );
}

const FORTUNES = [
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
  "First, solve the problem. Then, write the code. — John Johnson",
  "It works on my machine. — Every developer, ever",
  "99 little bugs in the code. Take one down, patch it around... 127 little bugs in the code.",
  "A user interface is like a joke. If you have to explain it, it's not that good.",
  "The best error message is the one that never shows up.",
  "Pro tip: console.log() is not a debugging strategy. (It totally is though.)",
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "There are only two hard things in CS: cache invalidation and naming things. — Phil Karlton",
  "Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.",
];

function FortuneOutput({ C }) {
  // useMemo so the quote doesn't re-roll on theme changes
  const quote = useMemo(
    () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)],
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
    <div
      className="rounded-md border border-l-[3px] p-3.5"
      style={{
        background: C.mantle,
        borderColor: C.surface0,
        borderLeftColor: C.yellow,
      }}
    >
      <p
        className="text-[11px] mb-1.5 tracking-wider"
        style={{ color: C.yellow }}
      >
        ✦ FORTUNE ✦
      </p>
      <p className="text-[13px] leading-[1.7] italic" style={{ color: C.text }}>
        {quote}
      </p>
    </div>
  );
}

function CowsayOutput({ C, arg }) {
  const msg = arg || "Moo! Give me a message: cowsay <text>";
  const line = "─".repeat(msg.length + 2);
  return (
    <pre
      className="text-[12px] leading-[1.5] m-0 overflow-x-auto"
      style={{ color: C.text }}
    >
      {` ┌${line}┐\n │ ${msg} │\n └${line}┘\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`}
    </pre>
  );
}

function PwdOutput({ C }) {
  return (
    <p className="text-[13px]">
      <span style={{ color: C.blue }}>/</span>
      <span style={{ color: C.text }}>users</span>
      <span style={{ color: C.blue }}>/</span>
      <span style={{ color: C.green }}>guest</span>
      <span style={{ color: C.blue }}>/</span>
      <span style={{ color: C.mauve }}>portfolio</span>
    </p>
  );
}

function ExitOutput({ C }) {
  const [step, setStep] = useState(0);
  const lines = [
    "Saving session...",
    "Flushing disk cache...",
    "Unmounting filesystems...",
    "Sending goodbye packet to juleethan.vercel.app...",
    "Thanks for visiting. See you around! 👋",
  ];
  useEffect(() => {
    if (step < lines.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 500);
      return () => clearTimeout(t);
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      {lines.slice(0, step).map((line, i) => (
        <div key={i} className="flex gap-3 mb-[3px] text-[12px]">
          <span style={{ color: i < step - 1 ? C.green : C.yellow }}>
            [{i < step - 1 ? " OK " : "..."}]
          </span>
          <span
            style={{ color: i === lines.length - 1 ? C.peach : C.subtext0 }}
          >
            {line}
          </span>
        </div>
      ))}
    </div>
  );
}

function PingOutput({ C }) {
  const [results, setResults] = useState([]);
  const host = "brain.juleethan.vercel.app";
  useEffect(() => {
    const pings = [
      `PING ${host} (127.0.0.1)`,
      `64 bytes from ${host}: icmp_seq=1 ttl=64 time=${(Math.random() * 2 + 0.5).toFixed(2)}ms`,
      `64 bytes from ${host}: icmp_seq=2 ttl=64 time=${(Math.random() * 2 + 0.5).toFixed(2)}ms`,
      `64 bytes from ${host}: icmp_seq=3 ttl=64 time=${(Math.random() * 2 + 0.5).toFixed(2)}ms`,
      `--- ${host} ping statistics ---`,
      `3 packets transmitted, 3 received, 0% packet loss`,
      `pong! 🏓`,
    ];
    // Store timers so we can clean them all up on unmount
    const timers = pings.map((line, i) =>
      setTimeout(() => setResults((r) => [...r, line]), i * 300),
    );
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div
      className="rounded-md border p-3"
      style={{ background: C.mantle, borderColor: C.surface0 }}
    >
      {results.map((line, i) => (
        <p
          key={i}
          className="text-[12px] mb-[3px]"
          style={{
            color: line.includes("pong")
              ? C.green
              : line.includes("---")
                ? C.yellow
                : C.text,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

// ── ASCII banner ──────────────────────────────────────────────────────────────
const ASCII_NAME = `
    ██╗ ██╗██╗ ██╗     ███████╗███████╗████████╗██╗  ██╗ █████╗ ███╗   ██╗
    ██║ ██║██║ ██║     ██╔════╝██╔════╝╚══██╔══╝██║  ██║██╔══██╗████╗  ██║
    ██║ ██║██║ ██║     █████╗  █████╗     ██║   ███████║███████║██╔██╗ ██║
    ██║ ██║██║ ██║     ██╔══╝  ██╔══╝     ██║   ██╔══██║██╔══██║██║╚██╗██║
║█████║║█████║ ██████╗ ███████╗███████╗   ██║   ██║  ██║██║  ██║██║ ║████║
╚═════ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝  ╚══╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚════╝`;

const BOOT_LINES = [
  "Initializing system...",
  "Loading portfolio kernel v1.0.0",
  "Mounting filesystem...",
  "Starting JULE-ETHAN-OS...",
  "Boot complete. Welcome.",
];

function BootLine({ text, isLast, onDone, C }) {
  const { displayed, done } = useTypewriter(text, 22);
  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);
  return (
    <div className="flex gap-3 mb-[3px] text-[12px]">
      <span style={{ color: done && !isLast ? C.green : C.yellow }}>
        [{done && !isLast ? " OK " : "..."}]
      </span>
      <span style={{ color: C.subtext0 }}>{displayed}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [themeName, setThemeName] = useState("latte");
  // Memoised so downstream components don't re-render on unrelated state changes
  const C = useMemo(
    () => ({ ...THEMES[themeName], name: themeName }),
    [themeName],
  );
  useThemeVars(C);

  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [bootStep, setBootStep] = useState(0);
  const [booted, setBooted] = useState(false);
  const [showFetch, setShowFetch] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const prevLenRef = useRef(0); // track history length to avoid over-scrolling

  const handleBootLineDone = useCallback((i) => {
    if (i < BOOT_LINES.length - 1) {
      setBootStep(i + 1);
    } else {
      setTimeout(() => {
        setBooted(true);
        setTimeout(() => setShowFetch(true), 150);
      }, 300);
    }
  }, []);

  // Scroll only when history actually grows — "auto" for rapid commands prevents jank
  useEffect(() => {
    const grew = history.length > prevLenRef.current;
    prevLenRef.current = history.length;
    if (grew || showFetch) {
      bottomRef.current?.scrollIntoView({
        behavior: history.length <= 1 ? "smooth" : "auto",
      });
    }
  }, [history, showFetch]);

  // Separate effect for boot so it doesn't collide with the history scroll logic
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bootStep, booted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      setShowFetch(false);
      prevLenRef.current = 0;
    } else {
      setHistory((h) => [...h, cmd]);
    }
    setCmdHistory((h) => [cmd, ...h]);
    setCmdIdx(-1);
    setInput("");
  };

  const ALL_COMMANDS = [
    "help",
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "contact",
    "fetch",
    "neofetch",
    "ls",
    "fortune",
    "cowsay",
    "pwd",
    "ping",
    "cmatrix",
    "exit",
    "sudo",
    "theme",
    "open",
    "clear",
    "history",
    "whoami",
  ];

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault(); // stops cursor jumping to input start
      const idx = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(idx);
      setInput(cmdHistory[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(cmdIdx - 1, -1);
      setCmdIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = input.trim();
      const match = ALL_COMMANDS.find(
        (c) => c.startsWith(trimmed) && c !== trimmed,
      );
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="min-h-screen px-2 py-3 md:px-4 md:py-6 lg:px-8 lg:py-8 transition-colors duration-300"
      style={{
        background: C.crust,
        fontFamily: "'Cascadia Code', 'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "clamp(12px, 3vw, 14px)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full mx-auto" style={{ maxWidth: "min(940px, 96vw)" }}>
        {/* ── Window chrome ── */}
        <div
          className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 rounded-t-[10px] border transition-colors duration-300"
          style={{ background: C.mantle, borderColor: C.surface1 }}
        >
          <div className="flex gap-1.5 flex-shrink-0">
            {[C.red, C.yellow, C.green].map((c) => (
              <div
                key={c}
                className="w-3 h-3 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>

          <div className="flex-1 text-center min-w-0">
            <span
              className="text-[11px] md:text-[12px] truncate block"
              style={{ color: C.overlay0 }}
            >
              <span className="hidden sm:inline">jule@portfolio — bash — </span>
              catppuccin-{themeName}
            </span>
          </div>

          {/* Theme switcher — focus-visible ring for keyboard nav */}
          <div className="flex gap-1 flex-shrink-0">
            {Object.keys(THEMES).map((t) => (
              <button
                key={t}
                onClick={(e) => {
                  e.stopPropagation();
                  setThemeName(t);
                }}
                className="px-1.5 md:px-2 py-[2px] rounded-[3px] text-[8px] md:text-[9px] cursor-pointer transition-all duration-200 border font-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: t === themeName ? C.mauve : "transparent",
                  borderColor: t === themeName ? C.mauve : C.surface1,
                  color: t === themeName ? C.base : C.overlay0,
                  outlineColor: C.mauve,
                }}
              >
                <span className="hidden md:inline">{t}</span>
                <span className="md:hidden">{t.slice(0, 2)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Terminal body ── */}
        <div
          className="border border-t-0 rounded-b-[8px] transition-colors duration-300 overflow-y-auto"
          style={{
            background: C.base,
            borderColor: C.surface1,
            padding: "clamp(12px,3.5vw,22px) clamp(10px,3vw,20px)",
            minHeight: 480,
            maxHeight: "clamp(400px, 80vh, 700px)",
          }}
        >
          {booted && (
            <pre
              className="hidden lg:block m-0 mb-3 overflow-hidden whitespace-pre"
              style={{
                color: C.mauve,
                fontSize: "clamp(3px,0.75vw,8px)",
                lineHeight: 1.2,
              }}
            >
              {ASCII_NAME}
            </pre>
          )}

          {!booted && (
            <div className="mb-4">
              {BOOT_LINES.slice(0, bootStep + 1).map((line, i) => (
                <BootLine
                  key={i}
                  text={line}
                  C={C}
                  isLast={i === BOOT_LINES.length - 1}
                  onDone={
                    i === bootStep ? () => handleBootLineDone(i) : undefined
                  }
                />
              ))}
            </div>
          )}

          {booted && (
            <>
              {showFetch && <Fastfetch C={C} />}

              <div
                className="border-b mb-4 pb-2"
                style={{ borderColor: C.surface0 }}
              >
                <p className="text-[11px]" style={{ color: C.overlay1 }}>
                  JULE-ETHAN-OS v1.0.0 LTS — Type{" "}
                  <span style={{ color: C.blue }}>help</span>
                  <span className="hidden sm:inline">
                    {" "}
                    · theme{" "}
                    <span style={{ color: C.mauve }}>
                      latte|frappe|macchiato|mocha
                    </span>{" "}
                    · open{" "}
                    <span style={{ color: C.teal }}>
                      github|portfolio|email
                    </span>
                  </span>
                </p>
              </div>

              {history.map((cmd, i) => (
                <TerminalEntry
                  key={`${cmd}-${i}`}
                  cmd={cmd}
                  C={C}
                  onTheme={setThemeName}
                  animate={false}
                  cmdHistory={cmdHistory}
                />
              ))}

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-1 md:gap-1.5 flex-wrap pr-2"
              >
                <PromptPrefix C={C} />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                  className="bg-transparent border-none outline-none flex-1 min-w-[60px] font-[inherit] text-[inherit]"
                  style={{ color: C.text, caretColor: C.mauve }}
                />
              </form>
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Footer — tab autocomplete hint added */}
        <p
          className="text-[10px] text-center mt-2.5 font-[inherit]"
          style={{ color: C.overlay0 }}
        >
          <span className="hidden md:inline">
            ↑↓ history · tab autocomplete ·{" "}
          </span>
          theme latte|frappe|macchiato|mocha
          <span className="hidden sm:inline">
            {" "}
            · open github|portfolio|email
          </span>
        </p>
      </div>
    </div>
  );
}
