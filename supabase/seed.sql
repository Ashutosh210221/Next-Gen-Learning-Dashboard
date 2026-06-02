-- ===========================================================================
-- Nexus Learning Dashboard — Supabase schema + seed
-- ---------------------------------------------------------------------------
-- Run this in the Supabase dashboard:  SQL Editor → New query → paste → Run.
-- It is idempotent: safe to run more than once.
-- ===========================================================================

-- `gen_random_uuid()` ships with Postgres 13+ (pgcrypto), enabled by default
-- on Supabase. This guard keeps the script portable.
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  progress    integer     not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text        not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Enable RLS and allow PUBLIC READ ONLY. This is what makes it safe to ship
-- the anon key to the browser: anonymous visitors can SELECT but never write.
alter table public.courses enable row level security;

drop policy if exists "Public read access" on public.courses;
create policy "Public read access"
  on public.courses
  for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Seed data — `icon_name` values must match exported lucide-react icons.
-- ---------------------------------------------------------------------------
insert into public.courses (title, progress, icon_name)
select * from (values
  ('Advanced React Patterns', 78, 'Atom'),
  ('Distributed Systems Design', 45, 'Network'),
  ('Generative AI & LLMs',      62, 'Sparkles'),
  ('Rust for Systems Engineers',  29, 'Cpu')
) as v(title, progress, icon_name)
where not exists (select 1 from public.courses);
