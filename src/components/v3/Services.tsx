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
    <section id="services" className="relative py-24 md:py-36 bg-[var(--v3-paper-2)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-4">
            <p className="v3-eyebrow text-[var(--v3-accent)] mb-4">§ 02 — Services</p>
            <h2 className="v3-serif text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] sticky top-28">
              What I <span className="v3-italic">do</span>.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 self-end">
            <p className="text-lg md:text-xl leading-[1.7] text-[var(--v3-ink-2)] max-w-xl">
              Six capabilities, one operator. I run them in-house or alongside your team —
              senior hands on the dials, not a junior with a deck.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l v3-rule">
          {services.map((s) => (
            <article
              key={s.n}
              className="group p-8 md:p-10 border-r border-b v3-rule hover:bg-[var(--v3-paper)] transition-colors min-h-[280px] flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="v3-numeral text-2xl text-[var(--v3-muted)]">{s.n}</span>
                <span className="v3-eyebrow text-[var(--v3-muted)] group-hover:text-[var(--v3-accent)]">
                  Service
                </span>
              </div>
              <h3 className="v3-serif text-3xl md:text-4xl leading-tight tracking-[-0.015em] mb-4 group-hover:v3-italic group-hover:text-[var(--v3-accent)] transition-all">
                {s.title}
              </h3>
              <p className="text-[var(--v3-ink-2)] leading-relaxed flex-1">{s.body}</p>
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t v3-rule">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[0.7rem] uppercase tracking-[0.18em] px-2 py-1 border v3-rule text-[var(--v3-muted)]"
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
