import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import SearchModal from './components/common/SearchModal'

import Home from './pages/Home'
import National from './pages/National'
import International from './pages/International'
import Defence from './pages/Defence'
import Procurement from './pages/Procurement'
import Indigenization from './pages/Indigenization'
import Geopolitics from './pages/Geopolitics'
import ScienceTech from './pages/ScienceTech'
import Schemes from './pages/Schemes'
import Weapons from './pages/Weapons'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      retry: 2,
    },
  },
})

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#0a0f1e]">
          <Header onSearchOpen={() => setSearchOpen(true)} />
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
          <main className="flex-1">
            <Routes>
              <Route path="/"               element={<Home />} />
              <Route path="/national"       element={<National />} />
              <Route path="/international"  element={<International />} />
              <Route path="/defence"        element={<Defence />} />
              <Route path="/procurement"    element={<Procurement />} />
              <Route path="/indigenization" element={<Indigenization />} />
              <Route path="/geopolitics"    element={<Geopolitics />} />
              <Route path="/science-tech"   element={<ScienceTech />} />
              <Route path="/schemes"        element={<Schemes />} />
              <Route path="/weapons"        element={<Weapons />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
