import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>
}) {
  const resolvedSearchParams = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center page-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="surface rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Admin Sign In</h2>
            <p className="mt-2 text-sm text-slate-300">Use your admin account to manage content.</p>
          </div>
          <form action={login} className="mt-8 space-y-5">
            <input type="hidden" name="remember" value="true" />
            <div className="space-y-3">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Password"
                />
              </div>
            </div>

            {resolvedSearchParams?.error && (
              <div className="text-rose-300 text-sm text-center">
                {resolvedSearchParams.error}
              </div>
            )}

            <button
              className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
