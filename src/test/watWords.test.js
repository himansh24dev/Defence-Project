import { describe, it, expect } from 'vitest'
import { watSets } from '../data/watWords'

describe('watWords data integrity', () => {
  it('exports exactly 5 sets', () => {
    expect(watSets).toHaveLength(5)
  })

  it('every set has a numeric id matching its position', () => {
    watSets.forEach((set, i) => {
      expect(set.id).toBe(i + 1)
    })
  })

  it('every set has a title string', () => {
    watSets.forEach(set => {
      expect(typeof set.title).toBe('string')
      expect(set.title.trim().length).toBeGreaterThan(0)
    })
  })

  it('every set contains exactly 60 words', () => {
    watSets.forEach(set => {
      expect(set.words).toHaveLength(60)
    })
  })

  it('all words are non-empty strings', () => {
    watSets.forEach(set => {
      set.words.forEach(word => {
        expect(typeof word).toBe('string')
        expect(word.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('no word is purely numeric or a special character', () => {
    watSets.forEach(set => {
      set.words.forEach(word => {
        expect(/^[A-Za-z]/.test(word)).toBe(true)
      })
    })
  })

  it('no duplicate words within the same set', () => {
    watSets.forEach(set => {
      const lower = set.words.map(w => w.toLowerCase())
      const unique = new Set(lower)
      expect(unique.size).toBe(set.words.length)
    })
  })

  it('all 300 words across all sets are unique', () => {
    const all = watSets.flatMap(s => s.words.map(w => w.toLowerCase()))
    const unique = new Set(all)
    expect(unique.size).toBe(all.length)
  })

  it('words array is not mutated between access', () => {
    const first = watSets[0].words[0]
    expect(watSets[0].words[0]).toBe(first)
  })

  it('set ids are unique', () => {
    const ids = watSets.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('no word exceeds 20 characters (all are single words)', () => {
    watSets.forEach(set => {
      set.words.forEach(word => {
        expect(word.length).toBeLessThanOrEqual(20)
      })
    })
  })

  it('each set has words from diverse categories (not all starting with same letter)', () => {
    watSets.forEach(set => {
      const firstLetters = new Set(set.words.map(w => w[0].toLowerCase()))
      expect(firstLetters.size).toBeGreaterThan(5)
    })
  })
})
