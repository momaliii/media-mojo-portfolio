-- Add handled status to contact_submissions (admin inbox workflow)

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS handled BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS handled_at TIMESTAMPTZ;

-- Allow admins to update handled fields
DROP POLICY IF EXISTS "Only admins can update submissions" ON public.contact_submissions;
CREATE POLICY "Only admins can update submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

