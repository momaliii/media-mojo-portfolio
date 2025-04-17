
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const EditAbout = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes to the About section have been saved",
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
              defaultValue="Delivering Data-Driven Media Buying Excellence"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="aboutDescription">Description</Label>
            <Textarea
              id="aboutDescription"
              defaultValue="Senior Media Buyer with over 5 years of experience optimizing paid media campaigns across platforms like Meta, LinkedIn, TikTok, Snapchat, Twitter, and Google Ads, driving growth and engagement across diverse industries."
              className="min-h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="personalDescription">Personal Approach</Label>
            <Textarea
              id="personalDescription"
              defaultValue="I combine deep analytical expertise with creative thinking to craft media buying strategies that maximize ROI and deliver measurable business results across diverse industries in over 10 countries."
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
            <Input id="yearsExperience" defaultValue="5+" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="countriesServed">Countries Served</Label>
            <Input id="countriesServed" defaultValue="10+" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platformsMastered">Platforms Mastered</Label>
            <Input id="platformsMastered" defaultValue="6+" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ordersGenerated">Orders Generated</Label>
            <Input id="ordersGenerated" defaultValue="90K+" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAbout;
