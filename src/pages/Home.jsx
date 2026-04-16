import { Link } from 'react-router-dom'
import { Flag, Globe, Shield, ShoppingBag, Cpu, Map, Rocket, BookOpen, Crosshair, TrendingUp, Clock } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsCard from '../components/news/NewsCard'

const sections = [
  { title: 'National',         path: '/national',       icon: Flag,        color: '#FF6B00', desc: 'India\'s domestic affairs, governance & economy' },
  { title: 'International',    path: '/international',   icon: Globe,       color: '#3b82f6', desc: 'Global diplomacy, conflicts & bilateral ties' },
  { title: 'Defence',          path: '/defence',         icon: Shield,      color: '#ef4444', desc: 'Armed forces operations, exercises & strategy' },
  { title: 'Procurement',      path: '/procurement',     icon: ShoppingBag, color: '#8b5cf6', desc: 'Arms deals, MoD contracts & acquisitions' },
  { title: 'Indigenization',   path: '/indigenization',  icon: Cpu,         color: '#10b981', desc: 'Make in India — DRDO, HAL, Atmanirbhar Bharat' },
  { title: 'Geopolitics',      path: '/geopolitics',     icon: Map,         color: '#f59e0b', desc: 'Strategic competition, alliances & flashpoints' },
  { title: 'Sci & Tech',       path: '/science-tech',    icon: Rocket,      color: '#06b6d4', desc: 'DRDO, ISRO, space, AI & nuclear programs' },
  { title: 'Schemes',          path: '/schemes',          icon: BookOpen,    color: '#a855f7', desc: 'Key government policies & programmes' },
  { title: 'Weapons & Equip.', path: '/weapons',          icon: Crosshair,   color: '#FF6B00', desc: 'Complete military inventory — Army, Navy, IAF' },
]

const quickFacts = [
  { label: 'Active Military Personnel', value: '~1.45 million', sub: '4th largest active force' },
  { label: 'Defence Budget 2025–26',    value: '₹6.81 lakh crore', sub: '2.08% of GDP' },
  { label: 'Nuclear Warheads (est.)',   value: '~175', sub: 'SIPRI 2025 estimate' },
  { label: 'Aircraft Carriers',         value: '2', sub: 'INS Vikrant + INS Vikramaditya' },
  { label: 'ICBM (Agni-V MIRV)',        value: '8,000 km', sub: 'Mission Divyastra — MIRV tested' },
  { label: 'Indigenization Target',     value: '75%', sub: 'Domestic procurement by 2047' },
]

function HomeNewsSection({ title, icon: Icon, color, path, category, query }) {
  const { data, isLoading, isError } = useNews(category, query)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: `${color}22` }}>
            <Icon size={16} style={{ color }} />
          </div>
          <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14 }}>{title}</span>
        </div>
        <Link
          to={path}
          style={{ fontSize: 11, color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}
          onMouseEnter={e => e.target.style.color = '#ff8c33'}
          onMouseLeave={e => e.target.style.color = '#FF6B00'}
        >
          See all →
        </Link>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ height: 72, borderRadius: 10, background: '#0f1b2e', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : isError ? (
        <div style={{ padding: '20px 16px', borderRadius: 10, border: '1px dashed #1a2d4a', textAlign: 'center' }}>
          <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>
            Add API keys &amp; run{' '}
            <code style={{ color: '#FF6B00', background: 'rgba(255,107,0,0.12)', padding: '2px 6px', borderRadius: 4 }}>vercel dev</code>
            {' '}to see live news
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(data || []).slice(0, 3).map((article, i) => (
            <NewsCard key={article.link || i} article={article} />
          ))}
          {(!data || data.length === 0) && (
            <p style={{ textAlign: 'center', padding: '28px 0', color: '#475569', fontSize: 13 }}>No articles found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>

      {/* ── Hero ── */}
      <div style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f1b2e 0%, #172640 50%, #0a0f1e 100%)',
        border: '1px solid #1a2d4a', padding: '40px 36px', marginBottom: 28,
      }}>
        {/* grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 30px,#fff 30px,#fff 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,#fff 30px,#fff 31px)',
        }} />
        {/* tricolor accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FF6B00 33.3%,#fff 33.3%,#fff 66.6%,#138808 66.6%)' }} />

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#22c55e', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Live Intelligence Feed</span>
          </div>

          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            Your Complete<br />
            <span style={{ color: '#FF6B00' }}>SSB Preparation</span> Hub
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 640, margin: '0 0 24px', lineHeight: 1.7 }}>
            Real-time national &amp; international current affairs, defence updates, weapons inventory, government schemes, and geopolitics — everything for SSB GTO, Interview, and GD rounds.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link
              to="/defence"
              style={{ padding: '10px 22px', background: '#FF6B00', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: '0 4px 20px rgba(255,107,0,0.35)' }}
            >
              Defence News →
            </Link>
            <Link
              to="/weapons"
              style={{ padding: '10px 22px', background: '#1a2d4a', color: '#f1f5f9', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none', border: '1px solid #253d60' }}
            >
              Weapons DB →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick facts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: 28 }}>
        {quickFacts.map(f => (
          <div key={f.label} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 12, padding: '12px 14px' }}>
            <p style={{ color: '#475569', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 4px', lineHeight: 1.4 }}>{f.label}</p>
            <p style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 15, margin: '0 0 2px' }}>{f.value}</p>
            <p style={{ color: '#475569', fontSize: 9, margin: 0 }}>{f.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Section nav ── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ color: '#475569', fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Browse by Section</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))', gap: 10 }}>
          {sections.map(s => {
            const Icon = s.icon
            return (
              <Link
                key={s.path}
                to={s.path}
                style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 12, padding: '14px 14px', textDecoration: 'none', display: 'block', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#253d60'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1a2d4a'}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${s.color}1a`, marginBottom: 10 }}>
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, margin: '0 0 4px' }}>{s.title}</p>
                <p style={{ color: '#475569', fontSize: 10, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Today's brief header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <TrendingUp size={20} style={{ color: '#FF6B00' }} />
        <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18 }}>Today's Intelligence Brief</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto', color: '#475569' }}>
          <Clock size={12} />
          <span style={{ fontSize: 11 }}>Auto-refreshes every 15 min</span>
        </div>
      </div>

      {/* ── News grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 28 }}>
        <HomeNewsSection title="National"        icon={Flag}    color="#FF6B00" path="/national"      category="national" query="india government" />
        <HomeNewsSection title="Defence"         icon={Shield}  color="#ef4444" path="/defence"       category="defence"  query="india military army defence" />
        <HomeNewsSection title="International"   icon={Globe}   color="#3b82f6" path="/international" category="world"    query="global geopolitics" />
        <HomeNewsSection title="Indigenization"  icon={Cpu}     color="#10b981" path="/indigenization" category="science" query="india DRDO HAL BEL make in india defence" />
        <HomeNewsSection title="Geopolitics"     icon={Map}     color="#f59e0b" path="/geopolitics"   category="politics" query="india china pakistan border security strategic" />
        <HomeNewsSection title="Science & Tech"  icon={Rocket}  color="#06b6d4" path="/science-tech"  category="science"  query="India ISRO technology space innovation" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
