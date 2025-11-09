// Serverless-like endpoint using Express Router
import express from 'express';
import OpenAI from 'openai';
const router = express.Router();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/generate
// body: { title, category, tone, length }
router.post('/', async (req, res) => {
  try {
    const { title, category='General', tone='neutral', length='short' } = req.body;
    if (!title) return res.status(400).json({ error: 'Missing title' });

    const prompt = `You are an expert copywriter. Generate an SEO-friendly product description (50-120 words) for a product titled "${title}" in category "${category}". Use a ${tone} tone. Provide 3 short tags (comma-separated) and a short bullet list of 2 benefits. Return JSON like: { "description": "...", "tags": "...", "benefits": ["b1","b2"] }`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      max_output_tokens: 400
    });

    // The SDK may return different shapes; attempt to extract text
    let text = "";
    if (response.output && Array.isArray(response.output) && response.output[0].content) {
      // concatenate content pieces if present
      for (const c of response.output[0].content) {
        if (c.type === 'output_text') text += c.text || '';
      }
    }
    if (!text) text = response.output_text || '';

    // Try to parse JSON from the assistant
    let parsed = {};
    try { parsed = JSON.parse(text); } catch (e) {
      // Fallback: wrap the text as description
      parsed = { description: text.trim().slice(0, 800), tags: '', benefits: [] };
    }

    res.json({ ok: true, result: parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'OpenAI error' });
  }
});

export default router;
