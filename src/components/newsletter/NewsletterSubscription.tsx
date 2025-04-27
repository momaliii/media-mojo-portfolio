
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Try to add the email to the newsletter_subscribers table
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { email, subscribed_at: new Date() }
        ]);
        
      if (error) {
        if (error.code === '23505') { // Unique violation error code
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        setEmail("");
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-media-blue/10 to-media-peach/10 dark:from-gray-900 dark:to-gray-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-media-purple/10 dark:bg-media-purple/20 mb-4">
              <Mail className="h-6 w-6 text-media-purple dark:text-media-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Stay Updated with <span className="gradient-text">Media Trends</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest media buying insights, platform updates, and digital marketing strategies.
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {isSubscribed ? (
              <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 dark:border-gray-700/50 shadow-md">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Thank You for Subscribing!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You'll receive updates on the latest media buying trends and strategies.
                </p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 dark:border-gray-700/50 p-6 shadow-md"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="youremail@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-media-purple hover:bg-media-darkpurple dark:bg-media-blue dark:hover:bg-blue-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
