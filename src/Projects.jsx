// Projects.jsx — property-card treatment: white card, rounded-md, hairline
// border, hover-float shadow. Rausch is spent once per card, on the Result.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code as Github,
  ExternalLink,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Online Vehicle Management System",
    type: "Enterprise Production System",
    client: "Universal Leaf Philippines, Inc.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/ithereforedontknow/ovms",
    liveDemo: "https://ovms-demo.yourdomain.com",
    metrics: {
      hoursSaved: "15+",
      recordsProcessed: "2,000+",
      errorReduction: "100%",
    },
    problem:
      "Logistics team spent 15 hours weekly manually copying trip data between Excel sheets, causing data entry errors and delayed dispatches.",
    solution:
      "Built OVMS with state tracking (idle → dispatched → returned) and automated reporting.",
    result:
      "15 hours/week recovered — estimated $7,800 annual savings. Zero data entry errors post-launch.",
    keyDecision:
      "Chose PHP + MySQL over Node.js due to existing company infrastructure and IT team familiarity.",
  },
  {
    title: "SpillTheBeans",
    type: "Social Platform MVP",
    client: "Independent Project",
    stack: ["React", "Tailwind CSS", "Appwrite"],
    github: "https://github.com/ithereforedontknow/spillthebeans",
    liveDemo: "https://spillthebeans-demo.yourdomain.com",
    metrics: {
      users: "50+",
      postsCreated: "200+",
      uptime: "99.9%",
    },
    problem:
      "No lightweight, privacy-focused discussion platform for niche communities tired of algorithm-driven feeds.",
    solution:
      "Built full-stack social MVP with real-time posts, user auth, and zero trackers.",
    result:
      "50+ beta users in first month. 200+ organic posts. Deployed on free tier with 99.9% uptime.",
    keyDecision:
      "Selected Appwrite over Firebase for better cost predictability and simpler React integration.",
  },
];

const METRIC_ICON = {
  hoursSaved: Clock,
  errorReduction: TrendingUp,
  recordsProcessed: Users,
  users: Users,
  postsCreated: TrendingUp,
  uptime: TrendingUp,
};

export function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".project-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 bg-canvas px-6 border-t border-hairline-soft"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-rausch mb-2">
            Measurable outcomes
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight">
            Impact delivered, not just code written.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card bg-white border border-hairline-soft rounded-[14px] p-6 md:p-8 flex flex-col hover:shadow-airbnb transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold text-rausch">
                    {project.type}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-surface-soft text-body font-medium">
                    {project.client}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-ink mb-4 tracking-tight">
                  {project.title}
                </h3>

                <div className="space-y-3 mb-5">
                  <div className="p-3 rounded-[8px] bg-surface-soft">
                    <p className="text-xs font-semibold text-muted mb-1">
                      Problem
                    </p>
                    <p className="text-sm text-body">{project.problem}</p>
                  </div>
                  <div className="p-3 rounded-[8px] bg-surface-soft">
                    <p className="text-xs font-semibold text-muted mb-1">
                      Solution
                    </p>
                    <p className="text-sm text-body">{project.solution}</p>
                  </div>
                  <div className="p-3 rounded-[8px] bg-rausch/5 border-l-2 border-rausch">
                    <p className="text-xs font-semibold text-rausch mb-1">
                      Result
                    </p>
                    <p className="text-sm text-ink font-medium">
                      {project.result}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-[8px] bg-surface-strong mb-5">
                  <p className="text-xs text-ink font-semibold mb-1">
                    Key decision
                  </p>
                  <p className="text-xs text-body leading-relaxed">
                    {project.keyDecision}
                  </p>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {Object.entries(project.metrics).map(([key, value]) => {
                    const Icon = METRIC_ICON[key] ?? TrendingUp;
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-1.5 text-xs bg-surface-soft rounded-[8px] px-2 py-1.5"
                      >
                        <Icon className="w-3 h-3 text-rausch" />
                        <span className="text-muted capitalize">{key}:</span>
                        <span className="text-ink font-bold">{value}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-white border border-hairline text-body text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-hairline-soft">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
                  >
                    <Github className="w-4 h-4" /> View code
                  </a>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-rausch hover:text-rausch-active transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
