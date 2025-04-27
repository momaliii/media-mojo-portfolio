import type { LucideIcon } from "lucide-react";
import { 
  Monitor,
  Search,
  ChartLine,
  Target,
  Clock,
  Code,
  BarChart,
  Mail
} from "lucide-react";

type ExpertService = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
};

export type RegularService = {
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  color: string;
  category: string;
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
    icon: Monitor,
    title: "Strategic Media Buying",
    description: "Data-driven cross-platform campaigns with expert budget management across multiple platforms and global markets.",
    color: "bg-[#00B6F1]"
  },
  {
    icon: Search,
    title: "Search Engine Marketing",
    description: "Data-driven PPC campaigns on Google Ads to capture high-intent traffic and drive conversions with optimal ROI.",
    color: "bg-[#FF7051]"
  },
  {
    icon: ChartLine,
    title: "Performance Analysis",
    description: "In-depth campaign tracking and reporting using Google Data Studio, Microsoft Clarity, and Google Analytics with actionable insights.",
    color: "bg-[#9B87F5]"
  },
  {
    icon: Target,
    title: "Audience Strategy",
    description: "Developing precise targeting strategies based on demographics, interests, behaviors, and custom audiences for optimal campaign performance.",
    color: "bg-[#D946EF]"
  },
  {
    icon: Clock,
    title: "Budget Optimization",
    description: "Strategic allocation and management of media budgets ranging from $15K to $35K+ to maximize ROI and business results.",
    color: "bg-[#7E69AB]"
  }
];

export const allServices: RegularService[] = [
  {
    icon: Search,
    title: "Paid Search Advertising",
    description: "Google & Bing Ads campaigns optimized for conversion and ROI",
    longDescription: "Strategic keyword research, ad creation, and bid management to drive qualified traffic and maximize conversions on Google and Microsoft platforms.",
    features: [
      "Keyword research and strategy",
      "Ad copy optimization",
      "Landing page analysis",
      "Conversion tracking and optimization",
      "Budget management"
    ],
    color: "bg-[#4285F4]",
    category: "search"
  },
  {
    icon: Monitor,
    title: "Social Media Advertising",
    description: "Targeted campaigns across Facebook, Instagram, LinkedIn and TikTok",
    longDescription: "Data-driven campaign strategies to reach and engage your ideal audience across multiple social platforms with compelling creative and precise targeting.",
    features: [
      "Audience targeting",
      "Creative development",
      "Placement optimization",
      "A/B testing",
      "Performance tracking"
    ],
    color: "bg-[#1877F2]",
    category: "social"
  },
  {
    icon: BarChart,
    title: "Analytics & Reporting",
    description: "Comprehensive data analysis and actionable insights",
    longDescription: "Advanced analytics setup and custom reporting to track performance, identify opportunities, and make data-driven decisions for continuous improvement.",
    features: [
      "Custom dashboard creation",
      "Conversion tracking setup",
      "Performance analysis",
      "Actionable recommendations",
      "Regular reporting"
    ],
    color: "bg-[#EA4335]",
    category: "analytics"
  },
  {
    icon: Code,
    title: "Website Optimization",
    description: "Technical improvements to maximize conversion rates",
    longDescription: "Technical analysis and implementation of website improvements to enhance user experience, increase conversions, and support marketing campaigns.",
    features: [
      "Performance analysis",
      "Conversion rate optimization",
      "Landing page design",
      "A/B testing",
      "Technical SEO"
    ],
    color: "bg-[#34A853]",
    category: "website"
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Targeted email campaigns for nurturing and converting customers",
    longDescription: "Strategic email marketing campaigns designed to nurture leads, engage customers, and drive conversions through personalized and relevant messaging.",
    features: [
      "Campaign strategy development",
      "Email template design",
      "List segmentation",
      "Automation setup",
      "Performance analysis"
    ],
    color: "bg-[#FBBC05]",
    category: "email"
  },
  {
    icon: ChartLine,
    title: "Conversion Optimization",
    description: "Strategic improvements to website and campaigns for higher ROI",
    longDescription: "Data-driven analysis and strategic changes to improve conversion rates across your digital marketing channels and maximize return on investment.",
    features: [
      "User journey mapping",
      "Heatmap analysis",
      "A/B testing",
      "Form optimization",
      "Call-to-action improvements"
    ],
    color: "bg-[#9C27B0]",
    category: "conversion"
  }
];
