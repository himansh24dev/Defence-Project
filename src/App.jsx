import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import SearchModal from './components/common/SearchModal'
import SplashScreen from './components/common/SplashScreen'
import ChatWidget from './components/common/ChatWidget'

import Home from './pages/Home'
import Weapons from './pages/Weapons'
import Regiments from './pages/Regiments'
import Geopolitics from './pages/Geopolitics'
import GovSchemes from './pages/GovSchemes'
import DefenceOrgs from './pages/DefenceOrgs'
import Operations from './pages/Operations'
import Ranks from './pages/Ranks'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0f1e' }}>
          <Header onSearchOpen={() => setSearchOpen(true)} />
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/weapons"     element={<Weapons />} />
              <Route path="/regiments"   element={<Regiments />} />
              <Route path="/geopolitics" element={<Geopolitics />} />
              <Route path="/schemes"     element={<GovSchemes />} />
              <Route path="/orgs"        element={<DefenceOrgs />} />
              <Route path="/operations"  element={<Operations />} />
              <Route path="/ranks"       element={<Ranks />} />
              <Route path="*"            element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ChatWidget />
      </BrowserRouter>
    </>
  )
}
