import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackFormSubmission, trackEvent } from "@/utils/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useAnalytics } from "@/hooks/use-analytics";
import { Magnetic } from "./_motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Rotating placeholder for the brief textarea — types itself
const PROMPTS = [
  "We're spending $40K/mo on Meta and stuck at 1.8× ROAS...",
  "Just launched our DTC brand in KSA — need a paid acquisition lead.",
  "Our TikTok creative is fatigued. Need fresh angles + a testing system.",
  "Looking for a senior media buyer to take over our $150K/mo budget.",
  "Scaling broke us — CAC doubled. Diagnose and rebuild?",
];

// ─── Typing animation hook ────────────────────────────────────────────────
const useTypewriter = (texts: string[], speed = 45, pause = 2200) => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = texts[i % texts.length];
    let t: number;
    if (phase === "typing") {
      if (text.length < current.length) {
        t = window.setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          speed + Math.random() * 50
        );
      } else {
        t = window.setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      t = window.setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        t = window.setTimeout(() => setText(text.slice(0, -1)), speed / 2);
      } else {
        setI((p) => p + 1);
        setPhase("typing");
        t = 0;
      }
    }
    return () => window.clearTimeout(t);
  }, [text, i, phase, texts, speed, pause]);

  return text;
};

// ─── Gold particle field ──────────────────────────────────────────────────
const Particles = ({ count = 40 }: { count?: number }) => {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 40,
    }))
  ).current;

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            filter: "blur(0.5px)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [-20, p.drift, -20],
            x: [0, p.drift * 0.4, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Contact = () => {
  const { trackCustomEvent } = useAnalytics({ analyticsId: "contact-section" });
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const placeholder = useTypewriter(PROMPTS);

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
      setTimeout(() => setFormStatus("idle"), 4500);
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
      className="relative bg-obsidian text-white border-t border-white/[0.06] grain overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Gold particles */}
      <Particles count={50} />

      {/* Ambient mesh */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[5%] right-[15%] w-[40rem] h-[40rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.12), transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[35rem] h-[35rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(245,230,200,0.06), transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
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
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-9 font-serif text-display-xl text-white leading-[0.98]"
          >
            Got a brand to{" "}
            <span className="serif-italic text-gold">scale</span>?
          </motion.h2>
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
                      <ArrowUpRight size={16} className="text-gold/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                      <ArrowUpRight size={16} className="text-gold/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                      <ArrowUpRight size={16} className="text-gold/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </p>
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-white/[0.08]">
              <p className="eyebrow text-white/40 mb-3">Reply time</p>
              <p className="font-serif text-xl text-white/80 italic leading-relaxed flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Replies within 24 hours, Sun–Thu.
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
                focused={focused}
                setFocused={setFocused}
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
                focused={focused}
                setFocused={setFocused}
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
              focused={focused}
              setFocused={setFocused}
              error={errors.subject}
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={formStatus === "submitting"}
            />

            {/* Textarea with typewriter placeholder */}
            <div>
              <label
                htmlFor="message"
                className="block font-mono uppercase text-[0.625rem] tracking-[0.22em] text-white/50 mb-3"
              >
                Tell me about your brand
              </label>
              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={(e) => {
                    setFocused(null);
                    handleBlur(e);
                  }}
                  onFocus={() => setFocused("message")}
                  placeholder=""
                  className={`bg-transparent border-0 border-b border-white/15 rounded-none text-white min-h-[140px] focus-visible:ring-0 focus-visible:border-gold/60 font-serif text-lg transition-colors ${
                    errors.message ? "border-red-500/60" : ""
                  }`}
                  required
                  aria-invalid={!!errors.message}
                  disabled={formStatus === "submitting"}
                />
                {/* Typewriter ghost — visible only when empty + not focused */}
                {!formData.message && focused !== "message" && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 font-serif text-lg text-white/35"
                  >
                    {placeholder}
                    <span className="inline-block w-[1px] h-[1.1em] bg-gold/70 align-middle ml-0.5 animate-pulse" />
                  </span>
                )}
              </div>
              {errors.message && (
                <p className="text-xs text-red-400 mt-2 font-mono uppercase tracking-[0.18em]" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Magnetic submit */}
            <Magnetic strength={0.25}>
              <Button
                type="submit"
                disabled={formStatus === "submitting" || formStatus === "success"}
                className={`group relative overflow-hidden rounded-none px-8 py-6 transition-all duration-500 ${
                  formStatus === "success"
                    ? "bg-emerald-500 text-obsidian"
                    : "bg-gold text-obsidian hover:bg-champagne"
                }`}
              >
                <AnimatePresence mode="wait">
                  {formStatus === "submitting" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center"
                    >
                      <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                      <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                        Sending
                      </span>
                    </motion.span>
                  ) : formStatus === "success" ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center"
                    >
                      <Check className="mr-3 h-4 w-4" />
                      <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                        Received — reply in 24h
                      </span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center"
                    >
                      <Send className="mr-3 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em]">
                        Send the brief
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Magnetic>
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
  focused,
  setFocused,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled: boolean;
  focused: string | null;
  setFocused: (id: string | null) => void;
}) => {
  const isActive = focused === id || !!value;
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 top-3 pointer-events-none font-mono uppercase text-[0.625rem] tracking-[0.22em] transition-all duration-300 ${
          isActive ? "-translate-y-5 text-gold" : "text-white/40"
        }`}
      >
        {label}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(id)}
        onBlur={(e) => {
          setFocused(null);
          onBlur(e);
        }}
        disabled={disabled}
        required
        aria-invalid={!!error}
        className={`bg-transparent border-0 border-b border-white/15 rounded-none text-white placeholder:text-transparent focus-visible:ring-0 font-serif text-lg px-0 pt-4 pb-2 transition-colors ${
          error ? "border-red-500/60" : focused === id ? "border-gold" : ""
        }`}
      />
      {/* Animated underline reveal */}
      <span
        aria-hidden
        className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-500 ${
          focused === id ? "w-full" : "w-0"
        }`}
      />
      {error && (
        <p className="text-xs text-red-400 mt-2 font-mono uppercase tracking-[0.18em]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Contact;
