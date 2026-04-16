import { Globe } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function International() {
  const { data, isLoading, isError, refetch } = useNews('world', 'international geopolitics foreign affairs UN diplomacy')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="International Affairs"
        subtitle="Global news — diplomacy, geopolitics, conflicts, bilateral relations"
        icon={Globe}
        accent="#3b82f6"
      />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="international news" />
    </div>
  )
}
