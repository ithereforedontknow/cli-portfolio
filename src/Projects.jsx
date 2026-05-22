// Projects.jsx - COMPLETELY REWRITTEN with outcomes, live demos, and metrics
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code as Github,
  ExternalLink,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Online Vehicle Management System",
    type: "Enterprise Production System",
    client: "Universal Leaf Philippines, Inc.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/ithereforedontknow/ovms",
    liveDemo: "https://ovms-demo.yourdomain.com", // ADDED live demo link
    metrics: {
      hoursSaved: "15+",
      timeFrame: "weekly",
      recordsProcessed: "2,000+",
      errorReduction: "100%",
    },
    problem:
      "Logistics team spent 15 hours weekly manually copying trip data between Excel sheets, causing data entry errors and delayed dispatches.",
    solution:
      "Built OVMS with state tracking (idle → dispatched → returned) and automated reporting.",
    result:
      "15 hours/week recovered → estimated $7,800 annual savings. Zero data entry errors post-launch.",
    keyDecision:
      "Chose PHP + MySQL over Node.js due to existing company infrastructure and IT team familiarity.",
  },
  {
    title: "SpillTheBeans",
    type: "Social Platform MVP",
    client: "Independent Project",
    stack: ["React", "Tailwind CSS", "Appwrite"],
    github: "https://github.com/ithereforedontknow/spillthebeans",
    liveDemo: "https://spillthebeans-demo.yourdomain.com", // ADDED live demo link
    metrics: {
      users: "50+",
      timeFrame: "beta",
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

export function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".project-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
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
      className="py-24 bg-zinc-950 px-6 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest uppercase text-pink-500 mb-2">
            // Measurable Outcomes
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Impact delivered, not just code written.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 md:p-8 flex flex-col hover:border-pink-500/40 transition-colors duration-300"
            >
              <div>
                {/* Header with type and client */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-pink-400 font-medium">
                    {project.type}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono border border-zinc-700">
                    {project.client}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {project.title}
                </h3>

                {/* NEW: Problem-Solution-Result structure */}
                <div className="space-y-3 mb-5">
                  <div className="p-3 rounded-lg bg-red-950/10 border-l-2 border-red-500">
                    <p className="text-xs text-red-400 font-mono mb-1">
                      PROBLEM
                    </p>
                    <p className="text-sm text-zinc-300">{project.problem}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/10 border-l-2 border-emerald-500">
                    <p className="text-xs text-emerald-400 font-mono mb-1">
                      SOLUTION
                    </p>
                    <p className="text-sm text-zinc-300">{project.solution}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-pink-950/10 border-l-2 border-pink-500">
                    <p className="text-xs text-pink-400 font-mono mb-1">
                      RESULT
                    </p>
                    <p className="text-sm text-zinc-300 font-medium">
                      {project.result}
                    </p>
                  </div>
                </div>

                {/* NEW: Key Decision box - shows engineering judgment */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 mb-5">
                  <p className="text-xs text-pink-500 font-mono mb-1 font-bold">
                    🔧 KEY DECISION
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {project.keyDecision}
                  </p>
                </div>
              </div>

              <div>
                {/* Metrics badges - NEW visual indicators */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-1.5 text-xs bg-zinc-900/50 rounded-lg px-2 py-1.5"
                    >
                      {key === "hoursSaved" && (
                        <Clock className="w-3 h-3 text-emerald-500" />
                      )}
                      {key === "errorReduction" && (
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                      )}
                      {key === "recordsProcessed" && (
                        <Users className="w-3 h-3 text-pink-500" />
                      )}
                      {key === "users" && (
                        <Users className="w-3 h-3 text-pink-500" />
                      )}
                      <span className="text-zinc-400 capitalize">{key}:</span>
                      <span className="text-white font-bold">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 text-xs font-medium border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Resource Triggers with BOTH GitHub and Live Demo */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-850">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" /> View code
                  </a>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm text-pink-400 hover:text-pink-300 transition-colors"
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

// Import missing icons
import {
  Clock,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
} from "lucide-react";
