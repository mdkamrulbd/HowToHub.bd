'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { writeHomeContent } from '@/utils/homeContentStore'
import { createClient } from '@/utils/supabase/server'

const clean = (value: FormDataEntryValue | null) => {
  if (!value) return null
  const trimmed = String(value).trim()
  return trimmed.length ? trimmed : null
}

const ensureAccess = async (supabase: Awaited<ReturnType<typeof createClient>>) => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('Unauthorized')
  }
  const role = user.user_metadata?.role as string | undefined
  if (role && role !== 'admin' && role !== 'manager') {
    throw new Error('Unauthorized')
  }
}

export async function updateHomeContent(formData: FormData) {
  try {
    const supabase = await createClient()
    await ensureAccess(supabase)
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
    const footerWebsitesRaw = String(formData.get('footer_websites') || '').trim()
    const footer_websites =
      footerWebsitesRaw.length > 0
        ? footerWebsitesRaw
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
        : null
    const social_links = {
      facebook: clean(formData.get('social_facebook')),
      youtube: clean(formData.get('social_youtube')),
      x: clean(formData.get('social_x')),
      instagram: clean(formData.get('social_instagram')),
    }

    const payload = {
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
      footer_websites,
      footer_email: null,
      footer_address: null,
      footer_credit: clean(formData.get('footer_credit')),
      quick_links,
      social_links,
    }

    await writeHomeContent(payload)

    const dbPayload = {
      key: 'default',
      hero_badge: payload.hero_badge,
      hero_title_prefix: payload.hero_title_prefix,
      hero_title_accent: payload.hero_title_accent,
      hero_title_suffix: payload.hero_title_suffix,
      hero_description: payload.hero_description,
      primary_cta_label: payload.primary_cta_label,
      primary_cta_href: payload.primary_cta_href,
      secondary_cta_label: payload.secondary_cta_label,
      secondary_cta_href: payload.secondary_cta_href,
      feature_panel_title: payload.feature_panel_title,
      feature_panel_badge: payload.feature_panel_badge,
      feature_one_title: payload.feature_one_title,
      feature_one_description: payload.feature_one_description,
      feature_two_title: payload.feature_two_title,
      feature_two_description: payload.feature_two_description,
      feature_three_title: payload.feature_three_title,
      feature_three_description: payload.feature_three_description,
      categories,
      tutorials_title: payload.tutorials_title,
      tutorials_subtitle: payload.tutorials_subtitle,
      tutorials_search_placeholder: payload.tutorials_search_placeholder,
      empty_posts_message: payload.empty_posts_message,
      subscribe_title: payload.subscribe_title,
      subscribe_subtitle: payload.subscribe_subtitle,
    }

    const { error } = await supabase
      .from('home_content')
      .upsert(dbPayload, { onConflict: 'key' })
    if (error) {
      throw new Error('হোম কনটেন্ট ডাটাবেসে সেভ করা যায়নি।')
    }

    revalidatePath('/')
    revalidatePath('/admin/home-content')
    redirect('/admin/home-content?success=1')
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'হোম কনটেন্ট সেভ করতে সমস্যা হয়েছে।'
    redirect(`/admin/home-content?error=${encodeURIComponent(message)}`)
  }
}
