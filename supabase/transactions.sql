-- Pokreni u Supabase → SQL Editor ako tablica transactions još ne postoji.
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  category text,
  amount numeric not null,
  date date not null default current_date,
  type text not null check (type in ('income', 'expense')),
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Prijavljeni korisnici mogu sve" on public.transactions
  for all to authenticated using (true) with check (true);

-- Tablica clients: dodaj kolone koje stranica Klijenti koristi, ako nedostaju.
alter table public.clients add column if not exists company text;
alter table public.clients add column if not exists email text;
alter table public.clients add column if not exists status text default 'Aktivan';
