import React from "react";

const services = [
  {
    n: "01",
    title: "Paid Social",
    body: "End-to-end Meta, TikTok, Snapchat & LinkedIn — strategy, creative direction, pixel & CAPI hygiene, daily optimization.",
    tags: ["Meta Ads", "TikTok", "Snapchat", "LinkedIn"],
  },
  {
    n: "02",
    title: "Search & Performance Max",
    body: "Google Ads architecture for DTC, B2B and lead-gen. Smart bidding, audience signals, full conversion modeling.",
    tags: ["Google Ads", "PMax", "GA4"],
  },
  {
    n: "03",
    title: "Funnel & Tracking",
    body: "GTM, server-side events, Easy Order, LightFunnel, attribution audits. The plumbing that makes spend honest.",
    tags: ["GTM", "Server-side", "Attribution"],
  },
  {
    n: "04",
    title: "Creative Strategy",
    body: "Hook-driven static & UGC briefs, iteration frameworks, A/B testing rituals that scale winners — fast.",
    tags: ["UGC", "Statics", "Briefs"],
  },
  {
    n: "05",
    title: "Growth Consulting",
    body: "Quarterly diagnostics for founders & CMOs — channel mix, MER targets, hiring, and the next 90 days.",
    tags: ["Audit", "Roadmap", "Advisory"],
  },
  {
    n: "06",
    title: "AI-Assisted Ops",
    body: "Custom GPTs, automations and AI agents that compress reporting, briefing & creative iteration loops.",
    tags: ["LLMs", "Automation", "Agents"],
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-20 md:py-28 bg-[rgba(255,255,255,0.025)] border-y v3-rule">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-4">
            <p className="v3-eyebrow v3-cyan mb-4">Growth modules</p>
            <h2 className="v3-display text-4xl md:text-6xl font-bold leading-[1] tracking-[-0.05em] sticky top-28">
              Built like an ad account operating system.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 self-end">
            <p className="text-lg md:text-xl leading-[1.7] v3-soft max-w-xl">
              Strategy, execution, attribution and creative iteration in one loop — built for founders and teams that care about payback, not vanity metrics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <article
              key={s.n}
              className="group v3-shell v3-card-hover rounded-[1.7rem] p-6 md:p-7 min-h-[300px] flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="v3-numeral text-3xl font-bold v3-muted">{s.n}</span>
                <span className="v3-eyebrow v3-muted group-hover:text-[var(--v3-lime)]">
                  Module
                </span>
              </div>
              <h3 className="v3-display text-2xl md:text-3xl font-bold leading-tight tracking-[-0.04em] mb-4 group-hover:text-[var(--v3-lime)] transition-colors">
                {s.title}
              </h3>
              <p className="v3-soft leading-relaxed flex-1">{s.body}</p>
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t v3-rule">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[0.68rem] uppercase tracking-[0.14em] px-2.5 py-1.5 rounded-full bg-white/5 text-[var(--v3-soft)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
