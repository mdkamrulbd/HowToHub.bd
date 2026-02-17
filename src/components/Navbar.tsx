'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

type NavItem = { name: string; href: string }

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [navItems, setNavItems] = useState<NavItem[]>([
    { name: 'হোম', href: '/' },
    { name: 'টিউটোরিয়াল', href: '/#tutorials' },
    { name: 'ভিডিও', href: 'https://www.youtube.com/@HowToHub-BD' },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'যোগাযোগ', href: '/contact' },
  ])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<Array<{ id: string; title: string; slug?: string | null }>>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('navigation_menu')
          .select('label, href, parent_id, sort_order, enabled')
          .is('parent_id', null)
          .eq('enabled', true)
          .order('sort_order', { ascending: true })
        if (!error && Array.isArray(data) && data.length > 0) {
          const items = data.map((i: { label: string; href: string | null }) => ({
            name: i.label,
            href: i.href || '/',
          }))
          setNavItems(items)
        }
      } catch {}
    }
    loadMenu()
  }, [])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [isSearchOpen])

  useEffect(() => {
    const supabase = createClient()
    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([])
        return
      }
      setIsSearching(true)
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, slug')
          .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
          .limit(8)
        if (!error && Array.isArray(data)) {
          setResults(data as Array<{ id: string; title: string; slug?: string | null }>)
        }
      } finally {
        setIsSearching(false)
      }
    }, 250)
    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  return (
    <nav className="sticky top-0 z-50">
      <div className="solid-bar border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={searchRef}>
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                <Image src="/howtohub-logo.svg" alt="HowToHub Logo" width={40} height={40} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">HowToHub.bd</span>
                <span className="text-xs text-slate-300">স্মার্ট লার্নিং হাব</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition"
                >
                  {item.name}
                </Link>
              ))}
              <button
                type="button"
                aria-label="সার্চ"
                className="inline-flex items-center justify-center p-2 rounded-full text-slate-200 hover:bg-white/10 transition"
                title="সার্চ"
                onClick={() => setIsSearchOpen((v) => !v)}
              >
                <Search className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-4 top-[64px] w-80 rounded-xl border border-white/10 bg-slate-900 shadow-xl p-3">
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="পোস্ট সার্চ করুন..."
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                  <div className="mt-2 max-h-64 overflow-auto">
                    {isSearching ? (
                      <div className="px-2 py-3 text-sm text-slate-400">সার্চ হচ্ছে...</div>
                    ) : results.length > 0 ? (
                      <ul className="space-y-1">
                        {results.map((r) => {
                          const href = r.slug ? `/posts/${r.slug}` : `/posts/${r.id}`
                          return (
                            <li key={r.id}>
                              <Link
                                href={href}
                                className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition"
                                onClick={() => setIsSearchOpen(false)}
                              >
                                {r.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    ) : query ? (
                      <div className="px-2 py-3 text-sm text-slate-400">কিছু পাওয়া যায়নি</div>
                    ) : (
                      <div className="px-2 py-3 text-sm text-slate-400">কীওয়ার্ড লিখুন</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              className="md:hidden inline-flex items-center gap-2"
              aria-label="মোবাইল কন্ট্রোলস"
            >
              <button
                type="button"
                className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-200 hover:bg-white/10 transition"
                aria-label="সার্চ"
                onClick={() => setIsSearchOpen((v) => !v)}
              >
                <Search className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-200 hover:bg-white/10 transition"
                aria-label="মেনু টগল করুন"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {isSearchOpen && (
            <div className="md:hidden relative">
              <div className="absolute left-0 right-0 top-2 mx-4 rounded-xl border border-white/10 bg-slate-900 shadow-xl p-3">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="পোস্ট সার্চ করুন..."
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
                <div className="mt-2 max-h-64 overflow-auto">
                  {isSearching ? (
                    <div className="px-2 py-3 text-sm text-slate-400">সার্চ হচ্ছে...</div>
                  ) : results.length > 0 ? (
                    <ul className="space-y-1">
                      {results.map((r) => {
                        const href = r.slug ? `/posts/${r.slug}` : `/posts/${r.id}`
                        return (
                          <li key={r.id}>
                            <Link
                              href={href}
                              className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition"
                              onClick={() => {
                                setIsSearchOpen(false)
                                setIsOpen(false)
                              }}
                            >
                              {r.title}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ) : query ? (
                    <div className="px-2 py-3 text-sm text-slate-400">কিছু পাওয়া যায়নি</div>
                  ) : (
                    <div className="px-2 py-3 text-sm text-slate-400">কীওয়ার্ড লিখুন</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden solid-bar border-b border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-sm text-slate-200 hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
