
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample channel data
const channelData = [
  { name: 'Search', conversions: 125, costPerConversion: 15 },
  { name: 'Display', conversions: 85, costPerConversion: 18 },
  { name: 'Social', conversions: 140, costPerConversion: 12 },
  { name: 'Video', conversions: 65, costPerConversion: 22 },
  { name: 'Shopping', conversions: 95, costPerConversion: 13 },
];

const ChannelPerformanceChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Channel Performance</CardTitle>
        <CardDescription>Conversion metrics by marketing channel</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={channelData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="conversions" fill="#8884d8" name="Conversions" />
            <Bar dataKey="costPerConversion" fill="#82ca9d" name="Cost Per Conversion ($)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChannelPerformanceChart;
