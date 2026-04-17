import { useState, useMemo } from 'react'
import { Shield, Star, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { regiments } from '../data/regiments'
import SectionHeader from '../components/common/SectionHeader'

const CATEGORIES = ['All', 'Infantry', 'Armoured', 'Special Forces', 'Corps', 'Naval Command']
const SERVICES   = ['All', 'Army', 'Navy', 'MHA/Army']

const CAT_COLOR = {
  Infantry: '#f97316', Armoured: '#f59e0b', 'Special Forces': '#ef4444',
  Corps: '#22d3ee', 'Naval Command': '#3b82f6', 'Counter-Terrorism': '#a855f7',
}

function RegimentCard({ reg }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLOR[reg.category] || '#FF6B00'
  return (
    <div
      style={{
        background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14,
        overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ padding: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}44`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {reg.category}
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{reg.service}</span>
            </div>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>{reg.name}</h3>
          </div>
          <Star size={14} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
        </div>

        {/* Motto */}
        {reg.motto && (
          <p style={{ fontSize: 12.5, color: '#94a3b8', fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.4 }}>
            &ldquo;{reg.motto}&rdquo;
          </p>
        )}

        {/* Quick info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
          {[
            ['Raised', reg.raised],
            ['HQ', reg.headquarters || reg.areaOfOperations],
            ...(reg.composition ? [['Composition', reg.composition]] : []),
            ...(reg.recruits_from ? [['Recruits From', reg.recruits_from]] : []),
          ].slice(0, 4).map(([k, v]) => v ? (
            <div key={k} style={{ background: '#0a0f1e', borderRadius: 7, padding: '6px 10px', gridColumn: k === 'Composition' ? '1 / -1' : undefined }}>
              <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{k}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.3 }}>{v}</div>
            </div>
          ) : null)}
        </div>

        {/* Battle Honours preview */}
        {reg.battleHonours?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
            {reg.battleHonours.slice(0, 3).map(h => (
              <span key={h} style={{ fontSize: 11, padding: '2px 7px', borderRadius: 99, background: 'rgba(255,107,0,0.08)', color: '#fb923c', border: '1px solid rgba(255,107,0,0.2)' }}>{h}</span>
            ))}
            {reg.battleHonours.length > 3 && <span style={{ fontSize: 11, color: '#94a3b8' }}>+{reg.battleHonours.length - 3} more</span>}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color, fontSize: 12, fontWeight: 600, padding: 0 }}
        >
          {open ? <><ChevronUp size={14} />Hide Details</> : <><ChevronDown size={14} />Famous Battles & Significance</>}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #1a2d4a', background: '#080e1b', padding: 16 }}>
          {/* Famous actions */}
          {reg.famousActions?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Famous Battles</div>
              {reg.famousActions.map((a, i) => (
                <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `2px solid ${color}` }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{a.battle}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55 }}>{a.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* All battle honours */}
          {reg.battleHonours?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>All Battle Honours</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {reg.battleHonours.map(h => (
                  <span key={h} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 99, background: `${color}12`, color, border: `1px solid ${color}30` }}>{h}</span>
                ))}
              </div>
            </div>
          )}

          {/* Famous soldiers */}
          {reg.famousSoldiers?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Notable Personnel</div>
              {reg.famousSoldiers.map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4, paddingLeft: 10, borderLeft: '2px solid #1a2d4a' }}>{s}</div>
              ))}
            </div>
          )}

          {/* Significance */}
          {reg.significance && (
            <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>SSB Significance</div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{reg.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Regiments() {
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')
  const [svc]                 = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return regiments.filter(r => {
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.motto?.toLowerCase().includes(q) || r.significance?.toLowerCase().includes(q) || r.battleHonours?.some(b => b.toLowerCase().includes(q))
      const matchCat = cat === 'All' || r.category === cat
      const matchSvc = svc === 'All' || r.service === svc
      return matchSearch && matchCat && matchSvc
    })
  }, [search, cat, svc])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Regiments & Battle Honours"
        subtitle="Indian Army Regiments, Corps & Naval Commands — history, famous battles, gallantry awards"
        icon={Shield}
        accent="#f97316"
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search regiments, battles, soldiers…"
            style={{ width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '9px 12px 9px 30px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 13px', borderRadius: 8, border: '1px solid', fontSize: 12, fontWeight: 500, cursor: 'pointer', background: cat === c ? '#FF6B00' : '#0f1b2e', color: cat === c ? '#fff' : '#94a3b8', borderColor: cat === c ? '#FF6B00' : '#1a2d4a' }}>{c}</button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Showing {filtered.length} of {regiments.length} units</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
        {filtered.map(r => <RegimentCard key={r.id} reg={r} />)}
      </div>
    </div>
  )
}
