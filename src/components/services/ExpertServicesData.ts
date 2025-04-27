
import type { LucideIcon } from "lucide-react";
import { 
  Monitor,
  Search,
  ChartLine,
  Target,
  Clock
} from "lucide-react";

type ExpertService = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
};

export const featuredService = {
  title: "Strategic Media Buying",
  description: [
    "Comprehensive multi-platform campaigns",
    "Data-driven optimization strategies",
    "Expert budget management and allocation",
    "Global market reach and localization"
  ],
  icon: Monitor,
  color: "bg-gradient-to-r from-media-purple to-media-oceanblue"
};

export const expertServices: ExpertService[] = [
  {
    icon: Search,
    title: "Search Engine Marketing",
    description: "Data-driven PPC campaigns on Google Ads to capture high-intent traffic and drive conversions with optimal ROI.",
    color: "bg-[#00B6F1]"
  },
  {
    icon: ChartLine,
    title: "Performance Analysis",
    description: "In-depth campaign tracking and reporting using Google Data Studio, Microsoft Clarity, and Google Analytics with actionable insights.",
    color: "bg-[#FF7051]"
  },
  {
    icon: Target,
    title: "Audience Strategy",
    description: "Developing precise targeting strategies based on demographics, interests, behaviors, and custom audiences for optimal campaign performance.",
    color: "bg-[#9B87F5]"
  },
  {
    icon: Clock,
    title: "Budget Optimization",
    description: "Strategic allocation and management of media budgets ranging from $15K to $35K+ to maximize ROI and business results.",
    color: "bg-[#D946EF]"
  }
];

