-- Svaki korisnik vidi i mijenja samo svoje podatke.
-- Pokreni jednom u Supabase → SQL Editor, NAKON transactions.sql.
-- Sigurno je pokrenuti i više puta.

do $$
declare
  t text;
  owner uuid;
begin
  -- Postojeći redovi dobivaju vlasnika: najstariji račun (prvi registrirani korisnik).
  select id into owner from auth.users order by created_at limit 1;

  foreach t in array array['clients', 'invoices', 'employees', 'projects', 'transactions'] loop
    if to_regclass('public.' || t) is null then
      continue;
    end if;

    execute format('alter table public.%I add column if not exists user_id uuid references auth.users(id) on delete cascade default auth.uid()', t);
    if owner is not null then
      execute format('update public.%I set user_id = %L where user_id is null', t, owner);
    end if;

    execute format('alter table public.%I enable row level security', t);

    -- Ukloni stara pravila koja su dopuštala svima sve.
    execute (
      select coalesce(string_agg(format('drop policy if exists %I on public.%I;', policyname, t), ' '), '')
      from pg_policies where schemaname = 'public' and tablename = t
    );

    execute format(
      'create policy "Vlastiti podaci" on public.%I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())',
      t
    );
  end loop;
end $$;
