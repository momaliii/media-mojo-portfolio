import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  sort_order: number;
  visible: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export function useVisibleClientLogos() {
  return useQuery({
    queryKey: ["client_logos", "visible"],
    queryFn: async (): Promise<ClientLogo[]> => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ClientLogo[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllClientLogos() {
  return useQuery({
    queryKey: ["client_logos", "all"],
    queryFn: async (): Promise<ClientLogo[]> => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ClientLogo[];
    },
  });
}
