import 'leaflet/dist/leaflet.css'
import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import {
  MAP_CATEGORIES,
  rivers, lakes, ranges, passes, capitals, airports, ports, dams,
  nuclear, thermal, parks, army_hq, naval, iaf, academies, space, strategic, battlefields,
} from '../data/mapData'
import SectionHeader from '../components/common/SectionHeader'

const FEATURE_MAP = {
  rivers, lakes, ranges, passes, capitals, airports, ports, dams,
  nuclear, thermal, parks, army_hq, naval, iaf, academies, space, strategic, battlefields,
}

const GROUPS = ['Geography', 'Administration', 'Transport', 'Energy', 'Nature', 'Defence', 'Strategic']

// ─── Popup card ───────────────────────────────────────────────────────────────
function FeaturePopup({ name, info, color }) {
  return (
    <div style={{ maxWidth: 260, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{
        fontWeight: 700, fontSize: 13, color: '#f1f5f9',
        borderBottom: `2px solid ${color}`, paddingBottom: 4, marginBottom: 6,
      }}>
        {name}
      </div>
      <div style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.6 }}>{info}</div>
    </div>
  )
}

// ─── Category toggle pill ──────────────────────────────────────────────────────
function CatToggle({ cat, active, onToggle, count }) {
  return (
    <button
      onClick={() => onToggle(cat.id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 10px', borderRadius: 7,
        background: active ? `${cat.color}22` : 'transparent',
        border: `1px solid ${active ? cat.color + '66' : '#1a2d4a'}`,
        cursor: 'pointer', width: '100%', textAlign: 'left',
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 12 }}>{cat.icon}</span>
      <span style={{ flex: 1, fontSize: 11.5, fontWeight: active ? 600 : 400, color: active ? '#f1f5f9' : '#64748b' }}>
        {cat.label}
      </span>
      <span style={{
        fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 10,
        background: active ? cat.color : '#1a2d4a', color: active ? '#fff' : '#475569',
      }}>
        {count}
      </span>
    </button>
  )
}

export default function IndiaMap() {
  const [active, setActive] = useState({ rivers: true, capitals: true })
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggle = (id) => setActive(prev => ({ ...prev, [id]: !prev[id] }))

  const selectAll = () => {
    const all = {}
    MAP_CATEGORIES.forEach(c => { all[c.id] = true })
    setActive(all)
  }
  const clearAll = () => setActive({})

  // Build rendered layers from active categories
  const layers = useMemo(() => {
    const lines = []
    const points = []
    MAP_CATEGORIES.forEach(cat => {
      if (!active[cat.id]) return
      const features = FEATURE_MAP[cat.id] || []
      if (cat.type === 'line') {
        features.forEach(f => lines.push({ ...f, color: cat.color, catLabel: cat.label }))
      } else {
        features.forEach(f => points.push({ ...f, color: cat.color, radius: cat.radius || 6, catLabel: cat.label }))
      }
    })
    return { lines, points }
  }, [active])

  const activeCount = Object.values(active).filter(Boolean).length
  const totalFeatures = MAP_CATEGORIES.reduce((s, c) => s + (FEATURE_MAP[c.id]?.length || 0), 0)

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 16px 48px' }}>
      <SectionHeader
        title="India Interactive Map"
        subtitle="Explore rivers, lakes, mountain passes, defence installations, power plants, national parks and more — toggle any layer to show on the map"
        icon="🗺️"
      />

      {/* Stats bar */}
      <div style={{
        display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap',
        fontSize: 11.5, color: '#64748b',
      }}>
        <span style={{ color: '#22d3ee' }}>
          <strong style={{ fontSize: 18, color: '#f1f5f9' }}>{activeCount}</strong> layers active
        </span>
        <span>·</span>
        <span>
          <strong style={{ color: '#f1f5f9' }}>
            {layers.lines.length + layers.points.length}
          </strong> features shown
        </span>
        <span>·</span>
        <span><strong style={{ color: '#f1f5f9' }}>{totalFeatures}</strong> total features across {MAP_CATEGORIES.length} layers</span>
        <span>·</span>
        <span style={{ color: '#94a3b8' }}>Click any marker/line for details</span>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

        {/* ── Sidebar ── */}
        <div style={{
          width: sidebarOpen ? 220 : 36,
          flexShrink: 0,
          background: '#070c1a',
          border: '1px solid #1a2d4a',
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'width 0.25s ease',
          position: 'relative',
          minHeight: 500,
        }}>
          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              position: 'absolute', top: 8, right: 6,
              background: '#0f1b2e', border: '1px solid #1a2d4a',
              borderRadius: 6, width: 22, height: 22, cursor: 'pointer',
              color: '#64748b', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
            }}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>

          {sidebarOpen && (
            <div style={{ padding: '10px 8px 16px', overflowY: 'auto', maxHeight: 'calc(100vh - 260px)' }}>
              {/* Header */}
              <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
                Map Layers
              </div>

              {/* Select / Clear all */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                <button onClick={selectAll} style={{ flex: 1, fontSize: 10, padding: '4px 0', borderRadius: 5, background: '#1a2d4a', border: '1px solid #253d60', color: '#94a3b8', cursor: 'pointer' }}>
                  All ON
                </button>
                <button onClick={clearAll} style={{ flex: 1, fontSize: 10, padding: '4px 0', borderRadius: 5, background: '#1a2d4a', border: '1px solid #253d60', color: '#94a3b8', cursor: 'pointer' }}>
                  Clear
                </button>
              </div>

              {/* Groups */}
              {GROUPS.map(group => {
                const cats = MAP_CATEGORIES.filter(c => c.group === group)
                return (
                  <div key={group} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4, paddingLeft: 2 }}>
                      {group}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {cats.map(cat => (
                        <CatToggle
                          key={cat.id}
                          cat={cat}
                          active={!!active[cat.id]}
                          onToggle={toggle}
                          count={FEATURE_MAP[cat.id]?.length || 0}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Legend */}
              <div style={{ marginTop: 8, padding: '8px', background: '#0f1b2e', borderRadius: 7, border: '1px solid #1a2d4a' }}>
                <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>Legend</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 16, height: 3, background: '#3b82f6', borderRadius: 2 }} /> River / Range line
                  </div>
                  <div style={{ fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', border: '2px solid #fff2' }} /> Point feature
                  </div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Click = details popup</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Hover = name tooltip</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Map ── */}
        <div style={{
          flex: 1, borderRadius: 12, overflow: 'hidden',
          border: '1px solid #1a2d4a', minHeight: 580,
          position: 'relative',
        }}>
          <MapContainer
            center={[20.59, 78.96]}
            zoom={5}
            minZoom={5}
            maxZoom={12}
            maxBounds={[[6.0, 67.0], [38.5, 98.5]]}
            maxBoundsViscosity={1.0}
            zoomSnap={0.25}
            zoomDelta={0.5}
            wheelPxPerZoomLevel={80}
            style={{ height: 'calc(100vh - 230px)', minHeight: 560, width: '100%' }}
            scrollWheelZoom
            zoomControl
          >
            {/* Dark tile layer — CartoDB Dark Matter */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={19}
            />

            {/* ── Polylines (rivers + mountain ranges) ── */}
            {layers.lines.map(feature => (
              <Polyline
                key={feature.id}
                positions={feature.path}
                pathOptions={{
                  color: feature.color,
                  weight: feature.catLabel === 'Rivers' ? 2.5 : 2,
                  opacity: 0.85,
                  dashArray: feature.catLabel === 'Mountain Ranges' ? '6 4' : null,
                }}
              >
                <Tooltip sticky>{feature.name}</Tooltip>
                <Popup>
                  <FeaturePopup name={feature.name} info={feature.info} color={feature.color} />
                </Popup>
              </Polyline>
            ))}

            {/* ── Circle markers (all point features) ── */}
            {layers.points.map(feature => (
              <CircleMarker
                key={`${feature.id}-${feature.catLabel}`}
                center={[feature.lat, feature.lng]}
                radius={feature.radius}
                pathOptions={{
                  fillColor: feature.color,
                  color: '#ffffff',
                  weight: 1.2,
                  opacity: 0.9,
                  fillOpacity: 0.85,
                }}
              >
                <Tooltip direction="top" offset={[0, -4]}>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>{feature.name}</span>
                  <br />
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>{feature.catLabel}</span>
                </Tooltip>
                <Popup>
                  <FeaturePopup name={feature.name} info={feature.info} color={feature.color} />
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Zoom hint overlay */}
          {layers.lines.length + layers.points.length === 0 && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', zIndex: 500,
            }}>
              <div style={{
                background: 'rgba(7,12,26,0.85)', border: '1px solid #1a2d4a',
                borderRadius: 12, padding: '16px 24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🗺️</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>No layers selected</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Toggle filters on the left to show features</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom reference note */}
      <div style={{
        marginTop: 12, padding: '10px 14px',
        background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 8,
        fontSize: 11, color: '#475569', display: 'flex', gap: 16, flexWrap: 'wrap',
      }}>
        <span style={{ color: '#334155', fontWeight: 600 }}>Data sources:</span>
        <span>Survey of India</span><span>·</span>
        <span>NPCIL (nuclear plants)</span><span>·</span>
        <span>AAI (airports)</span><span>·</span>
        <span>Ministry of Ports, Shipping & Waterways</span><span>·</span>
        <span>MoD / PIB (defence)</span><span>·</span>
        <span>ISRO (space centres)</span><span>·</span>
        <span>Ministry of Jal Shakti (rivers & dams)</span>
        <span style={{ color: '#f59e0b', marginLeft: 'auto' }}>⚠ Exact military unit deployments are classified — HQ locations only shown</span>
      </div>
    </div>
  )
}
