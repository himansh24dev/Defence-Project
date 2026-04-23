import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import SearchModal from './components/common/SearchModal'
import SplashScreen from './components/common/SplashScreen'
import ChatWidget from './components/common/ChatWidget'
import ScrollToTop from './components/common/ScrollToTop'
import RouteTitle from './components/common/RouteTitle'
import ProgressTracker from './components/common/ProgressTracker'

const Home         = lazy(() => import('./pages/Home'))
const Weapons      = lazy(() => import('./pages/Weapons'))
const Regiments    = lazy(() => import('./pages/Regiments'))
const Geopolitics  = lazy(() => import('./pages/Geopolitics'))
const DefenceOrgs  = lazy(() => import('./pages/DefenceOrgs'))
const Operations   = lazy(() => import('./pages/Operations'))
const MilitaryExercises = lazy(() => import('./pages/MilitaryExercises'))
const Ranks        = lazy(() => import('./pages/Ranks'))
const Practice     = lazy(() => import('./pages/Practice'))
const KnowYourForces = lazy(() => import('./pages/KnowYourForces'))
const IndiaMap     = lazy(() => import('./pages/IndiaMap'))
const Bookmarks    = lazy(() => import('./pages/Bookmarks'))
const NotFound     = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 36, height: 36, border: '3px solid #1a2d4a', borderTopColor: '#FF6B00', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
        <div style={{ fontSize: 12, color: '#475569' }}>Loading…</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <BrowserRouter>
        <ScrollToTop />
        <RouteTitle />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0f1e' }}>
          <Header onSearchOpen={() => setSearchOpen(true)} />
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"            element={<Home />} />
                <Route path="/weapons"     element={<Weapons />} />
                <Route path="/regiments"   element={<Regiments />} />
                <Route path="/geopolitics" element={<Geopolitics />} />
                <Route path="/orgs"        element={<DefenceOrgs />} />
                <Route path="/operations"  element={<Operations />} />
                <Route path="/exercises"   element={<MilitaryExercises />} />
                <Route path="/ranks"       element={<Ranks />} />
                <Route path="/practice"    element={<Practice />} />
                <Route path="/forces"      element={<KnowYourForces />} />
                <Route path="/map"         element={<IndiaMap />} />
                <Route path="/bookmarks"   element={<Bookmarks />} />
                <Route path="*"            element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <ChatWidget />
        <ProgressTracker />
      </BrowserRouter>
    </>
  )
}
