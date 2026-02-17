'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { togglePin } from './actions'
import { cn } from '@/utils/cn'

interface Post {
  id: string
  title: string
  published: boolean
  is_pinned: boolean | null
}

export default function PinnedPostSearch({ posts }: { posts: Post[] }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [, startTransition] = React.useTransition()

  // Filter posts based on search
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (post: Post) => {
    startTransition(async () => {
      try {
        await togglePin(post.id, !post.is_pinned)
        setOpen(false)
        setSearch('')
      } catch (error) {
        alert((error as Error).message || 'Failed to update pin status.')
      }
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-controls="pinned-posts-list"
          className="w-full justify-between flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          <span className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            Search posts to pin...
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50" align="start">
        <div className="flex items-center border-b border-white/10 px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
          <input
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 text-white"
            placeholder="Search post..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div id="pinned-posts-list" className="max-h-[300px] overflow-y-auto p-1">
          {filteredPosts.length === 0 && (
            <div className="py-6 text-center text-sm text-slate-500">No post found.</div>
          )}
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => handleSelect(post)}
              className={cn(
                "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none hover:bg-white/5 transition-colors",
                post.is_pinned && "bg-indigo-500/10 text-indigo-300"
              )}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  post.is_pinned ? "opacity-100" : "opacity-0"
                )}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="truncate text-slate-200">{post.title}</span>
                <span className="text-xs text-slate-500 mt-0.5">
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
