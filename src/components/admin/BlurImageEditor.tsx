import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Eraser, MousePointer2, Square, Trash2, Undo2 } from "lucide-react";
import type { BlurRegion } from "@/hooks/use-ad-screenshots";

type Tool = "draw" | "select";

interface Props {
  imageSrc: string;
  regions: BlurRegion[];
  onChange: (next: BlurRegion[]) => void;
}

/**
 * Interactive blur region editor.
 * - "Draw" mode: click-and-drag on the image to add a rectangular blur region
 * - "Select" mode: click a region to select; drag its body to move
 * - Each region stores normalized coordinates (0..1) so it survives resizing
 * - Blur strength is in pixel radius applied at full image resolution on save
 */
export const BlurImageEditor: React.FC<Props> = ({ imageSrc, regions, onChange }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [tool, setTool] = useState<Tool>("draw");
  const [history, setHistory] = useState<BlurRegion[][]>([]);
  const [draft, setDraft] = useState<BlurRegion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const dragRef = useRef<{
    mode: "new" | "move";
    startX: number;
    startY: number;
    origin?: BlurRegion;
    index?: number;
  } | null>(null);

  const pushHistory = useCallback(
    (next: BlurRegion[]) => {
      setHistory((h) => [...h.slice(-19), regions]);
      onChange(next);
    },
    [regions, onChange]
  );

  const recalcSize = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    setImgSize({ w: el.clientWidth, h: el.clientHeight });
  }, []);

  useEffect(() => {
    const onResize = () => recalcSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalcSize]);

  const localFromEvent = (e: React.PointerEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect || !imgSize.w || !imgSize.h) return null;
    const x = (e.clientX - rect.left) / imgSize.w;
    const y = (e.clientY - rect.top) / imgSize.h;
    return { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const p = localFromEvent(e);
    if (!p) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (tool === "draw") {
      setSelected(null);
      dragRef.current = { mode: "new", startX: p.x, startY: p.y };
      setDraft({ x: p.x, y: p.y, w: 0, h: 0, blur: 18 });
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = localFromEvent(e);
    if (!p) return;
    const d = dragRef.current;
    if (!d) return;
    if (d.mode === "new") {
      setDraft({
        x: Math.min(d.startX, p.x),
        y: Math.min(d.startY, p.y),
        w: Math.abs(p.x - d.startX),
        h: Math.abs(p.y - d.startY),
        blur: 18,
      });
    } else if (d.mode === "move" && d.origin && d.index != null) {
      const dx = p.x - d.startX;
      const dy = p.y - d.startY;
      const next = regions.slice();
      const nx = Math.max(0, Math.min(1 - d.origin.w, d.origin.x + dx));
      const ny = Math.max(0, Math.min(1 - d.origin.h, d.origin.y + dy));
      next[d.index] = { ...d.origin, x: nx, y: ny };
      onChange(next);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (d?.mode === "new" && draft) {
      if (draft.w > 0.005 && draft.h > 0.005) {
        pushHistory([...regions, draft]);
        setSelected(regions.length);
      }
      setDraft(null);
    }
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const updateRegion = (idx: number, patch: Partial<BlurRegion>) => {
    const next = regions.slice();
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  const removeRegion = (idx: number) => {
    pushHistory(regions.filter((_, i) => i !== idx));
    setSelected(null);
  };

  const undo = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      onChange(prev);
      return h.slice(0, -1);
    });
  };

  const reset = () => {
    if (regions.length === 0) return;
    if (!confirm("Remove all blur regions?")) return;
    pushHistory([]);
    setSelected(null);
  };

  const selectedRegion = selected != null ? regions[selected] : null;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card px-3 py-2">
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={tool === "draw" ? "default" : "outline"}
            onClick={() => setTool("draw")}
            className="h-8 gap-1.5"
          >
            <Square className="h-3.5 w-3.5" /> Draw blur
          </Button>
          <Button
            size="sm"
            variant={tool === "select" ? "default" : "outline"}
            onClick={() => setTool("select")}
            className="h-8 gap-1.5"
          >
            <MousePointer2 className="h-3.5 w-3.5" /> Select
          </Button>
        </div>
        <div className="h-6 w-px bg-border" />
        <Button size="sm" variant="ghost" onClick={undo} disabled={history.length === 0} className="h-8 gap-1.5">
          <Undo2 className="h-3.5 w-3.5" /> Undo
        </Button>
        <Button size="sm" variant="ghost" onClick={reset} disabled={regions.length === 0} className="h-8 gap-1.5 text-destructive">
          <Eraser className="h-3.5 w-3.5" /> Clear all
        </Button>
        <div className="ml-auto text-[11px] text-muted-foreground">
          {regions.length} region{regions.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={wrapperRef}
        className="relative inline-block w-full select-none rounded-lg border bg-[hsl(var(--muted))] overflow-hidden"
        style={{ touchAction: "none", cursor: tool === "draw" ? "crosshair" : "default" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Screenshot being edited"
          draggable={false}
          onLoad={recalcSize}
          className="block w-full h-auto pointer-events-none"
          crossOrigin="anonymous"
        />

        {/* Existing regions */}
        {imgSize.w > 0 &&
          regions.map((r, i) => (
            <div
              key={i}
              onPointerDown={(e) => {
                if (tool !== "select") return;
                e.stopPropagation();
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
                const p = localFromEvent(e);
                if (!p) return;
                setSelected(i);
                dragRef.current = {
                  mode: "move",
                  startX: p.x,
                  startY: p.y,
                  origin: r,
                  index: i,
                };
              }}
              className={`absolute border-2 ${
                selected === i
                  ? "border-primary shadow-[0_0_0_2px_rgba(0,0,0,0.4)]"
                  : "border-white/80"
              } bg-white/10 backdrop-blur-[2px]`}
              style={{
                left: `${r.x * 100}%`,
                top: `${r.y * 100}%`,
                width: `${r.w * 100}%`,
                height: `${r.h * 100}%`,
                cursor: tool === "select" ? "move" : "default",
                backdropFilter: `blur(${Math.max(3, r.blur / 3)}px)`,
                WebkitBackdropFilter: `blur(${Math.max(3, r.blur / 3)}px)`,
              }}
            >
              <span className="absolute -top-5 left-0 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-white">
                #{i + 1} · {r.blur}px
              </span>
            </div>
          ))}

        {/* Live draft */}
        {draft && (
          <div
            className="absolute border-2 border-dashed border-primary bg-primary/10 pointer-events-none"
            style={{
              left: `${draft.x * 100}%`,
              top: `${draft.y * 100}%`,
              width: `${draft.w * 100}%`,
              height: `${draft.h * 100}%`,
            }}
          />
        )}
      </div>

      {/* Selected region controls */}
      {selectedRegion && selected != null && (
        <div className="rounded-lg border bg-card p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Region #{selected + 1}
            </span>
            <Button size="sm" variant="ghost" onClick={() => removeRegion(selected)} className="h-7 gap-1 text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">Blur intensity</label>
              <span className="text-xs font-mono">{selectedRegion.blur}px</span>
            </div>
            <Slider
              value={[selectedRegion.blur]}
              min={4}
              max={80}
              step={1}
              onValueChange={(v) => updateRegion(selected, { blur: v[0] })}
            />
          </div>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground">
        Tip: blur is baked into the saved image so it can't be removed by inspecting the page.
        The original is kept privately so you can re-edit regions later.
      </p>
    </div>
  );
};

/**
 * Render the original image onto a canvas and bake blur into the listed regions,
 * then return the result as a Blob (PNG).
 */
export async function bakeBlurredImage(
  imageSrc: string,
  regions: BlurRegion[]
): Promise<Blob> {
  const img = await loadImage(imageSrc);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  // Draw original
  ctx.drawImage(img, 0, 0, w, h);

  // Apply blur per region by re-drawing a clipped, blurred copy
  for (const r of regions) {
    if (r.w <= 0 || r.h <= 0) continue;
    const rx = Math.round(r.x * w);
    const ry = Math.round(r.y * h);
    const rw = Math.round(r.w * w);
    const rh = Math.round(r.h * h);
    if (rw <= 0 || rh <= 0) continue;

    ctx.save();
    ctx.beginPath();
    ctx.rect(rx, ry, rw, rh);
    ctx.clip();
    ctx.filter = `blur(${Math.max(1, Math.round(r.blur))}px)`;
    // Re-draw the whole image; blur is applied to the clipped region only
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
  }

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode image"))),
      "image/png"
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image failed to load: ${src}`));
    img.src = src;
  });
}
