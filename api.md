# Groq API Setup

## Recommended for Open Source: BYOK (Frontend)

This project now supports BYOK mode in the chat widget.

What this means:
- No `.env.local` needed
- No shared server key needed
- Each user can paste their own `gsk_...` key in the widget

How to use:
1. Open chat widget
2. Toggle `BYOK Mode: ON`
3. Paste your Groq key in the input
4. Start chatting

## Optional: Backend Key Mode (`/api/chat`)

Use this only if you want server-managed API calls.

### Local

Create `.env.local` at project root:

```env
GROQ_API_KEY=gsk_your_real_key_here
```

Rules:
- No spaces around `=`
- No quotes
- No semicolon

Restart dev server after env changes:

```bash
npm run dev
```

### Vercel

1. Go to `Project Settings` -> `Environment Variables`
2. Add `GROQ_API_KEY` with your `gsk_...` value
3. Apply to `Production` and `Preview` (and `Development` if needed)
4. Redeploy

## API Paths

- Frontend BYOK calls Groq directly: `https://api.groq.com/openai/v1/chat/completions`
- Backend mode uses local/project endpoint: `/api/chat`

## Troubleshooting

If chat fails:
1. Ensure key starts with `gsk_`
2. Ensure key is active (not revoked)
3. If using backend mode, restart `npm run dev`
4. Check browser DevTools `Network` tab for request errors
