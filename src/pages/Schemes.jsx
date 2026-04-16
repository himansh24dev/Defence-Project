import { BookOpen } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const majorSchemes = [
  { name: 'Agnipath', dept: 'Ministry of Defence', desc: 'Short-term military recruitment scheme for youth aged 17.5–21.' },
  { name: 'Make in India (Defence)', dept: 'MoD / DPIIT', desc: 'Promotes domestic defence manufacturing; two positive indigenisation lists issued.' },
  { name: 'PM Gati Shakti', dept: 'Ministry of Commerce', desc: 'National Master Plan for infrastructure connectivity.' },
  { name: 'Atmanirbhar Bharat', dept: 'GoI', desc: 'Self-reliance across sectors including defence, pharma, electronics.' },
  { name: 'iDEX (Innovations for Defence)', dept: 'MoD', desc: 'Startup ecosystem for defence tech innovation.' },
  { name: 'ADITI Scheme', dept: 'MoD / iDEX', desc: 'Acing Development of Innovative Technologies with iDEX — ₹25 cr grants for deep-tech.' },
  { name: 'Defence Corridors', dept: 'MoD', desc: 'UP (Lucknow–Aligarh–Agra) and Tamil Nadu corridors for defence manufacturing.' },
  { name: 'PM KUSUM', dept: 'MNRE', desc: 'Solar energy for farmers — dual-use with strategic energy security aspects.' },
  { name: 'Digital India', dept: 'MeitY', desc: 'Digital infrastructure, governance, services, and empowerment.' },
  { name: 'Ayushman Bharat', dept: 'Ministry of Health', desc: 'Health insurance for 50 cr beneficiaries — also covers armed forces families.' },
  { name: 'SWAYAM', dept: 'MoE', desc: 'National online education platform — includes NCC, defence studies content.' },
  { name: 'Sagarmala', dept: 'Ministry of Ports', desc: 'Port-led development — strategic coastal security implications.' },
]

export default function Schemes() {
  const { data, isLoading, isError, refetch } = useNews('politics', 'india government scheme policy yojana programme launch welfare infrastructure')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="Government Schemes & Policies"
        subtitle="Key central government schemes, policies, and programmes relevant for SSB GD"
        icon={BookOpen}
        accent="#a855f7"
      />

      {/* Static scheme reference */}
      <div className="mb-10">
        <h2 className="text-[#94a3b8] text-xs uppercase tracking-wider mb-4">Key Schemes — Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {majorSchemes.map(s => (
            <div key={s.name} className="bg-[#0f172a] border border-[#1e2d4a] rounded-xl p-4 hover:border-[#a855f7]/40 transition-colors">
              <div className="flex items-start justify-between mb-1.5">
                <p className="text-white font-semibold text-sm">{s.name}</p>
                <span className="text-[9px] text-[#475569] bg-[#0a0f1e] px-2 py-0.5 rounded-full border border-[#1e2d4a] shrink-0 ml-2">
                  {s.dept}
                </span>
              </div>
              <p className="text-[#64748b] text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-white font-semibold text-lg mb-4">Latest Policy News</h2>
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="policy news" />
    </div>
  )
}
