# AASS incident database

Incident reports use the **GTPStream Supabase project** (`zpdfeujmytspdadzgxrg`), repurposed for AASS. This is **not** the Global Ticket Pay database (`iyfnoiqnyvwjyughdfym`).

## Already done in repo

- `incidents` table created via `database/incidents.sql`
- Supabase CLI linked: `supabase link --project-ref zpdfeujmytspdadzgxrg`

## Rename project (optional)

In [Supabase Dashboard](https://supabase.com/dashboard/project/zpdfeujmytspdadzgxrg/settings/general), change the project name from **GTPStream** to **AASS**.

## Vercel environment variables

Set these on the **aass** Vercel project:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zpdfeujmytspdadzgxrg.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key from Supabase → Settings → API |
| `INCIDENT_FINGERPRINT_SALT` | Long random string (32+ chars) |

Redeploy after saving.

## Local development

Copy `.env.example` to `.env.local` and add your service role key, or leave unset to use `data/incidents.json`.
