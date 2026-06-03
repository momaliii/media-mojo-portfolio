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

  return (
    <AdminLayout title="Client Logos">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" /> Add new logo
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-1">
              <Label htmlFor="logo-name">Client name</Label>
              <Input
                id="logo-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Acme Corp"
              />
            </div>
            <div className="md:col-span-1">
              <Label htmlFor="logo-website">Website (optional)</Label>
              <Input
                id="logo-website"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="https://acme.com"
              />
            </div>
            <div className="md:col-span-1">
              <Label htmlFor="logo-file">Logo image (PNG/SVG)</Label>
              <Input id="logo-file" ref={fileRef} type="file" accept="image/*" />
            </div>
            <div className="md:col-span-1 flex items-end">
              <Button onClick={handleCreate} disabled={uploading} className="w-full">
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

        <Card>
          <CardHeader>
            <CardTitle>Manage logos ({logos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : logos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No logos yet. Add one above to see it appear on the homepage.
              </p>
            ) : (
              <div className="space-y-2">
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
    <div className="flex flex-col md:flex-row md:items-center gap-3 p-3 border rounded-lg bg-card">
      {/* Order arrows */}
      <div className="flex md:flex-col gap-1">
        <Button size="icon" variant="ghost" disabled={isFirst} onClick={onMoveUp}>
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" disabled={isLast} onClick={onMoveDown}>
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Preview */}
      <div className="w-24 h-16 flex items-center justify-center bg-muted/40 rounded shrink-0">
        <img
          src={logo.logo_url}
          alt={logo.name}
          className="max-h-12 max-w-20 object-contain"
        />
      </div>

      {/* Fields */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            if (name.trim() && name !== logo.name) onRename(name.trim());
          }}
          placeholder="Client name"
        />
        <Input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          onBlur={() => {
            if (website !== (logo.website_url ?? "")) onWebsiteChange(website.trim());
          }}
          placeholder="https://..."
        />
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-4 md:gap-3">
        <label className="flex items-center gap-1.5 text-xs cursor-pointer" title="Featured (shows in scrolling strip)">
          <Star
            className={`h-4 w-4 ${logo.featured ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
          <Switch checked={logo.featured} onCheckedChange={onToggleFeatured} />
        </label>
        <label className="flex items-center gap-1.5 text-xs cursor-pointer" title="Visible on site">
          {logo.visible ? (
            <Eye className="h-4 w-4 text-green-600" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}
          <Switch checked={logo.visible} onCheckedChange={onToggleVisible} />
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-1">
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
          title="Replace image"
          onClick={() => replaceRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>
        {logo.website_url && (
          <Button size="icon" variant="ghost" asChild title="Open website">
            <a href={logo.website_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button size="icon" variant="ghost" onClick={onDelete} title="Delete">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
