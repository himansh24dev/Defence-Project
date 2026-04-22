import { useState, useMemo } from 'react'
import { Shield, Anchor, Wind, Star, ChevronDown, ChevronUp, Search, Bookmark, Share2 } from 'lucide-react'

const BM_KEY = 'babayaga_bookmarks'
function isSaved(id) {
  try { return (JSON.parse(localStorage.getItem(BM_KEY)) || []).some(b => b.id === id) } catch { return false }
}
function toggleBM(item) {
  try {
    const list = JSON.parse(localStorage.getItem(BM_KEY)) || []
    const next = list.some(b => b.id === item.id) ? list.filter(b => b.id !== item.id) : [...list, item]
    localStorage.setItem(BM_KEY, JSON.stringify(next))
    return !list.some(b => b.id === item.id)
  } catch { return false }
}
import { armyUnits } from '../data/regiments'
import { navyUnits } from '../data/navyUnits'
import { iafUnits } from '../data/iafUnits'
import SectionHeader from '../components/common/SectionHeader'

const TABS = [
  { id: 'army',     label: 'Indian Army',      icon: Shield, color: '#f97316', data: armyUnits },
  { id: 'navy',     label: 'Indian Navy',      icon: Anchor, color: '#3b82f6', data: navyUnits },
  { id: 'airforce', label: 'Indian Air Force', icon: Wind,   color: '#22d3ee', data: iafUnits },
]

const CAT_COLOR = {
  Infantry: '#f97316', Armoured: '#f59e0b', 'Special Forces': '#ef4444',
  Corps: '#22d3ee', Command: '#3b82f6', Fleet: '#60a5fa',
  'Naval Aviation': '#a78bfa', Submarine: '#34d399', Squadron: '#22d3ee',
  'Attack Helicopter': '#f87171', 'Special Operations': '#fb923c',
  'Transport/Special Mission': '#94a3b8', 'Counter-Terrorism': '#a855f7',
  'Air Defence': '#facc15',
}

// ─── Action buttons (bookmark + share) ───────────────────────────────────────
function UnitActions({ unit, color }) {
  const [bookmarked, setBookmarked] = useState(() => isSaved(unit.id))
  const [copied, setCopied] = useState(false)

  const handleBookmark = (e) => {
    e.stopPropagation()
    const next = toggleBM({ id: unit.id, name: unit.name, category: unit.category, service: unit.service, type: 'unit' })
    setBookmarked(next)
  }

  const handleShare = async (e) => {
    e.stopPropagation()
    const text = `${unit.name} — ${unit.category} | BABA YAGA Defence Hub`
    if (navigator.share) {
      try { await navigator.share({ title: unit.name, text, url: window.location.href }) } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
      <button onClick={handleShare} title={copied ? 'Copied!' : 'Share'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex' }}>
        <Share2 size={14} color={copied ? '#4ade80' : '#475569'} />
      </button>
      <button onClick={handleBookmark} title={bookmarked ? 'Remove bookmark' : 'Bookmark'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex' }}>
        <Bookmark size={14} fill={bookmarked ? '#f59e0b' : 'none'} color={bookmarked ? '#f59e0b' : '#475569'} />
      </button>
    </div>
  )
}

// ─── Unit Card ────────────────────────────────────────────────────────────────
function UnitCard({ unit, accentColor }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLOR[unit.category] || accentColor

  return (
    <div
      style={{
        background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14,
        overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}55`
        e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#1a2d4a'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ padding: 16 }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                background: `${color}18`, color, border: `1px solid ${color}44`,
                textTransform: 'uppercase', letterSpacing: '0.4px',
              }}>
                {unit.category}
              </span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{unit.service}</span>
            </div>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>{unit.name}</h3>
          </div>
          <UnitActions unit={unit} color={color} />
        </div>

        {/* Motto */}
        {unit.motto && (
          <p style={{ fontSize: 12.5, color: '#94a3b8', fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.4 }}>
            &ldquo;{unit.motto}&rdquo;
          </p>
        )}

        {/* Quick info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
          {[
            ['Raised', unit.raised],
            ['HQ', unit.headquarters],
            unit.areaOfOperations ? ['Area of Ops', unit.areaOfOperations] : null,
            unit.aircraftType ? ['Aircraft', unit.aircraftType] : null,
            unit.homeStation ? ['Home Station', unit.homeStation] : null,
            unit.composition ? ['Composition', unit.composition] : null,
            unit.recruits_from ? ['Recruits From', unit.recruits_from] : null,
          ].filter(Boolean).slice(0, 4).map(([k, v]) => v ? (
            <div key={k} style={{
              background: '#0a0f1e', borderRadius: 7, padding: '6px 10px',
              gridColumn: (k === 'Composition' || k === 'Area of Ops') ? '1 / -1' : undefined,
            }}>
              <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{k}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.3 }}>{v}</div>
            </div>
          ) : null)}
        </div>

        {/* Battle honours preview */}
        {unit.battleHonours?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
            {unit.battleHonours.slice(0, 3).map(h => (
              <span key={h} style={{
                fontSize: 11, padding: '2px 7px', borderRadius: 99,
                background: `${color}12`, color, border: `1px solid ${color}30`,
              }}>{h}</span>
            ))}
            {unit.battleHonours.length > 3 && (
              <span style={{ fontSize: 11, color: '#94a3b8' }}>+{unit.battleHonours.length - 3} more</span>
            )}
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
          {unit.famousActions?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Famous Battles & Operations</div>
              {unit.famousActions.map((a, i) => (
                <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `2px solid ${color}` }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{a.battle}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55 }}>{a.detail}</div>
                </div>
              ))}
            </div>
          )}

          {unit.battleHonours?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>All Battle Honours</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {unit.battleHonours.map(h => (
                  <span key={h} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 99, background: `${color}12`, color, border: `1px solid ${color}30` }}>{h}</span>
                ))}
              </div>
            </div>
          )}

          {unit.famousSoldiers?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>Notable Personnel</div>
              {unit.famousSoldiers.map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4, paddingLeft: 10, borderLeft: '2px solid #1a2d4a' }}>{s}</div>
              ))}
            </div>
          )}

          {unit.significance && (
            <div style={{ background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 5 }}>SSB Significance</div>
              <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{unit.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Regiments() {
  const [tab, setTab]       = useState('army')
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const current = TABS.find(t => t.id === tab)

  const categories = useMemo(
    () => ['All', ...new Set(current.data.map(u => u.category))],
    [tab, current.data]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return current.data.filter(u => {
      const matchSearch = !q
        || u.name.toLowerCase().includes(q)
        || u.motto?.toLowerCase().includes(q)
        || u.significance?.toLowerCase().includes(q)
        || u.battleHonours?.some(b => b.toLowerCase().includes(q))
        || u.famousActions?.some(a => a.battle.toLowerCase().includes(q) || a.detail.toLowerCase().includes(q))
      const matchCat = cat === 'All' || u.category === cat
      return matchSearch && matchCat
    })
  }, [tab, search, cat, current.data])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Units & Battle Honours"
        subtitle="Indian Army Regiments · Indian Navy Commands & Squadrons · Indian Air Force Wings — history, famous operations, gallantry awards"
        icon={Shield}
        accent="#f97316"
        lastUpdated="April 2026"
      />

      {/* Service tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        {TABS.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setCat('All'); setSearch('') }}
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

      {/* Filters row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${current.label} units, battles, honours…`}
            style={{
              width: '100%', background: '#0f1b2e', border: '1px solid #1a2d4a',
              borderRadius: 9, padding: '9px 12px 9px 30px',
              color: '#f1f5f9', fontSize: 13, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '8px 13px', borderRadius: 8, border: '1px solid',
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                background: cat === c ? current.color : '#0f1b2e',
                color: cat === c ? '#fff' : '#94a3b8',
                borderColor: cat === c ? current.color : '#1a2d4a',
              }}
            >
              {c === 'All' ? `All (${current.data.length})` : c}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
        Showing {filtered.length} of {current.data.length} units
        {search && ` · matching "${search}"`}
      </p>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
          {filtered.map(u => <UnitCard key={u.id} unit={u} accentColor={current.color} />)}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 16px' }}>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>No units match your filters</p>
          <button
            onClick={() => { setSearch(''); setCat('All') }}
            style={{ marginTop: 10, color: '#FF6B00', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
