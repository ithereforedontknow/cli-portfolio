// App.jsx - FIXED
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { ExperienceAndSkills } from "./ExperienceAndSkills";
import { Footer } from "./Footer";

export default function App() {
  const pageRef = useRef(null);

  // Best practice: Use the official @gsap/react hook for safe animation scoping
  useGSAP(
    () => {
      // 1. Initial global page fade-in (REMOVED the annoying mouse glow)
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
      );
    },
    { scope: pageRef },
  );

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen bg-zinc-950 text-zinc-300 opacity-0 selection:bg-pink-500 selection:text-white overflow-x-hidden antialiased"
    >
      {/* Static background gradient - REMOVED the mouse tracking glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Structured Layout Components */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <ExperienceAndSkills />
        </main>
        <Footer />
      </div>
    </div>
  );
}
