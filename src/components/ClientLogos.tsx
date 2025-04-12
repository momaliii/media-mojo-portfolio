
import React from "react";
import { Card } from "@/components/ui/card";

const ClientLogos = () => {
  // This array holds the client logos and details with paths to the uploaded logo images
  const clients = [
    {
      name: "AlBaraka Forum",
      industry: "Islamic Economy",
      logo: "/lovable-uploads/f1acbdac-982b-46ff-a896-2f85ec6783bf.png", 
      alt: "AlBaraka Forum logo"
    },
    {
      name: "CYC Academy",
      industry: "Education",
      logo: "/lovable-uploads/72505037-b6fe-441a-a01b-d513f63c5fb7.png", 
      alt: "CYC Academy logo"
    },
    {
      name: "Tabla and Oud Lounge",
      industry: "Restaurant & Entertainment",
      logo: "/lovable-uploads/6169f3be-4578-4251-a8d5-421bd0d12051.png", 
      alt: "Tabla and Oud Lounge logo"
    },
    {
      name: "Shawaya Albukhari",
      industry: "Restaurant",
      logo: "/lovable-uploads/b83833d3-47f4-4b0e-97e4-827595f45fa5.png", 
      alt: "Shawaya Albukhari logo"
    },
    {
      name: "Business Camp Agency",
      industry: "Digital Marketing Agency",
      logo: "/lovable-uploads/cdbd15b8-1bd5-4a28-9001-295332bfcade.png", 
      alt: "Business Camp Agency logo"
    },
    {
      name: "DM Solutions",
      industry: "Digital Marketing Agency",
      logo: "/lovable-uploads/f4afb9c5-cb9d-4638-8b89-2e56b073b76f.png", 
      alt: "DM Solutions logo"
    },
    {
      name: "Digit Hub",
      industry: "Technology",
      logo: "/lovable-uploads/47afa2ff-df8a-4648-9e04-f3b58bbafc3e.png",
      alt: "Digit Hub logo"
    },
    {
      name: "AH Together",
      industry: "Food & Beverage",
      logo: "/lovable-uploads/0c69983b-61ac-49dd-af2a-91fef89facab.png",
      alt: "AH Together logo"
    },
    {
      name: "Optimum",
      industry: "Education & Training",
      logo: "/lovable-uploads/08cf7be6-ab30-4d9b-8b8f-e72bde3f385d.png",
      alt: "Optimum logo"
    },
    {
      name: "Sports Grill Burger Bar",
      industry: "Restaurant",
      logo: "/lovable-uploads/e01c84bd-a8b8-48a6-9186-903656d9555d.png",
      alt: "Sports Grill Burger Bar logo"
    },
    {
      name: "Awlad Khatab",
      industry: "Food & Restaurant",
      logo: "/lovable-uploads/872450f0-c427-4e5a-8295-3550968a9973.png",
      alt: "Awlad Khatab logo"
    },
    {
      name: "Catalyst BOT",
      industry: "Technology",
      logo: "/lovable-uploads/d8ae6984-9be5-489b-9214-2e8b41122ab5.png",
      alt: "Catalyst BOT logo"
    },
    {
      name: "Champion Co.",
      industry: "Industrial Services",
      logo: "/lovable-uploads/e54132f9-74bd-47a7-93d7-fef0090403e6.png",
      alt: "Champion Co. logo"
    },
    {
      name: "Diamond Corner",
      industry: "Jewelry",
      logo: "/lovable-uploads/3078aa85-a337-44b4-87c8-97da41d33656.png",
      alt: "Diamond Corner logo"
    },
    {
      name: "Elrowad Invest",
      industry: "Finance",
      logo: "/lovable-uploads/32be120b-1476-4e15-a5bb-f8e8ce9433e5.png",
      alt: "Elrowad Invest logo"
    },
    {
      name: "EduGaming",
      industry: "Education",
      logo: "/lovable-uploads/64ee075a-5ce5-4ba9-8439-7a64a7ff4b1f.png",
      alt: "EduGaming logo"
    },
    {
      name: "Edulogia",
      industry: "Education",
      logo: "/lovable-uploads/f7493147-5b50-40c4-93bd-c2515847f0f8.png",
      alt: "Edulogia logo"
    },
    {
      name: "Qatar Airways",
      industry: "Airlines",
      logo: "/lovable-uploads/9063f5c0-17c4-4a9f-a1a4-91d1e4793e85.png",
      alt: "Qatar Airways logo"
    },
    {
      name: "Good Will Motors",
      industry: "Automotive",
      logo: "/lovable-uploads/c29e2bb4-c584-461c-9c64-1a537c5acd2c.png",
      alt: "Good Will Motors logo"
    },
    {
      name: "Eya Clean Pro",
      industry: "Cleaning Services",
      logo: "/lovable-uploads/b7ed208f-cfe3-4b04-86c7-42e1c56bd304.png", 
      alt: "Eya Clean Pro logo"
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <Card 
              key={index} 
              className="p-4 flex flex-col items-center justify-center border border-gray-200 hover:border-media-purple/50 transition-all hover:shadow-md"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-3">
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
      </div>
    </section>
  );
};

export default ClientLogos;
