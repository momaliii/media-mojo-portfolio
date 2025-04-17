
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

const EditContact = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes to the Contact section have been saved",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Contact Section</h2>
        <Button onClick={handleSave} className="bg-media-purple hover:bg-media-purple/90">
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Section Content</CardTitle>
          <CardDescription>
            Edit the main heading and description for the contact section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactHeading">Section Heading</Label>
            <Input
              id="contactHeading"
              defaultValue="Let's Discuss Your Next Campaign"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactDescription">Description</Label>
            <Textarea
              id="contactDescription"
              defaultValue="Ready to maximize your ROAS and scale your business? Get in touch to discuss how I can help you achieve your advertising goals."
              className="min-h-24"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Form Settings</CardTitle>
          <CardDescription>
            Configure your contact form and notification settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailNotification">Email Notification</Label>
            <Input
              id="emailNotification"
              defaultValue="mhmd167ali@gmail.com"
              placeholder="Email to receive notifications"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input
              id="whatsappNumber"
              defaultValue="+201060098267"
              placeholder="WhatsApp number for notifications"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
            <Switch id="emailNotifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="whatsappNotifications">Enable WhatsApp Notifications</Label>
            <Switch id="whatsappNotifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form Fields</CardTitle>
          <CardDescription>
            Configure which fields appear in the contact form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="nameField">Name Field</Label>
            <div className="flex items-center gap-2">
              <Switch id="nameField" defaultChecked />
              <span className="text-xs text-gray-500">Required</span>
              <Switch id="nameRequired" defaultChecked />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="emailField">Email Field</Label>
            <div className="flex items-center gap-2">
              <Switch id="emailField" defaultChecked />
              <span className="text-xs text-gray-500">Required</span>
              <Switch id="emailRequired" defaultChecked />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="phoneField">Phone Field</Label>
            <div className="flex items-center gap-2">
              <Switch id="phoneField" defaultChecked />
              <span className="text-xs text-gray-500">Required</span>
              <Switch id="phoneRequired" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="messageField">Message Field</Label>
            <div className="flex items-center gap-2">
              <Switch id="messageField" defaultChecked />
              <span className="text-xs text-gray-500">Required</span>
              <Switch id="messageRequired" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditContact;
