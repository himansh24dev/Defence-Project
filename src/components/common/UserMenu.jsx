import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function UserMenu() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!user) {
    return (
      <button
        onClick={() => navigate('/auth')}
        style={{
          padding: '5px 12px', borderRadius: 8, border: '1px solid #FF6B00',
          background: 'transparent', color: '#FF6B00', fontSize: 12,
          fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#FF6B00'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B00' }}
      >
        Log In
      </button>
    )
  }

  const initials = user.email?.slice(0, 2).toUpperCase()
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '4px 10px 4px 4px', borderRadius: 8,
          border: '1px solid #1a2d4a', background: '#0f1b2e',
          cursor: 'pointer', transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#FF6B0066'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#1a2d4a'}
      >
        {user.user_metadata?.avatar_url ? (
          <img src={user.user_metadata.avatar_url} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B00, #e55f00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#fff',
          }}>
            {initials}
          </div>
        )}
        <span style={{ fontSize: 12, fontWeight: 500, color: '#f1f5f9', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayName}
        </span>
        <span style={{ fontSize: 9, color: '#64748b' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 6px)',
          background: '#070c1a', border: '1px solid #1a2d4a',
          borderRadius: 10, minWidth: 180, zIndex: 100,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}>
          {/* User info */}
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #1a2d4a' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9' }}>{displayName}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{user.email}</div>
          </div>

          {/* Menu items */}
          <div style={{ padding: '6px 4px' }}>
            <MenuItem icon={<User size={13} />} label="Profile" onClick={() => { navigate('/profile'); setOpen(false) }} />
            <MenuItem icon={<LogOut size={13} />} label="Sign Out" onClick={async () => { await signOut(); setOpen(false) }} danger />
          </div>
        </div>
      )}
    </div>
  )
}

function MenuItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 10px', borderRadius: 6, border: 'none',
        background: 'transparent', cursor: 'pointer', textAlign: 'left',
        color: danger ? '#f87171' : '#94a3b8', fontSize: 12.5, fontWeight: 500,
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = danger ? 'rgba(239,68,68,0.1)' : '#0f1b2e'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {icon}
      {label}
    </button>
  )
}
