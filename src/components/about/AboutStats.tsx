
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="relative border border-gray-200/60 dark:border-gray-800/60 bg-gradient-to-br from-white via-white to-gray-50/60 dark:from-gray-900/60 dark:via-gray-900/40 dark:to-gray-950/60 hover:border-media-purple/40 hover:-translate-y-1 transition-all duration-500 group hover:shadow-[0_20px_50px_-20px_rgba(124,58,237,0.35)] rounded-2xl overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-media-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-media-purple/5 to-transparent rounded-full -translate-y-16 translate-x-16 transform opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="mx-auto w-14 h-14 flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow-md ring-1 ring-gray-100 dark:ring-gray-800 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-1 tracking-tight bg-gradient-to-r from-media-purple to-media-oceanblue bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium tracking-wide">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutStats;
