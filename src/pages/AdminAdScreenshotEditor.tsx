import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  BlurImageEditor,
  bakeBlurredImage,
} from "@/components/admin/BlurImageEditor";
import {
  useAdScreenshot,
  type BlurRegion,
} from "@/hooks/use-ad-screenshots";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";

const PUBLIC_BUCKET = "case-study-assets";
const PUBLIC_PREFIX = "ad-screenshots";
const ORIGINALS_BUCKET = "ad-screenshots";

const PLATFORMS = ["", "META", "Facebook", "Instagram", "LinkedIn", "Analytics", "Lightfunnel"] as const;

export default function AdminAdScreenshotEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const nav = useNavigate();
  const { toast } = useToast();
  const qc = useQueryClient();
  const existing = useAdScreenshot(isNew ? undefined : id);

  const [client, setClient] = useState("");
  const [industry, setIndustry] = useState("");
  const [platform, setPlatform] = useState<string>("");
  const [details, setDetails] = useState("");
  const [visible, setVisible] = useState(true);
  const [regions, setRegions] = useState<BlurRegion[]>([]);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [originalStoragePath, setOriginalStoragePath] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Hydrate from existing row
  useEffect(() => {
    const row = existing.data;
    if (!row) return;
    setClient(row.client);
    setIndustry(row.industry);
    setPlatform(row.platform ?? "");
    setDetails(row.details ?? "");
    setVisible(row.visible);
    setRegions(row.blur_regions);
    setSourceUrl(row.original_url || row.image_url);
  }, [existing.data]);

  // Load original from private storage when editing
  useEffect(() => {
    const row = existing.data;
    if (!row?.original_url) return;
    // If original_url is a storage path (starts with "originals/"), create a signed URL
    if (row.original_url.startsWith("originals/")) {
      setOriginalStoragePath(row.original_url);
      supabase.storage
        .from(ORIGINALS_BUCKET)
        .createSignedUrl(row.original_url, 60 * 60)
        .then(({ data, error }) => {
          if (!error && data) setSourceUrl(data.signedUrl);
        });
    }
  }, [existing.data]);

  const onPickFile = (f: File | null) => {
    if (!f) return;
    setPendingFile(f);
    const url = URL.createObjectURL(f);
    setSourceUrl(url);
    setRegions([]);
  };

  const canSave = useMemo(() => {
    if (!sourceUrl) return false;
    if (!client.trim() || !industry.trim()) return false;
    return true;
  }, [sourceUrl, client, industry]);

  const handleSave = async () => {
    if (!canSave || !sourceUrl) return;
    try {
      setSaving(true);

      // 1. If a new file was picked, upload the ORIGINAL to private bucket
      let originalPath = originalStoragePath;
      if (pendingFile) {
        const ext = (pendingFile.name.split(".").pop() || "png").toLowerCase();
        originalPath = `originals/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(ORIGINALS_BUCKET)
          .upload(originalPath, pendingFile, { upsert: false, cacheControl: "31536000" });
        if (upErr) throw upErr;
      }

      // 2. Bake the blurred version from the in-browser source URL
      const blob = await bakeBlurredImage(sourceUrl, regions);

      // 3. Upload baked to PUBLIC bucket
      const bakedPath = `${PUBLIC_PREFIX}/baked-${crypto.randomUUID()}.png`;
      const { error: bakeErr } = await supabase.storage
        .from(PUBLIC_BUCKET)
        .upload(bakedPath, blob, { upsert: false, cacheControl: "31536000", contentType: "image/png" });
      if (bakeErr) throw bakeErr;
      const { data: pub } = supabase.storage.from(PUBLIC_BUCKET).getPublicUrl(bakedPath);

      // 4. Insert/update row
      const payload = {
        client: client.trim(),
        industry: industry.trim(),
        platform: platform || null,
        details: details.trim() || null,
        visible,
        blur_regions: regions as any,
        image_url: pub.publicUrl,
        original_url: originalPath,
      };

      if (isNew) {
        const { error } = await supabase.from("ad_screenshots").insert({
          ...payload,
          sort_order: 9999,
        } as any);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("ad_screenshots").update(payload as any).eq("id", id!);
        if (error) throw error;
      }

      qc.invalidateQueries({ queryKey: ["ad_screenshots"] });
      toast({ title: isNew ? "Screenshot added" : "Screenshot updated" });
      nav("/admin/ad-screenshots");
    } catch (e: any) {
      toast({
        title: "Save failed",
        description: e.message || String(e),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title={isNew ? "New ad screenshot" : "Edit ad screenshot"}>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <Link to="/admin/ad-screenshots" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to list
          </Link>
          <Button onClick={handleSave} disabled={!canSave || saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save & bake blur
          </Button>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-5 items-start">
          {/* Editor / image */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm">Image & blur regions</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              {!sourceUrl ? (
                <div className="rounded-lg border border-dashed py-12 text-center space-y-3">
                  <p className="text-sm text-muted-foreground">Upload a screenshot to start</p>
                  <Button onClick={() => fileRef.current?.click()} className="gap-2">
                    <Upload className="h-4 w-4" /> Upload image
                  </Button>
                </div>
              ) : (
                <>
                  <BlurImageEditor
                    imageSrc={sourceUrl}
                    regions={regions}
                    onChange={setRegions}
                  />
                  <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="gap-2">
                    <Upload className="h-3.5 w-3.5" /> Replace image
                  </Button>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPickFile(f);
                  e.target.value = "";
                }}
              />
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Client</Label>
                <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Cosmetics Store" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Industry</Label>
                <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="E-commerce" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Platform</Label>
                <Select value={platform || "_none"} onValueChange={(v) => setPlatform(v === "_none" ? "" : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_none">None</SelectItem>
                    {PLATFORMS.filter(Boolean).map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Details (revenue, orders, CTR…)</Label>
                <Textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="EGP 6.77M Revenue | 18,639 Orders"
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <div>
                  <p className="text-xs font-semibold">Visible on site</p>
                  <p className="text-[11px] text-muted-foreground">Toggle off to hide without deleting</p>
                </div>
                <Switch checked={visible} onCheckedChange={setVisible} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
