import React from "react";

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <aside className="col-span-12 md:col-span-4 md:sticky md:top-28 self-start">
            <p className="v3-eyebrow text-[var(--v3-accent)] mb-4">§ 03 — About</p>
            <h2 className="v3-serif text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
              An operator, <br />
              <span className="v3-italic">not</span> an agency.
            </h2>

            <dl className="mt-12 space-y-6 border-t v3-rule pt-8">
              {[
                ["Based in", "Cairo, Egypt"],
                ["Working with", "MENA · EU · US"],
                ["Languages", "Arabic · English"],
                ["Stack", "Meta · TikTok · Google · LinkedIn"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-baseline gap-4">
                  <dt className="v3-eyebrow text-[var(--v3-muted)]">{k}</dt>
                  <dd className="v3-serif text-xl text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-8 text-lg md:text-xl leading-[1.7] text-[var(--v3-ink-2)]">
            <p className="v3-serif text-3xl md:text-4xl leading-[1.2] text-[var(--v3-ink)]">
              <span className="v3-italic v3-accent">"</span>
              I started in 2018 buying media for a small DTC brand in Cairo. Seven years
              later, I've run eight-figure budgets across ten countries — and I still treat
              every dollar like it's mine.
              <span className="v3-italic v3-accent">"</span>
            </p>

            <p>
              My work sits at the intersection of <em>media buying</em>, <em>analytics</em>,
              and <em>creative strategy</em>. Most operators pick one. The brands I scale
              fastest are the ones where I get to own all three.
            </p>

            <p>
              Today I split time between founder-led DTC brands, performance-driven NGOs, and
              ambitious B2B teams across the Gulf. I take on a small handful of engagements
              at a time — partnership, not procurement.
            </p>

            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 pt-8 border-t v3-rule">
              {[
                "Meta Blueprint Certified",
                "Google Ads Certified",
                "TikTok Marketing Partner",
                "Snapchat Ads Manager",
              ].map((c) => (
                <li key={c} className="flex items-baseline gap-3 text-base">
                  <span className="v3-accent">✦</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
