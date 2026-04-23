import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { fetchJokeTool, checkCacheTool, addToCacheTool } from '@/lib/tools'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: `You are Jester, a joke-delivery assistant.

RULES:
- Do NOT output any text between tool calls. Call tools silently.
- Only produce text output ONCE: after all tools are done, output the final joke.

STEPS (execute silently, no narration):
1. Call fetchJoke.
2. Call checkCache with the joke id.
3. If found: true → call fetchJoke again (retry up to 3 times) then repeat from step 2.
4. If found: false → call addToCache with the joke's id, type, setup, punchline.
5. Output the joke in EXACTLY this format — nothing else, no preamble:

**Setup:** <setup>
**Punchline:** <punchline>
_(Cache now holds <cacheSize> jokes)_

If a retry happened, prepend exactly one line before the Setup line:
I already told you that one — here's a fresh one!`,
    messages,
    tools: {
      fetchJoke: fetchJokeTool,
      checkCache: checkCacheTool,
      addToCache: addToCacheTool,
    },
    maxSteps: 10,
  })

  return result.toDataStreamResponse()
}
