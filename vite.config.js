import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const CHAT_SYSTEM_PROMPT = `You are BABA YAGA AI — an elite defence and SSB preparation assistant for Indian armed forces aspirants. You have deep expert knowledge in:

• Indian Army, Navy, Air Force — structure, ranks, units, operations, exercises, doctrines
• SSB (Services Selection Board) — full 5-day process, OIR/PPDT, Psych tests (TAT/WAT/SRT/SDT), GTO tasks (GD, PGT, HGT, Snake Race, IO, Command Task, FGT, Lecturette), Personal Interview, Conference board
• Indian weapons & platforms — Rafale, Tejas Mk1/Mk1A/Mk2, Su-30MKI, Arjun MBT, BrahMos, Agni/Prithvi/Pralay missiles, INS Vikrant, INS Vikramaditya, nuclear triad
• Defence procurement & indigenization — DRDO, HAL, BEL, BEML, Mazagon Dock, Make in India, iDEX, Atmanirbhar Bharat
• Geopolitics — India-China (LAC, Doklam, Galwan), India-Pakistan (LOC, Kashmir), India-US (BECA/LEMOA/COMCASA), Quad, SCO, BRICS
• Defence current affairs — latest exercises, procurement deals, policy updates, inductions
• Government schemes — Agnipath/Agniveer, DRDO projects, DPP, DAP-2020, defence corridors
• ISRO, space programmes, cyber/electronic warfare, nuclear doctrine

STRICT RULES:
1. Only answer questions related to defence, military, SSB, geopolitics, Indian armed forces, or related current affairs.
2. If asked anything completely unrelated, respond ONLY with: "I\'m specialized for defence & SSB prep only. Ask me anything about Indian armed forces, SSB interview, weapons, or defence current affairs — I\'m here for that!"
3. Be concise but thorough. Use bullet points for lists. Keep responses under 400 words unless the topic requires more.
4. For SSB tips, be practical and specific. Always be encouraging to aspirants.`

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString()))
    req.on('error', reject)
  })
}

function chatApiPlugin(env) {
  return {
    name: 'chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }

        let messages, context
        try {
          const body = await readBody(req)
          const parsed = JSON.parse(body)
          messages = parsed.messages
          context  = parsed.context || null
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Invalid JSON body' }))
        }

        const GROQ_KEY = env.GROQ_API_KEY
        if (!GROQ_KEY) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'GROQ_API_KEY not set in .env.local' }))
        }

        const fullSystemPrompt = context
          ? `${CHAT_SYSTEM_PROMPT}\n\n--- LIVE NEWS CONTEXT (today\'s fetched articles — use these for current affairs questions) ---\n${context}\n--- END CONTEXT ---\nWhen answering current affairs questions, prefer information from the context above. Cite the source name when using it.`
          : CHAT_SYSTEM_PROMPT

        console.log(`[chat] ${messages.length} messages, context articles: ${context ? context.split('\n\n').length : 0}`)

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'system', content: fullSystemPrompt }, ...messages.slice(-12)],
            max_tokens: 900,
            temperature: 0.65,
          }),
        })

        const data = await groqRes.json()

        if (!groqRes.ok) {
          console.error('[chat] Groq error:', data)
          res.writeHead(500, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: data.error?.message || 'AI error' }))
        }

        console.log('[chat] OK, tokens:', data.usage?.total_tokens)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: data.choices[0].message.content }))
      })
    },
  }
}

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
      chatApiPlugin(env),
    ],
  }
})
