import { useState, useEffect, useMemo, useCallback } from 'react'
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, Zap } from 'lucide-react'
import { armyEquipment } from '../data/armyEquipment'
import { navyEquipment } from '../data/navyEquipment'
import { airforceEquipment } from '../data/airforceEquipment'
import { armyUnits } from '../data/regiments'
import { navyUnits } from '../data/navyUnits'
import { iafUnits } from '../data/iafUnits'
import { operations } from '../data/operations'
import { geopoliticsData } from '../data/geopolitics'
import SectionHeader from '../components/common/SectionHeader'

// ─── Question generators ──────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick(arr, n) { return shuffle(arr).slice(0, n) }

function makeOptions(correct, pool, key) {
  const wrong = shuffle(pool.filter(x => x[key] && x[key] !== correct)).slice(0, 3).map(x => x[key])
  return shuffle([correct, ...wrong])
}

function weaponQuestions(weapons, label) {
  const qs = []
  weapons.forEach(w => {
    if (w.origin) qs.push({
      q: `Which country/source does the ${label} use <strong>${w.name}</strong> from?`,
      answer: w.origin,
      options: makeOptions(w.origin, weapons, 'origin'),
      explanation: `${w.name} — ${w.type}. Origin: ${w.origin}. ${w.significance || ''}`,
      category: label,
    })
    if (w.inducted) qs.push({
      q: `When was <strong>${w.name}</strong> inducted into Indian service?`,
      answer: w.inducted,
      options: makeOptions(w.inducted, weapons, 'inducted'),
      explanation: `${w.name} inducted ${w.inducted}. ${w.description?.slice(0, 120) || ''}`,
      category: label,
    })
  })
  return qs
}

function unitQuestions(units, label) {
  const qs = []
  units.forEach(u => {
    if (u.headquarters) qs.push({
      q: `Where is the headquarters of <strong>${u.name}</strong>?`,
      answer: u.headquarters,
      options: makeOptions(u.headquarters, units, 'headquarters'),
      explanation: `${u.name} (${u.category}) HQ: ${u.headquarters}. ${u.significance?.slice(0, 120) || ''}`,
      category: label,
    })
    if (u.raised) qs.push({
      q: `When was <strong>${u.name}</strong> raised/established?`,
      answer: u.raised,
      options: makeOptions(u.raised, units, 'raised'),
      explanation: `${u.name} raised in ${u.raised}.`,
      category: label,
    })
    u.famousActions?.slice(0, 1).forEach(a => {
      qs.push({
        q: `Which unit is famous for the <strong>${a.battle}</strong>?`,
        answer: u.name,
        options: makeOptions(u.name, units, 'name'),
        explanation: `${u.name}: ${a.detail?.slice(0, 180) || ''}`,
        category: label,
      })
    })
  })
  return qs
}

function operationQuestions() {
  const qs = []
  operations.forEach(op => {
    if (op.year) qs.push({
      q: `In which year did <strong>${op.name}</strong> take place?`,
      answer: op.year,
      options: makeOptions(op.year, operations, 'year'),
      explanation: `${op.name} (${op.year}): ${op.significance?.slice(0, 150) || op.outcome?.slice(0, 150) || ''}`,
      category: 'Operations',
    })
    if (op.theatre) qs.push({
      q: `Where was <strong>${op.name}</strong> conducted?`,
      answer: op.theatre,
      options: makeOptions(op.theatre, operations, 'theatre'),
      explanation: `${op.name} — Theatre: ${op.theatre}. ${op.objective?.slice(0, 120) || ''}`,
      category: 'Operations',
    })
  })
  return qs
}

function geoQuestions() {
  const qs = []
  geopoliticsData.forEach(g => {
    if (g.region) qs.push({
      q: `Which region/area does <strong>${g.title}</strong> primarily involve?`,
      answer: g.region,
      options: makeOptions(g.region, geopoliticsData, 'region'),
      explanation: `${g.title}: ${g.summary?.slice(0, 150) || ''}`,
      category: 'Geopolitics',
    })
    if (g.category) qs.push({
      q: `<strong>${g.title}</strong> falls under which geopolitical category?`,
      answer: g.category,
      options: makeOptions(g.category, geopoliticsData, 'category'),
      explanation: `${g.title} is a ${g.category} issue. ${g.significance?.slice(0, 120) || ''}`,
      category: 'Geopolitics',
    })
  })
  return qs
}

const QUIZ_SETS = [
  { id: 'all',        label: 'All Topics',         icon: '🎯', color: '#FF6B00', desc: 'Mixed questions from all sections' },
  { id: 'weapons',    label: 'Weapons & Equipment', icon: '⚔️', color: '#f97316', desc: 'Army, Navy & Air Force platforms' },
  { id: 'units',      label: 'Units & Regiments',  icon: '🪖', color: '#3b82f6', desc: 'Regiments, Squadrons & Commands' },
  { id: 'operations', label: 'Operations',          icon: '🗺️', color: '#ef4444', desc: 'Wars, operations & exercises' },
  { id: 'geo',        label: 'Geopolitics',         icon: '🌏', color: '#a78bfa', desc: 'LAC, LoC, Quad, nuclear doctrine' },
]

const QUESTION_COUNT = 10

// ─── Quiz Card ────────────────────────────────────────────────────────────────
function QuizCard({ question, onAnswer, answered, selected }) {
  return (
    <div style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
        {question.category}
      </div>
      <p
        style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.55, marginBottom: 20 }}
        dangerouslySetInnerHTML={{ __html: question.q }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {question.options.map((opt, i) => {
          const isCorrect = opt === question.answer
          const isSelected = opt === selected
          let bg = '#0a0f1e', border = '#1a2d4a', color = '#cbd5e1'
          if (answered) {
            if (isCorrect) { bg = 'rgba(34,197,94,0.12)'; border = '#22c55e'; color = '#4ade80' }
            else if (isSelected) { bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#f87171' }
          } else if (isSelected) {
            bg = 'rgba(255,107,0,0.12)'; border = '#FF6B00'; color = '#fb923c'
          }
          return (
            <button
              key={i}
              onClick={() => !answered && onAnswer(opt)}
              style={{
                textAlign: 'left', padding: '12px 16px', borderRadius: 10,
                background: bg, border: `1px solid ${border}`, color,
                fontSize: 13.5, fontWeight: 500, cursor: answered ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ width: 22, height: 22, borderRadius: '50%', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, color }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {answered && isCorrect && <CheckCircle size={16} color="#22c55e" style={{ marginLeft: 'auto' }} />}
              {answered && isSelected && !isCorrect && <XCircle size={16} color="#ef4444" style={{ marginLeft: 'auto' }} />}
            </button>
          )
        })}
      </div>
      {answered && (
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,107,0,0.07)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>Explanation</div>
          <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{question.explanation}</p>
        </div>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Quiz() {
  const [mode, setMode]         = useState('select')   // 'select' | 'playing' | 'result'
  const [setId, setSetId]       = useState('all')
  const [questions, setQ]       = useState([])
  const [current, setCurrent]   = useState(0)
  const [answers, setAnswers]   = useState([])         // { selected, correct }
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState(null)

  const allQuestions = useMemo(() => {
    const wq = [
      ...weaponQuestions(armyEquipment, 'Army Equipment'),
      ...weaponQuestions(navyEquipment, 'Navy Equipment'),
      ...weaponQuestions(airforceEquipment, 'Air Force Equipment'),
    ]
    const uq = [
      ...unitQuestions(armyUnits, 'Army Regiment'),
      ...unitQuestions(navyUnits, 'Navy Unit'),
      ...unitQuestions(iafUnits, 'IAF Unit'),
    ]
    const oq = operationQuestions()
    const gq = geoQuestions()
    return { all: [...wq, ...uq, ...oq, ...gq], weapons: wq, units: uq, operations: oq, geo: gq }
  }, [])

  const startQuiz = (id) => {
    setSetId(id)
    const pool = allQuestions[id] || allQuestions.all
    const valid = pool.filter(q => q.options.length === 4)
    setQ(pick(valid, QUESTION_COUNT))
    setCurrent(0)
    setAnswers([])
    setAnswered(false)
    setSelected(null)
    setMode('playing')
  }

  const handleAnswer = (opt) => {
    setSelected(opt)
    setAnswered(true)
    setAnswers(prev => [...prev, { selected: opt, correct: questions[current].answer }])
  }

  const next = () => {
    if (current + 1 >= questions.length) {
      setMode('result')
    } else {
      setCurrent(c => c + 1)
      setAnswered(false)
      setSelected(null)
    }
  }

  const score = answers.filter(a => a.selected === a.correct).length

  // ── Select screen ────────────────────────────────────────────────────────
  if (mode === 'select') return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="Quiz Mode" subtitle="Test your SSB defence knowledge — active recall beats passive reading" icon={Brain} accent="#FF6B00" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {QUIZ_SETS.map(s => (
          <button
            key={s.id}
            onClick={() => startQuiz(s.id)}
            style={{
              textAlign: 'left', padding: '20px 18px',
              background: '#0f1b2e', border: `1px solid #1a2d4a`,
              borderRadius: 14, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '66'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.4)` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 5 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 12 }}>{s.desc}</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 11.5, fontWeight: 600, color: s.color,
              padding: '4px 10px', borderRadius: 99,
              background: `${s.color}18`, border: `1px solid ${s.color}30`,
            }}>
              <Zap size={11} /> {QUESTION_COUNT} Questions
            </div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: '12px 16px', background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 10, fontSize: 12.5, color: '#64748b', lineHeight: 1.7 }}>
        <strong style={{ color: '#94a3b8' }}>How it works:</strong> {QUESTION_COUNT} random questions per round · Choose an answer · Read the explanation · Active recall = 3× better retention than re-reading
      </div>
    </div>
  )

  // ── Playing screen ───────────────────────────────────────────────────────
  if (mode === 'playing') {
    const q = questions[current]
    const progressPct = ((current) / questions.length) * 100
    const setInfo = QUIZ_SETS.find(s => s.id === setId)

    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{setInfo?.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>Question {current + 1} of {questions.length}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 600 }}>
              {answers.filter(a => a.selected === a.correct).length} ✓
            </span>
            <span style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>
              {answers.filter(a => a.selected !== a.correct).length} ✗
            </span>
            <button onClick={() => setMode('select')} style={{ fontSize: 12, color: '#475569', background: 'none', border: '1px solid #1a2d4a', borderRadius: 7, padding: '5px 10px', cursor: 'pointer' }}>
              Quit
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: '#1a2d4a', borderRadius: 99, marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: setInfo?.color || '#FF6B00', borderRadius: 99, transition: 'width 0.3s ease' }} />
        </div>

        <QuizCard question={q} onAnswer={handleAnswer} answered={answered} selected={selected} />

        {answered && (
          <button
            onClick={next}
            style={{
              width: '100%', marginTop: 16, padding: '14px', borderRadius: 12,
              background: setInfo?.color || '#FF6B00', color: '#fff',
              border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {current + 1 >= questions.length ? 'See Results' : 'Next Question'} <ChevronRight size={17} />
          </button>
        )}
      </div>
    )
  }

  // ── Result screen ────────────────────────────────────────────────────────
  const pct = Math.round((score / questions.length) * 100)
  const grade = pct >= 80 ? { label: 'Recommended ✓', color: '#22c55e' }
              : pct >= 60 ? { label: 'Screened In', color: '#f59e0b' }
              : { label: 'Keep Revising', color: '#ef4444' }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 16px', textAlign: 'center' }}>
      <Trophy size={48} color="#f59e0b" style={{ marginBottom: 16 }} />
      <h1 style={{ fontSize: 28, fontWeight: 900, color: '#f1f5f9', marginBottom: 8 }}>
        {score} / {questions.length}
      </h1>
      <div style={{ fontSize: 16, fontWeight: 700, color: grade.color, marginBottom: 24 }}>{grade.label}</div>

      {/* Score arc */}
      <div style={{ width: 120, height: 120, borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `conic-gradient(${grade.color} ${pct * 3.6}deg, #1a2d4a 0deg)` }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#f1f5f9' }}>{pct}%</div>
        </div>
      </div>

      {/* Answer breakdown */}
      <div style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 14, padding: 20, marginBottom: 24, textAlign: 'left' }}>
        {answers.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: i < answers.length - 1 ? '1px solid #1a2d4a' : 'none' }}>
            {a.selected === a.correct
              ? <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
              : <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
            }
            <div>
              <div style={{ fontSize: 12, color: '#94a3b8' }} dangerouslySetInnerHTML={{ __html: questions[i]?.q }} />
              {a.selected !== a.correct && (
                <div style={{ fontSize: 11.5, color: '#22c55e', marginTop: 3 }}>✓ {a.correct}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => startQuiz(setId)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: '#FF6B00', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}
        >
          <RotateCcw size={16} /> Try Again
        </button>
        <button
          onClick={() => setMode('select')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: 'transparent', color: '#94a3b8', border: '1px solid #1a2d4a', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
        >
          Change Topic
        </button>
      </div>
    </div>
  )
}
