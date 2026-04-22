import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Shield } from 'lucide-react'
import axios from 'axios'

const WELCOME = {
  role: 'assistant',
  content: 'Jai Hind! I\'m BABA YAGA AI — your dedicated defence & SSB prep assistant.\n\nAsk me anything about Indian armed forces, SSB interview process, weapons & platforms, geopolitics, or defence current affairs.\n\n⚠️ Note: My knowledge is based on training data up to early 2024, so I may not be aware of the very latest news or recent developments.',
}

const SUGGESTIONS = [
  'What is the SSB 5-day process?',
  'Tell me about BrahMos missile',
  'Latest India defence news',
  'Agnipath scheme details',
]

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Shield size={13} color="#FF6B00" />
      </div>
      <div style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: '12px 12px 12px 2px', padding: '12px 16px', display: 'flex', gap: 5, alignItems: 'center' }}>
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser && (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Shield size={13} color="#FF6B00" />
        </div>
      )}
      <div style={{
        maxWidth: '78%',
        padding: '10px 14px',
        borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        background: isUser ? '#FF6B00' : '#0f1b2e',
        border: isUser ? 'none' : '1px solid #1a2d4a',
        fontSize: 13,
        lineHeight: 1.6,
        color: isUser ? '#fff' : '#cbd5e1',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.content}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  async function send(text) {
    const trimmed = (text ?? input).trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', content: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg].filter(m => m.role !== 'system')
      const { data } = await axios.post('/api/chat', { messages: history })
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      if (!open) setHasUnread(true)
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Connection error — check your GROQ_API_KEY in .env.local'
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const showSuggestions = messages.length === 1 && !loading

  return (
    <>
      {/* ── Chat window ── */}
      {open && (
        <div className="chat-window" style={{
          position: 'fixed',
          bottom: 88,
          right: 24,
          width: 'min(390px, calc(100vw - 32px))',
          height: 'min(540px, calc(100vh - 120px))',
          background: '#070c1a',
          border: '1px solid #1a2d4a',
          borderRadius: 18,
          boxShadow: '0 24px 80px rgba(0,0,0,0.75), 0 0 0 1px #1a2d4a',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 200,
        }}>

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #0d1929 0%, #0a0f1e 100%)',
            borderBottom: '1px solid #1a2d4a',
            flexShrink: 0,
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #FF6B00, #e55f00)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(255,107,0,0.4)' }}>
              <Shield size={16} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                BABA YAGA <span style={{ color: '#FF6B00' }}>AI</span>
              </div>
              <div style={{ fontSize: 11.5, color: '#94a3b8', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                Defence &amp; SSB Assistant
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, display: 'flex', borderRadius: 6, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f1f5f9'}
              onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 12,
            scrollbarWidth: 'thin', scrollbarColor: '#1a2d4a transparent',
          }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}

            {/* Suggested questions */}
            {showSuggestions && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginTop: 4 }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9,
                      padding: '8px 10px', fontSize: 12, color: '#94a3b8',
                      cursor: 'pointer', textAlign: 'left', lineHeight: 1.4,
                      transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B0055'; e.currentTarget.style.color = '#FF6B00'; e.currentTarget.style.background = 'rgba(255,107,0,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = '#0f1b2e' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div style={{
            display: 'flex', gap: 8, padding: '10px 12px',
            borderTop: '1px solid #1a2d4a',
            background: '#0a0f1e',
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about SSB, defence, weapons…"
              disabled={loading}
              style={{
                flex: 1, background: '#0f1b2e', border: '1px solid #1a2d4a',
                borderRadius: 10, padding: '9px 13px', fontSize: 13, color: '#e2e8f0',
                outline: 'none', transition: 'border-color 0.2s',
                fontFamily: 'inherit',
              }}
              onFocus={e => e.target.style.borderColor = '#FF6B0066'}
              onBlur={e => e.target.style.borderColor = '#1a2d4a'}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: input.trim() && !loading ? '#FF6B00' : '#1a2d4a',
                border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                boxShadow: input.trim() && !loading ? '0 4px 14px rgba(255,107,0,0.4)' : 'none',
              }}
              onMouseEnter={e => { if (input.trim() && !loading) { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.background = '#e55f00' } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = input.trim() && !loading ? '#FF6B00' : '#1a2d4a' }}
            >
              <Send size={15} color={input.trim() && !loading ? '#fff' : '#475569'} />
            </button>
          </div>
        </div>
      )}

      {/* ── FAB button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className={open ? '' : 'chat-fab-pulse'}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 201,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? '#1a2d4a' : 'linear-gradient(135deg, #FF6B00, #e55f00)',
          border: open ? '1px solid #253d60' : 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? '0 4px 20px rgba(0,0,0,0.4)' : '0 6px 28px rgba(255,107,0,0.55)',
          transition: 'background 0.25s, box-shadow 0.25s, transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title={open ? 'Close chat' : 'Ask BABA YAGA AI'}
      >
        {open
          ? <X size={22} color="#94a3b8" />
          : <MessageCircle size={22} color="#fff" />
        }
        {hasUnread && !open && (
          <span style={{
            position: 'absolute', top: 2, right: 2,
            width: 12, height: 12, borderRadius: '50%',
            background: '#22c55e', border: '2px solid #070c1a',
          }} />
        )}
      </button>
    </>
  )
}
