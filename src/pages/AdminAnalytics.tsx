import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, BarChart3, Mail, FileText, Clock, PieChart, Layers } from "lucide-react";

type ByDayPoint = {
  key: string;
  label: string;
  total: number;
  newCount: number;
  handledCount: number;
};

type Kv = { label: string; value: number };

function buildLastNDays(n: number): { keys: string[]; labels: string[] } {
  const keys: string[] = [];
  const labels: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    keys.push(key);
    labels.push(`${key.slice(5, 7)}/${key.slice(8, 10)}`);
  }
  return { keys, labels };
}

function percent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function median(values: number[]) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function formatHours(hours: number) {
  if (!isFinite(hours) || hours <= 0) return "—";
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 48) return `${hours.toFixed(1)}h`;
  return `${(hours / 24).toFixed(1)}d`;
}

function Donut({
  items,
  size = 140,
  title,
}: {
  items: Array<{ label: string; value: number; color: string }>;
  size?: number;
  title?: string;
}) {
  const total = items.reduce((s, it) => s + (it.value || 0), 0);
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let acc = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title ?? "Chart"}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
        />
        {items.map((it) => {
          const frac = total ? it.value / total : 0;
          const dash = frac * c;
          const gap = c - dash;
          const offset = (-acc * c) - c / 4; // start at 12 o'clock
          acc += frac;
          return (
            <circle
              key={it.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={it.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
            />
          );
        })}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-[16px] font-semibold"
        >
          {total}
        </text>
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-[10px]"
        >
          total
        </text>
      </svg>
      <div className="space-y-2">
        {items.map((it) => {
          const p = percent(it.value, total);
          return (
            <div key={it.label} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
              <span className="text-muted-foreground">{it.label}</span>
              <span className="ml-auto tabular-nums font-medium">{it.value}</span>
              <span className="text-muted-foreground tabular-nums">({p}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Sparkline({
  values,
  height = 80,
}: {
  values: number[];
  height?: number;
}) {
  const width = 240;
  const max = Math.max(1, ...values);
  const min = Math.min(0, ...values);
  const range = Math.max(1, max - min);
  const pad = 6;
  const step = values.length > 1 ? (width - pad * 2) / (values.length - 1) : 1;

  const points = values
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (height - pad * 2) * (1 - (v - min) / range);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        points={points}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="6"
        opacity="0.15"
        points={points}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StackedBars({
  points,
}: {
  points: ByDayPoint[];
}) {
  const max = Math.max(1, ...points.map((p) => p.total));
  return (
    <div className="flex items-end gap-2 h-28">
      {points.map((p) => {
        const totalH = Math.round((p.total / max) * 100);
        const handledH = p.total ? Math.round((p.handledCount / p.total) * totalH) : 0;
        const newH = totalH - handledH;
        return (
          <div key={p.key} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <div className="w-full h-24 flex flex-col justify-end overflow-hidden rounded-md bg-muted" title={`${p.label}: ${p.total}`}>
              <div className="w-full" style={{ height: `${handledH}%`, background: "hsl(var(--secondary))" }} />
              <div className="w-full" style={{ height: `${newH}%`, background: "hsl(var(--primary))" }} />
            </div>
            <div className="text-[11px] text-muted-foreground truncate">{p.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminAnalytics() {
  const [rangeDays, setRangeDays] = useState<7 | 30 | 90>(30);

  const overviewQuery = useQuery({
    queryKey: ["adminAnalyticsOverview", rangeDays],
    queryFn: async () => {
      const since = new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000).toISOString();

      const [{ count: submissionsTotal }, { count: submissionsNew }, { count: submissionsHandled }] =
        await Promise.all([
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("handled", false),
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("handled", true),
        ]).then((res) => {
          // normalize errors to 0 (keeps page usable even if migrations/RLS not ready)
          return res.map((r) => ("error" in r && r.error ? { count: 0 } : { count: (r as any).count ?? 0 }));
        }) as any;

      const submissionsRangeRes = await supabase
        .from("contact_submissions")
        .select("id,created_at,handled,handled_at,submission_type")
        .gte("created_at", since)
        .order("created_at", { ascending: true })
        .limit(5000);

      const submissionsRange =
        submissionsRangeRes.error || !submissionsRangeRes.data ? ([] as any[]) : submissionsRangeRes.data;

      const csCounts = await Promise.all([
        supabase.from("case_studies").select("*", { count: "exact", head: true }),
        supabase.from("case_studies").select("*", { count: "exact", head: true }).eq("published", true),
        supabase.from("case_studies").select("*", { count: "exact", head: true }).eq("published", false),
      ]).then((res) =>
        res.map((r) => ("error" in r && r.error ? { count: 0 } : { count: (r as any).count ?? 0 }))
      ) as any;

      const [{ count: caseStudiesTotal }, { count: caseStudiesPublished }, { count: caseStudiesDrafts }] = csCounts;

      const caseStudiesRangeRes = await supabase
        .from("case_studies")
        .select("id,created_at,updated_at,category,published")
        .gte("created_at", since)
        .order("created_at", { ascending: true })
        .limit(5000);

      const caseStudiesRange =
        caseStudiesRangeRes.error || !caseStudiesRangeRes.data ? ([] as any[]) : caseStudiesRangeRes.data;

      return {
        since,
        rangeDays,
        submissionsTotal,
        submissionsNew,
        submissionsHandled,
        submissionsRange,
        caseStudiesTotal,
        caseStudiesPublished,
        caseStudiesDrafts,
        caseStudiesRange,
      };
    },
    staleTime: 15_000,
    refetchInterval: 30_000,
  });

  const submissionsByDay = useMemo(() => {
    const { keys, labels } = buildLastNDays(rangeDays);
    const map = new Map<string, { total: number; newCount: number; handledCount: number }>();
    for (const row of overviewQuery.data?.submissionsRange ?? []) {
      const k = new Date(row.created_at).toISOString().slice(0, 10);
      const cur = map.get(k) ?? { total: 0, newCount: 0, handledCount: 0 };
      cur.total += 1;
      if (row.handled) cur.handledCount += 1;
      else cur.newCount += 1;
      map.set(k, cur);
    }
    const points: ByDayPoint[] = keys.map((k, idx) => ({
      key: k,
      label: labels[idx],
      total: map.get(k)?.total ?? 0,
      newCount: map.get(k)?.newCount ?? 0,
      handledCount: map.get(k)?.handledCount ?? 0,
    }));
    const totals = points.map((p) => p.total);
    return { points, totals };
  }, [overviewQuery.data?.submissionsRange, rangeDays]);

  const handledRate = useMemo(() => {
    const total = overviewQuery.data?.submissionsTotal ?? 0;
    const handled = overviewQuery.data?.submissionsHandled ?? 0;
    return percent(handled, total);
  }, [overviewQuery.data?.submissionsHandled, overviewQuery.data?.submissionsTotal]);

  const rangeStats = useMemo(() => {
    const rows = overviewQuery.data?.submissionsRange ?? [];
    const total = rows.length;
    const newCount = rows.filter((r) => !r.handled).length;
    const handledCount = total - newCount;
    const typeMap = new Map<string, number>();
    const handleHours: number[] = [];
    for (const r of rows) {
      const t = (r.submission_type || "unknown") as string;
      typeMap.set(t, (typeMap.get(t) ?? 0) + 1);
      if (r.handled && r.handled_at) {
        const a = new Date(r.created_at).getTime();
        const b = new Date(r.handled_at).getTime();
        const h = (b - a) / (1000 * 60 * 60);
        if (isFinite(h) && h >= 0) handleHours.push(h);
      }
    }
    const avg = handleHours.length ? handleHours.reduce((s, v) => s + v, 0) / handleHours.length : 0;
    const med = median(handleHours);
    const kv: Kv[] = Array.from(typeMap.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    return {
      total,
      newCount,
      handledCount,
      handledRate: percent(handledCount, total),
      typeBreakdown: kv,
      avgHandleHours: avg,
      medianHandleHours: med,
    };
  }, [overviewQuery.data?.submissionsRange]);

  const caseStudyRangeStats = useMemo(() => {
    const rows = overviewQuery.data?.caseStudiesRange ?? [];
    const total = rows.length;
    const published = rows.filter((r) => !!r.published).length;
    const drafts = total - published;
    const cat = new Map<string, number>();
    const createdMap = new Map<string, number>();
    for (const r of rows) {
      const c = (r.category || "Uncategorized") as string;
      cat.set(c, (cat.get(c) ?? 0) + 1);
      const k = new Date(r.created_at).toISOString().slice(0, 10);
      createdMap.set(k, (createdMap.get(k) ?? 0) + 1);
    }
    const topCategories = Array.from(cat.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
    const { keys, labels } = buildLastNDays(rangeDays);
    const createdSeries = keys.map((k, idx) => ({ key: k, label: labels[idx], value: createdMap.get(k) ?? 0 }));
    const createdValues = createdSeries.map((p) => p.value);
    return {
      total,
      published,
      drafts,
      publishRate: percent(published, total),
      topCategories,
      createdSeries,
      createdValues,
    };
  }, [overviewQuery.data?.caseStudiesRange, rangeDays]);

  return (
    <AdminLayout title="Analytics">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-gray-600 dark:text-gray-300">
            Quick overview of submissions and content performance.
          </p>
        </div>
        <Badge variant="secondary" className="hidden sm:inline-flex">
          <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
          Live
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="text-sm text-muted-foreground mr-2">Range</div>
        {[7, 30, 90].map((d) => (
          <Button
            key={d}
            type="button"
            size="sm"
            variant={rangeDays === d ? "default" : "outline"}
            onClick={() => setRangeDays(d as 7 | 30 | 90)}
            className={rangeDays === d ? "bg-media-purple hover:bg-media-darkpurple text-white" : ""}
          >
            Last {d} days
          </Button>
        ))}
      </div>

      {overviewQuery.isLoading ? (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : overviewQuery.isError ? (
        <div className="text-sm text-red-600">Failed to load analytics.</div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-media-purple" />
                  Submissions (all time)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Total</div>
                    <div className="text-2xl font-semibold">{overviewQuery.data?.submissionsTotal ?? 0}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">New</div>
                    <div className="text-2xl font-semibold">{overviewQuery.data?.submissionsNew ?? 0}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Handled rate: {handledRate}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-media-purple" />
                  Case Studies (all time)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Total</div>
                    <div className="text-xl font-semibold">{overviewQuery.data?.caseStudiesTotal ?? 0}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Published</div>
                    <div className="text-xl font-semibold">{overviewQuery.data?.caseStudiesPublished ?? 0}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Drafts</div>
                    <div className="text-xl font-semibold">{overviewQuery.data?.caseStudiesDrafts ?? 0}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Tip: keep drafts as internal notes, publish only finished stories.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-media-purple" />
                  Submissions trend (last {rangeDays} days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Total (range)</div>
                    <div className="text-2xl font-semibold tabular-nums">{rangeStats.total}</div>
                    <div className="text-xs text-muted-foreground">
                      New: <span className="font-medium tabular-nums">{rangeStats.newCount}</span> • Handled:{" "}
                      <span className="font-medium tabular-nums">{rangeStats.handledCount}</span> • Rate:{" "}
                      <span className="font-medium tabular-nums">{rangeStats.handledRate}%</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Sparkline values={submissionsByDay.totals} />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-sm" style={{ background: "hsl(var(--primary))" }} />
                      New
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-sm" style={{ background: "hsl(var(--secondary))" }} />
                      Handled
                    </div>
                  </div>
                  <StackedBars points={submissionsByDay.points.slice(-clamp(rangeDays, 7, 30))} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-media-purple" />
                  Submission types (last {rangeDays} days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Donut
                  title="Submission types"
                  items={(rangeStats.typeBreakdown.length ? rangeStats.typeBreakdown : [{ label: "none", value: 0 }]).map(
                    (kv, idx) => ({
                      label: kv.label,
                      value: kv.value,
                      color:
                        idx % 3 === 0
                          ? "hsl(var(--primary))"
                          : idx % 3 === 1
                            ? "hsl(var(--secondary))"
                            : "hsl(var(--muted-foreground))",
                    })
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-media-purple" />
                  Handling speed (last {rangeDays} days)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Avg time to handle</div>
                    <div className="text-2xl font-semibold tabular-nums">{formatHours(rangeStats.avgHandleHours)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Median time to handle</div>
                    <div className="text-2xl font-semibold tabular-nums">{formatHours(rangeStats.medianHandleHours)}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  This is calculated from <span className="font-medium">created_at → handled_at</span> for handled submissions.
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-media-purple" />
                  Case studies status (last {rangeDays} days created)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Donut
                  title="Case studies status"
                  items={[
                    { label: "Published", value: caseStudyRangeStats.published, color: "hsl(var(--primary))" },
                    { label: "Drafts", value: caseStudyRangeStats.drafts, color: "hsl(var(--secondary))" },
                  ]}
                />
                <div className="mt-3 text-sm text-muted-foreground">
                  Publish rate (range-created):{" "}
                  <span className="font-medium tabular-nums">{caseStudyRangeStats.publishRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-media-purple" />
                  Categories (last {rangeDays} days created)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {caseStudyRangeStats.topCategories.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No case studies in this range.</div>
                ) : (
                  caseStudyRangeStats.topCategories.map((c) => {
                    const max = Math.max(1, ...caseStudyRangeStats.topCategories.map((x) => x.value));
                    return (
                      <div key={c.label} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-muted-foreground truncate">{c.label}</div>
                          <div className="font-medium tabular-nums">{c.value}</div>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.round((c.value / max) * 100)}%`,
                              background: "hsl(var(--primary))",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

