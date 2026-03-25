# SEO Blog Builder

An AI-powered SEO blog generator built on Claude. Fill in a keyword, topic, and product context — get a fully SEO-optimised blog post with meta tags, Open Graph, JSON-LD schema, and a Google SERP preview.

---

## Repo Structure

```
├── index.html          ← Frontend app  →  deploy to Netlify
├── server.js           ← Proxy server  →  deploy to Render
├── package.json        ← Node dependencies
├── .env.example        ← Copy to .env and fill in your API key
└── .gitignore
```

---

## Deployment

### 1. Backend — Render.com (free)

Keeps your Anthropic API key secure on the server.

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service → connect this repo
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
4. Add Environment Variables:
   - `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
   - `ALLOWED_ORIGIN` = your Netlify URL (e.g. `https://seo-blog-yourteam.netlify.app`)
5. Deploy — your proxy URL will be `https://seo-blog-proxy.onrender.com`

### 2. Frontend — Netlify (free)

1. Go to [netlify.com](https://netlify.com) → drag and drop `index.html`
2. Rename the site to something memorable (Site Settings → Change site name)
3. Share the URL with your team

### 3. Connect them

1. Open your Netlify URL
2. Click **⚙️ API Settings** → choose **Backend Proxy**
3. Paste your Render URL + `/api/generate`
   - e.g. `https://seo-blog-proxy.onrender.com/api/generate`
4. Click **Save & Connect**

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/seo-blog-builder.git
cd seo-blog-builder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Start the proxy server
node server.js

# Open index.html in your browser
# In API Settings → Backend Proxy → http://localhost:3000/api/generate
```

---

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS — no framework, no build step
- **Backend:** Node.js + Express proxy
- **AI:** Anthropic Claude Sonnet (`claude-sonnet-4-20250514`)
- **Hosting:** Netlify (frontend) + Render (backend)

---

## Features

- 🔑 Primary + secondary keyword targeting
- 🎯 Product context — brand voice, USPs, competitors baked in automatically
- 📄 Blog Preview with styled rendering
- 📊 SEO Analysis — SERP preview, checklist, keyword map
- 🔡 Full production HTML output with:
  - `<title>` + `<meta name="description">`
  - Canonical URL
  - Open Graph tags (Facebook, LinkedIn)
  - Twitter Card tags
  - BlogPosting JSON-LD Schema
- ⬇️ One-click HTML download

---

## Security Notes

- Your API key is stored as a server environment variable — never in the browser
- CORS is locked to your frontend URL via `ALLOWED_ORIGIN`
- Never commit your `.env` file (it's in `.gitignore`)
