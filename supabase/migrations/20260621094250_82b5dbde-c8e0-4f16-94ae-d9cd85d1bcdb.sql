-- Private ad-screenshots bucket: admin-only access (originals)
CREATE POLICY "Admins read ad-screenshots originals"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'ad-screenshots' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert ad-screenshots originals"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'ad-screenshots' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update ad-screenshots originals"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'ad-screenshots' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'ad-screenshots' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete ad-screenshots originals"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'ad-screenshots' AND public.has_role(auth.uid(), 'admin'));

-- Public case-study-assets bucket: admins can write under ad-screenshots/baked/
CREATE POLICY "Admins insert baked ad screenshots"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'case-study-assets'
    AND (storage.foldername(name))[1] = 'ad-screenshots'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins update baked ad screenshots"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'case-study-assets'
    AND (storage.foldername(name))[1] = 'ad-screenshots'
    AND public.has_role(auth.uid(), 'admin')
  )
  WITH CHECK (
    bucket_id = 'case-study-assets'
    AND (storage.foldername(name))[1] = 'ad-screenshots'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins delete baked ad screenshots"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'case-study-assets'
    AND (storage.foldername(name))[1] = 'ad-screenshots'
    AND public.has_role(auth.uid(), 'admin')
  );