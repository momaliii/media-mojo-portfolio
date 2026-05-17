
import React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const PerformanceCard = () => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all border-0 bg-white rounded-xl group hover:-translate-y-1 duration-300">
      <CardContent className="p-5 sm:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-gray-800 text-lg">Performance</h3>
          <motion.div 
            className="p-2 rounded-full bg-green-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp size={20} className="text-green-600" />
          </motion.div>
        </div>
        
        <div className="mt-3">
          <Progress value={88} className="h-3 bg-gray-100 overflow-hidden" />
          
          <div className="mt-3 flex justify-between text-sm text-gray-500">
            <span>0%</span>
            <span className="font-semibold text-gray-800">88%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-100">
          <motion.p 
            className="text-base font-semibold text-gray-800"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            ROAS 8x+
          </motion.p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
