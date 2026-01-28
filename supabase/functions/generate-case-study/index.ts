import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface GenerateRequest {
  details: string;
  contextFields?: {
    category?: string;
    client?: string;
    industry?: string;
  };
  imageUrls?: string[];
}

interface CaseStudyOutput {
  title: string;
  slug: string;
  category: string;
  client: string;
  industry?: string;
  description: string;
  challenge?: string;
  strategy?: string;
  results?: string;
  metrics: Array<{ label: string; value: string }>;
  platforms: string[];
  tools: string[];
  screenshot?: string;
  additional_screenshots?: string[];
  published: boolean;
}

// SSRF Protection: Allowed domains for image URLs
const ALLOWED_IMAGE_DOMAINS = [
  'eimgyykzmgmllsomufgb.supabase.co', // Project's Supabase storage
  'images.unsplash.com',
  'cdn.pixabay.com',
  'i.imgur.com',
  'res.cloudinary.com',
];

// SSRF Protection: Block private/internal IP ranges
function isPrivateIP(hostname: string): boolean {
  // Check for localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  
  // Check for private IP ranges
  const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = hostname.match(ipPattern);
  if (match) {
    const [, a, b, c] = match.map(Number);
    // 10.0.0.0/8
    if (a === 10) return true;
    // 172.16.0.0/12
    if (a === 172 && b >= 16 && b <= 31) return true;
    // 192.168.0.0/16
    if (a === 192 && b === 168) return true;
    // 169.254.0.0/16 (link-local, AWS metadata)
    if (a === 169 && b === 254) return true;
    // 127.0.0.0/8
    if (a === 127) return true;
  }
  return false;
}

// SSRF Protection: Validate URL before fetching
function validateImageUrl(urlString: string): { valid: boolean; error?: string } {
  try {
    const url = new URL(urlString);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { valid: false, error: `Invalid protocol: ${url.protocol}` };
    }
    
    // Block private IPs
    if (isPrivateIP(url.hostname)) {
      return { valid: false, error: 'Private/internal URLs are not allowed' };
    }
    
    // Check against allowlist
    const isAllowed = ALLOWED_IMAGE_DOMAINS.some(domain => 
      url.hostname === domain || url.hostname.endsWith('.' + domain)
    );
    
    if (!isAllowed) {
      return { valid: false, error: `Domain not in allowlist: ${url.hostname}` };
    }
    
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // === AUTHENTICATION CHECK ===
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getUser(token);
    
    if (claimsError || !claimsData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.user.id;

    // Verify user has admin role
    const { data: hasAdminRole, error: roleError } = await supabaseClient
      .rpc('has_role', { _user_id: userId, _role: 'admin' });

    if (roleError || !hasAdminRole) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    // === END AUTHENTICATION CHECK ===

    const { details, contextFields, imageUrls = [] }: GenerateRequest = await req.json();

    if (!details || details.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: 'Details must be at least 10 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // === SSRF PROTECTION: Validate and download images ===
    const imageContents: Array<{ type: string; image_url: { url: string } }> = [];
    const validatedImageUrls: string[] = [];
    
    for (const imageUrl of imageUrls.slice(0, 5)) {
      const validation = validateImageUrl(imageUrl);
      if (!validation.valid) {
        console.warn(`Skipping invalid image URL: ${imageUrl} - ${validation.error}`);
        continue;
      }
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch(imageUrl, { 
          signal: controller.signal,
          headers: { 'User-Agent': 'CaseStudyGenerator/1.0' }
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          // Limit image size to 5MB
          const contentLength = response.headers.get('content-length');
          if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) {
            console.warn(`Skipping image ${imageUrl}: exceeds 5MB limit`);
            continue;
          }
          
          const arrayBuffer = await response.arrayBuffer();
          if (arrayBuffer.byteLength > 5 * 1024 * 1024) {
            console.warn(`Skipping image ${imageUrl}: exceeds 5MB limit after download`);
            continue;
          }
          
          const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
          const contentType = response.headers.get('content-type') || 'image/png';
          
          // Verify it's actually an image
          if (!contentType.startsWith('image/')) {
            console.warn(`Skipping ${imageUrl}: not an image (${contentType})`);
            continue;
          }
          
          imageContents.push({
            type: 'image_url',
            image_url: {
              url: `data:${contentType};base64,${base64}`
            }
          });
          validatedImageUrls.push(imageUrl);
        }
      } catch (err) {
        console.warn(`Failed to download image ${imageUrl}:`, err);
      }
    }
    // === END SSRF PROTECTION ===

    // Build context prompt
    const contextPrompt = contextFields
      ? `\n\nContext provided:\n${contextFields.category ? `- Category: ${contextFields.category}\n` : ''}${contextFields.client ? `- Client: ${contextFields.client}\n` : ''}${contextFields.industry ? `- Industry: ${contextFields.industry}\n` : ''}`
      : '';

    const systemPrompt = `You are an expert digital marketing case study writer. Generate a comprehensive, long-form case study in JSON format only. 

Output requirements:
- Write a compelling, detailed narrative-style case study (long-form, not bullet points)
- Include specific metrics, strategies, and results
- Make it professional and credible
- Anonymize client names unless explicitly provided in context
- Return ONLY valid JSON, no markdown, no code blocks

JSON schema:
{
  "title": "string (compelling case study title)",
  "slug": "string (URL-friendly slug based on title)",
  "category": "string (e-commerce, b2b, f&b, ngo, branding, etc.)",
  "client": "string (anonymized client name like 'Premium Brand' unless provided)",
  "industry": "string (optional industry name)",
  "description": "string (2-3 sentence overview)",
  "challenge": "string (detailed paragraph describing the business challenge)",
  "strategy": "string (detailed paragraph describing the marketing strategy and approach)",
  "results": "string (detailed paragraph describing outcomes and achievements)",
  "metrics": [{"label": "string", "value": "string"}, ...] (3-5 key metrics),
  "platforms": ["facebook", "instagram", ...] (array of platform names),
  "tools": ["Meta Ads Manager", ...] (array of tools used),
  "screenshot": "string (first image URL if provided, else empty)",
  "additional_screenshots": ["string", ...] (remaining image URLs if provided, else empty array),
  "published": false
}`;

    const userPrompt = `Create a detailed case study based on these campaign details:${contextPrompt}\n\n${details}\n\n${imageContents.length > 0 ? `\nAnalyze the ${imageContents.length} uploaded screenshot(s) to extract visual insights, metrics, and campaign details.` : ''}`;

    // Prepare messages for OpenAI
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: imageContents.length > 0
          ? [
              { type: 'text', text: userPrompt },
              ...imageContents
            ]
          : userPrompt
      }
    ];

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Vision-capable model
        messages,
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: `OpenAI API error: ${openaiResponse.statusText}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openaiData = await openaiResponse.json();
    const content = openaiData.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'No content returned from OpenAI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate JSON
    let parsed: any;
    try {
      // Remove markdown code blocks if present
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response as JSON', raw: content }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    const required = ['title', 'slug', 'category', 'client', 'description', 'metrics'];
    for (const field of required) {
      if (!parsed[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}`, parsed }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Ensure arrays are arrays
    if (!Array.isArray(parsed.metrics)) parsed.metrics = [];
    if (!Array.isArray(parsed.platforms)) parsed.platforms = [];
    if (!Array.isArray(parsed.tools)) parsed.tools = [];
    if (!Array.isArray(parsed.additional_screenshots)) parsed.additional_screenshots = [];

    // Set screenshot from first validated image if available
    if (validatedImageUrls.length > 0 && !parsed.screenshot) {
      parsed.screenshot = validatedImageUrls[0];
    }
    if (validatedImageUrls.length > 1 && parsed.additional_screenshots.length === 0) {
      parsed.additional_screenshots = validatedImageUrls.slice(1);
    }

    // Ensure published is false (draft)
    parsed.published = false;

    const result: CaseStudyOutput = {
      title: parsed.title,
      slug: parsed.slug || slugify(parsed.title),
      category: parsed.category,
      client: parsed.client,
      industry: parsed.industry || contextFields?.industry,
      description: parsed.description,
      challenge: parsed.challenge,
      strategy: parsed.strategy,
      results: parsed.results,
      metrics: parsed.metrics,
      platforms: parsed.platforms,
      tools: parsed.tools,
      screenshot: parsed.screenshot,
      additional_screenshots: parsed.additional_screenshots,
      published: false,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating case study:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
