import { Shield, ExternalLink, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = ['National', 'International', 'Defence', 'Procurement', 'Indigenization', 'Geopolitics']

const sources = [
  { name: 'Ministry of Defence', url: 'https://mod.gov.in' },
  { name: 'DRDO', url: 'https://drdo.gov.in' },
  { name: 'PIB India', url: 'https://pib.gov.in' },
  { name: 'Indian Army', url: 'https://indianarmy.nic.in' },
  { name: 'Indian Navy', url: 'https://indiannavy.nic.in' },
  { name: 'Indian Air Force', url: 'https://indianairforce.nic.in' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#070c1a', borderTop: '1px solid #1a2d4a', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 16px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, background: '#FF6B00', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={16} color="#fff" />
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                BABA <span style={{ color: '#FF6B00' }}>YAGA</span>
              </span>
            </div>
            <p style={{ color: '#475569', fontSize: 12.5, lineHeight: 1.6, maxWidth: 280 }}>
              Comprehensive intelligence hub for SSB aspirants. All news sourced from verified, credible outlets. Updated daily.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
              Sections
            </h4>
            {sections.map(s => (
              <Link
                key={s}
                to={`/${s.toLowerCase()}`}
                style={{ display: 'block', color: '#475569', fontSize: 13, textDecoration: 'none', marginBottom: 6, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF6B00'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Developer */}
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
              Developer
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Himanshu Sharma</p>
            <a
              href="https://www.linkedin.com/in/himanshu-sharma-78a388201"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 12.5, textDecoration: 'none', marginBottom: 6, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#0a66c2'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              www.linkedin.com/in/himanshu-sharma-78a388201
            </a>
            <a
              href="mailto:himansh24dev@gmail.com"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 12.5, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FF6B00'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >
              <Mail size={13} />
              himansh24dev@gmail.com
            </a>
          </div>

          {/* Official sources */}
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
              Official Sources
            </h4>
            {sources.map(item => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#475569', fontSize: 13, textDecoration: 'none', marginBottom: 6, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF6B00'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >
                {item.name}
                <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ borderTop: '1px solid #1a2d4a', paddingTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#334155', fontSize: 11 }}>
            &copy; {new Date().getFullYear()} Hoga Hoga Sabka Hoga
          </p>
          <p style={{ color: '#334155', fontSize: 11 }}>
            News: NewsData.io · GNews · PIB · MoD
          </p>
        </div>
      </div>
    </footer>
  )
}
