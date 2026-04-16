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

// ── Prompt-injection sanitizer (mirrors api/_sanitize.js) ─────────────
const INJECTION_PATTERNS = [
  /<\/?\s*news_context\s*>/gi,
  /\[INST\]|\[\/INST\]/g,
  /<<SYS>>|<<\/SYS>>/g,
  /<\/?s>/g,
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/gi,
  /new\s+(system\s+)?instructions?/gi,
  /you\s+are\s+now\s+/gi,
  /\bsystem\s*:/gi,
  /\bassistant\s*:/gi,
  /\buser\s*:/gi,
]

function sanitize(text, maxLen = 400) {
  if (!text || typeof text !== 'string') return ''
  let s = text.slice(0, maxLen)
  for (const p of INJECTION_PATTERNS) s = s.replace(p, ' ')
  return s.replace(/\s{2,}/g, ' ').trim()
}

/**
 * Format matched articles into a compact, injection-safe context block for the LLM.
 */
export function buildContextBlock(articles) {
  if (!articles.length) return ''
  return articles
    .map((a, i) => {
      const title  = sanitize(a.title, 200)
      const desc   = sanitize(a.description, 300)
      const date   = a.pubDate ? new Date(a.pubDate).toDateString() : 'Recent'
      const source = sanitize(a.source_id || a.provider || 'Unknown', 60)
      return `[${i + 1}] ${title}\nSource: ${source} | ${date}${desc ? '\n' + desc : ''}`
    })
    .join('\n\n')
}
