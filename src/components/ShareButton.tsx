'use client'

import { Share2, Check, Copy, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface ShareButtonProps {
  title: string
  url: string
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      color: 'hover:bg-green-500'
    }
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-slate-100 hover:text-white transition-colors"
      >
        <Share2 className="h-4 w-4" />
        শেয়ার
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-64 p-2 rounded-xl bg-slate-900 border border-white/10 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white transition-colors ${link.color}`}
                title={`Share on ${link.name}`}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-lg border border-white/5">
            <input
              type="text"
              readOnly
              value={url}
              className="bg-transparent border-none text-xs text-slate-400 w-full focus:ring-0 px-0"
            />
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-white transition-colors"
              title="Copy Link"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
