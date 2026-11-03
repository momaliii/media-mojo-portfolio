# Project conventions
- Use the published Lovable domain as the canonical host for page metadata and entity identifiers; preview origins must not become canonical URLs.
- Keep sitewide Organization and WebSite JSON-LD in the static HTML head and page-level metadata in Helmet; this preserves a non-JavaScript fallback without duplicate canonicals.
- Use theme-scoped contact styles with existing form and button primitives so v3 remains consistent without changing the other portfolio versions.
- Keep confirmed spend metrics in a shared data module and test their numeric meaning so portfolio versions cannot silently diverge.
- Load the ElevenLabs custom-element script once per document because the element registration persists through route changes.
- Maintain the existing static public/sitemap.xml alongside public routes and published case-study changes; include only indexable pages and omit lastmod without authoritative page-specific content timestamps.
- Use individually imported Simple Icons for advertising brand marks, with Lucide as a fallback for unavailable brands, to keep the platform strip recognizable and tree-shakeable.