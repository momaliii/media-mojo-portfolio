import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Linkedin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    } catch {
      toast({ title: "Couldn't send", description: "Please try again or contact me directly by email.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { label: "Email", value: "mhmd167ali@gmail.com", href: "mailto:mhmd167ali@gmail.com", icon: Mail },
    { label: "WhatsApp", value: "+20 106 009 8267", href: "https://wa.me/201060098267", icon: MessageCircle },
    { label: "LinkedIn", value: "Mohamed Ali", href: "https://www.linkedin.com/in/mhmdali02/", icon: Linkedin },
  ];

  return (
    <section id="contact" aria-labelledby="v3-contact-heading" className="relative py-20 md:py-28 border-t v3-rule">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <header className="mb-10 md:mb-14">
          <p className="v3-eyebrow v3-lime mb-4">Get in touch</p>
          <h2 id="v3-contact-heading" className="v3-display text-4xl md:text-6xl font-bold leading-tight">Let’s build your <span className="v3-glow-text">next chapter.</span></h2>
        </header>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 min-w-0">
          <div className="min-w-0">
            <h3 className="text-xl font-bold">Contact information</h3>
            <p className="mt-3 v3-soft leading-relaxed max-w-md">Tell me about your brand, your goals, and what needs to change.</p>
            <ul className="mt-8 divide-y v3-contact-divider">
              {links.map(({ label, value, href, icon: Icon }) => (
                <li key={label}>
                  <Button asChild variant="ghost" className="v3-contact-link w-full h-auto whitespace-normal justify-start rounded-lg px-3 py-5">
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      <span className="v3-contact-icon grid h-11 w-11 shrink-0 place-items-center rounded-lg"><Icon size={19} aria-hidden="true" /></span>
                      <span className="min-w-0 flex-1 ml-4">
                        <span className="block text-xs v3-soft mb-1">{label}</span>
                        <span className="block text-base font-semibold break-words">{value}</span>
                      </span>
                      <ArrowUpRight size={18} className="ml-3 shrink-0 v3-soft" aria-hidden="true" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm v3-soft">Cairo, Egypt · Working with brands across MENA</p>
          </div>
          <form onSubmit={onSubmit} className="v3-contact-form rounded-lg p-5 sm:p-8 min-w-0" aria-labelledby="v3-brief-heading">
            <h3 id="v3-brief-heading" className="text-xl font-bold mb-6">Send me a message</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="v3-contact-name" className="block text-sm font-medium mb-2">Your name</label>
                <Input id="v3-contact-name" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={loading} className="v3-contact-input h-12" />
              </div>
              <div>
                <label htmlFor="v3-contact-email" className="block text-sm font-medium mb-2">Email</label>
                <Input id="v3-contact-email" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={loading} className="v3-contact-input h-12" />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="v3-contact-company" className="block text-sm font-medium mb-2">Company <span className="v3-soft">(optional)</span></label>
              <Input id="v3-contact-company" autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} disabled={loading} className="v3-contact-input h-12" />
            </div>
            <div className="mt-5">
              <label htmlFor="v3-contact-message" className="block text-sm font-medium mb-2">Your message</label>
              <Textarea id="v3-contact-message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={loading} className="v3-contact-input resize-y min-h-32" placeholder="Brand, budget range, goal…" />
            </div>
            <Button type="submit" disabled={loading} aria-busy={loading} className="v3-contact-submit v3-cta w-full h-12 mt-6 rounded-lg">
              {loading ? <Loader2 size={18} className="mr-2 animate-spin" aria-hidden="true" /> : <ArrowRight size={18} className="mr-2" aria-hidden="true" />}
              {loading ? "Sending…" : "Send message"}
            </Button>
            <p className="mt-4 text-xs v3-soft leading-relaxed">Your details are used only to respond to your inquiry.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
