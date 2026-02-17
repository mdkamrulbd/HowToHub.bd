import { readHomeContent } from '@/utils/homeContentStore'
import { updateHomeContent } from './actions'
import ConfirmSubmit from '@/components/ConfirmSubmit'

export default async function HomeContentPage({
  searchParams,
}: {
  searchParams?: { success?: string; error?: string }
}) {
  const contentData = await readHomeContent()

  const defaultContent = {
    hero_badge: 'টেকনোলজি সমস্যার স্মার্ট সমাধান',
    hero_title_prefix: 'বাংলাদেশের',
    hero_title_accent: 'স্মার্ট টিউটোরিয়াল হাব',
    hero_title_suffix: '',
    hero_description: 'HowToHub.bd তে পাবেন টেকনোলজি, স্মার্টফোন ও কম্পিউটার সফটওয়্যারের সমস্যা সমাধান, দরকারি টিপস-ট্রিকস, আর ইমেইলে পাঠানো সমস্যার সমাধানভিত্তিক পোস্ট ও ভিডিও—সবই বাংলাদেশের স্মার্ট টিউটোরিয়াল হাবে।',
    primary_cta_label: 'টিউটোরিয়াল দেখুন',
    primary_cta_href: '/#tutorials',
    secondary_cta_label: 'ভিডিও দেখুন',
    secondary_cta_href: 'https://www.youtube.com/@HowToHub-BD',
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
      youtube: 'https://www.youtube.com/@HowToHub-BD',
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
          <h3 className="text-lg font-semibold text-white">হোম কনটেন্ট</h3>
          <p className="mt-1 text-sm text-slate-300">হোমপেজের প্রতিটি সেকশনের লেখা ও লিংক এখানে আপডেট করুন।</p>
        </div>
        {(searchParams?.success === '1' || searchParams?.error) && (
          <div className="px-4 sm:px-6">
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                searchParams?.success === '1'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-red-500/40 bg-red-500/10 text-red-200'
              }`}
            >
              {searchParams?.success === '1'
                ? 'হোম কনটেন্ট সফলভাবে আপডেট হয়েছে।'
                : searchParams?.error}
            </div>
          </div>
        )}
        <div className="border-t border-white/10 px-4 py-5 sm:p-6">
          <form id="home-content-form" action={updateHomeContent} className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">হিরো সেকশন</h4>
              <div>
                <label htmlFor="hero_badge" className="block text-sm font-medium text-slate-200">ব্যাজ</label>
                <input
                  id="hero_badge"
                  name="hero_badge"
                  defaultValue={content.hero_badge ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="hero_title_prefix" className="block text-sm font-medium text-slate-200">শিরোনাম (শুরু)</label>
                  <input
                    id="hero_title_prefix"
                    name="hero_title_prefix"
                    defaultValue={content.hero_title_prefix ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="hero_title_accent" className="block text-sm font-medium text-slate-200">শিরোনাম (হাইলাইট)</label>
                  <input
                    id="hero_title_accent"
                    name="hero_title_accent"
                    defaultValue={content.hero_title_accent ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="hero_title_suffix" className="block text-sm font-medium text-slate-200">শিরোনাম (শেষ)</label>
                  <input
                    id="hero_title_suffix"
                    name="hero_title_suffix"
                    defaultValue={content.hero_title_suffix ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hero_description" className="block text-sm font-medium text-slate-200">বর্ণনা</label>
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
                  <label htmlFor="primary_cta_label" className="block text-sm font-medium text-slate-200">প্রাইমারি বাটন টেক্সট</label>
                  <input
                    id="primary_cta_label"
                    name="primary_cta_label"
                    defaultValue={content.primary_cta_label ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="primary_cta_href" className="block text-sm font-medium text-slate-200">প্রাইমারি বাটন লিংক</label>
                  <input
                    id="primary_cta_href"
                    name="primary_cta_href"
                    defaultValue={content.primary_cta_href ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="secondary_cta_label" className="block text-sm font-medium text-slate-200">সেকেন্ডারি বাটন টেক্সট</label>
                  <input
                    id="secondary_cta_label"
                    name="secondary_cta_label"
                    defaultValue={content.secondary_cta_label ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="secondary_cta_href" className="block text-sm font-medium text-slate-200">সেকেন্ডারি বাটন লিংক</label>
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
              <h4 className="text-base font-semibold text-white">ফিচার সেকশন</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="feature_panel_title" className="block text-sm font-medium text-slate-200">সেকশন শিরোনাম</label>
                  <input
                    id="feature_panel_title"
                    name="feature_panel_title"
                    defaultValue={content.feature_panel_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_panel_badge" className="block text-sm font-medium text-slate-200">সেকশন ব্যাজ</label>
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
                  <label htmlFor="feature_one_title" className="block text-sm font-medium text-slate-200">ফিচার ১ শিরোনাম</label>
                  <input
                    id="feature_one_title"
                    name="feature_one_title"
                    defaultValue={content.feature_one_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_one_description" className="block text-sm font-medium text-slate-200">ফিচার ১ বর্ণনা</label>
                  <input
                    id="feature_one_description"
                    name="feature_one_description"
                    defaultValue={content.feature_one_description ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_two_title" className="block text-sm font-medium text-slate-200">ফিচার ২ শিরোনাম</label>
                  <input
                    id="feature_two_title"
                    name="feature_two_title"
                    defaultValue={content.feature_two_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_two_description" className="block text-sm font-medium text-slate-200">ফিচার ২ বর্ণনা</label>
                  <input
                    id="feature_two_description"
                    name="feature_two_description"
                    defaultValue={content.feature_two_description ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_three_title" className="block text-sm font-medium text-slate-200">ফিচার ৩ শিরোনাম</label>
                  <input
                    id="feature_three_title"
                    name="feature_three_title"
                    defaultValue={content.feature_three_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="feature_three_description" className="block text-sm font-medium text-slate-200">ফিচার ৩ বর্ণনা</label>
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
              <h4 className="text-base font-semibold text-white">ক্যাটাগরি</h4>
              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-slate-200">কমা দিয়ে আলাদা করুন</label>
                <input
                  id="categories"
                  name="categories"
                  defaultValue={categoriesValue}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
                <p className="mt-2 text-sm text-slate-400">উদাহরণ: টেক, টিপস, ভিডিও</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">পিনড/জনপ্রিয় সেকশন</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="pinned_section_title" className="block text-sm font-medium text-slate-200">পিনড শিরোনাম</label>
                  <input
                    id="pinned_section_title"
                    name="pinned_section_title"
                    defaultValue={content.pinned_section_title ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="trending_section_title" className="block text-sm font-medium text-slate-200">জনপ্রিয় শিরোনাম</label>
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
              <h4 className="text-base font-semibold text-white">টিউটোরিয়াল সেকশন</h4>
              <div>
                <label htmlFor="tutorials_title" className="block text-sm font-medium text-slate-200">শিরোনাম</label>
                <input
                  id="tutorials_title"
                  name="tutorials_title"
                  defaultValue={content.tutorials_title ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="tutorials_subtitle" className="block text-sm font-medium text-slate-200">সাবটাইটেল</label>
                <input
                  id="tutorials_subtitle"
                  name="tutorials_subtitle"
                  defaultValue={content.tutorials_subtitle ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="tutorials_search_placeholder" className="block text-sm font-medium text-slate-200">সার্চ প্লেসহোল্ডার</label>
                <input
                  id="tutorials_search_placeholder"
                  name="tutorials_search_placeholder"
                  defaultValue={content.tutorials_search_placeholder ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="empty_posts_message" className="block text-sm font-medium text-slate-200">খালি অবস্থার বার্তা</label>
                <input
                  id="empty_posts_message"
                  name="empty_posts_message"
                  defaultValue={content.empty_posts_message ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">সাবস্ক্রাইব সেকশন</h4>
              <div>
                <label htmlFor="subscribe_title" className="block text-sm font-medium text-slate-200">শিরোনাম</label>
                <input
                  id="subscribe_title"
                  name="subscribe_title"
                  defaultValue={content.subscribe_title ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="subscribe_subtitle" className="block text-sm font-medium text-slate-200">সাবটাইটেল</label>
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
              <h4 className="text-base font-semibold text-white">ফুটার কুইক লিংক</h4>
              <div>
                <label htmlFor="quick_links" className="block text-sm font-medium text-slate-200">প্রতি লাইনে (টেক্সট|লিংক)</label>
                <textarea
                  id="quick_links"
                  name="quick_links"
                  rows={4}
                  defaultValue={quickLinksValue}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="হোম|/\nসব টিউটোরিয়াল|/#tutorials"
                />
                <p className="mt-2 text-sm text-slate-400">উদাহরণ: যোগাযোগ|/contact</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">সোশ্যাল লিংক</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="social_facebook" className="block text-sm font-medium text-slate-200">ফেসবুক</label>
                  <input
                    id="social_facebook"
                    name="social_facebook"
                    defaultValue={content.social_links?.facebook ?? 'https://facebook.com'}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="social_youtube" className="block text-sm font-medium text-slate-200">ইউটিউব</label>
                  <input
                    id="social_youtube"
                    name="social_youtube"
                    defaultValue={content.social_links?.youtube ?? 'https://www.youtube.com/@HowToHub-BD'}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="social_x" className="block text-sm font-medium text-slate-200">এক্স</label>
                  <input
                    id="social_x"
                    name="social_x"
                    defaultValue={content.social_links?.x ?? 'https://x.com'}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="social_instagram" className="block text-sm font-medium text-slate-200">ইনস্টাগ্রাম</label>
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
              <h4 className="text-base font-semibold text-white">ফুটার</h4>
              <div>
                <label htmlFor="footer_title" className="block text-sm font-medium text-slate-200">শিরোনাম</label>
                <input
                  id="footer_title"
                  name="footer_title"
                  defaultValue={content.footer_title ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="footer_description" className="block text-sm font-medium text-slate-200">বর্ণনা</label>
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
                  <label htmlFor="footer_email" className="block text-sm font-medium text-slate-200">ইমেইল</label>
                  <input
                    id="footer_email"
                    name="footer_email"
                    type="email"
                    defaultValue={content.footer_email ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div>
                  <label htmlFor="footer_address" className="block text-sm font-medium text-slate-200">ঠিকানা</label>
                  <input
                    id="footer_address"
                    name="footer_address"
                    defaultValue={content.footer_address ?? ''}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="footer_credit" className="block text-sm font-medium text-slate-200">ক্রেডিট লাইন</label>
                <input
                  id="footer_credit"
                  name="footer_credit"
                  defaultValue={content.footer_credit ?? ''}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <ConfirmSubmit
                formId="home-content-form"
                label="সেভ করুন"
                confirmTitle="পরিবর্তন নিশ্চিত?"
                confirmMessage="এই পরিবর্তনগুলো সেভ করতে চান?"
                confirmLabel="হ্যাঁ, সেভ করুন"
                cancelLabel="বাতিল"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
