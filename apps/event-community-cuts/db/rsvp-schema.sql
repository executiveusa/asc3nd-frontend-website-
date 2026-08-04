-- Asc3nd Collective — Community Cuts for Kids RSVP schema
-- Target: Supabase project supabase-amethyst-cloud (us-east-1)
-- Applies to public schema. Safe to re-run (idempotent).

create extension if not exists citext with schema extensions;

begin;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type rsvp_status as enum ('RECEIVED', 'CONFIRMED', 'WAITLISTED', 'CANCELLED', 'ATTENDED', 'NO_SHOW');
exception when duplicate_object then null; end $$;

do $$ begin
  create type supporter_participation as enum ('volunteer', 'supplies', 'partner', 'general');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- rsvps table — family attendance submissions
-- Per docs/events/community-cuts-first-activation-production-brief.md
-- ---------------------------------------------------------------------------
create table if not exists public.rsvps (
  id              uuid primary key default gen_random_uuid(),
  event_slug      text not null default 'community-cuts-2026',
  guardian_name   text not null check (char_length(guardian_name) between 1 and 160),
  email           citext,
  phone           text check (char_length(phone) <= 40),
  children_count  integer not null check (children_count between 1 and 10),
  age_range       text not null check (age_range in ('preschool','elementary','middle-school','high-school','mixed-ages')),
  requested_service text not null default 'haircut',
  arrival_window  text check (arrival_window is null or arrival_window in ('12-1','1-2','2-3','unsure')),
  preferred_language text not null default 'en' check (preferred_language in ('en','es')),
  accessibility_contact boolean not null default false,
  contact_privately boolean not null default false,
  source          text,
  contact_consent boolean not null default true,
  status          rsvp_status not null default 'RECEIVED',
  confirmation_code text unique,
  idempotency_key text unique,
  raw_payload     jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- supporters table — volunteer / supplies / partner / general interest
-- ---------------------------------------------------------------------------
create table if not exists public.supporters (
  id              uuid primary key default gen_random_uuid(),
  event_slug      text not null default 'community-cuts-2026',
  name            text not null check (char_length(name) between 1 and 160),
  email           citext,
  phone           text check (char_length(phone) <= 40),
  participation   supporter_participation not null,
  updates         text[] not null default '{}',
  preferred_language text not null default 'en' check (preferred_language in ('en','es')),
  consent         boolean not null default true,
  source          text,
  source_path     text check (char_length(source_path) <= 500),
  confirmation_code text unique,
  idempotency_key text unique,
  raw_payload     jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists rsvps_created_at_idx        on public.rsvps (created_at desc);
create index if not exists rsvps_email_idx             on public.rsvps (email);
create index if not exists rsvps_status_idx            on public.rsvps (status);
create index if not exists rsvps_event_slug_idx        on public.rsvps (event_slug);
create index if not exists supporters_created_at_idx   on public.supporters (created_at desc);
create index if not exists supporters_email_idx        on public.supporters (email);
create index if not exists supporters_participation_idx on public.supporters (participation);
create index if not exists supporters_event_slug_idx   on public.supporters (event_slug);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists rsvps_touch_updated_at on public.rsvps;
create trigger rsvps_touch_updated_at before update on public.rsvps
  for each row execute function public.touch_updated_at();

drop trigger if exists supporters_touch_updated_at on public.supporters;
create trigger supporters_touch_updated_at before update on public.supporters
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Browser/anon key can do nothing. Only service_role (server-side) can insert/select.
-- ---------------------------------------------------------------------------
alter table public.rsvps      enable row level security;
alter table public.supporters enable row level security;

drop policy if exists rsvps_deny_anon      on public.rsvps;
drop policy if exists rsvps_service_all    on public.rsvps;
drop policy if exists supporters_deny_anon on public.supporters;
drop policy if exists supporters_service_all on public.supporters;

-- Service role bypasses RLS by default in Supabase, but be explicit:
create policy rsvps_service_all    on public.rsvps      for all to service_role using (true) with check (true);
create policy supporters_service_all on public.supporters for all to service_role using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Confirmation code generator function (callable via service_role)
-- ---------------------------------------------------------------------------
create or replace function public.generate_confirmation_code(prefix text default 'ASC3ND')
returns text language plpgsql as $$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code  text := '';
  i     int;
begin
  for i in 1..6 loop
    code := code || substr(chars, floor(random() * char_length(chars))::int + 1, 1);
  end loop;
  return prefix || '-' || code;
end $$;

commit;

-- ---------------------------------------------------------------------------
-- Verify
-- ---------------------------------------------------------------------------
select 'rsvps' as table_name, count(*) as col_count from information_schema.columns where table_schema='public' and table_name='rsvps'
union all
select 'supporters', count(*) from information_schema.columns where table_schema='public' and table_name='supporters';

-- ---------------------------------------------------------------------------
-- Migration: add updates column to rsvps + harden idempotency_key
-- (Bug fixes: updates array was silently dropped on attendance path;
--  idempotency_key was nullable so UNIQUE allowed duplicate NULLs through.)
-- Safe to re-run (idempotent).
-- ---------------------------------------------------------------------------
-- 1. Add updates text[] column to rsvps (mirrors supporters table)
alter table public.rsvps
  add column if not exists updates text[] not null default '{}';

-- 2. Backfill accessibility_contact/contact_privately from existing booleans
--    into the updates array so historical rows have the full picture:
update public.rsvps
  set updates = array_distinct(
    array_remove(ARRAY[
      case when accessibility_contact then 'accessibility' end,
      case when preferred_language = 'es' then 'spanish' end
    ] || coalesce(updates, ARRAY[]::text[]), null)
  )
  where updates = '{}';

-- 3. Harden idempotency_key: make it NOT NULL so the UNIQUE constraint
--    actually prevents duplicates (NULLs are not considered equal in Postgres,
--    so a nullable UNIQUE column allows unlimited NULL values).
--    Existing NULL rows get a synthetic key so the constraint can be applied.
update public.rsvps
  set idempotency_key = 'legacy-' || id::text
  where idempotency_key is null;

alter table public.rsvps
  alter column idempotency_key set not null;

-- Same hardening for supporters
update public.supporters
  set idempotency_key = 'legacy-' || id::text
  where idempotency_key is null;

alter table public.supporters
  alter column idempotency_key set not null;
