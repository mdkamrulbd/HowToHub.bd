'use client'

import { LayoutGrid, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Category {
  name: string
  count: number
}

interface CategoryListProps {
  categories: Category[]
  className?: string
  title?: string
  currentCategory?: string | null
}

export default function CategoryList({ categories, className, title, currentCategory }: CategoryListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  if (!categories || categories.length === 0) return null

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here if needed, or just filter categories
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="surface rounded-2xl p-5 mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="ক্যাটাগরি খুঁজুন..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </form>
      </div>

      <div className="surface rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
          <LayoutGrid className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">{title || 'ক্যাটাগরি সমূহ'}</h3>
        </div>
        
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <Link
            href="/#tutorials"
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border group ${
              !currentCategory
                ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-200'
                : 'bg-transparent border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>সবগুলো</span>
          </Link>
          
          {filteredCategories.map((category) => (
            <Link
              key={category.name}
              href={`/?category=${encodeURIComponent(category.name)}#tutorials`}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border group ${
                currentCategory === category.name
                  ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-200'
                  : 'bg-transparent border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                 currentCategory === category.name
                  ? 'bg-indigo-500/20 text-indigo-200'
                  : 'bg-white/10 text-slate-400 group-hover:bg-white/20 group-hover:text-slate-200'
              }`}>
                {category.count}
              </span>
            </Link>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-4 text-slate-400 text-sm">
              কোনো ক্যাটাগরি পাওয়া যায়নি
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
