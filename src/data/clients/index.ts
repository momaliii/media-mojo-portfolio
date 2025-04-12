
import { Client } from "./types";
import { foodAndRestaurantClients } from "./food-and-restaurant";
import { technologyClients } from "./technology";
import { marketingAndDigitalClients } from "./marketing-and-digital";
import { educationClients } from "./education";
import { fashionAndDesignClients } from "./fashion-and-design";
import { healthcareClients } from "./healthcare";
import { constructionAndRealEstateClients } from "./construction-and-real-estate";
import { furnitureAndHomeClients } from "./furniture-and-home";
import { miscClients } from "./misc";

// Combine all client data
export const clientsData: Client[] = [
  ...foodAndRestaurantClients,
  ...technologyClients,
  ...marketingAndDigitalClients,
  ...educationClients,
  ...fashionAndDesignClients,
  ...healthcareClients,
  ...constructionAndRealEstateClients,
  ...furnitureAndHomeClients,
  ...miscClients
];

// Export for direct access if needed
export {
  foodAndRestaurantClients,
  technologyClients,
  marketingAndDigitalClients,
  educationClients,
  fashionAndDesignClients,
  healthcareClients,
  constructionAndRealEstateClients,
  furnitureAndHomeClients,
  miscClients
};

// Re-export the Client interface with the correct syntax for isolatedModules
export type { Client };
