export default function SectionHeader({ title, subtitle, icon: Icon, accent = '#FF6B00', lastUpdated }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 28 }}>
      {Icon && (
        <div className="section-header-icon" style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${accent}18`, border: `1px solid ${accent}35`,
        }}>
          {typeof Icon === 'string'
            ? <span style={{ fontSize: 22 }}>{Icon}</span>
            : <Icon size={22} color={accent} />}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h1 className="section-header-title" style={{ fontSize: 24, fontWeight: 800, color: '#f1f5f9', margin: 0, letterSpacing: '-0.5px' }}>{title}</h1>
          {lastUpdated && (
            <span style={{
              fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
              background: 'rgba(34,197,94,0.1)', color: '#4ade80',
              border: '1px solid rgba(34,197,94,0.25)', whiteSpace: 'nowrap',
            }}>
              Updated {lastUpdated}
            </span>
          )}
        </div>
        {subtitle && <p className="section-header-subtitle" style={{ color: '#94a3b8', fontSize: 13, marginTop: 4, marginBottom: 0 }}>{subtitle}</p>}
      </div>
    </div>
  )
}
