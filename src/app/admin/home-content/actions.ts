'use server'

import { revalidatePath } from 'next/cache'
import { writeHomeContent } from '@/utils/homeContentStore'

const clean = (value: FormDataEntryValue | null) => {
  if (!value) return null
  const trimmed = String(value).trim()
  return trimmed.length ? trimmed : null
}

export async function updateHomeContent(formData: FormData) {

  const categoriesValue = clean(formData.get('categories'))
  const categories = categoriesValue
    ? categoriesValue.split(',').map((item) => item.trim()).filter((item) => item.length > 0)
    : null
  const quickLinksRaw = String(formData.get('quick_links') || '').trim()
  const quick_links =
    quickLinksRaw.length > 0
      ? quickLinksRaw
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => {
            const [label, href] = line.split('|').map((s) => s.trim())
            if (!label || !href) return null
            return { label, href }
          })
          .filter((v): v is { label: string; href: string } => v !== null)
      : null
  const social_links = {
    facebook: clean(formData.get('social_facebook')),
    youtube: clean(formData.get('social_youtube')),
    x: clean(formData.get('social_x')),
    instagram: clean(formData.get('social_instagram')),
  }

  await writeHomeContent({
    hero_badge: clean(formData.get('hero_badge')),
    hero_title_prefix: clean(formData.get('hero_title_prefix')),
    hero_title_accent: clean(formData.get('hero_title_accent')),
    hero_title_suffix: clean(formData.get('hero_title_suffix')),
    hero_description: clean(formData.get('hero_description')),
    primary_cta_label: clean(formData.get('primary_cta_label')),
    primary_cta_href: clean(formData.get('primary_cta_href')),
    secondary_cta_label: clean(formData.get('secondary_cta_label')),
    secondary_cta_href: clean(formData.get('secondary_cta_href')),
    feature_panel_title: clean(formData.get('feature_panel_title')),
    feature_panel_badge: clean(formData.get('feature_panel_badge')),
    feature_one_title: clean(formData.get('feature_one_title')),
    feature_one_description: clean(formData.get('feature_one_description')),
    feature_two_title: clean(formData.get('feature_two_title')),
    feature_two_description: clean(formData.get('feature_two_description')),
    feature_three_title: clean(formData.get('feature_three_title')),
    feature_three_description: clean(formData.get('feature_three_description')),
    categories,
    pinned_section_title: clean(formData.get('pinned_section_title')),
    trending_section_title: clean(formData.get('trending_section_title')),
    tutorials_title: clean(formData.get('tutorials_title')),
    tutorials_subtitle: clean(formData.get('tutorials_subtitle')),
    tutorials_search_placeholder: clean(formData.get('tutorials_search_placeholder')),
    empty_posts_message: clean(formData.get('empty_posts_message')),
    subscribe_title: clean(formData.get('subscribe_title')),
    subscribe_subtitle: clean(formData.get('subscribe_subtitle')),
    footer_title: clean(formData.get('footer_title')),
    footer_description: clean(formData.get('footer_description')),
    footer_email: clean(formData.get('footer_email')),
    footer_address: clean(formData.get('footer_address')),
    footer_credit: clean(formData.get('footer_credit')),
    quick_links,
    social_links,
  })

  revalidatePath('/')
  revalidatePath('/admin/home-content')
}
