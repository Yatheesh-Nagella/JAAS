'use client'

import { useChat } from 'ai/react'
import JokeCard from '@/components/JokeCard'

export default function Home() {
  const { messages, isLoading, append, error } = useChat({
    api: '/api/joke',
  })

  const jokeMessages = messages.filter((m) => m.role === 'assistant')

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-yellow-700">🃏 Jester-as-a-Service</h1>
        <p className="mt-2 text-gray-600">
          Claude Haiku · tool-calling · cache reconciliation
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => append({ role: 'user', content: 'Tell me a joke!' })}
          disabled={isLoading}
          className="rounded-full bg-yellow-400 px-8 py-3 text-lg font-semibold text-yellow-900 shadow-lg transition-all hover:bg-yellow-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Jesting…
            </span>
          ) : (
            'Get a Joke'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {isLoading && (
        <div className="mt-8 animate-pulse rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <div className="mb-3 h-4 w-3/4 rounded bg-yellow-200" />
          <div className="h-4 w-1/2 rounded bg-yellow-200" />
        </div>
      )}

      <div className="mt-8 space-y-6">
        {jokeMessages
          .slice()
          .reverse()
          .map((m) => (
            <JokeCard key={m.id} message={m} />
          ))}
      </div>
    </main>
  )
}
