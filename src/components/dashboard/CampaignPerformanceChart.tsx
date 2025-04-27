
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample campaign performance data
const campaignData = [
  { date: 'Jan 1', impressions: 145000, clicks: 5800, conversions: 320 },
  { date: 'Jan 8', impressions: 160000, clicks: 6200, conversions: 345 },
  { date: 'Jan 15', impressions: 175000, clicks: 6800, conversions: 378 },
  { date: 'Jan 22', impressions: 190000, clicks: 7400, conversions: 412 },
  { date: 'Jan 29', impressions: 205000, clicks: 7900, conversions: 438 },
  { date: 'Feb 5', impressions: 220000, clicks: 8400, conversions: 464 },
  { date: 'Feb 12', impressions: 235000, clicks: 8800, conversions: 490 },
  { date: 'Feb 19', impressions: 250000, clicks: 9600, conversions: 535 },
  { date: 'Feb 26', impressions: 240000, clicks: 9200, conversions: 510 },
];

const CampaignPerformanceChart = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Campaign Performance Trends</CardTitle>
        <CardDescription>Performance metrics over the past 60 days</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={campaignData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="impressions" 
              stroke="#8884d8" 
              name="Impressions"
              strokeWidth={2}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="clicks" 
              stroke="#82ca9d" 
              name="Clicks"
              strokeWidth={2}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversions" 
              stroke="#ff7300" 
              name="Conversions"
              strokeWidth={2} 
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CampaignPerformanceChart;
