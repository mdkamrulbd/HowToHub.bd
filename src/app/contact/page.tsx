'use client'

import { Send } from 'lucide-react'
import { sendContact } from './actions'
import { useSearchParams } from 'next/navigation'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const success = searchParams?.get('success') === '1'
  const error = searchParams?.get('error')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto surface-strong rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">যোগাযোগ করুন</h1>
        
        {success ? (
          <div className="text-center py-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 mb-6">
              <Send className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">বার্তা পাঠানো হয়েছে!</h3>
            <p className="text-slate-300">আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            <a
              href="/contact"
              className="mt-8 inline-block px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
            >
              আরও একটি বার্তা পাঠান
            </a>
          </div>
        ) : (
          <form action={sendContact} className="space-y-6">
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
                {decodeURIComponent(error)}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                নাম
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-white/10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/5 backdrop-blur-sm p-3 text-slate-200 placeholder:text-slate-500"
                placeholder="আপনার নাম"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-white/10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/5 backdrop-blur-sm p-3 text-slate-200 placeholder:text-slate-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-200">
                মোবাইল নাম্বার
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="mt-1 block w-full rounded-md border-white/10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/5 backdrop-blur-sm p-3 text-slate-200 placeholder:text-slate-500"
                placeholder="+8801XXXXXXXXX"
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-slate-200">
                কোন বিষয়ে জানতে আগ্রহী
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="mt-1 block w-full rounded-md border-white/10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/5 backdrop-blur-sm p-3 text-slate-200 placeholder:text-slate-500"
                placeholder="উদাহরণ: স্মার্টফোন সমস্যা, সফটওয়্যার টিপস"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-200">
                বার্তা
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-white/10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/5 backdrop-blur-sm p-3 text-slate-200 placeholder:text-slate-500"
                placeholder="আমরা কীভাবে সাহায্য করতে পারি?"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                বার্তা পাঠান
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
