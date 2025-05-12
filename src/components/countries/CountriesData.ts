
interface Country {
  name: string;
  region: string;
  flag: string;
  note?: string;
}

export const countriesData: Country[] = [
  {
    name: "United States",
    region: "North America",
    flag: "🇺🇸",
    note: "Primary market for tech and SaaS campaigns"
  },
  {
    name: "United Kingdom",
    region: "Europe",
    flag: "🇬🇧",
    note: "Key market for finance and ecommerce"
  },
  {
    name: "Canada",
    region: "North America",
    flag: "🇨🇦",
    note: "Growing market for service-based businesses"
  },
  {
    name: "Australia",
    region: "Oceania",
    flag: "🇦🇺",
    note: "Strong performance in lifestyle and retail"
  },
  {
    name: "Germany",
    region: "Europe",
    flag: "🇩🇪",
    note: "Focused on precision engineering and B2B"
  },
  {
    name: "France",
    region: "Europe",
    flag: "🇫🇷",
    note: "Luxury and premium brand campaigns"
  },
  {
    name: "United Arab Emirates",
    region: "Middle East",
    flag: "🇦🇪",
    note: "Luxury and high-end services"
  },
  {
    name: "Singapore",
    region: "Asia",
    flag: "🇸🇬",
    note: "Tech and financial services hub"
  },
  {
    name: "Saudi Arabia",
    region: "Middle East",
    flag: "🇸🇦",
    note: "Emerging market for digital campaigns"
  },
  {
    name: "India",
    region: "Asia",
    flag: "🇮🇳",
    note: "Fast-growing market across sectors"
  },
  {
    name: "Japan",
    region: "Asia",
    flag: "🇯🇵",
    note: "Specialized technology campaigns"
  },
  {
    name: "Brazil",
    region: "South America",
    flag: "🇧🇷",
    note: "Emerging ecommerce opportunities"
  }
];

export const regionColors: Record<string, string> = {
  "North America": "bg-media-purple/20 text-media-purple dark:bg-media-purple/30 dark:text-media-blue",
  "Europe": "bg-media-oceanblue/20 text-media-oceanblue dark:bg-media-oceanblue/30 dark:text-media-blue",
  "Asia": "bg-media-pink/20 text-media-pink dark:bg-media-pink/30 dark:text-media-blue",
  "Middle East": "bg-media-orange/20 text-media-orange dark:bg-media-orange/30 dark:text-media-blue",
  "Oceania": "bg-teal-500/20 text-teal-600 dark:bg-teal-500/30 dark:text-teal-300",
  "South America": "bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-300"
};

export const regionStats = {
  "North America": { campaigns: 250, clients: 45, conversionRate: "+18%" },
  "Europe": { campaigns: 180, clients: 32, conversionRate: "+15%" },
  "Asia": { campaigns: 120, clients: 21, conversionRate: "+22%" },
  "Middle East": { campaigns: 85, clients: 15, conversionRate: "+25%" },
  "Oceania": { campaigns: 70, clients: 12, conversionRate: "+17%" },
  "South America": { campaigns: 45, clients: 8, conversionRate: "+20%" }
};
