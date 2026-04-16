import { Flag } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function National() {
  const { data, isLoading, isError, refetch } = useNews('national', 'india government politics policy economy')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="National Affairs" subtitle="India's domestic affairs — politics, governance, economy, social issues" icon={Flag} accent="#f97316" />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
