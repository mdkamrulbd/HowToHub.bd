'use server'

import { createClient } from '@/utils/supabase/server'

interface ManagerState {
  success: boolean
  message: string
}

export async function createManager(prevState: ManagerState | null, formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, message: 'Unauthorized.' }
  }
  const role = user.user_metadata?.role as string | undefined
  if (role === 'manager') {
    return { success: false, message: 'Only admin can create a manager.' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'manager',
      },
    },
  })

  if (error) {
    console.error('Error creating manager:', error)
    return { success: false, message: error.message }
  }

  if (data.user && !data.session) {
    return { success: true, message: 'Account created! Email verification may be required.' }
  }

  return { success: true, message: 'New manager created successfully.' }
}
