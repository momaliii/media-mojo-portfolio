
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, MousePointerClick, Target } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const PerformanceMetricsGrid = () => {
  // Track when user interacts with metrics
  const handleMetricClick = (metricName: string) => {
    trackEvent('dashboard_metric_click', { metric_name: metricName });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleMetricClick('ROAS')}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">ROAS</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8.2x</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500">↑12%</span> vs last month
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleMetricClick('CPC')}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">CPC</CardTitle>
          <MousePointerClick className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1.12</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500">↓8%</span> vs last month
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleMetricClick('Conversion Rate')}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <Target className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.8%</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500">↑2.5%</span> vs last month
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => handleMetricClick('Total Spend')}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$42,589</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-red-500">↑18%</span> vs last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetricsGrid;
