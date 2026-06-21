CREATE TABLE public.ad_screenshots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  original_url text,
  industry text NOT NULL DEFAULT '',
  client text NOT NULL DEFAULT '',
  platform text,
  details text,
  blur_regions jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.ad_screenshots TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ad_screenshots TO authenticated;
GRANT ALL ON public.ad_screenshots TO service_role;

ALTER TABLE public.ad_screenshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible ad screenshots"
  ON public.ad_screenshots FOR SELECT
  USING (visible = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert ad screenshots"
  ON public.ad_screenshots FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update ad screenshots"
  ON public.ad_screenshots FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete ad screenshots"
  ON public.ad_screenshots FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER ad_screenshots_updated_at
  BEFORE UPDATE ON public.ad_screenshots
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX ad_screenshots_sort_idx ON public.ad_screenshots (sort_order, created_at);

-- Seed with existing static screenshots
INSERT INTO public.ad_screenshots (image_url, original_url, industry, client, platform, details, sort_order) VALUES
('/lovable-uploads/d0480bb8-df6e-4aab-936f-643572f852cd.png','/lovable-uploads/d0480bb8-df6e-4aab-936f-643572f852cd.png','Cosmetics','Cosmetics Store','META','EGP 6.77M Revenue | 18,639 Orders',10),
('/lovable-uploads/04d1a30f-45d2-4e23-aa75-648fd59db8a2.png','/lovable-uploads/04d1a30f-45d2-4e23-aa75-648fd59db8a2.png','E-commerce','E-commerce Store','Lightfunnel','EGP 3.7M Sales | 15,644 Orders | 278K Visitors',20),
('/lovable-uploads/156fb6fb-7127-4fc4-958a-cc7f67e44deb.png','/lovable-uploads/156fb6fb-7127-4fc4-958a-cc7f67e44deb.png','Fashion','eCommerce Store',NULL,NULL,30),
('/lovable-uploads/8a21f5c2-80de-458b-b6de-a6a618ee43b7.png','/lovable-uploads/8a21f5c2-80de-458b-b6de-a6a618ee43b7.png','Fashion','Clothing Brand',NULL,NULL,40),
('/lovable-uploads/26e6f270-fff7-432d-9153-8a8fd986c69c.png','/lovable-uploads/26e6f270-fff7-432d-9153-8a8fd986c69c.png','Cosmetics','Beauty Products',NULL,NULL,50),
('/lovable-uploads/92ae0ae7-b223-4d17-aceb-c8c87dbbe638.png','/lovable-uploads/92ae0ae7-b223-4d17-aceb-c8c87dbbe638.png','Cosmetics','Makeup Brand',NULL,NULL,60),
('/lovable-uploads/2b19e181-a080-4cc8-9219-3086a5edd17c.png','/lovable-uploads/2b19e181-a080-4cc8-9219-3086a5edd17c.png','Cosmetics','Lip Products',NULL,NULL,70),
('/lovable-uploads/c8259e43-59cb-4ab5-a015-c4bd4f607f1f.png','/lovable-uploads/c8259e43-59cb-4ab5-a015-c4bd4f607f1f.png','Cosmetics','Sunblock Products',NULL,NULL,80),
('/lovable-uploads/b9ffe7b8-a319-4b45-aece-468ae716143f.png','/lovable-uploads/b9ffe7b8-a319-4b45-aece-468ae716143f.png','Cosmetics','EGP7.76M Revenue Campaign',NULL,NULL,90),
('/lovable-uploads/8ba80354-1cbc-448a-9175-c56949f83d71.png','/lovable-uploads/8ba80354-1cbc-448a-9175-c56949f83d71.png','E-commerce','Egyptian Retailer','Analytics','EGP 443K+ | 689 Orders | 1.07% CR',100),
('/lovable-uploads/65acfa16-3fd7-4a1a-b657-5d664bc7bd16.png','/lovable-uploads/65acfa16-3fd7-4a1a-b657-5d664bc7bd16.png','E-commerce','Arabic E-commerce Platform','Analytics','EGP 3.66M Revenue | 110.79K Visits',110),
('/lovable-uploads/e4ec0de3-17ba-4f2f-924d-68ea4a22a583.png','/lovable-uploads/e4ec0de3-17ba-4f2f-924d-68ea4a22a583.png','Travel','Qatar Airways - $54.4K Campaign',NULL,NULL,120),
('/lovable-uploads/5f84f179-a69a-4009-93ba-78dd559a2d50.png','/lovable-uploads/5f84f179-a69a-4009-93ba-78dd559a2d50.png','Travel','Dinner Cruise Promotions',NULL,NULL,130),
('/lovable-uploads/dd8439eb-83f8-4dc7-b4a8-40039aa7ba3c.png','/lovable-uploads/dd8439eb-83f8-4dc7-b4a8-40039aa7ba3c.png','Travel','Doha Experience Tours',NULL,NULL,140),
('/lovable-uploads/c231d3ec-eed2-424d-bd7c-95aa7879f8e7.png','/lovable-uploads/c231d3ec-eed2-424d-bd7c-95aa7879f8e7.png','Travel','Seasonal Travel Campaigns',NULL,NULL,150),
('/lovable-uploads/46ec591e-912f-44bb-8a0b-ead1a8921beb.png','/lovable-uploads/46ec591e-912f-44bb-8a0b-ead1a8921beb.png','F&B','Saudi Restaurant - $10.7K Campaign',NULL,NULL,160),
('/lovable-uploads/b44109e4-19fc-4d1a-89e0-9374e494ab0d.png','/lovable-uploads/b44109e4-19fc-4d1a-89e0-9374e494ab0d.png','F&B','Saudi F&B - 36K Impressions',NULL,NULL,170),
('/lovable-uploads/5804f258-db97-4d23-b780-67b64f60d4cd.png','/lovable-uploads/5804f258-db97-4d23-b780-67b64f60d4cd.png','F&B','Saudi Restaurant Chain - $1.4K Campaign',NULL,NULL,180),
('/lovable-uploads/19e88bed-b62d-4d8a-9686-d0f95c5873c7.png','/lovable-uploads/19e88bed-b62d-4d8a-9686-d0f95c5873c7.png','F&B','Saudi F&B - ROI Optimization',NULL,NULL,190),
('/lovable-uploads/a11917a6-704a-4ada-ba26-40899ba98b37.png','/lovable-uploads/a11917a6-704a-4ada-ba26-40899ba98b37.png','Non-Profit','Saudi NGO Campaign','LinkedIn','$36.7K Total Spend',200),
('/lovable-uploads/d07ff1b1-0451-4b63-9122-a1547f3ab4eb.png','/lovable-uploads/d07ff1b1-0451-4b63-9122-a1547f3ab4eb.png','Non-Profit','Global Outreach - Turkey','LinkedIn','$1.6K Spent | 0.49% CTR',210),
('/lovable-uploads/ea7c2b4d-8851-4c25-b5e6-7f33a0471af4.png','/lovable-uploads/ea7c2b4d-8851-4c25-b5e6-7f33a0471af4.png','Non-Profit','Middle East Engagement','LinkedIn','3.54% CTR | $0.32 CPC',220);