# Connectly

Connectly is a simple video-calling app with meeting rooms, chat, screen sharing, and meeting history.

## Run locally

Install dependencies:

```bash
npm --prefix frontend install
npm --prefix backend install
```

Start the backend:

```bash
npm --prefix backend start
```

Start the frontend in another terminal:

```bash
npm --prefix frontend run dev
```

Open [http://localhost:5173](http://localhost:5173).

The backend needs these environment variables in `backend/.env`:

```text
MONGODB_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:5173
```

## Deployment

- Deploy `frontend` to Vercel.
- Deploy `backend` to Render.
- Set `VITE_API_URL` on Vercel to the Render backend URL.
- Set `MONGODB_URI` and `FRONTEND_URL` on Render.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment checklist.
