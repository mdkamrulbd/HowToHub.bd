import { readHomeContent } from '@/utils/homeContentStore'
import { updateHomeContent } from './actions'
import { Save } from 'lucide-react'

export default async function HomeContentPage() {
  const contentData = await readHomeContent()

  const defaultContent = {
    hero_badge: 'টেকনোলজি সমস্যার স্মার্ট সমাধান',
    hero_title_prefix: 'বাংলাদেশের',
    hero_title_accent: 'স্মার্ট টিউটোরিয়াল',
    hero_title_suffix: ' হাব',
    hero_description: 'HowToHub.bd তে পাবেন টেকনোলজি, স্মার্টফোন ও কম্পিউটার সফটওয়্যারের সমস্যা সমাধান, দরকারি টিপস-ট্রিকস, আর ইমেইলে পাঠানো সমস্যার সমাধানভিত্তিক পোস্ট ও ভিডিও—সবই বাংলাদেশের স্মার্ট টিউটোরিয়াল হাবে।',
    primary_cta_label: 'টিউটোরিয়াল দেখুন',
    primary_cta_href: '/#tutorials',
    secondary_cta_label: 'ভিডিও দেখুন',
    secondary_cta_href: 'https://youtube.com',
    feature_panel_title: 'আপনার দরকারি টেক সলিউশন',
    feature_panel_badge: 'ইমেইলে আপডেট নিন',
    feature_one_title: 'টেক সমস্যা সমাধান',
    feature_one_description: 'স্মার্টফোন ও কম্পিউটার সফটওয়্যারের ফিক্স।',
    feature_two_title: 'টিপস ও ট্রিকস',
    feature_two_description: 'দ্রুত শেখার শর্টকাট ও কাজের হ্যাকস।',
    feature_three_title: 'ইমেইল সমাধান',
    feature_three_description: 'আপনার প্রশ্ন থেকে পোস্ট ও ভিডিও উত্তর।',
    categories: ['ওয়েব ডেভ', 'ডিজাইন', 'এআই টুলস', 'প্রোডাক্টিভিটি', 'মার্কেটিং', 'বিজনেস'],
    tutorials_title: 'টিউটোরিয়াল সমূহ',
    tutorials_subtitle: 'প্রযুক্তি এবং টিউটোরিয়ালের সেরা কালেকশন এক জায়গায়।',
    tutorials_search_placeholder: 'টিউটোরিয়াল সার্চ করুন',
    empty_posts_message: 'এখনো কোনো টিউটোরিয়াল নেই। শিগগিরই দেখুন।',
    pinned_section_title: '📌 পিন টিউটোরিয়াল',
    trending_section_title: '🔥 জনপ্রিয় টিউটোরিয়াল',
    subscribe_title: 'সেরা টিউটোরিয়াল মিস করবেন না',
    subscribe_subtitle: 'মাত্র একটি ইমেইলে এক্সক্লুসিভ টিপস, নতুন ভিডিও আর স্পেশাল গাইড—সবার আগে আপনার ইনবক্সে।',
    footer_title: 'HowToHub.bd',
    footer_description: 'বাংলাদেশের জন্য ফ্রি ও মানসম্মত ডিজিটাল শিক্ষা। আমাদের কমিউনিটিতে যোগ দিন, আজই নতুন স্কিল শিখুন।',
    footer_email: 'contact@howtohub.bd',
    footer_address: 'ঢাকা, বাংলাদেশ',
    footer_credit: 'HowToHub.bd. সর্বস্বত্ব সংরক্ষিত।',
    social_links: {
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      x: 'https://x.com',
      instagram: 'https://instagram.com',
    },
  }

  const content = {
    ...defaultContent,
    ...(contentData ?? {}),
  }

  const categoriesValue = Array.isArray(content.categories)
    ? content.categories.join(', ')
    : defaultContent.categories.join(', ')
  const defaultQuickLinks = [
    { label: 'হোম', href: '/' },
    { label: 'সব টিউটোরিয়াল', href: '/#tutorials' },
    { label: 'আমাদের সম্পর্কে', href: '/about' },
    { label: 'যোগাযোগ', href: '/contact' },
  ]
  const quickLinksValue = Array.isArray(content.quick_links) && content.quick_links.length > 0
    ? content.quick_links.map((l) => `${(l as {label: string; href: string}).label}|${(l as {label: string; href: string}).href}`).join('\n')
    : defaultQuickLinks.map((l) => `${l.label}|${l.href}`).join('\n')

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold text-white">Home Content</h3>
          <p className="mt-1 text-sm text-slate-300">হোম পেইজের সকল স্ট্যাটিক কনটেন্ট আপডেট করুন।</p>
        </div>
        <div className="border-t border-white/10 px-4 py-5 sm:p-6">
          <form action={updateHomeContent} className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Hero</h4>
              <div>
                <label htmlFor="hero_badge" className="block text-sm font-medium text-slate-200">Badge</label>
                <input
                  id="hero_badge"
                  name="hero_badge"
                  defaultValue={content.hero_badge ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="hero_title_prefix" className="block text-sm font-medium text-slate-200">Title Prefix</label>
                  <input
                    id="hero_title_prefix"
                    name="hero_title_prefix"
                    defaultValue={content.hero_title_prefix ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="hero_title_accent" className="block text-sm font-medium text-slate-200">Title Accent</label>
                  <input
                    id="hero_title_accent"
                    name="hero_title_accent"
                    defaultValue={content.hero_title_accent ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="hero_title_suffix" className="block text-sm font-medium text-slate-200">Title Suffix</label>
                  <input
                    id="hero_title_suffix"
                    name="hero_title_suffix"
                    defaultValue={content.hero_title_suffix ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hero_description" className="block text-sm font-medium text-slate-200">Description</label>
                <textarea
                  id="hero_description"
                  name="hero_description"
                  rows={4}
                  defaultValue={content.hero_description ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="primary_cta_label" className="block text-sm font-medium text-slate-200">Primary CTA Label</label>
                  <input
                    id="primary_cta_label"
                    name="primary_cta_label"
                    defaultValue={content.primary_cta_label ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="primary_cta_href" className="block text-sm font-medium text-slate-200">Primary CTA Link</label>
                  <input
                    id="primary_cta_href"
                    name="primary_cta_href"
                    defaultValue={content.primary_cta_href ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="secondary_cta_label" className="block text-sm font-medium text-slate-200">Secondary CTA Label</label>
                  <input
                    id="secondary_cta_label"
                    name="secondary_cta_label"
                    defaultValue={content.secondary_cta_label ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="secondary_cta_href" className="block text-sm font-medium text-slate-200">Secondary CTA Link</label>
                  <input
                    id="secondary_cta_href"
                    name="secondary_cta_href"
                    defaultValue={content.secondary_cta_href ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Feature Panel</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="feature_panel_title" className="block text-sm font-medium text-slate-200">Panel Title</label>
                  <input
                    id="feature_panel_title"
                    name="feature_panel_title"
                    defaultValue={content.feature_panel_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_panel_badge" className="block text-sm font-medium text-slate-200">Panel Badge</label>
                  <input
                    id="feature_panel_badge"
                    name="feature_panel_badge"
                    defaultValue={content.feature_panel_badge ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="feature_one_title" className="block text-sm font-medium text-slate-200">Feature One Title</label>
                  <input
                    id="feature_one_title"
                    name="feature_one_title"
                    defaultValue={content.feature_one_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_one_description" className="block text-sm font-medium text-slate-200">Feature One Description</label>
                  <input
                    id="feature_one_description"
                    name="feature_one_description"
                    defaultValue={content.feature_one_description ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_two_title" className="block text-sm font-medium text-slate-200">Feature Two Title</label>
                  <input
                    id="feature_two_title"
                    name="feature_two_title"
                    defaultValue={content.feature_two_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_two_description" className="block text-sm font-medium text-slate-200">Feature Two Description</label>
                  <input
                    id="feature_two_description"
                    name="feature_two_description"
                    defaultValue={content.feature_two_description ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_three_title" className="block text-sm font-medium text-slate-200">Feature Three Title</label>
                  <input
                    id="feature_three_title"
                    name="feature_three_title"
                    defaultValue={content.feature_three_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_three_description" className="block text-sm font-medium text-slate-200">Feature Three Description</label>
                  <input
                    id="feature_three_description"
                    name="feature_three_description"
                    defaultValue={content.feature_three_description ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Categories</h4>
              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-slate-200">Comma separated</label>
                <input
                  id="categories"
                  name="categories"
                  defaultValue={categoriesValue}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Section Titles</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="pinned_section_title" className="block text-sm font-medium text-slate-200">Pinned Section Title</label>
                  <input
                    id="pinned_section_title"
                    name="pinned_section_title"
                    defaultValue={content.pinned_section_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="trending_section_title" className="block text-sm font-medium text-slate-200">Trending Section Title</label>
                  <input
                    id="trending_section_title"
                    name="trending_section_title"
                    defaultValue={content.trending_section_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Tutorials Section</h4>
              <div>
                <label htmlFor="tutorials_title" className="block text-sm font-medium text-slate-200">Title</label>
                <input
                  id="tutorials_title"
                  name="tutorials_title"
                  defaultValue={content.tutorials_title ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="tutorials_subtitle" className="block text-sm font-medium text-slate-200">Subtitle</label>
                <input
                  id="tutorials_subtitle"
                  name="tutorials_subtitle"
                  defaultValue={content.tutorials_subtitle ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="tutorials_search_placeholder" className="block text-sm font-medium text-slate-200">Search Placeholder</label>
                <input
                  id="tutorials_search_placeholder"
                  name="tutorials_search_placeholder"
                  defaultValue={content.tutorials_search_placeholder ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="empty_posts_message" className="block text-sm font-medium text-slate-200">Empty State Message</label>
                <input
                  id="empty_posts_message"
                  name="empty_posts_message"
                  defaultValue={content.empty_posts_message ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Subscribe Banner</h4>
              <div>
                <label htmlFor="subscribe_title" className="block text-sm font-medium text-slate-200">Title</label>
                <input
                  id="subscribe_title"
                  name="subscribe_title"
                  defaultValue={content.subscribe_title ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="subscribe_subtitle" className="block text-sm font-medium text-slate-200">Subtitle</label>
                <textarea
                  id="subscribe_subtitle"
                  name="subscribe_subtitle"
                  rows={3}
                  defaultValue={content.subscribe_subtitle ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Quick Links</h4>
              <div>
                <label htmlFor="quick_links" className="block text-sm font-medium text-slate-200">One per line (label|href)</label>
                <textarea
                  id="quick_links"
                  name="quick_links"
                  rows={4}
                  defaultValue={quickLinksValue}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="হোম|/\nসব টিউটোরিয়াল|/#tutorials"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Social Links</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="social_facebook" className="block text-sm font-medium text-slate-200">Facebook</label>
                  <input
                    id="social_facebook"
                    name="social_facebook"
                    defaultValue={content.social_links?.facebook ?? 'https://facebook.com'}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="social_youtube" className="block text-sm font-medium text-slate-200">YouTube</label>
                  <input
                    id="social_youtube"
                    name="social_youtube"
                    defaultValue={content.social_links?.youtube ?? 'https://youtube.com'}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="social_x" className="block text-sm font-medium text-slate-200">X</label>
                  <input
                    id="social_x"
                    name="social_x"
                    defaultValue={content.social_links?.x ?? 'https://x.com'}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="social_instagram" className="block text-sm font-medium text-slate-200">Instagram</label>
                  <input
                    id="social_instagram"
                    name="social_instagram"
                    defaultValue={content.social_links?.instagram ?? 'https://instagram.com'}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Footer</h4>
              <div>
                <label htmlFor="footer_title" className="block text-sm font-medium text-slate-200">Title</label>
                <input
                  id="footer_title"
                  name="footer_title"
                  defaultValue={content.footer_title ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="footer_description" className="block text-sm font-medium text-slate-200">Description</label>
                <textarea
                  id="footer_description"
                  name="footer_description"
                  rows={3}
                  defaultValue={content.footer_description ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="footer_email" className="block text-sm font-medium text-slate-200">Contact Email</label>
                  <input
                    id="footer_email"
                    name="footer_email"
                    type="email"
                    defaultValue={content.footer_email ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="footer_address" className="block text-sm font-medium text-slate-200">Address</label>
                  <input
                    id="footer_address"
                    name="footer_address"
                    defaultValue={content.footer_address ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="footer_credit" className="block text-sm font-medium text-slate-200">Credit Line</label>
                <input
                  id="footer_credit"
                  name="footer_credit"
                  defaultValue={content.footer_credit ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
