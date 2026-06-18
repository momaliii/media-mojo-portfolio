import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name,
        email: form.email,
        subject: form.company ? `[v3] ${form.company}` : "[v3] Inquiry",
        message: form.message,
        submission_type: "contact",
      });
      if (error) throw error;
      toast({ title: "Sent.", description: "I'll be in touch within 24 hours." });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err: any) {
      toast({ title: "Couldn't send", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="v3-shell rounded-[2rem] p-5 md:p-10 lg:p-12">
        <div className="grid grid-cols-12 gap-8 md:gap-16 min-w-0">
          <div className="col-span-12 md:col-span-6 min-w-0">
            <p className="v3-eyebrow v3-lime mb-6">Growth request</p>
            <h2 className="v3-display text-4xl md:text-6xl font-bold leading-[1] tracking-[-0.05em]">
              Ready to turn spend into <span className="v3-glow-text">signal?</span>
            </h2>
            <p className="mt-7 text-lg v3-soft max-w-md leading-relaxed">
              Brief me on the brand, the budget, and the bottleneck. I reply personally
              within one business day.
            </p>

            <div className="mt-10 grid gap-3">
              {[
                ["Email", "hello@mhmdali.site"],
                ["WhatsApp", "+20 ··· available on request"],
                ["LinkedIn", "linkedin.com/in/mhmdali02"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white/5 border v3-rule p-4 flex justify-between items-baseline gap-3 min-w-0">
                  <span className="v3-eyebrow v3-muted shrink-0">{k}</span>
                  <span className="font-bold text-right break-all min-w-0">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="col-span-12 md:col-span-5 md:col-start-8 space-y-6 min-w-0">
            {[
              { k: "name", label: "Your name", type: "text", required: true },
              { k: "email", label: "Email", type: "email", required: true },
              { k: "company", label: "Company (optional)", type: "text", required: false },
            ].map((f) => (
              <div key={f.k} className="rounded-2xl bg-[var(--v3-bg)]/70 border v3-rule p-4">
                <label className="v3-eyebrow v3-muted block mb-2">{f.label}</label>
                <input
                  type={f.type}
                  required={f.required}
                  value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full bg-transparent text-lg font-bold outline-none placeholder:opacity-30"
                />
              </div>
            ))}

            <div className="rounded-2xl bg-[var(--v3-bg)]/70 border v3-rule p-4">
              <label className="v3-eyebrow v3-muted block mb-2">The brief</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent text-base font-semibold outline-none resize-none placeholder:text-[var(--v3-muted)]"
                placeholder="Brand, budget range, goal…"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="v3-cta group inline-flex items-center justify-between w-full mt-8 px-6 py-5 rounded-2xl bg-[var(--v3-lime)] text-[var(--v3-bg)] hover:shadow-[0_10px_42px_rgba(182,255,77,.4)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="v3-eyebrow">{loading ? "Sending…" : "Send the brief"}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
