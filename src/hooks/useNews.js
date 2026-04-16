import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Importance scoring based on keywords
const keywordScores = {
  critical: ['war', 'attack', 'strike', 'nuclear', 'ceasefire', 'invasion', 'crisis', 'killed', 'explosion', 'terrorist', 'coup'],
  high:     ['india', 'military', 'army', 'navy', 'airforce', 'missile', 'defence', 'border', 'pakistan', 'china', 'drdo', 'rafale', 'lac', 'security', 'minister', 'pm modi', 'prime minister', 'president'],
  medium:   ['government', 'policy', 'election', 'economy', 'bilateral', 'agreement', 'treaty', 'exercise', 'procurement', 'budget'],
}

function scoreImportance(title = '', description = '') {
  const text = `${title} ${description}`.toLowerCase()
  if (keywordScores.critical.some(k => text.includes(k))) return 'critical'
  if (keywordScores.high.some(k => text.includes(k))) return 'high'
  if (keywordScores.medium.some(k => text.includes(k))) return 'medium'
  return 'low'
}

async function fetchNews(category, query = '') {
  const params = new URLSearchParams({ category, query })
  const { data } = await axios.get(`/api/news?${params}`)
  const articles = (data.results || data.articles || []).map(a => ({
    ...a,
    importance: scoreImportance(a.title, a.description),
  }))
  // Sort by importance then by date
  const order = { critical: 0, high: 1, medium: 2, low: 3 }
  return articles.sort((a, b) => order[a.importance] - order[b.importance])
}

export function useNews(category, query = '') {
  return useQuery({
    queryKey: ['news', category, query],
    queryFn: () => fetchNews(category, query),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 15 * 60 * 1000, // refetch every 15 minutes
    retry: 2,
  })
}
