
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { CheckCircle2, AlertTriangle, XCircle, Search, ArrowRight } from 'lucide-react'

export const revalidate = 0

export default async function SEOPage() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id,title,content,thumbnail_url,published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  const seoChecks = (posts ?? []).map((post) => {
    const titleLength = post.title?.length ?? 0
    const plainText = post.content?.replace(/<[^>]*>/g, '') ?? ''
    const contentLength = plainText.length
    const issues: { type: 'error' | 'warning', message: string }[] = []

    if (titleLength < 30) {
      issues.push({ type: 'warning', message: 'Title too short (< 30 chars)' })
    } else if (titleLength > 70) {
      issues.push({ type: 'warning', message: 'Title too long (> 70 chars)' })
    }

    if (!post.thumbnail_url) {
      issues.push({ type: 'error', message: 'Missing thumbnail image' })
    }

    if (contentLength < 300) {
      issues.push({ type: 'error', message: 'Content too short (< 300 chars)' })
    }
    
    // Check for keyword presence in title (basic check)
    if (!post.title.includes('কিভাবে') && !post.title.includes('How to') && !post.title.includes('গাইড') && !post.title.includes('টিউটোরিয়াল')) {
       issues.push({ type: 'warning', message: 'Title lacks "How to" or "Guide" keywords' })
    }

    const issueCount = issues.length
    const score = Math.max(0, 100 - (issueCount * 20))

    return {
      ...post,
      titleLength,
      contentLength,
      issues,
      score, 
    }
  })

  const postsWithIssues = seoChecks.filter((post) => post.issues.length > 0)
  const perfectPosts = seoChecks.filter((post) => post.issues.length === 0)

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">SEO Audit Dashboard</h1>
          <p className="text-slate-400 mt-1">Optimize your content for better search ranking.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap">
           <div className="surface px-4 py-2 rounded-xl border border-white/10">
             <span className="block text-xs text-slate-400">Total Posts</span>
             <span className="text-xl font-bold text-white">{posts?.length || 0}</span>
           </div>
           <div className="surface px-4 py-2 rounded-xl border border-rose-500/20 bg-rose-500/5">
             <span className="block text-xs text-rose-300">Needs Attention</span>
             <span className="text-xl font-bold text-rose-200">{postsWithIssues.length}</span>
           </div>
           <div className="surface col-span-2 sm:col-span-1 px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
             <span className="block text-xs text-emerald-300">SEO Ready</span>
             <span className="text-xl font-bold text-emerald-200">{perfectPosts.length}</span>
           </div>
        </div>
      </div>

      <div className="grid gap-8">
        {postsWithIssues.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Fix SEO Issues
            </h2>
            <div className="grid gap-4">
              {postsWithIssues.map((post) => (
                <div key={post.id} className="surface rounded-2xl p-5 border border-white/5 hover:border-white/10 transition overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-3 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${post.score > 70 ? 'bg-emerald-500/20 text-emerald-300' : post.score > 40 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'}`}>
                          Score: {post.score}
                        </span>
                        <h3 className="min-w-0 flex-1 text-white font-medium break-words sm:truncate">{post.title}</h3>
                        <Link href={`/posts/${post.id}`} target="_blank" className="text-slate-500 hover:text-sky-400 transition">
                           <Search className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.issues.map((issue, idx) => (
                          <div key={idx} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${issue.type === 'error' ? 'border-rose-500/20 bg-rose-500/5 text-rose-200' : 'border-amber-500/20 bg-amber-500/5 text-amber-200'}`}>
                             {issue.type === 'error' ? <XCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                             {issue.message}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition shrink-0 w-full md:w-auto"
                    >
                      Fix Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="surface rounded-2xl p-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">Excellent Work!</h3>
            <p className="text-slate-400 mt-2">All your posts are SEO optimized.</p>
          </div>
        )}
        
        <div className="surface rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950">
           <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-300">
                 <Search className="h-6 w-6" />
              </div>
              <div>
                 <h3 className="text-lg font-semibold text-white">SEO Optimization Tips</h3>
                 <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc list-inside">
                    <li>Use <strong>&quot;How to&quot; (কিভাবে)</strong> in your titles to match search intent.</li>
                    <li>Keep titles between <strong>30-60 characters</strong> for optimal display in SERPs.</li>
                    <li>Ensure every post has a <strong>high-quality thumbnail</strong> for social sharing and click-throughs.</li>
                    <li>Write at least <strong>300 words</strong> of content to be considered &quot;useful&quot; by search engines.</li>
                    <li>Use <strong>Bengali keywords</strong> mixed with English technical terms.</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
