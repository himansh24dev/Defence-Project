import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { searchIndex } from '../../data/searchIndex'

const CATEGORIES = ['All', 'Army Equipment', 'Navy Equipment', 'Air Force Equipment', 'Army Regiment', 'Navy Unit', 'IAF Unit', 'Geopolitics', 'Operation']

export default function SearchModal({ open, onClose }) {
  const [query, setQuery]       = useState('')
  const [catFilter, setCat]     = useState('All')
  const [selected, setSelected] = useState(0)
  const inputRef  = useRef(null)
  const listRef   = useRef(null)
  const navigate  = useNavigate()

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 60); setQuery(''); setSelected(0); setCat('All') }
  }, [open])

  useEffect(() => {
    const fn = e => {
      if (!open) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && results[selected]) { navigate(results[selected].path); onClose() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, selected, onClose]) // eslint-disable-line

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    return searchIndex
      .filter(item =>
        (catFilter === 'All' || item.category === catFilter) &&
        item.keywords.includes(q)
      )
      .slice(0, 10)
  }, [query, catFilter])

  useEffect(() => { setSelected(0) }, [results.length])

  const goTo = (item) => { navigate(item.path); onClose() }

  if (!open) return null

  const grouped = results.reduce((acc, item) => {
    ;(acc[item.category] = acc[item.category] || []).push(item)
    return acc
  }, {})

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 72, paddingLeft: 16, paddingRight: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 640,
          background: '#0f1b2e', border: '1px solid #1a2d4a',
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
          maxHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid #1a2d4a', flexShrink: 0 }}>
          <Search size={17} color="#94a3b8" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search weapons, regiments, operations, geopolitics…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: 15 }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 2, display: 'flex' }}>
              <X size={14} />
            </button>
          )}
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 2, display: 'flex', fontSize: 11, color: '#475569' }}>
            ESC
          </button>
        </div>

        {/* Category filter pills */}
        <div style={{ display: 'flex', gap: 5, padding: '10px 16px', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0, borderBottom: '1px solid #0d1526' }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 500,
                border: '1px solid', whiteSpace: 'nowrap', cursor: 'pointer',
                background: catFilter === c ? '#FF6B00' : 'transparent',
                color: catFilter === c ? '#fff' : '#64748b',
                borderColor: catFilter === c ? '#FF6B00' : '#1a2d4a',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results */}
        <div ref={listRef} style={{ overflowY: 'auto', flex: 1 }}>
          {query.trim() === '' ? (
            <div style={{ padding: '20px 16px' }}>
              <p style={{ color: '#475569', fontSize: 11.5, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>
                Quick Access
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[
                  { label: 'Rafale Fighter', path: '/weapons' },
                  { label: 'BrahMos Missile', path: '/weapons' },
                  { label: 'Op Sindoor 2026', path: '/operations' },
                  { label: 'Kargil War 1999', path: '/operations' },
                  { label: 'Para Special Forces', path: '/regiments' },
                  { label: 'LAC Dispute', path: '/geopolitics' },
                  { label: 'INS Vikrant', path: '/weapons' },
                  { label: 'Galwan 2020', path: '/geopolitics' },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => { navigate(item.path); onClose() }}
                    style={{
                      textAlign: 'left', padding: '9px 12px',
                      background: '#0a0f1e', border: '1px solid #1a2d4a',
                      borderRadius: 8, fontSize: 12.5, color: '#94a3b8',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#253d60' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#1a2d4a' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '40px 16px', textAlign: 'center' }}>
              <p style={{ color: '#475569', fontSize: 14 }}>No results for &ldquo;{query}&rdquo;</p>
              <p style={{ color: '#334155', fontSize: 12, marginTop: 6 }}>Try different keywords — weapon name, battle, regiment, operation</p>
            </div>
          ) : (
            <div style={{ padding: '8px 0 12px' }}>
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat}>
                  <div style={{ padding: '6px 16px 3px', fontSize: 10, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    {cat}
                  </div>
                  {items.map((item, i) => {
                    const flatIdx = results.indexOf(item)
                    const isSelected = flatIdx === selected
                    return (
                      <button
                        key={item.id}
                        onClick={() => goTo(item)}
                        style={{
                          width: '100%', textAlign: 'left', padding: '9px 16px',
                          display: 'flex', alignItems: 'center', gap: 12,
                          background: isSelected ? '#0d1a2e' : 'none',
                          border: 'none', cursor: 'pointer',
                          borderLeft: isSelected ? `3px solid ${item.color}` : '3px solid transparent',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={() => setSelected(flatIdx)}
                      >
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>{item.subtitle}</div>
                        </div>
                        <ArrowRight size={13} color="#334155" style={{ flexShrink: 0 }} />
                      </button>
                    )
                  })}
                </div>
              ))}
              <div style={{ padding: '8px 16px 0', fontSize: 11, color: '#334155' }}>
                {results.length} result{results.length !== 1 ? 's' : ''} · ↑↓ to navigate · Enter to open
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
