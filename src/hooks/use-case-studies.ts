import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CaseStudy, CaseStudyMetric, PlatformResult } from "@/data/caseStudies";
import { caseStudies as localCaseStudies } from "@/data/caseStudies";

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === "string") as string[];
}

function toMetrics(value: unknown): CaseStudyMetric[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((m) => {
      if (!m || typeof m !== "object") return null;
      const label = (m as any).label;
      const val = (m as any).value;
      if (typeof label !== "string" || typeof val !== "string") return null;
      return { label, value: val } as CaseStudyMetric;
    })
    .filter(Boolean) as CaseStudyMetric[];
}

function toPlatformResults(value: unknown): PlatformResult[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((m) => {
      if (!m || typeof m !== "object") return null;
      const platform = (m as any).platform;
      if (typeof platform !== "string" || !platform.trim()) return null;
      const optionalString = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
      return {
        platform,
        spend: optionalString((m as any).spend),
        impressions: optionalString((m as any).impressions),
        return: optionalString((m as any).return),
        note: optionalString((m as any).note),
      } as PlatformResult;
    })
    .filter(Boolean) as PlatformResult[];
}

function mapRowToCaseStudy(row: any): CaseStudy {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    client: row.client,
    industry: row.industry ?? undefined,
    description: row.description,
    challenge: row.challenge ?? undefined,
    strategy: row.strategy ?? undefined,
    results: row.results ?? undefined,
    budgetRange: row.budget_range ?? undefined,
    screenshot: row.screenshot ?? undefined,
    additionalScreenshots: toStringArray(row.additional_screenshots),
    platforms: toStringArray(row.platforms),
    tools: toStringArray(row.tools),
    metrics: toMetrics(row.metrics),
    platformResults: toPlatformResults(row.platform_results),
  };
}

export function usePublishedCaseStudies() {
  return useQuery({
    queryKey: ["caseStudies", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("updated_at", { ascending: false });

      if (error) throw error;
      const mapped = (data ?? []).map(mapRowToCaseStudy);
      return mapped.length > 0 ? mapped : localCaseStudies;
    },
    staleTime: 60_000,
  });
}

export function useCaseStudyBySlug(slug?: string) {
  return useQuery({
    queryKey: ["caseStudy", slug],
    enabled: !!slug,
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      if (data) return mapRowToCaseStudy(data);

      // Fallback: try local data by slugified title
      const titleToSlug = (title: string) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return localCaseStudies.find((s) => titleToSlug(s.title) === slug) ?? null;
    },
    staleTime: 60_000,
  });
}

