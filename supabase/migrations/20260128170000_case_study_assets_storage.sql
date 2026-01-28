-- Storage bucket and policies for case study image uploads

-- Create bucket (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-study-assets', 'case-study-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Policies on storage.objects
DROP POLICY IF EXISTS "Public read case study assets" ON storage.objects;
CREATE POLICY "Public read case study assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'case-study-assets');

DROP POLICY IF EXISTS "Admins upload case study assets" ON storage.objects;
CREATE POLICY "Admins upload case study assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'case-study-assets'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins update case study assets" ON storage.objects;
CREATE POLICY "Admins update case study assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'case-study-assets'
  AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'case-study-assets'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins delete case study assets" ON storage.objects;
CREATE POLICY "Admins delete case study assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'case-study-assets'
  AND public.has_role(auth.uid(), 'admin')
);

