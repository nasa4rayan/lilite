# Groq API Setup

Lilite now uses a server-managed `/api/chat` endpoint so the Groq API key stays off the client.

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

## API Path

- Browser clients call the local/project endpoint: `/api/chat`

## Troubleshooting

If chat fails:
1. Ensure `GROQ_API_KEY` starts with `gsk_`
2. Ensure the key is active and not revoked
3. Restart `npm run dev` after changing env variables
4. Check browser DevTools `Network` tab for request errors
