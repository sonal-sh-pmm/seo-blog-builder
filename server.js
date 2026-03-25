/**
 * SEO Blog Builder — Backend Proxy Server
 * ────────────────────────────────────────
 * Holds your Anthropic API key securely on the server.
 * The frontend (index.html on GitHub Pages) POSTs the Claude
 * request body here; this server adds the key and forwards to
 * Anthropic's API, then returns the response to the browser.
 *
 * Deploy free on: Render.com · Railway.app · Fly.io
 *
 * SETUP:
 *   1. npm install
 *   2. Set ANTHROPIC_API_KEY in your environment / .env file
 *   3. Set ALLOWED_ORIGIN to your GitHub Pages URL
 *   4. node server.js
 */

const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch'); // npm i node-fetch@2

require('dotenv').config(); // optional: load .env locally

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── CORS: only allow requests from your GitHub Pages site ── */
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
// Example: 'https://YOUR-USERNAME.github.io'
// Set to '*' during development only — lock it down for production!

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

/* ── Health check ── */
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'SEO Blog Builder Proxy' });
});

/* ── Main proxy endpoint ── */
app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: { message: 'ANTHROPIC_API_KEY not set on server.' } });
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':       'application/json',
        'x-api-key':          apiKey,
        'anthropic-version':  '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await anthropicRes.json();

    // Forward Anthropic's status code and body straight to the browser
    res.status(anthropicRes.status).json(data);

  } catch (err) {
    console.error('Proxy error:', err);
    res.status(502).json({ error: { message: 'Proxy failed to reach Anthropic API.' } });
  }
});

app.listen(PORT, () => {
  console.log(`SEO Blog Builder proxy running on port ${PORT}`);
  console.log(`CORS allowed origin: ${ALLOWED_ORIGIN}`);
});
