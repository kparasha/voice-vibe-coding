# Backlog

This backlog tracks features, improvements, and tasks for the Voice Vibe Coding extension.

**Note:** This extension is designed for day-to-day users, especially those facing the Carpal Tunnel problem or other repetitive strain injuries, to help them code without typing.

**Long-Term Vision:** Empower users to create applications on the fly using AI hardware such as AI glasses, AI voice recorders, AI pendants, and other emerging devices, making coding accessible anywhere, anytime.

**Tech Stack:**
- TypeScript (preferred) / JavaScript
- VSCode Extension API (OpenVSX/VSCodium compatible)
- npm for package management
- Mocha/Chai for testing
- Node.js-based speech-to-text
- AI/LLM integration for seamless prompt-based coding

**Key Differentiator:** Unlike existing solutions (Talon, etc.) that require manual intervention between speech-to-text and AI prompting, this extension provides a **seamless, autonomous agentic flow** where voice commands directly trigger AI-powered code generation without requiring manual Enter presses, mouse clicks, or keyboard interactions.

## Features

### Core Voice-to-AI Flow
- [ ] Seamless voice-to-AI pipeline (no manual Enter/clicks between ASR and AI)
- [ ] Autonomous agentic mode for hands-free coding
- [ ] Voice command to create, edit, and delete code
- [ ] AI-powered code generation from natural language
- [ ] Multi-language support (JS, Python, etc.)
- [ ] File and folder navigation via voice
- [ ] Code suggestions and completions
- [ ] Context-aware responses
- [ ] Code documentation and summaries via voice

### User Control & Safety
- [ ] Accept/reject AI suggestions via voice
- [ ] Debug points and breakpoints in agentic flow
- [ ] Destructive action confirmation
- [ ] Undo/redo for all actions
- [ ] Visual feedback for changes
- [ ] Hotword activation ("Hey CodeVoice")

### Future: Advanced Rollback System (Post-MVP)
- [ ] Screenshot-based action history
- [ ] Commit-like checkpoints for all AI actions
- [ ] Advanced rollback mechanisms (similar to Replit Agent)
- [ ] Memory system for debugging complex flows

## Improvements
- [ ] Improve speech-to-text accuracy
- [ ] Add support for more frameworks
- [ ] Enhance collaborative coding features
- [ ] Customizable voice command phrases

## Critical Implementation Tasks (Based on Analysis)

### Phase 1: Foundation & Core Pipeline
- [ ] Fix VSCode extension configuration (package.json missing activationEvents, contributes)
- [ ] Add webpack bundling configuration for proper extension packaging
- [ ] Implement Fn key activation mechanism with immediate execution on release
- [ ] Build seamless voice-to-AI pipeline (no manual Enter/clicks)
- [ ] Integrate speech-to-text engine with real-time transcription
- [ ] Create AI integration layer for autonomous code generation
- [ ] Implement voice-based user controls (accept/reject/debug/undo)

### Phase 2: Advanced Features
- [ ] Add debug points and breakpoints in agentic flow
- [ ] Implement context manager for session state and project awareness
- [ ] Build visual feedback system with real-time notifications
- [ ] Add error handling and recovery mechanisms
- [ ] Create comprehensive settings and customization options

### Phase 3: Flow State Optimization
- [ ] Implement predictive context awareness
- [ ] Add ambient code intelligence with background analysis
- [ ] Build interruption recovery and session memory
- [ ] Create cognitive load reduction features
- [ ] Add emotional flow support and frustration detection

### Infrastructure & Quality
- [ ] Set up proper build system with ESLint and Prettier
- [ ] Write comprehensive test suite for voice-to-AI pipeline
- [ ] Create security framework for API keys and user consent
- [ ] Develop onboarding wizard and help documentation
- [ ] Build demo scenarios and user training materials
