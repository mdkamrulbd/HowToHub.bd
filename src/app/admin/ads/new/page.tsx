'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createAd } from '../actions'
import MultiSelect from '@/components/MultiSelect'
import ConfirmSubmit from '@/components/ConfirmSubmit'
import { useState } from 'react'

const placements = [
  { value: 'home_hero', label: 'Home Hero' },
  { value: 'home_middle', label: 'Home Middle' },
  { value: 'home_middle_banner', label: 'Home Middle Banner (Between Pinned & Popular)' },
  { value: 'home_popular', label: 'Home Popular Posts' },
  { value: 'home_recent_top', label: 'Home Recent Top (Above Recent Posts)' },
  { value: 'home_recent_inline', label: 'Home Recent Inline (Native Ad)' },
  { value: 'home_pinned', label: 'Home Pinned Section' },
  { value: 'home_footer', label: 'Home Footer' },
  { value: 'post_top', label: 'Post Top' },
  { value: 'post_inline', label: 'Post Middle' },
  { value: 'post_bottom', label: 'Post Bottom' },
]

const types = [
  { value: 'image', label: 'Image Banner' },
  { value: 'text', label: 'Text Banner' },
  { value: 'html', label: 'HTML Block' },
  { value: 'script', label: 'Script Code' },
]

export default function NewAdPage() {
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>(['home_hero'])

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/admin/ads" className="inline-flex items-center text-sky-300 hover:text-sky-200">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to ads
        </Link>
      </div>

      <div className="surface rounded-2xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold text-white">Create New Ad</h3>
          <p className="mt-1 text-sm text-slate-300">Configure placements and visuals for your ads.</p>
        </div>
        <div className="border-t border-white/10 px-4 py-5 sm:p-6">
          <form id="ad-new-form" action={createAd} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-200">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Ad title"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-200">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Short description"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="placement" className="block text-sm font-medium text-slate-200 mb-1">
                  Placement
                </label>
                <MultiSelect
                  options={placements}
                  selectedValues={selectedPlacements}
                  onChange={setSelectedPlacements}
                  placeholder="Select placements"
                  name="placement"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-200">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="admin-select mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  defaultValue="image"
                >
                  {types.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-slate-200">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  id="image_url"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="https://example.com/banner.jpg"
                />
              </div>
              <div>
                <label htmlFor="link_url" className="block text-sm font-medium text-slate-200">
                  Link URL
                </label>
                <input
                  type="url"
                  name="link_url"
                  id="link_url"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="https://your-site.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="html" className="block text-sm font-medium text-slate-200">
                HTML Content
              </label>
              <textarea
                id="html"
                name="html"
                rows={4}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="<div>Your HTML ad</div>"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="starts_at" className="block text-sm font-medium text-slate-200">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="starts_at"
                  id="starts_at"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label htmlFor="ends_at" className="block text-sm font-medium text-slate-200">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="ends_at"
                  id="ends_at"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="enabled"
                name="enabled"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/40"
              />
              <div className="text-sm">
                <label htmlFor="enabled" className="font-medium text-slate-200">
                  Enable ad
                </label>
                <p className="text-slate-400">Uncheck to keep the ad hidden.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/ads"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                Cancel
              </Link>
              <ConfirmSubmit
                formId="ad-new-form"
                label="Save Ad"
                confirmTitle="সেভ নিশ্চিত?"
                confirmMessage="এই বিজ্ঞাপনটি সেভ করতে চান?"
                confirmLabel="হ্যাঁ, সেভ করুন"
                cancelLabel="বাতিল"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
