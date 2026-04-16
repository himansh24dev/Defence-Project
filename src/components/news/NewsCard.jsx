import { ExternalLink, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const IMP = {
  critical: { bar: '#ef4444', badge: '#7f1d1d', text: '#fca5a5', label: '● CRITICAL', glow: 'rgba(239,68,68,0.15)' },
  high:     { bar: '#f97316', badge: '#7c2d12', text: '#fdba74', label: '● HIGH',     glow: 'rgba(249,115,22,0.15)' },
  medium:   { bar: '#3b82f6', badge: '#1e3a5f', text: '#93c5fd', label: '● MEDIUM',   glow: 'rgba(59,130,246,0.12)' },
  low:      { bar: '#475569', badge: '#1e293b', text: '#94a3b8', label: '● STANDARD', glow: 'rgba(71,85,105,0.1)'  },
}

export default function NewsCard({ article, featured = false }) {
  const imp = IMP[article.importance] || IMP.low

  const timeAgo = (() => {
    try { return formatDistanceToNow(new Date(article.pubDate), { addSuffix: true }) }
    catch { return 'Recently' }
  })()

  if (featured) {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover animate-fade-up"
        style={{
          display: 'block', textDecoration: 'none',
          background: '#0f1b2e',
          border: `1px solid #1a2d4a`,
          borderLeft: `3px solid ${imp.bar}`,
          borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.55), 0 0 24px ${imp.glow}, 0 0 0 1px ${imp.bar}44`
          e.currentTarget.style.borderColor = `${imp.bar}55`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.25)'
          e.currentTarget.style.borderColor = '#1a2d4a'
        }}
      >
        {article.image_url && (
          <div style={{ height: 180, overflow: 'hidden', background: '#0a0f1e' }}>
            <img
              src={article.image_url}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>
        )}
        <div style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: imp.text, background: imp.badge, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.5px' }}>
              {imp.label}
            </span>
            {article.category && (
              <span style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{article.category}</span>
            )}
          </div>
          <h3 className="line-clamp-2" style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.45, margin: '0 0 9px', transition: 'color 0.2s ease' }}>
            {article.title}
          </h3>
          <p className="line-clamp-2" style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55, margin: '0 0 12px' }}>
            {article.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 12 }}>
              <Clock size={12} />
              <span>{timeAgo}</span>
              {article.source_id && <><span>·</span><span style={{ color: '#64748b' }}>{article.source_id}</span></>}
            </div>
            <ExternalLink size={13} color="#475569" style={{ transition: 'color 0.2s', flexShrink: 0 }} />
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover-x animate-fade-up"
      style={{
        display: 'flex', gap: 14, textDecoration: 'none',
        padding: '14px 16px',
        background: '#0f1b2e',
        border: '1px solid #1a2d4a',
        borderLeft: `3px solid ${imp.bar}`,
        borderRadius: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.35), 0 0 12px ${imp.glow}`
        e.currentTarget.style.borderColor = `${imp.bar}44`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.15)'
        e.currentTarget.style.borderColor = '#1a2d4a'
      }}
    >
      {article.image_url && (
        <div style={{ width: 82, height: 82, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: '#0a0f1e' }}>
          <img
            src={article.image_url} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onError={e => { e.target.parentElement.style.display = 'none' }}
          />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: imp.text, background: imp.badge, padding: '2px 6px', borderRadius: 3, letterSpacing: '0.5px' }}>
            {imp.label}
          </span>
        </div>
        <p className="line-clamp-2" style={{ fontSize: 14, fontWeight: 500, color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 7px' }}>
          {article.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 12 }}>
          <Clock size={11} />
          <span>{timeAgo}</span>
          {article.source_id && <><span>·</span><span>{article.source_id}</span></>}
        </div>
      </div>
    </a>
  )
}
