import { useState, useMemo } from 'react'
import { Crosshair, Anchor, Wind, Search } from 'lucide-react'
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

  const current = TABS.find(t => t.id === tab)
  const types   = useMemo(() => ['All', ...new Set(current.data.map(e => e.type.split('(')[0].split('—')[0].trim()))], [tab, current.data])

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
        subtitle="Complete inventory of Indian Armed Forces — Army, Navy & Air Force | Updated April 2026"
        icon={Crosshair}
        accent="#f97316"
      />

      {/* Service tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        {TABS.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setType('All'); setSearch('') }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', borderRadius: 10, border: '1px solid',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
                background: active ? t.color : '#0f1b2e',
                color: active ? '#fff' : '#94a3b8',
                borderColor: active ? t.color : '#1a2d4a',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={15} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Service stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginBottom: 20 }}>
        {SERVICE_STATS[tab].map(([k, v]) => (
          <div key={k} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>{k}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
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
        {/* Origin filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ORIGIN_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setOrigin(f)}
              style={{
                padding: '8px 13px', borderRadius: 8, border: '1px solid',
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
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

      {/* Results count */}
      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
        Showing {filtered.length} of {current.data.length} platforms
        {search && ` · matching "${search}"`}
      </p>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
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
