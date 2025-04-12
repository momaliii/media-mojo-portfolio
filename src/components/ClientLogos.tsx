
import React from "react";
import { clientsData } from "@/data/clientsData";
import ClientCard from "./client-logos/ClientCard";
import ClientLogoSection from "./client-logos/ClientLogoSection";

const ClientLogos = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ClientLogoSection 
          title={<>Clients I've <span className="gradient-text">Worked With</span></>}
          description="Partnering with businesses across multiple industries to deliver exceptional media buying results and drive growth."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {clientsData.map((client, index) => (
            <ClientCard key={index} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
