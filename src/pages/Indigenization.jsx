import { Cpu } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const highlights = [
  { label: 'Tejas Fighter', desc: 'India\'s homegrown Light Combat Aircraft by HAL' },
  { label: 'Arjun MBT', desc: 'Made-in-India Main Battle Tank by DRDO/HVF' },
  { label: 'Akash SAM', desc: 'Surface-to-Air Missile system by DRDO' },
  { label: 'INS Vikrant', desc: 'India\'s first domestically built aircraft carrier' },
  { label: 'Prachand', desc: 'LCH Light Combat Helicopter by HAL' },
  { label: 'Pinaka MLRS', desc: 'Multi-Barrel Rocket Launcher by DRDO' },
]

export default function Indigenization() {
  const { data, isLoading, isError, refetch } = useNews('science', 'india indigenization make in india DRDO HAL BEL BDL defence manufacturing atmanirbhar')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="Indigenization"
        subtitle="Make in India — DRDO breakthroughs, HAL, BEL, Atmanirbhar Bharat in defence"
        icon={Cpu}
        accent="#10b981"
      />

      {/* Key programs highlight */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {highlights.map(h => (
          <div key={h.label} className="bg-[#0f172a] border border-[#1e2d4a] rounded-xl p-3 hover:border-[#10b981]/40 transition-colors">
            <p className="text-[#10b981] font-semibold text-xs">{h.label}</p>
            <p className="text-[#475569] text-[10px] mt-1 leading-snug">{h.desc}</p>
          </div>
        ))}
      </div>

      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="indigenization news" />
    </div>
  )
}
