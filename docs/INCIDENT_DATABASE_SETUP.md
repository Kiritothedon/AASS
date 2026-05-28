# AASS incident database setup

Incident reports use a **dedicated Postgres database** that is separate from Global Ticket Pay (GTP).

## Important

- Do **not** use the GTP Supabase project (`iyfnoiqnyvwjyughdfym`) for AASS.
- No GTP database changes were made for this feature; only application code was added.
- Your Supabase org free tier allows **2 active projects** (currently GTP + GTPStream). To add a third Supabase project for AASS, pause or delete an unused project, or upgrade.

## Option A: Neon (recommended, separate from Supabase)

1. Create a project at [neon.tech](https://neon.tech) named `aass-incidents`.
2. Copy the **connection string** (pooled).
3. In Vercel → AASS project → Settings → Environment Variables, set:
   - `DATABASE_URL` = your Neon connection string
   - `INCIDENT_FINGERPRINT_SALT` = long random string
4. Run `database/incidents.sql` in the Neon SQL editor once.

## Option B: New Supabase project (AASS only)

1. Pause or remove an unused Supabase project if you are at the 2-project limit.
2. Create a new project named **AASS** (not GTP).
3. Settings → Database → connection string (URI) → use as `DATABASE_URL`.
4. SQL Editor → run `database/incidents.sql`.
5. Add `DATABASE_URL` and `INCIDENT_FINGERPRINT_SALT` to Vercel.

## Option C: Local development

Without `DATABASE_URL`, the app stores reports in `data/incidents.json` automatically in development.
