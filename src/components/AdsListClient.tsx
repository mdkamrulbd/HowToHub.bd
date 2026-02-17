'use client'

import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff, Search, CheckCircle2, Sparkles } from 'lucide-react'
import { deleteAd } from '@/app/admin/ads/actions'
import { useState } from 'react'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'
import { useRouter } from 'next/navigation'

const typeLabel: Record<string, string> = {
  image: 'Image Banner',
  html: 'HTML Block',
  text: 'Text Banner',
}

const placementLabel: Record<string, string> = {
  home_hero: 'Home Hero',
  home_middle: 'Home Middle',
  home_footer: 'Home Footer',
  post_top: 'Post Top',
  post_inline: 'Post Middle',
  post_bottom: 'Post Bottom',
}

interface Ad {
  id: string
  title: string | null
  placement: string | string[]
  type: string
  starts_at: string | null
  ends_at: string | null
  enabled: boolean
}

export default function AdsPage({ ads }: { ads: Ad[] }) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const dateFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' })

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      await deleteAd(deleteId)
      setDeleteId(null)
      router.refresh()
    } catch (error) {
      console.error('Failed to delete ad:', error)
      alert('Failed to delete ad. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="surface rounded-2xl overflow-hidden">
          <div className="px-4 py-6 sm:px-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Ads</h3>
              <p className="mt-1 text-sm text-slate-300">
                Create and manage ads for the home and post pages.
              </p>
            </div>
            <Link
              href="/admin/ads/new"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Ad
            </Link>
          </div>
          <div className="border-t border-white/10">
            <ul role="list" className="divide-y divide-white/10">
              {ads && ads.length > 0 ? (
                ads.map((ad, index) => (
                  <li key={ad.id} className="px-4 py-4 sm:px-6 hover:bg-white/5 transition">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-xs font-medium text-slate-400 border border-white/10 mt-0.5">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {ad.title || 'Untitled Ad'}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                          <span className="chip px-2 py-0.5 rounded-full text-slate-200">
                            {Array.isArray(ad.placement) 
                              ? ad.placement.map((p: string) => placementLabel[p] || p).join(', ')
                              : placementLabel[ad.placement] || ad.placement
                            }
                          </span>
                          <span className="chip px-2 py-0.5 rounded-full text-slate-200">
                            {typeLabel[ad.type] || ad.type}
                          </span>
                          {ad.starts_at && (
                            <span>
                              Starts: {dateFormatter.format(new Date(ad.starts_at))}
                            </span>
                          )}
                          {ad.ends_at && (
                            <span>
                              Ends: {dateFormatter.format(new Date(ad.ends_at))}
                            </span>
                          )}
                          {ad.enabled ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-200">
                              <Eye className="h-3 w-3 mr-1" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200">
                              <EyeOff className="h-3 w-3 mr-1" /> Paused
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/admin/ads/${ad.id}/edit`}
                          className="inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteId(ad.id)}
                          className="inline-flex items-center text-sm font-medium text-rose-300 hover:text-rose-200"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-12 text-center text-slate-400">
                  No ads yet. Create your first ad.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-6" id="seo">
          <div className="surface rounded-2xl p-5">
            <div className="flex items-center gap-2 text-slate-200">
              <Search className="h-4 w-4 text-sky-300" />
              <p className="text-sm font-semibold">SEO Overview</p>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Keep every post search-ready with consistent titles, descriptions, and structured media.
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="text-slate-400">Title length</p>
                <p className="mt-1 text-white">50–60 characters</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="text-slate-400">Meta description</p>
                <p className="mt-1 text-white">140–160 characters</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="text-slate-400">Primary keyword</p>
                <p className="mt-1 text-white">Use once in title + intro</p>
              </div>
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <p className="text-sm font-semibold">SEO Checklist</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Add descriptive thumbnail and alt text
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Use short, clean URL slugs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Include internal links to related posts
              </li>
            </ul>
          </div>

          <div className="surface rounded-2xl p-5">
            <div className="flex items-center gap-2 text-slate-200">
              <Sparkles className="h-4 w-4 text-sky-300" />
              <p className="text-sm font-semibold">Search Snippet Tips</p>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Start with a clear benefit statement, then add the exact keyword users search for.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">Bangla keywords</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">Video schema</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">Open Graph</span>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Ad"
        message="Are you sure you want to delete this ad? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  )
}
