-- Create navigation_menu table for managing site menu items and submenus
create extension if not exists pgcrypto;
create table if not exists public.navigation_menu (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text,
  parent_id uuid references public.navigation_menu(id) on delete cascade,
  sort_order integer not null default 0,
  enabled boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists navigation_menu_parent_idx on public.navigation_menu(parent_id);
create index if not exists navigation_menu_sort_idx on public.navigation_menu(parent_id, sort_order);

-- trigger to update updated_at on change
create or replace function public.navigation_menu_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_navigation_menu_set_updated_at on public.navigation_menu;
create trigger trg_navigation_menu_set_updated_at
before update on public.navigation_menu
for each row execute function public.navigation_menu_set_updated_at();

-- Enable RLS and add policies for admin/manager roles
alter table public.navigation_menu enable row level security;

drop policy if exists admin_manager_select_navigation_menu on public.navigation_menu;
create policy admin_manager_select_navigation_menu
on public.navigation_menu
for select
to authenticated
using (
  (current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role') in ('admin','manager')
);

drop policy if exists admin_manager_insert_navigation_menu on public.navigation_menu;
create policy admin_manager_insert_navigation_menu
on public.navigation_menu
for insert
to authenticated
with check (
  (current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role') in ('admin','manager')
);

drop policy if exists admin_manager_update_navigation_menu on public.navigation_menu;
create policy admin_manager_update_navigation_menu
on public.navigation_menu
for update
to authenticated
using (
  (current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role') in ('admin','manager')
)
with check (
  (current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role') in ('admin','manager')
);

drop policy if exists admin_manager_delete_navigation_menu on public.navigation_menu;
create policy admin_manager_delete_navigation_menu
on public.navigation_menu
for delete
to authenticated
using (
  (current_setting('request.jwt.claims', true)::jsonb -> 'user_metadata' ->> 'role') in ('admin','manager')
);
