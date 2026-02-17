import { createClient } from '@/utils/supabase/server'
import PostsListClient from '@/components/PostsListClient'

export const revalidate = 0

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id,title,created_at,published,content,thumbnail_url,video_url')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  const seoChecks = (posts ?? []).map((post) => {
    const titleLength = post.title?.length ?? 0
    const contentLength = post.content?.length ?? 0
    const createdLabel = post.created_at
      ? new Date(post.created_at).toISOString().split('T')[0]
      : ''
    const issues: string[] = []

    if (titleLength < 30 || titleLength > 70) {
      issues.push('Title length')
    }

    if (!post.thumbnail_url) {
      issues.push('Thumbnail missing')
    }

    if (contentLength < 120) {
      issues.push('Description short')
    }

    return {
      ...post,
      titleLength,
      contentLength,
      createdLabel,
      issues,
    }
  })

  const seoNeedsAttention = seoChecks.filter((post) => post.issues.length > 0)
  const seoReadyCount = (posts?.length ?? 0) - seoNeedsAttention.length

  return (
    <PostsListClient 
      posts={posts || []} 
      seoChecks={seoChecks}
      seoNeedsAttention={seoNeedsAttention}
      seoReadyCount={seoReadyCount}
    />
  )
}
