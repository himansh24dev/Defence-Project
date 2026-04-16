// Stopwords to ignore when scoring
const STOP = new Set([
  'the','a','an','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall',
  'and','but','or','nor','for','so','yet','in','on','at','to','of','by','with',
  'from','into','about','as','its','it','this','that','these','those','what',
  'which','who','whom','how','when','where','why','india','indian',
])

/**
 * Score a text against query tokens.
 * Title hits count 3×, description hits count 1×.
 */
function scoreArticle(article, queryTokens) {
  let score = 0
  const title = (article.title || '').toLowerCase()
  const desc  = (article.description || '').toLowerCase()
  for (const token of queryTokens) {
    if (title.includes(token))  score += 3
    if (desc.includes(token))   score += 1
  }
  return score
}

/**
 * Tokenize a string into meaningful words (≥ 3 chars, not stopwords).
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !STOP.has(w))
}

/**
 * Given a user query and a flat array of articles,
 * return the top N most relevant articles (score > 0 only).
 */
export function findRelevantArticles(query, articles, topN = 5) {
  if (!query || !articles?.length) return []
  const tokens = tokenize(query)
  if (!tokens.length) return []

  return articles
    .map(a => ({ a, s: scoreArticle(a, tokens) }))
    .filter(({ s }) => s > 0)
    .sort((x, y) => y.s - x.s)
    .slice(0, topN)
    .map(({ a }) => a)
}

/**
 * Format matched articles into a compact context block for the LLM.
 */
export function buildContextBlock(articles) {
  if (!articles.length) return ''
  return articles
    .map((a, i) => {
      const date   = a.pubDate ? new Date(a.pubDate).toDateString() : 'Recent'
      const source = a.source_id || a.provider || 'Unknown'
      const desc   = a.description ? `\n${a.description.slice(0, 220)}` : ''
      return `[${i + 1}] ${a.title}\nSource: ${source} | ${date}${desc}`
    })
    .join('\n\n')
}
