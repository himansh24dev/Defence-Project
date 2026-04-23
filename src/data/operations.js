// Indian Military Operations & Exercises — Updated April 2026
export const operations = [
  // ── HISTORICAL WARS ──────────────────────────────────────────────────────
  {
    id: 'op-vijay-1948', name: 'Operations 1947-48 (J&K Accession)', type: 'War',
    year: '1947–1948', theatre: 'Jammu & Kashmir',
    forces: 'Indian Army vs Pakistan tribal irregulars + Pakistan Army',
    objective: 'Defend J&K after Maharaja Hari Singh\'s accession to India; repel Pakistani invasion',
    outcome: 'India secured two-thirds of J&K. Ceasefire on 1 January 1949 (UN mediated). Pakistan retained Mirpur, Muzaffarabad.',
    keyBattles: [
      { battle: 'Battle of Srinagar (Oct 1947)', detail: '1 Sikh were airlifted to Srinagar — India\'s first use of air transport in war. Saved Srinagar from falling. Brigadier L P Sen secured the airport.' },
      { battle: 'Defence of Naushera & Jhangar (Dec 1947–Jul 1948)', detail: 'Brigadier Mohammad Usman ("Naushera ka Sher" / Lion of Naushera) commanded 50 Para Brigade at Jhangar. Repulsed heavy Pakistani tribal/regular assaults on Nowshera (Feb 1948) and recaptured Jhangar. KIA at Jhangar on 3 July 1948 by a 25-pdr shell — highest-ranking Indian Army officer killed in action in 1947–48. Awarded Maha Vir Chakra posthumously.' },
    ],
    significance: 'Foundation of the Kashmir dispute. India\'s first war — won but politically incomplete. UN ceasefire left PoK in Pakistan\'s hands. Lesson: Wars decided by politicians, won by soldiers. Brigadier Mohammad Usman = the highest-ranking Indian Army officer killed in the 1947–48 war; Prime Minister Nehru attended his funeral.',
  },
  {
    id: 'op-goa-liberation', name: 'Operation Vijay (Goa Liberation 1961)', type: 'Military Operation',
    year: '1961', theatre: 'Goa, Daman, Diu (Portuguese colonies)',
    forces: 'Indian Army, Navy, Air Force vs Portuguese garrison (~3,500)',
    objective: 'Liberate Portuguese colonial territories despite UN opposition',
    outcome: 'Goa, Daman, Diu liberated in 36 hours (18–19 December 1961). Portuguese garrison surrendered.',
    keyBattles: [
      { battle: 'Naval blockade + air dominance', detail: 'Navy blockaded Goa ports; INS Vikrant and other ships prevented any Portuguese escape. IAF established air superiority. Army advanced on land.' },
    ],
    significance: 'India acted against UN opposition — showed strategic autonomy. Jawaharlal Nehru said "Portuguese presence is a challenge." Goa liberation 36-hour campaign = speed + coordination. 19 December = Goa Liberation Day.',
  },
  {
    id: 'op-1962-war', name: '1962 Sino-Indian War', type: 'War',
    year: '1962', theatre: 'NEFA (Arunachal) + Ladakh',
    forces: 'Indian Army vs People\'s Liberation Army (China)',
    objective: 'India defended; China attacked to establish LAC dominance',
    outcome: 'India lost — China occupied Aksai Chin and advanced to Tawang. China unilaterally ceased fire (Nov 1962) after reaching goals. India humiliated.',
    keyBattles: [
      { battle: 'Rezang La (18 Nov 1962)', detail: '13 Kumaon\'s Charlie Company under Major Shaitan Singh — 120 soldiers vs Chinese division. 114 of 120 died fighting in -20°C; 6 survived as POW. Last defenders used rifles as clubs. Shaitan Singh → PVC (posthumous).' },
      { battle: 'Tawang fall', detail: 'China swept through NEFA; Tawang evacuated without fight. Exposed India\'s lack of border infrastructure.' },
    ],
    lessons: [
      'India lacked all-weather roads to borders — BRO created in 1960 (too late for 1962)',
      'Political interference in military operations (Nehru\'s "Forward Policy")',
      'Intelligence failure — Indian intelligence didn\'t predict Chinese attack scale',
      'Equipment shortage: soldiers at Rezang La had only Sten guns vs Chinese automatic weapons',
    ],
    significance: '1962 is India\'s defining military trauma — like Pearl Harbour for the US. Every border infrastructure project, every LAC policy, every Ladakh deployment is shaped by 1962. Rezang La = India\'s bravest stand in a losing war. 1962 → India\'s defence spending and modernization has since prioritized China threat.',
  },
  {
    id: 'op-1965-war', name: '1965 Indo-Pakistani War', type: 'War',
    year: '1965', theatre: 'Rajasthan, Punjab, Jammu, Rann of Kutch',
    forces: 'Indian Army, Air Force, Navy vs Pakistan Army, PAF, PN',
    objective: 'Pakistan\'s Op Gibraltar (infiltrate Kashmir) and Op Grand Slam (capture Akhnur). India responded with full-scale counter-offensive.',
    outcome: 'Military stalemate; Tashkent Agreement (Jan 1966) restored pre-war positions.',
    keyBattles: [
      { battle: 'Battle of Asal Uttar (8-10 Sep 1965)', detail: 'India\'s greatest tank victory — Pakistani Pattons ambushed at Asal Uttar by Indian Centurions. ~90 Pakistani tanks destroyed/captured. "The Graveyard of Patton Tanks." CQMH Abdul Hamid (4 Grenadiers, Jeep-mounted RCL gunner) destroyed Patton tanks on 9–10 Sept before being killed — PVC (posthumous). Exact count disputed (PVC citation mentions fewer; popular figure 7–8).' },
      { battle: 'Battle of Phillora', detail: '17 Poona Horse + 2 Lancers vs Pakistani armoured division. India outmanoeuvred Pakistan, capturing Phillora and advancing beyond.' },
    ],
    significance: 'Asal Uttar = India\'s greatest tank battle ever. CQMH Abdul Hamid\'s RCL gun vs Patton tanks = courage over technology. Proved Indian infantry with RCL can stop armoured columns. Tashkent Agreement — India got military win, political draw (Lal Bahadur Shastri died in Tashkent after signing).',
  },
  {
    id: 'op-vijay-1971', name: '1971 Liberation War (Op Vijay)', type: 'War',
    year: '1971 (full war: 3–16 Dec 1971)', theatre: 'East Pakistan (Bangladesh) + Western Front',
    forces: 'Indian Army/AF/Navy + Mukti Bahini vs Pakistani Army/PAF/PN',
    objective: 'End Pakistani atrocities in East Pakistan; secure Bangladesh\'s liberation; respond to Pakistani pre-emptive strikes on India',
    outcome: 'India\'s greatest military victory. 93,000 Pakistani soldiers surrendered — largest surrender since WWII. Bangladesh independent.',
    keyBattles: [
      { battle: 'Tangail Paradrop (11 Dec 1971)', detail: '750 paratroopers of 2 Para dropped behind Pakistani lines at Tangail — first mass combat airdrop in Asia since WWII. Cut Pakistani army\'s retreat to Dhaka.' },
      { battle: 'Operations Trident & Python on Karachi (4 & 8–9 Dec)', detail: 'Op Trident (4 Dec): Vidyut-class missile boats INS Nipat, INS Nirghat, INS Veer fired Styx (P-15) anti-ship missiles — sank PNS Khaibar (destroyer), PNS Muhafiz (minesweeper), MV Venus Challenger (ammunition ship) and hit Kemari oil depot at Karachi. Op Python (8–9 Dec) followed up — further damage to Karachi harbour. Fuel depot burned for days. 4 December = Indian Navy Day.' },
      { battle: 'Battle of Hilli (22 Nov – 11 Dec)', detail: 'Bloodiest battle of the eastern front — fought in two phases (22–24 Nov and 10–11 Dec). 8 Guards bore the brunt of frontal assaults on Pakistani 4 FF defences. Hilli captured 11 Dec. 8 Guards earned 3 Maha Vir Chakras + 2 Vir Chakras — most decorated Indian unit of the battle.' },
      { battle: 'Dhaka capture (16 Dec 1971)', detail: 'General Niazi (Pakistan) surrendered to Lt Gen Jagjit Singh Aurora at Dhaka Racecourse. 93,000 POW — largest surrender since WWII (German surrender at Stalingrad was similar scale).' },
    ],
    significance: '1971 = India\'s finest military hour. 13 days for one of the quickest decisive wars in history. Bangladesh created — India changed the map of Asia. 93,000 POW = unprecedented. PM Indira Gandhi "Iron Lady" = her Churchill moment. Gen Sam Manekshaw = India\'s greatest military mind. INS Vikrant carrier blockade + Navy missile attack + Para airdrop = true joint warfare.',
  },
  {
    id: 'op-meghdoot', name: 'Operation Meghdoot (Siachen 1984)', type: 'Military Operation',
    year: '1984 (13 April)', theatre: 'Siachen Glacier, Ladakh',
    forces: 'Indian Army (Kumaon Regiment + Ladakh Scouts) + IAF helicopters vs Pakistani Op Ababeel',
    objective: 'Pre-empt Pakistan\'s Op Ababeel and occupy Siachen Glacier passes (Simla Agreement\'s ambiguous boundary NJ9842 onwards)',
    outcome: 'India occupies strategic passes — Bilafond La (13 April) and Sia La (17 April 1984). World\'s highest military positions secured at 5,400–6,700 m.',
    keyBattles: [
      { battle: 'Race to Bilafond La & Sia La (April 1984)', detail: 'RAW intelligence warned Pakistan was preparing Op Ababeel. Indian Army launched Op Meghdoot on morning of 13 April 1984 — four days before Pakistan\'s planned move. Kumaon Regiment (1 Kumaon, 2 Kumaon) and Ladakh Scouts airlifted by IAF Mi-17/Cheetah helicopters to glacier heights. Pakistan arrived 4 days late. India held the high ground permanently.' },
    ],
    significance: 'India\'s most brilliant pre-emptive military operation. Siachen controls water supply to Pakistan\'s Punjab (Indus tributaries). India\'s intelligence network gave just enough warning. If Pakistan had occupied Siachen first, Indian Army would have been fighting uphill at 6,000 m. Op Meghdoot = intelligence → military speed = strategic outcome.',
  },
  {
    id: 'op-pawan-srilanka', name: 'Operation Pawan (Sri Lanka 1987–90)', type: 'Peace-Keeping Operation',
    year: '1987–1990', theatre: 'Northern Sri Lanka (Jaffna)',
    forces: 'Indian Peace Keeping Force (IPKF) vs LTTE',
    objective: 'Implement Indo-Sri Lanka Accord; disarm LTTE; restore peace in Tamil areas',
    outcome: 'IPKF withdrew 1990 without fully achieving objectives. LTTE refused to disarm. 1,200 Indian soldiers killed.',
    keyBattles: [
      { battle: 'Battle of Jaffna University (Oct 1987)', detail: 'Fierce urban warfare — LTTE held Jaffna University complex. Para SF and commando assault in 4 days. India\'s first counterinsurgency against a sophisticated guerrilla force.' },
    ],
    lessons: [
      'Political decisions (Rajiv Gandhi–Jayawardene Accord) without military assessment',
      'Unconventional warfare training required — IPKF was conventional force vs asymmetric LTTE',
      'Long-term commitment without clear exit strategy',
    ],
    significance: 'Op Pawan = India\'s Vietnam-equivalent lesson. Well-intentioned peacekeeping turned into brutal counterinsurgency. 1,200 dead with no strategic outcome. LTTE assassination of Rajiv Gandhi (1991) was revenge. Lesson: Military force without clear political objective = quagmire.',
  },
  {
    id: 'op-cactus-maldives', name: 'Operation Cactus (Maldives 1988)', type: 'Military Operation',
    year: '3 November 1988', theatre: 'Male, Republic of Maldives',
    forces: '50 Independent Parachute Brigade (6 Para Battalion) + IAF IL-76 + Mirage 2000 escort + Indian Navy (INS Godavari, INS Betwa)',
    objective: 'Restore President Maumoon Abdul Gayoom after coup attempt by PLOTE mercenaries (Sri Lankan Tamil group led by Abdullah Luthufi)',
    outcome: 'President restored within hours of Indian landing. Mercenaries fled by hijacked freighter MV Progress Light; intercepted and captured by INS Godavari and INS Betwa in the Arabian Sea.',
    keyBattles: [
      { battle: 'Paratrooper landing at Hulhule (night of 3 Nov 1988)', detail: 'Two IL-76s from Agra (escorted by Mirage 2000s) flew ~2,500 km non-stop — first wave of 6 Para Battalion (50 Indep Para Bde under Brig Farukh Bulsara) landed at Hulhulé airport ~2130 hrs local time. Troops crossed lagoon by boat to Male, secured President Gayoom at Presidential Palace. Coup crushed within hours.' },
    ],
    significance: 'One of India\'s fastest power projection operations. Non-stop airlift from Agra to Hulhulé demonstrated India\'s ability to deploy forces across the Indian Ocean Region within hours. IOR = India\'s sphere of influence. Maldives gratitude lasted decades (until 2018 political shifts). Template for future Indian IOR interventions.',
  },

  // ── MODERN OPERATIONS ────────────────────────────────────────────────────
  {
    id: 'op-vijay-kargil', name: 'Operation Vijay (Kargil 1999)', type: 'Limited War',
    year: '26 July 1999 (Kargil Vijay Diwas)', theatre: 'Kargil, Ladakh, J&K',
    forces: 'Indian Army, IAF vs Pakistan Army (masquerading as militants) + some regular Pakistani forces',
    objective: 'Evict Pakistani intruders from Kargil heights (Tiger Hill, Tololing, Point 4875, Batalik sector)',
    outcome: 'Complete Indian victory. All occupied peaks retaken by 26 July 1999 (60 days). Pakistan Army withdrawn. 527 Indian soldiers martyred.',
    keyBattles: [
      { battle: 'Tololing (May–July 1999)', detail: '2 Rajputana Rifles led the final assault that recaptured Tololing (final push began 2 July; position secured by 7 July). Capt Vijayant Thapar (22) — a fourth-generation army officer — was killed in action at Knoll/Black Rocks on 29 June 1999 leading his platoon. Awarded Vir Chakra (posthumous). His last letter home is one of Indian Army\'s most famous.' },
      { battle: 'Tiger Hill (3–4 July 1999)', detail: '18 Grenadiers (Ghatak Platoon) + 8 Sikh + 2 Naga — assault at night at ~16,500 ft. Grenadier Yogendra Singh Yadav (19 years old) volunteered as lead for the rope climb; sustained 15 bullet wounds + 2 grenade injuries, killed 4 enemy soldiers in close combat, yet secured a key bunker. PVC — youngest ever recipient.' },
      { battle: 'IAF Op Safed Sagar', detail: 'IAF deployed Mirage 2000 (with laser-guided bombs — first IAF LGB combat use), MiG-21, MiG-27 and Mi-17 helicopters in high-altitude strike role. Losses: one MiG-21 (Sqn Ldr Ajay Ahuja — KIA), one MiG-27 (Flt Lt K. Nachiketa — ejected over Batalik sector on 27 May 1999, POW for 8 days, returned 3 June 1999 via ICRC; later promoted Group Captain), and one Mi-17. IAF LGB strikes on Tiger Hill and Muntho Dhalo camps were decisive.' },
    ],
    keyPersons: [
      'Captain Vikram Batra, 13 JAK Rif (PVC, "Sher Shah" — captured Pt 5140; KIA 7 Jul 1999 at Pt 4875 while rescuing wounded officer)',
      'Grenadier Yogendra Singh Yadav, 18 Grenadiers (PVC — youngest PVC recipient; survived 15 bullet wounds at Tiger Hill)',
      'Capt Vijayant Thapar, 2 Rajputana Rifles (Vir Chakra posthumous, KIA 29 Jun 1999 at Knoll, Tololing)',
      'Flt Lt K. Nachiketa, MiG-27 pilot (POW for 8 days, returned via ICRC)',
      'Gen V.P. Malik (COAS — "We will fight with what we have")',
    ],
    significance: 'Kargil = India\'s modern defining victory. TV-age war watched live by 100 crore Indians. Vikram Batra = generation\'s hero. IAF support = joint warfare concept proved. Nuclear shadow: Both countries had tested nukes in 1998 — world watched if nuclear war would start. India\'s military restraint (staying within Indian territory) was strategically brilliant.',
  },
  {
    id: 'op-parakram', name: 'Operation Parakram (2001–02)', type: 'Military Mobilization',
    year: 'December 2001 – October 2002', theatre: 'India-Pakistan border',
    forces: 'Indian Army mobilized half-million troops to Pakistan border',
    objective: 'Coercive diplomacy after Parliament attack (Dec 2001) — force Pakistan to end cross-border terrorism',
    outcome: 'Partial success — Pakistan banned Lashkar-e-Taiba and Jaish-e-Mohammad (temporarily). No war. Troops demobilised after 10 months.',
    keyBattles: [],
    significance: 'Op Parakram exposed India\'s slow mobilization problem — took 2-3 weeks to deploy forces (by which time diplomatic pressure had defused crisis). Led to "Cold Start Doctrine" concept — rapid mobilization to exploit political windows before international community intervenes. Cold Start = India\'s classified military strategy for swift limited war.',
  },
  {
    id: 'surgical-strikes-2016', name: 'Surgical Strikes (2016 + Balakot 2019)', type: 'Special Forces / Air Operation',
    year: '2016 (Sep) + 2019 (Feb)', theatre: 'Pakistan-administered Kashmir + Pakistan (KPK)',
    forces: 'Para SF (2016) + IAF Mirage 2000 (2019)',
    objective: '2016: Destroy terror launch pads after Uri attack (19 soldiers killed). 2019: Destroy JeM training camp after Pulwama (40 CRPF killed).',
    outcome: '2016: Para SF crossed LoC, destroyed 7 terror launch pads, returned before dawn. 2019: Mirage 2000 struck Balakot with SPICE-2000 bombs.',
    keyBattles: [
      { battle: '2016 Surgical Strikes', detail: 'Para SF crossed multiple LoC points simultaneously at 12:30 AM. 7 launch pads neutralised. Back across LoC before Pakistani Army could respond. Government announced it publicly — first such acknowledgement.' },
      { battle: 'Balakot 2019 + Abhinandan', detail: 'IAF Mirage 2000s with SPICE-2000 guided bombs hit a JeM facility at Balakot, KPK (inside Pakistan, not PoK — unprecedented since 1971) on 26 Feb 2019. On 27 Feb, PAF crossed LoC in retaliation; in the dogfight Wing Commander Abhinandan Varthaman\'s MiG-21 Bison engaged PAF jets — IAF claims a Pakistani F-16 was shot down (Pakistan and US dispute this). Abhinandan\'s aircraft was hit; he ejected over Pakistan-administered Kashmir, was captured, and released on 1 March 2019 (~60 hours). Later awarded Vir Chakra and promoted to Group Captain.' },
    ],
    significance: '2016 Surgical Strikes = India changed rules of engagement — cross-border response to terror is now India\'s stated policy. Balakot 2019 = India crossed into Pakistan for first time since 1971 — massive escalation. Abhinandan = became national hero; promoted to Group Captain. The f-16 shoot-down by a MiG-21 = testament to IAF pilot training.',
  },
  {
    id: 'galwan-2020', name: 'Galwan Valley Standoff (2020)', type: 'Military Confrontation',
    year: '2020–2024 (ongoing disengagement)', theatre: 'Eastern Ladakh — Galwan, Pangong, Depsang',
    forces: 'Indian Army vs PLA (China)',
    objective: 'India: maintain patrolling rights at LAC. China: push India back from forward positions.',
    outcome: 'June 15 2020: Hand-to-hand combat at Galwan — 20 Indian soldiers (Col Santosh Babu + 19 others) killed; China admits 4 killed (Western estimates: 35–40). India deployed massive reinforcements. Partial disengagement at PP-14, PP-15, PP-17A, Gogra, Hot Springs by 2024.',
    keyBattles: [
      { battle: 'Galwan Night Battle (15 June 2020)', detail: 'Colonel Santosh Babu led patrol to verify Chinese pullback per agreement. Ambushed by 300+ PLA soldiers with nails-studded clubs and rods. Hand-to-hand combat for 6 hours in -15°C beside Galwan River. 20 Indians killed — Col Santosh Babu awarded Mahavir Chakra (MVC) posthumously.' },
    ],
    significance: '20 Indian soldiers killed = worst India-China clash since 1967. Changed India-China relations fundamentally — "business as usual" ended. India banned 200+ Chinese apps, boycotted Chinese investment in key sectors. China\'s CPEC vulnerability: India highlighted PoK corridor. India placed 50,000 additional troops in Ladakh. Col Santosh Babu MVC = leadership under ambush.',
  },

  // ── HUMANITARIAN OPERATIONS ──────────────────────────────────────────────
  {
    id: 'op-rahat-2015', name: 'Operation Rahat (Yemen 2015)', type: 'Humanitarian Evacuation',
    year: '2015 (March–April)', theatre: 'Aden and Sanaa, Yemen',
    forces: 'IAF C-17/C-130J + Indian Navy ships',
    objective: 'Evacuate Indian nationals and foreign nationals from war-torn Yemen',
    outcome: '4,640 Indians + 960 foreign nationals (from 41 countries) evacuated — 5,600 total. Navy deployed INS Sumitra, INS Mumbai, and INS Tarkash. IAF C-17 operated via Djibouti; C-130J landed at Sanaa while under artillery fire.',
    significance: 'Operation Rahat = India\'s largest-ever peacetime evacuation (5,600 total). C-130J landing under artillery fire = IAF demonstrated war-zone operations. India evacuated nationals from 41 countries — projecting India as regional power capable of international rescue. Garud commandos secured the aircraft at Sanaa airfield.',
  },
  {
    id: 'op-devashakti-2021', name: 'Operation Devashakti (Afghanistan 2021)', type: 'Humanitarian Evacuation',
    year: 'August 2021', theatre: 'Kabul, Afghanistan',
    forces: 'IAF C-17 Globemaster',
    objective: 'Evacuate Indians and Afghan Sikh/Hindu minorities after Taliban takeover of Kabul',
    outcome: '800+ Indians + 150+ Afghan Sikhs/Hindus evacuated in 4 C-17 sorties. Operation complete in 96 hours.',
    significance: 'Taliban takeover in 11 days caught everyone — including USA — off guard. India evacuated Sikh community from Kabul in a state of chaos. C-17 capability = India can fly strategic airlift missions to 8,000 km distance.',
  },

  // ── RECENT OPERATIONS ────────────────────────────────────────────────────
  // NOTE: Bilateral and multilateral military exercises have been moved to
  // src/data/militaryExercises.js (rendered on the dedicated "Exercises" page).

  {
    id: 'op-blue-star', name: 'Operation Blue Star (1984)', type: 'Internal Security Operation',
    year: '1984 (June 1–10)', theatre: 'Golden Temple Complex, Amritsar, Punjab',
    forces: 'Indian Army (9 Infantry Division) + CRPF vs Khalistan militants (Jarnail Singh Bhindranwale)',
    objective: 'Flush out Sikh militants led by Bhindranwale who had fortified the Golden Temple complex with weapons.',
    outcome: 'Bhindranwale and militants killed. Indian Army official figures: 83 killed (4 officers + 79 other ranks) + 236 wounded; 554 militants/civilians killed (Army figure — independent estimates are higher and disputed). Akal Takht severely damaged. Operation succeeded militarily but created deep political backlash.',
    keyBattles: [
      { battle: 'Assault on Akal Takht (5–6 Jun 1984)', detail: 'Army used tanks (Vijayanta) and artillery inside Golden Temple complex — first time in Indian military history. Bhindranwale killed in basement of Akal Takht. Heavily fortified building required armour due to militants\' rocket launchers and MMGs.' },
      { battle: 'Battle for Langar Hall', detail: 'Militants had converted kitchen/langar area into firing positions. Para Commandos led close-quarter clearing operations. Lt Col Israr Khan KIA leading assault.' },
    ],
    lessons: ['Urban assault in religious complex — extreme political sensitivity', 'Armour essential even in CQB when enemy has RPGs', 'Internal security = political consequences outlast military success'],
    significance: 'Blue Star led directly to PM Indira Gandhi\'s assassination (31 Oct 1984) by her Sikh bodyguards. Army went in against its own principles of respecting religious sites — but mission was accomplished. Gen A.S. Vaidya (COAS who ordered Blue Star) was later assassinated. Blue Star = most controversial Indian Army operation. SSB: Understanding civil-military relations in internal security.',
  },
  {
    id: 'op-brasstacks', name: 'Operation Brasstacks (1986–87)', type: 'Military Mobilization / Near-War',
    year: '1986–1987', theatre: 'Rajasthan-Punjab border (India-Pakistan)',
    forces: 'Indian Army (largest peacetime exercise ever) vs Pakistan Army counter-mobilisation',
    objective: 'India\'s largest peacetime military exercise — "test" of integrated battle groups. Pakistan interpreted as preparation for war and counter-mobilised.',
    outcome: 'No war — diplomatic intervention. Both sides stood down after back-channel negotiations. India-Pakistan came closest to war since 1971.',
    keyBattles: [],
    lessons: ['Military exercises with real troops can trigger escalation spirals', 'Signalling and communications critical to prevent miscalculation', 'Nuclear dimension — both sides had nuclear capability by 1987'],
    significance: 'Brasstacks was planned by Gen K. Sundarji (COAS) — India\'s most aggressive military doctrine exercise. Pakistan mobilised 6 divisions in counter-response. Rajiv Gandhi-Benazir Bhutto back-channel call defused crisis. First time both nuclear-armed India and Pakistan faced each other with mobilised armies. Template for all future crisis management between two nuclear powers.',
  },
  {
    id: 'op-sindoor', name: 'Operation Sindoor (May 2025)', type: 'Air + Missile Strike',
    year: 'May 2025', theatre: 'Pakistan and Pakistan-Occupied Kashmir (PoK)',
    forces: 'Indian Air Force (Rafale with SCALP/Hammer, Su-30MKI) + Indian Army (BrahMos) + Indian Navy (Arabian Sea forward presence)',
    objective: 'Destroy terrorist infrastructure of Jaish-e-Mohammed (JeM), Lashkar-e-Taiba (LeT) and Hizbul Mujahideen in Pakistan and PoK following the Pahalgam terror attack (22 April 2025) in which 26 civilians — mostly tourists — were killed by The Resistance Front (TRF, a LeT proxy).',
    outcome: 'Launched on the night of 7–8 May 2025. India struck 9 terror-linked targets — 4 inside Pakistan proper (incl. Bahawalpur and Muridke) and 5 in PoK (incl. Muzaffarabad, Kotli, Bhimber). India claimed 100+ terrorists eliminated. Conflict escalated over ~88 hours across air and missile domains; both sides reached an understanding on the evening of 10 May 2025.',
    keyBattles: [
      { battle: 'Strike on JeM HQ, Bahawalpur (night of 7–8 May 2025)', detail: 'Stand-off precision munitions hit Jaish-e-Mohammed\'s Markaz Subhan Allah complex at Bahawalpur — in Pakistan\'s Punjab province, ~100 km inside Pakistan. Deepest Indian strike into Pakistani Punjab since 1971.' },
      { battle: 'Strike on LeT complex, Muridke (night of 7–8 May 2025)', detail: 'Markaz Taiba — Lashkar-e-Taiba\'s headquarters near Muridke (~30 km from Lahore) — struck. Complex had been used to train the 26/11 Mumbai attackers.' },
      { battle: 'PoK strikes — Muzaffarabad, Kotli, Bhimber', detail: 'IAF and Indian Army targeted launch-pad camps across PoK from which fidayeen infiltrations were planned. Sites attributed to Hizbul Mujahideen and JeM training.' },
    ],
    lessons: [
      'Precision standoff strike capability gives India non-contact warfare option',
      'BrahMos + SCALP = ability to hit targets 300–500 km deep inside Pakistan from Indian airspace',
      'Nuclear escalation management — India struck terrorist (non-state) infrastructure, not Pakistani military assets',
      'India calibrated response to avoid full-scale war while punishing Pakistan',
    ],
    significance: 'Op Sindoor = India\'s most significant military action inside Pakistan since 1971. Crossed the Rubicon: India struck deep inside Pakistani Punjab (not just PoK). Established new deterrence threshold — terror attack on Indian soil = precision strikes inside Pakistan. Named "Sindoor" (vermilion — symbol of married Hindu women) after many victims\' wives lost husbands at Pahalgam. Rafale + BrahMos = the combination that made this possible. SSB CRITICAL: Know Pahalgam attack, Op Sindoor targets, weapons used, and India\'s strategic messaging.',
  },
]
