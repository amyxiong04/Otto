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

---

**Note:** You'll need to add credits to your OpenAI account for AI features to work. The app includes fallback responses for testing without API access.

