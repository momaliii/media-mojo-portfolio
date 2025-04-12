
// Define the type for metrics
export interface CaseStudyMetric {
  label: string;
  value: string;
}

// Define the type for case studies
export interface CaseStudy {
  title: string;
  category: string;
  image: string;
  screenshot?: string;
  client: string;
  metrics: CaseStudyMetric[];
  description: string;
}

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    title: "E-commerce Revenue Growth",
    category: "e-commerce",
    image: "bg-gradient-to-br from-media-purple/80 to-media-pink/80",
    screenshot: "/lovable-uploads/097d6b1dd-bd01-420f-857d-b18eae7dbd5d.png",
    client: "Fashion Retailer",
    metrics: [
      { label: "ROAS", value: "8.2x" },
      { label: "Revenue", value: "$129K+" },
      { label: "Conversion", value: "+145%" }
    ],
    description: "Increased e-commerce sales for a fashion retailer through optimized Meta campaigns, achieving 8.2x ROAS and generating over $129,000 in revenue from a single campaign."
  },
  {
    title: "B2B Lead Generation",
    category: "b2b",
    image: "bg-gradient-to-br from-media-blue/90 to-media-oceanblue/90",
    client: "SaaS Platform",
    metrics: [
      { label: "CPL", value: "-42%" },
      { label: "Leads", value: "+124%" },
      { label: "CAC", value: "-28%" }
    ],
    description: "Implemented an account-based marketing approach with targeted LinkedIn and Google campaigns, reducing cost per qualified lead by 42%."
  },
  {
    title: "App Install Campaign",
    category: "apps",
    image: "bg-gradient-to-br from-media-orange/80 to-yellow-400/80",
    client: "Fitness App",
    metrics: [
      { label: "CPI", value: "$1.24" },
      { label: "Installs", value: "125K" },
      { label: "Retention", value: "+32%" }
    ],
    description: "Executed a multi-channel mobile app campaign that delivered 125K installs with a 32% improvement in 30-day user retention."
  },
  {
    title: "Brand Awareness Campaign",
    category: "branding",
    image: "bg-gradient-to-br from-emerald-500/80 to-media-oceanblue/80",
    client: "Food & Beverage",
    metrics: [
      { label: "Impressions", value: "12M" },
      { label: "CPM", value: "-24%" },
      { label: "Engagement", value: "+81%" }
    ],
    description: "Designed and managed programmatic display and video campaigns that reached over 12M targeted impressions with an 81% increase in engagement."
  },
  {
    title: "Local Business Growth",
    category: "local",
    image: "bg-gradient-to-br from-indigo-500/80 to-media-vibrantpurple/80",
    client: "Restaurant Chain",
    metrics: [
      { label: "Store Visits", value: "+45%" },
      { label: "CPA", value: "$8.42" },
      { label: "ROI", value: "3.8x" }
    ],
    description: "Implemented location-based campaigns for 24 restaurants, increasing in-store visits by 45% and driving a measurable lift in revenue."
  },
  {
    title: "Travel Booking Optimization",
    category: "travel",
    image: "bg-gradient-to-br from-sky-500/80 to-media-blue/80",
    client: "Travel Agency",
    metrics: [
      { label: "Conversion Rate", value: "+57%" },
      { label: "Booking Value", value: "+24%" },
      { label: "ROAS", value: "5.2x" }
    ],
    description: "Restructured search and display campaigns with advanced audience targeting, increasing booking conversion rates by 57%."
  }
];
