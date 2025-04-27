
import type { LucideIcon } from "lucide-react";
import { 
  BarChart3,
  Target, 
  PieChart,
  TrendingUp, 
  Megaphone, 
  Users, 
  Search,
  LineChart,
  Mail,
  MonitorSmartphone,
  MessageSquare,
  Code
} from "lucide-react";

type ExpertService = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
};

export const expertServices: ExpertService[] = [
  {
    icon: BarChart3,
    title: "Performance Marketing",
    description: "Data-driven marketing focused on measurable results and KPI optimization across all platforms.",
    color: "bg-blue-500"
  },
  {
    icon: Target,
    title: "Media Planning",
    description: "Strategic allocation of budgets across multiple channels to maximize campaign effectiveness.",
    color: "bg-purple-500"
  },
  {
    icon: PieChart,
    title: "Analytics",
    description: "Comprehensive data analysis with actionable insights for continuous campaign improvement.",
    color: "bg-green-500"
  },
  {
    icon: TrendingUp,
    title: "CRO",
    description: "Conversion Rate Optimization to improve your landing page performance and boost conversions.",
    color: "bg-red-500"
  },
  {
    icon: Megaphone,
    title: "Paid Social",
    description: "Expert management of social media ad campaigns across Facebook, Instagram, TikTok, and more.",
    color: "bg-pink-500"
  },
  {
    icon: Users,
    title: "PPC",
    description: "Strategic Pay-Per-Click campaign management for Google, Microsoft, and Amazon platforms.",
    color: "bg-amber-500"
  },
  {
    icon: Search,
    title: "SEO",
    description: "Search Engine Optimization to improve organic visibility and drive sustainable traffic growth.",
    color: "bg-cyan-500"
  },
  {
    icon: LineChart,
    title: "SEM",
    description: "Search Engine Marketing combining paid search, display advertising and strategic optimization.",
    color: "bg-teal-500"
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Strategic email campaigns to nurture leads, retain customers and drive repeat business.",
    color: "bg-indigo-500"
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Strategy",
    description: "Comprehensive digital marketing strategy development aligned with your business goals.",
    color: "bg-rose-500"
  },
  {
    icon: MessageSquare,
    title: "SMS Marketing",
    description: "Direct and high-converting text message campaigns with strategic timing and segmentation.",
    color: "bg-orange-500"
  },
  {
    icon: Code,
    title: "Technical SEO",
    description: "Website architecture optimization for crawlability, indexability and enhanced performance.",
    color: "bg-emerald-500"
  }
];
