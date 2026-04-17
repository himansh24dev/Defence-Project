import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const quickLinks = [
  { label: 'Rafale Fighter Jet',   path: '/weapons' },
  { label: 'INS Vikrant Carrier',  path: '/weapons' },
  { label: 'Tejas Mk1A',           path: '/weapons' },
  { label: 'Agni-V ICBM',         path: '/weapons' },
  { label: 'BrahMos Missile',      path: '/weapons' },
  { label: 'Arjun MBT',            path: '/weapons' },
  { label: 'S-400 Triumf',         path: '/weapons' },
  { label: 'AMCA Fighter',         path: '/weapons' },
]

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 80); setQuery('') }
  }, [open])

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!open) return null

  const handleSearch = e => {
    e.preventDefault()
    if (query.trim()) { navigate(`/?q=${encodeURIComponent(query.trim())}`); onClose() }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 80, paddingLeft: 16, paddingRight: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 600,
          background: '#0f1b2e',
          border: '1px solid #1a2d4a',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Search input */}
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid #1a2d4a' }}>
          <Search size={17} color="#94a3b8" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search weapons, equipment, platforms…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: 15 }}
          />
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 2, display: 'flex' }}>
            <X size={16} />
          </button>
        </form>

        {/* Quick links */}
        <div style={{ padding: 16 }}>
          <p style={{ color: '#94a3b8', fontSize: 11.5, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>
            Quick Access
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {quickLinks.map(link => (
              <button
                key={link.label}
                onClick={() => { navigate(link.path); onClose() }}
                style={{
                  textAlign: 'left', padding: '9px 12px',
                  background: '#0a0f1e', border: '1px solid #1a2d4a',
                  borderRadius: 8, fontSize: 12.5, color: '#94a3b8',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#253d60' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#1a2d4a' }}
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
