import { ShoppingBag } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import SectionHeader from '../components/common/SectionHeader'

export default function Procurement() {
  const { data, isLoading, isError, refetch } = useNews('defence', 'india defence procurement contract acquisition weapons deal MoD')

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <SectionHeader
        title="Defence Procurement"
        subtitle="Arms deals, MOD acquisitions, defence contracts, and equipment purchases"
        icon={ShoppingBag}
        accent="#8b5cf6"
      />
      <NewsGrid articles={data} isLoading={isLoading} isError={isError} refetch={refetch} label="procurement news" />
    </div>
  )
}
