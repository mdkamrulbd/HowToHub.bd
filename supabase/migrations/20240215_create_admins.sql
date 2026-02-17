-- Create admins table to restrict access
create table if not exists admins (
  id uuid references auth.users not null primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table admins enable row level security;

-- Policy: Allow admins to view admins
create policy "Allow admins to view admins"
  on admins for select
  using (auth.uid() in (
    select id from admins
  ));

-- Trigger to automatically add first user as admin (optional, needs manual setup usually)
-- Better: Manually insert your email into admins table after creating it.
-- insert into admins (id, email) values ('your-user-id', 'your-email');
