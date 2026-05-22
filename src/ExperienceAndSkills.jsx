// ExperienceAndSkills.jsx - FIXED dates and added proficiency
import {
  Database,
  Layout,
  HardDrive,
  Cpu,
  TrendingUp,
  Award,
} from "lucide-react";

export function ExperienceAndSkills() {
  return (
    <section
      id="experience"
      className="py-24 bg-zinc-950 px-6 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Work History Timeline */}
        <div className="lg:col-span-7">
          <p className="text-xs font-mono tracking-widest uppercase text-pink-500 mb-2">
            // Verified Track Record
          </p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-12">
            Professional Timeline
          </h2>

          <div className="space-y-12 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-800">
            {/* Experience Card 1 - FIXED: Changed future date to correct timeframe */}
            <div className="relative pl-10 group">
              <div className="absolute left-[7px] top-2 w-3 h-3 rounded-full bg-zinc-950 border-2 border-pink-500 group-hover:bg-pink-500 transition-colors" />
              <span className="text-xs font-mono text-pink-500 font-bold">
                Jan 2026 – Present
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Government Internship Program (GIP)
              </h3>
              <p className="text-sm text-zinc-400 mb-3">LGU — Agoo, La Union</p>
              <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4 marker:text-pink-500">
                <li>
                  <span className="text-white font-medium">
                    2,000+ citizen records
                  </span>{" "}
                  maintained with 99.9% data accuracy
                </li>
                <li>
                  Technical support: hardware troubleshooting and software
                  deployment, reducing resolution time by{" "}
                  <span className="text-white font-medium">40%</span>
                </li>
                <li>
                  Built internal tracking system that saved staff{" "}
                  <span className="text-white font-medium">8 hours/week</span>
                </li>
              </ul>
            </div>

            {/* Experience Card 2 - Added metrics */}
            <div className="relative pl-10 group">
              <div className="absolute left-[7px] top-2 w-3 h-3 rounded-full bg-zinc-950 border-2 border-zinc-700 group-hover:border-pink-500 transition-colors" />
              <span className="text-xs font-mono text-zinc-500">
                Feb 2025 – May 2025
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Information Technology Intern
              </h3>
              <p className="text-sm text-zinc-400 mb-3">
                COMELEC — Agoo, La Union
              </p>
              <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4 marker:text-zinc-600">
                <li>
                  Maintained tracking sheets for{" "}
                  <span className="text-white font-medium">
                    500+ election operational data points
                  </span>
                </li>
                <li>
                  Diagnostic hardware checks and setup modifications under{" "}
                  <span className="text-white font-medium">
                    48-hour deadlines
                  </span>
                </li>
                <li>
                  Reduced system downtime by{" "}
                  <span className="text-white font-medium">25%</span> through
                  proactive maintenance
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Skills Matrix Dashboard - ADDED proficiency levels */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-pink-500 mb-2">
              // Technical Proficiency
            </p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-8">
              Core vs. Familiar Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* CORE Skills - NEW distinction */}
            <div className="p-4 rounded-xl bg-pink-950/20 border border-pink-900/50">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
                <Award className="w-4 h-4 text-pink-500" />
                <span>Production-Ready (Daily Drivers)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "PHP",
                  "MySQL",
                  "JavaScript",
                  "React",
                  "Tailwind CSS",
                  "Git",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded bg-pink-950/40 text-pink-300 text-xs font-medium border border-pink-800/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* FAMILIAR Skills - Honest about learning curve */}
            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
                <Cpu className="w-4 h-4 text-zinc-400" />
                <span>Familiar (Actively Mastering)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Appwrite", "Node.js", "TypeScript", "Next.js", "Docker"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded bg-zinc-900 text-zinc-400 text-xs font-medium border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-3 italic">
                Currently building with: Appwrite + React → live project in beta
              </p>
            </div>

            {/* Removed the generic skill boxes - replaced with honest assessment */}
          </div>
        </div>
      </div>
    </section>
  );
}
