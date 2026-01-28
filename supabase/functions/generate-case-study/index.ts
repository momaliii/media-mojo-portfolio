import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
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

    // Download images and convert to base64
    const imageContents: Array<{ type: string; image_url: { url: string } }> = [];
    for (const imageUrl of imageUrls.slice(0, 5)) {
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
          const contentType = response.headers.get('content-type') || 'image/png';
          imageContents.push({
            type: 'image_url',
            image_url: {
              url: `data:${contentType};base64,${base64}`
            }
          });
        }
      } catch (err) {
        console.warn(`Failed to download image ${imageUrl}:`, err);
      }
    }

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

    // Set screenshot from first image if available
    if (imageUrls.length > 0 && !parsed.screenshot) {
      parsed.screenshot = imageUrls[0];
    }
    if (imageUrls.length > 1 && parsed.additional_screenshots.length === 0) {
      parsed.additional_screenshots = imageUrls.slice(1);
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
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
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
