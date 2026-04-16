import NewsCard from './NewsCard'
import LoadingSpinner from '../common/LoadingSpinner'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function NewsGrid({ articles, isLoading, isError, refetch, label = 'articles' }) {
  if (isLoading) return <LoadingSpinner text="Fetching latest intelligence..." />

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-[#94a3b8]">Failed to fetch news. Check your API key in .env</p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF6B00] text-white rounded-lg text-sm hover:bg-[#e55f00] transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-[#475569] text-lg">No {label} found</p>
        <p className="text-[#334155] text-sm">Try a different category or check back later</p>
      </div>
    )
  }

  const featured = articles.slice(0, 3)
  const rest = articles.slice(3)

  return (
    <div className="space-y-6">
      {/* Featured row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featured.map((article, i) => (
          <NewsCard key={article.link || i} article={article} featured />
        ))}
      </div>

      {/* List view */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rest.map((article, i) => (
            <NewsCard key={article.link || i} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
