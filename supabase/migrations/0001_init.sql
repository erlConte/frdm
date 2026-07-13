-- Initial schema for the portfolio + shop site.
-- Run this in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type portfolio_section as enum (
    'esperienza',
    'formazione',
    'certificazione',
    'percorso_personale',
    'progetto'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type shop_category as enum ('vino', 'abbigliamento');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type shop_status as enum ('disponibile', 'venduto');
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- portfolio_items
-- ---------------------------------------------------------------------------
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  section portfolio_section not null,
  title_it text not null,
  title_en text not null,
  title_es text not null,
  subtitle text,
  period text,
  description_it text,
  description_en text,
  description_es text,
  image_url text,
  external_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_items_section_sort_idx
  on public.portfolio_items (section, sort_order);

alter table public.portfolio_items enable row level security;

drop policy if exists "portfolio_items public read" on public.portfolio_items;
create policy "portfolio_items public read"
  on public.portfolio_items
  for select
  to anon, authenticated
  using (true);

-- No insert/update/delete policies: writes only via the service role key
-- (used server-side by the admin panel), which bypasses RLS entirely.

-- ---------------------------------------------------------------------------
-- shop_listings
-- ---------------------------------------------------------------------------
create table if not exists public.shop_listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price_cents integer not null check (price_cents > 0),
  category shop_category not null,
  images text[] not null default '{}',
  status shop_status not null default 'disponibile',
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create index if not exists shop_listings_category_status_idx
  on public.shop_listings (category, status);

alter table public.shop_listings enable row level security;

drop policy if exists "shop_listings public read" on public.shop_listings;
create policy "shop_listings public read"
  on public.shop_listings
  for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- contact_messages (admin-only; written via API route with the service role)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
-- No policies at all: only the service role (bypassing RLS) can read/write.

-- ---------------------------------------------------------------------------
-- Storage bucket for portfolio + shop images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'media');

-- No insert/update/delete policies on storage.objects for anon/authenticated:
-- uploads happen server-side from the admin panel using the service role key.
