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
      setInterval(() => { const now = Date.now(); for (const [k, v] of _rateLimitStore) if (now > v.resetAt) _rateLimitStore.delete(k) }, 5 * 60 * 1000)
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      chatApiPlugin(env),
    ],
  }
})
