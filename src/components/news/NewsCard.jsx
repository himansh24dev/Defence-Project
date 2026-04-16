import { ExternalLink, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const IMP = {
  critical: { bar: '#ef4444', badge: '#7f1d1d', text: '#fca5a5', label: '● CRITICAL' },
  high:     { bar: '#f97316', badge: '#7c2d12', text: '#fdba74', label: '● HIGH' },
  medium:   { bar: '#3b82f6', badge: '#1e3a5f', text: '#93c5fd', label: '● MEDIUM' },
  low:      { bar: '#475569', badge: '#1e293b', text: '#94a3b8', label: '● STANDARD' },
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
        style={{
          display: 'block', textDecoration: 'none',
          background: '#0f1b2e', border: '1px solid #1a2d4a',
          borderLeft: `3px solid ${imp.bar}`,
          borderRadius: 12, overflow: 'hidden',
          transition: 'border-color 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#253d60'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d4a'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        {article.image_url && (
          <div style={{ height: 160, overflow: 'hidden', background: '#0a0f1e' }}>
            <img
              src={article.image_url}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.closest('.img-wrap') && (e.target.closest('.img-wrap').style.display = 'none') }}
            />
          </div>
        )}
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: imp.text, background: imp.badge, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.5px' }}>
              {imp.label}
            </span>
            {article.category && (
              <span style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{article.category}</span>
            )}
          </div>
          <h3
            className="line-clamp-2"
            style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.45, margin: '0 0 8px' }}
          >
            {article.title}
          </h3>
          <p className="line-clamp-2" style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, margin: '0 0 10px' }}>
            {article.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 11 }}>
              <Clock size={11} />
              <span>{timeAgo}</span>
              {article.source_id && <><span>·</span><span style={{ color: '#64748b' }}>{article.source_id}</span></>}
            </div>
            <ExternalLink size={12} color="#475569" />
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
      style={{
        display: 'flex', gap: 12, textDecoration: 'none',
        padding: '12px 14px',
        background: '#0f1b2e', border: '1px solid #1a2d4a',
        borderLeft: `3px solid ${imp.bar}`,
        borderRadius: 10,
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#111d35'}
      onMouseLeave={e => e.currentTarget.style.background = '#0f1b2e'}
    >
      {article.image_url && (
        <div style={{ width: 72, height: 72, flexShrink: 0, borderRadius: 7, overflow: 'hidden', background: '#0a0f1e' }}>
          <img
            src={article.image_url} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.parentElement.style.display = 'none' }}
          />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: imp.text, background: imp.badge, padding: '1.5px 5px', borderRadius: 3, letterSpacing: '0.5px' }}>
            {imp.label}
          </span>
        </div>
        <p className="line-clamp-2" style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1', lineHeight: 1.45, margin: '0 0 6px' }}>
          {article.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 11 }}>
          <Clock size={10} />
          <span>{timeAgo}</span>
          {article.source_id && <><span>·</span><span>{article.source_id}</span></>}
        </div>
      </div>
    </a>
  )
}
