import { describe, it, expect } from 'vitest'
import { rateLimit, clientIp } from '../../api/_rateLimit.js'

// Each test gets a fresh module instance via re-import trick using timestamp keys
// Since the store is module-level, we use unique IPs per test instead.

let ipCounter = 0
const freshIp = () => `10.0.0.${++ipCounter}`

describe('rateLimit', () => {
  it('allows the first request', () => {
    const { allowed } = rateLimit(freshIp())
    expect(allowed).toBe(true)
  })

  it('returns correct remaining count on first call', () => {
    const { remaining } = rateLimit(freshIp(), { max: 20 })
    expect(remaining).toBe(19)
  })

  it('blocks after exceeding max requests', () => {
    const ip = freshIp()
    for (let i = 0; i < 20; i++) rateLimit(ip, { max: 20 })
    const { allowed } = rateLimit(ip, { max: 20 })
    expect(allowed).toBe(false)
  })

  it('remaining reaches 0 exactly at the limit', () => {
    const ip = freshIp()
    let last
    for (let i = 0; i < 20; i++) last = rateLimit(ip, { max: 20 })
    expect(last.remaining).toBe(0)
  })

  it('remaining never goes below 0', () => {
    const ip = freshIp()
    for (let i = 0; i < 25; i++) rateLimit(ip, { max: 20 })
    const { remaining } = rateLimit(ip, { max: 20 })
    expect(remaining).toBe(0)
  })

  it('different IPs have independent counters', () => {
    const ip1 = freshIp()
    const ip2 = freshIp()
    for (let i = 0; i < 20; i++) rateLimit(ip1, { max: 20 })
    const { allowed } = rateLimit(ip2, { max: 20 })
    expect(allowed).toBe(true)
  })

  it('returns a positive resetIn value', () => {
    const { resetIn } = rateLimit(freshIp())
    expect(resetIn).toBeGreaterThan(0)
  })

  it('allows max=1 then blocks', () => {
    const ip = freshIp()
    expect(rateLimit(ip, { max: 1 }).allowed).toBe(true)
    expect(rateLimit(ip, { max: 1 }).allowed).toBe(false)
  })
})

describe('clientIp', () => {
  it('extracts IP from x-forwarded-for header', () => {
    const req = { headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' }, socket: {} }
    expect(clientIp(req)).toBe('1.2.3.4')
  })

  it('falls back to socket remoteAddress', () => {
    const req = { headers: {}, socket: { remoteAddress: '9.9.9.9' } }
    expect(clientIp(req)).toBe('9.9.9.9')
  })

  it('returns "unknown" when no IP available', () => {
    const req = { headers: {}, socket: {} }
    expect(clientIp(req)).toBe('unknown')
  })

  it('trims whitespace from forwarded-for', () => {
    const req = { headers: { 'x-forwarded-for': '  1.2.3.4  , 5.6.7.8' }, socket: {} }
    expect(clientIp(req)).toBe('1.2.3.4')
  })
})
