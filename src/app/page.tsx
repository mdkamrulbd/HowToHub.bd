import AdSlot from '@/components/AdSlot'
import AdListCard from '@/components/AdListCard'
import TutorialListCard from '@/components/TutorialListCard'
import CategoryList from '@/components/CategoryList'
import SubscribeForm from '@/components/SubscribeForm'
import { createClient } from '@/utils/supabase/server'
import { readHomeContent } from '@/utils/homeContentStore'
import { getDeterministicRandom } from '@/utils/random'
import { ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

interface Post {
  id: string
  title: string
  content: string
  thumbnail_url: string | null
  created_at: string
  video_url: string | null
  categories?: string[]
  slug?: string
  views?: number
  is_pinned?: boolean
  published?: boolean
}

interface Ad {
  id: string
  title: string | null
  description: string | null
  image_url: string | null
  link_url: string | null
  html: string | null
  type: string
  placement: string | string[]
  starts_at?: string | null
  ends_at?: string | null
  enabled?: boolean
}

type MixedItem = Post | { type: 'ad'; data: Ad }

export const revalidate = 0

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient()
  const { page, category } = await searchParams
  const currentPage = Number(page) || 1
  const currentCategory = category as string | undefined
  const POSTS_PER_PAGE = 21
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE - 1
  
  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    
  if (currentCategory) {
    query = query.contains('categories', [currentCategory])
  }
  
  const { data: posts, count, error } = await query.range(start, end)
  
  const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 0

  // Fetch unique categories
  let availableCategories: { name: string; count: number }[] = []
  
  const { data: uniqueCategories, error: rpcError } = await supabase.rpc('get_category_counts')
  
  if (!rpcError && uniqueCategories) {
    availableCategories = uniqueCategories
  } else {
    // Fallback: Fetch from posts table directly and aggregate in JS
    const { data: postsCategories } = await supabase
      .from('posts')
      .select('categories')
      .eq('published', true)
    
    if (postsCategories) {
      const categoryCounts: Record<string, number> = {}
      postsCategories.forEach(post => {
        if (Array.isArray(post.categories)) {
          post.categories.forEach((cat: string) => {
             if (cat) categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
          })
        }
      })
      
      availableCategories = Object.entries(categoryCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    }
  }

  const { data: pinnedPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .eq('is_pinned', true)
    .limit(3)

  const { data: trendingPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('views', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching posts:', error)
  }

  const { data: ads } = await supabase
    .from('ads')
    .select('*')
    .eq('enabled', true)
    .order('created_at', { ascending: false })

  const now = new Date()
  const activeAds = (ads || []).filter((ad) => {
    // Basic date validation
    const startsAt = ad.starts_at ? new Date(ad.starts_at) : null
    const endsAt = ad.ends_at ? new Date(ad.ends_at) : null
    if (startsAt && now < startsAt) return false
    if (endsAt && now > endsAt) return false
    
    return true
  })

  // Helper to filter ads by specific placement
  const getAdsByPlacement = (placement: string) => {
    return activeAds.filter(ad => {
      const placements = Array.isArray(ad.placement) ? ad.placement : [ad.placement]
      return placements.includes(placement)
    })
  }

  const homeHeroAds = getAdsByPlacement('home_hero').slice(0, 1)
  const homeMiddleAds = getAdsByPlacement('home_middle').slice(0, 1)
  const homeMiddleBannerAds = getAdsByPlacement('home_middle_banner').slice(0, 1)
  const homeFooterAds = getAdsByPlacement('home_footer').slice(0, 1)
  const homePinnedAds = getAdsByPlacement('home_pinned').slice(0, 1)
  const homePopularAds = getAdsByPlacement('home_popular').slice(0, 1)
  const homeRecentTopAds = getAdsByPlacement('home_recent_top').slice(0, 1)
  const homeRecentInlineAds = getAdsByPlacement('home_recent_inline')

  const { data: contentData } = await supabase
    .from('home_content')
    .select('*')
    .eq('key', 'default')
    .single()
  
  const fileContent = await readHomeContent()

  const defaultContent = {
    hero_badge: 'টেকনোলজি সমস্যার স্মার্ট সমাধান',
    hero_title_prefix: 'বাংলাদেশের',
    hero_title_accent: 'স্মার্ট টিউটোরিয়াল হাব',
    hero_title_suffix: '',
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
    pinned_section_title: 'Pinned Posts',
    trending_section_title: 'Popular Posts',
    tutorials_title: 'Recent Posts',
    tutorials_subtitle: 'প্রযুক্তি এবং টিউটোরিয়ালের সেরা কালেকশন এক জায়গায়।',
    tutorials_search_placeholder: 'টিউটোরিয়াল সার্চ করুন',
    empty_posts_message: 'এখনো কোনো টিউটোরিয়াল নেই। শিগগিরই দেখুন।',
    subscribe_title: 'সেরা টিউটোরিয়াল মিস করবেন না',
    subscribe_subtitle: 'মাত্র একটি ইমেইলে এক্সক্লুসিভ টিপস, নতুন ভিডিও আর স্পেশাল গাইড—সবার আগে আপনার ইনবক্সে।',
  }

  const content = {
    ...defaultContent,
    ...(contentData ?? {}),
    ...(fileContent ?? {}),
  }

  const categories = availableCategories.length > 0 ? availableCategories : (
    Array.isArray(content.categories) && content.categories.length > 0
      ? content.categories.map((c: string) => ({ name: c, count: 0 }))
      : defaultContent.categories.map((c: string) => ({ name: c, count: 0 }))
  )

  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 chip text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4" />
              <div>{content.hero_badge}</div>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {content.hero_title_prefix} <span className="text-gradient">{content.hero_title_accent}</span>{content.hero_title_suffix}
            </h1>
            <div className="mt-5 text-lg text-slate-200 max-w-xl">
              {content.hero_description}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {content.primary_cta_label && content.primary_cta_href ? (
                <Link
                  href={content.primary_cta_href}
                  className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg shadow-indigo-500/30"
                >
                  {content.primary_cta_label}
                </Link>
              ) : null}
              {content.secondary_cta_label && content.secondary_cta_href ? (
                <Link
                  href={content.secondary_cta_href}
                  className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10"
                >
                  {content.secondary_cta_label}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="surface-strong rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-lg font-semibold">{content.feature_panel_title}</h3>
              <span className="text-xs text-slate-300">{content.feature_panel_badge}</span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="surface rounded-2xl p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <p className="text-white font-semibold">{content.feature_one_title}</p>
                  <div className="text-sm text-slate-300">{content.feature_one_description}</div>
                </div>
              </div>
              <div className="surface rounded-2xl p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-fuchsia-300" />
                </div>
                <div>
                  <p className="text-white font-semibold">{content.feature_two_title}</p>
                  <div className="text-sm text-slate-300">{content.feature_two_description}</div>
                </div>
              </div>
              <div className="surface rounded-2xl p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-indigo-300" />
                </div>
                <div>
                  <p className="text-white font-semibold">{content.feature_three_title}</p>
                  <div className="text-sm text-slate-300">{content.feature_three_description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <AdSlot ads={homeHeroAds} />
        </div>

        <div className="mt-10">
          <AdSlot ads={homeMiddleAds} />
        </div>

        {pinnedPosts && pinnedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">{content.pinned_section_title}</h2>
            <div className="grid gap-6">
              {(() => {
                let displayedPinned: MixedItem[] = [];
                const pinned = pinnedPosts as unknown as Post[] || [];
                const ad = homePinnedAds[0] as unknown as Ad;

                if (ad) {
                  displayedPinned = [
                    ...pinned.slice(0, 2),
                    { type: 'ad', data: ad }
                  ];
                } else {
                  displayedPinned = pinned.slice(0, 3);
                }
                
                return displayedPinned.map((item, index) => {
                  if ('type' in item) {
                    return (
                      <div key={`ad-pinned-${index}`} className="h-full">
                        <AdListCard ad={item.data} />
                      </div>
                    )
                  }
                  return <TutorialListCard key={item.id} post={item} />
                })
              })()}
            </div>
          </div>
        )}

        <div className="mt-16">
          <AdSlot ads={homeMiddleBannerAds} />
        </div>

        {trendingPosts && trendingPosts.length > 0 && (
          <div className="mt-16">
             <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-fuchsia-400" />
                <h2 className="text-2xl font-bold text-white">{content.trending_section_title}</h2>
             </div>
            <div className="grid gap-6">
              {(() => {
                let displayedPosts: MixedItem[] = [];
                const trending = trendingPosts as unknown as Post[] || [];
                const ad = homePopularAds[0] as unknown as Ad;

                if (ad) {
                  displayedPosts = [
                    ...trending.slice(0, 2),
                    { type: 'ad', data: ad }
                  ];
                } else {
                  displayedPosts = trending.slice(0, 3);
                }
                
                return displayedPosts.map((item, index) => {
                  if ('type' in item) {
                    return (
                      <div key={`ad-${index}`} className="h-full">
                        <AdListCard ad={item.data} />
                      </div>
                    )
                  }
                  return <TutorialListCard key={item.id} post={item} />
                })
              })()}
            </div>
          </div>
        )}

        <div id="tutorials" className="mt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{content.tutorials_title}</h2>
              <div className="text-slate-300 mt-2">{content.tutorials_subtitle}</div>
            </div>
            
          </div>
          
          <div className="mt-8">
            <AdSlot ads={homeRecentTopAds} />
          </div>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
            {/* Posts Grid */}
            <div>
              <div className="grid gap-6">
                {(() => {
                  if (!posts || posts.length === 0) {
                     return (
                      <div className="surface rounded-2xl p-10 text-center text-slate-300 col-span-full">
                        {content.empty_posts_message}
                      </div>
                     )
                  }
                  
                  const mixedContent: MixedItem[] = [];
                  let adIndex = 0;
                  let nextAdPosition = getDeterministicRandom(`start-${currentPage}`, 4, 7);
                  let currentPostCount = 0;
                  
                  // Only insert ads if we have inline ads available
                  if (homeRecentInlineAds.length > 0) {
                     (posts as unknown as Post[]).forEach((post, index) => {
                       mixedContent.push(post);
                       currentPostCount++;
                       
                       if (currentPostCount === nextAdPosition) {
                         // Pick an ad (rotate through available ads)
                         const ad = homeRecentInlineAds[adIndex % homeRecentInlineAds.length];
                         mixedContent.push({ type: 'ad', data: ad as unknown as Ad });
                         adIndex++;
                         
                         // Reset counter and determine next random position (4 to 7 posts later)
                         currentPostCount = 0;
                         // Use post ID + page as seed for deterministic randomness
                         nextAdPosition = getDeterministicRandom(`${post.id}-${currentPage}-${index}`, 4, 7);
                       }
                     });
                  } else {
                    mixedContent.push(...(posts as unknown as Post[]));
                  }
                  
                  return mixedContent.map((item, index) => {
                    if ('type' in item) {
                      return (
                        <div key={`recent-ad-${index}`} className="h-full">
                          <AdListCard ad={item.data} />
                        </div>
                      )
                    }
                    return <TutorialListCard key={item.id} post={item} compact />
                  })
                })()}
              </div>
              
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/?page=${currentPage - 1}${currentCategory ? `&category=${encodeURIComponent(currentCategory)}` : ''}#tutorials`}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
                    >
                      Previous
                    </Link>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/?page=${p}${currentCategory ? `&category=${encodeURIComponent(currentCategory)}` : ''}#tutorials`}
                      className={`px-4 py-2 rounded-lg border transition ${
                        p === currentPage
                          ? 'bg-indigo-500 border-indigo-500 text-white'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}

                  {currentPage < totalPages && (
                    <Link
                      href={`/?page=${currentPage + 1}${currentCategory ? `&category=${encodeURIComponent(currentCategory)}` : ''}#tutorials`}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar with Search and Categories */}
            <div className="hidden lg:block">
               <div className="sticky top-24 space-y-6">
                <Suspense fallback={<div className="h-40 bg-white/5 rounded-2xl animate-pulse" />}>
                  <CategoryList categories={categories} currentCategory={currentCategory} />
                </Suspense>
                 
                 {/* Sidebar Ad */}
                 <div className="mt-6">
                    <AdSlot ads={homeRecentInlineAds.slice(0, 1)} /> 
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <Suspense fallback={<div className="h-40 bg-white/5 rounded-2xl animate-pulse" />}>
            <CategoryList categories={categories} title="ক্যাটাগরি সমূহ" currentCategory={currentCategory} />
          </Suspense>
        </div>

        <div className="mt-12 hidden lg:block">
          <AdSlot ads={homeFooterAds} />
        </div>

        <div className="mt-16 surface-strong rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{content.subscribe_title}</h3>
            <div className="text-slate-300 mt-1.5 text-xs sm:text-sm">{content.subscribe_subtitle}</div>
          </div>
          <SubscribeForm />
        </div>
      </div>
    </div>
  )
}
