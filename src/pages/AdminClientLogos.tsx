import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Plus,
  Trash2,
  Upload,
  ArrowUp,
  ArrowDown,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { useAllClientLogos, type ClientLogo } from "@/hooks/use-client-logos";

const BUCKET = "case-study-assets";
const PREFIX = "client-logos";

export default function AdminClientLogos() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: logos = [], isLoading } = useAllClientLogos();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [uploading, setUploading] = useState(false);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["client_logos"] });
  };

  const uploadLogo = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop() ?? "png";
    const path = `${PREFIX}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleCreate = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast({ title: "Please select a logo image", variant: "destructive" });
      return;
    }
    if (!newName.trim()) {
      toast({ title: "Please enter the client name", variant: "destructive" });
      return;
    }
    try {
      setUploading(true);
      const logo_url = await uploadLogo(file);
      const maxOrder = logos.reduce((m, l) => Math.max(m, l.sort_order), 0);
      const { error } = await supabase.from("client_logos").insert({
        name: newName.trim(),
        logo_url,
        website_url: newWebsite.trim() || null,
        sort_order: maxOrder + 10,
      });
      if (error) throw error;
      toast({ title: "Logo added" });
      setNewName("");
      setNewWebsite("");
      if (fileRef.current) fileRef.current.value = "";
      invalidate();
    } catch (e: any) {
      toast({ title: "Failed to add logo", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<ClientLogo> }) => {
      const { error } = await supabase.from("client_logos").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: any) =>
      toast({ title: "Update failed", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("client_logos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast({ title: "Logo deleted" });
    },
    onError: (e: any) =>
      toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });

  const move = async (idx: number, dir: -1 | 1) => {
    const a = logos[idx];
    const b = logos[idx + dir];
    if (!a || !b) return;
    await Promise.all([
      supabase.from("client_logos").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("client_logos").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    invalidate();
  };

  const replaceLogoFile = async (logo: ClientLogo, file: File) => {
    try {
      const logo_url = await uploadLogo(file);
      await update.mutateAsync({ id: logo.id, patch: { logo_url } });
      toast({ title: "Logo image updated" });
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    }
  };

  const visibleCount = logos.filter((l) => l.visible).length;
  const featuredCount = logos.filter((l) => l.featured).length;

  return (
    <AdminLayout title="Client Logos">
      <div className="space-y-6">
        {/* Add new logo */}
        <Card className="border-dashed">
          <CardHeader className="pb-3 border-b bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Plus className="h-4 w-4" />
              </span>
              Add new logo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
              <div className="space-y-1.5">
                <Label htmlFor="logo-name" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Client name</Label>
                <Input
                  id="logo-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Acme Corp"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="logo-website" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Website <span className="font-normal normal-case">(optional)</span></Label>
                <Input
                  id="logo-website"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  placeholder="https://acme.com"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="logo-file" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Logo image <span className="font-normal normal-case">(PNG / SVG)</span></Label>
                <Input id="logo-file" ref={fileRef} type="file" accept="image/*" className="h-10 file:mr-2 file:text-xs cursor-pointer" />
              </div>
              <Button onClick={handleCreate} disabled={uploading} size="lg" className="md:w-auto w-full h-10 px-5">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Add logo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Manage logos */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between gap-3 flex-wrap border-b">
            <div>
              <CardTitle className="text-base">Manage logos</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Reorder, edit, and toggle visibility for every client logo.</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-background">
                <span className="font-semibold text-foreground tabular-nums">{logos.length}</span>
                <span className="text-muted-foreground">total</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-background">
                <Eye className="h-3.5 w-3.5 text-green-600" />
                <span className="font-semibold text-foreground tabular-nums">{visibleCount}</span>
                <span className="text-muted-foreground">visible</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-background">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground tabular-nums">{featuredCount}</span>
                <span className="text-muted-foreground">featured</span>
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : logos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No logos yet. Add one above to see it appear on the homepage.
              </p>
            ) : (
              <div className="overflow-hidden rounded-lg border bg-card">
                {/* Desktop header row */}
                <div className="hidden md:grid grid-cols-[44px_56px_minmax(0,1.1fr)_minmax(0,1.3fr)_120px_112px] gap-3 items-center px-4 py-2.5 bg-muted/40 border-b text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  <span>Order</span>
                  <span>Logo</span>
                  <span>Name</span>
                  <span>Website</span>
                  <span className="text-center">Flags</span>
                  <span className="text-right pr-1">Actions</span>
                </div>
                <div className="divide-y">
                  {logos.map((logo, idx) => (
                    <LogoRow
                      key={logo.id}
                      logo={logo}
                      isFirst={idx === 0}
                      isLast={idx === logos.length - 1}
                      onMoveUp={() => move(idx, -1)}
                      onMoveDown={() => move(idx, 1)}
                      onToggleVisible={(v) =>
                        update.mutate({ id: logo.id, patch: { visible: v } })
                      }
                      onToggleFeatured={(v) =>
                        update.mutate({ id: logo.id, patch: { featured: v } })
                      }
                      onRename={(name) => update.mutate({ id: logo.id, patch: { name } })}
                      onWebsiteChange={(website_url) =>
                        update.mutate({ id: logo.id, patch: { website_url: website_url || null } })
                      }
                      onReplaceFile={(file) => replaceLogoFile(logo, file)}
                      onDelete={() => {
                        if (confirm(`Delete "${logo.name}"?`)) remove.mutate(logo.id);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

interface RowProps {
  logo: ClientLogo;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleVisible: (v: boolean) => void;
  onToggleFeatured: (v: boolean) => void;
  onRename: (name: string) => void;
  onWebsiteChange: (url: string) => void;
  onReplaceFile: (file: File) => void;
  onDelete: () => void;
}

function LogoRow({
  logo,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onToggleVisible,
  onToggleFeatured,
  onRename,
  onWebsiteChange,
  onReplaceFile,
  onDelete,
}: RowProps) {
  const [name, setName] = useState(logo.name);
  const [website, setWebsite] = useState(logo.website_url ?? "");
  const replaceRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="grid grid-cols-[auto_56px_1fr] md:grid-cols-[44px_56px_minmax(0,1.1fr)_minmax(0,1.3fr)_120px_112px] gap-x-3 gap-y-2 items-center px-4 py-3 hover:bg-accent/30 transition-colors">
      {/* Order arrows */}
      <div className="flex md:flex-col gap-0.5 row-span-2 md:row-span-1 self-center">
        <Button size="icon" variant="ghost" className="h-6 w-6" disabled={isFirst} onClick={onMoveUp}>
          <ArrowUp className="h-3.5 w-3.5" />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6" disabled={isLast} onClick={onMoveDown}>
          <ArrowDown className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Preview */}
      <div className="w-14 h-14 flex items-center justify-center bg-muted/40 rounded-md border shrink-0 overflow-hidden">
        <img
          src={logo.logo_url}
          alt={logo.name}
          className="max-h-11 max-w-11 object-contain"
        />
      </div>

      {/* Name */}
      <div className="min-w-0 col-start-3 md:col-start-auto space-y-1">
        <Label className="md:hidden text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (name.trim() && name !== logo.name) onRename(name.trim());
          }}
          placeholder="Client name"
          className="h-9 text-sm"
        />
      </div>

      {/* Website */}
      <div className="min-w-0 col-span-3 md:col-span-1 md:col-start-auto space-y-1">
        <Label className="md:hidden text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Website</Label>
        <Input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          onBlur={() => {
            if (website !== (logo.website_url ?? "")) onWebsiteChange(website.trim());
          }}
          placeholder="https://..."
          className="h-9 text-sm"
        />
      </div>

      {/* Toggles */}
      <div className="col-span-3 md:col-span-1 flex items-center justify-start md:justify-center gap-3">
        <label className="flex items-center gap-1.5 cursor-pointer" title="Featured">
          <Star
            className={`h-3.5 w-3.5 ${logo.featured ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
          <Switch checked={logo.featured} onCheckedChange={onToggleFeatured} />
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer" title="Visible">
          {logo.visible ? (
            <Eye className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <Switch checked={logo.visible} onCheckedChange={onToggleVisible} />
        </label>
      </div>

      {/* Actions */}
      <div className="col-span-3 md:col-span-1 flex gap-0.5 justify-end">

        <input
          ref={replaceRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onReplaceFile(f);
            e.target.value = "";
          }}
        />
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          title="Replace image"
          onClick={() => replaceRef.current?.click()}
        >
          <Upload className="h-3.5 w-3.5" />
        </Button>
        {logo.website_url && (
          <Button size="icon" variant="ghost" className="h-8 w-8" asChild title="Open website">
            <a href={logo.website_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onDelete} title="Delete">
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
