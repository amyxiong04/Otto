# Otto

Live app: https://otto-seven-mocha.vercel.app/

Otto asks about how you like to work, then gives you a simple work-style profile and sends you a copy by email.

You can type or use your voice. After a short chat, Otto shows a results page with your work personality, strengths, and the kinds of teammates you might click with.

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Create `.env.local` for the chat and results email:

```env
OPENAI_API_KEY=your_openai_api_key_here
RESEND_API_KEY=your_resend_api_key_here
RESULTS_FROM_EMAIL="Otto <results@yourdomain.com>"
GITHUB_TOKEN=your_optional_github_token_here
```

## Built With

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI
- Resend
- Recharts

## Note

API keys should only live in `.env.local` or your Vercel environment variables. Don't commit real keys.
