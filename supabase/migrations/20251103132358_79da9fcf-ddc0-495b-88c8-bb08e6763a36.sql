-- Create contact_submissions table for storing contact form and newsletter submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  submission_type TEXT NOT NULL DEFAULT 'contact', -- 'contact' or 'newsletter'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert submissions (public forms)
CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow only authenticated users to view submissions
CREATE POLICY "Only authenticated users can view submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON public.contact_submissions(email);

-- Create index for submission type
CREATE INDEX IF NOT EXISTS idx_contact_submissions_type 
  ON public.contact_submissions(submission_type);

-- Create index for created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON public.contact_submissions(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();