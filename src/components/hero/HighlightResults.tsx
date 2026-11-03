import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Eye, Target } from "lucide-react";
import {
  SiMeta,
  SiTiktok,
  SiSnapchat,
  SiGoogle,
  SiLinkedin,
  SiX,
} from "@icons-pack/react-simple-icons";
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

// Brand-real presentation: each tile mirrors the platform's own identity.
const platforms = [
  { name: "Meta", icon: SiMeta, color: "#0866FF", tile: "bg-white border border-border/60" },
  { name: "TikTok", icon: SiTiktok, color: "#000000", tile: "bg-white border border-border/60" },
  { name: "Snapchat", icon: SiSnapchat, color: "#0F0F0F", tile: "bg-[#FFFC00]" },
  { name: "Google", icon: SiGoogle, color: "#4285F4", tile: "bg-white border border-border/60" },
  { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2", tile: "bg-white border border-border/60" },
  { name: "X", icon: SiX, color: "#0F0F0F", tile: "bg-white border border-border/60" },
];

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
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="border-t border-border pt-5"
        aria-label="Advertising platforms I work with"
      >
        <h2 className="mb-3 text-xs font-semibold text-muted-foreground">
          Platforms
        </h2>
        <ul className="grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-6" aria-label="Advertising platforms">
          {platforms.map(({ name, icon: Icon }) => (
            <li key={name} className="flex min-w-0 flex-col items-center gap-2 text-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold leading-5">{name}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default HighlightResults;
