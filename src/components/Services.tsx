
import React from "react";
import ExpertServices from "@/components/services/ExpertServices";
import RegularServices from "@/components/services/RegularServices";

const Services = () => {
  return (
    <section id="services" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Expert Media Buying Solutions Section */}
        <ExpertServices />
        
        {/* Regular Services Section */}
        <div className="mt-24">
          <RegularServices />
        </div>
      </div>
    </section>
  );
};

export default Services;
