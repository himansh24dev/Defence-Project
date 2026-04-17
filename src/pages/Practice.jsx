import { useState, useEffect } from 'react'
import { Brain, Clock, ChevronRight, RotateCcw, CheckCircle, ArrowLeft, BookOpen, Pen, AlertTriangle } from 'lucide-react'
import { watSets } from '../data/watWords'

const WORD_DURATION = 15 // seconds per word

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch { /* audio not supported in this environment */ }
}

// ─── WAT Test Screen ─────────────────────────────────────────────────────────
function WATTest({ set, onComplete, onExit }) {
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(WORD_DURATION)
  const [phase, setPhase] = useState('word') // 'word' | 'transition'
  const total = set.words.length

  useEffect(() => {
    if (phase !== 'word') return
    let t = WORD_DURATION
    setTimeLeft(WORD_DURATION)
    const id = setInterval(() => {
      t -= 1
      setTimeLeft(t)
      if (t <= 0) {
        clearInterval(id)
        playBeep()
        if (index + 1 >= total) {
          onComplete()
        } else {
          setPhase('transition')
          setTimeout(() => {
            setIndex(index + 1)
            setPhase('word')
          }, 350)
        }
      }
    }, 1000)
    return () => clearInterval(id)
  }, [index, phase, total, onComplete])

  const progress = ((index) / total) * 100
  const timerPercent = (timeLeft / WORD_DURATION) * 100

  // Color shifts from green → orange → red as time runs out
  const timerColor = timeLeft > 8 ? '#22c55e' : timeLeft > 4 ? '#f97316' : '#ef4444'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#070c1a',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top progress bar (overall) */}
      <div style={{ height: 3, background: '#1a2d4a', flexShrink: 0 }}>
        <div style={{
          height: '100%', background: '#FF6B00',
          width: `${progress}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px',
        borderBottom: '1px solid #1a2d4a',
        flexShrink: 0,
      }}>
        <button
          onClick={onExit}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1px solid #1a2d4a',
            borderRadius: 8, padding: '6px 12px',
            color: '#94a3b8', cursor: 'pointer', fontSize: 13,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.color = '#94a3b8' }}
        >
          <ArrowLeft size={14} /> Exit
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748b', fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase' }}>
            {set.title}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
            Word <span style={{ color: '#f1f5f9', fontWeight: 700 }}>{index + 1}</span>
            <span style={{ color: '#64748b' }}> / {total}</span>
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#0f1b2e', border: '1px solid #1a2d4a',
          borderRadius: 8, padding: '6px 12px',
        }}>
          <Clock size={13} color="#64748b" />
          <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Main word area */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px 24px',
      }}>
        {/* The Word */}
        <div style={{
          textAlign: 'center',
          opacity: phase === 'transition' ? 0 : 1,
          transform: phase === 'transition' ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          <div style={{
            fontSize: 'clamp(52px, 11vw, 96px)',
            fontWeight: 900,
            color: '#f1f5f9',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            textShadow: '0 0 60px rgba(255,107,0,0.15)',
          }}>
            {set.words[index]}
          </div>
        </div>
      </div>

      {/* Bottom timer bar */}
      <div style={{ height: 4, background: '#1a2d4a', flexShrink: 0 }}>
        <div style={{
          height: '100%',
          background: timerColor,
          width: `${timerPercent}%`,
          transition: 'width 0.9s linear, background 0.5s ease',
        }} />
      </div>
    </div>
  )
}

// ─── Instruction Screen ───────────────────────────────────────────────────────
function Instructions({ set, onStart, onBack }) {
  const [countdown, setCountdown] = useState(5)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    if (countdown <= 0) { onStart(); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [started, countdown, onStart])

  return (
    <div style={{
      minHeight: '100vh', background: '#070c1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        maxWidth: 560, width: '100%',
        background: '#0d1526',
        border: '1px solid #1a2d4a',
        borderRadius: 20,
        padding: '40px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 60, height: 60,
          background: 'linear-gradient(135deg, #FF6B00, #e55f00)',
          borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <Pen size={26} color="#fff" />
        </div>

        <h2 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: '0 0 6px' }}>
          {set.title}
        </h2>
        <div style={{ margin: '0 0 32px' }} />

        <div style={{
          background: '#0a0f1e',
          border: '1px solid #1a2d4a',
          borderRadius: 14,
          padding: '20px 24px',
          textAlign: 'left',
          marginBottom: 28,
        }}>
          <div style={{ color: '#FF6B00', fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 14, fontWeight: 700 }}>
            Instructions
          </div>
          {[
            ['60 words', 'One word will appear at a time'],
            ['15 seconds', 'Per word — same as actual SSB'],
            ['Write freely', 'Note your first instinctive response in your notebook'],
            ['No pausing', 'The test runs continuously without breaks'],
            ['Stay honest', 'Your first thought matters most'],
          ].map(([label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <div style={{
                background: '#FF6B0022', border: '1px solid #FF6B0044',
                borderRadius: 6, padding: '2px 8px',
                color: '#FF6B00', fontSize: 11, fontWeight: 700,
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {label}
              </div>
              <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#0a0f1e', border: '1px solid #1a2d4a',
          borderRadius: 10, padding: '10px 16px',
          marginBottom: 28, justifyContent: 'center',
        }}>
          <AlertTriangle size={14} color="#f59e0b" />
          <span style={{ color: '#94a3b8', fontSize: 12 }}>
            Keep your notebook and pen ready before starting
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              flex: 1, padding: '12px',
              background: 'none', border: '1px solid #1a2d4a',
              borderRadius: 10, color: '#94a3b8',
              cursor: 'pointer', fontSize: 14,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#253d60'; e.currentTarget.style.color = '#f1f5f9' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.color = '#94a3b8' }}
          >
            Back
          </button>
          <button
            onClick={() => { if (!started) setStarted(true) }}
            style={{
              flex: 2, padding: '12px',
              background: started ? '#1a2d4a' : 'linear-gradient(135deg, #FF6B00, #e55f00)',
              border: 'none', borderRadius: 10,
              color: '#fff', cursor: started ? 'default' : 'pointer',
              fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {started ? (
              <>Starting in <span style={{ color: '#FF6B00', fontSize: 20, fontWeight: 900 }}>{countdown}</span>…</>
            ) : (
              <>Start Test <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Completion Screen ────────────────────────────────────────────────────────
function Completion({ set, onRetry, onBack }) {
  return (
    <div style={{
      minHeight: '100vh', background: '#070c1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        maxWidth: 500, width: '100%',
        background: '#0d1526', border: '1px solid #1a2d4a',
        borderRadius: 20, padding: '44px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 70, height: 70,
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          borderRadius: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <CheckCircle size={34} color="#fff" />
        </div>

        <h2 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
          Test Complete!
        </h2>
        <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 32px' }}>
          You completed all 60 words of <span style={{ color: '#FF6B00' }}>{set.title}</span>
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12, marginBottom: 32,
        }}>
          {[
            { label: 'Words Shown', value: '60', color: '#FF6B00' },
            { label: 'Time per Word', value: '15s', color: '#22c55e' },
            { label: 'Total Duration', value: '15 min', color: '#3b82f6' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#0a0f1e', border: '1px solid #1a2d4a',
              borderRadius: 12, padding: '16px 12px',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: '#0a0f1e', border: '1px solid #1a2d4a',
          borderRadius: 12, padding: '16px 20px',
          textAlign: 'left', marginBottom: 28,
        }}>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: '#f1f5f9' }}>What to do next:</strong> Review your notebook responses.
            Look for recurring themes, unusually slow responses, or words that made you hesitate —
            these often reveal areas to work on before your SSB.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              flex: 1, padding: '12px',
              background: 'none', border: '1px solid #1a2d4a',
              borderRadius: 10, color: '#94a3b8',
              cursor: 'pointer', fontSize: 14,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#253d60'; e.currentTarget.style.color = '#f1f5f9' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.color = '#94a3b8' }}
          >
            All Sets
          </button>
          <button
            onClick={onRetry}
            style={{
              flex: 2, padding: '12px',
              background: 'linear-gradient(135deg, #FF6B00, #e55f00)',
              border: 'none', borderRadius: 10,
              color: '#fff', cursor: 'pointer',
              fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <RotateCcw size={15} /> Retry This Set
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Set Selector (main Practice page) ───────────────────────────────────────
export default function Practice() {
  const [selectedSet, setSelectedSet] = useState(null)
  const [screen, setScreen] = useState('select') // 'select' | 'instructions' | 'test' | 'done'

  const handleSelectSet = (set) => {
    setSelectedSet(set)
    setScreen('instructions')
  }

  const handleStartTest = () => setScreen('test')
  const handleComplete = () => setScreen('done')
  const handleRetry = () => setScreen('instructions')
  const handleBack = () => { setSelectedSet(null); setScreen('select') }
  const handleExit = () => { setSelectedSet(null); setScreen('select') }

  if (screen === 'instructions' && selectedSet) {
    return <Instructions set={selectedSet} onStart={handleStartTest} onBack={handleBack} />
  }

  if (screen === 'test' && selectedSet) {
    return <WATTest set={selectedSet} onComplete={handleComplete} onExit={handleExit} />
  }

  if (screen === 'done' && selectedSet) {
    return <Completion set={selectedSet} onRetry={handleRetry} onBack={handleBack} />
  }

  // Set selector
  return (
    <div style={{ padding: '40px 16px 80px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ marginBottom: 48, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#FF6B0015', border: '1px solid #FF6B0030',
          borderRadius: 20, padding: '4px 14px',
          marginBottom: 16,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00' }} />
          <span style={{ color: '#FF6B00', fontSize: 11, letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase' }}>
            SSB Practice
          </span>
        </div>
        <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-1px' }}>
          Word Association Test
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
          Authentic SSB WAT simulation — 60 words, 15 seconds each. Write your first instinctive
          response in your notebook as each word appears.
        </p>
      </div>

      {/* Info strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12, marginBottom: 40,
      }}>
        {[
          { icon: Clock, label: '15 sec / word', sub: 'Same as real SSB' },
          { icon: BookOpen, label: '60 words / set', sub: 'Authentic count' },
          { icon: Brain, label: '5 unique sets', sub: '300 SSB words' },
          { icon: Pen, label: 'Notebook only', sub: 'No digital input' },
        ].map(({ icon: ItemIcon, label, sub }) => (
          <div key={label} style={{
            background: '#0d1526', border: '1px solid #1a2d4a',
            borderRadius: 14, padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 38, height: 38, flexShrink: 0,
              background: '#FF6B0015', border: '1px solid #FF6B0030',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ItemIcon size={17} color="#FF6B00" />
            </div>
            <div>
              <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700 }}>{label}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* WAT Sets grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {watSets.map((set, idx) => (
          <button
            key={set.id}
            onClick={() => handleSelectSet(set)}
            style={{
              background: '#0d1526',
              border: '1px solid #1a2d4a',
              borderRadius: 18,
              padding: '28px 28px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#FF6B0066'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,107,0,0.12)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#1a2d4a'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Set number badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48,
                background: `linear-gradient(135deg, #FF6B00, #e55f00)`,
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 900, color: '#fff',
              }}>
                {idx + 1}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: '#0a0f1e', border: '1px solid #1a2d4a',
                borderRadius: 8, padding: '4px 10px',
              }}>
                <Clock size={11} color="#64748b" />
                <span style={{ color: '#64748b', fontSize: 11 }}>15 min</span>
              </div>
            </div>

            <h3 style={{ color: '#f1f5f9', fontSize: 17, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              {set.title}
            </h3>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #1a2d4a', paddingTop: 16,
            }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#64748b', fontSize: 12 }}>
                  <span style={{ color: '#f1f5f9', fontWeight: 700 }}>60</span> words
                </span>
                <span style={{ color: '#64748b', fontSize: 12 }}>
                  <span style={{ color: '#f1f5f9', fontWeight: 700 }}>15s</span> each
                </span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: '#FF6B00', fontSize: 13, fontWeight: 600,
              }}>
                Start <ChevronRight size={15} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom tip */}
      <div style={{
        marginTop: 48,
        background: '#0d1526', border: '1px solid #1a2d4a',
        borderRadius: 14, padding: '20px 24px',
        display: 'flex', gap: 14, alignItems: 'flex-start',
      }}>
        <div style={{
          width: 36, height: 36, flexShrink: 0,
          background: '#3b82f615', border: '1px solid #3b82f630',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AlertTriangle size={16} color="#3b82f6" />
        </div>
        <div>
          <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
            Pro Tip for WAT
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
            In SSB, assessors look for positive, action-oriented responses that reflect a stable,
            socially adjusted personality. Avoid negative associations, avoid single-word responses
            where possible, and always write complete sentences. Your first instinct is usually your
            most authentic — practice trusting it.
          </div>
        </div>
      </div>
    </div>
  )
}
