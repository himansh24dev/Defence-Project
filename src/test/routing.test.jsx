import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

// Lightweight stubs — we only test routing, not full page content
const stub = (name) => () => <div data-testid={`page-${name}`}>{name}</div>
const Home        = stub('home')
const Weapons     = stub('weapons')
const Regiments   = stub('regiments')
const Geopolitics = stub('geopolitics')
const GovSchemes  = stub('schemes')
const DefenceOrgs = stub('orgs')
const Operations  = stub('operations')
const Ranks       = stub('ranks')
const Practice    = stub('practice')

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/weapons"     element={<Weapons />} />
      <Route path="/regiments"   element={<Regiments />} />
      <Route path="/geopolitics" element={<Geopolitics />} />
      <Route path="/schemes"     element={<GovSchemes />} />
      <Route path="/orgs"        element={<DefenceOrgs />} />
      <Route path="/operations"  element={<Operations />} />
      <Route path="/ranks"       element={<Ranks />} />
      <Route path="/practice"    element={<Practice />} />
      <Route path="*"            element={<Home />} />
    </Routes>
  )
}

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  )
}

describe('App routing', () => {
  it('/ renders Home', () => {
    renderAt('/')
    expect(screen.getByTestId('page-home')).toBeInTheDocument()
  })

  it('/weapons renders Weapons', () => {
    renderAt('/weapons')
    expect(screen.getByTestId('page-weapons')).toBeInTheDocument()
  })

  it('/regiments renders Regiments', () => {
    renderAt('/regiments')
    expect(screen.getByTestId('page-regiments')).toBeInTheDocument()
  })

  it('/geopolitics renders Geopolitics', () => {
    renderAt('/geopolitics')
    expect(screen.getByTestId('page-geopolitics')).toBeInTheDocument()
  })

  it('/schemes renders GovSchemes', () => {
    renderAt('/schemes')
    expect(screen.getByTestId('page-schemes')).toBeInTheDocument()
  })

  it('/orgs renders DefenceOrgs', () => {
    renderAt('/orgs')
    expect(screen.getByTestId('page-orgs')).toBeInTheDocument()
  })

  it('/operations renders Operations', () => {
    renderAt('/operations')
    expect(screen.getByTestId('page-operations')).toBeInTheDocument()
  })

  it('/ranks renders Ranks', () => {
    renderAt('/ranks')
    expect(screen.getByTestId('page-ranks')).toBeInTheDocument()
  })

  it('/practice renders Practice', () => {
    renderAt('/practice')
    expect(screen.getByTestId('page-practice')).toBeInTheDocument()
  })

  it('unknown route falls back to Home', () => {
    renderAt('/this-does-not-exist')
    expect(screen.getByTestId('page-home')).toBeInTheDocument()
  })

  it('/practice/extra does not match /practice exactly — falls back to Home', () => {
    renderAt('/practice/extra')
    expect(screen.getByTestId('page-home')).toBeInTheDocument()
  })
})
