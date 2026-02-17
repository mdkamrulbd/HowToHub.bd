import { createPost } from '../actions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewPostPage() {
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
          <h3 className="text-lg font-semibold text-white">Create New Post</h3>
          <p className="mt-1 text-sm text-slate-300">Add a new tutorial or blog entry.</p>
        </div>
        <div className="border-t border-white/10 px-4 py-5 sm:p-6">
          <form action={createPost} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-200">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Tutorial title"
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="https://www.youtube.com/watch?v=..."
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="https://example.com/image.jpg"
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="<p>Write your tutorial here...</p>"
                />
              </div>
              <p className="mt-2 text-sm text-slate-400">Basic HTML tags are supported.</p>
            </div>



            <div className="flex items-start gap-3">
              <input
                id="published"
                name="published"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/40"
              />
              <div className="text-sm">
                <label htmlFor="published" className="font-medium text-slate-200">
                  Publish now
                </label>
                <p className="text-slate-400">Uncheck to keep it as a draft.</p>
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
                Save Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
