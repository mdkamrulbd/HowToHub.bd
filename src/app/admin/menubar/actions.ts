 'use server'
 
 import { createClient } from '@/utils/supabase/server'
 import { revalidatePath } from 'next/cache'
 import { redirect } from 'next/navigation'
 
 const clean = (value: FormDataEntryValue | null) => {
   if (!value) return null
   const trimmed = String(value).trim()
   return trimmed.length ? trimmed : null
 }
 
 const ensureAccess = async (supabase: Awaited<ReturnType<typeof createClient>>) => {
   const { data: { user }, error } = await supabase.auth.getUser()
   if (error || !user) {
    throw new Error('Unauthorized')
   }
   const role = user.user_metadata?.role as string | undefined
   if (role && role !== 'admin' && role !== 'manager') {
    throw new Error('Unauthorized')
   }
 }
 
 export async function createMenuItem(formData: FormData) {
   const supabase = await createClient()
   await ensureAccess(supabase)
 
   const label = clean(formData.get('label'))
   const href = clean(formData.get('href'))
   const parent_id = clean(formData.get('parent_id'))
   const sort_order_raw = clean(formData.get('sort_order'))
   const sort_order = sort_order_raw ? Number(sort_order_raw) : 0
   const enabled = Boolean(formData.get('enabled'))
 
  if (!label) {
    throw new Error('Label is required')
  }
   if (String(label).length > 255) {
     throw new Error('Label must be less than 255 characters')
   }
   if (href && String(href).length > 500) {
     throw new Error('Link URL must be less than 500 characters')
   }
 
   const { error } = await supabase.from('navigation_menu').insert({
     label,
     href,
     parent_id,
     sort_order,
     enabled,
   })
 
   if (error) {
    console.error('Error creating menu item:', error)
    throw new Error(`Failed to create menu item: ${error.message}`)
   }
 
   revalidatePath('/admin/menubar')
   revalidatePath('/', 'layout')
   redirect('/admin/menubar')
 }
 
 export async function updateMenuItem(id: string, formData: FormData) {
   const supabase = await createClient()
   await ensureAccess(supabase)
 
   const label = clean(formData.get('label'))
   const href = clean(formData.get('href'))
   const parent_id = clean(formData.get('parent_id'))
   const sort_order_raw = clean(formData.get('sort_order'))
   const sort_order = sort_order_raw ? Number(sort_order_raw) : 0
   const enabled = Boolean(formData.get('enabled'))
 
   if (!label) {
    throw new Error('Label is required')
   }
   if (String(label).length > 255) {
     throw new Error('Label must be less than 255 characters')
   }
   if (href && String(href).length > 500) {
     throw new Error('Link URL must be less than 500 characters')
   }
 
   const { error } = await supabase
     .from('navigation_menu')
     .update({
       label,
       href,
       parent_id: parent_id || null,
       sort_order,
       enabled,
       updated_at: new Date().toISOString(),
     })
     .eq('id', id)
 
   if (error) {
    console.error('Error updating menu item:', error)
    throw new Error(`Failed to update menu item: ${error.message}`)
   }
 
   revalidatePath('/admin/menubar')
   revalidatePath('/', 'layout')
   redirect('/admin/menubar')
 }
 
 export async function deleteMenuItem(id: string) {
   const supabase = await createClient()
   await ensureAccess(supabase)
 
   const { error } = await supabase.from('navigation_menu').delete().eq('id', id)
 
   if (error) {
    console.error('Error deleting menu item:', error)
    throw new Error('Failed to delete menu item')
   }
 
   revalidatePath('/admin/menubar')
   revalidatePath('/', 'layout')
 }

export async function deleteMenuItemAction(formData: FormData) {
  const id = (formData.get('id') as string) || ''
  if (!id) {
    throw new Error('Invalid menu id')
  }
  await deleteMenuItem(id)
  revalidatePath('/admin/menubar')
}
