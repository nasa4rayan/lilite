export const GROQ_API_KEY = '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'

export const GROQ_MODEL_OPTIONS = ['llama-3.3-70b-versatile'] as const

export const GROQ_DEFAULT_MODEL = GROQ_MODEL_OPTIONS[0]
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export type GroqModel = (typeof GROQ_MODEL_OPTIONS)[number]
