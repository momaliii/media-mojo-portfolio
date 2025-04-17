
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const EditFooter = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes to the Footer section have been saved",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Footer Section</h2>
        <Button onClick={handleSave} className="bg-media-purple hover:bg-media-purple/90">
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Edit your company details displayed in the footer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              defaultValue="Media Mojo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description</Label>
            <Textarea
              id="companyDescription"
              defaultValue="Strategic media buying for businesses seeking exceptional results and maximum ROI."
              className="min-h-24"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Edit your contact details displayed in the footer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              id="emailAddress"
              defaultValue="mhmd167ali@gmail.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsAppLink">WhatsApp Link</Label>
            <Input
              id="whatsAppLink"
              defaultValue="https://wa.me/+201060098267"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workingHours">Working Hours</Label>
            <Input
              id="workingHours"
              defaultValue="Sunday - Thursday: 9am - 5pm"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Edit your social media links displayed in the footer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              defaultValue="https://www.linkedin.com/in/mhmdali02/"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsappUrl">WhatsApp URL</Label>
            <Input
              id="whatsappUrl"
              defaultValue="https://wa.me/+201060098267"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditFooter;
