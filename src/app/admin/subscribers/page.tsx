import { createClient } from '@/utils/supabase/server'

export const revalidate = 0

export default async function SubscribersPage() {
  const supabase = await createClient()
  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('id,email,created_at,active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching subscribers:', error)
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold text-white">Subscribers</h3>
          <p className="mt-1 text-sm text-slate-300">View subscriber emails and status.</p>
        </div>
        <div className="border-t border-white/10">
          {subscribers && subscribers.length > 0 ? (
            <ul role="list" className="divide-y divide-white/10">
              {subscribers.map((subscriber) => (
                <li key={subscriber.id} className="px-4 py-4 sm:px-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{subscriber.email}</p>
                    <p className="text-xs text-slate-400">
                      {subscriber.created_at ? new Date(subscriber.created_at).toLocaleDateString('en-US') : ''}
                    </p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${subscriber.active ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>
                    {subscriber.active ? 'Active' : 'Inactive'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-12 text-center text-slate-400">No subscribers yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
