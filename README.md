# Fachri & Poppy — Vercel + Supabase RSVP starter

This is a backend foundation, not a complete drop-in replacement for the current Vue invitation.

## Architecture
- Vue static frontend deployed to Vercel
- Vercel Node.js Functions under `api/`
- Supabase PostgreSQL stores invitation records and RSVP answers
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never use a `VITE_` prefix

## Included
- `api/verify-passcode.ts`: verifies an invitation code server-side
- `api/rsvp.ts`: saves or updates one RSVP per invitation
- `supabase/migrations/001_rsvp.sql`: database schema and RLS baseline
- `.env.example`: required environment variables

## Setup
1. Create a Supabase project.
2. Run `supabase/migrations/001_rsvp.sql` in the Supabase SQL Editor.
3. Add these variables in Vercel Project Settings → Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `INVITATION_API_ORIGIN` (the deployed invitation origin, e.g. `https://your-site.vercel.app`)
4. Install `@vercel/node` as a dev dependency if your project setup requires its types:
   `npm install -D @vercel/node`
5. Import guest entries into `public.guests` using the Supabase SQL editor or a one-time migration script. Do not leave production passcodes in `public/guests.json`.
6. Test in a Vercel Preview deployment before promoting to Production.

## Important security notes
- The service-role key is privileged. It belongs only in Vercel server environment variables.
- Do not create a public endpoint that returns all guests or all RSVP records.
- The admin dashboard is not included in this starter. Build it only after adding authenticated admin access (Supabase Auth + server-side authorization).
- Apply rate limiting / bot protection to passcode verification before sharing the invitation publicly.
- Configure `INVITATION_API_ORIGIN` exactly; do not use `*` CORS in production.
- This starter intentionally does not trust guest name from the browser. The server resolves the name from the invitation record.
- A single invitation may update its RSVP; the unique constraint prevents duplicate RSVP rows.
