import Link from 'next/link'
import Image from 'next/image'
import { Calendar, PlayCircle, User } from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  thumbnail_url: string | null
  created_at: string
  video_url: string | null
  categories?: string[]
  slug?: string
}

export default function TutorialListCard({ post, compact }: { post: Post; compact?: boolean }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const postLink = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`
  
  const plainText = post.content.replace(/<[^>]*>/g, '').replace(/[#*_`]/g, '')
  const excerpt = plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '')
  const thumbnailUrl = post.thumbnail_url?.trim()
    ? post.thumbnail_url.trim()
    : `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20tutorial%20cover%20gradient%20abstract&image_size=landscape_16_9`

  return (
    <div className="surface rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10 transition duration-300 hover:bg-white/5 group border border-white/5 hover:border-white/10 flex flex-col sm:flex-row h-full">
      {/* Thumbnail Section */}
      <Link
        href={postLink}
        className={`relative ${compact ? 'h-44' : 'h-48'} sm:h-auto sm:w-72 shrink-0 overflow-hidden`}
      >
        <Image
          src={thumbnailUrl}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          className="object-cover transition duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent sm:hidden" />
        
        {post.categories && post.categories.length > 0 && (
           <div className="absolute top-3 left-3 flex items-center gap-2 bg-indigo-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-sm">
            {post.categories[0]}
          </div>
        )}
        
        {post.video_url && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            <PlayCircle className="h-3 w-3" />
            ভিডিও
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className={`flex flex-col grow ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6'}`}>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-indigo-400" />
            HowToHub
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            {formattedDate}
          </span>
        </div>

        <Link href={postLink} className="group-hover:text-indigo-300 transition-colors mb-2">
          <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-slate-300 line-clamp-2 sm:line-clamp-3 mb-4 leading-relaxed">
          {excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <Link
            href={postLink}
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
          >
            বিস্তারিত পড়ুন
            <span className="text-lg leading-none mb-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
