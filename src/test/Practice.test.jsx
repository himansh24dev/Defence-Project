import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Practice from '../pages/Practice'

// Mock Web Audio API — not available in jsdom
const mockAudio = {
  createOscillator: () => ({ connect: vi.fn(), type: '', frequency: { setValueAtTime: vi.fn() }, start: vi.fn(), stop: vi.fn() }),
  createGain: () => ({ connect: vi.fn(), gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() } }),
  destination: {},
  currentTime: 0,
}
globalThis.AudioContext = vi.fn(() => mockAudio)
globalThis.webkitAudioContext = vi.fn(() => mockAudio)

function renderPractice() {
  return render(<MemoryRouter><Practice /></MemoryRouter>)
}

async function startTest(setLabel = 'Set 1') {
  renderPractice()
  fireEvent.click(screen.getByText(setLabel))
  fireEvent.click(screen.getByText(/Start Test/i))
  await tickSeconds(5) // flush the 5-second countdown; WATTest now shows word 0
}

// Advance fake timers one second at a time so React can flush between each tick.
async function tickSeconds(n) {
  for (let i = 0; i < n; i++) {
    await act(async () => { vi.advanceTimersByTime(1000) })
  }
}

// Advance past one full 15-second word including the 350ms transition.
async function advanceOneWord() {
  await tickSeconds(15)
  await act(async () => { vi.advanceTimersByTime(400) })
}

// ─── Set selector ─────────────────────────────────────────────────────────────
describe('Practice page — set selector', () => {
  it('renders the WAT page heading', () => {
    renderPractice()
    expect(screen.getByText('Word Association Test')).toBeInTheDocument()
  })

  it('renders all 5 set cards', () => {
    renderPractice()
    ;['Set 1', 'Set 2', 'Set 3', 'Set 4', 'Set 5'].forEach(label =>
      expect(screen.getByText(label)).toBeInTheDocument()
    )
  })

  it('shows the 4 info-strip stats', () => {
    renderPractice()
    expect(screen.getByText('15 sec / word')).toBeInTheDocument()
    expect(screen.getByText('60 words / set')).toBeInTheDocument()
    expect(screen.getByText('5 unique sets')).toBeInTheDocument()
    expect(screen.getByText('Notebook only')).toBeInTheDocument()
  })

  it('shows the Pro Tip section', () => {
    renderPractice()
    expect(screen.getByText('Pro Tip for WAT')).toBeInTheDocument()
  })

  it('does NOT show any WAT words on the selector screen', () => {
    renderPractice()
    expect(screen.queryByText('Courage')).not.toBeInTheDocument()
    expect(screen.queryByText('Army')).not.toBeInTheDocument()
  })
})

// ─── Instructions screen ──────────────────────────────────────────────────────
describe('Practice page — instructions screen', () => {
  it('transitions to instructions when a set card is clicked', () => {
    renderPractice()
    fireEvent.click(screen.getByText('Set 1'))
    expect(screen.getByText('Instructions')).toBeInTheDocument()
  })

  it('shows all 5 instruction rule labels', () => {
    renderPractice()
    fireEvent.click(screen.getByText('Set 1'))
    ;['60 words', '15 seconds', 'Write freely', 'No pausing', 'Stay honest'].forEach(label =>
      expect(screen.getByText(label)).toBeInTheDocument()
    )
  })

  it('shows the notebook-ready warning', () => {
    renderPractice()
    fireEvent.click(screen.getByText('Set 1'))
    expect(screen.getByText(/notebook and pen ready/i)).toBeInTheDocument()
  })

  it('Back button returns to the set selector', () => {
    renderPractice()
    fireEvent.click(screen.getByText('Set 1'))
    fireEvent.click(screen.getByText('Back'))
    expect(screen.getByText('Word Association Test')).toBeInTheDocument()
  })

  it('does NOT show WAT words on the instructions screen', () => {
    renderPractice()
    fireEvent.click(screen.getByText('Set 1'))
    expect(screen.queryByText('Courage')).not.toBeInTheDocument()
  })

  it('Start Test button disappears after click (countdown takes over)', () => {
    vi.useFakeTimers()
    renderPractice()
    fireEvent.click(screen.getByText('Set 1'))
    fireEvent.click(screen.getByText(/Start Test/i))
    // React 19 act() auto-flushes — button label is gone immediately
    expect(screen.queryByText(/Start Test/i)).not.toBeInTheDocument()
    vi.useRealTimers()
  })
})

// ─── WAT test screen ──────────────────────────────────────────────────────────
describe('Practice page — WAT test screen', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('shows the first word of Set 1 (Courage) after countdown', async () => {
    await startTest('Set 1')
    expect(screen.getByText('Courage')).toBeInTheDocument()
  })

  it('shows Word 1 / 60 counter at start', async () => {
    await startTest()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('/ 60')).toBeInTheDocument()
  })

  it('shows the Exit button', async () => {
    await startTest()
    expect(screen.getByText('Exit')).toBeInTheDocument()
  })

  it('timer is running and shows a value in seconds', async () => {
    await startTest()
    // Timer text = "{timeLeft}s" — rendered as two text nodes; textContent is e.g. "15s"
    const span = screen.getByText(/^\d+s$/)
    expect(span).toBeInTheDocument()
    const val = parseInt(span.textContent)
    expect(val).toBeGreaterThanOrEqual(1)
    expect(val).toBeLessThanOrEqual(15)
  })

  it('timer decrements by 1 after one second', async () => {
    await startTest()
    const before = parseInt(screen.getByText(/^\d+s$/).textContent)
    await tickSeconds(1)
    const after = parseInt(screen.getByText(/^\d+s$/).textContent)
    expect(after).toBe(before - 1)
  })

  it('timer decrements by 5 after five seconds', async () => {
    await startTest()
    const before = parseInt(screen.getByText(/^\d+s$/).textContent)
    await tickSeconds(5)
    const after = parseInt(screen.getByText(/^\d+s$/).textContent)
    expect(after).toBe(before - 5)
  })

  it('advances to the second word (Army) after 15 seconds', async () => {
    await startTest()
    await advanceOneWord()
    expect(screen.getByText('Army')).toBeInTheDocument()
  })

  it('word counter shows 2 after first word elapses', async () => {
    await startTest()
    await advanceOneWord()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('advances to the third word (Joy) after two words', async () => {
    await startTest()
    await advanceOneWord()
    await advanceOneWord()
    expect(screen.getByText('Joy')).toBeInTheDocument()
  })

  it('Exit button returns to the set selector', async () => {
    await startTest()
    fireEvent.click(screen.getByText('Exit'))
    expect(screen.getByText('Word Association Test')).toBeInTheDocument()
  })
})

// ─── Completion screen ────────────────────────────────────────────────────────
describe('Practice page — completion screen', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  async function runAllWords() {
    renderPractice()
    fireEvent.click(screen.getByText('Set 1'))
    fireEvent.click(screen.getByText(/Start Test/i))
    await tickSeconds(5) // flush countdown so WATTest starts clean at word 0
    for (let w = 0; w < 60; w++) {
      await advanceOneWord()
    }
  }

  it('shows "Test Complete!" after all 60 words', async () => {
    await runAllWords()
    expect(screen.getByText('Test Complete!')).toBeInTheDocument()
  }, 60000)

  it('completion shows 60 words stat', async () => {
    await runAllWords()
    expect(screen.getByText('60')).toBeInTheDocument()
  }, 60000)

  it('Retry This Set returns to instructions', async () => {
    await runAllWords()
    fireEvent.click(screen.getByText(/Retry This Set/i))
    expect(screen.getByText('Instructions')).toBeInTheDocument()
  }, 60000)

  it('All Sets returns to selector', async () => {
    await runAllWords()
    fireEvent.click(screen.getByText('All Sets'))
    expect(screen.getByText('Word Association Test')).toBeInTheDocument()
  }, 60000)
})
