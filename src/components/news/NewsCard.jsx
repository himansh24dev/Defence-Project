import { ExternalLink, Clock, Tag, TrendingUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const importanceColors = {
  critical: { bg: 'bg-red-900/40', border: 'border-red-500/40', text: 'text-red-400', label: 'CRITICAL' },
  high:     { bg: 'bg-orange-900/30', border: 'border-orange-500/40', text: 'text-orange-400', label: 'HIGH' },
  medium:   { bg: 'bg-blue-900/30', border: 'border-blue-500/30', text: 'text-blue-400', label: 'MEDIUM' },
  low:      { bg: 'bg-slate-800/60', border: 'border-slate-600/30', text: 'text-slate-400', label: 'STANDARD' },
}

export default function NewsCard({ article, featured = false }) {
  const imp = importanceColors[article.importance] || importanceColors.low
  const timeAgo = article.pubDate
    ? formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })
    : 'Recently'

  if (featured) {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block rounded-2xl overflow-hidden border ${imp.border} ${imp.bg} hover:scale-[1.01] transition-all duration-200 shadow-lg`}
      >
        {article.image_url && (
          <div className="h-52 overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${imp.border} ${imp.text} uppercase tracking-wider`}>
              {imp.label}
            </span>
            {article.category && (
              <span className="text-[10px] text-[#64748b] uppercase tracking-wider">{article.category}</span>
            )}
          </div>
          <h3 className="text-white font-semibold text-base leading-snug group-hover:text-[#FF6B00] transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-[#94a3b8] text-sm line-clamp-2 leading-relaxed mb-3">{article.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#475569] text-xs">
              <Clock className="w-3 h-3" />
              <span>{timeAgo}</span>
              {article.source_id && (
                <>
                  <span className="text-[#2d3f55]">·</span>
                  <span className="text-[#64748b]">{article.source_id}</span>
                </>
              )}
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#FF6B00] transition-colors" />
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex gap-3 p-4 rounded-xl border ${imp.border} bg-[#0f172a]/80 hover:bg-[#1e2d4a]/60 transition-all duration-200`}
    >
      {article.image_url && (
        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.parentElement.style.display = 'none' }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${imp.border} ${imp.text} uppercase tracking-wider`}>
            {imp.label}
          </span>
          {article.category && (
            <span className="text-[9px] text-[#475569] uppercase tracking-wider">{article.category}</span>
          )}
        </div>
        <h3 className="text-[#cbd5e1] text-sm font-medium leading-snug group-hover:text-white transition-colors line-clamp-2 mb-1">
          {article.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[#475569] text-xs">
          <Clock className="w-3 h-3" />
          <span>{timeAgo}</span>
          {article.source_id && (
            <>
              <span>·</span>
              <span>{article.source_id}</span>
            </>
          )}
        </div>
      </div>
    </a>
  )
}
