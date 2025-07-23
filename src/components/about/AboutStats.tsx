
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Globe, LayoutGrid, Award } from "lucide-react";

const AboutStats = () => {
  const stats = [
    { 
      icon: <BarChart3 className="text-media-purple h-6 w-6" />, 
      value: "6+", 
      label: "Years Experience" 
    },
    { 
      icon: <Globe className="text-media-oceanblue h-6 w-6" />, 
      value: "10+", 
      label: "Countries Served" 
    },
    { 
      icon: <LayoutGrid className="text-media-orange h-6 w-6" />, 
      value: "6+", 
      label: "Platforms Mastered" 
    },
    { 
      icon: <Award className="text-media-pink h-6 w-6" />, 
      value: "95K+", 
      label: "Orders Generated" 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="border-gray-100/50 bg-gradient-to-br from-white to-gray-50/50 hover:border-media-purple/30 transition-all duration-300 group hover:shadow-lg">
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-full -translate-y-16 translate-x-16 transform opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-media-purple to-media-oceanblue bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutStats;
