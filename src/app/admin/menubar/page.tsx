import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2, ChevronRight } from 'lucide-react'
import { deleteMenuItemAction, createMenuItem } from './actions'

export const revalidate = 0

type MenuItem = {
  id: string
  label: string
  href: string | null
  parent_id: string | null
  sort_order: number
  enabled: boolean
  created_at: string
}

export default async function MenuBarPage() {
  const supabase = await createClient()

  const { data: items, error } = await supabase
    .from('navigation_menu')
    .select('*')
    .order('parent_id', { ascending: true, nullsFirst: true })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    // silently handle; show empty state
  }

  const allItems = (items || []) as MenuItem[]
  const parents = allItems.filter((i) => !i.parent_id)
  const childrenMap = new Map<string, MenuItem[]>()
  allItems.forEach((i) => {
    if (i.parent_id) {
      const list = childrenMap.get(i.parent_id) || []
      list.push(i)
      childrenMap.set(i.parent_id, list)
    }
  })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-6 sm:px-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Menubar</h3>
            <p className="mt-1 text-sm text-slate-300">
              Manage title bar menu items and submenus.
            </p>
          </div>
          <Link
            href="#new"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Item
          </Link>
        </div>
        <div className="border-t border-white/10">
          <ul role="list" className="divide-y divide-white/10">
            {parents.length > 0 ? (
              parents.map((parent) => (
                <li key={parent.id} className="px-4 py-4 sm:px-6 hover:bg-white/5 transition">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {parent.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-400 truncate">
                          {parent.href || 'No link'} • {parent.enabled ? 'Enabled' : 'Disabled'} • Order {parent.sort_order}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-3">
                        <Link
                          href={`/admin/menubar/${parent.id}/edit`}
                          className="inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                        <form action={deleteMenuItemAction}>
                          <input type="hidden" name="id" value={parent.id} />
                          <button className="inline-flex items-center text-sm font-medium text-rose-300 hover:text-rose-200">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                    {childrenMap.get(parent.id) && (
                      <div className="pl-7">
                        <ul className="space-y-2">
                          {childrenMap.get(parent.id)!.map((child) => (
                            <li key={child.id} className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                                <p className="text-sm text-white truncate">{child.label}</p>
                              </div>
                              <div className="flex-shrink-0 flex items-center gap-3">
                                <Link
                                  href={`/admin/menubar/${child.id}/edit`}
                                  className="inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Link>
                                <form action={deleteMenuItemAction}>
                                  <input type="hidden" name="id" value={child.id} />
                                  <button className="inline-flex items-center text-sm font-medium text-rose-300 hover:text-rose-200">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </button>
                                </form>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center text-slate-400">No items yet. Use the form to add.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="space-y-6" id="new">
        <div className="surface rounded-2xl p-5">
          <div className="text-slate-200 text-sm font-semibold mb-3">New Menu Item</div>
          <form action={createMenuItem} className="space-y-4">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-slate-200">Label</label>
              <input
                id="label"
                name="label"
                type="text"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="Menu label"
              />
            </div>
            <div>
              <label htmlFor="href" className="block text-sm font-medium text-slate-200">Link (URL)</label>
              <input
                id="href"
                name="href"
                type="text"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="/path or https://example.com"
              />
            </div>
            <div>
              <label htmlFor="parent_id" className="block text-sm font-medium text-slate-200">Parent (Submenu)</label>
              <select
                id="parent_id"
                name="parent_id"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 [&>option]:bg-slate-800"
                defaultValue=""
              >
                <option value="">Top level</option>
                {parents.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort_order" className="block text-sm font-medium text-slate-200">Order</label>
              <input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
            <div className="flex items-start gap-3">
              <input
                id="enabled"
                name="enabled"
                type="checkbox"
                defaultChecked={true}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/40"
              />
              <label htmlFor="enabled" className="text-sm font-medium text-slate-200">Enabled</label>
            </div>
            <div className="pt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
              >
                Save Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
