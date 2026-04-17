import { useState, useMemo } from 'react'
import { BookOpen, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { govSchemes } from '../data/govSchemes'
import SectionHeader from '../components/common/SectionHeader'

const CATEGORIES = ['All', 'Personnel', 'Veterans', 'Indigenisation', 'Innovation', 'R&D', 'Industry', 'Space', 'Cyber', 'Education', 'Training']

const CAT_COLOR = {
  Personnel: '#f97316', Veterans: '#f59e0b', Indigenisation: '#4ade80',
  Innovation: '#22d3ee', 'R&D': '#a78bfa', Industry: '#60a5fa',
  Space: '#c084fc', Cyber: '#f87171', Education: '#34d399', Training: '#fb923c',
}

function SchemeCard({ scheme }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLOR[scheme.category] || '#FF6B00'

  return (
    <div
      style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4)`; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}44`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{scheme.category}</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{scheme.launched}</span>
        </div>

        <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', lineHeight: 1.3 }}>{scheme.name}</h3>
        <p style={{ fontSize: 12.5, color: '#94a3b8', margin: '0 0 10px' }}>{scheme.ministry}</p>

        <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 12px' }}>{scheme.objective}</p>

        {/* Key features preview */}
        {scheme.keyFeatures?.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            {scheme.keyFeatures.slice(0, 3).map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <span style={{ color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
            {scheme.keyFeatures.length > 3 && <p style={{ fontSize: 11.5, color: '#64748b', margin: '4px 0 0 16px' }}>+{scheme.keyFeatures.length - 3} more features</p>}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color, fontSize: 12, fontWeight: 600, padding: 0 }}
        >
          {open ? <><ChevronUp size={14} />Hide Details</> : <><ChevronDown size={14} />Full Details & SSB Significance</>}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #1a2d4a', background: '#080e1b', padding: 16 }}>
          {/* All key features */}
          {scheme.keyFeatures?.length > 3 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>All Features</div>
              {scheme.keyFeatures.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                  <span style={{ color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key milestones */}
          {scheme.keyMilestones?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Milestones</div>
              {scheme.keyMilestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}18`, padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>{m.year}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{m.milestone}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key programs (DRDO) */}
          {scheme.keyPrograms?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Programs</div>
              <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #1a2d4a' }}>
                {scheme.keyPrograms.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 10px', background: i % 2 === 0 ? '#0a0f1e' : '#0d1525', fontSize: 12 }}>
                    <span style={{ color: '#f1f5f9', width: 140, flexShrink: 0, fontWeight: 600 }}>{p.program}</span>
                    <span style={{ color: '#94a3b8', width: 80, flexShrink: 0 }}>{p.milestone}</span>
                    <span style={{ color: '#94a3b8' }}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SSB stages (NDA scheme) */}
          {scheme.keySSBStages?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>SSB Process — 5 Days</div>
              {scheme.keySSBStages.map((s, i) => (
                <div key={i} style={{ marginBottom: 10, background: '#0a0f1e', borderRadius: 8, padding: '10px 12px', borderLeft: `2px solid ${color}` }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{s.stage}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55 }}>{s.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* Controversies */}
          {scheme.controversies?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: '#f87171', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Points of Debate</div>
              {scheme.controversies.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                  <span style={{ color: '#f87171', fontSize: 12, marginTop: 2, flexShrink: 0 }}>⚠</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          )}

          {/* Current status */}
          {scheme.currentStatus && (
            <div style={{ marginBottom: 14, background: '#0a0f1e', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 5 }}>Current Status (April 2026)</div>
              <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>{scheme.currentStatus}</p>
            </div>
          )}

          {/* Significance */}
          {scheme.significance && (
            <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>SSB Significance</div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{scheme.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function GovSchemes() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return govSchemes.filter(s => {
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.objective.toLowerCase().includes(q) || s.significance?.toLowerCase().includes(q)
      const matchCat = cat === 'All' || s.category === cat
      return matchSearch && matchCat
    })
  }, [search, cat])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Government Schemes & Initiatives"
        subtitle="Agnipath, Atmanirbhar Bharat, iDEX, DRDO, Defence Corridors, NDA/SSB — complete policy landscape"
        icon={BookOpen}
        accent="#4ade80"
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search schemes, programs…"
            style={{ width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '9px 12px 9px 30px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 13px', borderRadius: 8, border: '1px solid', fontSize: 12, fontWeight: 500, cursor: 'pointer', background: cat === c ? '#4ade80' : '#0f1b2e', color: cat === c ? '#0a0f1e' : '#94a3b8', borderColor: cat === c ? '#4ade80' : '#1a2d4a' }}>{c}</button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Showing {filtered.length} of {govSchemes.length} schemes</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {filtered.map(s => <SchemeCard key={s.id} scheme={s} />)}
      </div>
    </div>
  )
}
