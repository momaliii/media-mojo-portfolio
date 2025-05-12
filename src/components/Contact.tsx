import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Linkedin, Phone, MapPin, Loader2 } from "lucide-react";
import { trackFormSubmission, trackEvent } from "@/utils/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useFormValidation } from "@/hooks/use-form-validation";

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  
  const validationRules = {
    name: (value: string) => !value.trim() ? "Name is required" : undefined,
    email: (value: string) => {
      if (!value.trim()) return "Email is required";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "Valid email is required";
      return undefined;
    },
    subject: (value: string) => !value.trim() ? "Subject is required" : undefined,
    message: (value: string) => {
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10) return "Message must be at least 10 characters";
      return undefined;
    }
  };

  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useFormValidation<FormData>(
    {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationRules
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    try {
      // First save to Supabase database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (dbError) throw dbError;

      // Then send email notification via edge function
      try {
        const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdnFtb25qc29wYmlldmV1Z3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MDk0MTEsImV4cCI6MjA2MTI4NTQxMX0.kjYzDEJjBZyN3jm3gYbFmEsXBho98U0pMNyAGve4g58";
        
        const emailResponse = await fetch('https://mmvqmonjsopbieveugqj.functions.supabase.co/send-contact-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
          },
          body: JSON.stringify(formData),
        });

        if (!emailResponse.ok) {
          console.log('Email API response status:', emailResponse.status);
          // Continue even if email fails - we've stored the message in the database
        }
      } catch (emailError) {
        // Log but don't fail the whole submission just because email failed
        console.error('Email notification error:', emailError);
      }

      trackFormSubmission('contact_form', true);
      
      setFormStatus('success');
      toast({
        title: "Message sent!",
        description: "Thanks for your message! I'll get back to you soon.",
      });
      
      resetForm();
      
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      
      trackFormSubmission('contact_form', false);
      
      setFormStatus('error');
      toast({
        title: "Something went wrong",
        description: "Please try again or contact me directly via email.",
        variant: "destructive"
      });
      
      setTimeout(() => setFormStatus('idle'), 3000);
    }
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
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your name" 
                        required
                        aria-required="true"
                        disabled={formStatus === 'submitting'}
                        className={errors.name ? "border-red-400" : ""}
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input 
                        id="email"
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email" 
                        placeholder="Your email" 
                        required
                        aria-required="true"
                        disabled={formStatus === 'submitting'}
                        className={errors.email ? "border-red-400" : ""}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="What's this regarding?" 
                      required
                      aria-required="true"
                      disabled={formStatus === 'submitting'}
                      className={errors.subject ? "border-red-400" : ""}
                    />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell me about your project or inquiry" 
                      className={`min-h-[120px] ${errors.message ? "border-red-400" : ""}`}
                      required
                      aria-required="true"
                      disabled={formStatus === 'submitting'}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-media-purple hover:bg-media-darkpurple text-white"
                    disabled={formStatus === 'submitting'}
                    aria-busy={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
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
                        <Mail className="h-5 w-5 text-media-purple" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <a 
                          href="mailto:mhmd167ali@gmail.com" 
                          className="text-gray-600 hover:text-media-purple transition-colors"
                          onClick={() => trackEvent('contact_link_click', { type: 'email' })}
                        >
                          mhmd167ali@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-media-purple/10 rounded-full p-3">
                        <Phone className="h-5 w-5 text-media-purple" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Phone</p>
                        <a 
                          href="tel:+201060098267" 
                          className="text-gray-600 hover:text-media-purple transition-colors"
                          onClick={() => trackEvent('contact_link_click', { type: 'phone' })}
                        >
                          +201060098267
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-media-purple/10 rounded-full p-3">
                        <MapPin className="h-5 w-5 text-media-purple" aria-hidden="true" />
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
                        aria-label="LinkedIn Profile"
                        onClick={() => trackEvent('social_link_click', { platform: 'linkedin' })}
                      >
                        <Linkedin className="h-5 w-5 text-gray-600" />
                      </a>
                      <a 
                        href="https://wa.me/+201060098267"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-gray-200 transition-colors p-2 rounded-full"
                        aria-label="WhatsApp Contact"
                        onClick={() => trackEvent('social_link_click', { platform: 'whatsapp' })}
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
                          aria-hidden="true"
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
                  <a 
                    href="https://wa.me/+201060098267" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', { button: 'strategy_call' })}
                  >
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
