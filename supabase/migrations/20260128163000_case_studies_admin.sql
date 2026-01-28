-- Case studies editable via admin panel

CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  industry TEXT,
  description TEXT NOT NULL,
  challenge TEXT,
  strategy TEXT,
  results TEXT,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{label,value}]
  platforms TEXT[] NOT NULL DEFAULT '{}'::text[],
  tools TEXT[] NOT NULL DEFAULT '{}'::text[],
  screenshot TEXT,
  additional_screenshots TEXT[] NOT NULL DEFAULT '{}'::text[],
  budget_range TEXT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Public can read only published entries
DROP POLICY IF EXISTS "Public can read published case studies" ON public.case_studies;
CREATE POLICY "Public can read published case studies"
ON public.case_studies
FOR SELECT
TO public
USING (published = true);

-- Admins can read all entries
DROP POLICY IF EXISTS "Admins can read all case studies" ON public.case_studies;
CREATE POLICY "Admins can read all case studies"
ON public.case_studies
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert/update/delete
DROP POLICY IF EXISTS "Admins can insert case studies" ON public.case_studies;
CREATE POLICY "Admins can insert case studies"
ON public.case_studies
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update case studies" ON public.case_studies;
CREATE POLICY "Admins can update case studies"
ON public.case_studies
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete case studies" ON public.case_studies;
CREATE POLICY "Admins can delete case studies"
ON public.case_studies
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Reuse updated_at trigger helper if present
DROP TRIGGER IF EXISTS set_updated_at ON public.case_studies;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_case_studies_published_sort
  ON public.case_studies(published, sort_order);

CREATE INDEX IF NOT EXISTS idx_case_studies_category
  ON public.case_studies(category);

