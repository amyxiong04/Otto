# 🦦 OtterMatch

**Find jobs that fit you through conversation, not resumes.**

OtterMatch is an AI-powered job matching platform where Otto the otter discovers your work style through natural conversation. Instead of filling out forms or uploading resumes, you chat with Otto who learns what makes you thrive at work.

## What Makes OtterMatch Different

**Talk, don't fill out forms.** Otto learns about you through actual conversation, not endless dropdowns and checkboxes. Just chat naturally about what you want in a job.

**Use your voice or type.** Speak your answers out loud or type them out. Whatever feels more natural to you in the moment.

**Get real insights.** After chatting, you'll see your work personality visualized in a radar chart. Discover your professional strengths, ideal teammates, and what kind of work environment you thrive in.

**Actually enjoy the process.** Job searching doesn't have to feel like homework. Otto keeps it friendly, simple, and genuinely helpful.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/amyxiong04/Otto.git
cd Otto
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. Click "Start Chat" to begin your conversation with Otto
2. Chat via text or use the mic button for voice input
3. Answer Otto's questions naturally about your work preferences
4. After 3+ messages, click "See Your Results"
5. View your personalized work personality profile

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI GPT-4o-mini & Whisper
- **Charts:** Recharts
- **Icons:** Lucide React

## 📁 Project Structure

```
otter-jobs/
├── app/
│   ├── api/
│   │   ├── chat/          # GPT conversation endpoint
│   │   ├── transcribe/    # Whisper voice-to-text
│   │   └── analyze/       # Personality analysis
│   ├── call/              # Main chat interface
│   ├── results/           # Results page with charts
│   └── layout.tsx
├── components/
│   └── OttoMascot.tsx     # Otter mascot component
└── public/
    └── images/
        └── otto.png       # Otto mascot image
```

## 🔑 API Endpoints

### POST `/api/chat`
Conversation with Otto using GPT-4o-mini

```json
{
  "message": "user message",
  "conversationHistory": [...]
}
```

### POST `/api/transcribe`
Voice transcription using Whisper

```
FormData with audio file
```

### POST `/api/analyze`
Generate personality profile from conversation

```json
{
  "conversationHistory": [...]
}
```

## 🎨 Results Page

Your personalized profile includes:

- **Professional Strengths Radar Chart** - 7 dimensions (focused, independent, social, structured, analytical, creative, collaborative)
- **Personality Type** - Fun work category (e.g., "Creative Collaborator", "Solo Slayer")
- **Work Persona** - Custom description of your work style
- **Work Besties** - Personality types you'd work great with
- **Colleagues** - Types for professional relationships
- **Hashtags** - Two personality-driven tags

## 🤝 Contributing

This is a prototype project. Feel free to fork and experiment!

## 📝 License

MIT

---

**Note:** You'll need to add credits to your OpenAI account for AI features to work. The app includes fallback responses for testing without API access.

Built with 💙 by the OtterMatch Team
