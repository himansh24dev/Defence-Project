import { Rocket } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const agencies = [
  { name: 'DRDO',  full: 'Defence R&D Organisation',       color: '#3b82f6' },
  { name: 'ISRO',  full: 'Indian Space Research Org.',     color: '#f97316' },
  { name: 'HAL',   full: 'Hindustan Aeronautics Limited',  color: '#10b981' },
  { name: 'DAE',   full: 'Dept. of Atomic Energy',         color: '#a78bfa' },
  { name: 'CSIR',  full: 'Council of Scientific Research', color: '#22d3ee' },
  { name: 'CDAC',  full: 'Centre for Dev. of Adv. Computing', color: '#fbbf24' },
]

export default function ScienceTech() {
  const { data, isLoading, isError, refetch } = useNews('science', 'India DRDO ISRO technology space defence AI cyber nuclear missile satellite Chandrayaan Gaganyaan')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="Science & Technology" subtitle="DRDO, ISRO, AI, cyber, space, nuclear — India's technological edge" icon={Rocket} accent="#06b6d4" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8, marginBottom: 28 }}>
        {agencies.map(a => (
          <div key={a.name} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '12px 14px', borderLeft: `3px solid ${a.color}` }}>
            <p style={{ color: a.color, fontWeight: 800, fontSize: 15, margin: '0 0 3px' }}>{a.name}</p>
            <p style={{ color: '#475569', fontSize: 11, margin: 0, lineHeight: 1.45 }}>{a.full}</p>
          </div>
        ))}
      </div>

      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
