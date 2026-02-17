'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const clean = (value: FormDataEntryValue | null) => {
  if (!value) return null
  const trimmed = String(value).trim()
  return trimmed.length ? trimmed : null
}

const ensureAdAccess = async (supabase: Awaited<ReturnType<typeof createClient>>) => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('Unauthorized')
  }
  const role = user.user_metadata?.role as string | undefined
  if (role && role !== 'admin' && role !== 'manager') {
    throw new Error('Unauthorized')
  }
}

export async function createAd(formData: FormData) {
  const supabase = await createClient()
  await ensureAdAccess(supabase)

  const type = formData.get('type') as string
  const placements = formData.getAll('placement') as string[]
  const title = clean(formData.get('title'))

  if (!title) {
    throw new Error('Title is required')
  }

  // Validation: Prevent Base64 media (image, pdf, video) to save DB space
  const base64Pattern = /data:(image|application\/pdf|video|audio)\/[^;]+;base64,/
  const image_url = clean(formData.get('image_url'))
  const html = clean(formData.get('html'))
  
  if (base64Pattern.test(image_url || '') || base64Pattern.test(html || '')) {
    throw new Error('Direct image/pdf/video base64 is not allowed. Please use external URLs.')
  }

  // Allow optional fields for HTML/Script ads
  if ((type === 'html' || type === 'script') && !html) {
     throw new Error('HTML content is required for HTML/Script ads')
  }

  // Validation: Length checks
  if (title && title.length > 255) {
    throw new Error('Title must be less than 255 characters')
  }
  if (image_url && image_url.length > 500) {
    throw new Error('Image URL must be less than 500 characters')
  }
  if (clean(formData.get('link_url')) && (clean(formData.get('link_url'))?.length || 0) > 500) {
    throw new Error('Link URL must be less than 500 characters')
  }

  // Validation: Length checks
  if (title && title.length > 255) {
    throw new Error('Title must be less than 255 characters')
  }
  if (image_url && image_url.length > 500) {
    throw new Error('Image URL must be less than 500 characters')
  }
  if (clean(formData.get('link_url')) && (clean(formData.get('link_url'))?.length || 0) > 500) {
    throw new Error('Link URL must be less than 500 characters')
  }

  const { error } = await supabase.from('ads').insert({
    title,
    description: clean(formData.get('description')),
    image_url,
    link_url: clean(formData.get('link_url')),
    html,
    type,
    placement: placements,
    enabled: Boolean(formData.get('enabled')), // Correctly handle checkbox value
    starts_at: clean(formData.get('starts_at')),
    ends_at: clean(formData.get('ends_at')),
  })

  if (error) {
    console.error('Error creating ad:', error)
    throw new Error(`Failed to create ad: ${error.message} (Code: ${error.code})`)
  }

  revalidatePath('/admin/ads')
  revalidatePath('/')
  revalidatePath('/posts', 'layout')
  redirect('/admin/ads')
}

export async function updateAd(id: string, formData: FormData) {
  const supabase = await createClient()
  await ensureAdAccess(supabase)

  const type = formData.get('type') as string
  const placements = formData.getAll('placement') as string[]
  const title = clean(formData.get('title'))

  if (!title) {
    throw new Error('Title is required')
  }

  // Validation: Prevent Base64 media (image, pdf, video) to save DB space
  const base64Pattern = /data:(image|application\/pdf|video|audio)\/[^;]+;base64,/
  const image_url = clean(formData.get('image_url'))
  const html = clean(formData.get('html'))
  
  if (base64Pattern.test(image_url || '') || base64Pattern.test(html || '')) {
    throw new Error('Direct image/pdf/video base64 is not allowed. Please use external URLs.')
  }

  // Allow optional fields for HTML/Script ads
  if ((type === 'html' || type === 'script') && !html) {
     throw new Error('HTML content is required for HTML/Script ads')
  }

  // Validation: Length checks
  if (title && title.length > 255) {
    throw new Error('Title must be less than 255 characters')
  }
  if (image_url && image_url.length > 500) {
    throw new Error('Image URL must be less than 500 characters')
  }
  const linkUrl = clean(formData.get('link_url'))
  if (linkUrl && linkUrl.length > 500) {
    throw new Error('Link URL must be less than 500 characters')
  }

  const { error } = await supabase
    .from('ads')
    .update({
      title,
      description: clean(formData.get('description')),
      image_url,
      link_url: clean(formData.get('link_url')),
      html,
      type,
      placement: placements,
      enabled: Boolean(formData.get('enabled')), // Correctly handle checkbox value
      starts_at: clean(formData.get('starts_at')),
      ends_at: clean(formData.get('ends_at')),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating ad:', error)
    throw new Error(`Failed to update ad: ${error.message} (Code: ${error.code})`)
  }

  revalidatePath('/admin/ads')
  revalidatePath('/')
  revalidatePath('/posts', 'layout')
  redirect('/admin/ads')
}

export async function deleteAd(id: string) {
  const supabase = await createClient()
  await ensureAdAccess(supabase)

  const { error } = await supabase.from('ads').delete().eq('id', id)

  if (error) {
    console.error('Error deleting ad:', error)
    throw new Error('Failed to delete ad')
  }

  revalidatePath('/admin/ads')
  revalidatePath('/')
  revalidatePath('/posts', 'layout')
}
