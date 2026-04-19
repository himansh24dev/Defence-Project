import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthModal from './components/common/AuthModal'

function Protected({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return children
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ filter: 'blur(6px)', opacity: 0.3, pointerEvents: 'none', userSelect: 'none' }}>
        {children}
      </div>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 49,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}>
        <AuthModal />
      </div>
    </div>
  )
}

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
import Practice from './pages/Practice'
import KnowYourForces from './pages/KnowYourForces'
import IndiaMap from './pages/IndiaMap'
import Auth from './pages/Auth'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <BrowserRouter>
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0f1e' }}>
          <Header onSearchOpen={() => setSearchOpen(true)} />
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/weapons"     element={<Protected><Weapons /></Protected>} />
              <Route path="/regiments"   element={<Protected><Regiments /></Protected>} />
              <Route path="/geopolitics" element={<Protected><Geopolitics /></Protected>} />
              <Route path="/schemes"     element={<Protected><GovSchemes /></Protected>} />
              <Route path="/orgs"        element={<Protected><DefenceOrgs /></Protected>} />
              <Route path="/operations"  element={<Protected><Operations /></Protected>} />
              <Route path="/ranks"       element={<Protected><Ranks /></Protected>} />
              <Route path="/practice"    element={<Protected><Practice /></Protected>} />
              <Route path="/forces"      element={<Protected><KnowYourForces /></Protected>} />
              <Route path="/map"         element={<Protected><IndiaMap /></Protected>} />
              <Route path="/auth"       element={<Auth />} />
              <Route path="*"            element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ChatWidget />
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}
