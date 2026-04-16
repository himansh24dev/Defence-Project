import { useEffect, useState } from 'react'
import { Shield } from 'lucide-react'

const SESSION_KEY = 'baba_yaga_genie_shown'

const WORDS = [
  'Jai', 'Hind!', "I'm", 'BABA', 'YAGA', 'AI', '—',
  'your', 'personal', 'SSB', '&', 'defence',
  'intelligence', 'assistant.', '⚡', 'Ask', 'me', 'about',
  'weapons,', 'current', 'affairs,', 'GTO', 'tips,',
  'interview', 'prep', '—', 'anything!',
  'Tap', 'the', '🟠', 'button', 'below', 'anytime!',
]

// Sparkle star positions around the genie body
const STARS = [
  { top: '-32px', left: '50%',  ml: '-8px',  size: 18, delay: 0.0 },
  { top: '10%',   right: '-32px',            size: 14, delay: 0.3 },
  { top: '55%',   right: '-28px',            size: 20, delay: 0.9 },
  { bottom: '-28px', left: '50%', ml: '-8px', size: 16, delay: 0.6 },
  { top: '55%',   left: '-28px',             size: 14, delay: 1.2 },
  { top: '10%',   left: '-30px',             size: 18, delay: 0.5 },
]

export default function GenieIntro() {
  const [phase, setPhase] = useState('idle') // idle|enter|speak|exit|done

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    // Genie appears after splash screen (~3s) + small gap
    const t1 = setTimeout(() => setPhase('enter'),  3600)
    const t2 = setTimeout(() => setPhase('speak'),  4700)
    const t3 = setTimeout(() => setPhase('exit'),   9200)
    const t4 = setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 10100)

    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  function dismiss() {
    if (phase === 'idle' || phase === 'done' || phase === 'exit') return
    setPhase('exit')
    setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem(SESSION_KEY, '1')
    }, 900)
  }

  if (phase === 'idle' || phase === 'done') return null

  const exiting = phase === 'exit'

  return (
    <div
      className={exiting ? 'genie-backdrop genie-backdrop-exit' : 'genie-backdrop genie-backdrop-enter'}
      onClick={dismiss}
    >

      {/* ── Floating ambient sparkles across the screen ── */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="genie-ambient-star"
          style={{
            top:  `${10 + (i * 37 % 80)}%`,
            left: `${5  + (i * 53 % 90)}%`,
            animationDelay: `${(i * 0.31) % 2}s`,
            fontSize: [10, 14, 10, 18, 12][i % 5],
          }}
        >
          {['✦', '⋆', '★', '✧', '✦'][i % 5]}
        </div>
      ))}

      {/* ── Central genie wrapper ── */}
      <div
        className={`genie-wrapper ${exiting ? 'genie-poof' : 'genie-rise'}`}
        onClick={e => e.stopPropagation()}
      >

        {/* Smoke wisps below genie */}
        <div className="genie-smoke-trail">
          <div className="g-wisp gw1" />
          <div className="g-wisp gw2" />
          <div className="g-wisp gw3" />
        </div>

        {/* Main body: glowing orb + emoji */}
        <div className="genie-orb">
          {/* Outer pulse ring */}
          <div className="genie-pulse-ring" />
          {/* Orbit stars */}
          {STARS.map((s, i) => (
            <span
              key={i}
              className="genie-orbit-star"
              style={{
                top: s.top, bottom: s.bottom,
                left: s.left, right: s.right,
                marginLeft: s.ml,
                fontSize: s.size,
                animationDelay: `${s.delay}s`,
              }}
            >
              ✦
            </span>
          ))}
          {/* The genie emoji */}
          <div className="genie-emoji">🧞</div>
        </div>

        {/* Name badge */}
        <div className="genie-badge">
          <Shield size={13} color="#FF6B00" />
          <span>BABA YAGA <span style={{ color: '#FF6B00' }}>AI</span></span>
        </div>

        {/* Speech bubble — mounts when phase = speak */}
        {phase === 'speak' && (
          <div className="genie-bubble">
            {/* Caret pointing up to genie */}
            <div className="genie-bubble-caret" />
            <p className="genie-bubble-text">
              {WORDS.map((w, i) => (
                <span
                  key={i}
                  className="genie-word"
                  style={{ animationDelay: `${i * 0.085}s` }}
                >
                  {w}{' '}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>

      {/* Dismiss hint */}
      {!exiting && (
        <p className="genie-dismiss-hint">tap anywhere to dismiss</p>
      )}

    </div>
  )
}
