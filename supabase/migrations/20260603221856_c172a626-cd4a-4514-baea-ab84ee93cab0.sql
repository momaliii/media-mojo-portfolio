
CREATE TABLE public.client_logos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.client_logos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_logos TO authenticated;
GRANT ALL ON public.client_logos TO service_role;

ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible logos"
  ON public.client_logos FOR SELECT
  TO anon, authenticated
  USING (visible = true OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert logos"
  ON public.client_logos FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update logos"
  ON public.client_logos FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete logos"
  ON public.client_logos FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER client_logos_updated_at
  BEFORE UPDATE ON public.client_logos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Storage policies for client-logos bucket
CREATE POLICY "Anyone can view client logo files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'client-logos');

CREATE POLICY "Admins can upload client logo files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'client-logos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update client logo files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'client-logos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete client logo files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'client-logos' AND public.has_role(auth.uid(), 'admin'::app_role));
