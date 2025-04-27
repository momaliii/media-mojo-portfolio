import type { LucideIcon } from "lucide-react";
import { 
  Target, 
  TrendingUp, 
  Users, 
  ChartLine,
  BadgeCheck,
  Search
} from "lucide-react";

type ExpertService = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
};

export const expertServices: ExpertService[] = [
  {
    icon: ChartLine,
    title: "Performance Marketing",
    description: "Data-driven strategies to maximize ROAS and campaign effectiveness across platforms.",
    color: "bg-blue-500"
  },
  {
    icon: Target,
    title: "Audience Strategy",
    description: "Advanced targeting and segmentation to reach your ideal customers efficiently.",
    color: "bg-purple-500"
  },
  {
    icon: Search,
    title: "Search Marketing",
    description: "Expert SEM management across Google, Microsoft & Amazon platforms.",
    color: "bg-green-500"
  },
  {
    icon: TrendingUp,
    title: "Growth Optimization",
    description: "Continuous performance optimization to scale your campaigns profitably.",
    color: "bg-red-500"
  },
  {
    icon: Users,
    title: "Social Media Ads",
    description: "Strategic social media campaigns across Meta, TikTok & LinkedIn.",
    color: "bg-amber-500"
  },
  {
    icon: BadgeCheck,
    title: "Campaign Analysis",
    description: "In-depth analytics and insights to drive continuous improvement.",
    color: "bg-cyan-500"
  }
];

export type RegularService = {
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  color: string;
  category?: string;
};

export const allServices: RegularService[] = expertServices.map(service => ({
  ...service,
  category: 'media',
  longDescription: `Comprehensive ${service.title} services tailored to your business needs.`,
  features: ["Data-driven approach", "Performance tracking", "ROI optimization"]
}));
