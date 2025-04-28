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
  metrics: CaseStudyMetric[];
  description: string;
  industry?: string;
  screenshot?: string;
  additionalScreenshots?: string[];
  budgetRange?: string;
  platforms?: string[];
}

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    title: "Beauty Brand E-commerce Success",
    category: "e-commerce",
    client: "Cosmetics E-commerce",
    metrics: [
      { label: "Orders", value: "95K+" },
      { label: "ROAS", value: "8x+" },
      { label: "Duration", value: "2024" }
    ],
    description: "Led a highly successful e-commerce campaign using LightFunnel and Easy Order, achieving exceptional results through strategic messaging and optimization.",
    industry: "Beauty & Cosmetics",
    screenshot: "/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png"
  },
  {
    title: "Islamic Economy Events",
    category: "b2b",
    client: "AlBaraka Forum",
    metrics: [
      { label: "Budget", value: "$15K+" },
      { label: "Reach", value: "3+" },
      { label: "Countries", value: "Global" }
    ],
    description: "Managed digital campaigns for major Islamic economy events across London, Saudi Arabia, and Pakistan, driving international engagement and attendance.",
    industry: "Finance",
    screenshot: "/lovable-uploads/9346e7a4-3664-492a-89e0-04c47bbf435b.png"
  },
  {
    title: "Restaurant Chain Growth",
    category: "local",
    client: "Shawaya Albukhari",
    metrics: [
      { label: "Branches", value: "3" },
      { label: "Engagement", value: "+75%" },
      { label: "Growth", value: "+120%" }
    ],
    description: "Implemented targeted advertising strategies across multiple branches, significantly improving customer acquisition and engagement rates.",
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
    description: "Co-founded and led media buying strategy for an innovative HR education platform. Focused on lead generation optimization and cost-efficient student acquisition across digital channels. Successfully promoted specialized courses including HR Excel and HR Management programs.",
    industry: "Education",
    screenshot: "/lovable-uploads/72505037-b6fe-441a-a01b-d513f63c5fb7.png",
    additionalScreenshots: ["/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png"],
    budgetRange: "medium",
    platforms: ["facebook", "instagram", "linkedin"]
  }
];
