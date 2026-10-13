-- Run this migration in the Supabase SQL Editor.
-- The service-role key is used only by Vercel server functions.

create extension if not exists pgcrypto;

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  passcode text not null unique,
  name text not null,
  type text not null check (type in ('person', 'couple', 'family')),
  greeting text,
  dress_code_enabled boolean not null default false,
  dress_code_label text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint guests_passcode_uppercase check (passcode = upper(passcode))
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null unique references public.guests(id) on delete cascade,
  attendance text not null check (attendance in ('attending', 'not_attending')),
  message text check (message is null or char_length(message) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rsvps_attendance_idx on public.rsvps(attendance);

-- Deny direct access through the public anon/authenticated API.
alter table public.guests enable row level security;
alter table public.rsvps enable row level security;

revoke all on table public.guests from anon, authenticated;
revoke all on table public.rsvps from anon, authenticated;

-- Vercel server functions use the service role key, which bypasses RLS.
-- Never expose that key in client-side code.
