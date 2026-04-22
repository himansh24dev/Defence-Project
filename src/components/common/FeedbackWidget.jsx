import { useState } from 'react'
import { MessageSquare, X, Send, CheckCircle } from 'lucide-react'

const SECTIONS = [
  'General Website', 'Weapons & Equipment', 'Regiments', 'Geopolitics',
  'Defence Orgs', 'Operations', 'Ranks & Medals',
  'Know Your Forces', 'India Map', 'Practice',
]

const TYPES = [
  { value: 'wrong_info',   label: '❌ Wrong Information' },
  { value: 'missing_info', label: '➕ Missing Information' },
  { value: 'suggestion',   label: '💡 Suggestion' },
  { value: 'bug',          label: '🐛 Bug / Technical Issue' },
  { value: 'other',        label: '💬 Other' },
]

// Modal — controlled externally via open/onClose props
export default function FeedbackWidget({ open, onClose }) {
  const [section, setSection] = useState('')
  const [type, setType]       = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail]     = useState('')
  const [busy, setBusy]       = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')

  const handleClose = () => {
    onClose()
    setTimeout(() => { setSection(''); setType(''); setMessage(''); setEmail(''); setDone(false); setError('') }, 300)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!section)        { setError('Please select a section.'); return }
    if (!type)           { setError('Please select a feedback type.'); return }
    if (!message.trim()) { setError('Please write your feedback.'); return }
    setBusy(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0847b833-af82-4032-aeab-8a37ad6c7563',
          subject: `[BABA YAGA Feedback] ${type} — ${section}`,
          from_name: 'Baba Yaga Feedback',
          section,
          feedback_type: TYPES.find(t => t.value === type)?.label || type,
          message,
          reply_to: email || 'no-reply@babayaga.in',
        }),
      })
      const data = await res.json()
      if (data.success) setDone(true)
      else throw new Error(data.message || 'Submission failed')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (!open) return null

  const inputStyle = {
    width: '100%', padding: '8px 11px', borderRadius: 7, boxSizing: 'border-box',
    background: '#0a0f1e', border: '1px solid #1a2d4a', color: '#f1f5f9',
    fontSize: 12.5, outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <div onClick={handleClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 440,
        background: '#070c1a', border: '1px solid #1a2d4a',
        borderRadius: 14, overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', borderBottom: '1px solid #1a2d4a',
          background: 'linear-gradient(135deg, #7c3aed18, transparent)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageSquare size={15} color="#a78bfa" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>Send Feedback</span>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f1f5f9'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: '18px 18px 20px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={44} color="#22c55e" style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Thank you!</div>
              <p style={{ fontSize: 12.5, color: '#64748b', margin: '0 0 20px', lineHeight: 1.5 }}>
                Your feedback has been received. We'll review and improve accordingly.
              </p>
              <button onClick={handleClose} style={{ padding: '8px 24px', borderRadius: 7, border: 'none', background: '#22c55e', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4, fontWeight: 600 }}>Section</label>
                <select value={section} onChange={e => setSection(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#1a2d4a'}
                >
                  <option value="">Select a section…</option>
                  {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4, fontWeight: 600 }}>Feedback Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {TYPES.map(t => (
                    <button key={t.value} type="button" onClick={() => setType(t.value)} style={{
                      padding: '7px 8px', borderRadius: 7,
                      border: `1px solid ${type === t.value ? '#7c3aed' : '#1a2d4a'}`,
                      background: type === t.value ? '#7c3aed22' : '#0a0f1e',
                      color: type === t.value ? '#a78bfa' : '#64748b',
                      fontSize: 11.5, cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.15s', fontWeight: type === t.value ? 600 : 400,
                    }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4, fontWeight: 600 }}>Your Feedback</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Describe the issue or suggestion in detail…" rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 90, fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#1a2d4a'}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 10.5, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4, fontWeight: 600 }}>
                  Email <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>(optional)</span>
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#1a2d4a'}
                />
              </div>

              {error && <div style={{ marginBottom: 12, padding: '8px 11px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 7, fontSize: 12, color: '#f87171' }}>{error}</div>}

              <button type="submit" disabled={busy} style={{
                width: '100%', padding: '10px 0', borderRadius: 8, border: 'none',
                background: busy ? '#4c1d95' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff', fontSize: 13, fontWeight: 700,
                cursor: busy ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              }}>
                <Send size={13} />
                {busy ? 'Sending…' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
