// Prompt-injection defence: strip patterns that could escape XML context tags
// or hijack LLM instruction following.

const INJECTION_PATTERNS = [
  // XML escape attempts (our context delimiter)
  /<\/?\s*news_context\s*>/gi,
  // Llama / Mistral special tokens
  /\[INST\]|\[\/INST\]/g,
  /<<SYS>>|<<\/SYS>>/g,
  /<\/?s>/g,
  // Common instruction-hijack phrases
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/gi,
  /new\s+(system\s+)?instructions?/gi,
  /you\s+are\s+now\s+/gi,
  /disregard\s+(all\s+)?previous/gi,
  // Role-prefix injection
  /\bsystem\s*:/gi,
  /\bassistant\s*:/gi,
  /\buser\s*:/gi,
]

/**
 * Sanitize a string before injecting it into an LLM prompt.
 * Strips injection patterns and truncates to maxLength.
 */
export function sanitizeForPrompt(text, maxLength = 400) {
  if (!text || typeof text !== 'string') return ''
  let s = text.slice(0, maxLength)
  for (const p of INJECTION_PATTERNS) s = s.replace(p, ' ')
  return s.replace(/\s{2,}/g, ' ').trim()
}
