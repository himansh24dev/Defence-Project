import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, Search, Bell } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'National', path: '/national' },
  { label: 'International', path: '/international' },
  { label: 'Defence', path: '/defence' },
  { label: 'Procurement', path: '/procurement' },
  { label: 'Indigenization', path: '/indigenization' },
  { label: 'Geopolitics', path: '/geopolitics' },
  { label: 'Sci & Tech', path: '/science-tech' },
  { label: 'Schemes', path: '/schemes' },
  { label: 'Weapons & Equipment', path: '/weapons' },
]

export default function Header({ onSearchOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-[#070c1a] border-b border-[#1e2d4a] shadow-lg">
      {/* Top bar - tricolor strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF6B00]" />
        <div className="flex-1 bg-white opacity-80" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4">
        {/* Logo row */}
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">SSB</span>
              <span className="text-[#FF6B00] font-bold text-xl tracking-tight">Pulse</span>
              <p className="text-[#64748b] text-[10px] tracking-widest uppercase">Defence Intelligence Hub</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={onSearchOpen}
              className="p-2 text-[#94a3b8] hover:text-white hover:bg-[#1e2d4a] rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-1 bg-[#0f1a2e] px-3 py-1.5 rounded-full border border-[#1e2d4a]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[#94a3b8] text-xs">Live</span>
            </div>
            <button
              className="md:hidden p-2 text-[#94a3b8] hover:text-white rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Nav row - desktop */}
        <nav className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                location.pathname === link.path
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#1e2d4a]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#070c1a] border-t border-[#1e2d4a] px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-[#FF6B00] text-white'
                    : 'text-[#94a3b8] hover:text-white hover:bg-[#1e2d4a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
