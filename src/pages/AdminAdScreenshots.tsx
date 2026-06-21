import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useAllAdScreenshots, type AdScreenshotRow } from "@/hooks/use-ad-screenshots";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Shield,
} from "lucide-react";

export default function AdminAdScreenshots() {
  const { data: rows = [], isLoading } = useAllAdScreenshots();
  const { toast } = useToast();
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["ad_screenshots"] });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<AdScreenshotRow> }) => {
      const { error } = await supabase.from("ad_screenshots").update(patch as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: any) => toast({ title: "Update failed", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ad_screenshots").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast({ title: "Screenshot deleted" });
    },
    onError: (e: any) => toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });

  const move = async (idx: number, dir: -1 | 1) => {
    const a = rows[idx];
    const b = rows[idx + dir];
    if (!a || !b) return;
    await Promise.all([
      supabase.from("ad_screenshots").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("ad_screenshots").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    invalidate();
  };

  return (
    <AdminLayout title="Ad Screenshots">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Upload, blur, and reorder the ad campaign screenshots shown on the public site.
              Blur is baked into the saved image so it can't be bypassed.
            </p>
          </div>
          <Link to="/admin/ad-screenshots/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New screenshot
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
            No screenshots yet. Click <span className="font-semibold">New screenshot</span> to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rows.map((row, idx) => (
              <div key={row.id} className="admin-surface overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10] bg-muted">
                  <img
                    src={row.image_url}
                    alt={row.client}
                    className="absolute inset-0 w-full h-full object-contain"
                    loading="lazy"
                  />
                  {row.blur_regions.length > 0 && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      <Shield className="h-3 w-3" /> {row.blur_regions.length} blur
                    </span>
                  )}
                  {!row.visible && (
                    <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-destructive/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{row.client || "Untitled"}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {row.industry}
                      {row.platform ? ` · ${row.platform}` : ""}
                    </p>
                  </div>
                  {row.details && (
                    <p className="text-[11px] text-muted-foreground line-clamp-2">{row.details}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-1 pt-2 border-t">
                    <div className="flex gap-0.5">
                      <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0} onClick={() => move(idx, -1)}>
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        disabled={idx === rows.length - 1}
                        onClick={() => move(idx, 1)}
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex gap-0.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        title={row.visible ? "Hide" : "Show"}
                        onClick={() => update.mutate({ id: row.id, patch: { visible: !row.visible } })}
                      >
                        {row.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      </Button>
                      <Link to={`/admin/ad-screenshots/${row.id}`}>
                        <Button size="icon" variant="ghost" className="h-7 w-7" title="Edit">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        title="Delete"
                        onClick={() => {
                          if (confirm(`Delete screenshot for "${row.client}"?`)) remove.mutate(row.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
