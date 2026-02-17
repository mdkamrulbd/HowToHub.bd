import { createClient } from '@/utils/supabase/server'
import AdsListClient from '@/components/AdsListClient'

export const revalidate = 0

export default async function AdsPage() {
  const supabase = await createClient()

  const { data: ads, error } = await supabase
    .from('ads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching ads:', error)
  }

  return <AdsListClient ads={ads || []} />
}
