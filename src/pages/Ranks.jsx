import { useState } from 'react'
import { Award, Star } from 'lucide-react'
import { ranksData } from '../data/ranks'
import SectionHeader from '../components/common/SectionHeader'

const SERVICE_TABS = [
  { id: 'army',     label: 'Indian Army',      color: '#f97316' },
  { id: 'navy',     label: 'Indian Navy',      color: '#3b82f6' },
  { id: 'airforce', label: 'Indian Air Force', color: '#22d3ee' },
  { id: 'medals',   label: 'Medals & Awards',  color: '#f59e0b' },
]

function RankRow({ rank, color, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ borderBottom: '1px solid #1a2d4a', cursor: 'pointer', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = '#0d1525'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
        {/* Rank number */}
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color }}>{index + 1}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: '#f1f5f9' }}>{rank.rank}</span>
            {rank.abbreviation && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: `${color}18`, color, border: `1px solid ${color}44` }}>{rank.abbreviation}</span>
            )}
            {rank.natoCode && (
              <span style={{ fontSize: 11.5, color: '#64748b' }}>{rank.natoCode}</span>
            )}
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '2px 0 0', lineHeight: 1.4 }}>{rank.appointment}</p>
        </div>

        <span style={{ fontSize: 12, color }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={{ padding: '0 14px 14px 54px' }}>
          {rank.insignia && (
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Insignia: </span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{rank.insignia}</span>
            </div>
          )}
          {rank.salaryBand && (
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pay: </span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{rank.salaryBand}</span>
            </div>
          )}
          {rank.notes && (
            <div style={{ background: 'rgba(255,107,0,0.07)', border: '1px solid rgba(255,107,0,0.15)', borderRadius: 7, padding: '8px 10px' }}>
              <p style={{ fontSize: 12, color: '#fdba74', lineHeight: 1.55, margin: 0 }}>{rank.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RankSection({ title, ranks, color }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: 8, paddingLeft: 4 }}>{title}</div>
      <div style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 12, overflow: 'hidden' }}>
        {ranks.map((rank, i) => <RankRow key={rank.rank} rank={rank} color={color} index={i} />)}
      </div>
    </div>
  )
}

function MedalCard({ medal, level, color }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 12, overflow: 'hidden', marginBottom: 8, transition: 'border-color 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${color}55`}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1a2d4a'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Star size={14} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#f1f5f9' }}>{medal.name}</div>
          <div style={{ fontSize: 12.5, color: '#94a3b8' }}>Level {medal.level} — {medal.category}</div>
        </div>
        <span style={{ fontSize: 12, color }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding: '0 14px 14px', borderTop: '1px solid #1a2d4a', background: '#080e1b' }}>
          <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, margin: '12px 0 10px' }}>{medal.description}</p>
          {medal.colour && (
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}><strong style={{ color: '#94a3b8' }}>Appearance:</strong> {medal.colour}</div>
          )}
          {medal.statistics && (
            <div style={{ background: '#0a0f1e', borderRadius: 7, padding: '8px 10px', marginBottom: 10 }}>
              <div style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.5 }}>{medal.statistics}</div>
            </div>
          )}
          {medal.famousRecipients?.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Notable Recipients</div>
              {medal.famousRecipients.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>★</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Ranks() {
  const [tab, setTab] = useState('army')
  const current = SERVICE_TABS.find(t => t.id === tab)
  const color = current.color

  const serviceData = ranksData[tab]

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader
        title="Ranks, Insignia & Medals"
        subtitle="Complete rank structures of Indian Army, Navy & IAF — with insignia, appointments, and gallantry awards"
        icon={Award}
        accent="#f59e0b"
      />

      {/* Service tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
        {SERVICE_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 20px', borderRadius: 10, border: '1px solid',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
              background: tab === t.id ? t.color : '#0f1b2e',
              color: tab === t.id ? (t.id === 'airforce' ? '#0a0f1e' : '#fff') : '#94a3b8',
              borderColor: tab === t.id ? t.color : '#1a2d4a',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'medals' ? (
        <div style={{ maxWidth: 800 }}>
          {/* Wartime medals */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 3, height: 20, background: '#ef4444', borderRadius: 2 }} />
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Wartime Gallantry Awards</h2>
            </div>
            {ranksData.medals.wartime.map(m => <MedalCard key={m.name} medal={m} color="#ef4444" />)}
          </div>

          {/* Peacetime medals */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 3, height: 20, background: '#22c55e', borderRadius: 2 }} />
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Peacetime Gallantry Awards</h2>
            </div>
            {ranksData.medals.peacetime.map(m => <MedalCard key={m.name} medal={m} color="#22c55e" />)}
          </div>

          {/* Service medals */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 3, height: 20, background: '#f59e0b', borderRadius: 2 }} />
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Distinguished Service Awards</h2>
            </div>
            {ranksData.medals.service.map(m => (
              <div key={m.name} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 10, padding: '12px 14px', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 12.5, color: '#94a3b8', marginBottom: 4 }}>{m.category}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{m.description}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Commissioned Officers */}
          {serviceData?.commissionedOfficers && (
            <RankSection
              title="Commissioned Officers (Gazetted)"
              ranks={serviceData.commissionedOfficers}
              color={color}
            />
          )}

          {/* JCOs (Army only) */}
          {serviceData?.jcoRanks && (
            <RankSection
              title="Junior Commissioned Officers (JCOs)"
              ranks={serviceData.jcoRanks}
              color={color}
            />
          )}

          {/* NCOs & Soldiers */}
          {serviceData?.otherRanks && (
            <RankSection
              title="Non-Commissioned Officers & Soldiers"
              ranks={serviceData.otherRanks}
              color={color}
            />
          )}

          {/* Enlisted (Navy) */}
          {serviceData?.enlistedBranches && (
            <RankSection
              title="Sailors (Other Ranks)"
              ranks={serviceData.enlistedBranches}
              color={color}
            />
          )}

          {/* Airmen (IAF) */}
          {serviceData?.airmen && (
            <RankSection
              title="Airmen (Other Ranks)"
              ranks={serviceData.airmen}
              color={color}
            />
          )}

          {/* SSB note */}
          <div style={{ background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 12, padding: '14px 16px', marginTop: 8 }}>
            <div style={{ fontSize: 11, color: '#FF6B00', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>SSB Interview Tip</div>
            <p style={{ fontSize: 12.5, color: '#fdba74', lineHeight: 1.6, margin: 0 }}>
              {tab === 'army' && 'Know the rank above and below yours well. PI often asks: "What are the duties of a Platoon Commander?" (Lieutenant). Know JCOs — they are the backbone of the regiment. Subedar Major\'s role is a common PI topic.'}
              {tab === 'navy' && 'Know that in Navy, "Captain" commands a ship — very different from Army Captain. Flag Officers (Rear Admiral+) = Flag rank = post-commission objective. Know the difference between naval officer specialisations (Executive, Engineering, Electrical, Logistics).'}
              {tab === 'airforce' && 'Know that Squadron Leader commands a flight, Wing Commander commands a squadron. The path NDA → Flying Training → Pilot Officer → Flying Officer → Flt Lt → Sqn Ldr is the standard career. WC Abhinandan = Group Captain (promoted post-Balakot).'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
