# Deployment

## Render backend

Create a Render Web Service from this repository. The included `render.yaml` sets
the backend root directory and start command.

Set these environment variables in Render:

```text
MONGODB_URI=<your MongoDB Atlas connection string>
FRONTEND_URL=https://<your-vercel-project>.vercel.app
```

The service health check is:

```text
/health
```

It must return `{ "status": "ok" }`.

## Vercel frontend

Create a Vercel project with `frontend` as the root directory. Vercel detects
Vite automatically; use:

```text
Build command: npm run build
Output directory: dist
```

Set this environment variable for Production:

```text
VITE_API_URL=https://<your-render-service>.onrender.com
```

The included `frontend/vercel.json` rewrites client-side routes to
`index.html`, so `/auth`, `/home`, and meeting URLs continue to work after a
refresh.

Deploy Render first, copy its public URL into `VITE_API_URL`, deploy Vercel,
then copy the Vercel URL into Render's `FRONTEND_URL` and redeploy the Render
service.

## Verification

1. Open the Render `/health` URL and confirm the JSON response.
2. Open the Vercel URL and register a new account.
3. Log in, create a meeting, and join it from a second browser.
4. Test chat, camera, microphone, screen sharing, and copy link.
