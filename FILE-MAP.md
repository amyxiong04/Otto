# 📂 Project File Map

## Visual Directory Structure

```
otter-jobs/
│
├── 📱 app/                          # Next.js App Directory
│   ├── layout.tsx                   # Root layout (metadata, fonts)
│   ├── page.tsx                     # Main page (call state logic)
│   └── globals.css                  # Global styles & animations
│
├── 🧩 components/                   # Reusable React Components
│   ├── IncomingCall.tsx            # Phone call acceptance screen
│   └── ChatInterface.tsx           # Main chat UI with Otto
│
├── 🎨 public/                       # Static Assets (future)
│   └── (add images, icons here)
│
├── ⚙️ Configuration Files
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tailwind.config.ts          # Tailwind + Ghibli theme
│   ├── postcss.config.js           # PostCSS for Tailwind
│   ├── next.config.js              # Next.js settings
│   ├── .eslintrc.js                # ESLint rules
│   └── .gitignore                  # Git ignore patterns
│
└── 📚 Documentation
    ├── README.md                    # Full project documentation
    ├── SETUP.md                     # Installation instructions
    ├── PRESENTATION.md              # Meeting presentation guide
    ├── QUICK-REFERENCE.md          # Team quick reference
    ├── preview.html                # Static HTML preview
    └── FILE-MAP.md                 # This file!
```

---

## Key Files Explained

### 🚀 Core Application Files

#### `app/page.tsx` - The Heart of the App
**What it does:**
- Manages call states: incoming → active → ended
- Renders IncomingCall or ChatInterface components
- Handles user interactions (accept, decline, hang up)

**Key functions:**
```typescript
handleAcceptCall()   // Start the chat
handleDeclineCall()  // End without chatting
handleHangUp()       // End active call
```

#### `components/IncomingCall.tsx` - First Impression
**What it does:**
- Shows the incoming call screen
- Animated otter avatar with ringing effect
- Accept/decline buttons with hover effects

**Visual features:**
- Pulsing rings around Otto
- Floating animations
- Ghibli-inspired colors

#### `components/ChatInterface.tsx` - Main Experience
**What it does:**
- Full chat interface with message history
- Otto's AI responses (simulated for now)
- File upload for resume
- Typing indicators
- Message timestamps

**Key features:**
```typescript
getOttoResponse()     // Generates Otto's replies
handleSend()          // Sends user message
handleFileUpload()    // Processes resume upload
```

---

### 🎨 Styling Files

#### `app/globals.css` - Global Styles
**Contains:**
- Tailwind directives (@tailwind base, components, utilities)
- Custom animations (messageSlide, float, wiggle)
- Scrollbar styling
- Button classes (.btn-whimsy)

#### `tailwind.config.ts` - Design System
**Defines:**
- Ghibli color palette
- Custom animations (float, bounce-slow, wiggle, ring)
- Font families
- Keyframe animations

**Colors available:**
```typescript
ghibli-sky: '#B8D8E8'
ghibli-grass: '#7CB342'
ghibli-warm: '#FFCCBC'
ghibli-sunset: '#FFB74D'
ghibli-ocean: '#4FC3F7'
ghibli-forest: '#558B2F'
```

---

### ⚙️ Configuration Files

#### `package.json` - Project Dependencies
**Key dependencies:**
- next: Framework
- react & react-dom: UI library
- typescript: Type safety
- tailwindcss: Styling
- lucide-react: Icons

**Scripts:**
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

#### `tsconfig.json` - TypeScript Settings
**Key settings:**
- Strict mode enabled
- Path aliases (@/* → ./*)
- JSX: preserve for Next.js

---

## 📝 Documentation Files

### Must-Read for Team

1. **README.md** - Start here!
   - Complete project overview
   - Features list
   - Installation guide
   - Tech stack details
   - Future roadmap

2. **SETUP.md** - For getting started
   - Node.js installation
   - Troubleshooting
   - Quick preview option

3. **PRESENTATION.md** - For the meeting
   - Demo flow script
   - Talking points
   - Questions to ask team
   - Budget estimates

4. **QUICK-REFERENCE.md** - Quick lookup
   - Color codes
   - Otto's personality
   - Tech stack
   - Success metrics

---

## 🔄 Data Flow

```
User Opens App
    ↓
app/page.tsx (manages state)
    ↓
State: 'incoming'
    ↓
Renders: IncomingCall.tsx
    ↓ (user clicks Accept)
    ↓
State: 'active'
    ↓
Renders: ChatInterface.tsx
    ↓
User types message
    ↓
handleSend() in ChatInterface
    ↓
Add to messages array
    ↓
getOttoResponse() generates reply
    ↓
Otto's message added to array
    ↓
UI updates with new messages
    ↓ (user clicks Hang Up)
    ↓
State: 'ended'
    ↓
Show "See you later" screen
```

---

## 🎯 Where to Find What

| Need to... | Look in... |
|-----------|-----------|
| Change call screen design | `components/IncomingCall.tsx` |
| Modify chat interface | `components/ChatInterface.tsx` |
| Add new colors | `tailwind.config.ts` |
| Change Otto's responses | `ChatInterface.tsx` → `getOttoResponse()` |
| Add animations | `tailwind.config.ts` or `globals.css` |
| Update metadata (title, etc.) | `app/layout.tsx` |
| Add new dependencies | `package.json` |
| Install Node.js | Follow `SETUP.md` |

---

## 🚀 Quick Start Commands

```bash
# First time setup
cd otter-jobs
npm install

# Start development
npm run dev

# Open in browser
# → http://localhost:3000

# View static preview (no install needed)
open preview.html
```

---

## 💡 Tips for Developers

### Making Changes

1. **Change Otto's messages:**
   - Edit `getOttoResponse()` in `ChatInterface.tsx`
   - Add more conditions based on user input
   - Make responses more personalized

2. **Add new colors:**
   - Update `tailwind.config.ts`
   - Use new colors: `bg-ghibli-yourcolor`

3. **Modify animations:**
   - Keyframes in `tailwind.config.ts`
   - CSS animations in `globals.css`

4. **Add more pages:**
   - Create new folders in `app/`
   - E.g., `app/profile/page.tsx`

### Best Practices

✅ **DO:**
- Keep components small and focused
- Use TypeScript types for props
- Follow the existing color scheme
- Test on different screen sizes

❌ **DON'T:**
- Modify `node_modules/`
- Commit `.env` files
- Hardcode sensitive data
- Forget to git commit regularly

---

## 🐛 Troubleshooting File Issues

**Problem:** Can't find a component
```bash
# Check if file exists
ls components/

# Make sure you're in the right directory
pwd  # Should show: .../otter-jobs
```

**Problem:** Changes not showing
```bash
# Restart dev server
# Press Ctrl+C, then:
npm run dev
```

**Problem:** Missing files
```bash
# Re-check this FILE-MAP.md
# All files listed here should exist
```

---

## 📦 Adding New Files

### New Component
```
components/YourComponent.tsx

'use client';  // if using hooks
import { useState } from 'react';

export default function YourComponent() {
  return <div>Your content</div>;
}
```

### New Page
```
app/yourpage/page.tsx

export default function YourPage() {
  return <main>Your page</main>;
}
```

### New API Route (future)
```
app/api/your-endpoint/route.ts

export async function GET(request: Request) {
  return Response.json({ data: 'your data' });
}
```

---

## 🔗 Related Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **React:** https://react.dev

---

**Last Updated:** November 2025  
**Maintained By:** OtterMatch Frontend Team

**Questions?** Check README.md or ask in the team channel!
