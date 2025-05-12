
import React, { useState } from "react";
import { countriesData, regionColors, regionStats } from "./CountriesData";
import { ChevronRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const GlobalPresence = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  // Group countries by region
  const regions = Array.from(new Set(countriesData.map(country => country.region)));
  const countriesByRegion = regions.reduce((acc, region) => {
    acc[region] = countriesData.filter(country => country.region === region);
    return acc;
  }, {} as Record<string, typeof countriesData>);

  return (
    <section id="countries" className="relative py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-media-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-media-oceanblue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-media-pink/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Global</span> Presence
            </h2>
            <p className="text-gray-600 dark:text-gray-300 md:text-lg mb-6">
              I've managed successful campaigns across multiple countries and regions, 
              optimizing ad spend and maximizing ROI for diverse markets.
            </p>
          </motion.div>
          
          {/* Region Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap gap-2 justify-center mb-8">
              <TabsTrigger value="all" className="rounded-full">
                All Regions
              </TabsTrigger>
              {regions.map((region) => (
                <TabsTrigger key={region} value={region} className="rounded-full">
                  {region}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All regions content */}
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                {countriesData.map((country, index) => (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-4xl mb-2">{country.flag}</div>
                    <h3 className="font-medium text-sm md:text-base">{country.name}</h3>
                    <div className="mt-2">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full", regionColors[country.region])}>
                        {country.region}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Global stats section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-media-purple/10 to-media-oceanblue/10 dark:from-media-purple/20 dark:to-media-oceanblue/20 p-6 rounded-2xl"
              >
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                  <div className="text-center">
                    <Globe className="mx-auto h-8 w-8 mb-2 text-media-purple dark:text-media-blue" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Countries</p>
                    <p className="text-2xl md:text-3xl font-bold">{countriesData.length}+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Global Campaigns</p>
                    <p className="text-2xl md:text-3xl font-bold">750+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Global Clients</p>
                    <p className="text-2xl md:text-3xl font-bold">130+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Avg. ROAS</p>
                    <p className="text-2xl md:text-3xl font-bold">3.2x</p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Individual region tabs */}
            {regions.map((region) => (
              <TabsContent key={region} value={region} className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {countriesByRegion[region].map((country, index) => (
                    <motion.div
                      key={country.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="text-4xl mb-3">{country.flag}</div>
                      <h3 className="font-medium">{country.name}</h3>
                      {country.note && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{country.note}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Region specific stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={cn(
                    "p-6 rounded-2xl", 
                    region === "North America" ? "bg-media-purple/10 dark:bg-media-purple/20" :
                    region === "Europe" ? "bg-media-oceanblue/10 dark:bg-media-oceanblue/20" :
                    region === "Asia" ? "bg-media-pink/10 dark:bg-media-pink/20" :
                    region === "Middle East" ? "bg-media-orange/10 dark:bg-media-orange/20" :
                    region === "Oceania" ? "bg-teal-500/10 dark:bg-teal-500/20" :
                    "bg-amber-500/10 dark:bg-amber-500/20"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Campaigns</p>
                      <p className="text-2xl md:text-3xl font-bold">{regionStats[region].campaigns}+</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Clients</p>
                      <p className="text-2xl md:text-3xl font-bold">{regionStats[region].clients}+</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Conversion Rate</p>
                      <p className="text-2xl md:text-3xl font-bold">{regionStats[region].conversionRate}</p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 text-center">
            <Button 
              onClick={() => window.open('mailto:contact@example.com', '_blank')}
              className="bg-media-purple dark:bg-media-blue hover:bg-media-darkpurple dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              Discuss Global Campaigns <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
