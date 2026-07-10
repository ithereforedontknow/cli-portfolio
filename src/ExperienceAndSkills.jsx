// ExperienceAndSkills.jsx — light canvas, Rausch spent on the active-role
// dot and the "core skills" panel only.
import { Cpu, Award } from "lucide-react";

export function ExperienceAndSkills() {
  return (
    <section
      id="experience"
      className="py-16 md:py-24 bg-canvas px-6 border-t border-hairline-soft"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Work History Timeline */}
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-rausch mb-2">
            Verified track record
          </p>
          <h2 className="text-3xl font-bold text-ink tracking-tight mb-12">
            Professional timeline
          </h2>

          <div className="space-y-12 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-hairline">
            {/* Current role */}
            <div className="relative pl-10 group">
              <div className="absolute left-[7px] top-2 w-3 h-3 rounded-full bg-white border-2 border-rausch" />
              <span className="text-xs font-semibold text-rausch">
                Jan 2026 – Present
              </span>
              <h3 className="text-xl font-bold text-ink mt-1">
                Government Internship Program (GIP)
              </h3>
              <p className="text-sm text-muted mb-3">LGU — Agoo, La Union</p>
              <ul className="text-sm text-body space-y-2 list-disc pl-4 marker:text-rausch">
                <li>
                  <span className="text-ink font-medium">
                    2,000+ citizen records
                  </span>{" "}
                  maintained with 99.9% data accuracy
                </li>
                <li>
                  Technical support: hardware troubleshooting and software
                  deployment, reducing resolution time by{" "}
                  <span className="text-ink font-medium">40%</span>
                </li>
                <li>
                  Built internal tracking system that saved staff{" "}
                  <span className="text-ink font-medium">8 hours/week</span>
                </li>
              </ul>
            </div>

            {/* Past role */}
            <div className="relative pl-10 group">
              <div className="absolute left-[7px] top-2 w-3 h-3 rounded-full bg-white border-2 border-hairline group-hover:border-rausch transition-colors" />
              <span className="text-xs font-medium text-muted">
                Feb 2025 – May 2025
              </span>
              <h3 className="text-xl font-bold text-ink mt-1">
                Information Technology Intern
              </h3>
              <p className="text-sm text-muted mb-3">
                COMELEC — Agoo, La Union
              </p>
              <ul className="text-sm text-body space-y-2 list-disc pl-4 marker:text-muted-soft">
                <li>
                  Maintained tracking sheets for{" "}
                  <span className="text-ink font-medium">
                    500+ election operational data points
                  </span>
                </li>
                <li>
                  Diagnostic hardware checks and setup modifications under{" "}
                  <span className="text-ink font-medium">48-hour deadlines</span>
                </li>
                <li>
                  Reduced system downtime by{" "}
                  <span className="text-ink font-medium">25%</span> through
                  proactive maintenance
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Skills Matrix */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rausch mb-2">
              Technical proficiency
            </p>
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-8">
              Core vs. familiar stack
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* CORE */}
            <div className="p-4 rounded-[14px] bg-rausch/5 border border-rausch/20">
              <div className="flex items-center gap-2 text-ink font-bold text-sm mb-3">
                <Award className="w-4 h-4 text-rausch" />
                <span>Production-ready (daily drivers)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["PHP", "MySQL", "JavaScript", "React", "Tailwind CSS", "Git"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-white text-rausch text-xs font-medium border border-rausch/30"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* FAMILIAR */}
            <div className="p-4 rounded-[14px] bg-surface-soft border border-hairline-soft">
              <div className="flex items-center gap-2 text-ink font-bold text-sm mb-3">
                <Cpu className="w-4 h-4 text-muted" />
                <span>Familiar (actively mastering)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Appwrite", "Node.js", "TypeScript", "Next.js", "Docker"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-white text-body text-xs font-medium border border-hairline"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
              <p className="text-xs text-muted mt-3 italic">
                Currently building with: Appwrite + React → live project in beta
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
