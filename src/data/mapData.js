// India Interactive Map Data — Verified April 2026
// All coordinates in [lat, lng] (WGS-84). Sources: Survey of India, NPCIL, AAI, MoPSW, MoD.

export const MAP_CATEGORIES = [
  // Geography
  { id: 'rivers',      group: 'Geography',       label: 'Rivers',                  color: '#3b82f6', type: 'line',  icon: '〰️' },
  { id: 'lakes',       group: 'Geography',       label: 'Lakes & Wetlands',         color: '#06b6d4', type: 'point', icon: '💧', radius: 7 },
  { id: 'ranges',      group: 'Geography',       label: 'Mountain Ranges',          color: '#94a3b8', type: 'line',  icon: '⛰️' },
  { id: 'passes',      group: 'Geography',       label: 'Mountain Passes',          color: '#a78bfa', type: 'point', icon: '🏔️', radius: 6 },
  // Administration
  { id: 'capitals',    group: 'Administration',  label: 'State & UT Capitals',      color: '#f97316', type: 'point', icon: '🏛️', radius: 6 },
  // Transport
  { id: 'airports',    group: 'Transport',       label: 'International Airports',   color: '#e2e8f0', type: 'point', icon: '✈️', radius: 6 },
  { id: 'ports',       group: 'Transport',       label: 'Major Seaports',           color: '#f59e0b', type: 'point', icon: '⚓', radius: 6 },
  { id: 'dams',        group: 'Transport',       label: 'Major Dams',               color: '#64748b', type: 'point', icon: '🏗️', radius: 6 },
  // Energy
  { id: 'nuclear',     group: 'Energy',          label: 'Nuclear Power Plants',     color: '#22c55e', type: 'point', icon: '☢️', radius: 8 },
  { id: 'thermal',     group: 'Energy',          label: 'Thermal Power Plants',     color: '#ef4444', type: 'point', icon: '🔥', radius: 6 },
  // Nature
  { id: 'parks',       group: 'Nature',          label: 'National Parks & Reserves',color: '#4ade80', type: 'point', icon: '🌿', radius: 7 },
  // Defence
  { id: 'army_hq',     group: 'Defence',         label: 'Army Command HQs',         color: '#fb923c', type: 'point', icon: '⚔️', radius: 7 },
  { id: 'naval',       group: 'Defence',         label: 'Naval Bases',              color: '#60a5fa', type: 'point', icon: '⚓', radius: 7 },
  { id: 'iaf',         group: 'Defence',         label: 'IAF Air Stations',         color: '#22d3ee', type: 'point', icon: '✈️', radius: 6 },
  { id: 'academies',   group: 'Defence',         label: 'Military Academies',       color: '#fbbf24', type: 'point', icon: '🎖️', radius: 6 },
  // Strategic
  { id: 'space',       group: 'Strategic',       label: 'Space & Missile Centres',  color: '#c084fc', type: 'point', icon: '🚀', radius: 7 },
  { id: 'strategic',   group: 'Strategic',       label: 'Strategic Sites',          color: '#f43f5e', type: 'point', icon: '🎯', radius: 7 },
  { id: 'battlefields',group: 'Strategic',       label: 'Historic Battlefields',    color: '#fb923c', type: 'point', icon: '🗡️', radius: 6 },
]

// ─── RIVERS (polylines) ────────────────────────────────────────────────────────
export const rivers = [
  {
    id: 'ganga', name: 'Ganga (Ganges)',
    info: 'India\'s most sacred river. Source: Gangotri Glacier (Uttarakhand) at 3,892 m. Length: 2,525 km. Drains into Bay of Bengal at Sagar Island (West Bengal). Basin: 26% of India\'s total area. Tributary: Yamuna, Son, Ghaghra, Kosi.',
    path: [[30.99,79.07],[30.12,78.32],[29.95,78.16],[28.40,77.70],[27.60,79.90],[26.50,80.35],[25.45,81.93],[25.31,82.97],[25.57,85.14],[25.24,86.99],[24.85,87.92],[22.15,88.50]],
  },
  {
    id: 'yamuna', name: 'Yamuna',
    info: 'Largest tributary of Ganga. Source: Yamunotri Glacier (Uttarakhand) at 6,387 m. Length: 1,376 km. Meets Ganga at Prayagraj (Triveni Sangam). Major cities: Delhi, Agra, Mathura.',
    path: [[31.02,78.46],[30.38,77.88],[28.62,77.21],[27.52,77.67],[27.18,78.01],[26.78,79.00],[25.45,81.88]],
  },
  {
    id: 'brahmaputra', name: 'Brahmaputra',
    info: 'One of the world\'s largest rivers. Known as Yarlung Tsangpo in Tibet, Siang in Arunachal. Length in India: ~916 km. Total: ~2,900 km. Drains into Bay of Bengal via Bangladesh. States: Arunachal Pradesh, Assam. Responsible for Assam floods.',
    path: [[28.19,95.50],[27.83,95.10],[27.47,95.00],[26.80,94.20],[26.63,92.80],[26.18,91.74],[25.98,90.00],[25.89,89.80]],
  },
  {
    id: 'godavari', name: 'Godavari',
    info: '"Dakshina Ganga" (Ganga of the South). Source: Trimbakeshwar (Nashik, Maharashtra) at 1,067 m. Length: 1,465 km — second longest river in India. States: Maharashtra, Telangana, Andhra Pradesh. Drains into Bay of Bengal at Antarvedi, AP.',
    path: [[19.93,73.53],[20.00,73.80],[20.30,75.00],[19.17,77.32],[18.45,79.10],[17.70,80.50],[17.03,81.80],[16.50,82.20]],
  },
  {
    id: 'krishna', name: 'Krishna',
    info: 'Source: Mahabaleshwar (Maharashtra) at 1,337 m. Length: 1,400 km. States: Maharashtra, Karnataka, Andhra Pradesh. Drains into Bay of Bengal at Hamasaladeevi, AP. Key dams: Nagarjuna Sagar, Srisailam, Almatti.',
    path: [[17.92,73.65],[17.28,74.18],[16.87,74.57],[16.20,77.35],[16.10,78.92],[16.57,79.32],[16.52,80.62],[15.72,80.95]],
  },
  {
    id: 'kaveri', name: 'Kaveri (Cauvery)',
    info: 'Source: Talakaveri, Kodagu (Karnataka) at 1,341 m. Length: 800 km. States: Karnataka, Tamil Nadu. "Sacred river of the South." Drains into Bay of Bengal at Poompuhar. Key dams: KRS, Mettur. Kaveri water dispute: historic Karnataka–Tamil Nadu conflict.',
    path: [[12.40,75.57],[12.35,75.88],[12.42,76.57],[12.31,77.22],[11.93,78.38],[11.34,77.73],[10.93,78.10],[10.83,78.70],[10.93,79.42],[11.15,79.90]],
  },
  {
    id: 'narmada', name: 'Narmada',
    info: 'Source: Amarkantak plateau (MP) at 1,057 m. Length: 1,312 km. States: MP, Maharashtra, Gujarat. Drains into Gulf of Khambhat (Arabian Sea). Unique: flows WEST (unlike most Indian rivers). Separates North India from Deccan. Sardar Sarovar Dam: tallest dam in India (163 m).',
    path: [[22.67,81.75],[23.17,79.93],[22.22,76.20],[22.17,75.59],[22.00,74.50],[21.75,73.17],[21.67,73.00],[21.53,72.72]],
  },
  {
    id: 'tapti', name: 'Tapti (Tapi)',
    info: 'Source: Multai, Betul district (MP) at 752 m. Length: 724 km. States: MP, Maharashtra, Gujarat. Drains into Gulf of Khambhat (Arabian Sea). One of India\'s two major westward-flowing rivers (along with Narmada). Passes through Surat.',
    path: [[21.77,78.25],[21.87,77.88],[21.28,76.22],[21.02,75.80],[21.17,74.00],[21.20,73.00]],
  },
  {
    id: 'mahanadi', name: 'Mahanadi',
    info: 'Source: Sihawa (Dhamtari district, Chhattisgarh). Length: 858 km. States: Chhattisgarh, Odisha. Drains into Bay of Bengal near Paradip. Hirakud Dam on Mahanadi = one of the world\'s longest earthen dams (25.8 km). Mahanadi water dispute: Chhattisgarh vs Odisha.',
    path: [[20.47,82.25],[21.25,81.63],[21.53,83.87],[21.50,83.90],[21.35,84.50],[20.78,86.05],[20.45,86.65]],
  },
  {
    id: 'chambal', name: 'Chambal',
    info: 'Source: Singar Chouri (Vindhyas, near Mhow, MP) at 843 m. Length: 960 km. States: MP, Rajasthan, UP. Joins Yamuna near Etawah. Known for ravines and dacoits. Chambal Wildlife Sanctuary: gharials and Gangetic dolphins.',
    path: [[22.55,75.10],[22.30,75.65],[24.07,76.25],[25.17,75.83],[25.60,77.13],[26.30,78.60],[26.82,79.01]],
  },
  {
    id: 'son', name: 'Son',
    info: 'Source: Amarkantak plateau (MP) — same highland as Narmada source. Length: 784 km. States: MP, Jharkhand, UP, Bihar. Joins Ganga near Patna. Second largest southern tributary of Ganga.',
    path: [[22.67,81.75],[23.27,81.38],[24.28,81.88],[24.55,81.30],[24.83,83.00],[25.50,83.85],[25.70,84.83]],
  },
  {
    id: 'damodar', name: 'Damodar',
    info: '"Sorrow of Bengal" (due to historic floods; now controlled by DVC). Source: Palamau district, Jharkhand. Length: 592 km. States: Jharkhand, West Bengal. Joins Hooghly river near Falta. Damodar Valley Corporation (DVC) = India\'s first multi-purpose river valley project (1948).',
    path: [[23.55,84.08],[23.80,86.43],[23.63,87.23],[23.45,87.72],[22.92,88.18]],
  },
  {
    id: 'betwa', name: 'Betwa',
    info: 'Source: Vindhya range near Bhopal (MP). Length: 590 km. States: MP, UP. Joins Yamuna near Hamirpur. Major dams: Rajghat Dam, Matitila Dam. Betwa river interlinking project (Ken–Betwa Link): India\'s first river-link project, approved 2022.',
    path: [[23.17,77.42],[23.53,77.83],[25.35,78.63],[25.92,80.08]],
  },
  {
    id: 'indus', name: 'Indus (in India — Ladakh & J&K only)',
    info: 'One of the world\'s great rivers (total 3,180 km). In India: ~709 km through Ladakh and J&K. Source: Tibet (Sengge Zangbo). Enters India near Demchok, Ladakh. Flows NW through Leh, then southwest into Pakistan. Indus Waters Treaty (1960): India gets Ravi, Beas, Sutlej; Pakistan gets Indus, Jhelum, Chenab.',
    path: [[32.55,79.50],[33.20,78.80],[34.17,77.58],[34.62,76.10],[34.95,75.00],[34.58,74.50],[34.10,74.47]],
  },
  {
    id: 'sutlej', name: 'Sutlej (in India)',
    info: 'Source: Mansarovar/Rakas Tal (Tibet). Length in India: ~600 km through Himachal Pradesh and Punjab. Enters India near Shipki La. Key dam: Bhakra Dam (226 m — tallest gravity dam in India). Indus Waters Treaty: India retains full rights. Joins Chenab in Pakistan.',
    path: [[31.83,78.62],[31.41,76.43],[31.00,76.50],[30.93,75.90],[30.92,74.63]],
  },
  {
    id: 'mahi', name: 'Mahi',
    info: 'Source: Vindhya range, Dhar district (MP). Length: 583 km. States: MP, Rajasthan, Gujarat. Drains into Gulf of Khambhat (Arabian Sea). Crosses the Tropic of Cancer twice. Key dam: Kadana Dam (Gujarat).',
    path: [[22.68,74.60],[23.80,73.68],[22.98,73.18],[22.30,73.17],[22.15,72.88]],
  },
  {
    id: 'sabarmati', name: 'Sabarmati',
    info: 'Source: Aravalli hills (Udaipur district, Rajasthan). Length: 371 km. States: Rajasthan, Gujarat. Passes through Ahmedabad. Drains into Gulf of Khambhat. Gandhi\'s Sabarmati Ashram is on its banks. Sabarmati Riverfront Development Project.',
    path: [[24.58,73.72],[24.48,73.42],[23.68,72.85],[23.03,72.58],[22.17,72.38]],
  },
  {
    id: 'teesta', name: 'Teesta',
    info: 'Source: Tso Lhamo lake, North Sikkim at 5,330 m. Length: ~315 km in India. States: Sikkim, West Bengal. Meets Brahmaputra near Fulchhari, Bangladesh. Siliguri Corridor ("Chicken\'s Neck") is bisected by Teesta. Teesta water-sharing: ongoing dispute between India and Bangladesh.',
    path: [[27.80,88.55],[27.33,88.62],[26.85,88.52],[26.72,88.42],[26.53,88.32],[25.60,89.98]],
  },
  {
    id: 'luni', name: 'Luni',
    info: 'Source: Nag Hills near Ajmer (Rajasthan). Length: 495 km. Flows through Rajasthan\'s Thar Desert. Drains into Rann of Kutch (seasonal river — dries up in dry season). Salt content increases downstream (name derives from Sanskrit "lavani" = salt). Passes near Barmer oil fields.',
    path: [[26.45,74.55],[26.33,73.80],[26.42,72.98],[25.83,72.20],[25.17,71.60],[24.52,71.22]],
  },
]

// ─── LAKES & WETLANDS ──────────────────────────────────────────────────────────
export const lakes = [
  { id: 'wular',    name: 'Wular Lake',      lat: 34.367, lng: 74.550, info: 'Largest freshwater lake in India. J&K. Area: ~189 sq km. Fed by Jhelum river. Ramsar Wetland Site. Threatened by water hyacinth and encroachment.' },
  { id: 'dal',      name: 'Dal Lake',        lat: 34.121, lng: 74.883, info: 'Iconic lake in Srinagar, J&K. Area: ~18 sq km. Known for houseboats and shikaras. Ramsar site. Heavily siltated due to urban encroachment. Nagin Lake is a part of Dal.' },
  { id: 'pangong',  name: 'Pangong Tso',     lat: 33.750, lng: 78.700, info: 'Endorheic lake on India–China LAC. Altitude: 4,350 m. Area: 700 sq km (60% in China). Saltwater. Famous for Finger Area standoff (2020 Galwan crisis). No aquatic life due to salinity.' },
  { id: 'chilika',  name: 'Chilika Lake',    lat: 19.717, lng: 85.317, info: 'Largest coastal lagoon in India and 2nd largest in the world. Odisha. Area: ~1,100 sq km. Ramsar site. Home to Irrawaddy dolphins and millions of migratory birds. Nalbana Island bird sanctuary.' },
  { id: 'vembanad', name: 'Vembanad Lake',   lat: 9.617,  lng: 76.383, info: 'Largest lake in Kerala. Area: ~2,033 sq km — longest lake in India. Ramsar site. Backwaters of Kerala. Kumarakom Bird Sanctuary on its shores. Nehru Trophy Boat Race venue.' },
  { id: 'pulicat',  name: 'Pulicat Lake',    lat: 13.650, lng: 80.200, info: 'Second largest brackish water lagoon in India. Straddles AP–Tamil Nadu border. Area: ~720 sq km. Flamingo habitat. Sriharikota Island (ISRO launch site) separates it from the Bay of Bengal.' },
  { id: 'loktak',   name: 'Loktak Lake',     lat: 24.517, lng: 93.783, info: 'Largest freshwater lake in Northeast India. Manipur. Area: ~287 sq km. Famous for "phumdis" (floating heterogeneous mass of vegetation). Keibul Lamjao National Park — world\'s only floating national park — on it.' },
  { id: 'sambhar',  name: 'Sambhar Lake',    lat: 26.900, lng: 75.083, info: 'India\'s largest inland saltwater lake. Rajasthan. Area: ~230 sq km. Ramsar site. Major source of salt for India (8.7% of India\'s salt production). Flamingo breeding habitat. Near Jaipur.' },
  { id: 'kolleru',  name: 'Kolleru Lake',    lat: 16.617, lng: 81.217, info: 'One of India\'s largest freshwater lakes. Andhra Pradesh. Area: ~901 sq km. Ramsar site. Located between Krishna and Godavari deltas. Spot-billed pelican breeding ground.' },
  { id: 'tsomoriri',name: 'Tso Moriri',      lat: 32.900, lng: 78.283, info: 'High-altitude lake in Ladakh at 4,522 m AMSL. Area: ~120 sq km. Ramsar site. No outlet (endorheic). Black-necked crane and bar-headed geese breeding habitat. Near Korzok village.' },
  { id: 'nainital', name: 'Nainital Lake',   lat: 29.383, lng: 79.467, info: 'Natural freshwater lake in Kumaon Himalayas (Uttarakhand). Area: ~0.9 sq km. Named after goddess Naina Devi. Hill station. Source of drinking water for Nainital town.' },
  { id: 'pushkar',  name: 'Pushkar Lake',    lat: 26.490, lng: 74.550, info: 'Sacred Hindu lake. Rajasthan. One of 5 sacred dhams. Area: ~0.2 sq km. Fed by underground springs. Famous Pushkar Camel Fair. Brahma Temple on its shores — one of few Brahma temples in India.' },
  { id: 'osman',    name: 'Hussain Sagar',   lat: 17.445, lng: 78.475, info: 'Artificial lake in Hyderabad (Telangana). Built 1563 by Ibrahim Quli Qutb Shah. Famous for Buddha statue (tallest stone monolith of Buddha in world — 17.5 m). Connects Hyderabad and Secunderabad.' },
  { id: 'lonar',    name: 'Lonar Lake',      lat: 19.983, lng: 76.500, info: 'Only hyper-velocity meteor impact crater lake in basaltic rock in the world. Maharashtra. Age: ~52,000 years. Diameter: 1.8 km. Highly alkaline/saline. Ramsar site (2020). Unique ecosystem; pink algae (halobacteria) discovered 2020.' },
  { id: 'bhimtal',  name: 'Bhimtal Lake',    lat: 29.333, lng: 79.533, info: 'Freshwater lake in Uttarakhand. Area: ~0.47 sq km. Larger than Nainital Lake. Island in centre with an aquarium. Less crowded than Nainital. Near Bhimeshwar Mahadev temple.' },
]

// ─── MOUNTAIN RANGES (polylines) ───────────────────────────────────────────────
export const ranges = [
  {
    id: 'himalayas', name: 'Himalayas',
    info: 'World\'s highest mountain range. Spans 2,400 km west to east. Contains 14 of the world\'s 15 highest peaks. Average height: 6,000 m. India-China-Nepal-Bhutan-Pakistan border range. Three parallel ranges: Shivalik (outer), Lesser Himalayas, Greater Himalayas.',
    path: [[35.90,74.30],[34.50,76.00],[32.50,77.00],[31.50,78.00],[30.50,79.50],[29.50,81.50],[28.50,84.00],[27.70,86.92],[27.50,88.50],[27.83,91.50],[28.22,93.50],[28.00,95.50],[27.50,97.40]],
  },
  {
    id: 'karakoram', name: 'Karakoram Range',
    info: 'Contains K2 (8,611 m) — world\'s second highest peak. In Ladakh (India) and POK. Siachen Glacier (76 km — world\'s longest non-polar glacier) is in Karakoram. Saltoro Range is a sub-range where India and Pakistan dispute Siachen.',
    path: [[35.90,74.30],[36.00,76.00],[35.50,77.50],[35.00,78.50],[34.80,79.50]],
  },
  {
    id: 'aravalli', name: 'Aravalli Range',
    info: 'World\'s oldest fold mountain range (~3.5 billion years old). Extends 800 km from Gujarat (Palanpur) to Delhi. Highest peak: Guru Shikhar (1,722 m) in Abu Road, Rajasthan. Separates Thar Desert from Gangetic plain. Mount Abu is only hill station in Rajasthan.',
    path: [[24.17,72.98],[24.50,73.00],[25.50,73.52],[26.40,73.75],[27.13,74.38],[27.87,75.65],[28.62,77.17]],
  },
  {
    id: 'vindhya', name: 'Vindhya Range',
    info: 'Ancient range in Central India, central MP. Separates the Ganga plain from the Deccan Plateau. Part of it runs east-west. Average height: 300–650 m. Historically formed a cultural divide between North and South India. Contains Amarkantak (source of Narmada and Son).',
    path: [[22.50,73.97],[22.50,76.00],[22.50,78.00],[23.00,81.00],[23.50,83.00]],
  },
  {
    id: 'satpura', name: 'Satpura Range',
    info: '"Seven folds" range parallel to and south of Vindhyas. Extends east-west through MP and Maharashtra. Highest peak: Dhupgarh (1,352 m) near Pachmarhi. Separates Narmada (north) and Tapti (south) river systems. Pachmarhi: only hill station in MP.',
    path: [[21.50,74.50],[21.67,76.50],[22.00,78.50],[21.50,80.50],[21.00,81.50]],
  },
  {
    id: 'western_ghats', name: 'Western Ghats (Sahyadri)',
    info: 'UNESCO World Heritage Site. Extends 1,600 km along India\'s western coast. Highest peak: Anamudi (2,695 m) in Kerala — highest peak in Peninsular India. Receives heavy orographic rainfall (2,000–6,000 mm/yr). Source of peninsular rivers: Godavari, Krishna, Kaveri. Biodiversity hotspot.',
    path: [[21.50,73.80],[20.50,73.50],[19.00,73.30],[17.50,73.50],[15.50,74.00],[14.00,74.50],[13.00,75.17],[12.00,75.50],[11.00,76.50],[10.00,77.50],[9.50,77.22],[8.52,77.20]],
  },
  {
    id: 'eastern_ghats', name: 'Eastern Ghats',
    info: 'Discontinuous range of hills along India\'s eastern coast. Extends 1,750 km through Odisha, AP, TN. Highest peak: Jindhagada (1,690 m) in AP. Less steep than Western Ghats. Heavily deforested. Separates coastal plains from Deccan Plateau.',
    path: [[19.50,84.00],[18.50,83.50],[17.50,82.50],[16.50,81.50],[15.00,79.50],[14.00,79.00],[13.00,78.50],[12.00,78.00],[11.50,77.50]],
  },
  {
    id: 'shivalik', name: 'Shivalik Hills (Outer Himalayas)',
    info: 'Southernmost and youngest Himalayan range. Also called Sub-Himalayan range. Extends from Potwar Plateau (Pakistan) to Arunachal Pradesh (~2,400 km). Average height: 600–1,500 m. IMA Dehradun, Chandigarh, and Roorkee lie in/near Shivalik foothills. Dun valleys (Dehradun, Patlidun) between Shivalik and Lesser Himalayas.',
    path: [[33.00,74.00],[31.50,75.50],[30.00,77.50],[29.50,79.50],[28.50,82.00],[27.50,84.50]],
  },
]

// ─── MOUNTAIN PASSES ──────────────────────────────────────────────────────────
export const passes = [
  { id: 'khardung',  name: 'Khardung La',     lat: 34.267, lng: 77.600, info: 'Altitude: 5,359 m. Ladakh. World\'s highest motorable pass (claimed). On the road from Leh to Shyok and Nubra Valley. Strategic: connects Leh to Siachen Glacier area. GREF/BRO maintained.' },
  { id: 'zojila',    name: 'Zoji La',          lat: 34.258, lng: 75.483, info: 'Altitude: 3,528 m. J&K. Connects Srinagar (Kashmir Valley) to Leh (Ladakh). NH-1 passes through it. Strategic: falls here in 1947–48 war blocked supply to Leh; recaptured by Indian Army (Operation Bison). Zoji La tunnel under construction (2024).' },
  { id: 'nathula',   name: 'Nathu La',         lat: 27.383, lng: 88.830, info: 'Altitude: 4,310 m. Sikkim. Connects India to Tibet (China). Part of ancient Silk Road. Sino-Indian War 1967 (India repulsed Chinese assault here). Reopened for trade 2006. India–China border post; joint celebrations on Independence Day.' },
  { id: 'rohtang',   name: 'Rohtang Pass',     lat: 32.370, lng: 77.250, info: 'Altitude: 3,978 m. Himachal Pradesh. Connects Kullu Valley to Lahaul-Spiti. NH-3 passes through it. Atal Tunnel (Rohtang Tunnel, 9.02 km — world\'s longest highway tunnel above 10,000 ft): opened Oct 2020, bypasses pass.' },
  { id: 'lipulekh',  name: 'Lipulekh Pass',    lat: 30.170, lng: 80.250, info: 'Altitude: 5,200 m. Uttarakhand. Tri-junction of India, Nepal, and China (Tibet). Traditional route to Kailash Mansarovar Yatra. BRO opened strategic road to Lipulekh (May 2020). Nepal protests India\'s claim over area.' },
  { id: 'banihal',   name: 'Banihal Pass',     lat: 33.483, lng: 75.200, info: 'Altitude: 2,832 m. J&K. Connects Jammu region to Srinagar. NH-44 passes through. Jawahar Tunnel (2.5 km) and new Banihal–Qazigund Railway Tunnel (11.2 km, 2013) bypass the pass. Strategic: connects J&K\'s two divisions.' },
  { id: 'shipkila',  name: 'Shipki La',        lat: 31.783, lng: 78.617, info: 'Altitude: 5,669 m. Himachal Pradesh. India–China border on Sutlej river. Indo-China trade route; goods from Tibet enter India here. ITBP posts at Shipki La.' },
  { id: 'bomdila',   name: 'Bomdila Pass',     lat: 27.267, lng: 92.417, info: 'Altitude: 2,415 m. Arunachal Pradesh. Connects Arunachal to Assam plains. 1962 Sino-Indian War: Chinese forces captured Bomdila, threatening Assam plains before unilateral ceasefire. Tawang sector is north of Bomdila.' },
  { id: 'chanla',    name: 'Chang La',         lat: 33.983, lng: 78.000, info: 'Altitude: 5,360 m. Ladakh. Third highest motorable road in India. Connects Leh to Pangong Tso. BRO maintained. Strategic: critical supply route to Pangong Lake posts (Finger Area).' },
  { id: 'baralacha', name: 'Bara-Lacha La',    lat: 32.733, lng: 77.417, info: 'Altitude: 4,890 m. Himachal Pradesh. Tri-watershed: source of Bhaga, Yunan and Chandra rivers. On Manali–Leh Highway (NH-3). BRO managed. Atal Rohtang Tunnel has reduced the need to cross this in winter.' },
]

// ─── STATE & UT CAPITALS ──────────────────────────────────────────────────────
export const capitals = [
  // States
  { id: 'delhi',    name: 'New Delhi (Delhi UT)',        lat: 28.614, lng: 77.202, info: 'Capital of India. Population: ~32 million (NCT). Centre of executive, legislative, judicial power. 3 UNESCO sites: Qutb Minar, Red Fort, Humayun\'s Tomb.' },
  { id: 'mumbai',   name: 'Mumbai (Maharashtra)',        lat: 19.076, lng: 72.878, info: 'State capital of Maharashtra. Financial capital of India. India\'s largest city (pop. ~20M). Mumbai Port and JNPT together handle ~40% of India\'s container traffic.' },
  { id: 'bangalore',name: 'Bengaluru (Karnataka)',       lat: 12.972, lng: 77.594, info: '"Silicon Valley of India." IT capital. India\'s 3rd largest city. Home to ISRO, HAL, BEL, DRDO. Kempegowda International Airport is one of India\'s busiest.' },
  { id: 'hyderabad',name: 'Hyderabad (Telangana)',       lat: 17.385, lng: 78.487, info: '"City of Nawabs." State capital of Telangana (since 2014 bifurcation). Also serves as AP capital till 2024. DRDO headquarters. Genome Valley (biotech).' },
  { id: 'chennai',  name: 'Chennai (Tamil Nadu)',        lat: 13.083, lng: 80.270, info: 'State capital of Tamil Nadu. "Detroit of India" (automobile manufacturing). Major port city. HQ of Southern Naval Command (Kochi) and Eastern Naval Command (Visakhapatnam).' },
  { id: 'kolkata',  name: 'Kolkata (West Bengal)',       lat: 22.573, lng: 88.364, info: 'State capital of West Bengal. Former capital of British India (till 1911). HQ of Eastern Command (Fort William). Major port. Cultural capital of India.' },
  { id: 'jaipur',   name: 'Jaipur (Rajasthan)',          lat: 26.913, lng: 75.787, info: '"Pink City." State capital. Amber Fort, City Palace. HQ of Army\'s South Western Command. Jaipur International Airport.' },
  { id: 'lucknow',  name: 'Lucknow (Uttar Pradesh)',     lat: 26.847, lng: 80.947, info: '"City of Nawabs." State capital of UP (largest state by population). HQ of Army\'s Central Command.' },
  { id: 'bhopal',   name: 'Bhopal (Madhya Pradesh)',     lat: 23.259, lng: 77.413, info: '"City of Lakes." State capital of MP. Site of 1984 Bhopal Gas Tragedy (Union Carbide — worst industrial disaster). IAF 21 Corps (Strike Corps) nearby.' },
  { id: 'patna',    name: 'Patna (Bihar)',                lat: 25.611, lng: 85.143, info: 'State capital of Bihar. One of world\'s oldest continuously inhabited cities (Pataliputra — ancient Mauryan capital). On Ganga river bank.' },
  { id: 'raipur',   name: 'Raipur (Chhattisgarh)',       lat: 21.254, lng: 81.629, info: 'State capital of Chhattisgarh. "Steel city" — major iron ore and steel producing state. Bhilai Steel Plant nearby.' },
  { id: 'ranchi',   name: 'Ranchi (Jharkhand)',           lat: 23.344, lng: 85.310, info: 'State capital of Jharkhand. "City of Waterfalls." Mineral-rich state: coal, iron ore, copper, uranium. Heavy Engineering Corporation (HEC).' },
  { id: 'bhubaneswar', name: 'Bhubaneswar (Odisha)',     lat: 20.296, lng: 85.825, info: '"Temple City of India." State capital of Odisha. Home to 700+ ancient temples. Odisha Space Application Centre. Adjacent to Cuttack (old capital).' },
  { id: 'dispur',   name: 'Dispur/Guwahati (Assam)',     lat: 26.144, lng: 91.736, info: 'Dispur is the capital; Guwahati is the largest city. Gateway to Northeast India. Kamakhya Temple (Shakti Peetha). On Brahmaputra. HQ of Assam Rifles.' },
  { id: 'itanagar', name: 'Itanagar (Arunachal Pradesh)',lat: 27.100, lng: 93.617, info: 'State capital. Easternmost state capital. China disputes entire Arunachal Pradesh as "South Tibet." Tawang Monastery (largest in India). Birthplace of Donyi-Polo religion.' },
  { id: 'aizawl',   name: 'Aizawl (Mizoram)',            lat: 23.733, lng: 92.717, info: 'State capital. Perched on hilltop at ~1,132 m. Mizoram has highest literacy rate (91.3%) in NE India. Mizoram Peace Accord (1986) ended longest insurgency.' },
  { id: 'imphal',   name: 'Imphal (Manipur)',             lat: 24.817, lng: 93.950, info: 'State capital. Battle of Imphal (1944): decisive Allied victory over Japan in WWII — turning point of Burma Campaign. Loktak Lake nearby. Polo originated here (oldest polo ground in world).' },
  { id: 'shillong', name: 'Shillong (Meghalaya)',         lat: 25.567, lng: 91.883, info: '"Scotland of the East." State capital. HQ of Eastern Air Command (IAF). Highest rainfall area in India (Cherrapunji/Mawsynram nearby — wettest places on Earth, ~12,000 mm/year).' },
  { id: 'kohima',   name: 'Kohima (Nagaland)',            lat: 25.667, lng: 94.117, info: 'State capital. Battle of Kohima (1944): British-Indian forces vs Japan — "Stalingrad of the East." Kohima War Cemetery. State hornbill festival. Nagaland became state in 1963.' },
  { id: 'agartala', name: 'Agartala (Tripura)',           lat: 23.831, lng: 91.281, info: 'State capital of Tripura. Almost entirely surrounded by Bangladesh. Ujjayanta Palace (Royal Palace). Tripura Sundari temple. Bangladesh border 2 km from city.' },
  { id: 'gangtok',  name: 'Gangtok (Sikkim)',             lat: 27.333, lng: 88.617, info: 'State capital. Altitude: ~1,650 m. Nathu La pass (India–China border) is 54 km away. Kanchenjunga (8,586 m — 3rd highest peak) visible from city. Smallest state by area (7,096 sq km).' },
  { id: 'dehradun', name: 'Dehradun (Uttarakhand)',       lat: 30.317, lng: 78.033, info: 'State capital. "Education capital of India" — IMA, RIMC, Survey of India HQ, Forest Research Institute, Doon School. In Doon Valley between Shivalik and Himalayas.' },
  { id: 'shimla',   name: 'Shimla (Himachal Pradesh)',    lat: 31.104, lng: 77.167, info: 'State capital. Summer capital of British India. HQ of Army Training Command (ARTRAC). Simla Pact (1972): India-Pakistan agreement after 1971 war. UNESCO toy train to Kalka.' },
  { id: 'chandigarh',name:'Chandigarh (UT / Punjab-Haryana capital)',lat:30.733,lng:76.783, info:'UT and joint capital of Punjab and Haryana. Planned city designed by Le Corbusier. HQ of Western Command (Indian Army at nearby Chandimandir). Sector-17 is the hub.' },
  { id: 'srinagar', name: 'Srinagar (J&K — summer capital)', lat: 34.083, lng: 74.800, info: 'Summer capital of J&K UT. Dal Lake and houseboats. Mughal gardens. Site of IB Line/LoC conflict since 1947. Article 370 revoked August 2019; J&K became UT.' },
  { id: 'jammu',    name: 'Jammu (J&K — winter capital)', lat: 32.733, lng: 74.867, info: 'Winter capital of J&K UT. "City of Temples." Vaishno Devi (among India\'s holiest shrines, ~8M visitors/year) is 50 km away. HQ of Northern Command at nearby Udhampur.' },
  { id: 'leh',      name: 'Leh (Ladakh UT)',              lat: 34.167, lng: 77.583, info: 'Capital of Ladakh UT. Altitude: 3,524 m. Pangong Tso 140 km east; LAC with China ~65 km east. HQ of XIV Corps (Fire & Fury Corps). Kushok Bakula Rimpochhe Airport — IAF\'s highest operational base.' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram (Kerala)', lat: 8.524, lng: 76.936, info: 'State capital. Padmanabhaswamy Temple (world\'s wealthiest temple — ~₹2 lakh crore treasure). Vikram Sarabhai Space Centre (VSSC) — ISRO\'s rocket design centre. TERLS (Thumba rocket launch site).' },
  { id: 'panaji',   name: 'Panaji (Goa)',                 lat: 15.499, lng: 73.827, info: 'State capital of Goa. Portuguese colonial heritage (Goa liberated 1961 — Operation Vijay). INS Hansa naval air station. Manohar International Airport (2022). Smallest state by area.' },
  { id: 'puducherry',name:'Puducherry (UT)',              lat: 11.933, lng: 79.833, info: 'UT capital. Former French colony (transferred 1954). Franco-Tamil culture. Auroville (international township). Tourism hub. Enclaved by Tamil Nadu.' },
  { id: 'portblair', name: 'Port Blair (A&N Islands UT)', lat: 11.667, lng: 92.750, info: 'UT capital. Cellular Jail ("Kala Pani") — colonial prison for freedom fighters. HQ of Andaman & Nicobar Command (India\'s only tri-service joint command). INS Baaz at Campbell Bay controls Malacca Strait approaches.' },
  { id: 'gandhinagar',name:'Gandhinagar (Gujarat)',       lat: 23.217, lng: 72.683, info: 'Planned capital of Gujarat, built after 1960 bifurcation from Bombay. Akshardham Temple (one of world\'s largest). Defence corridor (UP-TN) equivalent being developed. Biotech hub.' },
  { id: 'amaravati', name: 'Amaravati (Andhra Pradesh)', lat: 16.517, lng: 80.517, info: 'New capital of Andhra Pradesh (under construction since 2015). On Krishna river bank. Previous capital Hyderabad serves as common capital with Telangana till 2024.' },
]

// ─── INTERNATIONAL AIRPORTS ────────────────────────────────────────────────────
export const airports = [
  { id: 'del',  name: 'Indira Gandhi Intl — Delhi',         lat: 28.556, lng: 77.100, info: 'IATA: DEL. India\'s busiest airport (~72M pax/year). 3 runways. Terminal 3 (T3) — one of world\'s largest airports. IAF Palam Air Base co-located. Delhi–Mumbai route: world\'s 3rd busiest air route.' },
  { id: 'bom',  name: 'Chhatrapati Shivaji Intl — Mumbai',  lat: 19.089, lng: 72.868, info: 'IATA: BOM. India\'s 2nd busiest airport. International and domestic terminals. Constrained by sea on 3 sides. Navi Mumbai International Airport under construction (2025 target).' },
  { id: 'blr',  name: 'Kempegowda Intl — Bengaluru',        lat: 13.200, lng: 77.707, info: 'IATA: BLR. India\'s 3rd busiest. Opened 2008. Unique: ran on 100% renewable energy 2021. Terminal 2 opened 2023 (inspired by Karnataka\'s gardens). Key IT corridor.' },
  { id: 'hyd',  name: 'Rajiv Gandhi Intl — Hyderabad',      lat: 17.233, lng: 78.433, info: 'IATA: HYD. India\'s 4th busiest. One of India\'s first greenfield private airports. 2007 opened. Dual runway. Major international gateway for Hyderabad IT corridor.' },
  { id: 'maa',  name: 'Chennai Intl Airport',               lat: 12.983, lng: 80.167, info: 'IATA: MAA. India\'s 5th busiest. Operated by AAI. Two runways. One of India\'s oldest airports. Arignar Anna Terminal. IAF Training Command HQ at nearby Tambaram.' },
  { id: 'ccu',  name: 'Netaji SC Bose Intl — Kolkata',      lat: 22.653, lng: 88.447, info: 'IATA: CCU. Gateway to Northeast India. Operated by AAI. India\'s 6th busiest. Strategic: C-17 and military transport aircraft also use this airport during NE India operations.' },
  { id: 'cok',  name: 'Cochin Intl Airport (CIAL)',         lat: 10.150, lng: 76.400, info: 'IATA: COK. World\'s first fully solar-powered international airport (2015). Kerala\'s busiest. Run by CIAL (public-private partnership). Major hub for Kerala diaspora traffic.' },
  { id: 'pnq',  name: 'Pune Airport',                       lat: 18.583, lng: 73.917, info: 'IATA: PNQ. Shared civil-military airport (IAF Lohegaon). Joint use. HQ of Southern Command, College of Military Engineering (CME) nearby. Pune is India\'s automobile manufacturing hub.' },
  { id: 'amd',  name: 'Sardar Vallabhbhai Patel Intl — Ahmedabad', lat: 23.072, lng: 72.634, info: 'IATA: AMD. Gujarat\'s busiest. Operates from same campus as IAF Ahmedabad station. Major industrial gateway. Sabarmati Ashram is 10 km from airport.' },
  { id: 'goi',  name: 'Manohar Intl Airport — Goa',         lat: 15.383, lng: 73.917, info: 'IATA: GOX. New greenfield airport opened 2022 (replaced Dabolim). Built by DFCCIL. Located at Mopa, North Goa. Replaced Dabolim (INS Hansa naval air station still active).' },
  { id: 'atq',  name: 'SGRD Intl Airport — Amritsar',       lat: 31.709, lng: 74.797, info: 'IATA: ATQ. Gateway to Golden Temple and Wagah Border. Near Pakistan border (~25 km from Lahore). IAF Pathankot base ~70 km away. Pathankot Air Base terror attack (2016).' },
  { id: 'jai',  name: 'Jaipur International Airport',       lat: 26.824, lng: 75.812, info: 'IATA: JAI. Rajasthan\'s busiest. Sanganer airport. Near Army\'s South Western Command HQ. Strategic location for NW sector operations.' },
  { id: 'lko',  name: 'Chaudhary Charan Singh Intl — Lucknow', lat: 26.760, lng: 80.889, info: 'IATA: LKO. UP\'s busiest. Gateway to UP for Varanasi, Agra, and Central Command visitors. Major Hindutva pilgrimage route hub.' },
  { id: 'ixl',  name: 'Kushok Bakula Rimpochhe Airport — Leh', lat: 34.133, lng: 77.550, info: 'IATA: IXL. World\'s highest altitude airport used by commercial airlines (3,256 m AMSL). Operated by AAI and IAF. Critical for Ladakh supply and troop movement — only air access in winter. Special training needed for pilots (high-altitude approach).' },
  { id: 'bhu',  name: 'Varanasi Airport (LBS Intl)',        lat: 25.452, lng: 82.859, info: 'IATA: VNS. Lal Bahadur Shastri International Airport. Gateway to Varanasi (Kashi), Sarnath. PM Modi\'s constituency. Major pilgrimage hub. Upgraded under UDAN scheme.' },
  { id: 'nag',  name: 'Dr. Babasaheb Ambedkar Intl — Nagpur', lat: 21.092, lng: 79.047, info: 'IATA: NAG. Shared civil-military airport (IAF Sonegaon). Geographic centre of India. Major hub under Nagpur\'s Multi-Modal International Hub Airport (MIHAN). MIHAN SEZ: MRO hub for aviation.' },
]

// ─── MAJOR SEAPORTS ────────────────────────────────────────────────────────────
export const ports = [
  { id: 'jnpt',    name: 'JNPT (Nhava Sheva) — Mumbai',    lat: 18.950, lng: 72.933, info: 'India\'s largest container port. ~70 lakh TEUs/year. Gateway to Maharashtra, MP, UP. Jawaharlal Nehru Port Trust. 5 terminals. Handles ~55% of India\'s container traffic.' },
  { id: 'mundra',  name: 'Mundra Port — Gujarat',           lat: 22.833, lng: 69.717, info: 'India\'s largest private port (Adani Ports). ~155 MT cargo/year. Container, LNG, coal. Gujarat\'s major trade gateway. LNG terminal — imports from Qatar, Australia.' },
  { id: 'deendayal',name:'Deendayal Port (Kandla) — Gujarat',lat:23.033,lng:70.217, info: 'India\'s largest port by volume. ~130 MT/year. Dry bulk, petroleum, salt. "Major port" since 1955. Renamed from Kandla to Deendayal in 2017. Handles oil products from Rajasthan.' },
  { id: 'chennai_port', name: 'Chennai Port',              lat: 13.083, lng: 80.300, info: 'India\'s 2nd largest container port. Handles automobiles — "Auto Port of India." Operated by Chennai Port Trust. Part of Chennai–Bengaluru industrial corridor gateway.' },
  { id: 'vizag',   name: 'Visakhapatnam Port',             lat: 17.683, lng: 83.283, info: 'Natural harbour (only major port with natural harbour on E coast). India\'s 4th largest port. Handles iron ore, coal, crude oil. Co-located with Eastern Naval Command.' },
  { id: 'kochi_port', name: 'Kochi Port (Cochin)',         lat: 9.950,  lng: 76.267, info: 'Major port in Kerala. Natural harbour. Container, passenger, cruise terminal. Co-located with Southern Naval Command. INS Venduruthy nearby. Cochin Shipyard builds warships.' },
  { id: 'kolkata_port', name: 'Kolkata Port (Syama Prasad Mookerjee)', lat: 22.567, lng: 88.317, info: 'Only riverine major port in India. On Hooghly (125 km from sea). Handles Bangladesh, NE India. Haldia Port (nearby) handles larger vessels. India\'s oldest major port (colonial era).' },
  { id: 'paradip', name: 'Paradip Port — Odisha',          lat: 20.317, lng: 86.617, info: 'India\'s largest iron ore exporting port. Handles ~108 MT/year. IOCL refinery adjacent. Odisha\'s gateway. Part of East Coast Economic Corridor.' },
  { id: 'mormugao',name: 'Mormugao Port — Goa',            lat: 15.417, lng: 73.800, info: 'Goa\'s major port. Iron ore, coal, other cargo. Naval presence: INS Hansa nearby. Mormugao harbour was first approached by the Portuguese explorer Vasco da Gama 1498.' },
  { id: 'mangalore',name:'New Mangalore Port — Karnataka',  lat: 12.917, lng: 74.817, info: 'Karnataka\'s only major port. Petroleum products, LNG, containers, cashew. Handles OMPL refinery cargo. Strategically positioned between Mumbai and Kochi.' },
  { id: 'ennore',  name: 'Kamarajar Port (Ennore) — TN',   lat: 13.233, lng: 80.333, info: 'India\'s first corporatised major port. Handles coal for Tamil Nadu power plants. LNG terminal. Car exports (Hyundai, Ford). Adjacent to Chennai Port.' },
  { id: 'tuticorin',name:'V.O.C. Port (Tuticorin) — TN',   lat: 8.750,  lng: 78.167, info: 'Southernmost major port of India. Handles salt, coal, container. Gateway to Gulf of Mannar. Near Koodankulam Nuclear Plant. Named after freedom fighter V.O. Chidambaranar.' },
  { id: 'haldia',  name: 'Haldia Port — West Bengal',       lat: 22.067, lng: 88.083, info: 'Satellite port to Kolkata Port. Handles crude oil (HPCL refinery). Petrochemicals, fertilisers. Deep-draft vessels use Haldia instead of the shallower Kolkata Port.' },
]

// ─── MAJOR DAMS ────────────────────────────────────────────────────────────────
export const dams = [
  { id: 'tehri',    name: 'Tehri Dam — Uttarakhand',        lat: 30.383, lng: 78.483, info: 'India\'s tallest dam (260 m). On Bhagirathi river. Reservoir capacity: 4 BCM. Hydropower: 1,000 MW. Controversial: submerged old Tehri town; seismic zone IV (high risk). Completed 2006.' },
  { id: 'bhakra',   name: 'Bhakra Dam — Himachal Pradesh',  lat: 31.417, lng: 76.433, info: 'India\'s tallest gravity dam (226 m). On Sutlej river. Gobind Sagar reservoir (largest reservoir in India by storage). Hydropower: 1,325 MW. Nehru called it "New Temple of resurgent India."' },
  { id: 'sardar',   name: 'Sardar Sarovar Dam — Gujarat',   lat: 21.833, lng: 73.750, info: 'India\'s largest dam by volume. On Narmada river. Height: 163 m. World\'s 2nd largest concrete dam. Highly controversial: displaced 320,000 people (Narmada Bachao Andolan — Medha Patkar). Canal network irrigates 1.9 M ha in Gujarat.' },
  { id: 'hirakud',  name: 'Hirakud Dam — Odisha',           lat: 21.533, lng: 83.867, info: 'World\'s longest earthen dam (25.8 km). On Mahanadi. India\'s first major river multipurpose project (1957). Reservoir: 5.9 BCM. Hydropower: 347 MW. Controls flooding of Odisha plains.' },
  { id: 'nagarjuna',name: 'Nagarjuna Sagar Dam — Telangana',lat: 16.567, lng: 79.317, info: 'World\'s largest masonry dam (at construction). Height: 124 m. On Krishna river. Reservoir: 11.5 BCM. Irrigates 8.9 lakh ha. Power: 816 MW. 1955–1967 construction. Ancient Nagarjunakonda archaeological site submerged.' },
  { id: 'srisailam',name: 'Srisailam Dam — Telangana/AP',   lat: 16.083, lng: 78.900, info: 'India\'s 2nd largest reservoir by water storage. On Krishna. Height: 145 m. Underground power station. Also a famous Jyotirlinga (Mallikarjuna) temple site. Tiger Reserve surrounding area.' },
  { id: 'krs',      name: 'Krishna Raja Sagara (KRS) — Karnataka', lat: 12.417, lng: 76.583, info: 'On Kaveri river, near Mysuru. Built 1924 by Sir M. Visvesvaraya ("Bharat Ratna engineer"). Brindavan Gardens lit with 100,000 lights. Height: 40 m. Water dispute source: Karnataka vs Tamil Nadu.' },
  { id: 'mettur',   name: 'Mettur Dam — Tamil Nadu',        lat: 11.783, lng: 77.800, info: 'On Kaveri at Mettur, Salem district. Built 1934 (British era). Stanley Reservoir (capacity 2.7 BCM). Key for Tamil Nadu\'s delta irrigation. Every year, farmers in Kaveri delta wait for Mettur opening (June–July).' },
  { id: 'koyna',    name: 'Koyna Dam — Maharashtra',        lat: 17.400, lng: 73.750, info: 'India\'s largest hydroelectric project (1,920 MW). On Koyna river (tributary of Krishna). 1967 Koyna earthquake (6.5 magnitude) caused dam concerns — first major case of "reservoir-triggered seismicity" in India.' },
  { id: 'tungabhadra', name: 'Tungabhadra Dam — Karnataka', lat: 15.267, lng: 76.317, info: 'Joint project: Karnataka and Andhra Pradesh. On Tungabhadra river. Height: 49 m. Capacity: 3.7 BCM. Irrigates Raichur-Bellary area. Near Hampi (UNESCO World Heritage Site, ruins of Vijayanagar Empire).' },
]

// ─── NUCLEAR POWER PLANTS ─────────────────────────────────────────────────────
export const nuclear = [
  { id: 'tarapur',  name: 'Tarapur APS — Maharashtra',     lat: 19.833, lng: 72.650, info: 'India\'s first nuclear power plant (1969). 4 units: 2 BWR (US-origin, 160 MWe each) + 2 PHWR (540 MWe each). Total: ~1,400 MWe. Operator: NPCIL. Oldest and most controversial (fuel dispute with US after 1974 Pokhran test). Located on coast near Boisar.' },
  { id: 'rawatbhata',name:'RAPS — Rawatbhata, Rajasthan',  lat: 24.933, lng: 75.583, info: 'Rajasthan Atomic Power Station. 6 units (1 CANDU type + 5 PHWR). Units 1–2 (with Canada\'s AECL help). Total: ~1,180 MWe. First Indian-built PHWR at this site. 3rd and 4th units are 220 MWe each; 5th and 6th are 220 MWe each.' },
  { id: 'kalpakkam',name:'Kalpakkam (MAPS + PFBR) — Tamil Nadu', lat: 12.550, lng: 80.167, info: 'Madras Atomic Power Station (MAPS): 2 PHWR units (440 MWe total). Prototype Fast Breeder Reactor (PFBR, 500 MWe): India\'s first breeder reactor — under commissioning (2024). IGCAR (Indira Gandhi Centre for Atomic Research) also here. Coastal site, 60 km south of Chennai.' },
  { id: 'narora',   name: 'Narora APS — Uttar Pradesh',    lat: 28.187, lng: 78.383, info: '2 PHWR units (440 MWe total). On Ganga river, Bulandshahr district. Operators: NPCIL. First 220 MWe PHWR with completely indigenous design. 1993 fire incident (transformer fire) — contained without radiation release.' },
  { id: 'kakrapar', name: 'Kakrapar APS — Gujarat',        lat: 21.267, lng: 73.350, info: '4 units (2 × 220 MWe PHWR + 2 × 700 MWe PHWR — latest 700 MWe indigenous PHWR). Total: ~1,640 MWe. On Tapti river. Units 3 & 4 (700 MWe) are India\'s largest indigenous reactor design (PHWR-700). First pressurised water-filled calandria in India.' },
  { id: 'kaiga',    name: 'Kaiga Nuclear Power Plant — Karnataka', lat: 14.867, lng: 74.450, info: '4 PHWR units (880 MWe total). In Western Ghats forests, Uttara Kannada district. Set world record for longest continuous operation (962 days, Unit 1, 2018). On Kali river. Eco-sensitive location — required tree replanting programme.' },
  { id: 'kudankulam',name:'Kudankulam NPP — Tamil Nadu',   lat: 8.167,  lng: 77.717, info: 'India\'s largest nuclear power plant in terms of total capacity (6 × 1,000 MWe VVER = 6,000 MWe when complete). Indo-Russian collaboration (Atomstroyexport, Rosatom). Units 1–2 operational (2013/2017). Units 3–6 under construction. Southernmost point in India. Massive anti-nuclear protests (2011–12).' },
  { id: 'gorakhpur_nuke',name:'GHAVP — Gorakhpur, Haryana',lat:29.267,lng:75.833, info: 'Gorakhpur Haryana Anu Vidyut Pariyojana. 2 × 700 MWe PHWR. Under construction (heavily delayed — started 2007, civil work complete but equipment delayed). Near Fatehabad, Haryana. When operational, will be India\'s only nuclear plant in the Indo-Gangetic plains.' },
]

// ─── THERMAL POWER PLANTS ─────────────────────────────────────────────────────
export const thermal = [
  { id: 'vindhyachal',name:'Vindhyachal STPS — MP',         lat: 24.117, lng: 82.667, info: 'India\'s largest thermal power plant. Total capacity: 6,760 MW (5 units). NTPC owned. Coal from Singrauli coal fields. One of world\'s largest coal-fired power plants. In Vindhya Nagar, Singrauli.' },
  { id: 'mundra_th', name: 'Mundra UMPP — Gujarat',         lat: 22.833, lng: 69.750, info: '4,620 MW Ultra Mega Power Project. Adani Power. Imported coal (Indonesia). Controversial: "pass-through" tariff case went to Supreme Court. India\'s largest private thermal plant. Coastal seawater cooling.' },
  { id: 'sipat',     name: 'Sipat STPS — Chhattisgarh',     lat: 22.117, lng: 82.333, info: '2,980 MW. NTPC owned. Bilaspur district. India\'s first 660 MW supercritical units. Coal from Korba coal fields (Chhattisgarh = India\'s largest coal producing state).' },
  { id: 'korba',     name: 'Korba STPS — Chhattisgarh',     lat: 22.333, lng: 82.700, info: '2,600 MW. NTPC. Korba, Chhattisgarh. Near Korba coal mines (one of India\'s largest coal fields — Mahanadi Coalfields). "Power Hub of Chhattisgarh."' },
  { id: 'rihand',    name: 'Rihand STPS — Uttar Pradesh',   lat: 24.000, lng: 82.817, info: '3,000 MW. NTPC. Singrauli, UP. Coal from nearby Singrauli mines. Co-located with Vindhyachal. Singrauli is India\'s "energy capital" — multiple super thermal plants clustered here.' },
  { id: 'ramagundam',name:'Ramagundam STPS — Telangana',    lat: 18.783, lng: 79.467, info: '2,600 MW. NTPC. Peddapalli district. Telangana\'s key power plant. Coal from Singareni coal fields (state-owned, largest in south India). On Godavari river (cooling water).' },
  { id: 'talcher',   name: 'Talcher STPS — Odisha',         lat: 21.000, lng: 85.217, info: '3,000 MW. NTPC. Angul district. Adjacent to Talcher coal mines (largest coal reserves in eastern India — ~47 billion tonnes). Coal India Limited mines here.' },
  { id: 'farakka',   name: 'Farakka STPS — West Bengal',    lat: 24.817, lng: 87.883, info: '2,100 MW. NTPC. Near Farakka Barrage (Ganga). Coal from Jharia/Raniganj coalfields. Co-located with Farakka Barrage — both key national infrastructure. Farakka Barrage: India-Bangladesh water-sharing dispute.' },
  { id: 'simhadri',  name: 'Simhadri STPS — Andhra Pradesh',lat: 17.700, lng: 83.217, info: '2,000 MW. NTPC. Visakhapatnam district. India\'s first coastal super thermal power station. Co-located with Visakhapatnam (Eastern Naval Command) nearby. Coal by sea (imported + domestic).' },
  { id: 'kahalgaon', name: 'Kahalgaon STPS — Bihar',        lat: 25.267, lng: 87.267, info: '2,340 MW. NTPC. Bhagalpur district. On Ganga. Bihar\'s main thermal power supply. Coal from Jharia / Jharkhand coalfields. Important for Bihar/Jharkhand power grid.' },
]

// ─── NATIONAL PARKS & TIGER RESERVES ──────────────────────────────────────────
export const parks = [
  { id: 'corbett',   name: 'Jim Corbett NP — Uttarakhand',  lat: 29.533, lng: 78.917, info: 'India\'s first national park (1936). Area: 520 sq km (core); 1,288 sq km with buffer. India\'s largest Tiger Reserve. Named after hunter-conservationist Jim Corbett. 260+ tigers (2022 census).' },
  { id: 'kaziranga', name: 'Kaziranga NP — Assam',          lat: 26.583, lng: 93.167, info: 'UNESCO World Heritage Site. Home to 70% of world\'s one-horned rhinoceros (~3,000). Also: tigers, elephants, swamp deer. On Brahmaputra flood plains. 430 sq km core area. Highly vulnerable to Brahmaputra floods.' },
  { id: 'sundarbans',name: 'Sundarbans NP — West Bengal',   lat: 21.950, lng: 89.083, info: 'UNESCO World Heritage. World\'s largest mangrove forest (delta of Ganga-Brahmaputra). 2,585 sq km. Royal Bengal Tiger (swimming tigers). Vulnerable to sea-level rise. India-Bangladesh shared ecosystem.' },
  { id: 'ranthambore',name:'Ranthambore TR — Rajasthan',    lat: 26.017, lng: 76.500, info: '1,334 sq km. Most famous tiger reserve. Tigers often seen during day (unusual). Named after 10th century Ranthambore Fort. Near Sawai Madhopur. India\'s most photographed tigers.' },
  { id: 'bandhavgarh',name:'Bandhavgarh TR — MP',           lat: 23.717, lng: 81.033, info: 'World\'s highest density of tigers. Area: 1,535 sq km. Historic Bandhavgarh Fort in core area. White tigers of Rewa (white tigers first discovered near here in 1951). Umaria district.' },
  { id: 'kanha',     name: 'Kanha TR — Madhya Pradesh',     lat: 22.233, lng: 80.583, info: 'India\'s largest national park (core + buffer: 2,051 sq km). Inspiration for Kipling\'s "Jungle Book." Rescued barasingha (swamp deer) from extinction. Mandla and Balaghat districts.' },
  { id: 'gir',       name: 'Gir National Park — Gujarat',   lat: 21.167, lng: 70.817, info: 'World\'s ONLY wild habitat of the Asiatic lion. Population: ~674 lions (2020 census). Area: 1,412 sq km (GPA: lion range broader). Junagadh district. UNESCO tentative list. Only location outside Africa with wild lions.' },
  { id: 'manas',     name: 'Manas NP — Assam',              lat: 26.500, lng: 90.733, info: 'UNESCO Natural World Heritage (twice declared "in danger" during Bodo insurgency — restored). Tiger, one-horned rhino, pygmy hog (world\'s smallest pig). Trans-boundary: Royal Manas NP in Bhutan.' },
  { id: 'namdapha',  name: 'Namdapha NP — Arunachal Pradesh',lat: 27.433, lng: 96.383, info: 'Third largest national park in India. Area: 1,985 sq km. Only park with all 4 big cats: tiger, leopard, clouded leopard, snow leopard. Also: gibbons (India\'s only apes). Biodiversity hotspot.' },
  { id: 'keibul',    name: 'Keibul Lamjao NP — Manipur',    lat: 24.417, lng: 93.783, info: 'World\'s only floating national park (on Loktak Lake phumdis). Area: 40 sq km. Home of the endangered brow-antlered deer (Sangai — Manipur\'s state animal). "Dancing deer" on floating islands.' },
  { id: 'nagarhole', name: 'Nagarhole NP (Rajiv Gandhi NP) — Karnataka', lat: 11.983, lng: 76.133, info: 'Part of Nilgiri Biosphere Reserve. Area: 847 sq km. High density of elephants, tigers, leopards, gaurs. Connects to Bandipur, Mudumalai, Wayanad — forming a large contiguous forest.' },
  { id: 'periyar',   name: 'Periyar TR — Kerala',           lat: 9.467,  lng: 77.200, info: 'Kerala\'s largest and most popular tiger reserve. 925 sq km. Idukki district. Periyar Lake (Mullaperiyar Dam creates it). Boat safaris for wildlife viewing. Elephant corridor with Tamil Nadu.' },
  { id: 'valley',    name: 'Valley of Flowers NP — Uttarakhand', lat: 30.733, lng: 79.600, info: 'UNESCO World Heritage. Area: 87 sq km. At 3,352–3,658 m AMSL. Blooms June–September. 520 plant species. Snow leopard, brown bear, Himalayan marmot. Part of Nanda Devi Biosphere Reserve.' },
  { id: 'simlipal',  name: 'Simlipal TR — Odisha',          lat: 21.617, lng: 86.517, info: '2,750 sq km. Mayurbhanj district. UNESCO Biosphere Reserve. Rare melanistic (black) tigers documented here. 7 rivers originate from Simlipal hills. Also: sal forest, waterfalls (Barehipani: 399 m).' },
  { id: 'panna',     name: 'Panna TR — Madhya Pradesh',     lat: 24.767, lng: 80.050, info: 'Success story: tigers reintroduced (2009) after poaching eliminated entire population by 2008. Now ~55 tigers. UNESCO Biosphere Reserve. Ken river flows through. Near Ken–Betwa river-link project area.' },
]

// ─── ARMY COMMAND HQs ─────────────────────────────────────────────────────────
export const army_hq = [
  { id: 'western',    name: 'Western Command — Chandimandir', lat: 30.733, lng: 76.850, info: 'HQ: Chandimandir, Panchkula (Haryana). Faces Pakistan across Punjab plains. Controls I Corps (Mathura — Strike), II Corps (Ambala), XI Corps (Jalandhar). Key stations: Ambala (Rafale), Jalandhar, Pathankot. GOC-in-C: Lt General.' },
  { id: 'eastern',    name: 'Eastern Command — Fort William', lat: 22.567, lng: 88.333, info: 'HQ: Fort William, Kolkata. Faces China (Eastern Sector: Arunachal, Sikkim). Controls III Corps (Dimapur), IV Corps (Tezpur), XXXIII Corps (Sukhna), XVII Corps (Panagarh). Tawang front.' },
  { id: 'northern',   name: 'Northern Command — Udhampur',    lat: 32.933, lng: 75.133, info: 'HQ: Udhampur, J&K. India\'s most operationally active command. Controls XIV Corps "Fire & Fury" (Leh — LAC), XV Corps "Chinar" (Srinagar — LoC), XVI Corps "White Knight" (Nagrota). Siachen Glacier operations.' },
  { id: 'southern',   name: 'Southern Command — Pune',        lat: 18.517, lng: 73.867, info: 'HQ: Pune. Controls XII Corps (Jodhpur), XXI Corps "Surya Command" (Bhopal — Strike Corps). DSSC Wellington (Nilgiris). CME (College of Military Engineering) at Pune.' },
  { id: 'central',    name: 'Central Command — Lucknow',      lat: 26.847, lng: 80.947, info: 'HQ: Lucknow. Covers UP, Uttarakhand, MP, Chhattisgarh. Strategic reserve for both western and eastern fronts. IMA (Dehradun) and NDA (Pune) under broader Army administration. India\'s largest territorial command by area.' },
  { id: 'sw',         name: 'South Western Command — Jaipur', lat: 26.913, lng: 75.787, info: 'HQ: Jaipur. Formed 2005. Faces Pakistan across Thar Desert. Controls X Corps (Bathinda). Desert warfare formations. Integrated with IAF South-Western Air Command (Gandhinagar) for desert operations.' },
  { id: 'artrac',     name: 'ARTRAC — Shimla',                lat: 31.104, lng: 77.167, info: 'Army Training Command. HQ: Shimla (HP). Non-operational. Controls all Army training establishments: Infantry School (Mhow), Armoured Corps Centre (Ahmednagar), School of Artillery (Devlali). Doctrine development and war-gaming.' },
]

// ─── NAVAL BASES ──────────────────────────────────────────────────────────────
export const naval = [
  { id: 'ins_shikra',    name: 'INS Shikra — Mumbai',               lat: 18.933, lng: 72.833, info: 'Naval Air Station, Colaba, Mumbai. Integral air arm of Western Naval Command. INS Vikramaditya and INS Vikrant are both based at INS Kadamba (Karwar) but use Mumbai for exercises. Western Naval Command HQ is on Navy Nagar, Mumbai.' },
  { id: 'ins_kadamba',   name: 'INS Kadamba — Karwar, Karnataka',   lat: 14.800, lng: 74.133, info: 'Project Seabird (Phase-I complete, Phase-II ongoing) — India\'s largest naval base. Berths for aircraft carriers INS Vikrant and INS Vikramaditya. Cost: ₹16,000 crore+. Sheltered natural harbour. HQ Western Fleet.' },
  { id: 'ins_circars',   name: 'INS Circars — Visakhapatnam',       lat: 17.683, lng: 83.317, info: 'HQ, Eastern Naval Command. "Vizag" is India\'s largest naval base on the east coast. SBC (Submarine Base Centre) — where INS Arihant and INS Arighat (SSBN fleet) are based and maintained. Eastern Fleet HQ.' },
  { id: 'ins_venduruthy',name: 'INS Venduruthy — Kochi',            lat: 9.950,  lng: 76.250, info: 'HQ, Southern Naval Command. Training Command. INS Ezhimala (Indian Naval Academy, 1,492-acre campus) is 50 km away. INS Garuda (naval air station), INS Dronacharya (naval gunnery school), INS Agrani (naval signals) all in Kochi.' },
  { id: 'ins_baaz',      name: 'INS Baaz — Campbell Bay, Andaman',  lat: 7.017,  lng: 93.900, info: 'India\'s southernmost naval base. On Great Nicobar Island. Controls Malacca Strait approaches. Strategic: 90% of China\'s oil imports pass through Malacca Strait (1,200 km away). Part of Andaman & Nicobar Command (India\'s only tri-service joint command).' },
  { id: 'ins_rajali',    name: 'INS Rajali — Arakkonam, TN',        lat: 13.067, lng: 79.700, info: 'India\'s largest naval air station. P-8I Poseidon maritime patrol aircraft based here (12 aircraft from US, deployed 2013–). Key for Bay of Bengal surveillance, submarine hunting, and IOR patrol. 60 km from Chennai.' },
  { id: 'ins_hansa',     name: 'INS Hansa — Dabolim, Goa',          lat: 15.400, lng: 73.800, info: 'Naval Air Station, Dabolim, Goa. SHOREBASED TEST FACILITY (SBTF) for Rafale-M trials (tested 2022). Future base for 26 Rafale-M (deal signed April 2025, deliveries from ~2028). Currently operates Dornier aircraft. Shared with Dabolim civil airport.' },
  { id: 'ins_ezhimala',  name: 'INS Ezhimala — Kerala',             lat: 12.083, lng: 75.233, info: 'Indian Naval Academy (INA). Largest training institution for naval officers. 1,492-acre campus. Cannanore district. Direct commission, NDA, and technical entries join here. Functional since 2009. Overlooks Arabian Sea.' },
  { id: 'ins_dega',      name: 'INS Dega — Visakhapatnam',          lat: 17.700, lng: 83.283, info: 'Naval Air Station, Visakhapatnam. Eastern Fleet air arm. Dornier maritime reconnaissance, Chetak helicopters, Seaking ASW helicopters. Co-located with Vizag Port and Eastern Command.' },
  { id: 'ins_hamla',     name: 'INS Hamla — Malad, Mumbai',         lat: 19.117, lng: 72.850, info: 'Naval Supply Depot. Naval Armament Depot. Major logistics hub for Western Fleet. Handles ammunition, stores, and spare parts for Western Naval Command. On Malad Creek, North Mumbai.' },
]

// ─── IAF AIR STATIONS ─────────────────────────────────────────────────────────
export const iaf = [
  { id: 'ambala',    name: 'AFS Ambala — Haryana',            lat: 30.367, lng: 76.817, info: 'Under Western Air Command. Home of No. 17 Sq "Golden Arrows" — first IAF Rafale squadron (Jul 2020). No. 7 Sq "Battle Axes" (Mirage-2000) also here. Closest IAF base to Pakistan. Key strike capability.' },
  { id: 'gwalior',   name: 'AFS Gwalior — MP',                lat: 26.283, lng: 78.233, info: 'Under Central Air Command. No. 7 Sq "Battle Axes" (Mirage-2000). Gwalior aircraft carried out the Balakot airstrike (Feb 26, 2019). 5,000 m runway (longest in India with Delhi Safdarjung). Strategic airlift hub.' },
  { id: 'pathankot', name: 'AFS Pathankot — Punjab',          lat: 32.233, lng: 75.633, info: 'Under Western Air Command. MiG-29UPG aircraft. Terror attack (Jan 2016): Jaish-e-Mohammed militants breached base — 7 security forces killed. Near Pakistan border (~20 km from Lahore). High-threat station.' },
  { id: 'srinagar',  name: 'AFS Srinagar — J&K',              lat: 34.017, lng: 74.767, info: 'Under Western Air Command. MiG-29UPG fleet. Highest risk station: within range of Pakistani artillery. Used during Op Vijay (Kargil 1999) — critical air base for Kashmir Valley operations. Only IAF fighter base in Kashmir Valley.' },
  { id: 'leh_iaf',   name: 'AFS Leh (Kushok Bakula) — Ladakh', lat: 34.133, lng: 77.550, info: 'Under Western Air Command. Altitude: 3,256 m AMSL — India\'s highest operational IAF base. Mi-17 helicopters, advanced landing ground. Critical logistics hub for 14 Corps (LAC operations). Commercial flights from rest of India year-round.' },
  { id: 'adampur',   name: 'AFS Adampur — Punjab',            lat: 31.433, lng: 75.750, info: 'Under Western Air Command. MiG-29UPG (Nos. 47 Sq "Black Archers"). 2nd closest IAF base to Pakistan border after Pathankot. Used for Pakistan-facing deterrence patrols.' },
  { id: 'jodhpur',   name: 'AFS Jodhpur — Rajasthan',         lat: 26.250, lng: 73.050, info: 'Under South-Western Air Command. Su-30MKI fleet (No. 30 Sq "Rhinos"). Key desert operations base. Integrated with Army\'s South Western Command (10 Corps). Critical for Thar Desert sector vs Pakistan.' },
  { id: 'tezpur',    name: 'AFS Tezpur — Assam',              lat: 26.683, lng: 92.783, info: 'Under Eastern Air Command. Su-30MKI fleet — closest IAF frontline fighter base to China\'s Arunachal sector. Post-Doklam: significantly upgraded. Tawang Triangle defence.' },
  { id: 'chabua',    name: 'AFS Chabua — Assam',              lat: 27.467, lng: 95.117, info: 'Under Eastern Air Command. Assam–Arunachal border area. Mi-17V5 helicopters for supply to forward posts. WWII heritage: "Hump" flights over Himalayas to China used Chabua in 1942–45.' },
  { id: 'bagdogra',  name: 'AFS Bagdogra — West Bengal',      lat: 26.683, lng: 88.333, info: 'Under Eastern Air Command. Siliguri Corridor ("Chicken\'s Neck") — strategically critical. Connects NE India to rest of India. Su-30MKI. Civil airport co-located. 27 km from Siliguri.' },
  { id: 'hashimara', name: 'AFS Hashimara — West Bengal',     lat: 26.700, lng: 89.567, info: 'Under Eastern Air Command. Near Bhutan border. No. 101 Sq "Falcons" (Su-30MKI). Upgraded post-Doklam 2017. Covers northern Bengal and Bhutan corridor approaches. Near Dooars (tea gardens).' },
  { id: 'panagarh',  name: 'AFS Panagarh — West Bengal',      lat: 23.467, lng: 87.433, info: 'Under Eastern Air Command. C-17 Globemaster III (strategic airlift). Key logistics for eastern theatre. Used during COVID-19 response. Army\'s XVII Corps (Mountain Strike) based at same location.' },
  { id: 'agra_iaf',  name: 'AFS Agra — Uttar Pradesh',        lat: 27.167, lng: 77.967, info: 'Under Central Air Command. India\'s premier strategic airlift hub. C-17 Globemaster III aircraft. 5,000 m runway. HALO/HAHO paratroopers (Para SF). Agra Para Brigade. Used for all major humanitarian airlifts (Nepal earthquake 2015, Yemen 2015 Op Rahat).' },
  { id: 'sulur',     name: 'AFS Sulur — Tamil Nadu',           lat: 11.033, lng: 77.083, info: 'Under Southern Air Command. LCH Prachand (Light Combat Helicopter — first indigenous attack helicopter, inducted 2022). No. 143 Sq "Helldives" (Prachand). Also: Mi-17 fleet. Near Coimbatore. Key for Sri Lanka strait monitoring.' },
  { id: 'dundigal',  name: 'Air Force Academy — Dundigal, Hyderabad', lat: 17.617, lng: 78.317, info: 'Indian Air Force Academy — where all IAF flying officers are trained. Ab initio training on PC-7 Mk2 and HTT-40. Passing-out parade (Presidential commission). 70 km from Hyderabad. Established 1967.' },
]

// ─── MILITARY ACADEMIES ────────────────────────────────────────────────────────
export const academies = [
  { id: 'ima',    name: 'Indian Military Academy (IMA) — Dehradun', lat: 30.350, lng: 78.050, info: 'Established 1932. Trains Army officers. POP (Passing Out Parade): India\'s largest military parade. "Chetwode Hall" — motto: The safety, honour and welfare of your country come first. Duration: varies (NDA entry: 1 yr; CDSE: 1.5 yr; TES: 1 yr). Alma mater of all Indian Army generals.' },
  { id: 'nda',    name: 'National Defence Academy (NDA) — Pune',    lat: 18.667, lng: 73.750, info: 'Established 1955. Joint training for Army, Navy, IAF officer cadets. 3-year course → BSc/BA degree (JNU). One of the world\'s largest residential defence academies. Known for: Surdas, Hexagon pattern, Sudan Block. 340-acre campus.' },
  { id: 'ota_ch', name: 'OTA (Officers Training Academy) — Chennai',lat: 12.917, lng: 80.183, info: 'Established 1988. Short Service Commission officer training (11 weeks). Also trains women military police officers (MPS). Alankuppam, Chennai. Shorter duration than IMA. Technical Entry Scheme (TES) graduates and CDSE-II.' },
  { id: 'ina',    name: 'Indian Naval Academy — Ezhimala, Kerala',   lat: 12.083, lng: 75.233, info: 'Established 2009. Trains all naval officers. 4-year B.Tech for NDA entry; direct entry courses. Cannanore (Kannur). 1,492-acre campus — world\'s largest naval academy campus. Overlooks Arabian Sea.' },
  { id: 'afa',    name: 'Air Force Academy — Dundigal, Hyderabad',  lat: 17.617, lng: 78.317, info: 'Established 1967. Ab initio flying training for IAF officers on PC-7 Mk2 and HTT-40 (Hindustan Turbo Trainer-40 — indigenous). Wings parade on completion. Ground training, flying, navigation. Hyderabad, Telangana.' },
  { id: 'cmc',    name: 'Corps of Military College — Deogarh/Chennai (OTA)',lat:12.91,lng:80.18, info: 'OTA Chennai: primary SSC entry. Note: SSB (Services Selection Board) has Boards at Allahabad (1 SSB), Bhopal (2 SSB), Bangalore (12 SSB), Kapurthala (14 SSB), Visakhapatnam (33 SSB). SSB is not an academy but a selection process.' },
  { id: 'dssc',   name: 'Defence Services Staff College — Wellington', lat: 11.483, lng: 76.600, info: 'Higher Command training (Lt Colonel equivalent + from all 3 services). 1-year PSC course. Wellington, Nilgiris (Tamil Nadu). Joint international course — officers from 60+ countries attend. Graduates are awarded p.s.c. (passed staff college) qualification.' },
  { id: 'cmc2',   name: 'College of Military Engineering (CME) — Pune', lat: 18.517, lng: 73.917, info: 'India\'s premier military engineering institution. Under Army Education Corps. M.Tech and B.Tech programs. Operates under Army\'s Southern Command. Conducts GATE-entry officer training for Army engineers.' },
]

// ─── SPACE & MISSILE CENTRES ───────────────────────────────────────────────────
export const space = [
  { id: 'shar',    name: 'Satish Dhawan Space Centre (SHAR) — Sriharikota', lat: 13.733, lng: 80.233, info: 'India\'s primary rocket launch centre. On Sriharikota barrier island (Pulicat Lake separates it from mainland). Two launch pads: SLP (smaller) and SLP-2 (GSLV/LVM3). All ISRO operational launches happen here. Chandrayaan-2 and 3, Mangalyaan launched here.' },
  { id: 'vssc',    name: 'VSSC — Thiruvananthapuram',                       lat: 8.538,  lng: 76.896, info: 'Vikram Sarabhai Space Centre. ISRO\'s lead centre for launch vehicle design. Designs PSLV, GSLV, LVM3, SSLV. Named after "father of Indian space programme" Dr. Vikram Sarabhai. TERLS (Thumba Equatorial Rocket Launching Station) adjacent — India\'s first sounding rocket launched here (1963).' },
  { id: 'isro_hq', name: 'ISRO Headquarters — Bengaluru',                   lat: 12.972, lng: 77.594, info: '"Department of Space" headquarters. Mission Control for all satellites. Mission Operations Complex (MOX) at ISTRAC — monitored Chandrayaan-3 lunar landing (Aug 23, 2023 — India became 4th country to land on Moon and 1st near south pole). Avinash Nagar campus.' },
  { id: 'drdo',    name: 'DRDO HQ — New Delhi',                             lat: 28.637, lng: 77.211, info: 'Defence Research and Development Organisation. Autonomous body under Ministry of Defence. ~52 labs, 30,000 scientists. Key programmes: Agni series missiles, Prithvi missiles, LCA Tejas, Arjun tank, Akash SAM, ASTRA missile, AIP submarines (P-75I).' },
  { id: 'apu_kalam',name:'APJ Abdul Kalam Island (Wheeler Island) — Odisha',lat:20.750,lng:86.900, info: 'Integrated Test Range (ITR). Missile test site on Odisha coast. Agni-V (5,500+ km ICBM-class), Agni-IV, Agni-III, K-4 (submarine-launched), Akash, BrahMos tested here. 7 km from coast. Named after Dr. APJ Abdul Kalam in 2015.' },
  { id: 'pokhran',  name: 'Pokhran — Rajasthan',                            lat: 26.883, lng: 71.917, info: 'India\'s nuclear test site. Operation Smiling Buddha (1974): India\'s first nuclear test — 8–12 kt device. Operation Shakti (1998, Pokhran-II): 5 tests (incl. thermonuclear device) — India declared nuclear weapons state. Jaisalmer district, Thar Desert. Army\'s Field Firing Ranges also here.' },
  { id: 'brahmos',  name: 'BrahMos Aerospace — Hyderabad + Delhi',          lat: 17.385, lng: 78.487, info: 'Joint India–Russia venture (DRDO + NPO Mashinostroyeniya). BrahMos: world\'s fastest operational cruise missile (Mach 2.8–3). Range: 290–800 km. Versions: ship-launched, submarine-launched, land-launched, and air-launched (on Su-30MKI). BrahMos-NG (next gen) under development. Exported to Philippines (2022).' },
  { id: 'hal',      name: 'HAL — Bengaluru',                                lat: 12.983, lng: 77.594, info: 'Hindustan Aeronautics Limited. India\'s largest aerospace company. Products: LCA Tejas Mk1A, Advanced Light Helicopter (Dhruv), LCH Prachand, HTT-40, Su-30MKI licensed production, Hawk 132. HAL Tejas Mk1A deliveries begin 2025–26. HAL IPO (2018) raised ₹4,200 crore.' },
  { id: 'chandipur', name: 'Chandipur ITR — Odisha',                        lat: 21.467, lng: 87.067, info: 'Interim Test Range. Earlier missile testing facility (before APJ Abdul Kalam Island was upgraded). Prithvi surface-to-surface missiles, Dhanush (naval Prithvi), Pinaka multi-barrel rocket launcher tested here. Balasore district.' },
]

// ─── STRATEGIC SITES ──────────────────────────────────────────────────────────
export const strategic = [
  { id: 'siachen',   name: 'Siachen Glacier — Ladakh',                      lat: 35.400, lng: 77.100, info: 'World\'s highest battlefield (6,000–7,000 m). Indian Army has held northern Siachen since Operation Meghdoot (April 13, 1984 — launched before Pakistan could seize it). ~5,000 Indian troops deployed. Cost: ~₹6–7 crore/day. Pakistan disputes entire Siachen. Saltoro Ridge is the Indian defensive line (AGPL).' },
  { id: 'galwan',    name: 'Galwan Valley — Ladakh',                         lat: 34.600, lng: 78.150, info: 'Site of Galwan Valley clash (June 15, 2020): 20 Indian soldiers killed (Col Santosh Babu, CO 16 Bihar — MVC posthumous). PLA suffered ~35–45 casualties (denied by China). Worst India-China clash since 1967 Nathu La. Triggered buffer zone disengagement (2021).' },
  { id: 'kargil',    name: 'Kargil — Ladakh (Kargil War 1999)',              lat: 34.567, lng: 76.133, info: 'Operation Vijay (1999): Pakistani Army/militants occupied peaks vacated by Indian Army (Tiger Hill, Tololing, Batalik). India recaptured all peaks. 527 Indian soldiers KIA. Led to Lahore Declaration becoming defunct. Resulted in Kargil Review Committee and creation of CDS post.' },
  { id: 'longewala',  name: 'Longewala — Rajasthan (Battle 1971)',           lat: 27.200, lng: 70.550, info: 'Battle of Longewala (Dec 4–5, 1971): ~120 soldiers of A Company, 23 Punjab Regt (Maj Kuldip Singh Chandpuri — MVC) held off ~2,000 Pakistani troops + tanks. IAF Hawker Hunter aircraft were decisive. Immortalised in film "Border" (1997). Pakistan lost 200+ men, 36 tanks.' },
  { id: 'rann_kutch', name: 'Rann of Kutch — Gujarat',                      lat: 23.750, lng: 70.750, info: 'Great Rann of Kutch: world\'s largest salt marsh (30,000 sq km). India-Pakistan border runs through it. 1965 India-Pakistan War originated here (Rann of Kutch Incident). Border demarcated by International Tribunal (1968). White Rann: flamingo breeding, wild ass sanctuary.' },
  { id: 'nathu_la_trade', name: 'Nathu La — Trade & Border Post',           lat: 27.383, lng: 88.830, info: 'India–China border trade via Nathu La reopened 2006 (closed since 1962 war). Nathu La–Yadong trade: silk, wool, cashmere from Tibet; Indian goods to Tibet. 1967 Nathu La and Cho La incidents: India repulsed PLA assault in Sikkim, establishing Indian dominance of Sikkim sector.' },
  { id: 'aksai_chin', name: 'Aksai Chin — Ladakh (disputed)',               lat: 35.200, lng: 79.500, info: 'Indian territory administered by China (since 1962 war). Area: ~37,244 sq km. China built Xinjiang–Tibet Highway (1950s) through Aksai Chin (India unaware for years). Core dispute in 1962 Sino-Indian War. India claims full area; China calls it part of Xinjiang/Tibet.' },
  { id: 'pok',        name: 'PoK/Gilgit-Baltistan — India\'s claim',        lat: 35.367, lng: 74.500, info: 'Pakistan-Occupied Kashmir (PoK). India claims full J&K (incl. PoK and Gilgit-Baltistan) based on 1947 Instrument of Accession. Pakistan renamed PoK "Azad Kashmir." CPEC (China-Pakistan Economic Corridor) passes through Gilgit-Baltistan — India protests. ~78,114 sq km of Indian territory under Pakistani control.' },
]

// ─── HISTORIC BATTLEFIELDS ────────────────────────────────────────────────────
export const battlefields = [
  { id: 'panipat',      name: 'Panipat — Haryana (3 Battles)',          lat: 29.390, lng: 76.967, info: '1st Battle (1526): Babur defeated Ibrahim Lodi → Mughal Empire founded. 2nd Battle (1556): Akbar\'s general Bairam Khan defeated Hemu → Mughal consolidation. 3rd Battle (1761): Ahmad Shah Durrani (Afghan) defeated Marathas → ended Maratha supremacy. "Panipat" = decisive battles of Indian history.' },
  { id: 'plassey',      name: 'Plassey — West Bengal (1757)',           lat: 23.800, lng: 88.250, info: 'Battle of Plassey (June 23, 1757): Clive of India (Robert Clive) defeated Nawab Siraj ud-Daulah (aided by Mir Jafar\'s treachery). British East India Company established dominance over Bengal → beginning of British rule in India. "Turncoat Mir Jafar" became symbol of betrayal.' },
  { id: 'imphal_ww2',   name: 'Imphal–Kohima — Manipur/Nagaland (1944)', lat: 24.817, lng: 93.950, info: 'Battle of Imphal-Kohima (March–July 1944): Allied forces (India + UK) vs Imperial Japan (Operation U-Go). Decisive Allied victory — turned tide of WWII in Burma. Kohima called "Stalingrad of the East." ~17,000 Allied KIA; ~50,000 Japanese casualties. Kohima epitaph: "When you go home, tell them of us..."' },
  { id: 'saragarhi',    name: 'Saragarhi — NW Frontier (1897)',         lat: 33.617, lng: 71.417, info: 'Battle of Saragarhi (Sep 12, 1897): 21 soldiers of 36th Sikh Regiment vs ~10,000 Afridi and Orakzai Pashtun tribesmen. All 21 held the post and died fighting — none surrendered. Considered one of history\'s greatest last stands. British Parliament paid tribute. Sep 12 = Saragarhi Day (commemorated by Sikh Regiment).' },
  { id: 'rezang_la',    name: 'Rezang La — Ladakh (1962)',               lat: 33.817, lng: 79.483, info: 'Battle of Rezang La (Nov 18, 1962): 113 soldiers of 13 Kumaon (Maj Shaitan Singh, PVC posthumous) held off ~5,000 Chinese troops. All 114 soldiers died fighting (1 survived). Called India\'s "Thermopylae." Ammo ran out — fought hand-to-hand. Remains recovered in 2020s. Maj Shaitan Singh = one of India\'s greatest war heroes.' },
  { id: 'longewala_bf', name: 'Longewala — Rajasthan (1971)',            lat: 27.200, lng: 70.550, info: 'Battle of Longewala (Dec 4–5, 1971): 120 soldiers of A Coy, 23 Punjab (Maj Kuldip Singh Chandpuri, MVC) vs 2,000 Pakistani troops + 45 tanks. IAF Hawker Hunters at dawn destroyed Pakistani tank column. India\'s most lopsided victory of 1971 war. Pakistan lost 200+ killed, 36+ tanks, 500+ POW.' },
  { id: 'kargil_tiger', name: 'Tiger Hill (Tololing) — Kargil (1999)',   lat: 34.650, lng: 75.983, info: 'Battle of Tiger Hill (Jul 4, 1999, Op Vijay): Grenadiers Regiment captured Tiger Hill from Pakistani occupiers after intense fighting. Grenadier Yogendra Singh Yadav (PVC — youngest ever at 19) scaled vertical ice face under fire. Among the most iconic acts of individual bravery in post-1947 India.' },
  { id: 'halwara',      name: 'Asal Uttar — Punjab (1965)',              lat: 30.700, lng: 74.967, info: 'Battle of Asal Uttar (Sep 8–10, 1965): Pakistan\'s Operation Grand Slam (Gen Yahya Khan) launched massive armoured thrust. Indian Army (Poona Horse + 3rd Cavalry under Lt Gen Harbakhsh Singh) ambushed Pakistani 1st Armoured Division. Pakistan lost 97 tanks — largest tank battle in Asia since WWII.' },
]
