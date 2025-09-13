# Sprint Plan: Sprint 1

**Duration:** 2 weeks

**Note:** This sprint focuses on building a foundation for users, especially those facing the Carpal Tunnel problem or other repetitive strain injuries, to help them code without typing.

**Long-Term Vision:** Lay the groundwork for enabling users to create applications on the fly using AI hardware such as AI glasses, AI voice recorders, AI pendants, and other emerging devices, making coding accessible anywhere, anytime.

**Tech Stack:**
- TypeScript (preferred) / JavaScript
- VSCode Extension API (OpenVSX/VSCodium compatible)
- npm for package management
- Mocha/Chai for testing
- **On-Device ASR:** Web Speech API (MVP), macOS Speech Framework (fallback)
- AI/LLM integration for seamless autonomous coding

**ASR Decision for MVP:**
- **Primary:** Web Speech API for privacy, zero latency, offline capability
- **Benefits:** No API costs, immediate response, works without internet
- **Premium Future:** Cloud ASR with enhanced coding vocabulary and accuracy

**Sprint Focus:** Build seamless voice-to-AI pipeline eliminating manual intervention between speech recognition and AI code generation, unlike existing solutions (Talon, etc.).

## Step-by-Step Implementation Plan

### 1. Extension Command Registration
- Register a command (e.g., "Start Voice Coding") in the extension.
- Show a notification when the command is triggered.

### 2. Speech-to-Text Integration
- Integrate a Node.js speech-to-text package (e.g., @google-cloud/speech).
- Add a module to capture audio from the user and transcribe it.
- Display the transcribed text in a notification or output channel.

### 3. Command Parsing
- Implement a parser to map transcribed text to editor actions (e.g., insert text, create file).
- Start with simple commands ("insert text", "create file").

### 4. Action Execution
- Execute basic editor actions based on parsed commands.
- Provide visual feedback (notification, status bar, or highlights).

### 5. Undo/Redo Support
- Integrate with VSCode's undo/redo stack for actions performed via voice.

### 6. Testing and Feedback
- Write unit and integration tests for each module (Mocha/Chai).
- Collect feedback and iterate on UX.

## Goals
- Establish project foundation with seamless voice-to-AI architecture
- Implement autonomous agentic coding flow without manual intervention
- Build voice-based user controls (accept/reject/debug)
- Deliver a working MVP demonstrating seamless hands-free coding
- Ensure zero keyboard/mouse dependency in core flow

## Tasks

### Phase 1A: Critical Foundation Fixes (Week 1)
- [ ] Fix VSCode extension configuration (add activationEvents, contributes, publisher)
- [ ] Set up webpack bundling configuration for proper packaging
- [ ] Add @types/vscode and missing devDependencies
- [ ] Implement Fn key activation mechanism with immediate execution on release
- [ ] Integrate Web Speech API for on-device speech recognition with real-time transcription
- [ ] Build basic AI integration layer for direct voice-to-AI pipeline
- [ ] Create seamless flow eliminating all manual Enter/click requirements

### Phase 1B: Autonomous Coding & User Control (Week 2)
- [ ] Implement voice-based command parsing with AI routing
- [ ] Enable autonomous AI code generation and execution
- [ ] Add voice-based accept/reject/debug/undo controls
- [ ] Implement debug points and breakpoints in agentic flow
- [ ] Build context manager for session state and project awareness
- [ ] Provide real-time visual feedback with checkpoint notifications
- [ ] Add comprehensive error handling and recovery mechanisms
- [ ] Create security framework for API keys and user consent

### Phase 2: Flow State Optimization (Weeks 3-4)
- [ ] Implement predictive context awareness
- [ ] Add ambient code intelligence with background analysis
- [ ] Build interruption recovery and session memory
- [ ] Create cognitive load reduction features
- [ ] Add emotional flow support and frustration detection
- [ ] Develop comprehensive settings and customization options
- [ ] Write extensive test suite for voice-to-AI pipeline
- [ ] Create onboarding wizard and user training materials

### Future Phases (Post-MVP)
- [ ] Screenshot-based action tracking system
- [ ] Commit-like checkpoints for complex rollbacks
- [ ] Advanced memory system for debugging multi-step operations
- [ ] AI hardware integration (glasses, pendants)
- [ ] Multi-user collaborative voice coding

## Deliverables
- MVP extension with basic voice-to-code
- Documentation for setup and usage
- Demo video or walkthrough
