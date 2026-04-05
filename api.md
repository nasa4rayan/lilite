# Groq API Setup (Local + Vercel)

## 1) Local `.env.local` format (important)

Use this exact format:

```env
GROQ_API_KEY=gsk_your_real_key_here
```

Rules:
- No space before or after `=`
- No quotes
- No semicolon

Wrong example (causes failures):

```env
GROQ_API_KEY= gsk_rest
```

The extra space after `=` makes the value invalid.

After updating `.env.local`, restart dev server:

```bash
npm run dev
```

## 2) Add API key in Vercel

1. Open your project in Vercel dashboard.
2. Go to `Project Settings` -> `Environment Variables`.
3. Add:
   - Name: `GROQ_API_KEY`
   - Value: your real Groq key (`gsk_...`)
4. Select environments:
   - `Production`
   - `Preview`
   - `Development` (optional but recommended)
5. Save.
6. Redeploy the project.

## 3) Verify endpoint

Your chat posts to:

```text
/api/chat
```

In this repo:
- Local dev API is handled in `vite.config.ts` middleware.
- Next-style handler is in `src/app/api/chat/route.ts` (for Next runtime deployments).

## 4) Timeout troubleshooting

If requests still timeout:

1. Confirm key is valid in Groq dashboard (not revoked).
2. Confirm no spaces in `.env.local`.
3. Restart dev server after every env change.
4. Open browser DevTools -> `Network` -> check `/api/chat` response status/body.
5. On Vercel, confirm env var exists in the same project and redeploy.

## 5) Quick test cURL (optional)

```bash
curl -X POST http://localhost:5173/api/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"llama-3.3-70b-versatile","stream":false,"messages":[{"role":"user","content":"hello"}]}'
```

