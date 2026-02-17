create table if not exists home_content (
  key text primary key default 'default',
  hero_badge text,
  hero_title_prefix text,
  hero_title_accent text,
  hero_title_suffix text,
  hero_description text,
  primary_cta_label text,
  primary_cta_href text,
  secondary_cta_label text,
  secondary_cta_href text,
  feature_panel_title text,
  feature_panel_badge text,
  feature_one_title text,
  feature_one_description text,
  feature_two_title text,
  feature_two_description text,
  feature_three_title text,
  feature_three_description text,
  categories text[],
  tutorials_title text,
  tutorials_subtitle text,
  tutorials_search_placeholder text,
  empty_posts_message text,
  subscribe_title text,
  subscribe_subtitle text
);

alter table home_content enable row level security;

do $$
begin
  create policy "Authenticated can read home content" on home_content
    for select using (auth.role() = 'authenticated');
exception
  when duplicate_object then
    null;
end $$;

do $$
begin
  create policy "Authenticated can edit home content" on home_content
    for insert with check (auth.role() = 'authenticated');
exception
  when duplicate_object then
    null;
end $$;

do $$
begin
  create policy "Authenticated can update home content" on home_content
    for update using (auth.role() = 'authenticated');
exception
  when duplicate_object then
    null;
end $$;
