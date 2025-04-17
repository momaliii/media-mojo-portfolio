
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EditHero = () => {
  const { toast } = useToast();
  const [heading, setHeading] = useState<string>("Transform Your Online Presence with Strategic Media Buying");
  const [subheading, setSubheading] = useState<string>("Data-driven marketing campaigns that maximize ROI across all major platforms. Let me handle your ad spend while you focus on scaling your business.");
  const [ctaText, setCtaText] = useState<string>("Book a Strategy Call");

  const handleSave = () => {
    // In a real application, this would save to a database or API
    // For now, we'll just show a toast notification
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Hero Section</h2>
        <Button onClick={handleSave} className="bg-media-purple hover:bg-media-purple/90">
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>
            Edit the main heading, subheading, and call-to-action for the hero section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heading">Main Heading</Label>
            <Textarea
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="min-h-20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Textarea
              id="subheading"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="min-h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ctaText">CTA Button Text</Label>
            <Input
              id="ctaText"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Statistics Cards</CardTitle>
          <CardDescription>
            Edit the statistics displayed in the hero section cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="performance">
              <AccordionTrigger>Performance Card</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="roasValue">ROAS Value</Label>
                  <Input id="roasValue" defaultValue="8x+" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performancePercentage">Performance Percentage</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="performancePercentage" type="number" defaultValue="88" max="100" min="0" />
                    <span>%</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="cpc">
              <AccordionTrigger>CPC Card</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="cpcValue">CPC Value</Label>
                  <div className="flex items-center space-x-2">
                    <span>$</span>
                    <Input id="cpcValue" defaultValue="1.18" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpcBenchmark">Benchmark Comparison</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="cpcBenchmark" type="number" defaultValue="24" />
                    <span>%</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="campaign">
              <AccordionTrigger>Campaign Card</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="impressions">Impressions</Label>
                  <Input id="impressions" defaultValue="10.5M" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctr">CTR</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="ctr" defaultValue="3.8" />
                    <span>%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="convRate">Conversion Rate</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="convRate" defaultValue="8.5" />
                    <span>%</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditHero;
