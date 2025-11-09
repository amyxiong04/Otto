# 🚀 Quick Setup Guide

## Option 1: With Node.js (Recommended)

If you have Node.js installed:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open http://localhost:3000

## Option 2: Without Node.js

### For Mac:

1. Install Homebrew (if not installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Node.js:
```bash
brew install node
```

3. Then follow Option 1 steps above

### Quick Preview (Static HTML)

Open the `preview.html` file in your browser to see a basic version of the design!

## Common Issues

### "npx: command not found"
- You need to install Node.js first (see Option 2)

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Missing dependencies error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## For Your Team Meeting

Show the prototype by:
1. Running `npm run dev`
2. Opening http://localhost:3000 in your browser
3. Click "Accept" on the incoming call
4. Start chatting with Otto!

Tips:
- Try uploading a file (resume)
- Type different moods (tired, excited, creative)
- Hang up and call again to restart

## Next Steps After Meeting

1. Get team feedback on design
2. Decide on AI backend (OpenAI, Claude, etc.)
3. Design custom otter illustrations
4. Plan job database structure
5. Assign roles for backend, design, content
