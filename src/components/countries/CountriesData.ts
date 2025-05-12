
interface Country {
  name: string;
  region: string;
  flag: string;
  note?: string;
}

export const countriesData: Country[] = [
  {
    name: "Saudi Arabia",
    region: "Middle East",
    flag: "🇸🇦",
    note: "Emerging market for digital campaigns"
  },
  {
    name: "Egypt",
    region: "Middle East",
    flag: "🇪🇬",
    note: "Growing digital advertising market"
  },
  {
    name: "UAE",
    region: "Middle East",
    flag: "🇦🇪",
    note: "Luxury and high-end services"
  },
  {
    name: "Kuwait",
    region: "Middle East",
    flag: "🇰🇼",
    note: "Premium consumer market"
  },
  {
    name: "Qatar",
    region: "Middle East",
    flag: "🇶🇦",
    note: "High-value luxury campaigns"
  },
  {
    name: "Turkey",
    region: "Middle East",
    flag: "🇹🇷",
    note: "Bridging European and Middle Eastern markets"
  },
  {
    name: "China",
    region: "Asia",
    flag: "🇨🇳",
    note: "Large-scale ecommerce opportunities"
  },
  {
    name: "UK",
    region: "Europe",
    flag: "🇬🇧",
    note: "Key market for finance and ecommerce"
  },
  {
    name: "Libya",
    region: "Middle East",
    flag: "🇱🇾",
    note: "Developing market with growth potential"
  },
  {
    name: "U.S.",
    region: "North America",
    flag: "🇺🇸",
    note: "Primary market for tech and SaaS campaigns"
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
