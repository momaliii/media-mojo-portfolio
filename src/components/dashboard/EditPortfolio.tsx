
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditPortfolio = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes to the Portfolio section have been saved",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Portfolio Section</h2>
        <Button onClick={handleSave} className="bg-media-purple hover:bg-media-purple/90">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="case-studies">
        <TabsList>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="ad-gallery">Ad Gallery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="case-studies">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Section Content</CardTitle>
              <CardDescription>
                Edit the main heading and description for the portfolio section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portfolioHeading">Section Heading</Label>
                <Input
                  id="portfolioHeading"
                  defaultValue="Recent Case Studies"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="portfolioDescription">Description</Label>
                <Textarea
                  id="portfolioDescription"
                  defaultValue="Explore some of my most successful media buying campaigns and the results they've achieved for clients across industries."
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Case Studies</CardTitle>
              <CardDescription>
                Edit existing case studies or add new ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-4">Case Study #1</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cs1-title">Title</Label>
                      <Input id="cs1-title" defaultValue="E-commerce Revenue Growth" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cs1-category">Category</Label>
                      <Select defaultValue="ecommerce">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="saas">SaaS</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cs1-description">Description</Label>
                      <Textarea 
                        id="cs1-description" 
                        defaultValue="Increased online sales by 215% through optimization of Meta Ads and Google Ads campaigns, focusing on high-intent audiences."
                      />
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">+ Add New Case Study</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ad-gallery">
          <Card>
            <CardHeader>
              <CardTitle>Ad Gallery Section</CardTitle>
              <CardDescription>
                Edit the ad gallery showcase section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="galleryHeading">Gallery Heading</Label>
                <Input
                  id="galleryHeading"
                  defaultValue="Ad Campaign Showcase"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="galleryDescription">Description</Label>
                <Textarea
                  id="galleryDescription"
                  defaultValue="Browse our portfolio of successful ad campaigns across various industries and platforms. Each screenshot demonstrates our approach to creating engaging, high-converting ads."
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Ad Screenshots</CardTitle>
              <CardDescription>
                Manage the ad screenshots in the gallery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="border rounded-lg p-2 relative group">
                  <img 
                    src="/lovable-uploads/5f84f179-a69a-4009-93ba-78dd559a2d50.png" 
                    alt="Ad Screenshot" 
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
                <div className="border rounded-lg p-2 relative group">
                  <img 
                    src="/lovable-uploads/b80727b7-66d8-4763-a17a-87ae06ce9ea1.png" 
                    alt="Ad Screenshot" 
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">+ Add New Screenshot</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditPortfolio;
