// App.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";
import { ExperienceAndSkills } from "./ExperienceAndSkills";
import { Footer } from "./Footer";

export default function App() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
      );
    },
    { scope: pageRef },
  );

  return (
    <div
      ref={pageRef}
      className="relative w-full min-h-screen bg-canvas text-body opacity-0 selection:bg-rausch selection:text-white overflow-x-hidden antialiased"
    >
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <ExperienceAndSkills />
        </main>
        <Footer />
      </div>
    </div>
  );
}
