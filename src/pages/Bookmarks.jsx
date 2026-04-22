import { useState, useEffect } from 'react'
import { Bookmark, Trash2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/common/SectionHeader'

const BM_KEY = 'babayaga_bookmarks'

const TYPE_PATH = { weapon: '/weapons', unit: '/regiments' }
const TYPE_COLOR = { weapon: '#f97316', unit: '#3b82f6' }
const TYPE_LABEL = { weapon: 'Weapon / Platform', unit: 'Unit / Regiment' }

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(BM_KEY)) || [] } catch { return [] }
  })

  const remove = (id) => {
    const next = bookmarks.filter(b => b.id !== id)
    localStorage.setItem(BM_KEY, JSON.stringify(next))
    setBookmarks(next)
  }

  const clearAll = () => {
    localStorage.removeItem(BM_KEY)
    setBookmarks([])
  }

  const grouped = bookmarks.reduce((acc, b) => {
    const key = b.type || 'other'
    ;(acc[key] = acc[key] || []).push(b)
    return acc
  }, {})

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="My Bookmarks"
        subtitle={`${bookmarks.length} saved item${bookmarks.length !== 1 ? 's' : ''} — weapons, units & regiments you've starred`}
        icon={Bookmark}
        accent="#f59e0b"
      />

      {bookmarks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 16px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔖</div>
          <p style={{ color: '#64748b', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No bookmarks yet</p>
          <p style={{ color: '#475569', fontSize: 13, marginBottom: 28 }}>
            Hit the bookmark icon on any weapon card or unit card to save it here.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/weapons" style={{ padding: '10px 20px', borderRadius: 9, background: '#FF6B00', color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
              Browse Weapons
            </Link>
            <Link to="/regiments" style={{ padding: '10px 20px', borderRadius: 9, background: '#0f1b2e', border: '1px solid #1a2d4a', color: '#94a3b8', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
              Browse Units
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            <button
              onClick={clearAll}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, background: 'transparent', border: '1px solid #ef444430', color: '#f87171', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}
            >
              <Trash2 size={13} /> Clear All
            </button>
          </div>

          {Object.entries(grouped).map(([type, items]) => (
            <div key={type} style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 5,
                  background: `${TYPE_COLOR[type] || '#94a3b8'}18`,
                  color: TYPE_COLOR[type] || '#94a3b8',
                  border: `1px solid ${TYPE_COLOR[type] || '#94a3b8'}40`,
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  {TYPE_LABEL[type] || type}
                </span>
                <span style={{ fontSize: 12, color: '#475569' }}>{items.length} saved</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {items.map(b => (
                  <div key={b.id} style={{
                    background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 12,
                    padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12,
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.name}
                      </div>
                      {b.category && (
                        <div style={{ fontSize: 11, color: '#64748b' }}>{b.category}{b.service ? ` · ${b.service}` : ''}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <Link
                        to={TYPE_PATH[type] || '/'}
                        title="Go to section"
                        style={{ display: 'flex', alignItems: 'center', padding: 6, borderRadius: 7, background: '#1a2d4a', border: 'none', color: '#94a3b8', textDecoration: 'none' }}
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <button
                        onClick={() => remove(b.id)}
                        title="Remove bookmark"
                        style={{ display: 'flex', alignItems: 'center', padding: 6, borderRadius: 7, background: '#1a2d4a', border: 'none', color: '#f87171', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
