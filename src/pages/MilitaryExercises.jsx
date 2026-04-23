import { useState, useMemo } from 'react'
import { Users, ChevronDown, ChevronUp, Search, Globe, Calendar } from 'lucide-react'
import { militaryExercises } from '../data/militaryExercises'
import SectionHeader from '../components/common/SectionHeader'

const SERVICE_COLOR = {
  'Army':                        '#f97316',
  'Navy':                        '#3b82f6',
  'Air Force':                   '#22d3ee',
  'Tri-Service':                 '#a855f7',
  'Special Forces':              '#ef4444',
  'Special Forces (Counter-Terrorism)': '#ef4444',
  'Army / Tri-Service (varies)': '#a855f7',
  'Army (multinational)':        '#f97316',
  'Navy (with IAF & Army participation)': '#3b82f6',
}

const SERVICE_FILTERS = ['All', 'Army', 'Navy', 'Air Force', 'Tri-Service', 'Special Forces']

function matchesServiceFilter(exerciseService, filter) {
  if (filter === 'All') return true
  if (filter === 'Special Forces') return exerciseService.toLowerCase().includes('special forces')
  if (filter === 'Tri-Service') return exerciseService.toLowerCase().includes('tri-service')
  // For Army / Navy / Air Force filters, match if the service name appears at the start
  return exerciseService.toLowerCase().startsWith(filter.toLowerCase())
}

function ExerciseCard({ ex }) {
  const [open, setOpen] = useState(false)
  const color = SERVICE_COLOR[ex.service] || '#94a3b8'

  return (
    <div
      style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}44`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{ex.service}</span>
          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: '#1a2d4a', color: '#cbd5e1' }}>{ex.type}</span>
          {ex.frequency && (
            <span style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Calendar size={10} /> {ex.frequency}
            </span>
          )}
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', margin: '0 0 5px', lineHeight: 1.3 }}>{ex.name}</h3>

        {/* Partners */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 10 }}>
          <Globe size={12} color={color} style={{ marginTop: 2, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.4 }}>
            {ex.partners?.join(' · ')}
          </span>
        </div>

        {/* Focus */}
        <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.55, margin: '0 0 10px' }}>{ex.focus}</p>

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color, fontSize: 12, fontWeight: 600, padding: 0 }}
        >
          {open ? <><ChevronUp size={14} />Hide Details</> : <><ChevronDown size={14} />More Details</>}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #1a2d4a', background: '#080e1b', padding: 16 }}>
          {/* Key meta rows */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginBottom: 12 }}>
            {ex.firstEdition && (
              <div style={{ background: '#0a0f1e', borderRadius: 8, padding: '8px 11px', borderLeft: `2px solid ${color}` }}>
                <div style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>First Edition</div>
                <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.5 }}>{ex.firstEdition}</div>
              </div>
            )}
            {ex.location && (
              <div style={{ background: '#0a0f1e', borderRadius: 8, padding: '8px 11px', borderLeft: `2px solid ${color}` }}>
                <div style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>Location</div>
                <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.5 }}>{ex.location}</div>
              </div>
            )}
            {ex.latestEdition && (
              <div style={{ background: '#0a0f1e', borderRadius: 8, padding: '8px 11px', borderLeft: `2px solid ${color}` }}>
                <div style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>Latest Edition / Notes</div>
                <div style={{ fontSize: 12.5, color: '#cbd5e1', lineHeight: 1.5 }}>{ex.latestEdition}</div>
              </div>
            )}
          </div>

          {/* Significance */}
          {ex.significance && (
            <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>Significance</div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{ex.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function MilitaryExercises() {
  const [search, setSearch] = useState('')
  const [service, setService] = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return militaryExercises.filter(ex => {
      const matchSearch = !q
        || ex.name.toLowerCase().includes(q)
        || (ex.focus || '').toLowerCase().includes(q)
        || (ex.significance || '').toLowerCase().includes(q)
        || (ex.partners || []).join(' ').toLowerCase().includes(q)
        || (ex.location || '').toLowerCase().includes(q)
      const matchService = matchesServiceFilter(ex.service, service)
      return matchSearch && matchService
    })
  }, [search, service])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Military Exercises"
        subtitle="Every major bilateral, multilateral and tri-service exercise the Indian Armed Forces are part of — Army, Navy, Air Force and Special Forces"
        icon={Users}
        accent="#10b981"
        lastUpdated="April 2026"
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search exercises, partners, focus…"
            style={{ width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '9px 12px 9px 30px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SERVICE_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setService(s)}
              style={{
                padding: '8px 13px', borderRadius: 8,
                border: '1px solid',
                fontSize: 12, fontWeight: 500,
                cursor: 'pointer',
                background: service === s ? '#10b981' : '#0f1b2e',
                color: service === s ? '#fff' : '#94a3b8',
                borderColor: service === s ? '#10b981' : '#1a2d4a',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
        Showing {filtered.length} of {militaryExercises.length} exercises
      </p>

      <div className="content-grid">
        {filtered.map(ex => <ExerciseCard key={ex.id} ex={ex} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 16px', color: '#64748b' }}>
          <p style={{ fontSize: 13 }}>No exercises match your search.</p>
        </div>
      )}

      <div style={{ marginTop: 32, padding: '14px 16px', background: '#0a0f1e', border: '1px solid #1a2d4a', borderRadius: 10, fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
        <strong style={{ color: '#94a3b8' }}>Source & accuracy:</strong> Every exercise listed here has been cross-checked against PIB releases, MoD / Indian Army / Indian Navy / IAF official statements, Wikipedia and mainstream defence reporting. Dates of "latest edition" reflect the most recent edition documented in open sources at the time of last update. If you spot an error or omission, please use the feedback form.
      </div>
    </div>
  )
}
