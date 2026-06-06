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
    <section id="contact" className="relative py-24 md:py-36 bg-[var(--v3-ink)] text-[var(--v3-paper)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-6">
            <p className="v3-eyebrow text-[var(--v3-accent-2)] mb-6">§ 04 — Commission</p>
            <h2 className="v3-serif text-6xl md:text-8xl leading-[0.92] tracking-[-0.025em]">
              Let's make <br />
              <span className="v3-italic" style={{ color: "var(--v3-accent-2)" }}>
                numbers
              </span>{" "}
              move.
            </h2>
            <p className="mt-10 text-lg opacity-70 max-w-md leading-relaxed">
              Brief me on the brand, the budget, and the bottleneck. I reply personally
              within one business day.
            </p>

            <div className="mt-12 space-y-6 border-t border-white/15 pt-8">
              {[
                ["Email", "hello@mhmdali.site"],
                ["WhatsApp", "+20 ··· available on request"],
                ["LinkedIn", "linkedin.com/in/mhmdali02"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-baseline gap-4">
                  <span className="v3-eyebrow opacity-50">{k}</span>
                  <span className="v3-serif text-xl">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="col-span-12 md:col-span-5 md:col-start-8 space-y-6">
            {[
              { k: "name", label: "Your name", type: "text", required: true },
              { k: "email", label: "Email", type: "email", required: true },
              { k: "company", label: "Company (optional)", type: "text", required: false },
            ].map((f) => (
              <div key={f.k} className="border-b border-white/20 pb-2">
                <label className="v3-eyebrow opacity-50 block mb-2">{f.label}</label>
                <input
                  type={f.type}
                  required={f.required}
                  value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full bg-transparent v3-serif text-2xl outline-none placeholder:opacity-30 focus:border-[var(--v3-accent-2)]"
                />
              </div>
            ))}

            <div className="border-b border-white/20 pb-2">
              <label className="v3-eyebrow opacity-50 block mb-2">The brief</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent v3-serif text-xl outline-none resize-none"
                placeholder="Brand, budget range, goal…"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-between w-full mt-8 px-6 py-5 bg-[var(--v3-accent)] text-[var(--v3-paper)] hover:bg-[var(--v3-accent-2)] hover:text-[var(--v3-ink)] transition-colors disabled:opacity-60"
            >
              <span className="v3-eyebrow">{loading ? "Sending…" : "Send the brief"}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
