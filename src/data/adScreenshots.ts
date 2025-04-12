
// Define types for ad screenshots
export interface AdScreenshot {
  url: string;
  industry: string;
  client: string;
  platform?: "LinkedIn" | "Facebook" | "Instagram";
  details?: string;
}

// Ad screenshots data
export const adCampaignScreenshots: AdScreenshot[] = [
  {
    url: "/lovable-uploads/156fb6fb-7127-4fc4-958a-cc7f67e44deb.png",
    industry: "Fashion",
    client: "eCommerce Store"
  },
  {
    url: "/lovable-uploads/8a21f5c2-80de-458b-b6de-a6a618ee43b7.png",
    industry: "Fashion",
    client: "Clothing Brand"
  },
  {
    url: "/lovable-uploads/26e6f270-fff7-432d-9153-8a8fd986c69c.png",
    industry: "Cosmetics",
    client: "Beauty Products"
  },
  {
    url: "/lovable-uploads/92ae0ae7-b223-4d17-aceb-c8c87dbbe638.png",
    industry: "Cosmetics",
    client: "Makeup Brand"
  },
  {
    url: "/lovable-uploads/2b19e181-a080-4cc8-9219-3086a5edd17c.png",
    industry: "Cosmetics",
    client: "Lip Products"
  },
  {
    url: "/lovable-uploads/c8259e43-59cb-4ab5-a015-c4bd4f607f1f.png",
    industry: "Cosmetics",
    client: "Sunblock Products"
  },
  {
    url: "/lovable-uploads/b9ffe7b8-a319-4b45-aece-468ae716143f.png",
    industry: "Cosmetics",
    client: "EGP7.76M Revenue Campaign"
  },
  {
    url: "/lovable-uploads/e4ec0de3-17ba-4f2f-924d-68ea4a22a583.png",
    industry: "Travel",
    client: "Qatar Airways - $54.4K Campaign"
  },
  {
    url: "/lovable-uploads/5f84f179-a69a-4009-93ba-78dd559a2d50.png",
    industry: "Travel",
    client: "Dinner Cruise Promotions"
  },
  {
    url: "/lovable-uploads/dd8439eb-83f8-4dc7-b4a8-40039aa7ba3c.png",
    industry: "Travel",
    client: "Doha Experience Tours"
  },
  {
    url: "/lovable-uploads/c231d3ec-eed2-424d-bd7c-95aa7879f8e7.png",
    industry: "Travel",
    client: "Seasonal Travel Campaigns"
  },
  {
    url: "/lovable-uploads/46ec591e-912f-44bb-8a0b-ead1a8921beb.png",
    industry: "F&B",
    client: "Saudi Restaurant - $10.7K Campaign"
  },
  {
    url: "/lovable-uploads/b44109e4-19fc-4d1a-89e0-9374e494ab0d.png",
    industry: "F&B",
    client: "Saudi F&B - 36K Impressions"
  },
  {
    url: "/lovable-uploads/5804f258-db97-4d23-b780-67b64f60d4cd.png",
    industry: "F&B",
    client: "Saudi Restaurant Chain - $1.4K Campaign"
  },
  {
    url: "/lovable-uploads/19e88bed-b62d-4d8a-9686-d0f95c5873c7.png",
    industry: "F&B",
    client: "Saudi F&B - ROI Optimization"
  },
  {
    url: "/lovable-uploads/a11917a6-704a-4ada-ba26-40899ba98b37.png",
    industry: "Non-Profit",
    client: "Saudi NGO Campaign",
    platform: "LinkedIn",
    details: "$36.7K Total Spend"
  },
  {
    url: "/lovable-uploads/d07ff1b1-0451-4b63-9122-a1547f3ab4eb.png",
    industry: "Non-Profit",
    client: "Global Outreach - Turkey",
    platform: "LinkedIn",
    details: "$1.6K Spent | 0.49% CTR"
  },
  {
    url: "/lovable-uploads/ea7c2b4d-8851-4c25-b5e6-7f33a0471af4.png",
    industry: "Non-Profit",
    client: "Middle East Engagement",
    platform: "LinkedIn",
    details: "3.54% CTR | $0.32 CPC"
  }
];
