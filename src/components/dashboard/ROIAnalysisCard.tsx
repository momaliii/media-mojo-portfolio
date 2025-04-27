
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample ROI data
const roiData = [
  { channel: 'Facebook', roi: 780, cpa: 12 },
  { channel: 'Google', roi: 890, cpa: 15 },
  { channel: 'Instagram', roi: 690, cpa: 18 },
  { channel: 'TikTok', roi: 950, cpa: 10 },
  { channel: 'Twitter', roi: 520, cpa: 21 },
  { channel: 'LinkedIn', roi: 630, cpa: 42 },
];

const ROIAnalysisCard = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>ROI Analysis</CardTitle>
        <CardDescription>Return on investment by advertising channel</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={roiData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="channel" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="roi" 
              name="ROI (%)" 
              fill="#8884d8" 
            />
            <Bar 
              yAxisId="right"
              dataKey="cpa" 
              name="CPA ($)" 
              fill="#82ca9d" 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ROIAnalysisCard;
