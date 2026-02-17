import { signout } from './actions'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { LayoutDashboard, FileText, Megaphone, LogOut, Settings, Users, Home, Search } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = user?.user_metadata?.role as string | undefined
  const isManager = role === 'manager'

  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen page-bg overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <aside className="surface-strong rounded-2xl border border-white/10 p-5 md:w-64 md:sticky md:top-20 md:self-start">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-fuchsia-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-base font-semibold text-white">Admin Panel</p>
                <p className="text-xs text-slate-300">Control center</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:flex md:flex-col md:space-y-1">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <LayoutDashboard className="h-4 w-4 text-slate-300" />
                Dashboard
              </Link>
              {!isManager && (
                <Link
                  href="/admin/home-content"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                  <Home className="h-4 w-4 text-slate-300" />
                  Home Content
                </Link>
              )}
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <FileText className="h-4 w-4 text-slate-300" />
                Posts
              </Link>
              <Link
                href="/admin/pinned"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <Megaphone className="h-4 w-4 text-slate-300" />
                Pin Post
              </Link>
              <Link
                href="/admin/menubar"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <FileText className="h-4 w-4 text-slate-300" />
                Menubar
              </Link>
              <Link
                href="/admin/ads"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <Megaphone className="h-4 w-4 text-slate-300" />
                Ads
              </Link>
              <Link
                href="/admin/seo"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <Search className="h-4 w-4 text-slate-300" />
                SEO
              </Link>

              {!isManager && (
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
                >
                  <Settings className="h-4 w-4 text-slate-300" />
                  Add Manager
                </Link>
              )}
              {!isManager && (
                <Link
                  href="/admin/subscribers"
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white transition"
                >
                  <Users className="h-4 w-4 text-slate-300" />
                  Subscribers
                </Link>
              )}
              
            </div>

            <form action={signout} className="mt-6">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 md:px-4 md:py-2 text-sm font-semibold border border-rose-400/40 text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 transition"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </form>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
