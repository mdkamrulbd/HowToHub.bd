import fs from 'fs/promises'
import path from 'path'

const storePath = path.join(process.cwd(), 'storage', 'home-content.json')

export type HomeContent = {
  hero_badge?: string | null
  hero_title_prefix?: string | null
  hero_title_accent?: string | null
  hero_title_suffix?: string | null
  hero_description?: string | null
  primary_cta_label?: string | null
  primary_cta_href?: string | null
  secondary_cta_label?: string | null
  secondary_cta_href?: string | null
  feature_panel_title?: string | null
  feature_panel_badge?: string | null
  feature_one_title?: string | null
  feature_one_description?: string | null
  feature_two_title?: string | null
  feature_two_description?: string | null
  feature_three_title?: string | null
  feature_three_description?: string | null
  categories?: string[] | null
  pinned_section_title?: string | null
  trending_section_title?: string | null
  tutorials_title?: string | null
  tutorials_subtitle?: string | null
  tutorials_search_placeholder?: string | null
  empty_posts_message?: string | null
  subscribe_title?: string | null
  subscribe_subtitle?: string | null
  footer_title?: string | null
  footer_description?: string | null
  footer_websites?: string[] | null
  footer_email?: string | null
  footer_address?: string | null
  footer_credit?: string | null
  quick_links?: { label: string; href: string }[] | null
  social_links?: {
    facebook?: string | null
    youtube?: string | null
    x?: string | null
    instagram?: string | null
  } | null
}

export async function readHomeContent(): Promise<HomeContent> {
  try {
    const data = await fs.readFile(storePath, 'utf-8')
    return JSON.parse(data) as HomeContent
  } catch {
    return {}
  }
}

export async function writeHomeContent(patch: Partial<HomeContent>): Promise<void> {
  const dir = path.dirname(storePath)
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
  let current: HomeContent = {}
  try {
    const data = await fs.readFile(storePath, 'utf-8')
    current = JSON.parse(data) as HomeContent
  } catch {}
  const next = { ...current, ...patch }
  await fs.writeFile(storePath, JSON.stringify(next, null, 2), 'utf-8')
}
