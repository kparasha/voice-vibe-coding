# Technical Design Document (TDD)

## Overview
Voice Vibe Coding is a VSCode-based extension for hands-free coding via voice, designed for accessibility and future AI hardware platforms (AI glasses, voice recorders, pendants, etc.).

**Tech Stack:**
- TypeScript (preferred) / JavaScript
- VSCode Extension API (OpenVSX/VSCodium compatible)
- npm for package management
- Mocha/Chai for testing
- **On-Device ASR:** Web Speech API (primary), macOS Speech Framework (fallback)
- AI/LLM integration for seamless autonomous coding

**ASR Architecture Decision (MVP):**
- **Primary:** Web Speech API for on-device speech recognition
- **Benefits:** Privacy, zero latency, offline capability, no API costs
- **Premium Future:** Cloud ASR with enhanced accuracy and coding vocabulary

**Technical Innovation:** Seamless voice-to-AI pipeline eliminating manual intervention points between speech recognition and AI code generation, providing autonomous agentic flow with voice-based user controls.

---

## Architecture
- **Client Extension (VSCode-based):** Handles UI, voice input, and editor integration
- **Voice Processing Module:** Captures and transcribes audio (Node.js STT)
- **AI Integration Layer:** Direct voice-to-AI pipeline without manual intervention
- **Command Parser & AI Orchestrator:** Maps transcribed text to AI operations and manages autonomous flow
- **Action Executor:** Interfaces with OpenVSX API to execute AI-generated code changes
- **Feedback System:** Provides real-time visual/auditory feedback with voice-based controls
- **Context Manager:** Maintains state, user preferences, vibe settings, and agentic flow control
- **Future: Advanced Rollback System:** Screenshot-based tracking and commit-like checkpoints (Post-MVP)

---

## Key Modules & Interfaces
- **VoiceInput:** API for capturing and streaming audio with continuous listening
- **SpeechToText:** Interface for on-device ASR (Web Speech API primary, macOS Speech Framework fallback)
- **CloudASR (Premium Future):** Interface for cloud STT engines (e.g., @google-cloud/speech, microsoft-cognitiveservices-speech-sdk)
- **AIIntegration:** Seamless connection to AI/LLM services for autonomous code generation
- **CommandParser:** NLP module for intent extraction and AI routing
- **AgenticOrchestrator:** Manages multi-step autonomous operations and user control points
- **ActionExecutor:** Abstraction for AI-generated file/code operations with debug points
- **VoiceController:** Handles voice-based accept/reject/debug/undo commands
- **Feedback:** Real-time UI/UX for feedback (popups, highlights, sounds, checkpoint notifications)
- **Settings:** User preferences, accessibility, hardware integration, and agentic flow configuration
- **Future: RollbackManager:** Advanced tracking and checkpoint system (Post-MVP)

---

## Technology Choices
- **Language:** TypeScript/JavaScript
- **Editor API:** OpenVSX/VSCode Extension API
- **STT:** Node.js packages (e.g., @google-cloud/speech, microsoft-cognitiveservices-speech-sdk)
- **UI:** VSCode Webview, notifications, highlights

---

## Critical Implementation Requirements

### Extension Configuration Fixes
- **Package.json Updates:** Add activationEvents, contributes, publisher fields
- **Build System:** Webpack configuration for VSCode extension bundling
- **Dependencies:** Add @types/vscode, ESLint, Prettier configurations
- **Activation Method:** Fn key (globe symbol) integration with immediate execution

### Core Technical Modules
- **FnKeyActivator:** System-level Fn key detection and immediate processing trigger
- **SeamlessPipeline:** Voice → AI flow without manual intervention points
- **AgenticOrchestrator:** Multi-step autonomous operation management
- **FlowStateManager:** Context preservation and interruption recovery
- **CognitiveLoadReducer:** Mental model mapping and decision automation

## Extensibility
- Modular design for adding new STT engines or hardware integrations
- Future support for AI hardware (glasses, pendants, etc.)
- Plugin architecture for flow state optimization modules
- Extensible voice command parsing with custom AI model integration

---

## Security & Privacy
- Local processing preferred; cloud STT with user consent
- Secure API key management with encrypted storage
- No persistent storage of voice/code data without explicit permission
- Local speech processing fallback to minimize cloud dependencies
