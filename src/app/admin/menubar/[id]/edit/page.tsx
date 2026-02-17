import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { updateMenuItem } from '../../actions'

interface EditMenuPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditMenuItemPage({ params }: EditMenuPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: item, error } = await supabase
    .from('navigation_menu')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !item) {
    notFound()
  }

  const { data: parents } = await supabase
    .from('navigation_menu')
    .select('id,label')
    .is('parent_id', null)
    .order('sort_order', { ascending: true })

  const updateWithId = updateMenuItem.bind(null, item.id)

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/admin/menubar" className="inline-flex items-center text-sky-300 hover:text-sky-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to menubar
        </Link>
      </div>

      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold text-white">Edit Menu Item</h3>
          <p className="mt-1 text-sm text-slate-300">Update label, link, parent and order.</p>
        </div>
        <div className="border-t border-white/10 px-4 py-5 sm:p-6">
          <form action={updateWithId} className="space-y-6">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-slate-200">
                Label
              </label>
              <input
                type="text"
                name="label"
                id="label"
                defaultValue={item.label}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div>
              <label htmlFor="href" className="block text-sm font-medium text-slate-200">
                Link (URL)
              </label>
              <input
                type="text"
                name="href"
                id="href"
                defaultValue={item.href || ''}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div>
              <label htmlFor="parent_id" className="block text-sm font-medium text-slate-200">
                Parent (Submenu)
              </label>
              <select
                id="parent_id"
                name="parent_id"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 [&>option]:bg-slate-800"
                defaultValue={item.parent_id || ''}
              >
                <option value="">Top level</option>
                {(parents || []).filter((p) => p.id !== item.id).map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sort_order" className="block text-sm font-medium text-slate-200">
                Order
              </label>
              <input
                type="number"
                name="sort_order"
                id="sort_order"
                defaultValue={item.sort_order ?? 0}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="enabled"
                name="enabled"
                type="checkbox"
                defaultChecked={item.enabled}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/40"
              />
              <label htmlFor="enabled" className="text-sm font-medium text-slate-200">
                Enabled
              </label>
            </div>

            <div className="pt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/menubar"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
              >
                Update Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
