import { useState, useMemo } from 'react'
import { Globe, ChevronDown, ChevronUp, Search, MapPin } from 'lucide-react'
import { geopoliticsData } from '../data/geopolitics'
import SectionHeader from '../components/common/SectionHeader'

const CATEGORIES = ['All', 'India-China', 'India-Pakistan', 'Multilateral', 'Maritime Security', 'Bilateral']

const CAT_COLOR = {
  'India-China':    '#ef4444',
  'India-Pakistan': '#f59e0b',
  'Multilateral':   '#22d3ee',
  'Maritime Security': '#3b82f6',
  'Bilateral':      '#a855f7',
}

function GeoCard({ item }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLOR[item.category] || '#FF6B00'

  return (
    <div
      style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4)`; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ padding: 16 }}>
        {/* Category + region */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}44`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{item.category}</span>
          <span style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} /> {item.region}</span>
        </div>

        <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px', lineHeight: 1.3 }}>{item.title}</h3>

        {/* Summary */}
        <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 12px' }}>{item.summary}</p>

        {/* Key points preview */}
        {item.keyPoints?.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            {item.keyPoints.slice(0, 3).map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                <span style={{ color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
            {item.keyPoints.length > 3 && <p style={{ fontSize: 11.5, color: '#64748b', margin: '4px 0 0 16px' }}>+{item.keyPoints.length - 3} more points</p>}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color, fontSize: 12, fontWeight: 600, padding: 0 }}
        >
          {open ? <><ChevronUp size={14} />Hide Full Analysis</> : <><ChevronDown size={14} />Full Analysis & SSB Significance</>}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #1a2d4a', background: '#080e1b', padding: 16 }}>
          {/* All key points */}
          {item.keyPoints?.length > 3 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>All Key Points</div>
              {item.keyPoints.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key locations */}
          {item.keyLocations?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Locations</div>
              {item.keyLocations.map((loc, i) => (
                <div key={i} style={{ marginBottom: 8, background: '#0a0f1e', borderRadius: 8, padding: '8px 12px', borderLeft: `2px solid ${color}` }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{loc.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{loc.significance}</div>
                </div>
              ))}
            </div>
          )}

          {/* Key exercises or bilateral details */}
          {item.keyExercises?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Exercises</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {item.keyExercises.map((ex, i) => (
                  <div key={i} style={{ background: '#0a0f1e', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 2 }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>{ex.type}</div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8' }}>{ex.significance}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current status */}
          {item.currentStatus && (
            <div style={{ marginBottom: 14, background: '#0a0f1e', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 5 }}>Current Status (April 2026)</div>
              <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>{item.currentStatus}</p>
            </div>
          )}

          {/* India's stance */}
          {item.indiaStance && (
            <div style={{ marginBottom: 14, background: 'rgba(34,197,94,0.06)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(34,197,94,0.15)' }}>
              <div style={{ fontSize: 10, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 5 }}>India\'s Official Stance</div>
              <p style={{ fontSize: 12.5, color: '#86efac', lineHeight: 1.55, margin: 0 }}>{item.indiaStance}</p>
            </div>
          )}

          {/* Significance */}
          {item.significance && (
            <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>SSB Interview Significance</div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{item.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Geopolitics() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return geopoliticsData.filter(item => {
      const matchSearch = !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q) || item.region.toLowerCase().includes(q) || item.significance?.toLowerCase().includes(q)
      const matchCat = cat === 'All' || item.category === cat
      return matchSearch && matchCat
    })
  }, [search, cat])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Geopolitics & Strategic Affairs"
        subtitle="India-China LAC, India-Pakistan LoC, Quad, SCO, BRICS, BRO — complete strategic landscape"
        icon={Globe}
        accent="#22d3ee"
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search topics, regions, keywords…"
            style={{ width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '9px 12px 9px 30px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 13px', borderRadius: 8, border: '1px solid', fontSize: 12, fontWeight: 500, cursor: 'pointer', background: cat === c ? '#22d3ee' : '#0f1b2e', color: cat === c ? '#0a0f1e' : '#94a3b8', borderColor: cat === c ? '#22d3ee' : '#1a2d4a' }}>{c}</button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Showing {filtered.length} of {geopoliticsData.length} topics</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {filtered.map(item => <GeoCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}
