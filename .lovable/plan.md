## What you'll get

A new **Ad Screenshots** section in the admin dashboard where you can:

1. Upload new ad screenshots (or edit existing ones)
2. Fill in metadata (industry, client, platform, details, visibility, sort order)
3. Open a **Blur Editor** — drag rectangles directly on the image to blur sensitive areas (client names, $ amounts, account IDs), adjust blur intensity per region, undo, then save
4. Reorder, hide/show, or delete screenshots
5. The `/v3` Ad Campaign Showcase reads from the database instead of the static file

## Why baked-in blur (recommended)

You asked which is best. **Baked into the image on save** is the right choice here:

- Blur is applied to actual image pixels and saved as the new file
- Cannot be bypassed by inspecting the DOM, disabling CSS, or downloading the original
- The original image is also kept (admin-only) so you can re-edit blur regions later by regenerating from the original
- Watermarks stay as an overlay on top (already in place)

CSS overlay blur is fast to author but trivial to defeat (anyone can delete the overlay div in devtools and screenshot the raw image). For screenshots whose whole point is protecting client data, baking wins.

## How the blur editor works

```text
┌────────────────────────────────────────┐
│  [screenshot preview with overlays]    │
│                                        │
│   ┌──────┐                             │
│   │blur 1│         ┌─────────┐         │
│   └──────┘         │ blur 2  │         │
│                    └─────────┘         │
│                                        │
└────────────────────────────────────────┘
 Tool: [Draw] [Move] [Delete]
 Intensity: ●────────○──── 12px
 [Undo] [Reset]            [Save]
```

- Click-drag on the image to create a rectangular blur region
- Click a region to select it, adjust its intensity, or delete it
- Regions are stored as normalized coords (`{x, y, w, h, blur}` in 0–1) so they survive resizes
- On **Save**, a canvas renders the original at full resolution, applies `ctx.filter = blur(Npx)` clipped to each region, and uploads the result as the new public image. The blur regions JSON is also saved so you can re-edit later.

## Pages & routes

- `/admin/ad-screenshots` — list/grid
- `/admin/ad-screenshots/new` — upload + edit
- `/admin/ad-screenshots/:id` — edit existing (metadata + blur editor)
- Sidebar gets a new "Ad Screenshots" item

## Technical details

**Database** — new table `public.ad_screenshots`:
- `id uuid pk`, `image_url text` (baked/blurred), `original_url text` (admin-only source)
- `industry text`, `client text`, `platform text`, `details text`
- `blur_regions jsonb` (array of `{x,y,w,h,blur}` normalized)
- `sort_order int`, `visible boolean default true`
- `created_at`, `updated_at` (+ trigger)
- RLS: public can `SELECT` only `visible = true` rows; admin (via `has_role`) can do everything
- GRANTs: `SELECT` to anon, full to authenticated/admin via policies, full to service_role

**Storage** — new public bucket `ad-screenshots`:
- Folder layout: `originals/<id>.png` (admin read only) and `baked/<id>.png` (public read)
- RLS on `storage.objects`: public can `SELECT` from `baked/*`; only admins can insert/update/delete

**Frontend**
- `src/hooks/use-ad-screenshots.ts` — `useQuery` to fetch visible rows for `/v3`
- `src/components/v3/AdCampaignShowcase.tsx` — swap `adCampaignScreenshots` import for the hook; keep the static file as fallback seed
- `src/pages/AdminAdScreenshots.tsx` — list grid + drag-to-reorder
- `src/pages/AdminAdScreenshotEditor.tsx` — upload, metadata form, blur canvas editor
- Blur editor implemented in plain `<canvas>` + a small overlay `<svg>` for drawing handles (no extra deps)
- Seed migration inserts the existing 23 screenshots from `src/data/adScreenshots.ts` with `blur_regions = []`

**Security**
- All write endpoints check `has_role(auth.uid(), 'admin')` via RLS
- Original images live under a non-public storage path
- Watermark + screenshot-block overlay on `/v3` stay as-is

## Scope of the first build

I'll build everything above in one pass: DB + storage + admin list + editor + `/v3` wiring + seeding. After it lands, you upload/edit through `/admin/ad-screenshots` and the public site updates immediately.