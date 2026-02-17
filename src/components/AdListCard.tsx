import Image from 'next/image'
import { ExternalLink, User } from 'lucide-react'

interface Ad {
  id: string
  title: string | null
  description: string | null
  image_url: string | null
  link_url: string | null
  html: string | null
  type: string
  placement: string | string[]
}

export default function AdListCard({ ad }: { ad: Ad }) {
  if (ad.type === 'html' && ad.html) {
    return (
      <div className="surface rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10 h-full">
        <div className="p-4 h-full flex items-center justify-center">
          <div dangerouslySetInnerHTML={{ __html: ad.html }} className="w-full" />
        </div>
      </div>
    )
  }

  const thumbnailUrl = ad.image_url?.trim()
    ? ad.image_url.trim()
    : `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20advertisement%20cover%20minimal&image_size=landscape_16_9`

  const linkUrl = ad.link_url || '#'
  const target = ad.link_url ? '_blank' : '_self'

  return (
    <div className="surface rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10 transition duration-300 hover:bg-white/5 group border border-amber-500/20 hover:border-amber-500/40 flex flex-col sm:flex-row h-full relative">
       <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
        বিজ্ঞাপন
      </div>
      
      <a href={linkUrl} target={target} rel="noopener noreferrer" className="contents">
        <div className="relative h-48 sm:h-auto sm:w-72 shrink-0 overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={ad.title || 'Advertisement'}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover transition duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent sm:hidden" />
        </div>

        <div className="p-5 sm:p-6 flex flex-col grow">
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-amber-400" />
              স্পন্সরড
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white line-clamp-2 mb-2 group-hover:text-amber-400 transition-colors">
            {ad.title || 'Sponsored Content'}
          </h3>
          
          <p className="text-sm text-slate-300 line-clamp-2 sm:line-clamp-3 mb-4 grow leading-relaxed">
            {ad.description || 'Check out this sponsored content.'}
          </p>
          
          <div className="mt-auto pt-4 border-t border-white/5">
             <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 group-hover:bg-amber-500/20 transition">
              বিস্তারিত দেখুন <ExternalLink className="ml-1.5 h-3 w-3" />
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}
