import { Shield } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function Defence() {
  const { data, isLoading, isError, refetch } = useNews('defence', 'india defence military army navy airforce security LAC border')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="Defence & Military"
        subtitle="Indian Armed Forces — operations, exercises, strategy, borders, and security"
        icon={Shield}
        accent="#ef4444"
      />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="defence news" />
    </div>
  )
}
