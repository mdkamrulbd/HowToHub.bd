'use client'

import { useActionState } from 'react'
import { subscribeUser } from '@/app/actions/subscribe'
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const initialState = {
  success: false,
  message: '',
}

export default function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribeUser, initialState)

  return (
    <div className="w-full md:w-auto">
      <form action={formAction} className="flex flex-col sm:flex-row items-center gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="আপনার ইমেইল ঠিকানা"
          className="surface rounded-full px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-transparent focus:border-indigo-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-semibold flex items-center gap-2 hover:bg-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              অপেক্ষা...
            </>
          ) : (
            <>
              যোগ দিন
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
      {state.message && (
        <div className={`mt-3 flex items-center gap-2 text-xs sm:text-sm ${state.success ? 'text-emerald-300' : 'text-rose-300'}`}>
          {state.success ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {state.message}
        </div>
      )}
    </div>
  )
}
