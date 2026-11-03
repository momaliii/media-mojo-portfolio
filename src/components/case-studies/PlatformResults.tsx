import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import type { PlatformResult } from "@/data/caseStudies";

interface Props {
  results?: PlatformResult[];
  variant: "v1" | "v2" | "v3";
}

const columns = [
  { key: "spend", label: "Spend" },
  { key: "impressions", label: "Impressions" },
  { key: "return", label: "Return" },
] as const;

export default function PlatformResultsSection({ results, variant }: Props) {
  if (!results || results.length === 0) return null;

  if (variant === "v1") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-12"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <BarChart3 className="w-5 h-5 text-media-purple" aria-hidden="true" />
              Results by Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Results broken down by advertising platform">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th scope="col" className="py-3 pr-4 font-semibold">Platform</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Spend</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Impressions</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Return</th>
                    <th scope="col" className="py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.platform} className="border-b border-border/60 last:border-0">
                      <th scope="row" className="py-3 pr-4 font-semibold text-foreground whitespace-nowrap">{r.platform}</th>
                      <td className="py-3 pr-4 text-muted-foreground">{r.spend || "—"}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{r.impressions || "—"}</td>
                      <td className="py-3 pr-4 font-semibold text-media-purple">{r.return || "—"}</td>
                      <td className="py-3 text-muted-foreground">{r.note || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (variant === "v2") {
    return (
      <section className="py-20 md:py-28 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 lg:px-10">
          <p className="eyebrow text-gold mb-10">— Results by platform</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono" aria-label="Results broken down by advertising platform">
              <thead>
                <tr className="text-[0.6875rem] uppercase tracking-[0.22em] text-white/50 border-b border-white/[0.08]">
                  <th scope="col" className="py-4 pr-6 font-medium">Platform</th>
                  {columns.map((c) => (
                    <th key={c.key} scope="col" className="py-4 pr-6 font-medium">{c.label}</th>
                  ))}
                  <th scope="col" className="py-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <motion.tr
                    key={r.platform}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/[0.06] last:border-0"
                  >
                    <th scope="row" className="py-5 pr-6 font-serif text-xl text-white whitespace-nowrap">{r.platform}</th>
                    <td className="py-5 pr-6 text-gold tabular">{r.spend || "—"}</td>
                    <td className="py-5 pr-6 text-white/80 tabular">{r.impressions || "—"}</td>
                    <td className="py-5 pr-6 font-serif text-xl text-gold tabular">{r.return || "—"}</td>
                    <td className="py-5 text-white/50">{r.note || ""}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="v3-shell rounded-[1.7rem] p-6 md:p-8 mt-5">
      <p className="v3-eyebrow v3-cyan mb-5">Results by platform</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label="Results broken down by advertising platform">
          <thead>
            <tr className="v3-eyebrow v3-muted border-b border-white/10">
              <th scope="col" className="py-3 pr-4 font-medium">Platform</th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="py-3 pr-4 font-medium">{c.label}</th>
              ))}
              <th scope="col" className="py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.platform} className="border-b border-white/[0.06] last:border-0">
                <th scope="row" className="py-4 pr-4 font-bold text-[var(--v3-text)] whitespace-nowrap">{r.platform}</th>
                <td className="py-4 pr-4 v3-soft">{r.spend || "—"}</td>
                <td className="py-4 pr-4 v3-soft">{r.impressions || "—"}</td>
                <td className="py-4 pr-4 font-bold v3-lime">{r.return || "—"}</td>
                <td className="py-4 text-sm v3-soft">{r.note || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
