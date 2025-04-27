
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Sample platform data
const platformData = [
  { name: 'Facebook', value: 38, color: '#4267B2' },
  { name: 'Instagram', value: 22, color: '#E1306C' },
  { name: 'Google Ads', value: 25, color: '#4285F4' },
  { name: 'TikTok', value: 10, color: '#000000' },
  { name: 'LinkedIn', value: 5, color: '#0077B5' },
];

const PlatformBreakdownChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Platform Breakdown</CardTitle>
        <CardDescription>Ad spend distribution across platforms</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {platformData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PlatformBreakdownChart;
