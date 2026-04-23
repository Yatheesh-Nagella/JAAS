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
        <a
          href="https://github.com/Yatheesh-Nagella/JAAS"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-yellow-700 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Yatheesh-Nagella/JAAS
        </a>
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
