'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  try {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      redirect('/admin?error=Please%20enter%20email%20and%20password')
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      redirect('/admin?error=Invalid%20email%20or%20password')
    }

    revalidatePath('/', 'layout')
    redirect('/admin/dashboard')
  } catch (error) {
    console.error('Admin login failed:', error)
    redirect('/admin?error=Login%20failed.%20Please%20try%20again.')
  }
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/admin')
}
