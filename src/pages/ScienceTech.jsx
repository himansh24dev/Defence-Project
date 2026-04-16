import { Rocket } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const agencies = [
  { name: 'DRDO', full: 'Defence Research & Development Organisation' },
  { name: 'ISRO', full: 'Indian Space Research Organisation' },
  { name: 'HAL', full: 'Hindustan Aeronautics Limited' },
  { name: 'DAE', full: 'Dept. of Atomic Energy' },
  { name: 'CSIR', full: 'Council of Scientific & Industrial Research' },
  { name: 'C-DAC', full: 'Centre for Development of Advanced Computing' },
]

export default function ScienceTech() {
  const { data, isLoading, isError, refetch } = useNews('science', 'India DRDO ISRO technology space defence AI cyber innovation research nuclear missile satellite')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="Science & Technology"
        subtitle="DRDO, ISRO, AI, cyber, space, nuclear — India's technological edge"
        icon={Rocket}
        accent="#06b6d4"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {agencies.map(a => (
          <div key={a.name} className="bg-[#0f172a] border border-[#1e2d4a] rounded-xl p-3 hover:border-[#06b6d4]/40 transition-colors">
            <p className="text-[#06b6d4] font-bold text-sm">{a.name}</p>
            <p className="text-[#475569] text-[10px] mt-1 leading-snug">{a.full}</p>
          </div>
        ))}
      </div>

      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="science & tech news" />
    </div>
  )
}
