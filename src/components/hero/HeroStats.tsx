
import React from "react";

const stats = [
  { value: "8.4×", label: "Peak ROAS", context: "Beauty DTC · Meta" },
  { value: "95K+", label: "Orders generated", context: "Last 24 months" },
  { value: "10", label: "Countries", context: "MENA, EU, US, China" },
  { value: "6+", label: "Years", context: "Senior media buying" },
];

const HeroStats = () => {
  return (
    <dl className="pt-6 mt-2 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col">
          <dt className="text-2xl md:text-3xl font-display font-bold text-white tabular">
            {s.value}
          </dt>
          <dd className="mt-1">
            <span className="block text-sm font-medium text-white/80">
              {s.label}
            </span>
            <span className="block text-xs text-white/50 mt-0.5">
              {s.context}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default HeroStats;
