import { useState, useMemo } from 'react'
import { Cpu, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { defenceOrgs } from '../data/defenceOrgs'
import SectionHeader from '../components/common/SectionHeader'

const CATEGORIES = ['All', 'R&D', 'Space', 'Production', 'Strategic', 'Structure', 'Paramilitary']

const CAT_COLOR = {
  'R&D': '#a78bfa', Space: '#c084fc', Production: '#22d3ee',
  Strategic: '#ef4444', Structure: '#f59e0b', Paramilitary: '#64748b',
}

function OrgCard({ org }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLOR[org.category] || '#FF6B00'

  return (
    <div
      style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4)`; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}44`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{org.category}</span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Est. {org.established}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color }}>{org.abbreviation?.slice(0, 3) || org.name.slice(0, 3)}</span>
              </div>
              <div>
                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#f1f5f9', margin: 0, lineHeight: 1.2 }}>{org.abbreviation}</h3>
                <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>{org.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
          {[
            ['HQ', org.headquarters],
            ['Personnel', org.personnel],
            ...(org.budget ? [['Budget', org.budget]] : []),
          ].slice(0, 4).map(([k, v]) => v ? (
            <div key={k} style={{ background: '#0a0f1e', borderRadius: 7, padding: '6px 10px' }}>
              <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{k}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.3 }}>{v}</div>
            </div>
          ) : null)}
        </div>

        <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 12px' }}>{org.mandate}</p>

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color, fontSize: 12, fontWeight: 600, padding: 0 }}
        >
          {open ? <><ChevronUp size={14} />Hide Details</> : <><ChevronDown size={14} />Products, Achievements & Significance</>}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid #1a2d4a', background: '#080e1b', padding: 16 }}>
          {/* Labs */}
          {org.keyLaboratories?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Labs / Divisions</div>
              <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #1a2d4a' }}>
                {org.keyLaboratories.map((lab, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 10px', background: i % 2 === 0 ? '#0a0f1e' : '#0d1525', fontSize: 12 }}>
                    <span style={{ color: '#f1f5f9', width: 160, flexShrink: 0, fontWeight: 600 }}>{lab.name || lab.division}</span>
                    <span style={{ color: '#94a3b8' }}>{lab.specialty || lab.products}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {org.achievements?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Achievements</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {org.achievements.map((a, i) => (
                  <span key={i} style={{ fontSize: 12, padding: '3px 9px', borderRadius: 99, background: `${color}12`, color, border: `1px solid ${color}30` }}>{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Key products */}
          {org.keyProducts?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Key Products</div>
              {org.keyProducts.slice(0, 8).map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          )}

          {/* Current projects */}
          {org.currentProjects?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Current Projects</div>
              {org.currentProjects.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          )}

          {/* Forces (CAPF) */}
          {org.forces?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Forces Under CAPF</div>
              <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #1a2d4a' }}>
                {org.forces.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 10px', background: i % 2 === 0 ? '#0a0f1e' : '#0d1525', fontSize: 12 }}>
                    <span style={{ color: '#f1f5f9', width: 220, flexShrink: 0, fontWeight: 600 }}>{f.name}</span>
                    <span style={{ color, width: 80, flexShrink: 0 }}>{f.strength}</span>
                    <span style={{ color: '#94a3b8' }}>{f.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {org.challenges?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: '#f87171', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Challenges</div>
              {org.challenges.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#f87171', fontSize: 12, marginTop: 2, flexShrink: 0 }}>⚠</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          )}

          {/* Significance */}
          {org.significance && (
            <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>SSB Significance</div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{org.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function DefenceOrgs() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return defenceOrgs.filter(o => {
      const matchSearch = !q || o.name.toLowerCase().includes(q) || o.abbreviation?.toLowerCase().includes(q) || o.mandate.toLowerCase().includes(q) || o.significance?.toLowerCase().includes(q)
      const matchCat = cat === 'All' || o.category === cat
      return matchSearch && matchCat
    })
  }, [search, cat])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Defence Organisations"
        subtitle="DRDO, ISRO, HAL, BEL, MDL, SFC, CDS — who does what in India's defence ecosystem"
        icon={Cpu}
        accent="#a78bfa"
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search organisations…"
            style={{ width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '9px 12px 9px 30px', color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 13px', borderRadius: 8, border: '1px solid', fontSize: 12, fontWeight: 500, cursor: 'pointer', background: cat === c ? '#a78bfa' : '#0f1b2e', color: cat === c ? '#0a0f1e' : '#94a3b8', borderColor: cat === c ? '#a78bfa' : '#1a2d4a' }}>{c}</button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Showing {filtered.length} of {defenceOrgs.length} organisations</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {filtered.map(o => <OrgCard key={o.id} org={o} />)}
      </div>
    </div>
  )
}
