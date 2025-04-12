
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MessageSquare, 
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Clock
} from "lucide-react";

const Contact = () => {
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
              Let's Discuss Your <span className="gradient-text">Media Strategy</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to elevate your media buying performance? Reach out to discuss how we can work together to achieve your business goals.
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
                        <p className="text-gray-600">hello@mediamojo.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-media-purple/10 rounded-full p-3">
                        <MessageSquare className="h-5 w-5 text-media-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Let's talk</p>
                        <p className="text-gray-600">Schedule a consultation call</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-media-purple/10 rounded-full p-3">
                        <Clock className="h-5 w-5 text-media-purple" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Working hours</p>
                        <p className="text-gray-600">Monday - Friday: 9am - 5pm</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-sm font-medium mb-3">Connect with me</p>
                    <div className="flex space-x-3">
                      <a 
                        href="#" 
                        className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-full"
                      >
                        <Linkedin className="h-5 w-5 text-gray-600" />
                      </a>
                      <a 
                        href="#" 
                        className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-full"
                      >
                        <Twitter className="h-5 w-5 text-gray-600" />
                      </a>
                      <a 
                        href="#" 
                        className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-full"
                      >
                        <Instagram className="h-5 w-5 text-gray-600" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 bg-gradient-to-br from-media-purple to-media-darkpurple text-white overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-2">Ready to boost your campaign performance?</h3>
                  <p className="mb-4 opacity-90">I help businesses like yours achieve extraordinary results through strategic media buying.</p>
                  <Button variant="secondary" size="sm">
                    Book a Strategy Call
                  </Button>
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
