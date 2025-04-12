
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
  additionalScreenshots?: string[];
  client: string;
  metrics: CaseStudyMetric[];
  description: string;
  industry?: string; // Added industry field
}

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    title: "E-commerce Revenue Growth",
    category: "e-commerce",
    image: "bg-gradient-to-br from-media-purple/80 to-media-pink/80",
    client: "Fashion Retailer",
    metrics: [
      { label: "ROAS", value: "5.2x" },
      { label: "Revenue", value: "$129K+" },
      { label: "Conversion", value: "+145%" }
    ],
    description: "Increased e-commerce sales for a fashion retailer through optimized Meta campaigns, achieving 5.2x ROAS and generating over $129,000 in revenue from a single campaign.",
    industry: "Fashion",
    screenshot: "/lovable-uploads/97d6b1dd-bd01-420f-857d-b18eae7dbd5d.png",
    additionalScreenshots: [
      "/lovable-uploads/04a87b8a-bf75-42bd-be94-6ae0391bac19.png",
      "/lovable-uploads/d18578fe-5e88-4f36-820d-b2a718472bd7.png"
    ]
  },
  {
    title: "E-commerce Revenue Growth on Cosmetics",
    category: "e-commerce",
    image: "bg-gradient-to-br from-pink-500/80 to-red-400/80",
    client: "Beauty Brand",
    metrics: [
      { label: "ROAS", value: "8.6x" },
      { label: "Revenue", value: "$245K+" },
      { label: "AOV", value: "+32%" }
    ],
    description: "Transformed an underperforming cosmetics brand with strategic paid media optimization, achieving 8.6x ROAS and increasing average order value by 32%.",
    industry: "Beauty",
    screenshot: "/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png",
    additionalScreenshots: [
      "/lovable-uploads/90b6f75c-5af3-4d14-a7c7-97fdd4de046b.png",
      "/lovable-uploads/cbc5d1b5-721f-4e97-9dd4-b0abe510f6ca.png"
    ]
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
    description: "Implemented an account-based marketing approach with targeted LinkedIn and Google campaigns, reducing cost per qualified lead by 42%.",
    industry: "Technology",
    screenshot: "/lovable-uploads/9346e7a4-3664-492a-89e0-04c47bbf435b.png",
    additionalScreenshots: [
      "/lovable-uploads/6169f3be-4578-4251-a8d5-421bd0d12051.png",
      "/lovable-uploads/64c102de-0d99-4fd5-8306-3f34cc9a99cb.png"
    ]
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
    description: "Designed and managed programmatic display and video campaigns that reached over 12M targeted impressions with an 81% increase in engagement.",
    industry: "Food & Beverage",
    screenshot: "/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png",
    additionalScreenshots: [
      "/lovable-uploads/ff3cd5e7-578b-4c18-ba7f-e66aae487f95.png",
      "/lovable-uploads/75a4b4c5-2ee2-4ea8-808a-145ba7559879.png"
    ]
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
    description: "Implemented location-based campaigns for 24 restaurants, increasing in-store visits by 45% and driving a measurable lift in revenue.",
    industry: "Hospitality",
    screenshot: "/lovable-uploads/872450f0-c427-4e5a-8295-3550968a9973.png",
    additionalScreenshots: [
      "/lovable-uploads/9063f5c0-17c4-4a9f-a1a4-91d1e4793e85.png",
      "/lovable-uploads/ebe75d66-8891-465f-8f49-812477d03dac.png"
    ]
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
    description: "Restructured search and display campaigns with advanced audience targeting, increasing booking conversion rates by 57%.",
    industry: "Travel",
    screenshot: "/lovable-uploads/3078aa85-a337-44b4-87c8-97da41d33656.png",
    additionalScreenshots: [
      "/lovable-uploads/674d2167-6a40-4f1c-92ef-12fca8456a21.png",
      "/lovable-uploads/f57ede24-91e3-4267-acf6-a7492dae4b16.png"
    ]
  }
];
