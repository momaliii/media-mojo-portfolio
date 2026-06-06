import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--v3-paper)] border-t v3-rule">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <p className="v3-serif text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">
              Mohamed <span className="v3-italic v3-accent">Ali</span>
            </p>
            <p className="mt-4 v3-eyebrow text-[var(--v3-muted)]">
              Senior Media Buyer — MENA · EU · US
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="v3-eyebrow text-[var(--v3-muted)] mb-4">Navigate</p>
            <ul className="space-y-2 v3-serif text-xl">
              <li><Link to="/v3" className="v3-link">Home</Link></li>
              <li><Link to="/v3/case-studies" className="v3-link">Case Studies</Link></li>
              <li><a href="#services" className="v3-link">Services</a></li>
              <li><a href="#contact" className="v3-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="v3-eyebrow text-[var(--v3-muted)] mb-4">Elsewhere</p>
            <ul className="space-y-2 v3-serif text-xl">
              <li><a href="https://www.linkedin.com/in/mhmdali02/" className="v3-link" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="/Mohamed_Ali_CV.pdf" className="v3-link" target="_blank" rel="noopener noreferrer">CV (PDF)</a></li>
              <li><Link to="/" className="v3-link">v1 site</Link></li>
              <li><Link to="/v2" className="v3-link">v2 site</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t v3-rule flex flex-col md:flex-row justify-between gap-4 v3-eyebrow text-[var(--v3-muted)]">
          <span>© {new Date().getFullYear()} Mohamed Ali · MDZ Agency</span>
          <span>Set in Instrument Serif & Work Sans</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
