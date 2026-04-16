export default function LoadingSpinner({ text = 'Fetching intelligence…' }) {
  return (
    <div style={{ padding: '24px 0' }}>
      {/* Shimmer skeleton cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginBottom: 16 }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.08}s`, background: '#0f1b2e', borderRadius: 12, overflow: 'hidden', border: '1px solid #1a2d4a' }}>
            <div className="skeleton" style={{ height: 160, borderRadius: 0 }} />
            <div style={{ padding: '14px 16px' }}>
              <div className="skeleton skeleton-text" style={{ width: '40%' }} />
              <div className="skeleton skeleton-text" style={{ width: '90%', height: 15 }} />
              <div className="skeleton skeleton-text" style={{ width: '75%', height: 15 }} />
              <div className="skeleton skeleton-text" style={{ width: '55%', marginBottom: 0 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Compact row skeletons */}
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${0.3 + i * 0.06}s`, display: 'flex', gap: 14, padding: '14px 16px', background: '#0f1b2e', borderRadius: 10, border: '1px solid #1a2d4a', marginBottom: 8 }}>
          <div className="skeleton" style={{ width: 82, height: 82, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
            <div className="skeleton skeleton-text" style={{ width: '30%' }} />
            <div className="skeleton skeleton-text" style={{ width: '85%', height: 15 }} />
            <div className="skeleton skeleton-text" style={{ width: '60%', height: 15 }} />
            <div className="skeleton skeleton-text" style={{ width: '40%', marginBottom: 0 }} />
          </div>
        </div>
      ))}

      <p style={{ textAlign: 'center', color: '#334155', fontSize: 12, marginTop: 20, letterSpacing: '1px', textTransform: 'uppercase' }}>
        {text}
      </p>
    </div>
  )
}
