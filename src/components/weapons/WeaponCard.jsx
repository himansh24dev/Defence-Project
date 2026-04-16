import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const TAG_STYLE = {
  indigenous:      { background: '#052e16', color: '#4ade80', border: '#166534' },
  imported:        { background: '#172554', color: '#93c5fd', border: '#1d4ed8' },
  licensed:        { background: '#422006', color: '#fcd34d', border: '#92400e' },
  flagship:        { background: '#431407', color: '#fb923c', border: '#9a3412' },
  'joint-venture': { background: '#2e1065', color: '#c4b5fd', border: '#6d28d9' },
  strategic:       { background: '#450a0a', color: '#fca5a5', border: '#991b1b' },
  'nuclear-triad': { background: '#450a0a', color: '#f87171', border: '#dc2626' },
  backbone:        { background: '#1e293b', color: '#cbd5e1', border: '#334155' },
  upcoming:        { background: '#083344', color: '#67e8f9', border: '#155e75' },
  stealth:         { background: '#1e1b4b', color: '#a5b4fc', border: '#3730a3' },
  historic:        { background: '#422006', color: '#fde68a', border: '#92400e' },
  legacy:          { background: '#1e293b', color: '#94a3b8', border: '#334155' },
  upgraded:        { background: '#1a2e05', color: '#86efac', border: '#166534' },
  'replacing INSAS': { background: '#1e293b', color: '#94a3b8', border: '#334155' },
  leased:          { background: '#083344', color: '#67e8f9', border: '#155e75' },
  'fourth-gen-plus': { background: '#172554', color: '#60a5fa', border: '#1d4ed8' },
  future:          { background: '#083344', color: '#67e8f9', border: '#155e75' },
  'nuclear-capable': { background: '#450a0a', color: '#fca5a5', border: '#991b1b' },
}

const STATUS_COLOR = {
  'In Service':            '#4ade80',
  'In Production':         '#34d399',
  'Under Construction':    '#fbbf24',
  'Under Testing':         '#22d3ee',
  'Development':           '#a78bfa',
  'Procurement Finalised': '#60a5fa',
  'Phasing':               '#fb923c',
  'Lease':                 '#22d3ee',
  'Expected':              '#94a3b8',
}

function getStatusColor(status = '') {
  return Object.entries(STATUS_COLOR).find(([k]) => status.startsWith(k))?.[1] || '#94a3b8'
}

export default function WeaponCard({ weapon }) {
  const [expanded, setExpanded] = useState(false)
  const statusColor = getStatusColor(weapon.status)

  return (
    <div
      style={{
        background: '#0f1b2e',
        border: '1px solid #1a2d4a',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#253d60'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1a2d4a'}
    >
      {/* Card header */}
      <div style={{ padding: '16px 16px 0' }}>
        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>{weapon.name}</h3>
            <p style={{ fontSize: 11.5, color: '#64748b', margin: '3px 0 0' }}>{weapon.type}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
            <span style={{ fontSize: 10.5, color: statusColor, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {weapon.status?.split('(')[0].trim()}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
          {weapon.tags?.map(tag => {
            const s = TAG_STYLE[tag] || { background: '#1e293b', color: '#94a3b8', border: '#334155' }
            return (
              <span key={tag} style={{
                fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                background: s.background, color: s.color, border: `1px solid ${s.border}`,
                textTransform: 'uppercase', letterSpacing: '0.4px',
              }}>
                {tag.replace(/-/g, ' ')}
              </span>
            )
          })}
        </div>

        {/* Quick info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 10 }}>
          {[
            ['Origin', weapon.origin],
            ['Inducted', weapon.inducted],
            ...(weapon.quantity ? [['Quantity', weapon.quantity]] : []),
          ].map(([k, v]) => (
            <div key={k} style={{ background: '#0a0f1e', borderRadius: 7, padding: '6px 10px', gridColumn: k === 'Quantity' ? '1 / -1' : undefined }}>
              <div style={{ fontSize: 9.5, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{k}</div>
              <div style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.35 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="line-clamp-2" style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.55, margin: '0 0 12px' }}>
          {weapon.description}
        </p>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#FF6B00', fontSize: 12, fontWeight: 600, padding: '0 0 12px',
          }}
        >
          {expanded ? <><ChevronUp size={14} />Hide specs</> : <><ChevronDown size={14} />Full specs & SSB significance</>}
        </button>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div style={{ borderTop: '1px solid #1a2d4a', background: '#080e1b', padding: 16 }}>
          {/* Specs table */}
          {weapon.specs && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>
                Technical Specifications
              </div>
              <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #1a2d4a' }}>
                {Object.entries(weapon.specs).map(([key, val], i) => (
                  <div key={key} style={{
                    display: 'flex', gap: 12, padding: '7px 10px',
                    background: i % 2 === 0 ? '#0a0f1e' : '#0d1525',
                    fontSize: 12,
                  }}>
                    <span style={{ color: '#475569', width: 130, flexShrink: 0 }}>{key}</span>
                    <span style={{ color: '#cbd5e1', flex: 1 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full description */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 6 }}>Details</div>
            <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{weapon.description}</p>
          </div>

          {/* SSB Significance */}
          {weapon.significance && (
            <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>
                SSB Interview Significance
              </div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{weapon.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
