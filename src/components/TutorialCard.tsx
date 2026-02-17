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

export default function TutorialCard({ post }: { post: Post }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  // Fallback to ID if slug is not available (though it should be)
  const postLink = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`
  
  const plainText = post.content.replace(/<[^>]*>/g, '').replace(/[#*_`]/g, '')
  const excerpt = plainText.substring(0, 140) + (plainText.length > 140 ? '...' : '')
  const thumbnailUrl = post.thumbnail_url?.trim()
    ? post.thumbnail_url.trim()
    : `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20tutorial%20cover%20gradient%20abstract&image_size=landscape_16_9`

  return (
    <div className="surface rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10 transition duration-300 hover:translate-y-[-4px]">
      <div className="relative h-48 w-full">
        <Image
          src={thumbnailUrl}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        {post.categories && post.categories.length > 0 ? (
           <div className="absolute top-4 right-4 flex items-center gap-2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full border border-indigo-400 shadow-md shadow-indigo-500/30">
            {post.categories[0]}
          </div>
        ) : post.video_url && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
            <PlayCircle className="h-4 w-4" />
            ভিডিও
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <Link href={postLink}>
            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {post.title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            HowToHub
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-200 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={postLink}
          className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition"
        >
          বিস্তারিত পড়ুন
        </Link>
      </div>
    </div>
  )
}
