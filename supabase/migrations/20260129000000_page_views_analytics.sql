-- Create page_views table for visitor analytics
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  path TEXT NOT NULL,
  referrer TEXT,
  referrer_domain TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON public.page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_utm_source ON public.page_views(utm_source) WHERE utm_source IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_page_views_referrer_domain ON public.page_views(referrer_domain) WHERE referrer_domain IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.page_views(session_id);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Policy: Allow INSERT for public pages only (not /admin, /profile, /auth)
CREATE POLICY "Allow insert for public pages"
ON public.page_views
FOR INSERT
TO authenticated, anon
WITH CHECK (
  path !~ '^/(admin|profile|auth)'
);

-- Policy: Only admins can SELECT
CREATE POLICY "Only admins can view page views"
ON public.page_views
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can DELETE (optional cleanup)
CREATE POLICY "Only admins can delete page views"
ON public.page_views
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
