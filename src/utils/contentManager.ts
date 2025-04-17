
// Content management utility to save and retrieve edited content

// Define types for each section content
export interface HeroContent {
  heading: string;
  subheading: string;
  ctaText: string;
  stats: {
    roasValue: string;
    performancePercentage: string;
    cpcValue: string;
    cpcBenchmark: string;
    impressions: string;
    ctr: string;
    convRate: string;
  }
}

export interface AboutContent {
  heading: string;
  description: string;
  personalDescription: string;
  stats: {
    yearsExperience: string;
    countriesServed: string;
    platformsMastered: string;
    ordersGenerated: string;
  }
}

export interface PortfolioContent {
  heading: string;
  description: string;
  galleryHeading: string;
  galleryDescription: string;
}

export interface ContactContent {
  heading: string;
  description: string;
}

export interface FooterContent {
  companyName: string;
  companyDescription: string;
  email: string;
  whatsAppLink: string;
  workingHours: string;
  linkedinUrl: string;
  whatsappUrl: string;
}

// Get initial default values
const getDefaultHeroContent = (): HeroContent => ({
  heading: "Transform Your Online Presence with Strategic Media Buying",
  subheading: "Data-driven marketing campaigns that maximize ROI across all major platforms. Let me handle your ad spend while you focus on scaling your business.",
  ctaText: "Book a Strategy Call",
  stats: {
    roasValue: "8x+",
    performancePercentage: "88",
    cpcValue: "1.18",
    cpcBenchmark: "24",
    impressions: "10.5M",
    ctr: "3.8",
    convRate: "8.5"
  }
});

const getDefaultAboutContent = (): AboutContent => ({
  heading: "Delivering Data-Driven Media Buying Excellence",
  description: "Senior Media Buyer with over 5 years of experience optimizing paid media campaigns across platforms like Meta, LinkedIn, TikTok, Snapchat, Twitter, and Google Ads, driving growth and engagement across diverse industries.",
  personalDescription: "I combine deep analytical expertise with creative thinking to craft media buying strategies that maximize ROI and deliver measurable business results across diverse industries in over 10 countries.",
  stats: {
    yearsExperience: "5+",
    countriesServed: "10+",
    platformsMastered: "6+",
    ordersGenerated: "90K+"
  }
});

const getDefaultPortfolioContent = (): PortfolioContent => ({
  heading: "Recent Case Studies",
  description: "Explore some of my most successful media buying campaigns and the results they've achieved for clients across industries.",
  galleryHeading: "Ad Campaign Showcase",
  galleryDescription: "Browse our portfolio of successful ad campaigns across various industries and platforms. Each screenshot demonstrates our approach to creating engaging, high-converting ads."
});

const getDefaultContactContent = (): ContactContent => ({
  heading: "Let's Discuss Your Next Campaign",
  description: "Ready to maximize your ROAS and scale your business? Get in touch to discuss how I can help you achieve your advertising goals."
});

const getDefaultFooterContent = (): FooterContent => ({
  companyName: "Media Mojo",
  companyDescription: "Strategic media buying for businesses seeking exceptional results and maximum ROI.",
  email: "mhmd167ali@gmail.com",
  whatsAppLink: "https://wa.me/+201060098267",
  workingHours: "Sunday - Thursday: 9am - 5pm",
  linkedinUrl: "https://www.linkedin.com/in/mhmdali02/",
  whatsappUrl: "https://wa.me/+201060098267"
});

// Utility functions to save and retrieve content
export const saveHeroContent = (content: HeroContent) => {
  localStorage.setItem('heroContent', JSON.stringify(content));
};

export const getHeroContent = (): HeroContent => {
  const stored = localStorage.getItem('heroContent');
  return stored ? JSON.parse(stored) : getDefaultHeroContent();
};

export const saveAboutContent = (content: AboutContent) => {
  localStorage.setItem('aboutContent', JSON.stringify(content));
};

export const getAboutContent = (): AboutContent => {
  const stored = localStorage.getItem('aboutContent');
  return stored ? JSON.parse(stored) : getDefaultAboutContent();
};

export const savePortfolioContent = (content: PortfolioContent) => {
  localStorage.setItem('portfolioContent', JSON.stringify(content));
};

export const getPortfolioContent = (): PortfolioContent => {
  const stored = localStorage.getItem('portfolioContent');
  return stored ? JSON.parse(stored) : getDefaultPortfolioContent();
};

export const saveContactContent = (content: ContactContent) => {
  localStorage.setItem('contactContent', JSON.stringify(content));
};

export const getContactContent = (): ContactContent => {
  const stored = localStorage.getItem('contactContent');
  return stored ? JSON.parse(stored) : getDefaultContactContent();
};

export const saveFooterContent = (content: FooterContent) => {
  localStorage.setItem('footerContent', JSON.stringify(content));
};

export const getFooterContent = (): FooterContent => {
  const stored = localStorage.getItem('footerContent');
  return stored ? JSON.parse(stored) : getDefaultFooterContent();
};
