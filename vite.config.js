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

// ── Inline rate limiter (mirrors api/_rateLimit.js for local dev) ──
const _rateLimitStore = new Map()
setInterval(() => { const now = Date.now(); for (const [k, v] of _rateLimitStore) if (now > v.resetAt) _rateLimitStore.delete(k) }, 5 * 60 * 1000)
function devRateLimit(ip, max = 20, windowMs = 30 * 60 * 1000) {
  const now = Date.now()
  let e = _rateLimitStore.get(ip)
  if (!e || now > e.resetAt) { e = { count: 0, resetAt: now + windowMs }; _rateLimitStore.set(ip, e) }
  e.count++
  return { allowed: e.count <= max, resetIn: Math.ceil((e.resetAt - now) / 1000) }
}

// ── Inline sanitizer (mirrors api/_sanitize.js for local dev) ──
const _INJECTION = [
  /<\/?\s*news_context\s*>/gi, /\[INST\]|\[\/INST\]/g, /<<SYS>>|<<\/SYS>>/g, /<\/?s>/g,
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/gi,
  /new\s+(system\s+)?instructions?/gi, /you\s+are\s+now\s+/gi,
  /\bsystem\s*:/gi, /\bassistant\s*:/gi, /\buser\s*:/gi,
]
function devSanitize(text, max = 500) {
  if (!text) return ''
  let s = String(text).slice(0, max)
  for (const p of _INJECTION) s = s.replace(p, ' ')
  return s.replace(/\s{2,}/g, ' ').trim()
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

        // Rate limiting
        const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'local'
        const rl = devRateLimit(ip)
        if (!rl.allowed) {
          res.writeHead(429, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: `Too many requests. Try again in ${Math.ceil(rl.resetIn / 60)} minutes.` }))
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

        // Input validation
        if (!Array.isArray(messages) || messages.length > 40) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Invalid messages payload' }))
        }

        const GROQ_KEY = env.GROQ_API_KEY
        if (!GROQ_KEY) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'GROQ_API_KEY not set in .env.local' }))
        }

        // Build injection-safe system prompt
        let fullSystemPrompt = CHAT_SYSTEM_PROMPT
        if (context && typeof context === 'string') {
          const safeCtx = context.split('\n').map(l => devSanitize(l, 500)).join('\n')
          fullSystemPrompt = CHAT_SYSTEM_PROMPT +
            '\n\n<news_context>\nThe following are real news articles fetched today. ' +
            'Use them to answer current affairs questions and cite the source name.\n\n' +
            safeCtx + '\n</news_context>'
        }

        console.log(`[chat] ip=${ip} msgs=${messages.length} ctx=${!!context}`)

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
