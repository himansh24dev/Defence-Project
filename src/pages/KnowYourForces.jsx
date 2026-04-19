import { useState } from 'react'
import { forcesStructure } from '../data/forcesStructure'
import SectionHeader from '../components/common/SectionHeader'

const SERVICE_TABS = [
  { id: 'army',     label: 'Indian Army',      color: '#f97316', short: 'ARMY' },
  { id: 'navy',     label: 'Indian Navy',      color: '#3b82f6', short: 'NAVY' },
  { id: 'airforce', label: 'Indian Air Force', color: '#22d3ee', short: 'IAF' },
]

function NodeCard({ node, color, isOpen, onToggle, small }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: isOpen ? `${color}12` : '#0f1b2e',
        border: `1px solid ${isOpen ? color + '55' : '#1a2d4a'}`,
        borderRadius: 10,
        padding: small ? '10px 12px' : '12px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
        width: '100%',
      }}
      onMouseEnter={e => { if (!isOpen) { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.background = `${color}08` } }}
      onMouseLeave={e => { if (!isOpen) { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.background = '#0f1b2e' } }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: small ? 12.5 : 13.5, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3 }}>
            {node.title}
          </div>
          {node.subtitle && (
            <div style={{ fontSize: 11, color, marginTop: 2, fontWeight: 500 }}>
              {node.subtitle}
            </div>
          )}
          {node.rank && (
            <div style={{ display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}33`, letterSpacing: '0.3px' }}>
              {node.rank}
            </div>
          )}
        </div>
        <span style={{ fontSize: 10, color: color, flexShrink: 0, marginTop: 2 }}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* Quick stats */}
      {(node.hq || node.strength) && (
        <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
          {node.hq && (
            <div style={{ fontSize: 10.5, color: '#64748b' }}>
              <span style={{ color: '#475569' }}>HQ: </span>{node.hq}
            </div>
          )}
          {node.strength && (
            <div style={{ fontSize: 10.5, color: '#64748b' }}>
              <span style={{ color: '#475569' }}>Strength: </span>{node.strength}
            </div>
          )}
        </div>
      )}

      {/* Expanded note */}
      {isOpen && node.note && (
        <div style={{
          marginTop: 10,
          padding: '8px 10px',
          background: `${color}0a`,
          borderLeft: `3px solid ${color}66`,
          borderRadius: '0 6px 6px 0',
        }}>
          <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{node.note}</p>
        </div>
      )}
    </div>
  )
}

function Connector({ color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0' }}>
      <div style={{ width: 2, height: 28, background: `linear-gradient(to bottom, ${color}80, ${color}30)` }} />
    </div>
  )
}

function BranchConnector({ color, count }) {
  if (count <= 1) return <Connector color={color} />
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 900 }}>
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          width: 2, height: 24,
          background: `linear-gradient(to bottom, ${color}80, ${color}50)`,
          transform: 'translateX(-50%)',
        }} />
        <div style={{
          position: 'absolute', top: 24,
          left: 'calc(8px)', right: 'calc(8px)',
          height: 2,
          background: `linear-gradient(to right, transparent, ${color}50 15%, ${color}50 85%, transparent)`,
        }} />
        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}

function HierarchyLevel({ level, color }) {
  const [openId, setOpenId] = useState(null)

  if (level.single) {
    const key = level.id
    return (
      <div>
        <div style={{ fontSize: 10, color: '#475569', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6, fontWeight: 600 }}>
          {level.levelName}
        </div>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <NodeCard
            node={level.node}
            color={color}
            isOpen={openId === key}
            onToggle={() => setOpenId(openId === key ? null : key)}
          />
        </div>
      </div>
    )
  }

  if (level.branch) {
    return (
      <div>
        <div style={{ fontSize: 10, color: '#475569', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6, fontWeight: 600 }}>
          {level.levelName}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(260px, 1fr))`,
          gap: 8,
        }}>
          {level.nodes.map((node, i) => (
            <NodeCard
              key={i}
              node={node}
              color={color}
              isOpen={openId === i}
              onToggle={() => setOpenId(openId === i ? null : i)}
              small
            />
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default function KnowYourForces() {
  const [activeTab, setActiveTab] = useState('army')
  const service = forcesStructure[activeTab]
  const tab = SERVICE_TABS.find(t => t.id === activeTab)
  const color = service.color

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 64px' }}>
      <SectionHeader
        title="Know Your Forces"
        subtitle="Complete organisational hierarchy of India's three armed services — from the Supreme Commander to the smallest tactical unit"
        icon="⚔️"
      />

      {/* Service Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {SERVICE_TABS.map(t => {
          const active = activeTab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                color: active ? '#fff' : '#94a3b8',
                background: active ? t.color : '#0f1b2e',
                border: `1px solid ${active ? t.color : '#1a2d4a'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = t.color + '55'; e.currentTarget.style.color = '#fff' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.color = '#94a3b8' } }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Service info bar */}
      <div style={{
        background: `linear-gradient(135deg, ${color}10, ${color}06)`,
        border: `1px solid ${color}30`,
        borderRadius: 12,
        padding: '14px 20px',
        marginBottom: 28,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Founded</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{service.founded}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Strength</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{service.strength}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Structure</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{service.totalUnits}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>Motto</div>
          <div style={{ fontSize: 12, color, fontStyle: 'italic' }}>{service.motto}</div>
        </div>
      </div>

      {/* Instruction */}
      <div style={{ textAlign: 'center', fontSize: 11.5, color: '#475569', marginBottom: 20 }}>
        Click any card to expand details &nbsp;·&nbsp; Hierarchy flows top → bottom
      </div>

      {/* Hierarchy tree */}
      <div style={{ position: 'relative' }}>
        {service.hierarchy.map((level, i) => (
          <div key={level.id}>
            <HierarchyLevel level={level} color={color} />
            {i < service.hierarchy.length - 1 && (
              level.branch
                ? <BranchConnector color={color} count={level.nodes?.length || 1} />
                : <Connector color={color} />
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 36,
        padding: '12px 16px',
        background: '#0f1b2e',
        border: '1px solid #1a2d4a',
        borderRadius: 10,
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
        fontSize: 11,
        color: '#64748b',
      }}>
        <span style={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Legend:</span>
        <span>Cards with <span style={{ color }}>{tab?.short} colour border</span> = currently expanded</span>
        <span>HQ = Headquarters location</span>
        <span>Strength = approximate personnel count</span>
        <span style={{ color: '#f59e0b', fontSize: 10 }}>⚠ Data current as of April 2026. Exact unit strengths are classified.</span>
      </div>
    </div>
  )
}
