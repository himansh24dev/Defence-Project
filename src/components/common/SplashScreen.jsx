import { useEffect, useState } from 'react'

const WORDS = [
  { text: 'HOGA',  color: '#f1f5f9', shadow: 'rgba(241,245,249,0.35)' },
  { text: 'HOGA',  color: '#FF6B00', shadow: 'rgba(255,107,0,0.55)'   },
  { text: 'SABKA', color: '#f1f5f9', shadow: 'rgba(241,245,249,0.35)' },
  { text: 'HOGA',  color: '#22c55e', shadow: 'rgba(34,197,94,0.45)'   },
]

export default function SplashScreen({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2300)
    const t2 = setTimeout(onDone, 2750)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={exiting ? 'splash-root splash-exit' : 'splash-root'}>

      {/* Tricolor top stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 4,
        background: 'linear-gradient(90deg,#FF6B00 33.3%,#fff 33.3%,#fff 66.6%,#138808 66.6%)',
        opacity: 0.9,
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px)',
      }} />

      {/* Ambient glow orbs */}
      <div className="splash-orb" style={{ width: 700, height: 700, background: 'rgba(255,107,0,0.07)', top: '-15%', left: '-10%', animationDelay: '0s' }} />
      <div className="splash-orb" style={{ width: 500, height: 500, background: 'rgba(19,136,8,0.06)',  bottom: '-10%', right: '-5%', animationDelay: '2s' }} />
      <div className="splash-orb" style={{ width: 350, height: 350, background: 'rgba(59,130,246,0.05)', top: '25%', right: '-8%', animationDelay: '1s' }} />

      {/* Scan line */}
      <div className="splash-scan" />

      {/* Main words */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', userSelect: 'none', padding: '0 20px' }}>
        {WORDS.map((w, i) => (
          <div
            key={i}
            className="splash-word"
            style={{
              animationDelay: `${i * 0.19}s`,
              display: 'block',
              color: w.color,
              fontSize: 'clamp(58px, 14vw, 136px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-2px',
              textShadow: `0 0 80px ${w.shadow}, 0 0 160px ${w.shadow}`,
              fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
            }}
          >
            {w.text}
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div className="splash-tagline" style={{ position: 'relative', zIndex: 2, marginTop: 44, textAlign: 'center' }}>
        <div style={{
          width: 100, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.5), transparent)',
          margin: '0 auto 16px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span className="live-ping" style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <p style={{
            color: '#334155', fontSize: 10.5,
            letterSpacing: '3.5px', textTransform: 'uppercase',
            margin: 0, fontWeight: 600,
          }}>
            
          </p>
        </div>
      </div>

    </div>
  )
}
