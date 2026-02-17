'use client'

import { useRef, useState, type ReactNode } from 'react'

type Props = {
  label: ReactNode
  formId?: string
  className?: string
  confirmTitle?: string
  confirmMessage?: string
  confirmLabel?: string
  cancelLabel?: string
  disabled?: boolean
}

export default function ConfirmSubmit({
  label,
  formId,
  className,
  confirmTitle = 'Confirm action',
  confirmMessage = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  const onConfirm = () => {
    setOpen(false)
    let form: HTMLFormElement | null = null
    if (formId) {
      const el = document.getElementById(formId)
      if (el && el.tagName === 'FORM') form = el as HTMLFormElement
    }
    if (!form && btnRef.current) {
      const f = btnRef.current.closest('form')
      if (f) form = f as HTMLFormElement
    }
    if (form) form.requestSubmit()
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        disabled={disabled}
        className={
          className ??
          'inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition disabled:opacity-70'
        }
      >
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative surface rounded-2xl p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold text-white">{confirmTitle}</h3>
            <p className="mt-2 text-sm text-slate-300">{confirmMessage}</p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:opacity-90 transition"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
