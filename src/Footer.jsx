// Footer.jsx — footer-light: white surface, three-column link block above
// a muted legal-band, per the spec's footer-light/legal-band components.
import { Mail, Phone, ArrowUpCircle, FileText, Code as Github } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="bg-canvas border-t border-hairline-soft pt-16 md:pt-24 px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* CTA row */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-rausch mb-2">
            Get in touch
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-ink mb-3">
            Seeking full-stack roles (remote/La Union) or freelance web builds.
          </h3>
          <p className="text-sm text-muted">
            Ready to audit your current logistics dashboard or build your MVP
            from scratch. Response within 24 hours.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-12 border-b border-hairline-soft">
          <div>
            <p className="text-sm font-semibold text-ink mb-3">Contact</p>
            <div className="flex flex-col gap-2.5 text-sm text-body">
              <a
                href="mailto:juleethan@gmail.com"
                className="flex items-center gap-2 hover:text-ink transition-colors group"
              >
                <Mail className="w-4 h-4 text-rausch group-hover:scale-110 transition-transform" />
                juleethan@gmail.com
              </a>
              <a
                href="tel:+639193694589"
                className="flex items-center gap-2 hover:text-ink transition-colors group"
              >
                <Phone className="w-4 h-4 text-rausch group-hover:scale-110 transition-transform" />
                +63 919 369 4589
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink mb-3">Elsewhere</p>
            <div className="flex flex-col gap-2.5 text-sm text-body">
              <a
                href="https://github.com/ithereforedontknow"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-ink transition-colors group"
              >
                <Github className="w-4 h-4 text-rausch group-hover:scale-110 transition-transform" />
                GitHub
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink mb-3">Resume</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Resume PDF would download here. In production, link to actual /resume.pdf",
                );
              }}
              className="flex items-center gap-2 text-sm text-body hover:text-ink transition-colors"
            >
              <FileText className="w-4 h-4 text-rausch" /> Download resume (PDF)
            </a>
          </div>
        </div>

        {/* Legal band */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} Jule Ethan Fontanilla • Full-stack
            developer
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            Back to top <ArrowUpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
