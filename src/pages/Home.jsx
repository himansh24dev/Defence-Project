import { Link } from 'react-router-dom'
import { Flag, Globe, Shield, ShoppingBag, Cpu, Map, Rocket, BookOpen, Crosshair, TrendingUp, RefreshCw, Clock } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import NewsCard from '../components/news/NewsCard'
import LoadingSpinner from '../components/common/LoadingSpinner'

const sections = [
  { title: 'National',         path: '/national',       icon: Flag,       color: '#FF6B00', desc: 'India\'s domestic affairs, governance & economy' },
  { title: 'International',    path: '/international',   icon: Globe,      color: '#3b82f6', desc: 'Global diplomacy, conflicts & bilateral ties' },
  { title: 'Defence',          path: '/defence',         icon: Shield,     color: '#ef4444', desc: 'Armed forces operations, exercises & strategy' },
  { title: 'Procurement',      path: '/procurement',     icon: ShoppingBag,color: '#8b5cf6', desc: 'Arms deals, MOD contracts & acquisitions' },
  { title: 'Indigenization',   path: '/indigenization',  icon: Cpu,        color: '#10b981', desc: 'Make in India — DRDO, HAL, Atmanirbhar Bharat' },
  { title: 'Geopolitics',      path: '/geopolitics',     icon: Map,        color: '#f59e0b', desc: 'Strategic competition, alliances & flashpoints' },
  { title: 'Sci & Tech',       path: '/science-tech',    icon: Rocket,     color: '#06b6d4', desc: 'DRDO, ISRO, space, AI & nuclear programs' },
  { title: 'Schemes',          path: '/schemes',         icon: BookOpen,   color: '#a855f7', desc: 'Key government policies & programmes' },
  { title: 'Weapons & Equip.', path: '/weapons',         icon: Crosshair,  color: '#FF6B00', desc: 'Complete military inventory — Army, Navy, IAF' },
]

const quickFacts = [
  { label: 'Active Military Personnel', value: '~1.45 million', sub: '4th largest active force' },
  { label: 'Defence Budget 2024–25', value: '₹6.21 lakh crore', sub: '2.04% of GDP' },
  { label: 'Nuclear Warheads (est.)', value: '~172', sub: 'SIPRI 2024 estimate' },
  { label: 'Aircraft Carriers', value: '2', sub: 'INS Vikrant + Vikramaditya' },
  { label: 'ICBM Range (Agni-V)', value: '8,000 km', sub: 'Covers all of China' },
  { label: 'Indigenization Target', value: '75%', sub: 'Defence procurement by 2047' },
]

function HomeNewsSection({ title, icon: Icon, color, path, category, query }) {
  const { data, isLoading } = useNews(category, query)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <h2 className="text-white font-semibold text-base">{title}</h2>
        </div>
        <Link to={path} className="text-xs text-[#FF6B00] hover:text-[#ff8c33] font-medium transition-colors">
          See all →
        </Link>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-[#0f172a] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {(data || []).slice(0, 3).map((article, i) => (
            <NewsCard key={article.link || i} article={article} />
          ))}
          {(!data || data.length === 0) && (
            <div className="text-center py-8 text-[#475569] text-sm">
              Add API keys to see live news
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e2d4a] to-[#0a0f1e] border border-[#1e2d4a] p-8 mb-8">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, #ffffff 30px, #ffffff 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, #ffffff 30px, #ffffff 31px)' }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium uppercase tracking-widest">Live Intelligence Feed</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
            Your Complete<br />
            <span className="text-[#FF6B00]">SSB Preparation</span> Hub
          </h1>
          <p className="text-[#64748b] text-base max-w-2xl mb-6">
            Real-time national & international current affairs, defence updates, weapons inventory, government schemes, and geopolitics — everything you need for SSB GTO, Interview, and GD rounds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/defence" className="px-5 py-2.5 bg-[#FF6B00] text-white rounded-xl font-semibold text-sm hover:bg-[#e55f00] transition-colors shadow-lg">
              Defence News →
            </Link>
            <Link to="/weapons" className="px-5 py-2.5 bg-[#1e2d4a] text-white rounded-xl font-semibold text-sm hover:bg-[#2d4a7a] transition-colors border border-[#2d4a7a]">
              Weapons DB →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {quickFacts.map(f => (
          <div key={f.label} className="bg-[#0f172a] border border-[#1e2d4a] rounded-xl p-3 hover:border-[#FF6B00]/30 transition-colors">
            <p className="text-[#475569] text-[9px] uppercase tracking-wider leading-tight">{f.label}</p>
            <p className="text-white font-bold text-sm mt-1">{f.value}</p>
            <p className="text-[#475569] text-[9px] mt-0.5">{f.sub}</p>
          </div>
        ))}
      </div>

      {/* Section navigation cards */}
      <div className="mb-10">
        <h2 className="text-[#94a3b8] text-xs uppercase tracking-wider mb-4">Browse by Section</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {sections.map(s => {
            const Icon = s.icon
            return (
              <Link
                key={s.path}
                to={s.path}
                className="group bg-[#0f172a] border border-[#1e2d4a] rounded-xl p-4 hover:border-[#2d4a7a] hover:scale-[1.02] transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${s.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <p className="text-white font-semibold text-sm">{s.title}</p>
                <p className="text-[#475569] text-[10px] mt-1 leading-snug">{s.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Live news grid */}
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
        <h2 className="text-white font-bold text-xl">Today's Intelligence Brief</h2>
        <div className="flex items-center gap-1 ml-auto text-[#475569] text-xs">
          <Clock className="w-3 h-3" />
          <span>Auto-refreshes every 15 min</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <HomeNewsSection title="National" icon={Flag} color="#FF6B00" path="/national" category="national" query="india government" />
        <HomeNewsSection title="Defence" icon={Shield} color="#ef4444" path="/defence" category="defence" query="india military army defence" />
        <HomeNewsSection title="International" icon={Globe} color="#3b82f6" path="/international" category="world" query="global geopolitics" />
        <HomeNewsSection title="Indigenization" icon={Cpu} color="#10b981" path="/indigenization" category="science" query="india DRDO HAL BEL make in india defence" />
        <HomeNewsSection title="Geopolitics" icon={Map} color="#f59e0b" path="/geopolitics" category="politics" query="india china pakistan border security strategic" />
        <HomeNewsSection title="Science & Tech" icon={Rocket} color="#06b6d4" path="/science-tech" category="science" query="India ISRO technology space innovation" />
      </div>
    </div>
  )
}
