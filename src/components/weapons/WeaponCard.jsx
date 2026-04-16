import { useState } from 'react'
import { ChevronDown, ChevronUp, Tag } from 'lucide-react'

const tagColors = {
  indigenous:      'bg-green-900/40 text-green-400 border-green-700/40',
  imported:        'bg-blue-900/40 text-blue-400 border-blue-700/40',
  licensed:        'bg-yellow-900/40 text-yellow-400 border-yellow-700/40',
  flagship:        'bg-orange-900/40 text-orange-400 border-orange-700/40',
  'joint-venture': 'bg-purple-900/40 text-purple-400 border-purple-700/40',
  strategic:       'bg-red-900/40 text-red-400 border-red-700/40',
  'nuclear-triad': 'bg-red-900/60 text-red-300 border-red-600/60',
  backbone:        'bg-slate-700/50 text-slate-300 border-slate-600/40',
  upcoming:        'bg-cyan-900/40 text-cyan-400 border-cyan-700/40',
  stealth:         'bg-indigo-900/40 text-indigo-400 border-indigo-700/40',
  historic:        'bg-amber-900/40 text-amber-400 border-amber-700/40',
  legacy:          'bg-slate-800/60 text-slate-400 border-slate-700/40',
}

const statusColors = {
  'In Service':            'text-green-400',
  'Under Construction':    'text-yellow-400',
  'Under Testing':         'text-cyan-400',
  'Development Phase':     'text-purple-400',
  'Procurement Finalised': 'text-blue-400',
  'Phasing out':           'text-orange-400',
  'Phasing Out / Active':  'text-orange-400',
  'In Service (partial)':  'text-yellow-400',
  'Lease negotiated':      'text-cyan-400',
}

export default function WeaponCard({ weapon }) {
  const [expanded, setExpanded] = useState(false)

  const statusColor = Object.entries(statusColors).find(([k]) =>
    weapon.status?.startsWith(k)
  )?.[1] || 'text-slate-400'

  return (
    <div className="bg-[#0f172a] border border-[#1e2d4a] rounded-2xl overflow-hidden hover:border-[#2d4a7a] transition-all duration-200">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="text-white font-bold text-base leading-tight">{weapon.name}</h3>
            <p className="text-[#64748b] text-xs mt-0.5">{weapon.type}</p>
          </div>
          <span className={`text-[10px] font-semibold shrink-0 mt-0.5 ${statusColor}`}>
            ● {weapon.status?.split('(')[0].trim()}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {weapon.tags?.map(tag => (
            <span
              key={tag}
              className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${tagColors[tag] || 'bg-slate-800 text-slate-400 border-slate-700'}`}
            >
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>

        {/* Quick info */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-[#0a0f1e] rounded-lg px-3 py-2">
            <p className="text-[#475569] text-[9px] uppercase tracking-wider">Origin</p>
            <p className="text-[#94a3b8] text-xs mt-0.5 leading-snug">{weapon.origin}</p>
          </div>
          <div className="bg-[#0a0f1e] rounded-lg px-3 py-2">
            <p className="text-[#475569] text-[9px] uppercase tracking-wider">Inducted</p>
            <p className="text-[#94a3b8] text-xs mt-0.5">{weapon.inducted}</p>
          </div>
          {weapon.quantity && (
            <div className="bg-[#0a0f1e] rounded-lg px-3 py-2 col-span-2">
              <p className="text-[#475569] text-[9px] uppercase tracking-wider">Quantity in Service</p>
              <p className="text-[#94a3b8] text-xs mt-0.5">{weapon.quantity}</p>
            </div>
          )}
        </div>

        <p className="text-[#64748b] text-xs leading-relaxed line-clamp-2">{weapon.description}</p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1.5 text-[#FF6B00] text-xs font-medium hover:text-[#ff8c33] transition-colors"
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Full Specs & Significance</>
          )}
        </button>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div className="border-t border-[#1e2d4a] bg-[#070c1a] p-5 space-y-4">
          {/* Specs */}
          {weapon.specs && (
            <div>
              <h4 className="text-[#94a3b8] text-[10px] uppercase tracking-wider mb-2">Technical Specifications</h4>
              <div className="grid grid-cols-1 gap-1.5">
                {Object.entries(weapon.specs).map(([key, val]) => (
                  <div key={key} className="flex gap-3 py-1.5 border-b border-[#1e2d4a]/60 last:border-0">
                    <span className="text-[#475569] text-xs w-32 shrink-0">{key}</span>
                    <span className="text-[#cbd5e1] text-xs flex-1">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full description */}
          <div>
            <h4 className="text-[#94a3b8] text-[10px] uppercase tracking-wider mb-2">Details</h4>
            <p className="text-[#94a3b8] text-xs leading-relaxed">{weapon.description}</p>
          </div>

          {/* Significance */}
          {weapon.significance && (
            <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-xl p-3">
              <h4 className="text-[#FF6B00] text-[10px] uppercase tracking-wider mb-1">SSB Significance</h4>
              <p className="text-[#fca97e] text-xs leading-relaxed">{weapon.significance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
