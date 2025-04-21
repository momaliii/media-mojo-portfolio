// Define the type for metrics
export interface CaseStudyMetric {
  label: string;
  value: string;
}

// Define the type for case studies
export interface CaseStudy {
  title: string;
  category: string;
  client: string;
  platforms?: string[];
  metrics: CaseStudyMetric[];
  description: string;
  industry?: string;
  screenshot?: string;
  additionalScreenshots?: string[];
}

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    title: "Cosmetics E-commerce Growth",
    category: "e-commerce",
    client: "Cosmetics E-commerce",
    platforms: ["Meta", "TikTok"],
    metrics: [
      { label: "Orders", value: "95,000+ orders, 8x+ ROAS" }
    ],
    description: "Managed campaigns for a cosmetics brand, achieving over 95,000 orders with ROAS exceeding 8x through LightFunnel and Easy Order integration.",
    industry: "Beauty & Cosmetics",
    screenshot: "/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png"
  },
  {
    title: "AlBaraka Forum Events",
    category: "b2b",
    client: "AlBaraka Forum",
    platforms: ["LinkedIn", "Meta"],
    metrics: [
      { label: "Budget", value: "$15K+ budget per event" }
    ],
    description: "Managed digital campaigns for Islamic economy events across London, Saudi Arabia, and Pakistan.",
    industry: "Finance",
    screenshot: "/lovable-uploads/9346e7a4-3664-492a-89e0-04c47bbf435b.png"
  },
  {
    title: "Restaurant Chain Growth",
    category: "local",
    client: "Shawaya Albukhari",
    platforms: ["Meta", "Google Ads", "Snapchat"],
    metrics: [
      { label: "Budget", value: "15K-35K SAR monthly budget" }
    ],
    description: "Developed paid media campaigns for Saudi restaurant chain across 3 branches, optimizing for local traffic.",
    industry: "Restaurant",
    screenshot: "/lovable-uploads/872450f0-c427-4e5a-8295-3550968a9973.png"
  },
  {
    title: "Entertainment Venue Marketing",
    category: "branding",
    client: "Tabla and Oud Lounge",
    metrics: [
      { label: "Budget", value: "35K SAR" },
      { label: "Events", value: "10+" },
      { label: "ROI", value: "+180%" }
    ],
    description: "Developed and executed high-impact campaigns for exclusive events and concerts, including performances by renowned artists like Hamada Helal.",
    industry: "Entertainment",
    screenshot: "/lovable-uploads/a11917a6-704a-4ada-ba26-40899ba98b37.png"
  },
  {
    title: "Education Platform Launch",
    category: "b2b",
    client: "CYC Academy",
    metrics: [
      { label: "Leads", value: "500+" },
      { label: "CPA", value: "-45%" },
      { label: "Growth", value: "+200%" }
    ],
    description: "Co-founded and led media buying strategy, focusing on lead generation and cost-per-acquisition optimization across multiple platforms.",
    industry: "Education",
    screenshot: "/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png"
  }
];
