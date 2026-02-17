import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import AdSlot from '@/components/AdSlot'
import Comments from '@/components/Comments'
import DOMPurify from 'isomorphic-dompurify'
import ShareButton from '@/components/ShareButton'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 0

function getYoutubeId(url: string) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  // Handle URL encoded slug (e.g. Bengali characters)
  const decodedSlug = decodeURIComponent(slug)
  
  const supabase = await createClient()
  
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const isUuid = uuidRegex.test(decodedSlug)

  const postQuery = supabase.from('posts').select('*')
  const { data: post, error } = isUuid
    ? await postQuery.eq('id', decodedSlug).single()
    : await postQuery.eq('slug', decodedSlug).single()

  if (error || !post) {
    if (error) console.error('Error fetching post:', error)
    notFound()
  }

  // Increment view count
  try {
    await supabase.rpc('increment_view', { post_id: post.id })
  } catch (e) {
    console.error('Failed to increment view:', e)
  }

  const { data: ads } = await supabase
    .from('ads')
    .select('*')
    .eq('enabled', true)
    .in('placement', ['post_top', 'post_inline', 'post_bottom'])
    .order('created_at', { ascending: false })

  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  const now = new Date()
  const activeAds = (ads || []).filter((ad) => {
    const startsAt = ad.starts_at ? new Date(ad.starts_at) : null
    const endsAt = ad.ends_at ? new Date(ad.ends_at) : null
    if (startsAt && now < startsAt) return false
    if (endsAt && now > endsAt) return false
    return true
  })

  const adType = post.ad_script_type || 'default'
  const showDefaultAds = adType === 'default'
  const showCustomAds = adType === 'custom'

  const postTopAds = showDefaultAds ? activeAds.filter((ad) => ad.placement === 'post_top').slice(0, 1) : []
  const postInlineAds = showDefaultAds ? activeAds.filter((ad) => ad.placement === 'post_inline').slice(0, 1) : []
  const postBottomAds = showDefaultAds ? activeAds.filter((ad) => ad.placement === 'post_bottom').slice(0, 1) : []

  const formattedDate = new Date(post.created_at).toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const youtubeId = post.video_url ? getYoutubeId(post.video_url) : null
  const heroImage = post.thumbnail_url?.trim()
    ? post.thumbnail_url.trim()
    : `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20learning%20lab%20neon%20gradient%20desk&image_size=landscape_16_9`

  const postUrl = `https://howtohub.bd/posts/${decodedSlug}`

  return (
    <div className="page-bg min-h-screen py-12">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/#tutorials" className="inline-flex items-center text-slate-200 hover:text-white transition-colors surface px-4 py-2 rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            টিউটোরিয়াল তালিকায় ফিরুন
          </Link>
        </div>

        <div className="surface-strong rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="relative h-56 sm:h-64 w-full">
            <Image
              src={heroImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="px-6 sm:px-10 pb-6 sm:pb-10 w-full">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                  <span className="chip px-3 py-1 rounded-full text-xs font-semibold">টিউটোরিয়াল</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formattedDate}
                  </span>
                  <div className="ml-auto">
                    <ShareButton title={post.title} url={postUrl} />
                  </div>
                </div>
                <h1 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-slate-950/30">
            {post.video_url && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-indigo-500/10 bg-black/40">
                <div className="relative aspect-video w-full">
                  {youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={post.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-900">
                      <a
                        href={post.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center hover:text-blue-400 transition-colors"
                      >
                        <PlayCircle className="h-16 w-16 mb-4" />
                        <span className="text-xl font-medium">ভিডিওটি বাহিরের সাইটে দেখুন</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-none border-0 p-0 text-slate-100 bg-transparent">
              <div className="prose prose-lg max-w-none text-slate-100 prose-headings:text-white prose-p:text-slate-200 prose-li:text-slate-200 prose-strong:text-white prose-a:text-cyan-300">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
              </div>
            </div>

            {showCustomAds && post.custom_ad_code && (
              <div className="my-8 flex justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: post.custom_ad_code }} />
            )}
            
            <AdSlot ads={postTopAds} />
            <AdSlot ads={postInlineAds} />

            {/* Comments Section */}
            <Comments postId={post.id} initialComments={comments || []} />
          </div>

          <div className="px-6 py-6 bg-slate-950/40 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-slate-300">টিউটোরিয়ালটি কি আপনার কাজে লেগেছে?</p>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium mr-2">টিউটোরিয়াল শেয়ার করুন:</span>
              <ShareButton title={post.title} url={postUrl} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <AdSlot ads={postBottomAds} />
        </div>
      </article>
    </div>
  )
}
