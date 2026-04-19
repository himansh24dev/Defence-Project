import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const [mode, setMode]       = useState('login')   // 'login' | 'signup'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError]     = useState('')
  const [msg, setMsg]         = useState('')
  const [busy, setBusy]       = useState(false)

  const { signIn, signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setMsg('')

    if (mode === 'signup' && password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setBusy(true)
    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password)
        if (err) throw err
        navigate('/')
      } else {
        const { error: err } = await signUp(email, password)
        if (err) throw err
        setMsg('Account created! Check your email to confirm, then log in.')
        setMode('login')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    const { error: err } = await signInWithGoogle()
    if (err) setError(err.message)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0f1e', padding: 16,
    }}>
      <div style={{
        width: '100%', maxWidth: 400,
        background: '#070c1a', border: '1px solid #1a2d4a',
        borderRadius: 16, overflow: 'hidden',
      }}>
        {/* Top stripe */}
        <div style={{ display: 'flex', height: 3 }}>
          <div style={{ flex: 1, background: '#FF6B00' }} />
          <div style={{ flex: 1, background: '#ffffff', opacity: 0.7 }} />
          <div style={{ flex: 1, background: '#138808' }} />
        </div>

        <div style={{ padding: '32px 28px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #FF6B00, #e55f00)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>
                <span style={{ color: '#fff' }}>BABA </span>
                <span style={{ color: '#FF6B00' }}>YAGA</span>
              </div>
              <div style={{ fontSize: 9, color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Defence Intelligence Hub
              </div>
            </div>
          </div>

          {/* Tab toggle */}
          <div style={{
            display: 'flex', background: '#0f1b2e', borderRadius: 8,
            border: '1px solid #1a2d4a', padding: 3, marginBottom: 24,
          }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setMsg('') }} style={{
                flex: 1, padding: '7px 0', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                background: mode === m ? '#FF6B00' : 'transparent',
                color: mode === m ? '#fff' : '#64748b',
                transition: 'all 0.2s',
              }}>
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Google button */}
          <button onClick={handleGoogle} style={{
            width: '100%', padding: '10px 0', borderRadius: 8,
            border: '1px solid #1a2d4a', background: '#0f1b2e',
            color: '#f1f5f9', fontSize: 13, fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 16, transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#FF6B00'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1a2d4a'}
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.6-8 19.6-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 5.1C9.8 39.6 16.4 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.8l6.2 5.2C40.9 35.8 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#1a2d4a' }} />
            <span style={{ fontSize: 11, color: '#475569' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#1a2d4a' }} />
          </div>

          {/* Form */}
          <form onSubmit={handle}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>
                Email
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="you@example.com"
                style={{
                  width: '100%', padding: '9px 12px', borderRadius: 8, boxSizing: 'border-box',
                  background: '#0f1b2e', border: '1px solid #1a2d4a', color: '#f1f5f9',
                  fontSize: 13, outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#FF6B00'}
                onBlur={e => e.target.style.borderColor = '#1a2d4a'}
              />
            </div>

            <div style={{ marginBottom: mode === 'signup' ? 12 : 20 }}>
              <label style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>
                Password
              </label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="Min. 6 characters"
                style={{
                  width: '100%', padding: '9px 12px', borderRadius: 8, boxSizing: 'border-box',
                  background: '#0f1b2e', border: '1px solid #1a2d4a', color: '#f1f5f9',
                  fontSize: 13, outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#FF6B00'}
                onBlur={e => e.target.style.borderColor = '#1a2d4a'}
              />
            </div>

            {mode === 'signup' && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 5 }}>
                  Confirm Password
                </label>
                <input
                  type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  required placeholder="Repeat password"
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: 8, boxSizing: 'border-box',
                    background: '#0f1b2e', border: '1px solid #1a2d4a', color: '#f1f5f9',
                    fontSize: 13, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = '#FF6B00'}
                  onBlur={e => e.target.style.borderColor = '#1a2d4a'}
                />
              </div>
            )}

            {error && (
              <div style={{ marginBottom: 12, padding: '8px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 7, fontSize: 12, color: '#f87171' }}>
                {error}
              </div>
            )}
            {msg && (
              <div style={{ marginBottom: 12, padding: '8px 12px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 7, fontSize: 12, color: '#4ade80' }}>
                {msg}
              </div>
            )}

            <button type="submit" disabled={busy} style={{
              width: '100%', padding: '10px 0', borderRadius: 8, border: 'none',
              background: busy ? '#7c3a1a' : '#FF6B00', color: '#fff',
              fontSize: 14, fontWeight: 700, cursor: busy ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}>
              {busy ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
