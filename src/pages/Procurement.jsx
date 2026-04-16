import { ShoppingBag } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function Procurement() {
  const { data, isLoading, isError, refetch } = useNews('defence', 'india defence procurement contract acquisition weapons deal MoD DAC')
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 16px' }}>
      <SectionHeader title="Defence Procurement" subtitle="Arms deals, MOD acquisitions, DAC approvals, defence contracts" icon={ShoppingBag} accent="#8b5cf6" />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}
