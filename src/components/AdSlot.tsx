import Image from 'next/image'

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

export default function AdSlot({ ads }: { ads: Ad[] }) {
  if (!ads || ads.length === 0) return null

  return (
    <div className="grid gap-4 w-full">
      {ads.map((ad) => (
        <div key={ad.id} className="surface rounded-2xl p-0 overflow-hidden relative group">
          {/* Label */}
          <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded border border-white/10">
            বিজ্ঞাপন
          </div>

          {ad.type === 'image' && ad.image_url && (
            <div className="relative w-full aspect-[21/9] sm:aspect-[32/9] md:aspect-[40/9] lg:aspect-[50/9] max-h-[300px]">
              {ad.link_url ? (
                <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                  <Image
                    src={ad.image_url}
                    alt={ad.title || 'বিজ্ঞাপন'}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                     {ad.title && <h3 className="text-white text-lg sm:text-2xl font-bold drop-shadow-lg mb-1">{ad.title}</h3>}
                     {ad.description && <p className="text-slate-200 text-xs sm:text-sm drop-shadow-md max-w-2xl">{ad.description}</p>}
                  </div>
                </a>
              ) : (
                <>
                  <Image
                    src={ad.image_url}
                    alt={ad.title || 'বিজ্ঞাপন'}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                    unoptimized
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                   <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                     {ad.title && <h3 className="text-white text-lg sm:text-2xl font-bold drop-shadow-lg mb-1">{ad.title}</h3>}
                     {ad.description && <p className="text-slate-200 text-xs sm:text-sm drop-shadow-md max-w-2xl">{ad.description}</p>}
                  </div>
                </>
              )}
            </div>
          )}

          {ad.type === 'text' && (
            <div className="p-6 sm:p-8 text-center bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900/40 border border-white/5">
              {ad.title && <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{ad.title}</h4>}
              {ad.description && <p className="text-slate-300 max-w-2xl mx-auto mb-4">{ad.description}</p>}
              {ad.link_url && (
                <a
                  href={ad.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition shadow-lg shadow-white/10"
                >
                  বিস্তারিত দেখুন
                </a>
              )}
            </div>
          )}

          {ad.type === 'html' && ad.html && (
            <div className="p-4 w-full flex justify-center bg-slate-900/50">
              <div dangerouslySetInnerHTML={{ __html: ad.html }} className="max-w-full overflow-auto" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
