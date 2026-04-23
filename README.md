# 🃏 Jester-as-a-Service (JaaS)

An AI-powered joke delivery app built with Next.js 15, Vercel AI SDK, and Claude Haiku. The agent uses a tool-calling pattern to fetch jokes, reconcile them against a local cache, and stream the result back to the UI.

## How it works

When you click **Get a Joke**, a Claude Haiku agent runs through three tools in sequence:

1. **`fetchJoke`** — calls `https://official-joke-api.appspot.com/jokes/random` and gets a `{ id, type, setup, punchline }` object
2. **`checkCache`** — checks an in-memory store by joke `id`. The cache is pre-seeded with 2 jokes so reconciliation is testable from the first request
3. **`addToCache`** — if the joke is new, stores it and returns the updated cache size. If it was already cached, the agent retries with a fresh fetch

The final joke streams back to the UI and is displayed as a card with a live cache count badge.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| AI SDK | Vercel AI SDK v4 (`ai`, `@ai-sdk/anthropic`) |
| Model | Claude Haiku (`claude-haiku-4-5-20251001`) |
| Runtime | Edge (Vercel) |
| Joke API | [Official Joke API](https://official-joke-api.appspot.com) |

## Project structure

```
app/
  api/joke/route.ts   — Edge route: streamText + 3 tools, maxSteps: 10
  page.tsx            — Client UI with useChat hook
  layout.tsx
  globals.css
components/
  JokeCard.tsx        — Renders streamed joke (extracts Setup/Punchline/Cache via regex)
lib/
  cache.ts            — Module-level Map<number, Joke>, seeded with 2 jokes
  tools.ts            — fetchJokeTool, checkCacheTool, addToCacheTool
```

## Running locally

```bash
# 1. Clone
git clone https://github.com/Yatheesh-Nagella/JAAS.git
cd JAAS

# 2. Install dependencies
npm install

# 3. Add your Anthropic API key
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Get a Joke**.

## Deploying to Vercel

```bash
npx vercel --prod
```

Set `ANTHROPIC_API_KEY` in **Vercel Dashboard → Project → Settings → Environment Variables**.

## API reference

The joke API used under the hood:

| Endpoint | Returns |
|---|---|
| `/jokes/random` | 1 random joke object |
| `/jokes/ten` | Array of 10 random jokes |
| `/jokes/random/{n}` | Array of N random jokes |
| `/jokes/{id}` | Specific joke by ID |
| `/jokes/{type}/random` | Random joke filtered by type (`general`, `programming`, `knock-knock`) |
