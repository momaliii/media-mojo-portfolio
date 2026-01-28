import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Search, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SubmissionRow = {
  id: string;
  created_at: string;
  updated_at: string;
  submission_type: string;
  name: string | null;
  email: string;
  subject: string | null;
  message: string | null;
  handled?: boolean;
  handled_at?: string | null;
};

function toCsv(rows: SubmissionRow[]) {
  const header = ["created_at", "type", "name", "email", "subject", "message"];
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return `"${s.replace(/"/g, '""')}"`;
  };

  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        r.created_at,
        r.submission_type,
        r.name ?? "",
        r.email ?? "",
        r.subject ?? "",
        (r.message ?? "").replace(/\r?\n/g, "\\n"),
      ]
        .map(escape)
        .join(",")
    ),
  ];
  return lines.join("\n");
}

export default function AdminSubmissions() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "contact" | "newsletter">("all");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SubmissionRow | null>(null);
  const qc = useQueryClient();

  const submissionsQuery = useQuery({
    queryKey: ["adminSubmissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as SubmissionRow[];
    },
    staleTime: 15_000,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (submissionsQuery.data ?? []).filter((s) => {
      const typeOk = typeFilter === "all" ? true : s.submission_type === typeFilter;
      if (!typeOk) return false;
      if (!q) return true;
      return (
        (s.email || "").toLowerCase().includes(q) ||
        (s.name || "").toLowerCase().includes(q) ||
        (s.subject || "").toLowerCase().includes(q) ||
        (s.message || "").toLowerCase().includes(q)
      );
    });
  }, [submissionsQuery.data, query, typeFilter]);

  const onExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact_submissions_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "CSV downloaded." });
  };

  const setHandledMutation = useMutation({
    mutationFn: async ({ id, handled }: { id: string; handled: boolean }) => {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ handled, handled_at: handled ? new Date().toISOString() : null })
        .eq("id", id);
      if (error) throw error;
      return true;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["adminSubmissions"] });
      toast({ title: "Updated", description: "Submission status updated." });
    },
    onError: (e: any) => {
      toast({ title: "Update failed", description: e.message, variant: "destructive" });
    },
  });

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: `${label} copied to clipboard.` });
  };

  return (
    <AdminLayout title="Contact Submissions">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              View messages submitted from your site (admin-only).
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onExport}
            disabled={filtered.length === 0 || submissionsQuery.isLoading}
          >
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="text-lg">Inbox</CardTitle>
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search email, name, subject, message…"
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={typeFilter === "all" ? "default" : "outline"}
                onClick={() => setTypeFilter("all")}
                className={typeFilter === "all" ? "bg-media-purple hover:bg-media-darkpurple text-white" : ""}
              >
                All
              </Button>
              <Button
                type="button"
                variant={typeFilter === "contact" ? "default" : "outline"}
                onClick={() => setTypeFilter("contact")}
                className={typeFilter === "contact" ? "bg-media-purple hover:bg-media-darkpurple text-white" : ""}
              >
                Contact
              </Button>
              <Button
                type="button"
                variant={typeFilter === "newsletter" ? "default" : "outline"}
                onClick={() => setTypeFilter("newsletter")}
                className={typeFilter === "newsletter" ? "bg-media-purple hover:bg-media-darkpurple text-white" : ""}
              >
                Newsletter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            {submissionsQuery.isLoading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            ) : submissionsQuery.isError ? (
              <div className="text-sm text-red-600">
                Failed to load submissions. {(submissionsQuery.error as any)?.message ?? ""}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                No submissions found.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow
                      key={s.id}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelected(s);
                        setOpen(true);
                      }}
                    >
                      <TableCell className="whitespace-nowrap">
                        {new Date(s.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.submission_type === "newsletter" ? "secondary" : "default"}>
                          {s.submission_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[160px] truncate">
                        {s.name || "—"}
                      </TableCell>
                      <TableCell className="max-w-[220px] truncate">{s.email}</TableCell>
                      <TableCell className="max-w-[220px] truncate">{s.subject || "—"}</TableCell>
                      <TableCell className="max-w-[420px]">
                        <div className="line-clamp-3 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                          {s.message || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.handled ? "secondary" : "default"}>
                          {s.handled ? "Handled" : "New"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Submission details</SheetTitle>
            <SheetDescription>
              {selected ? new Date(selected.created_at).toLocaleString() : ""}
            </SheetDescription>
          </SheetHeader>

          {selected && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Badge variant={selected.handled ? "secondary" : "default"}>
                  {selected.handled ? "Handled" : "New"}
                </Badge>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setHandledMutation.mutate({ id: selected.id, handled: !selected.handled })
                  }
                  disabled={setHandledMutation.isPending}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark {selected.handled ? "as New" : "as Handled"}
                </Button>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">Email</div>
                <div className="flex items-center justify-between gap-2">
                  <a className="font-medium underline" href={`mailto:${selected.email}`}>
                    {selected.email}
                  </a>
                  <Button type="button" variant="outline" size="sm" onClick={() => copy(selected.email, "Email")}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">Name</div>
                <div className="font-medium">{selected.name || "—"}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">Subject</div>
                <div className="font-medium">{selected.subject || "—"}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">Message</div>
                <div className="whitespace-pre-wrap rounded-xl border p-3 text-sm">
                  {selected.message || "—"}
                </div>
                {selected.message && (
                  <div className="flex justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={() => copy(selected.message || "", "Message")}>
                      <Copy className="h-4 w-4 mr-2" /> Copy message
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
}

