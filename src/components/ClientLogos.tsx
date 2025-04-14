
import React, { useState } from "react";
import { clientsData } from "@/data/clients";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ClientLogos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  // Get unique industries
  const uniqueIndustries = Array.from(
    new Set(clientsData.map((client) => client.industry))
  ).sort();

  // Filter clients based on search and selected industry
  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || client.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  // Animation variants
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white" id="clients">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Success Stories: <span className="text-media-purple">Clients I've Worked With</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Trusted by businesses across various industries for delivering exceptional campaigns.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search clients..." 
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 rounded-md border border-slate-200 bg-white"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="all">All Industries</option>
            {uniqueIndustries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Client Logos Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredClients.slice(0, 15).map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center border border-slate-100 hover:border-media-purple/30 hover:shadow-md transition-all"
            >
              {client.logo ? (
                <div className="w-full h-16 flex items-center justify-center mb-2">
                  <img 
                    src={client.logo} 
                    alt={client.alt} 
                    className="max-w-[85%] max-h-[85%] object-contain" 
                  />
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full mb-2">
                  <span className="text-slate-500 font-medium">{client.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="text-sm font-medium text-center text-slate-700 mt-2">{client.name}</h3>
              <span className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full inline-block mt-1">
                {client.industry}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View More Button (if we have more clients) */}
        {clientsData.length > 15 && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full border-media-purple text-media-purple hover:bg-media-purple/5"
            >
              View More Clients
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientLogos;
