
import { createClient } from '@/utils/supabase/server'
import PinToggle from './PinToggle'
import PinnedPostSearch from './PinnedPostSearch'

export default async function PinnedPostsPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, published, created_at, is_pinned')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  const pinnedCount = posts?.filter((p) => p.is_pinned).length || 0

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Pinned Posts</h3>
              <p className="mt-1 text-sm text-slate-300">
                Select up to 3 posts to pin on the homepage.
              </p>
            </div>
            <div className="bg-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-sm font-medium">
              {pinnedCount}/3 Pinned
            </div>
          </div>
          
          <PinnedPostSearch posts={posts || []} />
        </div>

        <div className="border-t border-white/10">
          <ul role="list" className="divide-y divide-white/10">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <li
                  key={post.id}
                  className="px-4 py-4 sm:px-6 hover:bg-white/5 transition"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${post.is_pinned ? 'text-indigo-300' : 'text-white'}`}>
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 truncate">
                        {new Date(post.created_at).toLocaleDateString()} • {post.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <PinToggle id={post.id} isPinned={post.is_pinned || false} />
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center text-slate-400">
                No posts found.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
