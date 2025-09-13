# Voice Vibe Coding Extension

Empower your coding workflow with hands-free, voice-driven development! The **Voice Vibe Coding** extension for VSCode-based editors (such as Cursor, Windsurf, and others) is designed especially for day-to-day users—including those facing the Carpal Tunnel problem or other repetitive strain injuries—enabling you to create, edit, and manage code using only your voice, without typing.

---

## Grand Long-Term Vision

Our vision is to empower day-to-day users to create applications on the fly, not just on traditional computers, but also on emerging AI hardware platforms—such as AI glasses, AI voice recorders, AI pendants, and more. By making coding accessible through voice, we aim to enable anyone to build software anywhere, anytime, using the devices of the future.

---

## **Tech Stack**
- **Language:** TypeScript (preferred) / JavaScript
- **Extension API:** VSCode Extension API (compatible with OpenVSX and VSCodium)
- **Package Management:** npm
- **Build Tools:** webpack, vsce, tsc
- **Testing:** Mocha, Chai, VSCode Test Runner
- **Speech Recognition:** Web Speech API (on-device, privacy-first) with cloud ASR for premium features
- **AI Integration:** Seamless LLM integration for autonomous code generation
- **Linting/Formatting:** ESLint, Prettier

**Key Innovation:** Unlike existing voice coding solutions (Talon, etc.) that require manual intervention between speech recognition and AI prompting, Voice Vibe Coding provides a **seamless, autonomous agentic flow** where voice commands directly trigger AI-powered code generation without requiring manual Enter presses, mouse clicks, or keyboard interactions.

---

## Features

### Seamless Voice-to-AI Pipeline
- **Autonomous agentic coding:** AI performs multi-step coding operations based on single voice commands
- **Zero manual intervention:** No Enter presses or mouse clicks required between speech and AI execution
- **Real-time AI code generation:** Watch AI create, edit, and refactor code autonomously
- **Voice-based flow control:** Accept, reject, debug, or undo operations using voice commands

### Core Functionality
- **Voice-activated coding:** Generate, edit, and refactor code in real time using natural language voice commands
- **Accessibility-first:** Built to elevate users who experience discomfort or pain from typing, such as those with Carpal Tunnel Syndrome
- **Multi-language support:** Works with a wide range of programming languages and frameworks
- **File and project management:** Create, navigate, and organize files and folders with your voice
- **Context awareness:** Maintains awareness of your current file, project, and intent
- **Code suggestions and completions:** Get AI-powered code completions, documentation, and suggestions on demand

### User Control & Safety
- **Debug points:** Insert breakpoints in agentic flow by saying "pause" or "debug here"
- **Undo/redo support:** All AI-generated actions are reversible for safety and flexibility
- **Destructive action confirmation:** Always confirms before deleting or overwriting code, unless you say "confirm" or "do it now"
- **Visual feedback:** See real-time previews and confirmations of AI changes in your editor

### Future: Advanced Control (Post-MVP)
- **Screenshot-based rollback:** Visual history of all operations for complex debugging
- **Commit-like checkpoints:** Advanced rollback system similar to Replit Agent
- **Memory system:** Track and debug complex multi-step operations

---

## Example Voice Commands

### Seamless Autonomous Operations
- "Create a new file called `app.js` and add a basic Express server." *(AI executes automatically)*
- "Build a React component with state management and styling." *(Multi-step autonomous execution)*
- "Refactor this entire file to use TypeScript with proper interfaces." *(Complex autonomous operation)*

### Voice-Controlled Flow
- "Write a Python function that reverses a string." → AI generates → "Accept" or "Reject"
- "Replace the contents of `index.html` with a Bootstrap template." → "Debug here" *(pauses for review)*
- "Add comments to all functions in this file." → "Continue" *(after checkpoint)*

### Traditional Commands (Enhanced with AI)
- "Delete the last three lines." → "Confirm"
- "Undo the last change."
- "Show me a summary of this file."
- "Switch to `main.py` and add a class called `User`."

---

## How to Use

1. **Install** the extension from OpenVSX in your VSCode-based editor (such as VSCodium, Cursor, Windsurf, etc.).
2. **Activate** voice mode using the command palette or a hotword (e.g., "Hey CodeVoice").
3. **Speak** your coding instructions naturally - AI executes automatically without manual intervention.
4. **Control the flow** using voice: "Accept", "Reject", "Debug", "Undo", "Continue".
5. **Experience seamless coding** - no keyboard or mouse required throughout the entire process.

---

## Development Setup

1. **Install Node.js (v18+) and npm**
2. **Clone this repository**
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Build the extension:**
   ```sh
   npm run build
   ```
5. **Run tests:**
   ```sh
   npm test
   ```
6. **Package for OpenVSX:**
   ```sh
   npx vsce package
   ```

### Critical Setup Notes
- Ensure VSCode extension manifest is properly configured
- Webpack bundling required for production builds
- Microphone permissions needed for voice input
- AI service API keys must be configured securely
- Fn key system integration may require platform-specific setup

---

## Technical Details

- **Extension Configuration:** Properly configured VSCode extension with activationEvents and contributes
- **Build System:** Webpack bundling for optimal performance and packaging
- **Activation Method:** Fn key (globe symbol) with immediate execution on release
- **Seamless Pipeline:** Direct voice-to-AI processing without manual intervention
- **AI Integration:** Autonomous code generation with voice-based user controls
- **OpenVSX API:** File and editor manipulation with real-time feedback
- **Speech Processing:** On-device Web Speech API (MVP) with premium cloud options for enhanced accuracy
- **Flow State Design:** Maintains developer focus through predictive context and ambient intelligence
- **Security:** Encrypted API key management with user consent mechanisms

---

## Contributing

Contributions are welcome! Please open issues or pull requests to help improve the extension.

---

## License

MIT License
