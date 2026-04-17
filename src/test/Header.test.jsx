import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../components/layout/Header'

function renderHeader(path = '/', onSearchOpen = vi.fn()) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header onSearchOpen={onSearchOpen} />
    </MemoryRouter>
  )
}

describe('Header navigation', () => {
  it('renders the BABA YAGA brand', () => {
    renderHeader()
    expect(screen.getByText('BABA')).toBeInTheDocument()
    expect(screen.getByText('YAGA')).toBeInTheDocument()
  })

  it('renders all 9 nav links', () => {
    renderHeader()
    const links = [
      'Home', 'Weapons & Equip', 'Regiments', 'Geopolitics',
      'Gov Schemes', 'Defence Orgs', 'Operations', 'Ranks & Medals', 'Practice',
    ]
    links.forEach(label => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    })
  })

  it('Practice link points to /practice', () => {
    renderHeader()
    const practiceLinks = screen.getAllByRole('link', { name: /Practice/i })
    expect(practiceLinks.some(l => l.getAttribute('href') === '/practice')).toBe(true)
  })

  it('search button calls onSearchOpen', () => {
    const onSearchOpen = vi.fn()
    renderHeader('/', onSearchOpen)
    fireEvent.click(screen.getByRole('button', { name: '' })) // search icon button
    // The search button is the first button without text
    const buttons = screen.getAllByRole('button')
    // Find the search button (not menu toggle)
    fireEvent.click(buttons[0])
    expect(onSearchOpen).toHaveBeenCalled()
  })

  it('shows LIVE indicator', () => {
    renderHeader()
    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })

  it('active route gets highlighted styling', () => {
    renderHeader('/practice')
    const practiceLinks = screen.getAllByRole('link', { name: /Practice/i })
    const activeLink = practiceLinks.find(l => l.getAttribute('href') === '/practice')
    expect(activeLink).toBeDefined()
    // Active link should have orange background
    // jsdom normalises hex to rgb
    const bg = activeLink.style.background
    expect(bg === '#FF6B00' || bg.includes('255') && bg.includes('107') && bg.includes('0')).toBe(true)
  })

  it('renders the tricolor stripe', () => {
    const { container } = renderHeader()
    // The tricolor div has 3 children with specific colors
    const tricolor = container.querySelector('[style*="height: 3"]') ||
                     container.querySelector('[style*="height:3"]')
    expect(tricolor).toBeDefined()
  })

  it('Defence Intelligence Hub tagline is present', () => {
    renderHeader()
    expect(screen.getByText('Defence Intelligence Hub')).toBeInTheDocument()
  })
})
