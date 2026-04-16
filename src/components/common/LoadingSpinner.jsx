export default function LoadingSpinner({ text = 'Fetching intelligence…' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 16px', gap: 14 }}>
      <div style={{ position: 'relative', width: 40, height: 40 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #1a2d4a' }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#FF6B00',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
      <p style={{ color: '#475569', fontSize: 13 }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
