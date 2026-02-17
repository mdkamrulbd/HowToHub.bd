
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function togglePin(id: string, isPinned: boolean) {
  const supabase = await createClient()

  // Verify auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  // If pinning, check count
  if (isPinned) {
    const { count, error } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('is_pinned', true)

    if (error) throw new Error('Failed to count pinned posts')
    if (count && count >= 3) throw new Error('Maximum 3 posts can be pinned.')
  }

  const { error } = await supabase
    .from('posts')
    .update({ is_pinned: isPinned })
    .eq('id', id)

  if (error) throw new Error('Failed to update pin status')

  revalidatePath('/admin/pinned')
  revalidatePath('/')
}
