'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  name?: string
}

export default function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options',
  name
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    onChange(newValues)
  }

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selectedValues.filter((v) => v !== value))
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Hidden input for form submission if name is provided */}
      {name && selectedValues.map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}

      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`min-h-[46px] w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
          isOpen ? 'ring-2 ring-indigo-500/40 border-indigo-400' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {selectedValues.length > 0 ? (
              selectedValues.map((value) => {
                const option = options.find((o) => o.value === value)
                return (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-medium text-indigo-200 border border-indigo-500/30"
                  >
                    {option?.label || value}
                    <button
                      type="button"
                      onClick={(e) => handleRemove(value, e)}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-indigo-500/30 text-indigo-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )
              })
            ) : (
              <span className="text-slate-400">{placeholder}</span>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl ring-1 ring-black ring-opacity-5">
          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value)
              return (
                <div
                  key={option.value}
                  onClick={() => handleToggle(option.value)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    isSelected
                      ? 'bg-indigo-500/20 text-indigo-200'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <div className="flex items-center justify-center rounded-full bg-indigo-500 p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
