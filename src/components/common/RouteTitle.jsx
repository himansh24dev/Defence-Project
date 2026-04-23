import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TITLES = {
  '/':           'BABA YAGA — Defence Intelligence Hub',
  '/weapons':    'Weapons & Equipment — BABA YAGA',
  '/regiments':  'Units & Battle Honours — BABA YAGA',
  '/geopolitics':'Geopolitics — BABA YAGA',
  '/orgs':       'Defence Organisations — BABA YAGA',
  '/operations': 'Operations & Wars — BABA YAGA',
  '/exercises':  'Military Exercises — BABA YAGA',
  '/ranks':      'Ranks & Medals — BABA YAGA',
  '/practice':   'Practice (WAT / PPDT) — BABA YAGA',
  '/forces':     'Know Your Forces — BABA YAGA',
  '/map':        'India Interactive Map — BABA YAGA',
  '/bookmarks':  'My Bookmarks — BABA YAGA',
}

export default function RouteTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] || 'BABA YAGA — Defence Intelligence Hub'
  }, [pathname])
  return null
}
