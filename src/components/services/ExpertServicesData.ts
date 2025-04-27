
import { MonitorSmartphone, Megaphone, FileImage, BarChart, Video, Film, Mic, Layers, Target, Code, ShoppingBag, Globe } from "lucide-react";

export interface ServiceType {
  icon: React.ReactNode;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  color: string;
  category: string;
}

export const expertServices: ServiceType[] = [
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
    title: "Media Buying",
    description: "Strategic campaigns across Facebook, Instagram, LinkedIn, TikTok, Snapchat, and Twitter to reach your target audience.",
    longDescription: "Comprehensive media buying services that maximize ROI by strategically placing ads across multiple platforms.",
    features: [
      "Platform-specific optimization strategies",
      "Audience targeting and segmentation",
      "Budget allocation and management",
      "Performance monitoring and reporting"
    ],
    color: "bg-media-purple",
    category: "media"
  },
  {
    icon: <Megaphone className="w-8 h-8 text-white" />,
    title: "Marketing Strategy",
    description: "Comprehensive marketing strategies tailored to your business goals and target audience for maximum results.",
    longDescription: "Data-driven marketing strategies aligned with business objectives to drive measurable results.",
    features: [
      "Market research and competitive analysis",
      "Brand positioning and messaging",
      "Multi-channel campaign planning",
      "Performance metrics and KPI tracking"
    ],
    color: "bg-media-oceanblue",
    category: "media"
  },
  {
    icon: <FileImage className="w-8 h-8 text-white" />,
    title: "Graphic Design",
    description: "Eye-catching visual designs that communicate your brand message and capture audience attention.",
    longDescription: "Professional graphic design services that ensure visual consistency across all marketing materials.",
    features: [
      "Brand identity development",
      "Ad creative production",
      "Social media graphics",
      "Marketing collateral design"
    ],
    color: "bg-media-orange",
    category: "design"
  },
  {
    icon: <Video className="w-8 h-8 text-white" />,
    title: "Video Editing",
    description: "Professional video editing services that transform raw footage into compelling visual stories.",
    longDescription: "High-quality video editing that creates engaging content optimized for each platform.",
    features: [
      "Ad-specific video formatting",
      "Motion graphics integration",
      "Sound design and optimization",
      "Platform-specific optimizations"
    ],
    color: "bg-media-pink",
    category: "content"
  }
];

export const allServices: ServiceType[] = [
  ...expertServices,
  {
    icon: <Film className="w-8 h-8 text-white" />,
    title: "Video Graphics",
    description: "Dynamic video graphics that enhance your content with professional visual elements and animations.",
    longDescription: "Eye-catching motion graphics that bring your brand message to life through animation.",
    features: [
      "Custom animations for brand elements",
      "Promotional video graphics",
      "Animated product showcases",
      "Social media optimized animations"
    ],
    color: "bg-gradient-to-r from-media-purple to-media-oceanblue",
    category: "content"
  },
  {
    icon: <Mic className="w-8 h-8 text-white" />,
    title: "Voice Over",
    description: "Professional voice over services to give your content a polished, authoritative sound.",
    longDescription: "High-quality voice overs that add professionalism and clarity to your video content.",
    features: [
      "Professional voice talent selection",
      "Script optimization for spoken delivery",
      "Multiple language options",
      "Audio mixing and enhancement"
    ],
    color: "bg-media-orange",
    category: "content"
  },
  {
    icon: <Layers className="w-8 h-8 text-white" />,
    title: "Motion Graphics",
    description: "Captivating motion graphics that bring your ideas to life through animated visual storytelling.",
    longDescription: "Custom motion graphics that simplify complex concepts and engage viewers with dynamic visuals.",
    features: [
      "2D and 3D animation",
      "Infographic animations",
      "Logo animations",
      "Promotional motion graphics"
    ],
    color: "bg-media-vibrantpurple",
    category: "design"
  },
  {
    icon: <Target className="w-8 h-8 text-white" />,
    title: "Animations",
    description: "Creative animations that simplify complex concepts and engage viewers with dynamic visual experiences.",
    longDescription: "Stunning animations that capture attention and effectively communicate your brand message.",
    features: [
      "Character animations",
      "Product demonstrations",
      "Explainer videos",
      "Social media animations"
    ],
    color: "bg-media-purple",
    category: "design"
  },
  {
    icon: <Code className="w-8 h-8 text-white" />,
    title: "Web Development",
    description: "Custom website development that combines attractive design with powerful functionality.",
    longDescription: "Professional web development services that create responsive, user-friendly websites.",
    features: [
      "Responsive design implementation",
      "E-commerce functionality",
      "Custom CMS development",
      "Performance optimization"
    ],
    color: "bg-media-oceanblue",
    category: "development"
  },
  {
    icon: <ShoppingBag className="w-8 h-8 text-white" />,
    title: "Shopify Store",
    description: "Complete Shopify store setup and optimization for a seamless e-commerce experience that drives sales.",
    longDescription: "End-to-end Shopify development with focus on conversion optimization and user experience.",
    features: [
      "Custom theme development",
      "Product setup and optimization",
      "Payment gateway integration",
      "Analytics and tracking setup"
    ],
    color: "bg-[#7AB55C]",
    category: "development"
  },
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    title: "WordPress Store",
    description: "Professional WordPress store development with powerful e-commerce capabilities and customizations.",
    longDescription: "WordPress and WooCommerce development that creates flexible, scalable online stores.",
    features: [
      "Custom theme development",
      "Plugin customization",
      "Payment processing integration",
      "SEO optimization"
    ],
    color: "bg-[#21759B]",
    category: "development"
  },
  {
    icon: <BarChart className="w-8 h-8 text-white" />,
    title: "Analytics Setup",
    description: "Comprehensive analytics setup to track campaign performance and provide actionable insights.",
    longDescription: "Data-driven analytics setup that enables informed decision making and campaign optimization.",
    features: [
      "Google Analytics implementation",
      "Custom dashboard creation",
      "Conversion tracking setup",
      "Regular performance reporting"
    ],
    color: "bg-media-vibrantpurple",
    category: "media"
  }
];
