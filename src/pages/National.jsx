import { Flag } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function National() {
  const { data, isLoading, isError, refetch } = useNews('national', 'india government politics policy economy')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="National Affairs"
        subtitle="Latest news from across India — politics, governance, economy, social issues"
        icon={Flag}
        accent="#FF6B00"
      />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="national news" />
    </div>
  )
}
