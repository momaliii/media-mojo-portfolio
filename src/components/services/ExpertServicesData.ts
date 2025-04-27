
import type { LucideIcon } from "lucide-react";
import { 
  Search,
  ChartLine,
  Target,
  Clock
} from "lucide-react";

export type ExpertService = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  category?: string;
  features?: string[];
  longDescription?: string;
};

export const featuredService = {
  title: "Strategic Media Buying",
  description: [
    "Comprehensive multi-platform campaigns",
    "Data-driven optimization strategies",
    "Expert budget management and allocation",
    "Global market reach and localization"
  ],
  color: "bg-gradient-to-r from-media-purple to-media-oceanblue"
};

export const expertServices: ExpertService[] = [
  {
    icon: Search,
    title: "Search Engine Marketing",
    description: "Data-driven PPC campaigns on Google Ads to capture high-intent traffic and drive conversions with optimal ROI.",
    color: "bg-[#33C3F0]",
    features: [
      "Keyword research and optimization",
      "Ad copy creation and testing",
      "Landing page optimization",
      "Conversion tracking setup"
    ]
  },
  {
    icon: ChartLine,
    title: "Performance Analysis",
    description: "In-depth campaign tracking and reporting using Google Data Studio, Microsoft Clarity, and Google Analytics with actionable insights.",
    color: "bg-[#9B87F5]",
    features: [
      "Custom dashboard creation",
      "Key metrics monitoring",
      "A/B testing analysis",
      "Performance recommendations"
    ]
  },
  {
    icon: Target,
    title: "Audience Strategy",
    description: "Developing precise targeting strategies based on demographics, interests, behaviors, and custom audiences for optimal campaign performance.",
    color: "bg-[#D946EF]",
    features: [
      "Custom audience creation",
      "Lookalike audience building",
      "Demographic analysis",
      "Interest-based segmentation"
    ]
  },
  {
    icon: Clock,
    title: "Budget Optimization",
    description: "Strategic allocation and management of media budgets ranging from $15K to $35K+ to maximize ROI and business results.",
    color: "bg-[#7E69AB]",
    features: [
      "Budget allocation strategies",
      "Bid management and optimization",
      "Performance-based adjustments",
      "ROI maximization tactics"
    ]
  }
];
