import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, ArrowUpRight } from "lucide-react";
import { trackFormSubmission, trackEvent } from "@/utils/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useAnalytics } from "@/hooks/use-analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { trackCustomEvent } = useAnalytics({ analyticsId: "contact-section" });
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const validationRules = {
    name: (v: string) => (!v.trim() ? "Name is required" : undefined),
    email: (v: string) => {
      if (!v.trim()) return "Email is required";
      if (!/^\S+@\S+\.\S+$/.test(v)) return "Valid email is required";
      return undefined;
    },
    subject: (v: string) =>
      !v.trim() ? "Subject is required" : undefined,
    message: (v: string) => {
      if (!v.trim()) return "Message is required";
      if (v.trim().length < 10) return "Message must be at least 10 characters";
      return undefined;
    },
  };

  const { formData, errors, handleChange, handleBlur, validateForm, resetForm } =
    useFormValidation<FormData>(
      { name: "", email: "", subject: "", message: "" },
      validationRules
    );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus("submitting");

    try {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert([{ ...formData, submission_type: "contact" }]);
      if (dbError) throw dbError;

      try {
        await supabase.functions.invoke("send-contact-notification", {
          body: formData,
        });
      } catch (emailErr) {
        console.error("Email notification error:", emailErr);
      }

      trackFormSubmission("contact_form", true);
      trackCustomEvent("contact", { success: true, method: "form" });
      setFormStatus("success");
      toast({
        title: "Message received",
        description: "I'll reply within 24h. Thank you.",
      });
      resetForm();
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch (err) {
      console.error("Form submission error:", err);
      trackFormSubmission("contact_form", false);
      trackCustomEvent("contact", { success: false });
      setFormStatus("error");
      toast({
        title: "Something went wrong",
        description: "Please email me directly at mhmd167ali@gmail.com.",
        variant: "destructive",
      });
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-obsidian text-white border-t border-white/[0.06] grain"
      aria-labelledby="contact-heading"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-gold/[0.05] rounded-full filter blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-10 py-28 md:py-40 relative">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-4">— 05</p>
            <p className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] text-white/40">
              Get in Touch / Direct
            </p>
          </div>
          <h2
            id="contact-heading"
            className="md:col-span-9 font-serif text-display-xl text-white leading-[0.98]"
          >
            Got a brand to{" "}
            <span className="serif-italic text-gold">scale</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Direct lines */}
          <div className="md:col-span-5 md:order-2 space-y-12">
            <div>
              <p className="eyebrow text-white/40 mb-4">Direct lines</p>
              <ul className="space-y-5">
                <li>
                  <a
                    href="mailto:mhmd167ali@gmail.com"
                    onClick={() =>
                      trackEvent("contact_link_click", { type: "email" })
                    }
                    className="group block"
                  >
                    <p className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/40 mb-1">
                      Email
                    </p>
                    <p className="font-serif text-2xl md:text-3xl text-white group-hover:text-gold transition-colors gold-underline inline-flex items-center gap-2">
                      mhmd167ali@gmail.com
                      <ArrowUpRight size={16} className="text-gold/60" />
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/+201060098267"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("contact_link_click", { type: "whatsapp" })
                    }
                    className="group block"
                  >
                    <p className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/40 mb-1">
                      WhatsApp / Phone
                    </p>
                    <p className="font-serif text-2xl md:text-3xl text-white group-hover:text-gold transition-colors gold-underline inline-flex items-center gap-2">
                      +20 106 009 8267
                      <ArrowUpRight size={16} className="text-gold/60" />
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mhmdali02/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("social_link_click", { platform: "linkedin" })
                    }
                    className="group block"
                  >
                    <p className="font-mono uppercase text-[0.5625rem] tracking-[0.22em] text-white/40 mb-1">
                      LinkedIn
                    </p>
                    <p className="font-serif text-2xl md:text-3xl text-white group-hover:text-gold transition-colors gold-underline inline-flex items-center gap-2">
                      /in/mhmdali02
                      <ArrowUpRight size={16} className="text-gold/60" />
                    </p>
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-white/[0.08]">
              <p className="eyebrow text-white/40 mb-3">Reply time</p>
              <p className="font-serif text-xl text-white/80 italic leading-relaxed">
                I reply to every serious inquiry within 24 hours, Sun–Thu.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="md:col-span-7 md:order-1 space-y-8"
          >
            <p className="eyebrow text-white/40">— Or send a brief</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                id="name"
                label="Your name"
                error={errors.name}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={formStatus === "submitting"}
              />
              <FormField
                id="email"
                type="email"
                label="Email"
                error={errors.email}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={formStatus === "submitting"}
              />
            </div>

            <FormField
              id="subject"
              label="What are we talking about?"
              error={errors.subject}
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={formStatus === "submitting"}
            />

            <div>
              <label
                htmlFor="message"
                className="block font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/50 mb-3"
              >
                Tell me about your brand
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Current spend, current funnel, where it's stuck..."
                className={`bg-transparent border-0 border-b border-white/15 rounded-none text-white placeholder:text-white/30 min-h-[120px] focus-visible:ring-0 focus-visible:border-gold/60 font-serif text-lg ${
                  errors.message ? "border-red-500/60" : ""
                }`}
                required
                aria-invalid={!!errors.message}
                disabled={formStatus === "submitting"}
              />
              {errors.message && (
                <p className="text-xs text-red-400 mt-2 font-mono uppercase tracking-[0.18em]" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={formStatus === "submitting"}
              className="group bg-gold text-obsidian hover:bg-champagne rounded-none px-8 py-6 transition-all"
            >
              {formStatus === "submitting" ? (
                <>
                  <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                  <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                    Sending
                  </span>
                </>
              ) : (
                <>
                  <Send className="mr-3 h-4 w-4" />
                  <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                    Send the brief
                  </span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const FormField = ({
  id,
  label,
  type = "text",
  error,
  value,
  onChange,
  onBlur,
  disabled,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled: boolean;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/50 mb-3"
    >
      {label}
    </label>
    <Input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required
      aria-invalid={!!error}
      className={`bg-transparent border-0 border-b border-white/15 rounded-none text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-gold/60 font-serif text-lg px-0 ${
        error ? "border-red-500/60" : ""
      }`}
    />
    {error && (
      <p className="text-xs text-red-400 mt-2 font-mono uppercase tracking-[0.18em]" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default Contact;
