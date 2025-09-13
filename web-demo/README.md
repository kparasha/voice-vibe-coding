# Voice Vibe Coding - Web Demo

## Minimum Viable Feature (MVF)

A simplified web-based voice coding interface that actually works.

### Features

✅ **Voice Recognition** - Uses Web Speech API (works in Chrome/Edge)  
✅ **Code Generation** - 4 basic templates (function, variable, class, comment)  
✅ **Visual Feedback** - Real-time transcription and status updates  
✅ **Copy/Export** - One-click code copying  
✅ **Keyboard Shortcuts** - Ctrl+Space to toggle, Escape to stop  

### Usage

1. Open `index.html` in Chrome or Edge browser
2. Click the microphone button or press `Ctrl+Space`
3. Say one of these commands:
   - "create function"
   - "create variable" 
   - "create class"
   - "add comment"
4. Generated code appears in the output area
5. Click "Copy Code" to copy to clipboard

### Voice Commands

| Command | What it generates |
|---------|-------------------|
| "create function" | Function template with TODO |
| "create variable" | Variable declarations (const, let) |
| "create class" | Class with constructor and methods |
| "add comment" | Single and multi-line comments |
| "clear" | Clears the output |

### Browser Support

- ✅ Chrome (recommended)
- ✅ Edge
- ❌ Firefox (limited speech recognition)
- ❌ Safari (no speech recognition)

### Next Steps

This web demo proves the core concept works. Future iterations could add:
- AI integration for smarter code generation
- More programming languages
- Export to files
- Integration with online code editors
