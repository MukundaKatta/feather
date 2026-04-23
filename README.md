# Feather

> The CRM built for a team of one.

Freelancers, consultants, solo founders. Track clients, deals, and follow-ups without Salesforce-level pain.

## Stack

- Next.js 15.3.1 · App Router · TypeScript strict
- Tailwind v4 (`@tailwindcss/postcss`, CSS-first config)
- `next/font/google` for Inter
- `pnpm` lockfile committed

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo widget, features, waitlist form |
| `/try` | Deal kanban — add deals (name, value, stage), drag-to-move via buttons, localStorage only |
| `/api/waitlist` | POST `{ email }` → forwards to waitlist-api-sigma with `product: "feather"` |

## Deploy

Push to Vercel — Next.js is auto-detected, no config changes needed. No environment variables required.

## Status

v0 skeleton. Landing page preserved from original, app shell scaffolded with kanban demo.
