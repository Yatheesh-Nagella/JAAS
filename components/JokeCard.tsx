'use client'

import type { Message } from 'ai'

interface JokeCardProps {
  message: Message
}

export default function JokeCard({ message }: JokeCardProps) {
  if (message.role !== 'assistant') return null

  const content = typeof message.content === 'string' ? message.content : ''

  // Extract only the structured parts — ignore all agent narration text
  const setupMatch = /\*\*Setup:\*\*\s*(.+)/i.exec(content)
  const punchlineMatch = /\*\*Punchline:\*\*\s*(.+)/i.exec(content)
  const cacheMatch = /Cache now holds (\d+)/i.exec(content)
  const hasRetry = /already told you that one/i.test(content)

  const setup = setupMatch?.[1]?.trim()
  const punchline = punchlineMatch?.[1]?.trim()
  const cacheSize = cacheMatch ? parseInt(cacheMatch[1]) : null

  // Don't render until at least one structured part is present
  if (!setup && !punchline) return null

  return (
    <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-6 shadow-md">
      {hasRetry && (
        <p className="mb-3 text-sm font-medium text-orange-500">
          Already seen that one — fetched a fresh joke!
        </p>
      )}

      <div className="space-y-3">
        {setup && (
          <p className="text-gray-800">
            <strong className="text-yellow-700">Setup:</strong> {setup}
          </p>
        )}
        {punchline && (
          <p className="text-gray-800">
            <strong className="text-yellow-700">Punchline:</strong> {punchline}
          </p>
        )}
      </div>

      {cacheSize !== null && (
        <div className="mt-4">
          <span className="inline-flex items-center rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-yellow-900">
            Cache: {cacheSize} jokes
          </span>
        </div>
      )}
    </div>
  )
}
