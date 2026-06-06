import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Mail,
  BarChart3,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = useQuery({
    queryKey: ["admin-overview-stats"],
    queryFn: async () => {
      const [submissions, newSubmissions, caseStudies, logos, pageViews] = await Promise.all([
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase
          .from("contact_submissions")
          .select("*", { count: "exact", head: true })
          .eq("handled", false),
        supabase.from("case_studies").select("*", { count: "exact", head: true }),
        supabase.from("client_logos").select("*", { count: "exact", head: true }).eq("visible", true),
        supabase.from("page_views").select("*", { count: "exact", head: true }),
      ]);
      return {
        submissions: submissions.count ?? 0,
        newSubmissions: newSubmissions.count ?? 0,
        caseStudies: caseStudies.count ?? 0,
        logos: logos.count ?? 0,
        pageViews: pageViews.count ?? 0,
      };
    },
    staleTime: 30_000,
  });

  const data = stats.data ?? { submissions: 0, newSubmissions: 0, caseStudies: 0, logos: 0, pageViews: 0 };

  return (
    <AdminLayout title="Overview">
      <div className="space-y-8">
        <p className="text-muted-foreground -mt-4">
          Manage your portfolio content and track performance metrics from a unified interface.
        </p>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile
            label="Page Views"
            value={data.pageViews.toLocaleString()}
            icon={Eye}
            delta="all-time"
            tone="info"
          />
          <KpiTile
            label="Case Studies"
            value={data.caseStudies.toString()}
            icon={FileText}
            delta="active"
            tone="neutral"
          />
          <KpiTile
            label="Submissions"
            value={data.submissions.toString()}
            icon={Mail}
            delta={data.newSubmissions > 0 ? `+${data.newSubmissions} new` : "all handled"}
            tone={data.newSubmissions > 0 ? "success" : "neutral"}
          />
          <KpiTile
            label="Client Logos"
            value={data.logos.toString()}
            icon={Users}
            delta="visible"
            tone="neutral"
          />
        </div>

        {/* Feature panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={BarChart3}
            title="Analytics"
            description="Track submissions and content performance at a glance with real-time visualisations."
            href="/admin/analytics"
            cta="Open Analytics"
            variant="ghost"
          />
          <FeatureCard
            icon={FileText}
            title="Case Studies"
            description="Create, edit, preview and publish detailed case studies that showcase your best work."
            href="/admin/case-studies"
            cta="Manage Case Studies"
            variant="primary"
          />
          <FeatureCard
            icon={Mail}
            title="Contact Submissions"
            description="View and triage contact form submissions from prospective clients."
            href="/admin/submissions"
            cta="View Submissions"
            variant="ghost"
            badge={data.newSubmissions > 0 ? `${data.newSubmissions} new` : undefined}
          />
          <FeatureCard
            icon={ImageIcon}
            title="Client Logos"
            description="Curate and reorder the trusted-brands strip shown on the public site."
            href="/admin/client-logos"
            cta="Manage Logos"
            variant="ghost"
          />
        </div>
      </div>
    </AdminLayout>
  );
}

function KpiTile({
  label,
  value,
  icon: Icon,
  delta,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof BarChart3;
  delta: string;
  tone: "success" | "info" | "neutral";
}) {
  const deltaColor =
    tone === "success"
      ? "text-[hsl(var(--admin-success))]"
      : tone === "info"
        ? "text-primary"
        : "text-muted-foreground";

  return (
    <div className="admin-surface admin-hover-lift p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
          {label}
        </span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="tabular-stat text-3xl font-bold text-foreground">{value}</span>
        <span className={`text-xs font-semibold ${deltaColor} mb-0.5 flex items-center gap-1`}>
          {tone === "success" && <TrendingUp className="h-3 w-3" />}
          {delta}
        </span>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
  variant,
  badge,
}: {
  icon: typeof BarChart3;
  title: string;
  description: string;
  href: string;
  cta: string;
  variant: "primary" | "ghost";
  badge?: string;
}) {
  return (
    <div className="admin-surface admin-hover-lift p-6 flex flex-col group">
      <div className="flex items-start justify-between mb-5">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="h-5 w-5" />
        </span>
        {badge && (
          <span className="status-pill status-pill--info">{badge}</span>
        )}
      </div>
      <h3 className="font-display font-bold text-lg text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{description}</p>
      <Link to={href} className="block">
        <Button
          variant={variant === "primary" ? "default" : "outline"}
          className={
            variant === "primary"
              ? "w-full justify-between bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
              : "w-full justify-between border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground"
          }
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
