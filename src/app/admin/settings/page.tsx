'use client'

import { useActionState } from 'react'
import { createManager } from './actions'
import { UserPlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import ConfirmSubmit from '@/components/ConfirmSubmit'

const initialState = {
  success: false,
  message: '',
}

export default function SettingsPage() {
  const [state, formAction, isPending] = useActionState(createManager, initialState)

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold text-white">Ad Manager</h3>
          <p className="mt-1 text-sm text-slate-300">নতুন ম্যানেজার অ্যাকাউন্ট তৈরি করুন।</p>
        </div>
        <div className="border-t border-white/10 px-4 py-5 sm:p-6">
          <div className="max-w-md">
            <h4 className="text-base font-medium text-white mb-4">নতুন ম্যানেজার তৈরি করুন</h4>
            <form id="settings-manager-form" action={formAction} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                  ইমেইল
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="manager@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  minLength={6}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="******"
                />
              </div>

              <ConfirmSubmit
                formId="settings-manager-form"
                disabled={isPending}
                label={
                  isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      তৈরি হচ্ছে...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      ম্যানেজার যুক্ত করুন
                    </>
                  )
                }
                confirmTitle="একাউন্ট তৈরি নিশ্চিত?"
                confirmMessage="নতুন ম্যানেজার একাউন্ট তৈরি করবেন?"
                confirmLabel="হ্যাঁ, তৈরি করুন"
                cancelLabel="বাতিল"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition disabled:opacity-70"
              />

              {state.message && (
                <div className={`mt-3 flex items-center gap-2 text-sm ${state.success ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {state.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {state.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
