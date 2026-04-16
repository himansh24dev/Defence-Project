import { Shield } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function Defence() {
  const { data, isLoading, isError, refetch } = useNews('defence', 'india defence military army navy airforce LAC border security')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="Defence & Military" subtitle="Indian Armed Forces — operations, exercises, strategy, borders" icon={Shield} accent="#ef4444" />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
