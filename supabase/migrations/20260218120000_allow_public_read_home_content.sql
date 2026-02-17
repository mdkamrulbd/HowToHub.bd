do $$
begin
  create policy "Public can read home content" on home_content
    for select using (true);
exception
  when duplicate_object then
    null;
end $$;

grant select on home_content to anon;
grant select on home_content to authenticated;
