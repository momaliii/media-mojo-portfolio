import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Eye, Target } from "lucide-react";
import { snapchatSpend, impressions } from "@/data/portfolioFacts";

const highlights = [
  {
    icon: DollarSign,
    label: "Ad spend managed",
    value: snapchatSpend.display,
    accent: "from-[#FFFC00]/25 to-[#FFFC00]/5",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-100",
  },
  {
    icon: Eye,
    label: "Impressions delivered",
    value: impressions.display,
    accent: "from-media-oceanblue/25 to-media-oceanblue/5",
    iconColor: "text-media-oceanblue",
    iconBg: "bg-media-oceanblue/10",
  },
  {
    icon: Target,
    label: "Average ROAS achieved",
    value: "8×+",
    accent: "from-media-purple/25 to-media-purple/5",
    iconColor: "text-media-purple",
    iconBg: "bg-media-purple/10",
  },
];

const platforms = ["Meta", "TikTok", "Snapchat", "Google", "LinkedIn"];

const HighlightResults = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 [&>div]:min-w-0">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
            className="relative overflow-hidden rounded-xl border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} aria-hidden="true" />
            <div className="p-5">
              <div className={`inline-flex p-2 rounded-full ${item.iconBg} mb-3`}>
                <item.icon size={18} className={item.iconColor} aria-hidden="true" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-gray-900 leading-none">
                {item.value}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-500">{item.label}</p>
              {"note" in item && (
                <p className="mt-0.5 text-xs text-gray-400">{item.note}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1"
        aria-label="Advertising platforms I work with"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          Platforms
        </span>
        {platforms.map((platform) => (
          <span
            key={platform}
            className="rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm"
          >
            {platform}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default HighlightResults;
