export default function SectionHeader({ title, subtitle, icon: Icon, accent = '#FF6B00' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 28 }}>
      {Icon && (
        <div style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${accent}18`, border: `1px solid ${accent}35`,
        }}>
          <Icon size={22} color={accent} />
        </div>
      )}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#f1f5f9', margin: 0, letterSpacing: '-0.5px' }}>{title}</h1>
        {subtitle && <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{subtitle}</p>}
      </div>
    </div>
  )
}
