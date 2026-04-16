import { Cpu } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const highlights = [
  { label: 'Tejas Mk1A',  desc: 'HAL\'s LCA — first batch delivered to IAF 18 Sqn (2025)' },
  { label: 'INS Vikrant', desc: 'India\'s first domestically built aircraft carrier (76% indigenous)' },
  { label: 'Arjun Mk1A', desc: '118 indigenous MBTs for Indian Army — 75+ delivered' },
  { label: 'Akash-NG',   desc: '70 km range SAM by DRDO — export orders received' },
  { label: 'Prachand LCH',desc: 'Indigenous attack helicopter — 10+ in service with IAF & Army' },
  { label: 'BrahMos ER', desc: '450 km+ extended range — exported to Philippines (2022)' },
]

export default function Indigenization() {
  const { data, isLoading, isError, refetch } = useNews('science', 'india indigenization DRDO HAL BEL BDL atmanirbhar defence manufacturing Make in India')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="Indigenization" subtitle="Make in India Defence — DRDO, HAL, BEL, Atmanirbhar Bharat Raksha Udyog" icon={Cpu} accent="#10b981" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 28 }}>
        {highlights.map(h => (
          <div key={h.label} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 10, padding: '12px 14px', borderLeft: '3px solid #10b981' }}>
            <p style={{ color: '#4ade80', fontWeight: 700, fontSize: 13, margin: '0 0 4px' }}>{h.label}</p>
            <p style={{ color: '#475569', fontSize: 11.5, margin: 0, lineHeight: 1.5 }}>{h.desc}</p>
          </div>
        ))}
      </div>

      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
