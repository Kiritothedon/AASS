-- Run in Supabase SQL editor for production incident reporting + map

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  reporter_name text,
  city text not null,
  state text not null,
  title text,
  description text not null,
  incident_type text,
  occurred_on date,
  latitude double precision,
  longitude double precision,
  fingerprint_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists incidents_location_idx on public.incidents (state, city);
create index if not exists incidents_fingerprint_created_idx
  on public.incidents (fingerprint_hash, created_at desc);
create index if not exists incidents_created_idx on public.incidents (created_at desc);

alter table public.incidents enable row level security;

-- Server uses service role key; optional public read policy if using anon key later
drop policy if exists "Public read incidents" on public.incidents;
create policy "Public read incidents"
  on public.incidents for select
  using (true);
