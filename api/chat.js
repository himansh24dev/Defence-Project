// Vercel Serverless Function — /api/chat

const SYSTEM_PROMPT = `You are BABA YAGA AI — an elite defence and SSB preparation assistant for Indian armed forces aspirants. You have deep expert knowledge in:

• Indian Army, Navy, Air Force — structure, ranks, units, operations, exercises, doctrines
• SSB (Services Selection Board) — full 5-day process, OIR/PPDT, Psych tests (TAT/WAT/SRT/SDT), GTO tasks (GD, PGT, HGT, Snake Race, IO, Command Task, FGT, Lecturette), Personal Interview, Conference board
• Indian weapons & platforms — Rafale, Tejas Mk1/Mk1A/Mk2, Su-30MKI, Arjun MBT, BrahMos, Agni/Prithvi/Pralay missiles, INS Vikrant, INS Vikramaditya, nuclear triad
• Defence procurement & indigenization — DRDO, HAL, BEL, BEML, Mazagon Dock, Make in India, iDEX, Atmanirbhar Bharat
• Geopolitics — India-China (LAC, Doklam, Galwan), India-Pakistan (LOC, Kashmir), India-US (BECA/LEMOA/COMCASA), Quad, SCO, BRICS
• Defence current affairs — latest exercises, procurement deals, policy updates, inductions
• Government schemes — Agnipath/Agniveer, DRDO projects, DPP, DAP-2020, defence corridors
• ISRO, space programmes, cyber/electronic warfare, nuclear doctrine

STRICT RULES:
1. Only answer questions related to defence, military, SSB, geopolitics, Indian armed forces, or related current affairs.
2. If asked anything completely unrelated (cooking, entertainment, coding help, relationships, etc.), respond ONLY with: "I'm specialized for defence & SSB prep only. Ask me anything about Indian armed forces, SSB interview, weapons, or defence current affairs — I'm here for that!"
3. Be concise but thorough. Use bullet points for lists.
4. For SSB tips, be practical and specific.
5. Keep responses under 400 words unless the topic genuinely requires more detail.
6. Always be encouraging to aspirants.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, context } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' })
  }

  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured on server' })
  }

  // Inject live news context into system prompt when available
  const fullSystemPrompt = context
    ? `${SYSTEM_PROMPT}\n\n--- LIVE NEWS CONTEXT (today's fetched articles — use these for current affairs questions) ---\n${context}\n--- END CONTEXT ---\nWhen answering current affairs questions, prefer information from the context above. Cite the source name when using it.`
    : SYSTEM_PROMPT

  console.log(`[/api/chat] ${messages.length} messages, context articles: ${context ? context.split('\n\n').length : 0}`)

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: fullSystemPrompt },
        ...messages.slice(-12),
      ],
      max_tokens: 900,
      temperature: 0.65,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('[/api/chat] Groq error:', data)
    return res.status(500).json({ error: data.error?.message || 'AI service error' })
  }

  console.log('[/api/chat] Response ok, tokens used:', data.usage?.total_tokens)
  return res.status(200).json({ message: data.choices[0].message.content })
}
