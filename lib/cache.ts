export interface Joke {
  id: number
  type: string
  setup: string
  punchline: string
}

const jokeCache = new Map<number, Joke>()

const SEED_JOKES: Joke[] = [
  {
    id: 1,
    type: 'general',
    setup: "Why don't scientists trust atoms?",
    punchline: 'Because they make up everything!',
  },
  {
    id: 2,
    type: 'general',
    setup: 'Why did the scarecrow win an award?',
    punchline: 'Because he was outstanding in his field!',
  },
]

for (const joke of SEED_JOKES) {
  jokeCache.set(joke.id, joke)
}

export function getFromCache(id: number): Joke | undefined {
  return jokeCache.get(id)
}

export function addToCache(joke: Joke): void {
  jokeCache.set(joke.id, joke)
}

export function getCacheSize(): number {
  return jokeCache.size
}
