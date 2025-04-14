
import React from "react";
import { clientsData } from "@/data/clients";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const ClientLogos = () => {
  // Get unique industries for tabs
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            Trusted by <span className="text-media-purple">Industry Leaders</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We've partnered with amazing businesses across various industries,
            creating successful campaigns that drive exceptional results.
          </p>
        </div>

        {/* Client Logos Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-slate-100/90 p-1.5 rounded-full h-auto flex-wrap gap-1">
              <TabsTrigger value="all" className="rounded-full px-5 py-2 text-sm">
                All Clients
              </TabsTrigger>
              {uniqueIndustries.slice(0, 5).map((industry) => (
                <TabsTrigger 
                  key={industry} 
                  value={industry}
                  className="rounded-full px-5 py-2 text-sm"
                >
                  {industry}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* All Clients Tab */}
          <TabsContent value="all" className="mt-0">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {clientsData.map((client, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full overflow-hidden border border-slate-200 hover:border-media-purple/30 transition-all duration-300 shadow-sm hover:shadow-md group">
                    <div className="p-6 h-full flex flex-col items-center justify-center">
                      {client.logo ? (
                        <div className="w-full h-32 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={client.logo} 
                            alt={client.alt} 
                            className="max-w-[80%] max-h-[80%] object-contain" 
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full mb-4">
                          <span className="text-slate-400 font-medium text-xl">{client.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="text-center mt-auto">
                        <h3 className="font-medium text-slate-800">{client.name}</h3>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full inline-block mt-2">
                          {client.industry}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Industry-specific Tabs */}
          {uniqueIndustries.map((industry) => (
            <TabsContent key={industry} value={industry} className="mt-0">
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {clientsData
                  .filter(client => client.industry === industry)
                  .map((client, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                      <Card className="h-full overflow-hidden border border-slate-200 hover:border-media-purple/30 transition-all duration-300 shadow-sm hover:shadow-md group">
                        <div className="p-6 h-full flex flex-col items-center justify-center">
                          {client.logo ? (
                            <div className="w-full h-32 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                              <img 
                                src={client.logo} 
                                alt={client.alt} 
                                className="max-w-[80%] max-h-[80%] object-contain" 
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full mb-4">
                              <span className="text-slate-400 font-medium text-xl">{client.name.charAt(0)}</span>
                            </div>
                          )}
                          <div className="text-center mt-auto">
                            <h3 className="font-medium text-slate-800">{client.name}</h3>
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full inline-block mt-2">
                              {client.industry}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-media-purple/10 to-media-blue/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-800">Ready to join our success stories?</h3>
            <p className="text-slate-600 mb-6">Let's create a tailored campaign strategy that drives results for your business.</p>
            <Button 
              size="lg"
              className="bg-media-purple hover:bg-media-darkpurple text-white rounded-full px-8"
              asChild
            >
              <a href="#contact">Start Your Campaign</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
