import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const CATEGORY_MAP = {
  national: { newsdata: 'politics', gnews: 'nation',     query: 'india' },
  world:    { newsdata: 'world',    gnews: 'world',      query: '' },
  defence:  { newsdata: 'politics', gnews: 'nation',     query: 'india defence military' },
  science:  { newsdata: 'science',  gnews: 'technology', query: 'india' },
  politics: { newsdata: 'politics', gnews: 'world',      query: '' },
}
const GLOBAL = new Set(['world', 'politics'])

function dedup(articles) {
  const seen = new Set()
  return articles.filter(a => {
    const k = a.title?.slice(0, 60).toLowerCase()
    if (!k || seen.has(k)) return false
    seen.add(k); return true
  })
}

function newsApiPlugin(env) {
  return {
    name: 'news-api',
    configureServer(server) {
      server.middlewares.use('/api/news', async (req, res) => {
        const url      = new URL(req.url, 'http://localhost')
        const category = url.searchParams.get('category') || 'national'
        const query    = url.searchParams.get('query') || ''
        const mapped   = CATEGORY_MAP[category] || CATEGORY_MAP.national

        const NEWSDATA_KEY = env.NEWSDATA_API_KEY
        const GNEWS_KEY    = env.GNEWS_API_KEY

        console.log(`[api/news] category=${category} query="${query}" keys: newsdata=${!!NEWSDATA_KEY} gnews=${!!GNEWS_KEY}`)

        if (!NEWSDATA_KEY && !GNEWS_KEY) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'No API keys in .env.local', results: [] }))
        }

        const errors = []
        const fetches = []

        if (NEWSDATA_KEY) {
          const p = new URLSearchParams({ apikey: NEWSDATA_KEY, language: 'en', category: mapped.newsdata })
          if (!GLOBAL.has(category)) p.set('country', 'in')
          const q = query || mapped.query
          if (q) p.set('q', q)
          fetches.push(
            fetch(`https://newsdata.io/api/1/news?${p}`)
              .then(r => r.json())
              .then(d => {
                console.log(`[NewsData] Got ${d.results?.length ?? 0} articles`)
                return (d.results || []).map(a => ({
                  title: a.title, description: a.description, link: a.link,
                  pubDate: a.pubDate, source_id: a.source_id, image_url: a.image_url,
                  category: a.category?.[0] || category, provider: 'newsdata',
                }))
              })
              .catch(e => { console.error('[NewsData] Error:', e.message); errors.push(e.message); return [] })
          )
        }

        if (GNEWS_KEY) {
          const p = new URLSearchParams({ token: GNEWS_KEY, lang: 'en', topic: mapped.gnews, max: '10' })
          if (!GLOBAL.has(category)) p.set('country', 'in')
          if (query) p.set('q', query)
          fetches.push(
            fetch(`https://gnews.io/api/v4/top-headlines?${p}`)
              .then(r => r.json())
              .then(d => {
                console.log(`[GNews] Got ${d.articles?.length ?? 0} articles`)
                return (d.articles || []).map(a => ({
                  title: a.title, description: a.description, link: a.url,
                  pubDate: a.publishedAt, source_id: a.source?.name, image_url: a.image,
                  category, provider: 'gnews',
                }))
              })
              .catch(e => { console.error('[GNews] Error:', e.message); errors.push(e.message); return [] })
          )
        }

        const results = dedup((await Promise.all(fetches)).flat())
        console.log(`[api/news] Returning ${results.length} articles`)

        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=600' })
        res.end(JSON.stringify({ results, total: results.length, ...(errors.length ? { warnings: errors } : {}) }))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      newsApiPlugin(env),
    ],
  }
})
