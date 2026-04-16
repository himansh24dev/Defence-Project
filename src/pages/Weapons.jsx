import { useState, useMemo } from 'react'
import { Crosshair, Anchor, Wind, Search, Filter } from 'lucide-react'
import { armyEquipment } from '../data/armyEquipment'
import { navyEquipment } from '../data/navyEquipment'
import { airforceEquipment } from '../data/airforceEquipment'
import WeaponCard from '../components/weapons/WeaponCard'
import SectionHeader from '../components/common/SectionHeader'

const TABS = [
  { id: 'army',     label: 'Indian Army',     icon: Crosshair, color: '#FF6B00', data: armyEquipment },
  { id: 'navy',     label: 'Indian Navy',     icon: Anchor,    color: '#3b82f6', data: navyEquipment },
  { id: 'airforce', label: 'Indian Air Force', icon: Wind,     color: '#06b6d4', data: airforceEquipment },
]

const ALL_TYPES = {
  army:     [...new Set(armyEquipment.map(e => e.type.split('(')[0].trim()))],
  navy:     [...new Set(navyEquipment.map(e => e.type.split('(')[0].trim()))],
  airforce: [...new Set(airforceEquipment.map(e => e.type.split('(')[0].trim()))],
}

const ORIGIN_FILTERS = ['All', 'Indigenous', 'Imported', 'Licensed']

const stats = {
  army: {
    'Personnel': '~1.46 million (active)',
    'Tanks': '~4,000+',
    'Artillery Pieces': '~9,700+',
    'Attack Helicopters': '~80+',
    'Theatre Commands': 'Western, Northern, Southern, Eastern, Central',
  },
  navy: {
    'Personnel': '~67,000 (active)',
    'Major Warships': '~130+',
    'Submarines': '~16',
    'Aircraft Carriers': '2',
    'Aircraft': '~230+',
  },
  airforce: {
    'Personnel': '~140,000',
    'Combat Aircraft': '~600+',
    'Transport Aircraft': '~200+',
    'Helicopters': '~400+',
    'AEW&C Aircraft': '5',
  },
}

export default function Weapons() {
  const [activeTab, setActiveTab] = useState('army')
  const [search, setSearch] = useState('')
  const [originFilter, setOriginFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const current = TABS.find(t => t.id === activeTab)
  const currentStats = stats[activeTab]

  const filtered = useMemo(() => {
    return current.data.filter(item => {
      const q = search.toLowerCase()
      const matchSearch = !q || item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
      const matchOrigin = originFilter === 'All' ||
        (originFilter === 'Indigenous' && item.tags?.includes('indigenous')) ||
        (originFilter === 'Imported' && item.tags?.includes('imported')) ||
        (originFilter === 'Licensed' && item.tags?.includes('licensed'))
      const matchType = typeFilter === 'All' || item.type.startsWith(typeFilter)
      return matchSearch && matchOrigin && matchType
    })
  }, [activeTab, search, originFilter, typeFilter, current.data])

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="Weapons & Equipment"
        subtitle="Complete inventory of Indian Armed Forces — Army, Navy & Air Force"
        icon={Crosshair}
        accent="#FF6B00"
      />

      {/* Service Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {TABS.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setTypeFilter('All'); setSearch('') }}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all border ${
                isActive
                  ? 'text-white border-transparent shadow-lg'
                  : 'bg-[#0f172a] text-[#64748b] border-[#1e2d4a] hover:text-white hover:border-[#2d4a7a]'
              }`}
              style={isActive ? { backgroundColor: tab.color, borderColor: tab.color } : {}}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {Object.entries(currentStats).map(([key, val]) => (
          <div key={key} className="bg-[#0f172a] border border-[#1e2d4a] rounded-xl p-3">
            <p className="text-[#475569] text-[9px] uppercase tracking-wider">{key}</p>
            <p className="text-white text-xs font-semibold mt-0.5 leading-snug">{val}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${current.label} equipment...`}
            className="w-full bg-[#0f172a] border border-[#1e2d4a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus:border-[#FF6B00]/60"
          />
        </div>
        <div className="flex gap-2">
          {ORIGIN_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setOriginFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                originFilter === f
                  ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                  : 'bg-[#0f172a] text-[#64748b] border-[#1e2d4a] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Type pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setTypeFilter('All')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
            typeFilter === 'All'
              ? 'border-[#FF6B00]/60 text-[#FF6B00] bg-[#FF6B00]/10'
              : 'border-[#1e2d4a] text-[#475569] bg-[#0f172a] hover:text-white'
          }`}
        >
          All Types ({current.data.length})
        </button>
        {ALL_TYPES[activeTab].map(type => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
              typeFilter === type
                ? 'border-[#FF6B00]/60 text-[#FF6B00] bg-[#FF6B00]/10'
                : 'border-[#1e2d4a] text-[#475569] bg-[#0f172a] hover:text-white'
            }`}
          >
            {type.replace(' (Indigenous)', '').replace(' (Enhanced)', '')}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-[#475569] text-xs mb-4">
        Showing {filtered.length} of {current.data.length} platforms
        {search && ` for "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <WeaponCard key={item.id} weapon={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-[#475569] text-lg">No equipment matches your filters</p>
          <button
            onClick={() => { setSearch(''); setOriginFilter('All'); setTypeFilter('All') }}
            className="mt-3 text-[#FF6B00] text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
