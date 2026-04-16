import NewsCard from './NewsCard'
import LoadingSpinner from '../common/LoadingSpinner'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function NewsGrid({ articles, isLoading, isError, refetch }) {
  if (isLoading) return <LoadingSpinner text="Fetching latest intelligence…" />

  if (isError) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 16px', gap: 14 }}>
        <AlertCircle size={36} color="#ef4444" />
        <p style={{ color: '#94a3b8', fontSize: 14 }}>Could not fetch news — check your API keys in .env.local</p>
        <button
          onClick={refetch}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#FF6B00', color: '#fff', border: 'none',
            padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 16px', gap: 8 }}>
        <p style={{ color: '#475569', fontSize: 15 }}>No articles found</p>
        <p style={{ color: '#334155', fontSize: 12 }}>Add API keys and run <code style={{ color: '#FF6B00' }}>vercel dev</code></p>
      </div>
    )
  }

  const featured = articles.slice(0, 3)
  const rest = articles.slice(3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Featured 3-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {featured.map((a, i) => <NewsCard key={a.link || i} article={a} featured />)}
      </div>
      {/* List */}
      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 10 }}>
          {rest.map((a, i) => <NewsCard key={a.link || i} article={a} />)}
        </div>
      )}
    </div>
  )
}
