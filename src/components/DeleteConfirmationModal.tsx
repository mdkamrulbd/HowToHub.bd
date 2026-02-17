'use client'

import { Trash2, AlertTriangle, X } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  isDeleting?: boolean
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'ডিলিট কনফার্মেশন',
  message = 'আপনি কি নিশ্চিত যে আপনি এটি ডিলিট করতে চান? এই অ্যাকশনটি ফিরিয়ে আনা যাবে না।',
  isDeleting = false
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl transform transition-all scale-100 opacity-100"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          disabled={isDeleting}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-6">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {title}
          </h3>
          
          <p className="text-slate-300 text-sm mb-8">
            {message}
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 font-medium hover:bg-white/10 transition disabled:opacity-50"
            >
              বাতিল করুন
            </button>
            
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-lg shadow-red-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ডিলিট হচ্ছে...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  ডিলিট করুন
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
