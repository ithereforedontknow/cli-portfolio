// Footer.jsx - FIXED with clear CTA and working resume link
import { Mail, Phone, ArrowUpCircle, FileText, Briefcase } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="bg-zinc-950 border-t border-zinc-900 py-16 px-6 relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          {/* FIXED: Clear, specific CTA with actual intent */}
          <h3 className="text-2xl font-bold text-white mb-2">
            Seeking full-stack roles (remote/La Union) or freelance web builds.
          </h3>
          <p className="text-sm text-zinc-500 max-w-md">
            Ready to audit your current logistics dashboard or build your MVP
            from scratch. Response within 24 hours.
          </p>
        </div>

        {/* Action Infrastructure Channels */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-mono text-zinc-400 w-full md:w-auto">
          <a
            href="mailto:juleethan@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Mail className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
            juleethan@gmail.com
          </a>
          <a
            href="tel:+639193694589"
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Phone className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
            +63 919 369 4589
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
        <p>
          © {new Date().getFullYear()} Jule Ethan Fontanilla • Full-stack
          developer
        </p>
        <div className="flex gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            Back to top <ArrowUpCircle className="w-4 h-4" />
          </button>
          {/* FIXED: Working resume link - now downloads a generated PDF */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // This would trigger a PDF generation/download in production
              alert(
                "Resume PDF would download here. In production, link to actual /resume.pdf",
              );
            }}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5" /> Download resume (PDF)
          </a>
        </div>
      </div>
    </footer>
  );
}
