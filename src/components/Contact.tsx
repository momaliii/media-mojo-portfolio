import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Linkedin, Phone, MapPin, MessageCircle, Lock, Loader2, Clock3, Globe2 } from "lucide-react";
import { trackFormSubmission, trackEvent } from "@/utils/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useAnalytics } from "@/hooks/use-analytics";

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { trackCustomEvent } = useAnalytics({ analyticsId: 'contact-section' });
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
        .insert([{ ...formData, submission_type: 'contact' }]);

      if (dbError) throw dbError;

      // Then send email notification via edge function
      try {
        const { data, error: functionError } = await supabase.functions.invoke(
          'send-contact-notification',
          {
            body: formData,
          }
        );

        if (functionError) {
          console.log('Email notification error:', functionError);
          // Continue even if email fails - we've stored the message in the database
        }
      } catch (emailError) {
        // Log but don't fail the whole submission just because email failed
        console.error('Email notification error:', emailError);
      }

      trackFormSubmission('contact_form', true);
      trackCustomEvent('contact', { success: true, method: 'form' });

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
      trackCustomEvent('contact', { success: false, error: error });

      setFormStatus('error');
      toast({
        title: "Something went wrong",
        description: "Please try again or contact me directly via email.",
        variant: "destructive"
      });

      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const contactChannels = [
    {
      label: "Email",
      value: "mhmd167ali@gmail.com",
      href: "mailto:mhmd167ali@gmail.com",
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
      track: { type: "email" },
      breakAll: true,
    },
    {
      label: "Phone",
      value: "+20 106 009 8267",
      href: "tel:+201060098267",
      icon: <Phone className="h-4 w-4" aria-hidden="true" />,
      track: { type: "phone" },
    },
    {
      label: "WhatsApp",
      value: "Message me anytime",
      href: "https://wa.me/+201060098267",
      icon: <MessageCircle className="h-4 w-4" aria-hidden="true" />,
      track: { type: "whatsapp" },
      badge: "Fastest reply",
    },
    {
      label: "Location",
      value: "Cairo, Egypt · Serving MENA",
      href: null,
      icon: <MapPin className="h-4 w-4" aria-hidden="true" />,
      track: null,
    },
  ];

  const platforms = ["Meta", "TikTok", "Snapchat", "Google", "LinkedIn", "X"];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-padding relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)",
        }}
      />
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14 opacity-0 animate-on-scroll">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-media-purple/20 bg-media-purple/10 backdrop-blur-sm text-media-purple text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-media-purple animate-pulse" aria-hidden="true" />
              Get in Touch
            </span>
            <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Let's discuss your{" "}
              <span className="bg-gradient-to-r from-media-purple to-media-oceanblue bg-clip-text text-transparent">
                media strategy
              </span>
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to elevate your media buying performance? Reach out to discuss how we can work
              together to achieve your business goals.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {[
                { icon: <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />, text: "Replies within 24h" },
                { icon: <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />, text: "Cairo · MENA coverage" },
                { icon: <Lock className="h-3.5 w-3.5" aria-hidden="true" />, text: "Your data stays private" },
              ].map((chip) => (
                <span
                  key={chip.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <span className="text-media-purple">{chip.icon}</span>
                  {chip.text}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-stretch">
            {/* Form card */}
            <Card className="lg:col-span-3 h-full rounded-3xl border border-border/70 bg-card/80 backdrop-blur-sm shadow-[0_24px_60px_-32px_rgba(126,105,171,0.35)] hover:shadow-[0_28px_70px_-30px_rgba(126,105,171,0.45)] transition-shadow duration-300 opacity-0 animate-on-scroll">
              <div aria-hidden className="h-1 w-full rounded-t-3xl bg-gradient-to-r from-media-purple via-media-vibrantpurple to-media-oceanblue opacity-80" />
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-3 mb-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-media-purple/10 text-media-purple flex-shrink-0" aria-hidden="true">
                    <Send className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight">Send me a message</h3>
                    <p className="text-sm text-muted-foreground mt-1">Replies typically within 24 hours.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input
                        id="name" name="name" value={formData.name}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder="Your name" required aria-required="true"
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                        disabled={formStatus === "submitting"}
                        className="h-11 rounded-xl bg-background/70 border-border/80 focus-visible:ring-media-purple/50"
                      />
                      {errors.name && (<p id="name-error" className="text-xs text-destructive" role="alert">{errors.name}</p>)}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input
                        id="email" name="email" type="email" value={formData.email}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder="you@example.com" required aria-required="true"
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                        disabled={formStatus === "submitting"}
                        className="h-11 rounded-xl bg-background/70 border-border/80 focus-visible:ring-media-purple/50"
                      />
                      {errors.email && (<p id="email-error" className="text-xs text-destructive" role="alert">{errors.email}</p>)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input
                      id="subject" name="subject" value={formData.subject}
                      onChange={handleChange} onBlur={handleBlur}
                      placeholder="What's this regarding?" required aria-required="true"
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      aria-invalid={!!errors.subject}
                      disabled={formStatus === "submitting"}
                      className="h-11 rounded-xl bg-background/70 border-border/80 focus-visible:ring-media-purple/50"
                    />
                    {errors.subject && (<p id="subject-error" className="text-xs text-destructive" role="alert">{errors.subject}</p>)}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                      id="message" name="message" value={formData.message}
                      onChange={handleChange} onBlur={handleBlur}
                      placeholder="Tell me about your project, goals, and timeline."
                      className={`min-h-[140px] resize-y rounded-xl bg-background/70 border-border/80 focus-visible:ring-media-purple/50 ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      required aria-required="true"
                      aria-describedby={errors.message ? "message-error" : undefined}
                      aria-invalid={!!errors.message}
                      disabled={formStatus === "submitting"}
                    />
                    {errors.message && (<p id="message-error" className="text-xs text-destructive" role="alert">{errors.message}</p>)}
                  </div>

                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5 text-media-purple" aria-hidden="true" />
                    Your information stays confidential and is used only to respond to your inquiry.
                  </p>

                  <Button
                    type="submit" size="lg"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-media-purple to-media-darkpurple hover:opacity-95 text-white font-semibold shadow-[0_12px_30px_-10px_rgba(124,58,237,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
                    disabled={formStatus === "submitting"}
                    aria-busy={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" aria-hidden="true" /> Send message</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Side column */}
            <div className="lg:col-span-2 flex flex-col gap-6 opacity-0 animate-on-scroll">
              <Card className="flex-1 rounded-3xl border border-border/70 bg-card/90 shadow-sm">
                <CardContent className="p-6 md:p-7">
                  <h3 className="text-xl font-semibold">Contact information</h3>
                  <p className="mt-1 mb-5 text-sm text-muted-foreground">Choose the fastest way to reach me.</p>
                  <ul className="space-y-3">
                    {contactChannels.map((channel) => {
                      const content = (
                        <>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-media-purple/10 text-media-purple flex-shrink-0 transition-colors duration-200 group-hover:bg-media-purple/20">
                            {channel.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 flex items-center gap-2">
                              {channel.label}
                              {channel.badge && (
                                <span className="rounded-full bg-emerald-500/10 px-2 py-px text-[10px] font-medium normal-case tracking-normal text-emerald-700">
                                  {channel.badge}
                                </span>
                              )}
                            </p>
                            <span className={`block text-sm font-medium transition-colors duration-200 group-hover:text-media-purple ${channel.breakAll ? "break-all" : ""}`}>
                              {channel.value}
                            </span>
                          </div>
                        </>
                      );

                      return (
                        <li key={channel.label}>
                          {channel.href ? (
                            <a
                              href={channel.href}
                              target={channel.href.startsWith("http") ? "_blank" : undefined}
                              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-background/60 p-3.5 transition-all duration-200 hover:border-media-purple/40 hover:bg-media-purple/5 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple/60"
                              onClick={() => channel.track && trackEvent("contact_link_click", channel.track)}
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-background/60 p-3.5">
                              {content}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-border">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Connect with me</p>
                    <div className="flex gap-2.5">
                      <a href="https://www.linkedin.com/in/mhmdali02/" target="_blank" rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-media-purple/50 hover:bg-media-purple/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple"
                        aria-label="LinkedIn profile (opens in a new tab)"
                        onClick={() => trackEvent("social_link_click", { platform: "linkedin" })}>
                        <Linkedin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      </a>
                      <a href="https://wa.me/+201060098267" target="_blank" rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-media-purple/50 hover:bg-media-purple/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-media-purple"
                        aria-label="Chat on WhatsApp (opens in a new tab)"
                        onClick={() => trackEvent("social_link_click", { platform: "whatsapp" })}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-none overflow-hidden relative bg-gradient-to-br from-media-purple via-media-darkpurple to-media-vibrantpurple text-white shadow-[0_24px_60px_-24px_rgba(126,105,171,0.65)]">
                <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-media-oceanblue/30 blur-3xl" />
                <CardContent className="p-6 md:p-7 relative">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70 mb-2">Let's build</p>
                  <h3 className="text-xl font-semibold mb-2 leading-snug">Ready to boost your campaign performance?</h3>
                  <p className="text-sm text-white/85 mb-4 leading-relaxed">
                    I help businesses achieve exceptional results through strategic media buying across
                    multiple platforms and regions.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Advertising platforms I manage">
                    {platforms.map((platform) => (
                      <span key={platform} className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90">
                        {platform}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <a href="https://wa.me/+201060098267" target="_blank" rel="noopener noreferrer"
                      onClick={() => trackEvent("cta_click", { button: "strategy_call" })}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg">
                      <Button variant="secondary" size="sm" className="w-full font-semibold">Book a strategy call</Button>
                    </a>
                    <a href="/Mohamed_Ali_CV.pdf" target="_blank" rel="noopener noreferrer"
                      onClick={() => trackEvent("cta_click", { button: "download_cv" })}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg">
                      <Button variant="outline" size="sm"
                        className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                        Download résumé
                      </Button>
                    </a>
                  </div>
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
