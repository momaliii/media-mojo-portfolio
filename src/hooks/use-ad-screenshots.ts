import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlurRegion {
  x: number; // normalized 0..1
  y: number;
  w: number;
  h: number;
  blur: number; // pixel radius applied at full image resolution
}

export interface AdScreenshotRow {
  id: string;
  image_url: string;
  original_url: string | null;
  industry: string;
  client: string;
  platform: string | null;
  details: string | null;
  blur_regions: BlurRegion[];
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

const mapRow = (r: any): AdScreenshotRow => ({
  ...r,
  blur_regions: Array.isArray(r.blur_regions) ? (r.blur_regions as BlurRegion[]) : [],
});

export function useAdScreenshots() {
  return useQuery({
    queryKey: ["ad_screenshots", "visible"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ad_screenshots")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapRow);
    },
    staleTime: 60_000,
  });
}

export function useAllAdScreenshots() {
  return useQuery({
    queryKey: ["ad_screenshots", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ad_screenshots")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapRow);
    },
    staleTime: 15_000,
  });
}

export function useAdScreenshot(id: string | undefined) {
  return useQuery({
    queryKey: ["ad_screenshots", "one", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ad_screenshots")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data ? mapRow(data) : null;
    },
  });
}
