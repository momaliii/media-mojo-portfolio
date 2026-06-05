import React from "react";
import { Separator } from "@/components/ui/separator";
import { Linkedin, ArrowUp, Mail, MessageCircle, MapPin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    "Paid Social Media",
    "Search Engine Marketing",
    "Programmatic Display",
    "Performance Analysis",
    "Media Planning",
  ];

  const quickLinks: Array<{ label: string; id?: string; to?: string }> = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Case Studies", to: "/case-studies" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer
      className="relative border-t border-border bg-gradient-to-b from-background via-muted/40 to-background"
      aria-labelledby="footer-heading"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-media-purple/60 to-transparent"
      />

      <div className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <h2 id="footer-heading" className="text-2xl font-bold mb-3">
              <span className="gradient-text">Mohamed Ali</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Strategic media buying & AI-driven growth for ambitious brands across
              the MENA region.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/mhmdali02/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:border-media-purple/50 hover:bg-media-purple/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-media-purple transition-colors" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/+201060098267"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp (opens in a new tab)"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:border-media-purple/50 hover:bg-media-purple/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple"
              >
                <MessageCircle className="h-4 w-4 text-muted-foreground group-hover:text-media-purple transition-colors" aria-hidden="true" />
              </a>
              <a
                href="mailto:mhmd167ali@gmail.com"
                aria-label="Send an email"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:border-media-purple/50 hover:bg-media-purple/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple"
              >
                <Mail className="h-4 w-4 text-muted-foreground group-hover:text-media-purple transition-colors" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="/#services"
                    onClick={scrollToSection("services")}
                    className="text-sm text-muted-foreground hover:text-media-purple transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav className="lg:col-span-2" aria-label="Quick links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) =>
                link.to ? (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-media-purple transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={`/#${link.id}`}
                      onClick={scrollToSection(link.id!)}
                      className="text-sm text-muted-foreground hover:text-media-purple transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-5">
              Get in touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-media-purple mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:mhmd167ali@gmail.com"
                  className="text-muted-foreground hover:text-media-purple transition-colors break-all"
                >
                  mhmd167ali@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-4 w-4 text-media-purple mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/+201060098267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-media-purple transition-colors"
                >
                  Schedule a consultation
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-media-purple mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground">
                  Cairo, Egypt · Sun – Thu, 9am – 5pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MDZ Agency · Mohamed Ali. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-media-purple transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple rounded-full px-2 py-1"
            aria-label="Back to top"
          >
            <span className="uppercase tracking-wider">Back to top</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border group-hover:border-media-purple/50 group-hover:bg-media-purple/10 transition-colors">
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
