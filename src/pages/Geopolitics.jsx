import { Map } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

const flashpoints = [
  { name: 'India–Pakistan', status: 'Tense', color: 'text-red-400' },
  { name: 'India–China LAC', status: 'Monitored', color: 'text-orange-400' },
  { name: 'Russia–Ukraine', status: 'Conflict', color: 'text-red-400' },
  { name: 'Israel–Gaza', status: 'Conflict', color: 'text-red-400' },
  { name: 'South China Sea', status: 'Volatile', color: 'text-orange-400' },
  { name: 'Taiwan Strait', status: 'Tense', color: 'text-orange-400' },
  { name: 'Korean Peninsula', status: 'Monitored', color: 'text-yellow-400' },
  { name: 'Red Sea', status: 'Volatile', color: 'text-orange-400' },
]

export default function Geopolitics() {
  const { data, isLoading, isError, refetch } = useNews('politics', 'geopolitics strategic affairs India China Pakistan Russia NATO UN Security Council border conflict diplomacy')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="Geopolitics & Strategic Affairs"
        subtitle="Global flashpoints, strategic competition, alliances, and India's foreign policy"
        icon={Map}
        accent="#f59e0b"
      />

      {/* Global flashpoints */}
      <div className="mb-8">
        <h2 className="text-[#94a3b8] text-xs uppercase tracking-wider mb-3">Active Global Flashpoints</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {flashpoints.map(fp => (
            <div key={fp.name} className="bg-[#0f172a] border border-[#1e2d4a] rounded-xl p-3 flex items-center justify-between">
              <span className="text-[#cbd5e1] text-xs font-medium">{fp.name}</span>
              <span className={`text-[10px] font-semibold ${fp.color}`}>{fp.status}</span>
            </div>
          ))}
        </div>
      </div>

      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="geopolitics news" />
    </div>
  )
}
