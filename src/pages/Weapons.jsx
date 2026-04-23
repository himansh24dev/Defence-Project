import { useState, useMemo } from 'react'
import { Crosshair, Anchor, Wind, Search, SlidersHorizontal, X } from 'lucide-react'
import { armyEquipment } from '../data/armyEquipment'
import { navyEquipment } from '../data/navyEquipment'
import { airforceEquipment } from '../data/airforceEquipment'
import WeaponCard from '../components/weapons/WeaponCard'
import SectionHeader from '../components/common/SectionHeader'

const TABS = [
  { id: 'army',     label: 'Indian Army',      icon: Crosshair, color: '#f97316', data: armyEquipment },
  { id: 'navy',     label: 'Indian Navy',      icon: Anchor,    color: '#3b82f6', data: navyEquipment },
  { id: 'airforce', label: 'Indian Air Force', icon: Wind,      color: '#22d3ee', data: airforceEquipment },
]

const ORIGIN_FILTERS = ['All', 'Indigenous', 'Imported', 'Licensed']

const SERVICE_STATS = {
  army:     [['Active Personnel','~1.46 million'],['Main Battle Tanks','~4,000+'],['Artillery Pieces','~9,700+'],['Attack Helicopters','~80+'],['Regiments','~350+']],
  navy:     [['Active Personnel','~67,500'],['Total Warships','~130+'],['Submarines','~17'],['Aircraft Carriers','2'],['Naval Aircraft','~230+']],
  airforce: [['Active Personnel','~1,40,000'],['Combat Aircraft','~600+'],['Transport/LIFT','~200+'],['Helicopters','~400+'],['UAVs/Drones','~70+']],
}

export default function Weapons() {
  const [tab, setTab]         = useState('army')
  const [search, setSearch]   = useState('')
  const [origin, setOrigin]   = useState('All')
  const [typeFilter, setType] = useState('All')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const current = TABS.find(t => t.id === tab)
  const types   = useMemo(() => ['All', ...new Set(current.data.map(e => e.type.split('(')[0].split('—')[0].trim()))], [tab, current.data])

  const activeFilterCount = (origin !== 'All' ? 1 : 0) + (typeFilter !== 'All' ? 1 : 0)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return current.data.filter(item => {
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q)
      const matchOrigin = origin === 'All'
        || (origin === 'Indigenous' && item.tags?.includes('indigenous'))
        || (origin === 'Imported'   && item.tags?.includes('imported'))
        || (origin === 'Licensed'   && item.tags?.includes('licensed'))
      const matchType = typeFilter === 'All' || item.type.split('(')[0].split('—')[0].trim() === typeFilter
      return matchSearch && matchOrigin && matchType
    })
  }, [tab, search, origin, typeFilter, current.data])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Weapons & Equipment"
        subtitle="Complete inventory of Indian Armed Forces — Army, Navy & Air Force"
        icon={Crosshair}
        accent="#f97316"
        lastUpdated="April 2026"
      />

      {/* Service tabs */}
      <div className="service-tabs-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        {TABS.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              className="service-tab-btn"
              onClick={() => { setTab(t.id); setType('All'); setSearch('') }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 26px', borderRadius: 13,
                border: `2px solid ${active ? t.color : '#1a2d4a'}`,
                fontWeight: 700, fontSize: 15, cursor: 'pointer',
                background: active
                  ? `linear-gradient(135deg, ${t.color}cc, ${t.color}88)`
                  : 'linear-gradient(135deg, #0f1b2e, #0d1526)',
                color: active ? '#fff' : '#64748b',
                boxShadow: active
                  ? `0 4px 24px ${t.color}55, 0 0 0 1px ${t.color}44`
                  : '0 2px 8px rgba(0,0,0,0.3)',
                transform: active ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                letterSpacing: '0.2px',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = t.color + '66'; e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateY(0)' } }}
            >
              {/* Glow streak for active */}
              {active && (
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `linear-gradient(105deg, ${t.color}33 0%, transparent 60%)`,
                }} />
              )}
              <Icon size={18} style={{ flexShrink: 0 }} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Service stats */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginBottom: 20 }}>
        {SERVICE_STATS[tab].map(([k, v]) => (
          <div key={k} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '10px 12px' }}>
            <div className="stats-k" style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>{k}</div>
            <div className="stats-v" style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters toggle row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: filtersOpen ? 14 : 18 }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${current.label} equipment…`}
            style={{
              width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a',
              borderRadius: 9, padding: '9px 12px 9px 30px',
              color: '#f1f5f9', fontSize: 13, outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Filters toggle button */}
        <button
          onClick={() => setFiltersOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '9px 14px', borderRadius: 9,
            border: `1px solid ${filtersOpen || activeFilterCount ? '#FF6B00' : '#1a2d4a'}`,
            background: filtersOpen || activeFilterCount ? 'rgba(255,107,0,0.12)' : '#0f1b2e',
            color: filtersOpen || activeFilterCount ? '#fb923c' : '#cbd5e1',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'background 0.15s, border-color 0.15s, color 0.15s',
          }}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              minWidth: 18, height: 18, padding: '0 5px',
              borderRadius: 9, background: '#FF6B00', color: '#fff',
              fontSize: 11, fontWeight: 700,
            }}>
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={() => { setOrigin('All'); setType('All') }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '9px 12px', borderRadius: 9,
              border: '1px solid #1a2d4a', background: 'transparent',
              color: '#94a3b8', fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}
            title="Clear filters"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Collapsible filter panel */}
      {filtersOpen && (
        <div style={{
          background: '#0a0f1e', border: '1px solid #1a2d4a', borderRadius: 10,
          padding: '14px 16px', marginBottom: 18,
        }}>
          {/* Origin filter */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600, marginBottom: 7 }}>
              Origin
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ORIGIN_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setOrigin(f)}
                  style={{
                    padding: '7px 13px', borderRadius: 8, border: '1px solid',
                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    background: origin === f ? '#FF6B00' : '#0f1b2e',
                    color: origin === f ? '#fff' : '#94a3b8',
                    borderColor: origin === f ? '#FF6B00' : '#1a2d4a',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Type pills */}
          <div>
            <div style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600, marginBottom: 7 }}>
              Category
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    padding: '5px 11px', borderRadius: 99, fontSize: 11.5, fontWeight: 500,
                    cursor: 'pointer', border: '1px solid',
                    background: typeFilter === t ? 'rgba(249,115,22,0.12)' : 'transparent',
                    color: typeFilter === t ? '#fb923c' : '#94a3b8',
                    borderColor: typeFilter === t ? 'rgba(249,115,22,0.4)' : '#1a2d4a',
                  }}
                >
                  {t === 'All' ? `All (${current.data.length})` : t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
        Showing {filtered.length} of {current.data.length} platforms
        {search && ` · matching "${search}"`}
      </p>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div className="content-grid">
          {filtered.map(item => <WeaponCard key={item.id} weapon={item} />)}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 16px' }}>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>No equipment matches your filters</p>
          <button
            onClick={() => { setSearch(''); setOrigin('All'); setType('All') }}
            style={{ marginTop: 10, color: '#FF6B00', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
