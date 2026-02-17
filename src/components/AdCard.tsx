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
  placement: string
}

export default function AdCard({ ad }: { ad: Ad }) {
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
    <div className="surface rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10 transition duration-300 hover:translate-y-[-4px] relative group border border-amber-500/20 h-full flex flex-col">
       <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
        বিজ্ঞাপন
      </div>
      
      <a href={linkUrl} target={target} rel="noopener noreferrer" className="block h-full flex flex-col">
        <div className="relative h-48 w-full shrink-0">
          <Image
            src={thumbnailUrl}
            alt={ad.title || 'Advertisement'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-indigo-300 transition-colors">
              {ad.title || 'Sponsored Content'}
            </h3>
          </div>
        </div>
        
        <div className="p-5 flex flex-col grow">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              স্পন্সরড
            </span>
          </div>
          
          <p className="mt-3 text-sm text-slate-200 line-clamp-3 mb-4 grow">
            {ad.description || 'Check out this sponsored content.'}
          </p>
          
          <div className="mt-auto">
             <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 group-hover:bg-amber-500/20 transition">
              বিস্তারিত দেখুন <ExternalLink className="ml-1.5 h-3 w-3" />
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}
