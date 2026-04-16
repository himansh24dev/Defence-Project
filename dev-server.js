// Simple local dev server for /api/news — no Vercel needed
import http from 'http'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually
try {
  const env = readFileSync(resolve('.env.local'), 'utf8')
  env.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  })
  console.log('[dev-server] Loaded .env.local')
} catch {
  console.warn('[dev-server] No .env.local found')
}

// Import the actual API handler
const { default: handler } = await import('./api/news.js')

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end() }

  if (req.url?.startsWith('/api/news')) {
    const url  = new URL(req.url, 'http://localhost')
    req.query  = Object.fromEntries(url.searchParams)

    // Fake Vercel res object
    const fakeRes = {
      _status: 200,
      _headers: {},
      statusCode: 200,
      status(code) { this._status = code; return this },
      setHeader(k, v) { this._headers[k] = v; return this },
      json(data) {
        res.writeHead(this._status, { 'Content-Type': 'application/json', ...this._headers })
        res.end(JSON.stringify(data))
      },
    }

    handler(req, fakeRes).catch(err => {
      console.error('[dev-server] Handler error:', err)
      res.writeHead(500)
      res.end(JSON.stringify({ error: err.message, results: [] }))
    })
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
})

server.listen(3000, () => {
  console.log('[dev-server] API running at http://localhost:3000/api/news')
})
