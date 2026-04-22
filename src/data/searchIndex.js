import { armyEquipment } from './armyEquipment'
import { navyEquipment } from './navyEquipment'
import { airforceEquipment } from './airforceEquipment'
import { armyUnits } from './regiments'
import { navyUnits } from './navyUnits'
import { iafUnits } from './iafUnits'
import { geopoliticsData } from './geopolitics'
import { operations } from './operations'

const CAT_COLOR = {
  'Army Equipment':    '#f97316',
  'Navy Equipment':    '#3b82f6',
  'Air Force Equipment': '#22d3ee',
  'Army Regiment':     '#f97316',
  'Navy Unit':         '#3b82f6',
  'IAF Unit':          '#22d3ee',
  'Geopolitics':       '#a78bfa',
  'Operation':         '#ef4444',
}

function mk(id, title, subtitle, category, path, keywords) {
  return { id, title, subtitle, category, path, color: CAT_COLOR[category] || '#94a3b8', keywords: keywords.toLowerCase() }
}

export const searchIndex = [
  ...armyEquipment.map(w =>
    mk(w.id, w.name, w.type, 'Army Equipment', '/weapons',
      `${w.name} ${w.type} ${w.description || ''} ${w.origin || ''} ${w.tags?.join(' ') || ''}`)),
  ...navyEquipment.map(w =>
    mk(w.id, w.name, w.type, 'Navy Equipment', '/weapons',
      `${w.name} ${w.type} ${w.description || ''} ${w.origin || ''}`)),
  ...airforceEquipment.map(w =>
    mk(w.id, w.name, w.type, 'Air Force Equipment', '/weapons',
      `${w.name} ${w.type} ${w.description || ''} ${w.origin || ''}`)),
  ...armyUnits.map(u =>
    mk(u.id, u.name, u.category, 'Army Regiment', '/regiments',
      `${u.name} ${u.category} ${u.motto || ''} ${u.battleHonours?.join(' ') || ''} ${u.famousSoldiers?.join(' ') || ''}`)),
  ...navyUnits.map(u =>
    mk(u.id, u.name, u.category, 'Navy Unit', '/regiments',
      `${u.name} ${u.category} ${u.battleHonours?.join(' ') || ''} ${u.areaOfOperations || ''}`)),
  ...iafUnits.map(u =>
    mk(u.id, u.name, u.category, 'IAF Unit', '/regiments',
      `${u.name} ${u.category} ${u.battleHonours?.join(' ') || ''} ${u.aircraftType || ''}`)),
  ...geopoliticsData.map(g =>
    mk(g.id, g.title, g.category, 'Geopolitics', '/geopolitics',
      `${g.title} ${g.category} ${g.summary || ''} ${g.keyPoints?.join(' ') || ''}`)),
  ...operations.map(o =>
    mk(o.id, o.name, `${o.type} · ${o.year}`, 'Operation', '/operations',
      `${o.name} ${o.type} ${o.year || ''} ${o.theatre || ''} ${o.significance || ''}`)),
]
