import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, Search } from 'lucide-react'
import UserMenu from '../common/UserMenu'

const navLinks = [
  { label: 'Home',            path: '/' },
  { label: 'Weapons & Equip', path: '/weapons' },
  { label: 'Regiments',       path: '/regiments' },
  { label: 'Geopolitics',     path: '/geopolitics' },
  { label: 'Gov Schemes',     path: '/schemes' },
  { label: 'Defence Orgs',    path: '/orgs' },
  { label: 'Operations',      path: '/operations' },
  { label: 'Ranks & Medals',  path: '/ranks' },
  { label: 'Practice',        path: '/practice' },
  { label: 'Know Your Forces', path: '/forces' },
  { label: 'India Map',        path: '/map' },
]

export default function Header({ onSearchOpen }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#070c1a',
        borderBottom: '1px solid #1a2d4a',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.5)',
      }}
    >
      {/* Indian tricolor top stripe */}
      <div style={{ display: 'flex', height: 3 }}>
        <div style={{ flex: 1, background: '#FF6B00' }} />
        <div style={{ flex: 1, background: '#ffffff', opacity: 0.7 }} />
        <div style={{ flex: 1, background: '#138808' }} />
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px' }}>
        {/* Logo + actions row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #FF6B00, #e55f00)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Shield size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                <span style={{ color: '#fff' }}>BABA </span>
                <span style={{ color: '#FF6B00' }}>YAGA</span>
              </div>
              <div style={{ fontSize: 9, color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: 1 }}>
                Defence Intelligence Hub
              </div>
            </div>
          </Link>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Live indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: '#0f1b2e', border: '1px solid #1a2d4a',
              borderRadius: 999, padding: '4px 10px',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#94a3b8', fontSize: 11 }}>LIVE</span>
            </div>
            {/* User */}
            <UserMenu />
            {/* Search */}
            <button
              onClick={onSearchOpen}
              style={{
                background: 'none', border: '1px solid #1a2d4a',
                borderRadius: 8, padding: '6px 8px', cursor: 'pointer',
                color: '#94a3b8', display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#253d60' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#1a2d4a' }}
            >
              <Search size={16} />
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: 'none', border: '1px solid #1a2d4a',
                borderRadius: 8, padding: '6px 8px', cursor: 'pointer',
                color: '#94a3b8', display: 'none',
              }}
              className="mobile-menu-btn"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav
          style={{
            display: 'flex',
            gap: 2,
            paddingBottom: 8,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="desktop-nav"
        >
          {navLinks.map(link => {
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={active ? '' : 'nav-link-animate'}
                style={{
                  padding: '5px 11px',
                  borderRadius: 7,
                  fontSize: 12.5,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#fff' : '#94a3b8',
                  background: active ? '#FF6B00' : 'transparent',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1)',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#1a2d4a'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' } }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile nav */}
      {open && (
        <div style={{ borderTop: '1px solid #1a2d4a', padding: '8px 16px 12px' }} className="mobile-nav">
          {navLinks.map(link => {
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '9px 12px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? '#fff' : '#94a3b8',
                  background: active ? '#FF6B00' : 'transparent',
                  textDecoration: 'none',
                  marginBottom: 2,
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}

      {/* Responsive CSS via style tag workaround */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </header>
  )
}
