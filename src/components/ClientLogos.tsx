
import React from "react";
import { Card } from "@/components/ui/card";

const ClientLogos = () => {
  // This array will hold the client logos and details
  // You can replace the placeholder images with actual client logos once you upload them
  const clients = [
    {
      name: "AlBaraka Forum",
      industry: "Islamic Economy",
      logo: "/placeholder.svg", // Replace with actual logo path after upload
      alt: "AlBaraka Forum logo"
    },
    {
      name: "CYC Academy",
      industry: "Education",
      logo: "/placeholder.svg", // Replace with actual logo path after upload
      alt: "CYC Academy logo"
    },
    {
      name: "Tabla and Oud Lounge",
      industry: "Restaurant & Entertainment",
      logo: "/placeholder.svg", // Replace with actual logo path after upload
      alt: "Tabla and Oud Lounge logo"
    },
    {
      name: "Shawaya Albukhari",
      industry: "Restaurant",
      logo: "/placeholder.svg", // Replace with actual logo path after upload
      alt: "Shawaya Albukhari logo"
    },
    {
      name: "Business Camp Agency",
      industry: "Digital Marketing Agency",
      logo: "/placeholder.svg", // Replace with actual logo path after upload
      alt: "Business Camp Agency logo"
    },
    {
      name: "DM Solutions",
      industry: "Digital Marketing Agency",
      logo: "/placeholder.svg", // Replace with actual logo path after upload
      alt: "DM Solutions logo"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Clients I've <span className="gradient-text">Worked With</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partnering with businesses across multiple industries to deliver exceptional media buying results and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <Card 
              key={index} 
              className="p-4 flex flex-col items-center justify-center border border-gray-200 hover:border-media-purple/50 transition-all"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-3">
                <img 
                  src={client.logo} 
                  alt={client.alt} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{client.name}</p>
                <p className="text-xs text-gray-500">{client.industry}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Note: You can upload your client logos to customize this section. The logos will appear in place of the placeholders.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
