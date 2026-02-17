
'use client'

import { useState, useTransition } from 'react'
import { togglePin } from './actions'
import { Pin, Loader2 } from 'lucide-react'

export default function PinToggle({ id, isPinned: initialPinned }: { id: string, isPinned: boolean }) {
  const [isPending, startTransition] = useTransition()
  const [isPinned, setIsPinned] = useState(initialPinned)

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await togglePin(id, !isPinned)
        setIsPinned(!isPinned)
      } catch {
        alert('Failed to update pin status. Maybe limit reached?')
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`p-2 rounded-lg transition ${
        isPinned ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
      title={isPinned ? 'Unpin Post' : 'Pin Post'}
    >
      {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Pin className={`h-5 w-5 ${isPinned ? 'fill-current' : ''}`} />}
    </button>
  )
}
