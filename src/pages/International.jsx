import { Globe } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function International() {
  const { data, isLoading, isError, refetch } = useNews('world', 'international geopolitics foreign affairs UN diplomacy')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="International Affairs" subtitle="Global news — diplomacy, conflicts, bilateral relations, UN" icon={Globe} accent="#3b82f6" />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
