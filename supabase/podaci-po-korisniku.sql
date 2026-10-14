-- Svaki korisnik vidi i mijenja samo svoje podatke.
-- Pokreni jednom u Supabase → SQL Editor, NAKON transactions.sql.
-- Sigurno je pokrenuti i više puta.

do $$
declare
  t text;
  owner uuid;
  pol record;
begin
  -- Postojeći redovi dobivaju vlasnika: Sladin račun (UID iz Authentication → Users).
  select id into owner from auth.users where id = 'cb09d80f-f720-4b78-bbb6-aaa16890daf3';
  if owner is null then
    raise exception 'Vlasnički račun nije pronađen u auth.users';
  end if;

  foreach t in array array['clients', 'invoices', 'employees', 'projects', 'transactions'] loop
    if to_regclass('public.' || t) is null then
      continue;
    end if;

    execute format('alter table public.%I add column if not exists user_id uuid references auth.users(id) on delete cascade default auth.uid()', t);
    execute format('update public.%I set user_id = %L where user_id is null', t, owner);

    execute format('alter table public.%I enable row level security', t);

    -- Ukloni stara pravila koja su dopuštala svima sve.
    for pol in select policyname from pg_policies where schemaname = 'public' and tablename = t loop
      execute format('drop policy if exists %I on public.%I', pol.policyname, t);
    end loop;

    execute format(
      'create policy "Vlastiti podaci" on public.%I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())',
      t
    );
  end loop;
end $$;
