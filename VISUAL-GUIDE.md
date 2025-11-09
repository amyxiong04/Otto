# 🖼️ Visual Guide - What Your Prototype Looks Like

## Screen 1: Incoming Call 📞

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              ✨     ☁️            ☁️      ✨        │
│                                                     │
│                  ┌──────────────┐                  │
│                  │   ○ ○ ○ ○    │  ← Pulsing rings │
│                  │  ○         ○  │                  │
│                  │ ○           ○ │                  │
│                  │○             ○│                  │
│                  ││    🦦      │ │  ← Otto!        │
│                  │○             ○│                  │
│                  │ ○           ○ │                  │
│                  │  ○         ○  │                  │
│                  │   ○ ○ ○ ○    │                  │
│                  └──────────────┘                  │
│                                                     │
│            Incoming Call...                        │
│         Otto the Otter 🌊                          │
│      Your friendly career advisor                  │
│                                                     │
│   ┌──────────────────────────────────────────┐   │
│   │ "Hey there! 👋 I'm Otto, and I'd love    │   │
│   │ to chat with you about finding your      │   │
│   │ dream job. No boring interviews—just     │   │
│   │ a friendly conversation about what       │   │
│   │ makes you happy at work!"                │   │
│   └──────────────────────────────────────────┘   │
│                                                     │
│          ⭕ Maybe Later    ✅ Let's Chat!          │
│           (Red button)    (Green, bouncing)        │
│                                                     │
│    💡 Fun fact: Otters hold hands while sleeping   │
│       so they don't drift apart!                   │
└─────────────────────────────────────────────────────┘
```

**Colors:**
- Background: Sky blue to warm peach gradient
- Floating clouds: White with transparency
- Otto's circle: Warm peach to sunset orange
- Decline button: Red gradient
- Accept button: Grass green gradient (with bounce animation)

---

## Screen 2: Chat Interface 💬

```
┌─────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────┐│
│ │  🦦  Otto the Otter          📞 Hang Up         ││ ← Header
│ │      Online                                      ││   (Green gradient)
│ └─────────────────────────────────────────────────┘│
│                                                     │
│  ┌────────────────────────────────────────┐       │
│  │ Hey! So great to connect with you! 🎉  │       │ ← Otto's message
│  │ How's your day going?                   │       │   (White bubble)
│  │                              3:14 PM     │       │
│  └────────────────────────────────────────┘       │
│                                                     │
│         ┌──────────────────────────────────┐       │
│         │ Pretty good, thanks! Just         │       │ ← Your message
│         │ checking this out 😊              │       │   (Blue bubble)
│         │                      3:15 PM      │       │
│         └──────────────────────────────────┘       │
│                                                     │
│  ┌────────────────────────────────────────┐       │
│  │ That's awesome! 😊 So, I'm really      │       │
│  │ curious - what kind of work gets you    │       │
│  │ excited?                                 │       │
│  │                              3:15 PM     │       │
│  └────────────────────────────────────────┘       │
│                                                     │
│  ┌──────────────┐                                  │
│  │ ● ● ●        │  ← Otto is typing...             │
│  └──────────────┘                                  │
│                                                     │
│                                    [scroll area]    │
│                                                     │
├─────────────────────────────────────────────────────┤
│  📎  ┌─────────────────────────────────┐  ➤        │ ← Input area
│       │ Type your message...            │           │
│       └─────────────────────────────────┘           │
│  💡 Feel free to upload your resume anytime!        │
└─────────────────────────────────────────────────────┘
```

**Colors:**
- Header: Grass green to forest green gradient
- Otto's bubbles: White with warm peach border
- Your bubbles: Ocean blue gradient
- Input area: White with gray border
- Paperclip button: Sand/sunset orange
- Send button: Green gradient

---

## Screen 3: End Call ✌️

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                   ☁️         ✨                    │
│                                                     │
│         ┌────────────────────────────┐             │
│         │                            │             │
│         │          🦦                │  ← Wiggling │
│         │    (animated wiggle)       │     Otto   │
│         │                            │             │
│         │    See you later!          │             │
│         │                            │             │
│         │  Your otter friend will    │             │
│         │  be here whenever you're   │             │
│         │  ready to chat about your  │             │
│         │  dream job!                │             │
│         │                            │             │
│         │    ┌──────────────┐        │             │
│         │    │  Call Again   │        │             │
│         │    └──────────────┘        │             │
│         │   (Green button)           │             │
│         │                            │             │
│         └────────────────────────────┘             │
│                                                     │
│              ☁️            ☁️       ✨            │
└─────────────────────────────────────────────────────┘
```

**Colors:**
- Background: Sky blue to warm peach gradient
- Card: White with transparency and backdrop blur
- Button: Grass green gradient

---

## Animation Effects 🎬

### 1. Float Animation
```
   ☁️          ☁️          ☁️
   ↓           ↑           ↓
   ↑           ↓           ↑
 (3s loop)  (3s loop)  (3s loop)
```
Used for: Clouds, Otto's avatar

### 2. Wiggle Animation
```
🦦  →  🦦  →  🦦  →  🦦
    ↻      ↺      ↻
 (rotate -3° → 3° → -3°)
```
Used for: End screen Otto

### 3. Ring Animation (Incoming Call)
```
     ╱╲
    ╱  ╲      
   │ 🦦 │   ← Stays still
    ╲  ╱      
     ╲╱
    ○ ○ ○    ← Rotates
   ○     ○
  ○       ○
```
Used for: Incoming call avatar

### 4. Bounce Animation
```
  ✅
   ↑
   ↓
   ↑  (slower bounce)
   ↓
```
Used for: Accept button

### 5. Typing Dots
```
●  ●  ●
↕  ↕  ↕
(bounce with delay: 0s, 0.1s, 0.2s)
```
Used for: Otto typing indicator

### 6. Message Slide-In
```
Message →  Message  →  Message
(fade+slide) (normal)
```
Used for: New messages appearing

---

## Color Palette Reference 🎨

```
┌────────┬─────────┬──────────────────┐
│ Name   │ Hex     │ Usage            │
├────────┼─────────┼──────────────────┤
│ Sky    │ #B8D8E8 │ Backgrounds      │
│ Grass  │ #7CB342 │ Buttons, accents │
│ Sand   │ #F4E4C1 │ Highlights       │
│ Sunset │ #FFB74D │ CTAs, warmth     │
│ Ocean  │ #4FC3F7 │ User messages    │
│ Forest │ #558B2F │ Headers          │
│ Cloud  │ #ECEFF1 │ Backgrounds      │
│ Warm   │ #FFCCBC │ Avatars, borders │
└────────┴─────────┴──────────────────┘
```

---

## Interactive Elements 🖱️

### Buttons States

**Normal:**
```
┌──────────────┐
│  Click Me!   │
└──────────────┘
```

**Hover:**
```
┌──────────────┐
│  Click Me!   │  ← Slightly bigger (scale: 1.05)
└──────────────┘     Shadow grows
```

**Click:**
```
┌────────────┐
│ Click Me!  │  ← Smaller (scale: 0.95)
└────────────┘
```

### Message Input

**Empty:**
```
┌────────────────────────────────┐
│ Type your message...           │  ← Gray placeholder
└────────────────────────────────┘
    Gray border
```

**Focused:**
```
┌────────────────────────────────┐
│ User typing here_              │
└────────────────────────────────┘
    Green border
```

**With Text:**
```
┌────────────────────────────────┐
│ This is my message!            │  ← Black text
└────────────────────────────────┘
    Green border
```

---

## Responsive Behavior 📱

### Desktop (>768px)
- Maximum width: 1024px centered
- Full chat interface visible
- Large avatar (120px)
- Comfortable spacing

### Tablet (768px - 1024px)
- Slightly narrower
- Comfortable touch targets
- Readable text sizes

### Mobile (< 768px) *Future*
- Full width
- Larger touch targets
- Simplified animations
- Stacked buttons

---

## Typography Hierarchy 📝

```
┌──────────────────────────────────┐
│                                  │
│  H1: Otto the Otter              │  ← 2.5rem, bold
│                                  │
│  H2: Incoming Call...            │  ← 1.875rem, bold
│                                  │
│  Body: Message text here         │  ← 1rem, regular
│                                  │
│  Small: 3:14 PM                  │  ← 0.75rem, light
│                                  │
└──────────────────────────────────┘
```

---

## File Upload Flow 📎

```
1. User clicks paperclip 📎
        ↓
2. File picker opens
        ↓
3. User selects resume.pdf
        ↓
4. Message appears:
   ┌────────────────────────┐
   │ 📄 Uploaded: resume.pdf │
   └────────────────────────┘
        ↓
5. Otto responds:
   ┌──────────────────────────┐
   │ Perfect! I've got your   │
   │ resume. Let me take a    │
   │ quick look... 📝          │
   └──────────────────────────┘
```

---

## Conversation Flow Example 🗣️

```
Otto: Hey! How's your day going?
       ↓
User: Good / Tired / Stressed
       ↓
Otto: [Responds based on mood]
      Good → "That's awesome! What gets you excited?"
      Tired → "Oof, I hear you. What would help?"
       ↓
User: Describes preferences
       ↓
Otto: Asks follow-up questions
       ↓
[5-10 message exchange]
       ↓
Otto: "Have you uploaded your resume?"
       ↓
User: [Uploads or continues chatting]
       ↓
Otto: "I think I have some ideas brewing..."
       ↓
[Future: Show job matches]
```

---

## Screen Size Reference 📏

### Recommended Viewing
- **Minimum:** 1024x768 (tablet)
- **Optimal:** 1920x1080 (desktop)
- **Maximum:** Any (scales up nicely)

### Component Dimensions

**Incoming Call Card:**
- Width: 448px (max-w-md)
- Height: Auto
- Padding: 48px (on desktop)

**Chat Interface:**
- Width: 896px (max-w-4xl)
- Height: 100vh (full screen)
- Message bubbles: Max 320-512px width

**Otto Avatar:**
- Incoming call: 128x128px
- Chat header: 48x48px

---

## Browser Compatibility ✅

Works great on:
- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+

Animations require:
- CSS Grid
- Flexbox
- CSS Animations
- Backdrop Filter (for blur effects)

---

## Performance Notes ⚡

- Smooth 60fps animations
- Lazy loading ready (for images)
- Optimized re-renders (React)
- Fast page loads (Next.js)

---

## Accessibility Features ♿

- Keyboard navigation ready
- ARIA labels on buttons
- Semantic HTML
- High contrast colors
- Readable font sizes

---

**This visual guide shows exactly what your prototype looks like!**

To see it in action, run:
```bash
npm install && npm run dev
```

Or open `preview.html` for a quick look!

🦦✨
