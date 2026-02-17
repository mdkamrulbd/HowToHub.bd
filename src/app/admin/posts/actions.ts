'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sendEmail } from '@/lib/email'

const ensurePostAccess = async (supabase: Awaited<ReturnType<typeof createClient>>) => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('অনুমতি নেই।')
  }
  const role = user.user_metadata?.role as string | undefined
  if (role && role !== 'admin' && role !== 'manager') {
    throw new Error('অনুমতি নেই।')
  }
}

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  await ensurePostAccess(supabase)

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const video_url = formData.get('video_url') as string
  const thumbnail_url = formData.get('thumbnail_url') as string
  const published = formData.get('published') === 'on'
  const ad_script_type = formData.get('ad_script_type') as string || 'default'
  const custom_ad_code = formData.get('custom_ad_code') as string
  const categoriesRaw = formData.get('categories') as string
  const categories = categoriesRaw 
    ? categoriesRaw.split(',').map(c => c.trim()).filter(Boolean) 
    : []

  if (!title || title.trim().length === 0) {
    throw new Error('Title is required')
  }
  if (!content || content.trim().length === 0) {
    throw new Error('Content is required')
  }

  // Validation: Prevent Base64 media (image, pdf, video) to save DB space
  const base64Pattern = /data:(image|application\/pdf|video|audio)\/[^;]+;base64,/
  if (base64Pattern.test(content) || base64Pattern.test(thumbnail_url) || base64Pattern.test(video_url) || base64Pattern.test(custom_ad_code)) {
    throw new Error('সরাসরি ছবি, পিডিএফ বা ভিডিও আপলোড করা যাবে না। দয়া করে এক্সটারনাল লিঙ্ক (URL) ব্যবহার করুন।')
  }

  const { data: post, error } = await supabase.from('posts').insert({
    title,
    content,
    video_url,
    thumbnail_url,
    published,
    ad_script_type,
    custom_ad_code,
    categories,
  }).select().single()

  if (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }

  if (published && post) {
    // Send email to subscribers
    const { data: subscribers } = await supabase.from('subscribers').select('email').eq('active', true)
    
    if (subscribers && subscribers.length > 0) {
      const emails = subscribers.map(s => s.email)
      const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/posts/${post.slug || post.id}`
      
      await sendEmail({
        to: process.env.SMTP_USER || 'noreply@howtohub.bd',
        bcc: emails,
        subject: `New Tutorial: ${title}`,
        html: `
          <h1>${title}</h1>
          <p>নতুন টিউটোরিয়াল প্রকাশিত হয়েছে!</p>
          <p>এখনই দেখুন: <a href="${postUrl}">${title}</a></p>
          <br/>
          <p>ধন্যবাদ,<br/>HowToHub.bd টিম</p>
        `
      })
    }
  }

  revalidatePath('/admin/dashboard')
  revalidatePath('/')
  redirect('/admin/dashboard')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  await ensurePostAccess(supabase)

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const video_url = formData.get('video_url') as string
  const thumbnail_url = formData.get('thumbnail_url') as string
  const published = formData.get('published') === 'on'
  const ad_script_type = formData.get('ad_script_type') as string || 'default'
  const custom_ad_code = formData.get('custom_ad_code') as string
  const categoriesRaw = formData.get('categories') as string
  const categories = categoriesRaw 
    ? categoriesRaw.split(',').map(c => c.trim()).filter(Boolean) 
    : []

  if (!title || title.trim().length === 0) {
    throw new Error('Title is required')
  }
  if (!content || content.trim().length === 0) {
    throw new Error('Content is required')
  }

  // Validation: Prevent Base64 media (image, pdf, video) to save DB space
  const base64Pattern = /data:(image|application\/pdf|video|audio)\/[^;]+;base64,/
  if (base64Pattern.test(content) || base64Pattern.test(thumbnail_url) || base64Pattern.test(video_url) || base64Pattern.test(custom_ad_code)) {
    throw new Error('সরাসরি ছবি, পিডিএফ বা ভিডিও আপলোড করা যাবে না। দয়া করে এক্সটারনাল লিঙ্ক (URL) ব্যবহার করুন।')
  }

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      content,
      video_url,
      thumbnail_url,
      published,
      ad_script_type,
      custom_ad_code,
      categories,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating post:', error)
    throw new Error('Failed to update post')
  }

  revalidatePath('/admin/dashboard')
  // We can't easily get the slug here without another query, but revalidating the ID path is still good practice
  revalidatePath(`/posts/${id}`) 
  revalidatePath('/')
  redirect('/admin/dashboard')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  await ensurePostAccess(supabase)

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    throw new Error('Failed to delete post')
  }

  revalidatePath('/admin/dashboard')
  revalidatePath('/')
}
