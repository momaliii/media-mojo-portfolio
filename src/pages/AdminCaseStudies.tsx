import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Save, Trash2, Upload, Image as ImageIcon, Sparkles, Monitor, Smartphone } from "lucide-react";
import { caseStudies as localCaseStudies } from "@/data/caseStudies";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";

const metricSchema = z.object({
  label: z.string().min(1, "Metric label required"),
  value: z.string().min(1, "Metric value required"),
});

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  client: z.string().min(1),
  industry: z.string().optional(),
  description: z.string().min(10),
  challenge: z.string().optional(),
  strategy: z.string().optional(),
  results: z.string().optional(),
  budget_range: z.string().optional(),
  published: z.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).default(0),
  screenshot: z.string().optional(),
  additional_screenshots_text: z.string().optional(),
  platforms_text: z.string().optional(),
  tools_text: z.string().optional(),
  metrics: z.array(metricSchema).default([]),
});

type FormValues = z.infer<typeof formSchema>;

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitList(text?: string) {
  if (!text) return [];
  return text
    .split(/[\n,]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminCaseStudies() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiDetails, setAiDetails] = useState("");
  const [aiContext, setAiContext] = useState({ category: "", client: "", industry: "" });
  const [aiImageUrls, setAiImageUrls] = useState<string[]>([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<"edit" | "preview">("edit");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const BUCKET = "case-study-assets";
  const mainFileRef = useRef<HTMLInputElement | null>(null);
  const additionalFilesRef = useRef<HTMLInputElement | null>(null);
  const aiImageRef = useRef<HTMLInputElement | null>(null);

  const listQuery = useQuery({
    queryKey: ["adminCaseStudies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return (listQuery.data ?? []).find((c) => c.id === selectedId) ?? null;
  }, [listQuery.data, selectedId]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "e-commerce",
      client: "",
      published: true,
      sort_order: 0,
      metrics: [{ label: "ROAS", value: "8x+" }],
    },
    mode: "onBlur",
  });

  const metricsArray = useFieldArray({
    control: form.control,
    name: "metrics",
  });

  // Live preview values (updates as you type)
  const preview = form.watch();

  // Load selected record into form
  useEffect(() => {
    if (!selected) return;
    form.reset({
      id: selected.id,
      title: selected.title,
      slug: selected.slug,
      category: selected.category,
      client: selected.client,
      industry: selected.industry ?? "",
      description: selected.description,
      challenge: selected.challenge ?? "",
      strategy: selected.strategy ?? "",
      results: selected.results ?? "",
      budget_range: selected.budget_range ?? "",
      published: selected.published,
      sort_order: selected.sort_order ?? 0,
      screenshot: selected.screenshot ?? "",
      additional_screenshots_text: (selected.additional_screenshots ?? []).join("\n"),
      platforms_text: (selected.platforms ?? []).join(", "),
      tools_text: (selected.tools ?? []).join(", "),
      metrics: (Array.isArray(selected.metrics) ? selected.metrics : []) as any,
    });
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const upsertMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        id: values.id,
        title: values.title,
        slug: values.slug,
        category: values.category,
        client: values.client,
        industry: values.industry || null,
        description: values.description,
        challenge: values.challenge || null,
        strategy: values.strategy || null,
        results: values.results || null,
        budget_range: values.budget_range || null,
        published: values.published,
        sort_order: values.sort_order,
        screenshot: values.screenshot || null,
        additional_screenshots: splitList(values.additional_screenshots_text),
        platforms: splitList(values.platforms_text),
        tools: splitList(values.tools_text),
        metrics: values.metrics,
      };

      const { data, error } = await supabase
        .from("case_studies")
        .upsert(payload, { onConflict: "slug" })
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: async (saved) => {
      await qc.invalidateQueries({ queryKey: ["adminCaseStudies"] });
      setSelectedId(saved.id);
      toast({ title: "Saved", description: "Case study updated." });
    },
    onError: (e: any) => {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;
      return true;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["adminCaseStudies"] });
      setSelectedId(null);
      form.reset();
      toast({ title: "Deleted", description: "Case study removed." });
    },
    onError: (e: any) => {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    },
  });

  const importMutation = useMutation({
    mutationFn: async () => {
      const titleToSlug = (title: string) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const payload = localCaseStudies.map((cs, idx) => ({
        slug: cs.slug || titleToSlug(cs.title),
        title: cs.title,
        category: cs.category,
        client: cs.client,
        industry: cs.industry ?? null,
        description: cs.description,
        challenge: cs.challenge ?? null,
        strategy: cs.strategy ?? null,
        results: cs.results ?? null,
        budget_range: cs.budgetRange ?? null,
        platforms: cs.platforms ?? [],
        tools: cs.tools ?? [],
        screenshot: cs.screenshot ?? null,
        additional_screenshots: cs.additionalScreenshots ?? [],
        metrics: (cs.metrics ?? []) as unknown as Json,
        published: true,
        sort_order: idx,
      }));

      const { error } = await supabase
        .from("case_studies")
        .upsert(payload, { onConflict: "slug" });

      if (error) throw error;
      return true;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["adminCaseStudies"] });
      toast({ title: "Imported", description: "Local case studies imported into Supabase." });
    },
    onError: (e: any) => {
      toast({ title: "Import failed", description: e.message, variant: "destructive" });
    },
  });

  const onNew = () => {
    setSelectedId(null);
    form.reset({
      title: "",
      slug: "",
      category: "e-commerce",
      client: "",
      industry: "",
      description: "",
      challenge: "",
      strategy: "",
      results: "",
      budget_range: "",
      published: true,
      sort_order: 0,
      screenshot: "",
      additional_screenshots_text: "",
      platforms_text: "",
      tools_text: "",
      metrics: [],
    });
  };

  const uploadFiles = async (files: FileList | File[], folder: string) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return [];

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of fileArray) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "png";
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${folder}/${Date.now()}_${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type || undefined,
          });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        uploadedUrls.push(data.publicUrl);
      }
      return uploadedUrls;
    } finally {
      setUploading(false);
    }
  };

  const generateAIMutation = useMutation({
    mutationFn: async () => {
      if (!aiDetails.trim() || aiDetails.trim().length < 10) {
        throw new Error("Please provide at least 10 characters of campaign details");
      }

      const contextFields = {
        ...(aiContext.category ? { category: aiContext.category } : {}),
        ...(aiContext.client ? { client: aiContext.client } : {}),
        ...(aiContext.industry ? { industry: aiContext.industry } : {}),
      };

      const { data, error } = await supabase.functions.invoke('generate-case-study', {
        body: {
          details: aiDetails,
          contextFields: Object.keys(contextFields).length > 0 ? contextFields : undefined,
          imageUrls: aiImageUrls.length > 0 ? aiImageUrls : undefined,
        },
      });

      if (error) throw error;
      if (!data) throw new Error("No data returned from AI");

      return data;
    },
    onSuccess: (aiOutput) => {
      // Populate form with AI-generated content
      form.reset({
        title: aiOutput.title || "",
        slug: aiOutput.slug || slugify(aiOutput.title || ""),
        category: aiOutput.category || "e-commerce",
        client: aiOutput.client || "",
        industry: aiOutput.industry || "",
        description: aiOutput.description || "",
        challenge: aiOutput.challenge || "",
        strategy: aiOutput.strategy || "",
        results: aiOutput.results || "",
        budget_range: "",
        published: false, // Draft by default
        sort_order: 0,
        screenshot: aiOutput.screenshot || "",
        additional_screenshots_text: (aiOutput.additional_screenshots || []).join("\n"),
        platforms_text: (aiOutput.platforms || []).join(", "),
        tools_text: (aiOutput.tools || []).join(", "),
        metrics: (aiOutput.metrics || []) as any,
      });

      setSelectedId(null); // Clear selection to show new draft
      setAiOpen(false);
      toast({
        title: "AI generation complete",
        description: "Case study draft created. Review and edit before publishing.",
      });
    },
    onError: (e: any) => {
      toast({
        title: "AI generation failed",
        description: e.message || "Failed to generate case study",
        variant: "destructive",
      });
    },
  });

  return (
    <AdminLayout title="Case Studies">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-gray-600 dark:text-gray-300">
            Create, edit, preview and publish case studies shown on the site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => importMutation.mutate()}
            disabled={importMutation.isPending}
          >
            {importMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing…
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" /> Import existing
              </>
            )}
          </Button>
          <Button onClick={onNew} className="bg-media-purple hover:bg-media-darkpurple text-white">
            <Plus className="h-4 w-4 mr-2" /> New
          </Button>
        </div>
      </div>

        {/* AI Generation Panel */}
        <Collapsible open={aiOpen} onOpenChange={setAiOpen} className="mb-6">
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-media-purple" />
                    Generate Case Study with AI
                  </CardTitle>
                  <Badge variant="outline">Beta</Badge>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Details</label>
                  <Textarea
                    value={aiDetails}
                    onChange={(e) => setAiDetails(e.target.value)}
                    placeholder="Describe your campaign: goals, target audience, budget, platforms used, key results, challenges faced, strategies implemented..."
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500">
                    Provide as much detail as possible. Include metrics, platforms, tools, and outcomes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category (optional)</label>
                    <Input
                      value={aiContext.category}
                      onChange={(e) => setAiContext({ ...aiContext, category: e.target.value })}
                      placeholder="e-commerce, b2b, f&b..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client Name (optional)</label>
                    <Input
                      value={aiContext.client}
                      onChange={(e) => setAiContext({ ...aiContext, client: e.target.value })}
                      placeholder="Leave empty to anonymize"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industry (optional)</label>
                    <Input
                      value={aiContext.industry}
                      onChange={(e) => setAiContext({ ...aiContext, industry: e.target.value })}
                      placeholder="Beauty & Cosmetics..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Screenshots (optional)</label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={aiImageRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (!files || files.length === 0) return;
                        try {
                          const urls = await uploadFiles(files, "ai-generation");
                          setAiImageUrls([...aiImageUrls, ...urls]);
                          toast({ title: "Uploaded", description: `Added ${urls.length} image(s) for AI analysis.` });
                        } catch (err: any) {
                          toast({ title: "Upload failed", description: err.message, variant: "destructive" });
                        } finally {
                          e.target.value = "";
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => aiImageRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading…
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-4 w-4 mr-2" /> Add Images
                        </>
                      )}
                    </Button>
                    {aiImageUrls.length > 0 && (
                      <span className="text-sm text-gray-600">
                        {aiImageUrls.length} image(s) ready
                      </span>
                    )}
                  </div>
                  {aiImageUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {aiImageUrls.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img src={url} alt={`Screenshot ${idx + 1}`} className="h-16 w-16 object-cover rounded border" />
                          <button
                            type="button"
                            onClick={() => setAiImageUrls(aiImageUrls.filter((_, i) => i !== idx))}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setAiDetails("");
                      setAiContext({ category: "", client: "", industry: "" });
                      setAiImageUrls([]);
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    type="button"
                    onClick={() => generateAIMutation.mutate()}
                    disabled={generateAIMutation.isPending || !aiDetails.trim() || aiDetails.trim().length < 10}
                    className="bg-media-purple hover:bg-media-darkpurple text-white"
                  >
                    {generateAIMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" /> Generate Draft
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">All case studies</CardTitle>
            </CardHeader>
            <CardContent>
              {listQuery.isLoading ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                </div>
              ) : listQuery.isError ? (
                <div className="text-sm text-red-600">
                  Failed to load case studies. {(listQuery.error as any)?.message ?? ""}
                </div>
              ) : (
                <div className="space-y-2">
                  {(listQuery.data ?? []).length === 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      No case studies yet in Supabase. Click <span className="font-medium">Import existing</span> to bring in the ones from your codebase.
                    </div>
                  )}
                  {(listQuery.data ?? []).map((cs) => (
                    <button
                      key={cs.id}
                      onClick={() => setSelectedId(cs.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors ${
                        selectedId === cs.id
                          ? "border-media-purple bg-media-purple/5"
                          : "border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                          {cs.title}
                        </div>
                        <Badge variant={cs.published ? "default" : "secondary"}>
                          {cs.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        <span className="uppercase">{cs.category}</span>
                        <span>•</span>
                        <span className="line-clamp-1">{cs.client}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <Tabs value={editorTab} onValueChange={(v) => setEditorTab(v as "edit" | "preview")}>
              <CardHeader className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-lg">
                    {selected ? "Edit case study" : "Create a new case study"}
                  </CardTitle>
                  <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use <span className="font-medium">Preview</span> to see changes live before publishing.
                </p>
              </CardHeader>
              <CardContent>
                <TabsContent value="edit">
                  <form
                    onSubmit={form.handleSubmit((v) => upsertMutation.mutate(v))}
                    className="space-y-5"
                  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      {...form.register("title")}
                      onChange={(e) => {
                        form.setValue("title", e.target.value);
                        if (!form.getValues("slug")) {
                          form.setValue("slug", slugify(e.target.value));
                        }
                      }}
                      placeholder="Beauty Brand E-commerce Success"
                    />
                    {form.formState.errors.title && (
                      <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      {...form.register("slug")}
                      placeholder="beauty-brand-ecommerce-success"
                    />
                    {form.formState.errors.slug && (
                      <p className="text-xs text-red-500">{form.formState.errors.slug.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input {...form.register("category")} placeholder="e-commerce / b2b / f&b …" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Client</label>
                    <Input {...form.register("client")} placeholder="Premium Cosmetics Brand" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industry (optional)</label>
                    <Input {...form.register("industry")} placeholder="Beauty & Cosmetics" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget range (optional)</label>
                    <Input {...form.register("budget_range")} placeholder="small / medium / large" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort order</label>
                    <Input type="number" {...form.register("sort_order")} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Published</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.watch("published")}
                        onChange={(e) => form.setValue("published", e.target.checked)}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {form.watch("published") ? "Visible on site" : "Hidden (draft)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea {...form.register("description")} className="min-h-[100px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Challenge (optional)</label>
                    <Textarea {...form.register("challenge")} className="min-h-[90px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Strategy (optional)</label>
                    <Textarea {...form.register("strategy")} className="min-h-[90px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Results (optional)</label>
                    <Textarea {...form.register("results")} className="min-h-[90px]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platforms (comma or newline)</label>
                    <Textarea {...form.register("platforms_text")} placeholder="facebook, instagram, tiktok" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tools (comma or newline)</label>
                    <Textarea {...form.register("tools_text")} placeholder="Meta Ads Manager, Google Ads" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Main screenshot URL (optional)</label>
                    <div className="flex gap-2">
                      <Input {...form.register("screenshot")} placeholder="/lovable-uploads/... or https://..." />
                      <input
                        ref={mainFileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          try {
                            const [url] = await uploadFiles(files, "main");
                            if (url) {
                              form.setValue("screenshot", url);
                              toast({ title: "Uploaded", description: "Main screenshot uploaded." });
                            }
                          } catch (err: any) {
                            toast({ title: "Upload failed", description: err.message, variant: "destructive" });
                          } finally {
                            e.target.value = "";
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploading}
                        onClick={() => mainFileRef.current?.click()}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading…
                          </>
                        ) : (
                          <>
                            <ImageIcon className="h-4 w-4 mr-2" /> Upload
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional screenshots (newline)</label>
                    <div className="space-y-2">
                      <Textarea {...form.register("additional_screenshots_text")} placeholder="/lovable-uploads/a.png\n/lovable-uploads/b.png" />
                      <div className="flex justify-end">
                        <input
                          ref={additionalFilesRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          disabled={uploading}
                          onChange={async (e) => {
                            const files = e.target.files;
                            if (!files || files.length === 0) return;
                            try {
                              const urls = await uploadFiles(files, "additional");
                              const existing = form.getValues("additional_screenshots_text") || "";
                              const appended = [existing.trim(), ...urls].filter(Boolean).join("\n");
                              form.setValue("additional_screenshots_text", appended);
                              toast({ title: "Uploaded", description: `Uploaded ${urls.length} image(s).` });
                            } catch (err: any) {
                              toast({ title: "Upload failed", description: err.message, variant: "destructive" });
                            } finally {
                              e.target.value = "";
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploading}
                          onClick={() => additionalFilesRef.current?.click()}
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading…
                            </>
                          ) : (
                            <>
                              <ImageIcon className="h-4 w-4 mr-2" /> Upload images
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Uploads go to Supabase Storage bucket <span className="font-medium">{BUCKET}</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Metrics</label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => metricsArray.append({ label: "", value: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add metric
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {metricsArray.fields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-xs text-gray-500">Label</label>
                          <Input {...form.register(`metrics.${index}.label` as const)} />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-xs text-gray-500">Value</label>
                          <Input {...form.register(`metrics.${index}.value` as const)} />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => metricsArray.remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  {selected?.id && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(selected.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-media-purple hover:bg-media-darkpurple text-white"
                    disabled={upsertMutation.isPending}
                  >
                    {upsertMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving…
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" /> Save
                      </>
                    )}
                  </Button>
                </div>
                  </form>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={preview.published ? "default" : "secondary"}>
                        {preview.published ? "Published" : "Draft preview"}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Updates live as you edit.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant={previewDevice === "desktop" ? "default" : "outline"}
                        onClick={() => setPreviewDevice("desktop")}
                        className={previewDevice === "desktop" ? "bg-media-purple hover:bg-media-darkpurple text-white" : ""}
                      >
                        <Monitor className="h-4 w-4 mr-2" /> Desktop
                      </Button>
                      <Button
                        type="button"
                        variant={previewDevice === "mobile" ? "default" : "outline"}
                        onClick={() => setPreviewDevice("mobile")}
                        className={previewDevice === "mobile" ? "bg-media-purple hover:bg-media-darkpurple text-white" : ""}
                      >
                        <Smartphone className="h-4 w-4 mr-2" /> Mobile
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`mx-auto rounded-2xl border bg-white dark:bg-gray-950 overflow-hidden ${
                      previewDevice === "mobile" ? "max-w-[390px]" : "w-full"
                    }`}
                  >
                    <div className="p-6 md:p-8 space-y-6">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {preview.category && (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                              {preview.category}
                            </Badge>
                          )}
                          {preview.industry && <Badge variant="outline">{preview.industry}</Badge>}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                          {preview.title || "Untitled case study"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {preview.description || "Add a description to see it here."}
                        </p>

                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700 dark:text-gray-200">Client:</span>{" "}
                          {preview.client || "—"}
                        </div>
                      </div>

                      {/* Key metrics */}
                      {Array.isArray(preview.metrics) && preview.metrics.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Key results
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {preview.metrics.slice(0, 6).map((m: any, idx: number) => (
                              <div
                                key={idx}
                                className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center"
                              >
                                <div className="text-xl font-bold text-media-purple">
                                  {m?.value || "—"}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {m?.label || "Metric"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Narrative sections */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Challenge
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                            {preview.challenge || "Add the challenge to preview it here."}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Strategy
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                            {preview.strategy || "Add the strategy to preview it here."}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Results
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                            {preview.results || "Add results to preview it here."}
                          </p>
                        </div>
                      </div>

                      {/* Platforms & tools */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Platforms</h4>
                          <div className="flex flex-wrap gap-2">
                            {splitList(preview.platforms_text).length > 0
                              ? splitList(preview.platforms_text).map((p) => (
                                  <Badge key={p} variant="secondary" className="text-xs">
                                    {p}
                                  </Badge>
                                ))
                              : <span className="text-sm text-gray-500">—</span>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Tools</h4>
                          <div className="flex flex-wrap gap-2">
                            {splitList(preview.tools_text).length > 0
                              ? splitList(preview.tools_text).map((t) => (
                                  <Badge key={t} variant="secondary" className="text-xs">
                                    {t}
                                  </Badge>
                                ))
                              : <span className="text-sm text-gray-500">—</span>}
                          </div>
                        </div>
                      </div>

                      {/* Images */}
                      {(preview.screenshot || splitList(preview.additional_screenshots_text).length > 0) && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Gallery
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[preview.screenshot, ...splitList(preview.additional_screenshots_text)]
                              .filter(Boolean)
                              .slice(0, 9)
                              .map((url, idx) => (
                                <img
                                  key={`${url}-${idx}`}
                                  src={url as string}
                                  alt={`Preview screenshot ${idx + 1}`}
                                  className="w-full h-28 object-cover rounded-xl border border-gray-200 dark:border-gray-800"
                                  loading="lazy"
                                />
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
    </AdminLayout>
  );
}

