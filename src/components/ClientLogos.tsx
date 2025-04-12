
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
    },
    {
      name: "Zakia Bagel Café",
      industry: "Food & Beverage",
      logo: "/lovable-uploads/5f72acce-6939-4407-a442-6aff6a48d019.png", 
      alt: "Zakia Bagel Café logo"
    },
    {
      name: "Hayah",
      industry: "Healthcare",
      logo: "/lovable-uploads/d2081756-59bf-4858-a77d-c4038c6f6c8c.png", 
      alt: "Hayah logo"
    },
    {
      name: "JORE Store",
      industry: "Retail",
      logo: "/lovable-uploads/f356bae6-c774-492b-91c7-77be0f1086e1.png", 
      alt: "JORE Store logo"
    },
    {
      name: "Imperial Dental Clinic",
      industry: "Healthcare",
      logo: "/lovable-uploads/ff3cd5e7-578b-4c18-ba7f-e66aae487f95.png", 
      alt: "Imperial Dental Clinic logo"
    },
    {
      name: "Lava Mattress & Furniture",
      industry: "Furniture & Home",
      logo: "/lovable-uploads/ebe75d66-8891-465f-8f49-812477d03dac.png", 
      alt: "Lava Mattress & Furniture logo"
    },
    {
      name: "Makeen & Raseen Law Firm",
      industry: "Legal Services",
      logo: "/lovable-uploads/ac48a933-56ae-401f-88f7-8242104e7dd5.png", 
      alt: "Makeen & Raseen Law Firm logo"
    },
    {
      name: "Mansour Furniture",
      industry: "Furniture & Home",
      logo: "/lovable-uploads/39d0e0ca-8542-4824-8013-3971ec999a22.png", 
      alt: "Mansour Furniture logo"
    },
    {
      name: "Maximus",
      industry: "Construction",
      logo: "/lovable-uploads/ea4c93fe-7cf8-48e5-a8fc-085b8ff57833.png", 
      alt: "Maximus logo"
    },
    {
      name: "MD By Dina Kadry",
      industry: "Fashion & Design",
      logo: "/lovable-uploads/90b6f75c-5af3-4d14-a7c7-97fdd4de046b.png", 
      alt: "MD By Dina Kadry logo"
    },
    {
      name: "Nagwa Alhaw Fashion Designer",
      industry: "Fashion & Design",
      logo: "/lovable-uploads/75a4b4c5-2ee2-4ea8-808a-145ba7559879.png", 
      alt: "Nagwa Alhaw Fashion Designer logo"
    },
    {
      name: "National Cruise",
      industry: "Travel & Tourism",
      logo: "/lovable-uploads/0d49ecc4-44a8-4377-97ee-82dcddd3e476.png", 
      alt: "National Cruise logo"
    },
    {
      name: "One All Digital Marketing",
      industry: "Digital Marketing Agency",
      logo: "/lovable-uploads/91961d95-a4b9-46ea-9f22-c25734d958ff.png", 
      alt: "One All Digital Marketing logo"
    },
    {
      name: "ReRim",
      industry: "Fashion & Design",
      logo: "/lovable-uploads/32188649-e4db-4d7a-b87f-25dd2c22a7b8.png", 
      alt: "ReRim logo"
    },
    {
      name: "The Moustache",
      industry: "Fashion & Grooming",
      logo: "/lovable-uploads/4adb96a2-fa10-4ca9-ab89-47e477a337b2.png", 
      alt: "The Moustache logo"
    },
    {
      name: "ThermaFlow",
      industry: "Clean Air Solutions",
      logo: "/lovable-uploads/b80727b7-66d8-4763-a17a-87ae06ce9ea1.png", 
      alt: "ThermaFlow logo"
    },
    {
      name: "Unimed Prime",
      industry: "Healthcare",
      logo: "/lovable-uploads/f57ede24-91e3-4267-acf6-a7492dae4b16.png", 
      alt: "Unimed Prime logo"
    },
    {
      name: "UVAS",
      industry: "Technology",
      logo: "/lovable-uploads/9635afa6-4771-41df-b9d6-37ce4da07275.png", 
      alt: "UVAS logo"
    },
    {
      name: "Velato Egypt",
      industry: "Fashion & Style",
      logo: "/lovable-uploads/c1b6c3d3-7347-4bc1-8da0-607ba8771784.png", 
      alt: "Velato Egypt logo"
    },
    {
      name: "WENT",
      industry: "Digital Services",
      logo: "/lovable-uploads/6fd01691-4155-4bed-a275-c0d34e018c17.png", 
      alt: "WENT logo"
    },
    {
      name: "YUCCA Fashion",
      industry: "Fashion & Design Courses",
      logo: "/lovable-uploads/ebcefa09-62bf-4d57-aece-498da3c3197d.png", 
      alt: "YUCCA Fashion logo"
    },
    // New client logos from recent uploads
    {
      name: "Mashawi AlDeira",
      industry: "Restaurant",
      logo: "/lovable-uploads/ab72b0c3-1a2d-49aa-a266-48de9e13af09.png",
      alt: "Mashawi AlDeira logo"
    },
    {
      name: "AlBaraka Forum",
      industry: "Islamic Economy",
      logo: "/lovable-uploads/674d2167-6a40-4f1c-92ef-12fca8456a21.png",
      alt: "AlBaraka Forum logo"
    },
    {
      name: "Modern Suspended Ceilings",
      industry: "Construction",
      logo: "/lovable-uploads/77e77bcf-77f5-409b-8de0-e548544c58c7.png",
      alt: "Modern Suspended Ceilings logo"
    },
    {
      name: "Al Omran",
      industry: "Construction & Real Estate",
      logo: "/lovable-uploads/cbc5d1b5-721f-4e97-9dd4-b0abe510f6ca.png",
      alt: "Al Omran logo"
    },
    {
      name: "Petra Kitchens",
      industry: "Kitchen & Home",
      logo: "/lovable-uploads/064fe47f-6699-4aa9-9117-f41f5fb73078.png",
      alt: "Petra Kitchens logo"
    },
    {
      name: "Zain",
      industry: "Telecommunications",
      logo: "/lovable-uploads/f0327b2c-6e71-466a-95d8-12fadedced15.png",
      alt: "Zain logo"
    },
    {
      name: "Sebou Cart",
      industry: "Retail & E-commerce",
      logo: "/lovable-uploads/483619f5-996e-441e-acfc-abbcdcb9a7b6.png",
      alt: "Sebou Cart logo"
    },
    {
      name: "Al-Almia",
      industry: "Manufacturing",
      logo: "/lovable-uploads/9346e7a4-3664-492a-89e0-04c47bbf435b.png",
      alt: "Al-Almia logo"
    },
    {
      name: "Alfa Group",
      industry: "Business & Investment",
      logo: "/lovable-uploads/282b121d-7a15-460b-9496-e04ae979bea4.png",
      alt: "Alfa Group logo"
    },
    {
      name: "Borha Store",
      industry: "Retail",
      logo: "/lovable-uploads/97391abb-a9fa-43d6-9fc6-6384e00fc85f.png",
      alt: "Borha Store logo"
    },
    {
      name: "Baby Snafer",
      industry: "Baby Products",
      logo: "/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png",
      alt: "Baby Snafer logo"
    },
    {
      name: "Merhaba",
      industry: "Services",
      logo: "/lovable-uploads/fd652819-54ef-4faf-9f18-e4e8a9545f30.png",
      alt: "Merhaba logo"
    },
    {
      name: "Decorama",
      industry: "Interior Design",
      logo: "/lovable-uploads/66bc4854-9bfe-40ca-96f8-55d2cdd7f3e5.png",
      alt: "Decorama logo"
    },
    {
      name: "Bab Al Omda Furniture",
      industry: "Furniture",
      logo: "/lovable-uploads/d29a683b-6d60-437b-8506-ce6d5683a300.png",
      alt: "Bab Al Omda Furniture logo"
    },
    {
      name: "Almasria Steel",
      industry: "Manufacturing & Industry",
      logo: "/lovable-uploads/97d6b1dd-bd01-420f-857d-b18eae7dbd5d.png",
      alt: "Almasria Steel logo"
    },
    {
      name: "Bukhari Chicken",
      industry: "Restaurant & Food",
      logo: "/lovable-uploads/75cd841a-2575-4247-997b-df4334a23211.png",
      alt: "Bukhari Chicken logo"
    },
    {
      name: "Tabla and Oud Restaurant",
      industry: "Restaurant & Entertainment",
      logo: "/lovable-uploads/a5522709-399c-4526-a8c3-27c989b6a4b0.png",
      alt: "Tabla and Oud Restaurant logo"
    },
    {
      name: "MAS Mattresses",
      industry: "Furniture & Bedding",
      logo: "/lovable-uploads/b2f7bf86-8ae2-4019-8a6a-e360aa8f18d9.png",
      alt: "MAS Mattresses logo"
    },
    {
      name: "Karma Marketing Agency",
      industry: "Marketing & Advertising",
      logo: "/lovable-uploads/64c102de-0d99-4fd5-8306-3f34cc9a99cb.png",
      alt: "Karma Marketing Agency logo"
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
