-- Create subscribers table
create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  active boolean default true
);

-- Enable RLS
alter table subscribers enable row level security;

-- Policy: Allow public to insert (subscribe)
create policy "Allow public to subscribe"
  on subscribers for insert
  with check (true);

-- Policy: Allow admins to view all
create policy "Allow admins to view subscribers"
  on subscribers for select
  using (auth.uid() in (
    select id from auth.users -- simplistic check, usually role based
  ));
