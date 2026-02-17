'use client'

import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff, Search, CheckCircle2, Sparkles } from 'lucide-react'
import { deletePost } from '@/app/admin/posts/actions'
import { useState } from 'react'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  title: string
  created_at: string
  published: boolean
  content: string
  thumbnail_url: string | null
  video_url: string | null
}

interface SEOCheck extends Post {
  createdLabel?: string
  issues: string[]
}

export default function PostsListClient({ 
  posts,
  seoChecks,
  seoNeedsAttention,
  seoReadyCount
}: { 
  posts: Post[]
  seoChecks: SEOCheck[]
  seoNeedsAttention: SEOCheck[]
  seoReadyCount: number
}) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      await deletePost(deleteId)
      setDeleteId(null)
      router.refresh()
    } catch (error) {
      console.error('Failed to delete post:', error)
      alert('Failed to delete post. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-6 sm:px-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Posts</h3>
            <p className="mt-1 text-sm text-slate-300">
              Manage your tutorials and blog content.
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </div>
        <div className="border-t border-white/10">
          <ul role="list" className="divide-y divide-white/10">
            {seoChecks && seoChecks.length > 0 ? (
              seoChecks.map((post, index) => (
                <li key={post.id} className="px-4 py-4 sm:px-6 hover:bg-white/5 transition overflow-hidden">
                  <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[minmax(0,1fr)_min-content_min-content] sm:items-center sm:gap-x-4 sm:gap-y-0">
                    <div className="flex-1 min-w-0 flex items-start gap-3 overflow-hidden">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-xs font-medium text-slate-400 border border-white/10 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-white truncate">{post.title}</p>
                        <p className="mt-2 text-xs text-slate-400 truncate">
                          {post.createdLabel}
                        </p>
                        <div className="mt-3 sm:hidden">
                          {post.published ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-200">
                              <Eye className="h-3 w-3 mr-1" /> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200">
                              <EyeOff className="h-3 w-3 mr-1" /> Draft
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block flex-shrink-0 sm:justify-self-start">
                      {post.published ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-200">
                          <Eye className="h-3 w-3 mr-1" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200">
                          <EyeOff className="h-3 w-3 mr-1" /> Draft
                        </span>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex flex-wrap items-center gap-3 sm:justify-self-end">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(post.id)}
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
                No posts yet. Create your first tutorial.
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
            Track which tutorials need SEO updates and jump directly to fix them.
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              <p className="text-slate-400">Total posts</p>
              <p className="mt-1 text-white">{posts?.length ?? 0}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              <p className="text-slate-400">Need SEO updates</p>
              <p className="mt-1 text-white">{seoNeedsAttention.length}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              <p className="text-slate-400">SEO ready</p>
              <p className="mt-1 text-white">{seoReadyCount < 0 ? 0 : seoReadyCount}</p>
            </div>
          </div>
        </div>

        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <p className="text-sm font-semibold">Fix SEO Issues</p>
          </div>
          {seoNeedsAttention.length > 0 ? (
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {seoNeedsAttention.slice(0, 5).map((post) => (
                <li key={post.id} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-white font-semibold truncate">{post.title}</p>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-xs font-semibold text-sky-300 hover:text-sky-200"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                    {post.issues.map((issue: string) => (
                      <span key={issue} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                        {issue}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-300">All posts look SEO ready.</p>
          )}
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

      <DeleteConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  )
}
