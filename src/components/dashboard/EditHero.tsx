
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getHeroContent, saveHeroContent, HeroContent } from "@/utils/contentManager";

const EditHero = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<HeroContent>(getHeroContent());

  const handleInputChange = (field: string, value: string) => {
    setContent(prev => {
      if (field.includes('.')) {
        const [section, key] = field.split('.');
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev] as any,
            [key]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSave = () => {
    saveHeroContent(content);
    toast({
      title: "Changes saved",
      description: "Your changes have been saved and will be reflected on the landing page",
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
              value={content.heading}
              onChange={(e) => handleInputChange('heading', e.target.value)}
              className="min-h-20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Textarea
              id="subheading"
              value={content.subheading}
              onChange={(e) => handleInputChange('subheading', e.target.value)}
              className="min-h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ctaText">CTA Button Text</Label>
            <Input
              id="ctaText"
              value={content.ctaText}
              onChange={(e) => handleInputChange('ctaText', e.target.value)}
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
                  <Input 
                    id="roasValue" 
                    value={content.stats.roasValue} 
                    onChange={(e) => handleInputChange('stats.roasValue', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performancePercentage">Performance Percentage</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="performancePercentage" 
                      type="text" 
                      value={content.stats.performancePercentage} 
                      onChange={(e) => handleInputChange('stats.performancePercentage', e.target.value)} 
                    />
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
                    <Input 
                      id="cpcValue" 
                      value={content.stats.cpcValue} 
                      onChange={(e) => handleInputChange('stats.cpcValue', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpcBenchmark">Benchmark Comparison</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="cpcBenchmark" 
                      type="text" 
                      value={content.stats.cpcBenchmark} 
                      onChange={(e) => handleInputChange('stats.cpcBenchmark', e.target.value)} 
                    />
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
                  <Input 
                    id="impressions" 
                    value={content.stats.impressions} 
                    onChange={(e) => handleInputChange('stats.impressions', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctr">CTR</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="ctr" 
                      value={content.stats.ctr} 
                      onChange={(e) => handleInputChange('stats.ctr', e.target.value)} 
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="convRate">Conversion Rate</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="convRate" 
                      value={content.stats.convRate} 
                      onChange={(e) => handleInputChange('stats.convRate', e.target.value)} 
                    />
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
