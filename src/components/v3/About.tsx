import React from "react";

const About = () => {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <aside className="col-span-12 md:col-span-4 md:sticky md:top-28 self-start">
            <p className="v3-eyebrow v3-orange mb-4">Operator profile</p>
            <h2 className="v3-display text-4xl md:text-6xl font-bold leading-[1] tracking-[-0.05em]">
              Senior hands on the actual controls.
            </h2>

            <dl className="mt-8 space-y-3">
              {[
                ["Based in", "Cairo, Egypt"],
                ["Working with", "MENA · EU · US"],
                ["Languages", "Arabic · English"],
                ["Stack", "Meta · TikTok · Google · LinkedIn"],
              ].map(([k, v]) => (
                <div key={k} className="v3-shell rounded-2xl p-4 flex justify-between items-baseline gap-4">
                  <dt className="v3-eyebrow v3-muted">{k}</dt>
                  <dd className="font-bold text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-8 text-lg md:text-xl leading-[1.7] v3-soft">
            <div className="v3-shell rounded-[1.7rem] p-6 md:p-8">
              <p className="v3-display text-2xl md:text-4xl font-bold leading-[1.15] tracking-[-0.04em] text-[var(--v3-text)]">
              I started in 2018 buying media for a small DTC brand in Cairo. Seven years
              later, I've run eight-figure budgets across ten countries — and I still treat
              every dollar like it's mine.
              </p>
            </div>

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

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Meta Blueprint Certified",
                "Google Ads Certified",
                "TikTok Marketing Partner",
                "Snapchat Ads Manager",
              ].map((c) => (
                <li key={c} className="v3-shell rounded-2xl p-4 flex items-baseline gap-3 text-base">
                  <span className="v3-lime">✦</span>
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
