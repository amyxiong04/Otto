# 🔧 Troubleshooting Guide

## Quick Fixes for Common Issues

---

## Installation Issues

### Problem: "npx: command not found"

**Cause:** Node.js is not installed

**Solution:**
```bash
# On macOS with Homebrew
brew install node

# Verify installation
node --version
npm --version
```

### Problem: "npm install" fails

**Solution 1:** Clear cache and retry
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Solution 2:** Use older Node version
```bash
# Install nvm (Node Version Manager)
brew install nvm

# Install Node 18 (LTS)
nvm install 18
nvm use 18

# Try again
npm install
```

### Problem: Permission errors during install

**Solution:**
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Try again
npm install
```

---

## Running the App

### Problem: "Port 3000 already in use"

**Solution 1:** Kill process on port 3000
```bash
# Find process
lsof -i :3000

# Kill it (use PID from above)
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

**Solution 2:** Use a different port
```bash
npm run dev -- --port 3001
# Then open http://localhost:3001
```

### Problem: "Module not found" errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# If still failing, check tsconfig.json paths
```

### Problem: Changes not showing up

**Solution:**
```bash
# Hard reload browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Or restart dev server
# Press Ctrl+C in terminal
npm run dev
```

### Problem: "Error: ENOSPC" (Linux)

**Cause:** System file watcher limit

**Solution:**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## Display Issues

### Problem: Animations not working

**Check:**
1. Browser supports CSS animations (not IE)
2. Hardware acceleration enabled
3. No motion preference set

**Solution:**
```bash
# Check browser console (F12) for errors
# Try different browser (Chrome, Firefox, Safari)
```

### Problem: Colors look wrong

**Possible causes:**
- Browser extensions (dark mode, color filters)
- Display color profile
- CSS not loading

**Solution:**
```bash
# Disable browser extensions temporarily
# Check if globals.css is loading (F12 → Network tab)
# Clear browser cache
```

### Problem: Layout is broken

**Solution:**
```bash
# Make sure Tailwind is working
# Check browser console for errors
# Verify tailwind.config.ts exists
# Restart dev server

npm run dev
```

### Problem: Text is too small/large

**Solution:**
```bash
# Check browser zoom level (should be 100%)
# Mac: Cmd+0 to reset
# Windows: Ctrl+0 to reset
```

---

## File Upload Issues

### Problem: File upload button not working

**Check:**
1. Browser allows file uploads (not blocked)
2. Console for JavaScript errors (F12)

**Solution:**
```javascript
// Make sure input accepts the right file types
// In ChatInterface.tsx:
accept=".pdf,.doc,.docx"
```

### Problem: Large files crash the browser

**Cause:** No file size validation (prototype limitation)

**Future fix:**
```javascript
const handleFileUpload = (e) => {
  const file = e.target.files?.[0];
  if (file && file.size > 10 * 1024 * 1024) { // 10MB
    alert('File too large. Please upload a file under 10MB.');
    return;
  }
  // ... rest of code
}
```

---

## Chat Issues

### Problem: Messages not appearing

**Check:**
1. Browser console (F12) for errors
2. React DevTools to inspect state

**Debug:**
```javascript
// Add console.log in ChatInterface.tsx:
const handleSend = () => {
  console.log('Sending:', inputValue);
  // ... rest of code
}
```

### Problem: Otto's responses are weird

**Cause:** This is expected! It's simulated AI.

**To customize:**
Edit `getOttoResponse()` in `components/ChatInterface.tsx`:
```javascript
const getOttoResponse = (userMessage: string): string => {
  // Add your custom logic here
  if (userMessage.toLowerCase().includes('your keyword')) {
    return "Your custom response!";
  }
  // ... rest
}
```

### Problem: Typing indicator stuck

**Check:** Console for JavaScript errors

**Quick fix:**
```bash
# Refresh the page
# Or restart the dev server
```

---

## Performance Issues

### Problem: App is slow/laggy

**Solutions:**

1. **Clear browser cache**
```bash
# Chrome: Settings → Privacy → Clear browsing data
# Safari: Develop → Empty Caches
```

2. **Close other tabs/apps**
```bash
# Free up system resources
```

3. **Disable React DevTools**
```bash
# Can slow down development
# Disable temporarily if not needed
```

4. **Check CPU usage**
```bash
# Mac: Activity Monitor
# Windows: Task Manager
# Look for high CPU processes
```

### Problem: Animations are choppy

**Solutions:**

1. **Enable hardware acceleration**
```
Chrome: Settings → System → Use hardware acceleration
```

2. **Reduce animation complexity**
```css
/* In globals.css, simplify animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); } /* Less movement */
}
```

---

## TypeScript/Linting Errors

### Problem: Red squiggly lines everywhere

**Cause:** TypeScript strict mode, missing types

**Solution:**
```bash
# These are warnings, not blockers
# App should still run with: npm run dev

# To fix properly, install missing types:
npm install --save-dev @types/react @types/react-dom
```

### Problem: "Cannot find module 'react'"

**Solution:**
```bash
# Make sure dependencies are installed
npm install

# If still failing:
rm -rf node_modules package-lock.json
npm install
```

### Problem: ESLint errors

**Solution:**
```bash
# Disable ESLint temporarily (not recommended for production)
# Or fix issues:
npm run lint

# Auto-fix some issues:
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

---

## Preview.html Issues

### Problem: Preview.html buttons don't do anything

**Cause:** This is expected! It's a static preview.

**Solution:**
- For full interactivity, run `npm run dev`
- Preview.html is just for showing the design

### Problem: Preview.html looks different from real app

**Cause:** Static HTML can't replicate all animations

**Solution:**
- This is normal
- Real app has more features and animations

---

## macOS Specific Issues

### Problem: "xcode-select: error"

**Solution:**
```bash
xcode-select --install
```

### Problem: Homebrew commands don't work

**Solution:**
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add to PATH (for M1/M2 Macs)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

---

## Windows Specific Issues

### Problem: npm commands don't work

**Solution:**
1. Install Node.js from nodejs.org
2. Restart terminal/command prompt
3. Try again

### Problem: Path issues

**Solution:**
```bash
# Use forward slashes in paths
cd /c/Users/YourName/Desktop/chm/otter-jobs
```

---

## Git Issues

### Problem: Can't commit changes

**Solution:**
```bash
# Set up Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Try committing again
git add .
git commit -m "Your message"
```

---

## Network/Firewall Issues

### Problem: Can't access localhost:3000

**Check:**
1. Firewall blocking port 3000
2. VPN interfering
3. Antivirus software

**Solution:**
```bash
# Temporarily disable firewall
# Or use different port:
npm run dev -- -p 8080

# Then access http://localhost:8080
```

---

## Still Stuck?

### Debug Checklist

- [ ] Node.js installed? (`node --version`)
- [ ] Dependencies installed? (`ls node_modules`)
- [ ] Dev server running? (`npm run dev`)
- [ ] Browser console clear? (F12 → Console)
- [ ] Correct URL? (`http://localhost:3000`)
- [ ] Browser up to date?
- [ ] Port 3000 available?

### Getting Help

1. **Check the docs:**
   - README.md
   - SETUP.md
   - This file (TROUBLESHOOTING.md)

2. **Search the error:**
   - Copy exact error message
   - Google it
   - Check Stack Overflow

3. **Ask your team:**
   - Share error message
   - Share what you tried
   - Share your environment (OS, Node version)

4. **Create an issue:**
   - Document the problem
   - Steps to reproduce
   - Expected vs actual behavior

---

## Clean Install (Last Resort)

If nothing works, start fresh:

```bash
# 1. Navigate out of the directory
cd /Users/stevenxiong/Desktop/chm

# 2. Remove the folder
rm -rf otter-jobs

# 3. Re-create from backup
# (if you have a backup or git repo)

# 4. Or start over with the files
# (they're all in the project already)
```

---

## Useful Commands Reference

```bash
# Check Node version
node --version

# Check npm version  
npm --version

# List installed packages
npm list

# Clear npm cache
npm cache clean --force

# Install specific package
npm install package-name

# Uninstall package
npm uninstall package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Fix package vulnerabilities
npm audit fix

# Run build (production)
npm run build

# Analyze bundle size
npm run build -- --analyze
```

---

## Browser DevTools Tips

### Open DevTools
- **Mac:** Cmd + Option + I
- **Windows:** F12 or Ctrl + Shift + I

### Useful Tabs
- **Console:** JavaScript errors and logs
- **Network:** Loading issues
- **Elements:** Inspect HTML/CSS
- **Application:** Local storage, cookies

### Common Console Commands
```javascript
// Check if React is loaded
React

// Inspect component
$0

// Clear console
clear()
```

---

## Emergency Contacts

**Frontend Team Lead:** Steven Xiong  
**Slack Channel:** #ottermatch  
**Documentation:** See README.md

---

## Prevention Tips

✅ **Do:**
- Commit changes regularly
- Test before presenting
- Keep Node.js updated
- Read error messages carefully

❌ **Don't:**
- Edit node_modules directly
- Ignore TypeScript errors
- Skip installing dependencies
- Commit node_modules to git

---

**Last Updated:** November 2025  
**Version:** Prototype 1.0

**Most issues can be solved by:**
1. Reading the error message
2. Restarting the dev server
3. Clearing cache
4. Reinstalling dependencies

Good luck! 🦦✨
