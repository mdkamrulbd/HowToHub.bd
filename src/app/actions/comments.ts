'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addComment(postId: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const content = formData.get('content') as string
  const parentId = formData.get('parent_id') as string | null

  if (!name || !email || !content) {
    return { success: false, message: 'সবগুলো ঘর পূরণ করা আবশ্যক।' }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'সঠিক ইমেইল ঠিকানা দিন।' }
  }

  // Check if user is admin
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'manager'

  // Sanitize content (strip HTML tags)
  const sanitizedContent = content.replace(/<[^>]*>?/gm, '')

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    parent_id: parentId || null,
    name: isAdmin ? 'Admin' : name, // Force admin name if admin
    email,
    content: sanitizedContent,
    is_approved: true, // Auto-approve for now
    is_admin_reply: isAdmin
  })

  if (error) {
    console.error('Error adding comment:', error)
    return { success: false, message: 'মন্তব্য যোগ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' }
  }

  revalidatePath(`/posts/[slug]`)
  
  return { success: true, message: 'আপনার মন্তব্য সফলভাবে যোগ করা হয়েছে!' }
}

export async function deleteComment(commentId: string, requesterEmail?: string | null) {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('Error fetching user:', userError)
  }

  const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.role === 'manager'
  if (!isAdmin && !requesterEmail) {
    throw new Error('অনুমতি নেই।')
  }

  const { data: comment, error: commentError } = await supabase
    .from('comments')
    .select('id,email,post_id')
    .eq('id', commentId)
    .single()

  if (commentError || !comment) {
    console.error('Error fetching comment:', commentError)
    throw new Error('মন্তব্য খুঁজে পাওয়া যায়নি।')
  }

  if (!isAdmin) {
    const normalizedRequester = requesterEmail?.trim().toLowerCase()
    const normalizedOwner = comment.email?.trim().toLowerCase()
    if (!normalizedRequester || normalizedRequester !== normalizedOwner) {
      throw new Error('অনুমতি নেই।')
    }
  }

  const { error } = await supabase.from('comments').delete().eq('id', commentId)

  if (error) {
    console.error('Error deleting comment:', error)
    throw new Error('মন্তব্য ডিলিট করতে সমস্যা হয়েছে।')
  }

  revalidatePath(`/posts/[slug]`)
  return { success: true }
}
