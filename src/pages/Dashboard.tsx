
import React from 'react';
import { Helmet } from 'react-helmet';
import { AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from '@/components/ui/resizable';
import { trackPageView } from '@/utils/analytics';
import PerformanceMetricsGrid from '@/components/dashboard/PerformanceMetricsGrid';
import CampaignPerformanceChart from '@/components/dashboard/CampaignPerformanceChart';
import ROIAnalysisCard from '@/components/dashboard/ROIAnalysisCard';
import PlatformBreakdownChart from '@/components/dashboard/PlatformBreakdownChart';
import ChannelPerformanceChart from '@/components/dashboard/ChannelPerformanceChart';
import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    trackPageView('/dashboard', 'Media Buying Analytics Dashboard');
  }, []);

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | Media Buying Performance</title>
        <meta name="description" content="Comprehensive analytics dashboard for media buying campaign performance tracking and optimization." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Media Buying Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and optimize your campaign performance across all platforms</p>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="mb-8">
              <PerformanceMetricsGrid />
            </div>

            <ResizablePanelGroup direction="horizontal" className="min-h-[500px] rounded-lg border">
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <CampaignPerformanceChart />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <ROIAnalysisCard />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <PlatformBreakdownChart />
              <ChannelPerformanceChart />
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Detailed breakdown of all active and past campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Campaign-specific analytics will be displayed here</p>
                {/* We'll implement this in the next iteration */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Performance data across different advertising platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Platform-specific analytics will be displayed here</p>
                {/* We'll implement this in the next iteration */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels">
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Detailed metrics for each marketing channel</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Channel-specific analytics will be displayed here</p>
                {/* We'll implement this in the next iteration */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
