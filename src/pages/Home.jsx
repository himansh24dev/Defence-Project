import { Link } from 'react-router-dom'
import { Shield, Crosshair, Cpu, Map, MapPin, Rocket, Award, Brain, Users } from 'lucide-react'
import GenieIntro from '../components/common/GenieIntro'


const categories = [
  {
    icon: Crosshair, color: '#FF6B00', path: '/weapons',
    title: 'Weapons & Equipment',
    stat: '115+', statLabel: 'Platforms',
    desc: 'Complete Army, Navy & IAF inventory with full specs, indigenization status, and SSB significance.',
    span: 2,
  },
  {
    icon: Shield, color: '#f97316', path: '/regiments',
    title: 'Units & Battle Honours',
    stat: '35+', statLabel: 'Units',
    desc: 'Army Regiments, Navy Commands, IAF Squadrons — famous battles, gallantry awards, SSB significance.',
    span: 1,
  },
  {
    icon: Map, color: '#22d3ee', path: '/geopolitics',
    title: 'Geopolitics',
    stat: '12+', statLabel: 'Flashpoints',
    desc: 'LAC, LoC, Quad, SCO, BRICS — India\'s full strategic landscape explained.',
    span: 1,
  },
  {
    icon: Cpu, color: '#a78bfa', path: '/orgs',
    title: 'Defence Organisations',
    stat: '14+', statLabel: 'Organisations',
    desc: 'DRDO, ISRO, HAL, BEL, MDL — who builds and commands India\'s defence.',
    span: 1,
  },
  {
    icon: Rocket, color: '#ef4444', path: '/operations',
    title: 'Operations & Exercises',
    stat: '18+', statLabel: 'Operations',
    desc: '1947 to Galwan 2020 — every war, operation & bilateral exercise with key battles.',
    span: 2,
  },
  {
    icon: Award, color: '#f59e0b', path: '/ranks',
    title: 'Ranks & Medals',
    stat: '60+', statLabel: 'Ranks',
    desc: 'Complete rank structures of Army, Navy & IAF with insignia, pay bands, and gallantry awards.',
    span: 1,
  },
  {
    icon: Brain, color: '#06b6d4', path: '/practice',
    title: 'Practice (WAT / PPDT)',
    stat: '200+', statLabel: 'Words',
    desc: 'Sharpen your WAT with curated word lists and timed practice sets for SSB prep.',
    span: 1,
  },
  {
    icon: Users, color: '#84cc16', path: '/forces',
    title: 'Know Your Forces',
    stat: '3', statLabel: 'Services',
    desc: 'Full org-chart hierarchy of Army, Navy & IAF — commands, corps, fleets, and squadrons.',
    span: 1,
  },
  {
    icon: MapPin, color: '#f43f5e', path: '/map',
    title: 'India Interactive Map',
    stat: '200+', statLabel: 'Locations',
    desc: 'Rivers, mountain passes, defence bases, nuclear plants, battlefields — toggle any layer.',
    span: 1,
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>

      {/* Disclaimer notice */}
      <div style={{
        marginBottom: 20, padding: '10px 16px',
        background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>⚠️</span>
        <p style={{ margin: 0, fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6 }}>
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>Accuracy Notice: </span>
          The developer has made every effort to provide authentic and up-to-date information. However, if you spot any incorrect facts, outdated data, or missing details, please use the{' '}
          <span style={{ color: '#a78bfa', fontWeight: 600 }}>Feedback / Suggestion form</span> given below — your input directly helps us improve.
          {' '}<span style={{ color: '#64748b' }}>This website is in its initial phases and new information is being added regularly — stay tuned for updates.</span>
        </p>
      </div>

      <GenieIntro />

      {/* ── Hero ── */}
      <div className="animate-fade-up hero-box" style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d1929 0%, #0f1f38 40%, #0a0f1e 100%)',
        border: '1px solid #1a2d4a', marginBottom: 28,
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}>
        <div className="hero-orb" style={{ width: 300, height: 300, background: 'rgba(255,107,0,0.07)', top: -80, right: -60, animationDelay: '0s' }} />
        <div className="hero-orb" style={{ width: 200, height: 200, background: 'rgba(59,130,246,0.06)', bottom: -60, left: 80, animationDelay: '3s' }} />
        <div className="hero-orb" style={{ width: 150, height: 150, background: 'rgba(19,136,8,0.05)', top: 20, left: '40%', animationDelay: '1.5s' }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 30px,#fff 30px,#fff 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,#fff 30px,#fff 31px)',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FF6B00 33.3%,#fff 33.3%,#fff 66.6%,#138808 66.6%)', opacity: 0.9 }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 40 }} className="hero-inner">
          {/* Left: headline + CTAs */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, animationDelay: '0.1s' }}>
              <span className="live-ping" style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              <span style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Defence Intelligence Hub</span>
            </div>

            <h1 className="animate-fade-up" style={{ color: '#f1f5f9', fontSize: 'clamp(26px, 4vw, 52px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.5px', animationDelay: '0.15s' }}>
              Your Complete<br />
              <span style={{ color: '#FF6B00', textShadow: '0 0 40px rgba(255,107,0,0.4)' }}>SSB Preparation</span><br />Hub
            </h1>
            <p className="animate-fade-up" style={{ color: '#cbd5e1', fontSize: 15, maxWidth: 440, margin: '0 0 28px', lineHeight: 1.8, animationDelay: '0.22s' }}>
              Complete Indian defence equipment database, weapons inventory, geopolitics, operations — and an AI assistant for all your SSB prep needs.
            </p>
            <div className="animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, animationDelay: '0.3s' }}>
              <Link
                to="/weapons"
                style={{ padding: '11px 24px', background: '#FF6B00', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: '0 4px 24px rgba(255,107,0,0.4)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,107,0,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,107,0,0.4)' }}
              >
                Weapons Database →
              </Link>
              <button
                onClick={() => document.querySelector('.chat-fab-pulse, [title="Ask BABA YAGA AI"]')?.click()}
                style={{ padding: '11px 24px', background: 'rgba(26,45,74,0.8)', color: '#f1f5f9', borderRadius: 10, fontWeight: 700, fontSize: 13, border: '1px solid #253d60', transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = '#3a5a8a' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#253d60' }}
              >
                Ask AI Assistant →
              </button>
              <Link
                to="/practice"
                style={{ padding: '11px 24px', background: 'rgba(26,45,74,0.8)', color: '#f1f5f9', borderRadius: 10, fontWeight: 700, fontSize: 13, border: '1px solid #253d60', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = '#3a5a8a' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#253d60' }}
              >
                <Brain size={14} /> Practice WAT →
              </Link>
            </div>
          </div>

          {/* Right: stats dashboard */}
          <div className="hero-stats-panel animate-fade-in" style={{ flex: '1 1 0', minWidth: 0, animationDelay: '0.35s' }}>
            {/* Top status bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '9px 14px', background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.15)', borderRadius: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Force Status</span>
              <div style={{ display: 'flex', gap: 14 }}>
                {['Army', 'Navy', 'IAF'].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                    <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2×2 stat grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              {[
                { label: 'Active Personnel', value: '1.45M', sub: '2nd largest', color: '#FF6B00' },
                { label: 'Defence Budget', value: '₹7.52L Cr', sub: 'FY 2026–27', color: '#22d3ee' },
                { label: 'Nuclear Warheads', value: '~180', sub: 'SIPRI 2025', color: '#a78bfa' },
                { label: 'Agni-V Range', value: '7,000km+', sub: 'MIRV capable', color: '#4ade80' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(15,27,46,0.9)', border: `1px solid ${s.color}30`, borderRadius: 12, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                  <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6, fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, lineHeight: 1, letterSpacing: '-0.5px', textShadow: `0 0 20px ${s.color}55` }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 5, fontWeight: 500 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Bottom wide stat */}
            <div style={{ background: 'rgba(15,27,46,0.9)', border: '1px solid #1e3352', borderRadius: 12, padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 5, fontWeight: 600 }}>Indigenization Target</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#e2e8f0' }}>75% domestic procurement by 2047</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#f59e0b', lineHeight: 1, textShadow: '0 0 20px rgba(245,158,11,0.4)' }}>75%</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 3, fontWeight: 500 }}>Atmanirbhar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Explore section header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, #1a2d4a, transparent)' }} />
        <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap' }}>Explore the Hub</span>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, #1a2d4a)' }} />
      </div>

      {/* ── Bento category grid ── */}
      <div className="cat-grid">
        {categories.map(cat => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.path}
              to={cat.path}
              className="cat-card"
              style={{
                gridColumn: `span ${cat.span}`,
                position: 'relative', overflow: 'hidden',
                borderRadius: 16, textDecoration: 'none',
                background: `linear-gradient(135deg, ${cat.color}55 0%, #0f1e35 45%, #0c1625 100%)`,
                border: `2px solid ${cat.color}88`,
                padding: '22px 24px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s, border-color 0.25s',
                boxShadow: `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 ${cat.color}40`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px ${cat.color}cc`
                e.currentTarget.style.borderColor = `${cat.color}cc`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 ${cat.color}40`
                e.currentTarget.style.borderColor = `${cat.color}88`
              }}
            >
              {/* Background glow orb */}
              <div style={{
                position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
                width: 200, height: 200, right: -50, bottom: -60,
                background: `radial-gradient(circle, ${cat.color}55 0%, transparent 70%)`,
              }} />

              {/* Top row: icon + stat */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: `${cat.color}20`, border: `1px solid ${cat.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={22} style={{ color: cat.color }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: cat.color, lineHeight: 1, letterSpacing: '-1px' }}>{cat.stat}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 3, fontWeight: 600 }}>{cat.statLabel}</div>
                </div>
              </div>

              {/* Bottom: title + desc + arrow */}
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', marginBottom: 6, letterSpacing: '-0.2px' }}>{cat.title}</div>
                <div style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.55, marginBottom: 10 }}>{cat.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: cat.color }}>
                  Explore <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  )
}
