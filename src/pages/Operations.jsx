import { useState, useMemo } from 'react'
import { Rocket, ChevronDown, ChevronUp, Search, Calendar } from 'lucide-react'
import { operations } from '../data/operations'
import SectionHeader from '../components/common/SectionHeader'

const TYPES = ['All', 'War', 'Limited War', 'Military Operation', 'Special Forces / Air Operation', 'Military Confrontation', 'Peace-Keeping Operation', 'Humanitarian Evacuation', 'Military Mobilization', 'Naval Exercise', 'Bilateral Army Exercise', 'Military Exercises']

const TYPE_COLOR = {
  War: '#ef4444',
  'Limited War': '#f97316',
  'Military Operation': '#f59e0b',
  'Special Forces / Air Operation': '#a855f7',
  'Military Confrontation': '#ef4444',
  'Peace-Keeping Operation': '#22d3ee',
  'Humanitarian Evacuation': '#4ade80',
  'Military Mobilization': '#60a5fa',
  'Naval Exercise': '#3b82f6',
  'Bilateral Army Exercise': '#fb923c',
  'Military Exercises': '#22d3ee',
}

function OpCard({ op }) {
  const [open, setOpen] = useState(false)
  const color = TYPE_COLOR[op.type] || '#FF6B00'

  return (
    <div
      style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4)`; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}44`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{op.type}</span>
          <span style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3 }}><Calendar size={10} /> {op.year}</span>
        </div>

        <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px', lineHeight: 1.3 }}>{op.name}</h3>
        <p style={{ fontSize: 12.5, color: '#94a3b8', margin: '0 0 8px' }}>{op.theatre}</p>

        <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 10px' }}>{op.objective}</p>

        {/* Outcome */}
        <div style={{ background: '#0a0f1e', borderRadius: 8, padding: '8px 12px', marginBottom: 12, borderLeft: `2px solid ${color}` }}>
          <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>Outcome</div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.45 }}>{op.outcome}</div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color, fontSize: 12, fontWeight: 600, padding: 0 }}
        >
          {open ? <><ChevronUp size={14} />Hide Details</> : <><ChevronDown size={14} />Key Battles & Significance</>}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #1a2d4a', background: '#080e1b', padding: 16 }}>
          {/* Forces */}
          <div style={{ marginBottom: 14, background: '#0a0f1e', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>Forces Involved</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>{op.forces}</div>
          </div>

          {/* Key battles */}
          {op.keyBattles?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Battles / Actions</div>
              {op.keyBattles.map((b, i) => (
                <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `2px solid ${color}` }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{b.battle}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55 }}>{b.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* Key exercises (for exercise entries) */}
          {op.keyExercises?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Exercise Portfolio</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {op.keyExercises.map((ex, i) => (
                  <div key={i} style={{ background: '#0a0f1e', borderRadius: 8, padding: '8px 10px', borderLeft: `2px solid ${color}` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 2 }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>{ex.type}</div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.4 }}>{ex.significance}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key persons */}
          {op.keyPersons?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Notable Personnel</div>
              {op.keyPersons.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                  <span style={{ color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>★</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          )}

          {/* Lessons */}
          {op.lessons?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Lessons Learned</div>
              {op.lessons.map((l, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                  <span style={{ color: '#f59e0b', fontSize: 12, marginTop: 2, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{l}</span>
                </div>
              ))}
            </div>
          )}

          {/* Significance */}
          {op.significance && (
            <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>SSB Significance</div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{op.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Operations() {
  const [search, setSearch] = useState('')
  const [type, setType]     = useState('All')

  const simpleTypes = ['All', 'War', 'Military Operation', 'Special Forces / Air Operation', 'Humanitarian Evacuation', 'Military Exercises']

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return operations.filter(op => {
      const matchSearch = !q || op.name.toLowerCase().includes(q) || op.theatre.toLowerCase().includes(q) || op.objective.toLowerCase().includes(q) || op.significance?.toLowerCase().includes(q)
      const matchType = type === 'All' || op.type === type
      return matchSearch && matchType
    })
  }, [search, type])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Operations & Exercises"
        subtitle="From 1947 to Galwan 2020 — India's major military operations, wars, and bilateral exercises"
        icon={Rocket}
        accent="#ef4444"
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search operations, theatres…"
            style={{ width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '9px 12px 9px 30px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {simpleTypes.map(t => (
            <button key={t} onClick={() => setType(t)} style={{ padding: '8px 13px', borderRadius: 8, border: '1px solid', fontSize: 12, fontWeight: 500, cursor: 'pointer', background: type === t ? '#ef4444' : '#0f1b2e', color: type === t ? '#fff' : '#94a3b8', borderColor: type === t ? '#ef4444' : '#1a2d4a' }}>{t}</button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Showing {filtered.length} of {operations.length} entries</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {filtered.map(op => <OpCard key={op.id} op={op} />)}
      </div>
    </div>
  )
}
