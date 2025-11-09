# Prompt templates — AutoDesc

## Basic description (short)
You are an expert e-commerce copywriter. Generate an SEO-friendly product description (50-120 words) for a product titled "{title}" in category "{category}". Use a {tone} tone. Provide 3 short tags (comma-separated) and a short bullet list of 2 benefits. Return valid JSON: { "description": "...", "tags": "...", "benefits": ["b1","b2"] }.

## Long description (extended)
You are an experienced marketing writer. Create a long product description (150-300 words) for "{title}". Include: 1) key features, 2) use-cases, 3) social proof suggestion lines, 4) 5 SEO keywords. Return JSON with fields: description, features (array), use_cases (array), seo_keywords (array).

## Short titles and meta
Generate 3 title variations (max 60 chars each) and a meta description (max 160 chars) for product "{title}".
