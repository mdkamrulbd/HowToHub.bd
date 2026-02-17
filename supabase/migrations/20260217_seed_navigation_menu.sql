-- Seed default top-level navigation menu items if table is empty
do $$
begin
  if not exists (select 1 from public.navigation_menu limit 1) then
    insert into public.navigation_menu (label, href, sort_order, enabled)
    values
      ('হোম', '/', 0, true),
      ('টিউটোরিয়াল', '/#tutorials', 1, true),
      ('ভিডিও', 'https://www.youtube.com/@HowToHub-BD', 2, true),
      ('আমাদের সম্পর্কে', '/about', 3, true),
      ('যোগাযোগ', '/contact', 4, true);
  end if;
end;
$$;
