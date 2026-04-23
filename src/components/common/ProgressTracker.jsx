import { useState } from 'react'
import { CheckSquare, Square, X, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'

const PT_KEY = 'babayaga_progress'

const TOPICS = [
  { id: 'w-army',    label: 'Army Equipment',         group: 'Weapons & Equipment' },
  { id: 'w-navy',    label: 'Navy Equipment',          group: 'Weapons & Equipment' },
  { id: 'w-iaf',     label: 'Air Force Equipment',     group: 'Weapons & Equipment' },
  { id: 'u-army',    label: 'Army Regiments',          group: 'Units & Honours' },
  { id: 'u-navy',    label: 'Navy Commands & Units',   group: 'Units & Honours' },
  { id: 'u-iaf',     label: 'IAF Squadrons',           group: 'Units & Honours' },
  { id: 'geo-lac',   label: 'India–China (LAC)',       group: 'Geopolitics' },
  { id: 'geo-loc',   label: 'India–Pakistan (LoC)',    group: 'Geopolitics' },
  { id: 'geo-quad',  label: 'Quad & Alliances',        group: 'Geopolitics' },
  { id: 'ops-wars',  label: '1947–1971 Wars',          group: 'Operations' },
  { id: 'ops-kargil',label: 'Kargil 1999',             group: 'Operations' },
  { id: 'ops-mod',   label: 'Modern Operations',       group: 'Operations' },
  { id: 'r-army',    label: 'Army Ranks',              group: 'Ranks & Medals' },
  { id: 'r-navy',    label: 'Navy Ranks',              group: 'Ranks & Medals' },
  { id: 'r-iaf',     label: 'IAF Ranks',               group: 'Ranks & Medals' },
  { id: 'r-medals',  label: 'Gallantry Awards',        group: 'Ranks & Medals' },
  { id: 'orgs',      label: 'Defence Organisations',   group: 'Other' },
  { id: 'forces',    label: 'Know Your Forces',        group: 'Other' },
  { id: 'map',       label: 'India Map',               group: 'Other' },
  { id: 'wat',       label: 'WAT Practice',            group: 'Other' },
]

const GROUPS = [...new Set(TOPICS.map(t => t.group))]

function load() {
  try { return JSON.parse(localStorage.getItem(PT_KEY)) || {} } catch { return {} }
}

export default function ProgressTracker() {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(load)
  const [collapsed, setCollapsed] = useState({})

  const toggle = (id) => {
    const next = { ...checked, [id]: !checked[id] }
    localStorage.setItem(PT_KEY, JSON.stringify(next))
    setChecked(next)
  }

  const toggleGroup = (g) => setCollapsed(prev => ({ ...prev, [g]: !prev[g] }))

  const done = TOPICS.filter(t => checked[t.id]).length
  const pct = Math.round((done / TOPICS.length) * 100)

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        title="Study Progress"
        className="progress-tracker-fab"
        style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 999,
          width: 52, height: 52, borderRadius: '50%',
          background: open ? '#22c55e' : '#0f1b2e',
          border: `2px solid ${open ? '#22c55e' : '#1a2d4a'}`,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          transition: 'all 0.2s',
        }}
      >
        <TrendingUp size={20} color={open ? '#fff' : '#22c55e'} />
        {/* Progress ring indicator */}
        {!open && done > 0 && (
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 18, height: 18, borderRadius: '50%',
            background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 800, color: '#fff',
          }}>
            {pct}
          </div>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="progress-tracker-panel" style={{
          position: 'fixed', bottom: 86, left: 24, zIndex: 998,
          width: 300, maxHeight: '70vh', maxWidth: 'calc(100vw - 32px)',
          background: '#070c1a', border: '1px solid #1a2d4a',
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px', borderBottom: '1px solid #1a2d4a',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>Study Progress</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{done} / {TOPICS.length} topics covered</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex' }}>
              <X size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ padding: '10px 16px 0', flexShrink: 0 }}>
            <div style={{ height: 6, background: '#1a2d4a', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                width: `${pct}%`,
                background: pct === 100 ? '#22c55e' : pct > 50 ? '#f59e0b' : '#FF6B00',
                transition: 'width 0.3s ease',
              }} />
            </div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 4, textAlign: 'right' }}>{pct}% complete</div>
          </div>

          {/* Topics list */}
          <div style={{ overflowY: 'auto', flex: 1, padding: '8px 0 12px' }}>
            {GROUPS.map(group => {
              const items = TOPICS.filter(t => t.group === group)
              const groupDone = items.filter(t => checked[t.id]).length
              const isCollapsed = collapsed[group]
              return (
                <div key={group} style={{ marginBottom: 4 }}>
                  <button
                    onClick={() => toggleGroup(group)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '6px 16px', background: 'none', border: 'none', cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      {group}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, color: groupDone === items.length ? '#22c55e' : '#475569' }}>
                        {groupDone}/{items.length}
                      </span>
                      {isCollapsed ? <ChevronDown size={12} color="#475569" /> : <ChevronUp size={12} color="#475569" />}
                    </div>
                  </button>

                  {!isCollapsed && items.map(t => (
                    <button
                      key={t.id}
                      onClick={() => toggle(t.id)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                        padding: '7px 16px', background: 'none', border: 'none', cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {checked[t.id]
                        ? <CheckSquare size={15} color="#22c55e" style={{ flexShrink: 0 }} />
                        : <Square size={15} color="#334155" style={{ flexShrink: 0 }} />
                      }
                      <span style={{
                        fontSize: 12.5, color: checked[t.id] ? '#64748b' : '#cbd5e1',
                        textDecoration: checked[t.id] ? 'line-through' : 'none',
                        transition: 'color 0.15s',
                      }}>
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              )
            })}
          </div>

          {/* Reset */}
          <div style={{ borderTop: '1px solid #1a2d4a', padding: '10px 16px', flexShrink: 0 }}>
            <button
              onClick={() => { localStorage.removeItem(PT_KEY); setChecked({}) }}
              style={{ fontSize: 11, color: '#475569', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset all progress
            </button>
          </div>
        </div>
      )}
    </>
  )
}
