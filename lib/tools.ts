import { tool } from 'ai'
import { z } from 'zod'
import { getFromCache, addToCache as storeCacheJoke, getCacheSize, type Joke } from './cache'

export const fetchJokeTool = tool({
  description:
    'Fetches a random joke from the Official Joke API. Returns id, type, setup, and punchline.',
  parameters: z.object({}),
  execute: async (): Promise<Joke> => {
    const res = await fetch('https://official-joke-api.appspot.com/jokes/random', {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Joke API error: ${res.status}`)
    return res.json() as Promise<Joke>
  },
})

export const checkCacheTool = tool({
  description:
    'Checks whether a joke with the given id is already in the cache. Returns found, the joke if present, and current cache size.',
  parameters: z.object({
    id: z.number().describe('The numeric joke ID to look up'),
  }),
  execute: async ({ id }): Promise<{ found: boolean; joke: Joke | null; cacheSize: number }> => {
    const joke = getFromCache(id)
    return { found: joke !== undefined, joke: joke ?? null, cacheSize: getCacheSize() }
  },
})

export const addToCacheTool = tool({
  description: 'Stores a joke in the cache. Returns success and new cache size.',
  parameters: z.object({
    id: z.number(),
    type: z.string(),
    setup: z.string(),
    punchline: z.string(),
  }),
  execute: async ({ id, type, setup, punchline }): Promise<{ success: boolean; cacheSize: number }> => {
    storeCacheJoke({ id, type, setup, punchline })
    return { success: true, cacheSize: getCacheSize() }
  },
})
