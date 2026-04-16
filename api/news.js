// Vercel Serverless Function — /api/news
// Fetches from NewsData.io and GNews.io, merges results, returns JSON

const CATEGORY_MAP = {
  national:       { newsdata: 'politics',  gnews: 'nation',  query: 'india' },
  world:          { newsdata: 'world',     gnews: 'world',   query: '' },
  defence:        { newsdata: 'politics',  gnews: 'nation',  query: 'india defence military army navy' },
  science:        { newsdata: 'science',   gnews: 'technology', query: 'india' },
  politics:       { newsdata: 'politics',  gnews: 'world',   query: '' },
}

async function fetchNewsData(category, query, apiKey) {
  const mapped = CATEGORY_MAP[category] || CATEGORY_MAP.national
  const params = new URLSearchParams({
    apikey:   apiKey,
    language: 'en',
    country:  category === 'world' || category === 'politics' ? '' : 'in',
    category: mapped.newsdata,
  })
  if (query || mapped.query) params.set('q', query || mapped.query)

  const url = `https://newsdata.io/api/1/news?${params}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`NewsData error: ${res.status}`)
  const data = await res.json()

  return (data.results || []).map(a => ({
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
    token:    apiKey,
    lang:     'en',
    country:  category === 'world' || category === 'politics' ? '' : 'in',
    topic:    mapped.gnews,
    max:      '10',
  })
  if (query) params.set('q', query)

  const url = `https://gnews.io/api/v4/top-headlines?${params}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GNews error: ${res.status}`)
  const data = await res.json()

  return (data.articles || []).map(a => ({
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
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export default async function handler(req, res) {
  const { category = 'national', query = '' } = req.query

  const NEWSDATA_KEY = process.env.NEWSDATA_API_KEY
  const GNEWS_KEY    = process.env.GNEWS_API_KEY

  if (!NEWSDATA_KEY && !GNEWS_KEY) {
    return res.status(500).json({
      error: 'No API keys configured. Set NEWSDATA_API_KEY and GNEWS_API_KEY in .env',
      results: [],
    })
  }

  const fetches = []
  if (NEWSDATA_KEY) fetches.push(fetchNewsData(category, query, NEWSDATA_KEY).catch(() => []))
  if (GNEWS_KEY)    fetches.push(fetchGNews(category, query, GNEWS_KEY).catch(() => []))

  try {
    const results = await Promise.all(fetches)
    const merged  = deduplicateByTitle(results.flat())

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300')
    return res.status(200).json({ results: merged, total: merged.length })
  } catch (err) {
    return res.status(500).json({ error: err.message, results: [] })
  }
}
