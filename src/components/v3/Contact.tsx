import React, { useState } from "react";
import { Send, Loader2, Check, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackFormSubmission, trackEvent } from "@/utils/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToast } from "@/hooks/use-toast";
import { Magnetic, WindowFrame } from "./_primitives";

type FormStatus = "idle" | "submitting" | "success" | "error";
interface FormData { name: string; email: string; subject: string; message: string; }

const Contact = () => {
  const { trackCustomEvent } = useAnalytics({ analyticsId: "contact-section-v3" });
  const { toast } = useToast();
  const [status, setStatus] = useState<FormStatus>("idle");

  const { formData, errors, handleChange, handleBlur, validateForm, resetForm } =
    useFormValidation<FormData>(
      { name: "", email: "", subject: "", message: "" },
      {
        name: (v) => !v.trim() ? "REQUIRED" : undefined,
        email: (v) => !v.trim() ? "REQUIRED" : !/^\S+@\S+\.\S+$/.test(v) ? "INVALID_FORMAT" : undefined,
        subject: (v) => !v.trim() ? "REQUIRED" : undefined,
        message: (v) => !v.trim() ? "REQUIRED" : v.trim().length < 10 ? "MIN_10_CHARS" : undefined,
      }
    );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("submitting");
    try {
      const { error } = await supabase.from("contact_submissions").insert([{ ...formData, submission_type: "contact" }]);
      if (error) throw error;
      try { await supabase.functions.invoke("send-contact-notification", { body: formData }); } catch { /* */ }
      trackFormSubmission("contact_form_v3", true);
      trackCustomEvent("contact", { success: true });
      setStatus("success");
      toast({ title: "TRANSMISSION RECEIVED", description: "Reply within 24h." });
      resetForm();
      setTimeout(() => setStatus("idle"), 4500);
    } catch {
      setStatus("error");
      toast({ title: "TRANSMISSION FAILED", description: "Email mhmd167ali@gmail.com directly.", variant: "destructive" });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative border-t border-chrome-700/30 scanlines" style={{ backgroundColor: "var(--v3-bg)" }}>
      <div className="absolute inset-0 v3-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(236,72,153,0.15), transparent 70%)", filter: "blur(80px)" }}
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative container mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <p className="y2k-mono text-[0.6875rem] uppercase tracking-[0.18em] text-holo-cyan mb-3">// 05_INITIATE_CONTACT</p>
          </div>
          <h2 className="md:col-span-9 y2k-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] text-chrome-50">
            <span className="block">GOT A BRAND TO</span>
            <span className="block holo-text">SCALE?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          {/* Direct lines */}
          <div className="md:col-span-5 md:order-2 space-y-6">
            <WindowFrame title="direct_lines.cfg">
              <div className="p-5 space-y-5">
                <DirectLink label="EMAIL" value="mhmd167ali@gmail.com" href="mailto:mhmd167ali@gmail.com" onClick={() => trackEvent("contact_link_click", { type: "email" })} />
                <DirectLink label="WHATSAPP" value="+20 106 009 8267" href="https://wa.me/+201060098267" onClick={() => trackEvent("contact_link_click", { type: "whatsapp" })} />
                <DirectLink label="LINKEDIN" value="/in/mhmdali02" href="https://www.linkedin.com/in/mhmdali02/" onClick={() => trackEvent("social_link_click", { platform: "linkedin" })} />
              </div>
            </WindowFrame>

            <div className="border border-chrome-700/40 p-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="y2k-mono text-xs uppercase tracking-[0.18em] text-chrome-300">
                ONLINE · REPLIES_WITHIN_24H · SUN-THU
              </p>
            </div>
          </div>

          {/* Form as terminal */}
          <form onSubmit={onSubmit} className="md:col-span-7 md:order-1">
            <WindowFrame title="brief.tx — sender_input">
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="name" label="NAME" value={formData.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} disabled={status === "submitting"} />
                  <Field id="email" type="email" label="EMAIL" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} disabled={status === "submitting"} />
                </div>
                <Field id="subject" label="SUBJECT" value={formData.subject} onChange={handleChange} onBlur={handleBlur} error={errors.subject} disabled={status === "submitting"} />
                <TextField id="message" label="BRIEF" placeholder="describe.your.problem" value={formData.message} onChange={handleChange} onBlur={handleBlur} error={errors.message} disabled={status === "submitting"} />

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    className={`group inline-flex items-center gap-3 px-6 py-3 transition-all duration-500 relative overflow-hidden ${
                      status === "success" ? "bg-emerald-400 text-midnight" : "bg-holo-cyan text-midnight hover:bg-chrome-50"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {status === "submitting" ? (
                        <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                          <Loader2 size={14} className="mr-2 animate-spin" />
                          <span className="y2k-mono text-xs uppercase tracking-[0.18em] font-bold">TRANSMITTING...</span>
                        </motion.span>
                      ) : status === "success" ? (
                        <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                          <Check size={14} className="mr-2" />
                          <span className="y2k-mono text-xs uppercase tracking-[0.18em] font-bold">RECEIVED [OK]</span>
                        </motion.span>
                      ) : (
                        <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                          <Send size={14} className="mr-2 transition-transform group-hover:translate-x-0.5" />
                          <span className="y2k-mono text-xs uppercase tracking-[0.18em] font-bold">&gt; TRANSMIT_BRIEF</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </Magnetic>
              </div>
            </WindowFrame>
          </form>
        </div>
      </div>
    </section>
  );
};

const DirectLink = ({ label, value, href, onClick }: { label: string; value: string; href: string; onClick?: () => void }) => (
  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={onClick} className="group block border-l-2 border-chrome-700 hover:border-holo-cyan pl-3 transition-colors">
    <p className="y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mb-1">{label}</p>
    <p className="y2k-display text-xl text-chrome-100 group-hover:text-holo-cyan transition-colors inline-flex items-center gap-2" style={{ fontVariationSettings: "'wdth' 85" }}>
      {value}
      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </p>
  </a>
);

const Field = ({ id, label, value, onChange, onBlur, error, disabled, type = "text" }: any) => (
  <div>
    <label htmlFor={id} className="block y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mb-1.5">
      &gt; {label} {error && <span className="text-rose-400">[{error}]</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required
      aria-invalid={!!error}
      className={`w-full bg-midnight-950 border y2k-mono text-sm text-chrome-50 placeholder:text-chrome-700 px-3 py-2 focus:outline-none transition-colors ${
        error ? "border-rose-400/60" : "border-chrome-700 focus:border-holo-cyan"
      }`}
    />
  </div>
);

const TextField = ({ id, label, placeholder, value, onChange, onBlur, error, disabled }: any) => (
  <div>
    <label htmlFor={id} className="block y2k-mono text-[0.625rem] uppercase tracking-[0.18em] text-chrome-500 mb-1.5">
      &gt; {label} {error && <span className="text-rose-400">[{error}]</span>}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      required
      aria-invalid={!!error}
      rows={5}
      className={`w-full bg-midnight-950 border y2k-mono text-sm text-chrome-50 placeholder:text-chrome-700 px-3 py-2 focus:outline-none transition-colors ${
        error ? "border-rose-400/60" : "border-chrome-700 focus:border-holo-cyan"
      }`}
    />
  </div>
);

export default Contact;
