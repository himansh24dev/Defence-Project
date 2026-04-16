// In-memory rate limiter — best-effort on Vercel (per warm instance)
// Good enough to stop accidental abuse; not a substitute for Redis on high-traffic apps.

const store = new Map()

// Purge expired entries every 5 minutes so the map doesn't grow unbounded
setInterval(() => {
  const now = Date.now()
  for (const [k, v] of store) if (now > v.resetAt) store.delete(k)
}, 5 * 60 * 1000)

/**
 * @param {string} ip
 * @param {{ max?: number, windowMs?: number }} opts
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
export function rateLimit(ip, { max = 20, windowMs = 30 * 60 * 1000 } = {}) {
  const now = Date.now()
  let entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs }
    store.set(ip, entry)
  }

  entry.count++

  return {
    allowed:   entry.count <= max,
    remaining: Math.max(0, max - entry.count),
    resetIn:   Math.ceil((entry.resetAt - now) / 1000),
  }
}

/** Extract the real client IP from Vercel / express request */
export function clientIp(req) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  )
}
