
import React from "react";
import { clientsData } from "@/data/clientsData";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClientLogos = () => {
  // Get unique industries for tabs
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();

  // Animation variants for logos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories: <span className="gradient-text">Clients We've Partnered With</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've had the privilege of working with amazing businesses across various industries, 
            helping them achieve exceptional results through strategic media buying.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100/80 p-1 rounded-full">
              <TabsTrigger value="all" className="rounded-full px-4 py-1.5">
                All Industries
              </TabsTrigger>
              {uniqueIndustries.slice(0, 5).map((industry) => (
                <TabsTrigger 
                  key={industry} 
                  value={industry}
                  className="rounded-full px-4 py-1.5 hidden md:inline-flex"
                >
                  {industry}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {clientsData.map((client, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center justify-center aspect-square"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-full h-full flex items-center justify-center p-2">
                    {client.logo ? (
                      <img 
                        src={client.logo} 
                        alt={client.alt || client.name} 
                        className="max-w-full max-h-full object-contain" 
                      />
                    ) : (
                      <div className="w-full text-center">
                        <p className="font-medium text-gray-800">{client.name}</p>
                        <span className="text-xs text-gray-500">{client.industry}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {uniqueIndustries.map((industry) => (
            <TabsContent key={industry} value={industry} className="mt-0">
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {clientsData
                  .filter(client => client.industry === industry)
                  .map((client, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center justify-center aspect-square"
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-2">
                        {client.logo ? (
                          <img 
                            src={client.logo} 
                            alt={client.alt || client.name} 
                            className="max-w-full max-h-full object-contain" 
                          />
                        ) : (
                          <div className="w-full text-center">
                            <p className="font-medium text-gray-800">{client.name}</p>
                            <span className="text-xs text-gray-500">{client.industry}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">Want to join our success stories?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-media-purple text-white font-medium hover:bg-media-darkpurple transition-colors"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
