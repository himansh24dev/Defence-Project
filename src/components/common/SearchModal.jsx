import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const quickLinks = [
  { label: 'Rafale Fighter Jet', path: '/weapons' },
  { label: 'INS Vikrant', path: '/weapons' },
  { label: 'DRDO Akash Missile', path: '/indigenization' },
  { label: 'LAC Border News', path: '/national' },
  { label: 'Defence Budget 2025', path: '/procurement' },
  { label: 'Agni V Missile', path: '/weapons' },
]

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0f172a] rounded-2xl border border-[#1e2d4a] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSearch} className="flex items-center gap-3 px-4 py-4 border-b border-[#1e2d4a]">
          <Search className="w-5 h-5 text-[#64748b] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search news, equipment, schemes..."
            className="flex-1 bg-transparent text-white placeholder-[#475569] text-base outline-none"
          />
          <button type="button" onClick={onClose} className="p-1 text-[#64748b] hover:text-white rounded">
            <X className="w-4 h-4" />
          </button>
        </form>
        <div className="p-4">
          <p className="text-[#475569] text-xs uppercase tracking-wider mb-3">Quick Access</p>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map(link => (
              <button
                key={link.label}
                onClick={() => { navigate(link.path); onClose() }}
                className="text-left px-3 py-2.5 bg-[#0a0f1e] hover:bg-[#1e2d4a] rounded-lg text-sm text-[#94a3b8] hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
