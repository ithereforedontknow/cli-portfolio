import { useState, useEffect, useRef, useCallback } from "react";

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

// ── Fastfetch panel ───────────────────────────────────────────────────────────
function Fastfetch({ C, isMobile }) {
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
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 24,
        marginBottom: 20,
        padding: "14px 16px",
        background: C.mantle,
        border: `1px solid ${C.surface0}`,
        borderRadius: 8,
        alignItems: "flex-start",
      }}
    >
      {/* avatar — swap <pre> for <img src="/avatar.jpg" …> if you have a photo */}
      <pre
        style={{
          color: C.mauve,
          fontSize: 11,
          lineHeight: 1.35,
          margin: 0,
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        <img
          src="/avatar.jpg"
          alt="Jule Ethan"
          style={{
            display: isMobile ? "none" : "block",
            width: isMobile ? "100%" : 250,
            height: isMobile ? 200 : 250,
            objectFit: "cover",
            borderRadius: 6,
            border: `2px solid ${C.lavender}`,
            flexShrink: 0,
          }}
        />
      </pre>
      <div
        style={{
          flex: 1,
          fontSize: "clamp(12.5px, 3vw, 13.5px)",
          lineHeight: 1.0,
        }}
      >
        {rows.map((row, i) => {
          if (row.key === null) return <div key={i} style={{ height: 6 }} />;
          if (row.key === "user")
            return (
              <div key={i} style={{ marginBottom: 4 }}>
                <span style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>
                  jule
                </span>
                <span style={{ color: C.overlay0 }}>@</span>
                <span style={{ color: C.blue, fontWeight: 700, fontSize: 13 }}>
                  portfolio
                </span>
              </div>
            );
          if (row.key === "colors")
            return (
              <div key={i} style={{ display: "flex", gap: 4, marginTop: 4 }}>
                {swatches.map((s) => (
                  <div
                    key={s}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: s,
                    }}
                  />
                ))}
                {swatches.map((s) => (
                  <div
                    key={s + "dim"}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: s,
                      opacity: 0.4,
                    }}
                  />
                ))}
              </div>
            );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 0,
                marginBottom: 5,
                alignItems: "baseline",
              }}
            >
              <span style={{ color: C.mauve, fontWeight: 600, minWidth: 72 }}>
                {row.key}
              </span>
              <span style={{ color: C.overlay0, marginRight: 8 }}>~</span>
              <span style={{ color: row.col }}>{row.val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Typed prompt line (animation) ─────────────────────────────────────────────
function TypedPromptLine({ cmd, C, onDone }) {
  const { displayed, done } = useTypewriter(cmd, 55);
  useEffect(() => {
    if (done) onDone?.();
  }, [done]);
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}
    >
      <span style={{ color: C.green, fontSize: 13, fontWeight: 600 }}>
        jule
      </span>
      <span style={{ color: C.overlay0 }}>@</span>
      <span style={{ color: C.blue, fontSize: 13, fontWeight: 600 }}>
        portfolio
      </span>
      <span style={{ color: C.overlay0 }}>:</span>
      <span style={{ color: C.mauve, fontSize: 13 }}>~</span>
      <span style={{ color: C.overlay0 }}>$</span>
      <span style={{ color: C.text, fontSize: 13 }}>{displayed}</span>
      {!done && <span style={{ color: C.mauve }}>█</span>}
    </div>
  );
}

// ── Single history entry ──────────────────────────────────────────────────────
function TerminalEntry({ cmd, C, onTheme, animate, cmdHistory }) {
  const [showOutput, setShowOutput] = useState(!animate);
  const output = useCommandOutput(cmd, C, onTheme, cmdHistory);
  return (
    <div style={{ marginBottom: 18 }}>
      {animate ? (
        <TypedPromptLine cmd={cmd} C={C} onDone={() => setShowOutput(true)} />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          <span style={{ color: C.green, fontSize: 13, fontWeight: 600 }}>
            jule
          </span>
          <span style={{ color: C.overlay0 }}>@</span>
          <span style={{ color: C.blue, fontSize: 13, fontWeight: 600 }}>
            portfolio
          </span>
          <span style={{ color: C.overlay0 }}>:</span>
          <span style={{ color: C.mauve, fontSize: 13 }}>~</span>
          <span style={{ color: C.overlay0 }}>$</span>
          <span style={{ color: C.text, fontSize: 13 }}>{cmd}</span>
        </div>
      )}
      {showOutput && (
        <div style={{ fontSize: 13, fontFamily: "inherit" }}>{output}</div>
      )}
    </div>
  );
}

// ── Command output resolver ───────────────────────────────────────────────────
function useCommandOutput(cmd, C, onTheme, cmdHistory) {
  const parts = cmd.trim().split(/\s+/);
  const base = parts[0];
  const arg = parts[1] || "";

  if (base === "help") return <HelpOutput C={C} />;
  if (base === "fetch") return <Fastfetch C={C} />;
  if (base === "about") return <AboutOutput C={C} />;
  if (base === "skills") return <SkillsOutput C={C} />;
  if (base === "projects") return <ProjectsOutput C={C} />;
  if (base === "experience") return <ExperienceOutput C={C} />;
  if (base === "education") return <EducationOutput C={C} />;
  if (base === "contact") return <ContactOutput C={C} />;
  if (base === "neofetch") return <NeofetchEgg C={C} />;
  if (base === "theme")
    return <ThemeOutput C={C} arg={arg} onTheme={onTheme} />;
  if (base === "open") return <OpenOutput C={C} arg={arg} />;
  if (base === "sudo") return <SudoOutput C={C} arg={arg} />;
  if (base === "cmatrix") return <CmatrixOutput C={C} />;
  if (base === "ls") return <LsOutput C={C} />;
  if (base === "fortune") return <FortuneOutput C={C} />;
  if (base === "cowsay")
    return <CowsayOutput C={C} arg={parts.slice(1).join(" ")} />;
  if (base === "pwd") return <PwdOutput C={C} />;
  if (base === "exit") return <ExitOutput C={C} />;
  if (base === "ping") return <PingOutput C={C} />;
  if (base === "whoami")
    return (
      <p style={{ color: C.text, fontSize: 13 }}>
        guest — visiting <span style={{ color: C.mauve }}>jule@portfolio</span>
      </p>
    );
  if (base === "history")
    return <HistoryOutput C={C} cmdHistory={cmdHistory} />;
  return (
    <p style={{ color: C.red, fontSize: 13 }}>
      command not found: <span style={{ color: C.maroon }}>{cmd}</span>. Type{" "}
      <span style={{ color: C.blue }}>help</span> for available commands.
    </p>
  );
}
function HistoryOutput({ C, cmdHistory }) {
  const list = [...cmdHistory].reverse();
  return (
    <div
      style={{
        background: C.mantle,
        border: `1px solid ${C.surface0}`,
        borderRadius: 6,
        padding: 12,
      }}
    >
      {list.length === 0 ? (
        <p style={{ color: C.overlay0, fontSize: 12 }}>No history yet.</p>
      ) : (
        list.map((cmd, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 16, marginBottom: 3, fontSize: 12 }}
          >
            <span
              style={{ color: C.overlay0, minWidth: 28, textAlign: "right" }}
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

// ── Output components ─────────────────────────────────────────────────────────
function HelpOutput({ C }) {
  const cmds = [
    ["about", "Who is Jule Ethan?"],
    ["skills", "Technical & design skills"],
    ["projects", "View portfolio projects"],
    ["experience", "Work history"],
    ["education", "Academic background"],
    ["contact", "Get in touch"],
    ["fetch", "Show fastfetch panel again"],
    ["theme <name>", "Switch theme: latte frappe macchiato mocha"],
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
      <p style={{ color: C.yellow, marginBottom: 8, fontWeight: 600 }}>
        Available commands:
      </p>
      {cmds.map(([cmd, desc]) => (
        <div key={cmd} style={{ display: "flex", gap: 16, marginBottom: 2 }}>
          <span style={{ color: C.blue, minWidth: 140, fontWeight: 600 }}>
            {cmd}
          </span>
          <span style={{ color: C.subtext1 }}>{desc}</span>
        </div>
      ))}
    </div>
  );
}

function ThemeOutput({ C, arg, onTheme }) {
  const valid = ["latte", "frappe", "macchiato", "mocha"];
  useEffect(() => {
    if (valid.includes(arg)) onTheme?.(arg);
  }, []);
  if (!arg)
    return (
      <p style={{ color: C.red, fontSize: 13 }}>
        Usage: <span style={{ color: C.blue }}>theme &lt;name&gt;</span> —
        available:{" "}
        {valid.map((t) => (
          <span key={t} style={{ color: C.mauve, marginRight: 8 }}>
            {t}
          </span>
        ))}
      </p>
    );
  if (!valid.includes(arg))
    return (
      <p style={{ color: C.red, fontSize: 13 }}>
        Unknown theme <span style={{ color: C.maroon }}>{arg}</span>. Available:{" "}
        {valid.map((t) => (
          <span key={t} style={{ color: C.mauve, marginRight: 8 }}>
            {t}
          </span>
        ))}
      </p>
    );
  return (
    <p style={{ color: C.green, fontSize: 13 }}>
      ✓ Theme switched to{" "}
      <span style={{ color: C.mauve, fontWeight: 600 }}>catppuccin-{arg}</span>
    </p>
  );
}

function OpenOutput({ C, arg }) {
  const targets = {
    github: "https://github.com/ithereforedontknow",
    portfolio: "https://juleethan.vercel.app",
    email: "mailto:juleethan@gmail.com",
    resume: "/resume.pdf", // drop your PDF in /public/resume.pdf
  };
  useEffect(() => {
    if (targets[arg]) {
      setTimeout(() => window.open(targets[arg], "_blank"), 300);
    }
  }, []);
  if (!arg || !targets[arg])
    return (
      <p style={{ color: C.red, fontSize: 13 }}>
        Usage: <span style={{ color: C.blue }}>open</span>{" "}
        {Object.keys(targets).map((t) => (
          <span key={t} style={{ color: C.mauve, marginRight: 8 }}>
            {t}
          </span>
        ))}
      </p>
    );
  return (
    <p style={{ color: C.green, fontSize: 13 }}>
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
    <div style={{ display: "flex", gap: 24 }}>
      <pre style={{ margin: 0, lineHeight: 1.4, fontSize: 11 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.c }}>
            {l.t}
          </div>
        ))}
      </pre>
      <div
        style={{
          fontSize: 12,
          lineHeight: 1.8,
          color: C.subtext1,
          alignSelf: "center",
        }}
      >
        <p style={{ color: C.mauve, fontWeight: 600, marginBottom: 4 }}>
          jule@portfolio
        </p>
        <p style={{ color: C.surface0, marginBottom: 8 }}>──────────────────</p>
        {[
          ["OS", "JULE-ETHAN-OS v1.0.0"],
          ["Host", "portfolio.exe"],
          ["Shell", "bash 5.2.0"],
          ["WM", "React DOM"],
          ["Theme", "Catppuccin"],
          ["Icons", "Unicode block chars"],
          ["Memory", "64MB / ∞MB"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 8 }}>
            <span style={{ color: C.blue, minWidth: 60, fontWeight: 600 }}>
              {k}
            </span>
            <span style={{ color: C.text }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
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
              style={{ width: 16, height: 16, borderRadius: 3, background: s }}
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
      <p style={{ color: C.yellow, marginBottom: 12, fontWeight: 600 }}>
        $ whoami
      </p>
      <div style={{ borderLeft: `2px solid ${C.lavender}`, paddingLeft: 16 }}>
        <p style={{ color: C.text, lineHeight: 1.8 }}>
          Recent{" "}
          <span style={{ color: C.sapphire, fontWeight: 600 }}>
            BS Information Technology
          </span>{" "}
          graduate from{" "}
          <span style={{ color: C.green, fontWeight: 600 }}>
            Saint Louis College
          </span>
          .
        </p>
        <p style={{ color: C.text, lineHeight: 1.8, marginTop: 8 }}>
          Proficient in{" "}
          <span style={{ color: C.mauve, fontWeight: 600 }}>
            PHP, HTML, CSS, JavaScript
          </span>{" "}
          and database management through capstone projects and personal web
          applications.
        </p>
        <p style={{ color: C.text, lineHeight: 1.8, marginTop: 8 }}>
          Eager to contribute technical skills and quick learning ability.
        </p>
        <div
          style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {[
            ["Agoo, La Union"],
            ["+63 919 369 4589"],
            ["juleethan@gmail.com"],
            ["juleethan.vercel.app"],
          ].map(([icon, val]) => (
            <span
              key={val}
              style={{
                background: C.mantle,
                border: `1px solid ${C.surface0}`,
                color: C.subtext0,
                padding: "3px 10px",
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              {icon} {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsOutput({ C }) {
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
  const isMobile = window.innerWidth < 640;
  return (
    <div>
      <p style={{ color: C.yellow, marginBottom: 12, fontWeight: 600 }}>
        $ cat skills.json
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16,
        }}
      >
        {groups.map(({ title, accent, bar, items }) => (
          <div
            key={title}
            style={{
              background: C.mantle,
              border: `1px solid ${C.surface0}`,
              borderRadius: 6,
              padding: 14,
            }}
          >
            <p
              style={{
                color: accent,
                fontWeight: 600,
                marginBottom: 12,
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {title}
            </p>
            {items.map(({ n, l }) => (
              <div key={n} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ color: C.text, fontSize: 12 }}>{n}</span>
                  <span style={{ color: C.overlay0, fontSize: 11 }}>{l}%</span>
                </div>
                <div
                  style={{
                    background: C.surface0,
                    borderRadius: 2,
                    height: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${l}%`,
                      height: "100%",
                      background: bar,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
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
            style={{
              background: C.mantle,
              border: `1px solid ${C.lavender}`,
              color: C.mauve,
              padding: "2px 8px",
              borderRadius: 3,
              fontSize: 11,
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
      <p style={{ color: C.yellow, marginBottom: 12, fontWeight: 600 }}>
        $ ls ~/projects/
      </p>
      {projects.map(({ name, client, type, color, stack, desc }) => (
        <div
          key={name}
          style={{
            background: C.mantle,
            border: `1px solid ${C.surface0}`,
            borderLeft: `3px solid ${color}`,
            borderRadius: 6,
            padding: 14,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <p style={{ color, fontWeight: 600, fontSize: 14 }}>{name}</p>
            <span
              style={{
                background: C.surface0,
                color: C.subtext0,
                padding: "2px 8px",
                borderRadius: 3,
                fontSize: 10,
              }}
            >
              {type}
            </span>
          </div>
          <p style={{ color: C.overlay1, fontSize: 11, marginBottom: 8 }}>
            {client}
          </p>
          <p
            style={{
              color: C.subtext1,
              fontSize: 12,
              lineHeight: 1.7,
              marginBottom: 10,
            }}
          >
            {desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {stack.map((t) => (
              <span
                key={t}
                style={{
                  background: C.base,
                  border: `1px solid ${C.surface1}`,
                  color: C.subtext0,
                  padding: "1px 6px",
                  borderRadius: 3,
                  fontSize: 10,
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
      <p style={{ color: C.yellow, marginBottom: 12, fontWeight: 600 }}>
        $ cat experience.log
      </p>
      <div style={{ borderLeft: `2px solid ${C.surface1}`, paddingLeft: 16 }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 10,
              height: 10,
              background: C.teal,
              borderRadius: "50%",
              position: "absolute",
              left: -21,
              top: 4,
            }}
          />
          <p style={{ color: C.teal, fontWeight: 600, fontSize: 14 }}>
            Information Technology Intern
          </p>
          <p style={{ color: C.overlay1, fontSize: 12, marginBottom: 8 }}>
            Commission on Elections (COMELEC) — Agoo · Feb 2025 – May 2025
          </p>
          <div
            style={{
              background: C.mantle,
              border: `1px solid ${C.surface0}`,
              borderRadius: 6,
              padding: 12,
            }}
          >
            {[
              "Created and managed spreadsheets for tracking data and calculations using Microsoft Excel.",
              "Processed documents, assisted visitors and clients, and performed accurate data entry.",
              "Supported IT-related tasks, including checking connections, testing components, and replacing faulty hardware.",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 6,
                  color: C.subtext1,
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: C.green, flexShrink: 0 }}>▸</span>
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
      <p style={{ color: C.yellow, marginBottom: 12, fontWeight: 600 }}>
        $ cat education.txt
      </p>
      <div
        style={{
          background: C.mantle,
          border: `1px solid ${C.surface0}`,
          borderLeft: `3px solid ${C.green}`,
          borderRadius: 6,
          padding: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p style={{ color: C.green, fontWeight: 600, fontSize: 14 }}>
            Bachelor of Science in Information Technology
          </p>
          <span style={{ color: C.peach, fontSize: 12 }}>July 2025</span>
        </div>
        <p style={{ color: C.subtext1, fontSize: 13, marginTop: 4 }}>
          Saint Louis College
        </p>
        <div style={{ marginTop: 12 }}>
          <p
            style={{
              color: C.overlay0,
              fontSize: 11,
              marginBottom: 6,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Related Coursework
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Database Systems", "Management", "Software Development"].map(
              (c) => (
                <span
                  key={c}
                  style={{
                    background: C.base,
                    border: `1px solid ${C.surface1}`,
                    color: C.subtext1,
                    padding: "3px 10px",
                    borderRadius: 3,
                    fontSize: 12,
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
      <p style={{ color: C.yellow, marginBottom: 12, fontWeight: 600 }}>
        $ ping jule-ethan
      </p>
      <div
        style={{
          background: C.mantle,
          border: `1px solid ${C.surface0}`,
          borderRadius: 6,
          padding: 14,
        }}
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
          <div
            key={label}
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <span style={{ color: C.overlay0, minWidth: 70, fontSize: 12 }}>
              {label}
            </span>
            <span style={{ color: C.surface2 }}>│</span>
            <span style={{ color, fontSize: 13 }}>{value}</span>
          </div>
        ))}
        <div
          style={{
            marginTop: 12,
            borderTop: `1px solid ${C.surface0}`,
            paddingTop: 12,
            color: C.green,
            fontSize: 12,
          }}
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
        <p style={{ color: C.red, fontSize: 13, marginBottom: 6 }}>
          🚨 Access denied. This incident will be reported.
        </p>
        <p style={{ color: C.subtext0, fontSize: 12 }}>
          Nice try. Redirecting to reeducation...
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            style={{ color: C.blue, marginLeft: 4 }}
          >
            click here to proceed
          </a>
        </p>
      </div>
    );
  return (
    <p style={{ color: C.yellow, fontSize: 13 }}>
      sudo: {arg}: Permission denied — you are not in the sudoers file.
    </p>
  );
}

function CmatrixOutput({ C }) {
  const [frame, setFrame] = useState(0);
  const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";
  const cols = 28,
    rows = 8;
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const [grid, setGrid] = useState(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
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
      setFrame((f) => f + 1);
    }, 80);
    const stop = setTimeout(() => clearInterval(t), 6000);
    return () => {
      clearInterval(t);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div
      style={{
        background: C.mantle,
        border: `1px solid ${C.surface0}`,
        borderRadius: 6,
        padding: 12,
      }}
    >
      <p style={{ color: C.green, fontSize: 11, marginBottom: 8 }}>
        cmatrix — press any key to exit (or just wait 6s)
      </p>
      <pre
        style={{ margin: 0, fontSize: 11, lineHeight: 1.4, letterSpacing: 2 }}
      >
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
      <p style={{ color: C.yellow, marginBottom: 10, fontWeight: 600 }}>
        $ ls -la ~/
      </p>
      <div
        style={{
          background: C.mantle,
          border: `1px solid ${C.surface0}`,
          borderRadius: 6,
          padding: 12,
        }}
      >
        <p style={{ color: C.overlay0, fontSize: 11, marginBottom: 8 }}>
          total {files.length}
        </p>
        {files.map(({ name, size, color }) => (
          <div
            key={name}
            style={{ display: "flex", gap: 16, marginBottom: 4, fontSize: 12 }}
          >
            <span style={{ color: C.overlay0, minWidth: 40 }}>{size}</span>
            <span style={{ color }}>{name}</span>
          </div>
        ))}
        <p style={{ color: C.overlay0, fontSize: 11, marginTop: 8 }}>
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
  const quote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  return (
    <div
      style={{
        background: C.mantle,
        border: `1px solid ${C.surface0}`,
        borderLeft: `3px solid ${C.yellow}`,
        borderRadius: 6,
        padding: 14,
      }}
    >
      <p
        style={{
          color: C.yellow,
          fontSize: 11,
          marginBottom: 6,
          letterSpacing: 1,
        }}
      >
        ✦ FORTUNE ✦
      </p>
      <p
        style={{
          color: C.text,
          fontSize: 13,
          lineHeight: 1.7,
          fontStyle: "italic",
        }}
      >
        {quote}
      </p>
    </div>
  );
}

function CowsayOutput({ C, arg }) {
  const msg = arg || "Moo! Give me a message: cowsay <text>";
  const line = "─".repeat(msg.length + 2);
  return (
    <pre style={{ color: C.text, fontSize: 12, lineHeight: 1.5, margin: 0 }}>
      {` ┌${line}┐
 │ ${msg} │
 └${line}┘
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
    </pre>
  );
}

function PwdOutput({ C }) {
  return (
    <p style={{ color: C.text, fontSize: 13 }}>
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
  }, [step]);
  return (
    <div>
      {lines.slice(0, step).map((line, i) => (
        <div
          key={i}
          style={{ display: "flex", gap: 12, marginBottom: 3, fontSize: 12 }}
        >
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
    pings.forEach((line, i) => {
      setTimeout(() => setResults((r) => [...r, line]), i * 300);
    });
  }, []);
  return (
    <div
      style={{
        background: C.mantle,
        border: `1px solid ${C.surface0}`,
        borderRadius: 6,
        padding: 12,
      }}
    >
      {results.map((line, i) => (
        <p
          key={i}
          style={{
            color: line.includes("pong")
              ? C.green
              : line.includes("---")
                ? C.yellow
                : C.text,
            fontSize: 12,
            marginBottom: 3,
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

// ── Boot lines (will be typed out) ───────────────────────────────────────────
const BOOT_LINES = [
  "Initializing system...",
  "Loading portfolio kernel v1.0.0",
  "Mounting filesystem...",
  "Starting JULE-ETHAN-OS...",
  "Boot complete. Welcome.",
];

// ── Typed boot line ───────────────────────────────────────────────────────────
function BootLine({ text, isLast, onDone, C }) {
  const { displayed, done } = useTypewriter(text, 22);
  useEffect(() => {
    if (done) onDone?.();
  }, [done]);
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 3, fontSize: 12 }}>
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
  const C = { ...THEMES[themeName], name: themeName };

  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [bootStep, setBootStep] = useState(0);
  const [booted, setBooted] = useState(false);
  const [showFetch, setShowFetch] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // advance boot one line at a time via onDone callback
  const handleBootLineDone = useCallback((i) => {
    if (i < BOOT_LINES.length - 1) {
      setBootStep(i + 1);
    } else {
      setTimeout(() => {
        setBooted(true);
        setTimeout(() => {
          setShowFetch(true);
        }, 150);
      }, 300);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, bootStep, showFetch, booted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      setShowFetch(false);
    } else setHistory((h) => [...h, cmd]);
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
      const idx = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(idx);
      setInput(cmdHistory[idx] || "");
    } else if (e.key === "ArrowDown") {
      const idx = Math.max(cmdIdx - 1, -1);
      setCmdIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = ALL_COMMANDS.find(
        (c) => c.startsWith(input.trim()) && c !== input.trim(),
      );
      if (match) setInput(match);
    }
  };

  const runCmd = (cmd) => {
    if (cmd === "clear") {
      setHistory([]);
      setShowFetch(false);
    } else setHistory((h) => [...h, cmd]);
    inputRef.current?.focus();
  };

  const quickBtns = [
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
    "cowsay hi",
    "pwd",
    "ping",
    "cmatrix",
    "clear",
    "whoami",
    "history",
  ];
  const isMobile = window.innerWidth < 640;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.crust,
        padding: "clamp(12px, 4vw, 32px) clamp(8px, 3vw, 16px)",
        fontFamily: "Cascadia Code, JetBrains Mono, monospace",
        transition: "background 0.4s",
        fontSize: "clamp(13px, 3.1vw, 15px)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "min(920px, 96vw)",
          margin: "0 auto",
        }}
      >
        {/* window chrome */}
        <div
          style={{
            background: C.mantle,
            border: `1px solid ${C.surface1}`,
            borderRadius: "10px 10px 0 0",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            transition: "background 0.4s",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {[C.red, C.yellow, C.green].map((c) => (
              <div
                key={c}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ color: C.overlay0, fontSize: 12 }}>
              jule@portfolio — bash — catppuccin-{themeName}
            </span>
          </div>
          {/* theme pills */}
          <div style={{ display: "flex", gap: 4 }}>
            {Object.keys(THEMES).map((t) => (
              <button
                key={t}
                onClick={(e) => {
                  e.stopPropagation();
                  setThemeName(t);
                }}
                style={{
                  background: t === themeName ? C.mauve : "transparent",
                  border: `1px solid ${t === themeName ? C.mauve : C.surface1}`,
                  color: t === themeName ? C.base : C.overlay0,
                  padding: "2px 7px",
                  borderRadius: 3,
                  fontSize: 9,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* terminal body */}
        <div
          style={{
            background: C.base,
            border: `1px solid ${C.surface1}`,
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            padding: "clamp(14px, 3.5vw, 22px) clamp(12px, 3vw, 20px)",
            minHeight: 540,
            maxHeight: isMobile ? "75vh" : "80vh",
            overflowY: "auto",
            transition: "background 0.4s",
          }}
        >
          {/* ASCII banner */}
          {booted && !isMobile && (
            <pre
              style={{
                color: C.mauve,
                fontSize: "clamp(3px,1vw,9px)",
                lineHeight: 1.2,
                marginBottom: 12,
                overflow: "hidden",
                whiteSpace: "pre",
              }}
            >
              {ASCII_NAME}
            </pre>
          )}

          {/* boot sequence — typed line by line */}
          {!booted && (
            <div style={{ marginBottom: 16 }}>
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
              {showFetch && (
                <div style={{ display: isMobile ? "block" : "flex" }}>
                  <Fastfetch C={C} isMobile={isMobile} />
                </div>
              )}

              <div
                style={{
                  borderBottom: `1px solid ${C.surface0}`,
                  marginBottom: 16,
                  paddingBottom: 8,
                }}
              >
                <p style={{ color: C.overlay1, fontSize: 11 }}>
                  JULE-ETHAN-OS v1.0.0 LTS — Type{" "}
                  <span style={{ color: C.blue }}>help</span> · theme{" "}
                  <span style={{ color: C.mauve }}>
                    latte|frappe|macchiato|mocha
                  </span>{" "}
                  · open{" "}
                  <span style={{ color: C.teal }}>github|portfolio|email</span>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(4px, 1.5vw, 8px)",
                  flexWrap: "wrap",
                  paddingRight: 8,
                }}
              >
                <span
                  style={{
                    color: C.green,
                    fontSize: 13,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  jule
                </span>
                <span style={{ color: C.overlay0 }}>@</span>
                <span
                  style={{
                    color: C.blue,
                    fontSize: 13,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  portfolio
                </span>
                <span style={{ color: C.overlay0 }}>:</span>
                <span style={{ color: C.mauve, fontSize: 13, flexShrink: 0 }}>
                  ~
                </span>
                <span style={{ color: C.overlay0 }}>$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: C.text,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    flex: 1,
                    caretColor: C.mauve,
                  }}
                />
              </form>
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* quick buttons */}
        {/* {booted && (
          <div
            style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}
          >
            {quickBtns.map((cmd) => (
              <button
                key={cmd}
                onClick={() => runCmd(cmd)}
                style={{
                  background: C.mantle,
                  border: `1px solid ${C.surface1}`,
                  color: C.subtext0,
                  padding: "clamp(4px, 1.8vw, 7px) clamp(8px, 2.5vw, 14px)",
                  borderRadius: 4,
                  fontSize: "clamp(10px, 2.6vw, 11.5px)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.base;
                  e.currentTarget.style.color = C.mauve;
                  e.currentTarget.style.borderColor = C.lavender;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.mantle;
                  e.currentTarget.style.color = C.subtext0;
                  e.currentTarget.style.borderColor = C.surface1;
                }}
              >
                ./{cmd}
              </button>
            ))}
          </div>
        )}*/}

        <p
          style={{
            color: C.overlay0,
            fontSize: 10,
            textAlign: "center",
            marginTop: 10,
            fontFamily: "inherit",
          }}
        >
          ↑↓ navigate history · theme latte|frappe|macchiato|mocha · open
          github|portfolio|email
        </p>
      </div>
    </div>
  );
}
