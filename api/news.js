// Vercel Serverless Function — /api/news

const CATEGORY_MAP = {
  national:  { newsdata: 'politics',  gnews: 'nation',     query: 'india' },
  world:     { newsdata: 'world',     gnews: 'world',      query: '' },
  defence:   { newsdata: 'politics',  gnews: 'nation',     query: 'india defence military' },
  science:   { newsdata: 'science',   gnews: 'technology', query: 'india' },
  politics:  { newsdata: 'politics',  gnews: 'world',      query: '' },
}

const GLOBAL_CATEGORIES = new Set(['world', 'politics'])

async function fetchNewsData(category, query, apiKey) {
  const mapped = CATEGORY_MAP[category] || CATEGORY_MAP.national
  const params = new URLSearchParams({
    apikey:   apiKey,
    language: 'en',
    category: mapped.newsdata,
  })
  if (!GLOBAL_CATEGORIES.has(category)) params.set('country', 'in')
  const q = query || mapped.query
  if (q) params.set('q', q)

  const url = `https://newsdata.io/api/1/news?${params}`
  console.log('[NewsData] Fetching:', url.replace(apiKey, 'KEY_HIDDEN'))

  const res = await fetch(url)
  const data = await res.json()

  if (!res.ok) {
    console.error('[NewsData] Error:', res.status, data)
    throw new Error(`NewsData ${res.status}: ${JSON.stringify(data)}`)
  }

  const articles = data.results || []
  console.log(`[NewsData] Got ${articles.length} articles`)

  return articles.map(a => ({
    title:       a.title,
    description: a.description,
    link:        a.link,
    pubDate:     a.pubDate,
    source_id:   a.source_id,
    image_url:   a.image_url,
    category:    a.category?.[0] || category,
    provider:    'newsdata',
  }))
}

async function fetchGNews(category, query, apiKey) {
  const mapped = CATEGORY_MAP[category] || CATEGORY_MAP.national
  const params = new URLSearchParams({
    token: apiKey,
    lang:  'en',
    topic: mapped.gnews,
    max:   '10',
  })
  if (!GLOBAL_CATEGORIES.has(category)) params.set('country', 'in')
  if (query) params.set('q', query)

  const url = `https://gnews.io/api/v4/top-headlines?${params}`
  console.log('[GNews] Fetching:', url.replace(apiKey, 'KEY_HIDDEN'))

  const res = await fetch(url)
  const data = await res.json()

  if (!res.ok) {
    console.error('[GNews] Error:', res.status, data)
    throw new Error(`GNews ${res.status}: ${JSON.stringify(data)}`)
  }

  const articles = data.articles || []
  console.log(`[GNews] Got ${articles.length} articles`)

  return articles.map(a => ({
    title:       a.title,
    description: a.description,
    link:        a.url,
    pubDate:     a.publishedAt,
    source_id:   a.source?.name,
    image_url:   a.image,
    category:    category,
    provider:    'gnews',
  }))
}

function deduplicateByTitle(articles) {
  const seen = new Set()
  return articles.filter(a => {
    const key = a.title?.slice(0, 60).toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export default async function handler(req, res) {
  const { category = 'national', query = '' } = req.query
  console.log(`\n[/api/news] category=${category} query="${query}"`)

  const NEWSDATA_KEY = process.env.NEWSDATA_API_KEY
  const GNEWS_KEY    = process.env.GNEWS_API_KEY

  console.log('[/api/news] Keys present:', {
    newsdata: !!NEWSDATA_KEY,
    gnews:    !!GNEWS_KEY,
  })

  if (!NEWSDATA_KEY && !GNEWS_KEY) {
    console.error('[/api/news] No API keys found in environment!')
    return res.status(500).json({
      error: 'No API keys configured on server.',
      results: [],
    })
  }

  const errors = []
  const fetches = []

  if (NEWSDATA_KEY) {
    fetches.push(
      fetchNewsData(category, query, NEWSDATA_KEY)
        .catch(e => { console.error('[NewsData] Failed:', e.message); errors.push(`newsdata: ${e.message}`); return [] })
    )
  }
  if (GNEWS_KEY) {
    fetches.push(
      fetchGNews(category, query, GNEWS_KEY)
        .catch(e => { console.error('[GNews] Failed:', e.message); errors.push(`gnews: ${e.message}`); return [] })
    )
  }

  const results  = await Promise.all(fetches)
  const merged   = deduplicateByTitle(results.flat())

  console.log(`[/api/news] Returning ${merged.length} articles (errors: ${errors.length})`)

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300')
  return res.status(200).json({
    results: merged,
    total:   merged.length,
    ...(errors.length ? { warnings: errors } : {}),
  })
}
