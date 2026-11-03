ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS platform_results jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.case_studies.platform_results IS 'Per-platform results breakdown: [{platform, spend, impressions, roas, note}]';