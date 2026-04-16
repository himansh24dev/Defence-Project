import { BookOpen } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const schemes = [
  { name: 'Agnipath / Agniveer',    dept: 'MoD',       desc: 'Short-term military recruitment for youth 17.5–21 yrs. 4-year engagement; 25% retained as regular soldiers.' },
  { name: 'Make in India (Defence)',dept: 'MoD/DPIIT', desc: 'Two Positive Indigenisation Lists barring import of 509 items. 75% defence procurement from domestic sources by 2047.' },
  { name: 'iDEX',                   dept: 'MoD',       desc: 'Innovations for Defence Excellence — startup ecosystem for defence tech. ₹500 cr+ committed. 350+ contracts.' },
  { name: 'ADITI Scheme',           dept: 'MoD/iDEX',  desc: 'Acing Development of Innovative Technologies with iDEX — ₹25 cr grants for deep-tech defence startups.' },
  { name: 'Defence Corridors',      dept: 'MoD',       desc: 'UP (Lucknow–Aligarh–Agra–Kanpur) and Tamil Nadu corridors. Target: ₹35,000 cr manufacturing by 2025.' },
  { name: 'PM Gati Shakti',         dept: 'MoCI',      desc: 'National Master Plan for multimodal connectivity. 16 ministries on one platform. Key for strategic infrastructure.' },
  { name: 'Atmanirbhar Bharat',     dept: 'GoI',       desc: 'Self-reliance mission across sectors. Defence: ₹1.72 lakh cr domestic procurement in 2025–26 budget.' },
  { name: 'Sagarmala',              dept: 'MoPSW',     desc: 'Port-led development, coastal shipping modernisation — dual-use with coastal defence and SSBN basing.' },
  { name: 'Digital India',          dept: 'MeitY',     desc: 'Digital infrastructure + governance. Cybersecurity angle increasingly important for defence preparedness.' },
  { name: 'PM KUSUM',               dept: 'MNRE',      desc: 'Solar for farmers — strategic energy independence reduces import dependence.' },
  { name: 'Ayushman Bharat',        dept: 'MoHFW',     desc: 'Health cover ₹5 lakh/family for 50 cr beneficiaries. Ex-servicemen also covered under ECHS.' },
  { name: 'SWAYAM / NCC',           dept: 'MoE/MoD',   desc: 'Free online courses + NCC expansion to 20 lakh cadets by 2024. SSB-relevant military preparedness.' },
]

export default function Schemes() {
  const { data, isLoading, isError, refetch } = useNews('politics', 'india government scheme policy yojana programme welfare infrastructure budget')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="Government Schemes & Policies" subtitle="Key central government schemes — defence, economic, social | SSB GD quick reference" icon={BookOpen} accent="#a855f7" />

      <p style={{ fontSize: 11, color: '#475569', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>Key Schemes — Quick Reference</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10, marginBottom: 32 }}>
        {schemes.map(s => (
          <div key={s.name} style={{ background: '#0f1b2e', border: '1px solid #1a2d4a', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
              <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, margin: 0 }}>{s.name}</p>
              <span style={{ fontSize: 9.5, color: '#475569', background: '#0a0f1e', padding: '2px 7px', borderRadius: 4, border: '1px solid #1a2d4a', flexShrink: 0 }}>{s.dept}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: 12, margin: 0, lineHeight: 1.55 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <SectionHeader title="Latest Policy News" subtitle="" icon={null} accent="#a855f7" />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
