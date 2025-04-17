
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { getFooterContent, saveFooterContent, FooterContent } from "@/utils/contentManager";

const EditFooter = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<FooterContent>(getFooterContent());

  const handleInputChange = (field: string, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveFooterContent(content);
    toast({
      title: "Changes saved",
      description: "Your changes to the Footer section have been saved and will be reflected on the landing page",
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
              value={content.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Company Description</Label>
            <Textarea
              id="companyDescription"
              value={content.companyDescription}
              onChange={(e) => handleInputChange('companyDescription', e.target.value)}
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
              value={content.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsAppLink">WhatsApp Link</Label>
            <Input
              id="whatsAppLink"
              value={content.whatsAppLink}
              onChange={(e) => handleInputChange('whatsAppLink', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workingHours">Working Hours</Label>
            <Input
              id="workingHours"
              value={content.workingHours}
              onChange={(e) => handleInputChange('workingHours', e.target.value)}
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
              value={content.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsappUrl">WhatsApp URL</Label>
            <Input
              id="whatsappUrl"
              value={content.whatsappUrl}
              onChange={(e) => handleInputChange('whatsappUrl', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditFooter;
