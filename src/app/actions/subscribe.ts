'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function subscribeUser(prevState: { success: boolean; message: string }, formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'সঠিক ইমেইল ঠিকানা দিন।' }
  }

  try {
    const { error } = await supabase.from('subscribers').insert({ email })

    if (error) {
      if (error.code === '23505') { // Unique violation
        return { success: false, message: 'আপনি ইতিমধ্যে সাবস্ক্রাইব করেছেন!' }
      }
      console.error('Subscription error:', error)
      return { success: false, message: 'সাবস্ক্রিপশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' }
    }

    revalidatePath('/')
    return { success: true, message: 'সাবস্ক্রিপশন সফল হয়েছে! ধন্যবাদ।' }
  } catch (error) {
    console.error('Subscription error:', error)
    return { success: false, message: 'কিছু ভুল হয়েছে।' }
  }
}
