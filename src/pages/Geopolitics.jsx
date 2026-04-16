import { Map } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const flashpoints = [
  { name: 'India–Pakistan', status: 'Tense',    color: '#ef4444' },
  { name: 'India–China LAC', status: 'Monitored', color: '#f97316' },
  { name: 'Russia–Ukraine', status: 'Conflict',  color: '#ef4444' },
  { name: 'Israel–Gaza',    status: 'Conflict',  color: '#ef4444' },
  { name: 'South China Sea',status: 'Volatile',  color: '#f97316' },
  { name: 'Taiwan Strait',  status: 'Tense',     color: '#f97316' },
  { name: 'Korean Peninsula',status:'Monitored', color: '#fbbf24' },
  { name: 'Red Sea–Houthi', status: 'Volatile',  color: '#f97316' },
]

export default function Geopolitics() {
  const { data, isLoading, isError, refetch } = useNews('politics', 'geopolitics strategic India China Pakistan Russia NATO UN Security Council border conflict diplomacy')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="Geopolitics & Strategic Affairs" subtitle="Global flashpoints, alliances, India's foreign policy, strategic competition" icon={Map} accent="#f59e0b" />

      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, color: '#475569', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Active Global Flashpoints</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 8 }}>
          {flashpoints.map(fp => (
            <div key={fp.name} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 9, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#cbd5e1', fontSize: 12.5, fontWeight: 500 }}>{fp.name}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: fp.color }}>{fp.status}</span>
            </div>
          ))}
        </div>
      </div>

      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
