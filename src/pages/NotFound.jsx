import { Link } from 'react-router-dom'
import { Shield, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 16px', flexDirection: 'column', textAlign: 'center',
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 20, marginBottom: 24,
        background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Shield size={36} color="#FF6B00" />
      </div>

      <div style={{ fontSize: 72, fontWeight: 900, color: '#FF6B00', lineHeight: 1, marginBottom: 8, letterSpacing: '-2px' }}>
        404
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 10px' }}>
        Mission Objective Not Found
      </h1>
      <p style={{ fontSize: 14, color: '#64748b', maxWidth: 360, lineHeight: 1.7, marginBottom: 32 }}>
        The page you're looking for doesn't exist or has been moved. Fall back to base and regroup.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          to="/"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 10,
            background: '#FF6B00', color: '#fff',
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(255,107,0,0.35)',
          }}
        >
          <ArrowLeft size={16} /> Return to Base
        </Link>
        <Link
          to="/weapons"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 10,
            background: 'transparent', color: '#94a3b8',
            fontWeight: 600, fontSize: 14, textDecoration: 'none',
            border: '1px solid #1a2d4a',
          }}
        >
          Weapons Database
        </Link>
      </div>
    </div>
  )
}
