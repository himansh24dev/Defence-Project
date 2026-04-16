import { useEffect, useState } from 'react'
import { Shield, X } from 'lucide-react'

const SESSION_KEY = 'baba_yaga_intro_shown'

export default function AIIntroPopup() {
  const [phase, setPhase] = useState('idle') // idle → enter → exit → done

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    const t1 = setTimeout(() => setPhase('enter'), 1200)
    const t2 = setTimeout(() => setPhase('exit'),  4400)
    const t3 = setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 4900)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (phase === 'idle' || phase === 'done') return null

  function dismiss() {
    setPhase('exit')
    setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 500)
  }

  return (
    <div
      className={phase === 'exit' ? 'ai-intro-popup ai-intro-exit' : 'ai-intro-popup ai-intro-enter'}
      style={{
        position: 'fixed',
        bottom: 96,
        right: 24,
        zIndex: 150,
        width: 'min(310px, calc(100vw - 48px))',
      }}
    >
      {/* Caret pointing down toward FAB */}
      <div style={{
        position: 'absolute',
        bottom: -7,
        right: 20,
        width: 14, height: 14,
        background: '#0d1929',
        border: '1px solid rgba(255,107,0,0.3)',
        borderTop: 'none', borderLeft: 'none',
        transform: 'rotate(45deg)',
      }} />

      {/* Card body */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1929 0%, #0a0f1e 100%)',
        border: '1px solid rgba(255,107,0,0.35)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,0,0.1), 0 0 40px rgba(255,107,0,0.08)',
      }}>
        {/* Top accent stripe */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, #FF6B00, rgba(255,107,0,0.3), transparent)',
        }} />

        <div style={{ padding: '14px 16px 16px' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 11, flexShrink: 0,
              background: 'linear-gradient(135deg, #FF6B00, #e55f00)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(255,107,0,0.45)',
            }}>
              <Shield size={18} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                BABA YAGA <span style={{ color: '#FF6B00' }}>AI</span>
              </div>
              <div style={{ fontSize: 10, color: '#334155', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                Defence &amp; SSB Assistant
              </div>
            </div>
            <button
              onClick={dismiss}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#334155', padding: 2, display: 'flex', borderRadius: 5, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
              onMouseLeave={e => e.currentTarget.style.color = '#334155'}
            >
              <X size={14} />
            </button>
          </div>

          {/* Message */}
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65, margin: '0 0 14px' }}>
            Jai Hind! Heading to <span style={{ color: '#f1f5f9', fontWeight: 600 }}>SSB</span>? Ask me anything —{' '}
            <span style={{ color: '#FF6B00' }}>weapons</span>, current affairs,{' '}
            <span style={{ color: '#FF6B00' }}>GTO tips</span>, interview prep — I\'ve got you covered.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, rgba(255,107,0,0.2), transparent)' }} />
            <span style={{ fontSize: 10.5, color: '#FF6B00', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Tap the button below ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
