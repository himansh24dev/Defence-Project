import { Shield, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#070c1a] border-t border-[#1e2d4a] mt-16">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-[#FF6B00] rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">SSB<span className="text-[#FF6B00]">Pulse</span></span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-sm">
              A comprehensive intelligence hub for SSB aspirants. Stay updated with national, international, and defence affairs. All news sourced from verified, credible outlets.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Sections</h4>
            <ul className="space-y-2">
              {['National', 'International', 'Defence', 'Procurement', 'Indigenization', 'Geopolitics'].map(s => (
                <li key={s}>
                  <Link to={`/${s.toLowerCase()}`} className="text-[#64748b] hover:text-[#FF6B00] text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Official Sources</h4>
            <ul className="space-y-2">
              {[
                { name: 'Ministry of Defence', url: 'https://mod.gov.in' },
                { name: 'DRDO', url: 'https://drdo.gov.in' },
                { name: 'PIB India', url: 'https://pib.gov.in' },
                { name: 'Indian Army', url: 'https://indianarmy.nic.in' },
                { name: 'Indian Navy', url: 'https://indiannavy.nic.in' },
                { name: 'Indian Air Force', url: 'https://indianairforce.nic.in' },
              ].map(item => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#64748b] hover:text-[#FF6B00] text-sm transition-colors flex items-center gap-1"
                  >
                    {item.name} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e2d4a] mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#475569] text-xs">
            &copy; {new Date().getFullYear()} SSBPulse. For educational & SSB preparation use only.
          </p>
          <p className="text-[#475569] text-xs">
            News sourced from NewsData.io, GNews, PIB & official MoD channels
          </p>
        </div>
      </div>
    </footer>
  )
}
