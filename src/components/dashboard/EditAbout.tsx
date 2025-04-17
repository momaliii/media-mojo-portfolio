
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getAboutContent, saveAboutContent, AboutContent } from "@/utils/contentManager";

const EditAbout = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<AboutContent>(getAboutContent());

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
    saveAboutContent(content);
    toast({
      title: "Changes saved",
      description: "Your changes to the About section have been saved and will be reflected on the landing page",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit About Section</h2>
        <Button onClick={handleSave} className="bg-media-purple hover:bg-media-purple/90">
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Section Content</CardTitle>
          <CardDescription>
            Edit the main heading and description for the about section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutHeading">Section Heading</Label>
            <Input
              id="aboutHeading"
              value={content.heading}
              onChange={(e) => handleInputChange('heading', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="aboutDescription">Description</Label>
            <Textarea
              id="aboutDescription"
              value={content.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="personalDescription">Personal Approach</Label>
            <Textarea
              id="personalDescription"
              value={content.personalDescription}
              onChange={(e) => handleInputChange('personalDescription', e.target.value)}
              className="min-h-24"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>
            Edit the statistics displayed in the about section
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Years Experience</Label>
            <Input 
              id="yearsExperience" 
              value={content.stats.yearsExperience} 
              onChange={(e) => handleInputChange('stats.yearsExperience', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="countriesServed">Countries Served</Label>
            <Input 
              id="countriesServed" 
              value={content.stats.countriesServed}
              onChange={(e) => handleInputChange('stats.countriesServed', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platformsMastered">Platforms Mastered</Label>
            <Input 
              id="platformsMastered" 
              value={content.stats.platformsMastered}
              onChange={(e) => handleInputChange('stats.platformsMastered', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ordersGenerated">Orders Generated</Label>
            <Input 
              id="ordersGenerated" 
              value={content.stats.ordersGenerated}
              onChange={(e) => handleInputChange('stats.ordersGenerated', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAbout;
