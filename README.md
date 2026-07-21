# Otto

Live app: https://otto-seven-mocha.vercel.app/

Otto is a small AI career companion that chats with you about how you like to work, then turns the conversation into a simple work-style profile.

You can type or use your voice. After a short chat, Otto shows a results page with your work personality, strengths, and the kinds of teammates you might click with.

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To use the AI chat and voice transcription locally, create `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Built With

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI
- Recharts

## Note

The OpenAI key should only live in `.env.local` or your Vercel environment variables. Don't commit a real API key.
