
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Send,
  Linkedin,
  Phone,
  MapPin 
} from "lucide-react";
import { getContactContent, ContactContent as ContactContentType } from "@/utils/contentManager";

const Contact = () => {
  const [content, setContent] = useState<ContactContentType>(getContactContent());

  // Re-fetch content when component mounts or when localStorage might have changed
  useEffect(() => {
    const handleStorageChange = () => {
      setContent(getContactContent());
    };

    // Listen for storage events (when content is updated in another tab/window)
    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates every 2 seconds (in case changes are made in the same tab)
    const intervalId = setInterval(() => {
      setContent(getContactContent());
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling would go here in a real implementation
    console.log("Form submitted");
    // Show success message
    alert("Thanks for your message! I'll get back to you soon.");
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-media-purple/10 text-media-purple font-medium text-sm mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.heading}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <Card className="border border-gray-200 opacity-0 animate-fade-in-up">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="What's this regarding?" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell me about your project or inquiry" 
                      className="min-h-[120px]" 
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-media-purple hover:bg-media-darkpurple text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6 opacity-0 animate-fade-in-up animate-delay-200">
              <Card className="border border-gray-200 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-media-purple/10 rounded-full p-3">
                        <Mail className="h-5 w-5 text-media-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <p className="text-gray-600">mhmd167ali@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-media-purple/10 rounded-full p-3">
                        <Phone className="h-5 w-5 text-media-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Phone</p>
                        <p className="text-gray-600">+201060098267</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-media-purple/10 rounded-full p-3">
                        <MapPin className="h-5 w-5 text-media-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Location</p>
                        <p className="text-gray-600">Cairo, Egypt</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-sm font-medium mb-3">Connect with me</p>
                    <div className="flex space-x-3">
                      <a 
                        href="https://www.linkedin.com/in/mhmdali02/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-full"
                      >
                        <Linkedin className="h-5 w-5 text-gray-600" />
                      </a>
                      <a 
                        href="https://wa.me/+201060098267"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-full"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-gray-600"
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M12 14a2 2 0 0 0 2-2v-2a2 2 0 1 0-4 0v2a2 2 0 0 0 2 2Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 bg-gradient-to-br from-media-purple to-media-darkpurple text-white overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-2">Ready to boost your campaign performance?</h3>
                  <p className="mb-4 opacity-90">I help businesses achieve exceptional results through strategic media buying across multiple platforms and regions.</p>
                  <a href="https://wa.me/+201060098267" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm">
                      Book a Strategy Call
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
