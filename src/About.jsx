// About.jsx — the narrative bridge between Hero and Projects. Short bio +
// a quick-facts row, sharing the same max-w-7xl grid as every other section
// so the left edge lines up all the way down the page.
import { GraduationCap, MapPin, Clock3, Sparkles } from "lucide-react";

const FACTS = [
  {
    icon: GraduationCap,
    label: "Focus",
    value: "Full-stack web (PHP/React)",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Agoo, La Union, PH",
  },
  {
    icon: Clock3,
    label: "Response time",
    value: "Within 24 hours",
  },
  {
    icon: Sparkles,
    label: "Currently",
    value: "Government Internship Program",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-canvas px-6 border-t border-hairline-soft"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-rausch mb-2">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
            I build the tool that replaces the spreadsheet.
          </h2>
          <p className="text-base md:text-lg text-body leading-relaxed max-w-2xl">
            I got into development the practical way: watching a logistics
            team lose 15 hours a week to manual copy-paste, and deciding that
            was a solvable problem. That's still the lens I build through —
            find the manual, error-prone process, and replace it with
            something that just works. Most of my hands-on time is in PHP,
            MySQL, and React, with a growing familiarity in the modern
            TypeScript/Next.js stack.
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FACTS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="p-4 rounded-[14px] bg-surface-soft border border-hairline-soft"
            >
              <Icon className="w-4 h-4 text-rausch mb-2" />
              <p className="text-xs text-muted mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
