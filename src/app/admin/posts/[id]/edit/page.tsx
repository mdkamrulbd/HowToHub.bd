import { updatePost } from '../../actions'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  const updatePostWithId = updatePost.bind(null, post.id)

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/admin/dashboard" className="inline-flex items-center text-sky-300 hover:text-sky-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Link>
      </div>

      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold text-white">Edit Post</h3>
          <p className="mt-1 text-sm text-slate-300">Update your tutorial content.</p>
        </div>
        <div className="border-t border-white/10 px-4 py-5 sm:p-6">
          <form action={updatePostWithId} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-200">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={post.title}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="video_url" className="block text-sm font-medium text-slate-200">
                Video URL (YouTube)
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="video_url"
                  id="video_url"
                  defaultValue={post.video_url || ''}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="thumbnail_url" className="block text-sm font-medium text-slate-200">
                Thumbnail URL (optional)
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="thumbnail_url"
                  id="thumbnail_url"
                  defaultValue={post.thumbnail_url || ''}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-slate-200">
                Categories
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="categories"
                  id="categories"
                  defaultValue={post.categories ? post.categories.join(', ') : ''}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Tech, Tutorial, Tips (comma separated)"
                />
              </div>
              <p className="mt-2 text-sm text-slate-400">Separate multiple categories with commas.</p>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-200">
                Content (HTML/Text)
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  required
                  defaultValue={post.content}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ad_script_type" className="block text-sm font-medium text-slate-200">
                  Ad Strategy
                </label>
                <div className="mt-1">
                  <select
                    id="ad_script_type"
                    name="ad_script_type"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 [&>option]:bg-slate-800"
                    defaultValue={post.ad_script_type || 'default'}
                  >
                    <option value="default">Default (System Ads)</option>
                    <option value="none">No Ads</option>
                    <option value="custom">Custom Ad Script</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="custom_ad_code" className="block text-sm font-medium text-slate-200">
                Custom Ad Code (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  id="custom_ad_code"
                  name="custom_ad_code"
                  defaultValue={post.custom_ad_code || ''}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono"
                  placeholder="<script>...</script>"
                  rows={8}
                />
              </div>
              <p className="mt-2 text-sm text-slate-400">Only used if Ad Strategy is &apos;Custom&apos;. This box is sized like a post content editor.</p>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="published"
                name="published"
                type="checkbox"
                defaultChecked={post.published}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/40"
              />
              <div className="text-sm">
                <label htmlFor="published" className="font-medium text-slate-200">
                  Publication status
                </label>
                <p className="text-slate-400">Check to make it public.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
