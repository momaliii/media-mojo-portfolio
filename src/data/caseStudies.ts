// Define the type for metrics
export interface CaseStudyMetric {
  label: string;
  value: string;
}

// Define the type for case studies
export interface CaseStudy {
  slug?: string;
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
  challenge?: string;
  strategy?: string;
  results?: string;
  tools?: string[];
}

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    title: "Beauty Brand E-commerce Success",
    category: "e-commerce",
    client: "Premium Cosmetics Brand",
    metrics: [
      { label: "Orders", value: "95K+" },
      { label: "ROAS", value: "8x+" },
      { label: "Duration", value: "2024" }
    ],
    description: "Led a highly successful e-commerce campaign using LightFunnel and Easy Order, achieving exceptional results through strategic messaging and optimization.",
    industry: "Beauty & Cosmetics",
    screenshot: "/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png",
    challenge: "Scale e-commerce operations while maintaining profitability and optimizing customer acquisition costs across multiple product lines.",
    strategy: "Implemented advanced funnel optimization with LightFunnel, A/B tested creative messaging, and leveraged dynamic product ads with retargeting strategies.",
    results: "Achieved 8x+ ROAS with 95K+ orders generated, significantly reducing CPA while scaling ad spend efficiently across Meta and TikTok platforms.",
    tools: ["LightFunnel", "Easy Order", "Meta Ads Manager", "TikTok Ads"]
  },
  {
    title: "Islamic Economy Events",
    category: "ngo",
    client: "International Economic Forum",
    metrics: [
      { label: "Budget", value: "$15K+" },
      { label: "Reach", value: "3+" },
      { label: "Countries", value: "Global" }
    ],
    description: "Managed digital campaigns for major Islamic economy events across London, Saudi Arabia, and Pakistan, driving international engagement and attendance.",
    industry: "Finance",
    screenshot: "/lovable-uploads/9346e7a4-3664-492a-89e0-04c47bbf435b.png",
    challenge: "Drive international attendance for multi-location events with diverse cultural audiences and varying digital adoption rates.",
    strategy: "Developed geo-targeted campaigns for each event location, created culturally relevant creative content, and implemented multi-language ad sets with localized messaging.",
    results: "Successfully promoted events across 3+ countries with optimized reach and engagement, achieving strong attendance rates and international brand recognition.",
    tools: ["Meta Ads", "LinkedIn Ads", "Google Ads"]
  },
  {
    title: "Restaurant Chain Growth",
    category: "f&b",
    client: "Premium Restaurant Chain",
    metrics: [
      { label: "Branches", value: "3" },
      { label: "Engagement", value: "+75%" },
      { label: "Growth", value: "+120%" }
    ],
    description: "Implemented targeted advertising strategies across multiple branches, significantly improving customer acquisition and engagement rates.",
    industry: "Restaurant",
    screenshot: "/lovable-uploads/872450f0-c427-4e5a-8295-3550968a9973.png",
    challenge: "Increase foot traffic and brand awareness across multiple restaurant locations while maintaining consistent brand messaging and optimizing local targeting.",
    strategy: "Created location-specific ad campaigns with geo-targeting, implemented dynamic menu promotions, and leveraged user-generated content to build social proof.",
    results: "Achieved 75% increase in engagement and 120% growth in customer acquisition across all branches, with improved cost per acquisition and higher repeat visit rates.",
    tools: ["Meta Ads", "Instagram Ads", "Google Local Ads"]
  },
  {
    title: "Entertainment Venue Marketing",
    category: "branding",
    client: "Premium Entertainment Venue",
    metrics: [
      { label: "Budget", value: "35K SAR" },
      { label: "Events", value: "10+" },
      { label: "ROI", value: "+180%" }
    ],
    description: "Developed and executed high-impact campaigns for exclusive events and concerts, including performances by renowned artists.",
    industry: "Entertainment",
    screenshot: "/lovable-uploads/a11917a6-704a-4ada-ba26-40899ba98b37.png",
    challenge: "Drive ticket sales for premium entertainment events with limited-time promotions and high-value target audiences.",
    strategy: "Created event-specific campaigns with countdown timers, leveraged influencer partnerships, and implemented lookalike audiences based on previous event attendees.",
    results: "Successfully promoted 10+ events with 180% ROI, achieving strong ticket sales and building a loyal customer base for recurring events.",
    tools: ["Meta Ads", "Instagram Ads", "Snapchat Ads"]
  },
  {
    title: "Multi-Brand F&B Expansion",
    category: "f&b",
    client: "Fasela Agency",
    metrics: [
      { label: "Branches", value: "80+" },
      { label: "Countries", value: "3" },
      { label: "Sales Growth", value: "+25%" },
      { label: "Monthly Budget", value: "$25K+" }
    ],
    description: "Managed comprehensive digital marketing campaigns for three major F&B brands: Smoothie Paradise (80+ branches across Egypt, Oman, and Saudi Arabia), Miso Sushi (Egypt), and Tatis (Oman). Achieved over 25% sales increase across all brands within 3 months through strategic media buying and targeted advertising.",
    industry: "Food & Beverage",
    screenshot: "/lovable-uploads/f00d5f5c8f07.png",
    additionalScreenshots: [
      "/lovable-uploads/smoothie-paradise-logo.png",
      "/lovable-uploads/miso-sushi-logo.png", 
      "/lovable-uploads/tatis-logo.png"
    ],
    budgetRange: "high",
    platforms: ["facebook", "instagram", "snapchat", "tiktok"]
  },
  {
    title: "Education Platform Launch",
    category: "b2b",
    client: "CYC Academy",
    metrics: [
      { label: "Leads", value: "10K+" },
      { label: "CPA", value: "-45%" },
      { label: "Growth", value: "+200%" }
    ],
    description: "Co-founded and led media buying strategy for an innovative HR education platform. Focused on lead generation optimization and cost-efficient student acquisition across digital channels. Successfully promoted specialized courses including HR Excel and HR Management programs.",
    industry: "Education",
    screenshot: "/lovable-uploads/72505037-b6fe-441a-a01b-d513f63c5fb7.png",
    additionalScreenshots: ["/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png"],
    budgetRange: "medium",
    platforms: ["facebook", "instagram", "linkedin"]
  },
  {
    title: "Smart Home Solutions",
    category: "branding",
    client: "NexGen Egypt",
    metrics: [
      { label: "Projects", value: "200+" },
      { label: "Engagement", value: "+150%" },
      { label: "Lead Growth", value: "+180%" }
    ],
    description: "Developed comprehensive digital marketing strategy for Egypt's leading smart home automation company. Promoted smart home solutions for apartments, villas, and duplexes, targeting premium residential market segments with innovative campaigns.",
    industry: "Technology & Real Estate",
    budgetRange: "high",
    platforms: ["facebook", "instagram", "linkedin", "google"]
  },
  {
    title: "Multi-Branch Restaurant Expansion",
    category: "f&b",
    client: "Kokh Al Moneh",
    metrics: [
      { label: "Branches", value: "7+" },
      { label: "Countries", value: "2" },
      { label: "Sales Growth", value: "+85%" }
    ],
    description: "Managed large-scale digital campaigns for premium restaurant chain with 7+ branches across Jordan and Saudi Arabia. Implemented location-based targeting strategies and seasonal promotions to drive foot traffic and increase brand awareness in both markets.",
    industry: "Food & Beverage",
    budgetRange: "high",
    platforms: ["facebook", "instagram", "snapchat", "google"]
  },
  {
    title: "Premium Education Academy Growth",
    category: "b2b",
    client: "Muscat Foundation Academy (MFA)",
    metrics: [
      { label: "Enrollments", value: "+120%" },
      { label: "Brand Awareness", value: "+200%" },
      { label: "Engagement", value: "+165%" }
    ],
    description: "Led digital transformation for Oman's leading educational institution offering world-class education experience. Developed targeted campaigns to position MFA as the premier choice for the Omani community, focusing on quality education and community values.",
    industry: "Education",
    budgetRange: "high",
    platforms: ["facebook", "instagram", "linkedin", "google"]
  },
  {
    title: "Strategic Consulting Services",
    category: "b2b",
    client: "الكيان الأمثل للاستشارات",
    metrics: [
      { label: "Lead Quality", value: "+175%" },
      { label: "Client Acquisition", value: "+140%" },
      { label: "ROI", value: "12x" }
    ],
    description: "Executed sophisticated B2B marketing campaigns for Saudi Arabia's premier consulting firm specializing in feasibility studies, environmental consulting, financial advisory, and project structuring. Targeted entrepreneurs and investors across the Kingdom and internationally with multi-channel strategies.",
    industry: "Consulting & Advisory",
    budgetRange: "high",
    platforms: ["linkedin", "google", "facebook", "twitter"]
  }
];
