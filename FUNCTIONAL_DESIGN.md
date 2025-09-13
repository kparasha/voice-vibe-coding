# Functional Design Document

## Overview
Voice Vibe Coding is a VSCode-based extension that enables users to create, edit, and manage code using voice commands. It is designed for day-to-day users, especially those with Carpal Tunnel or other repetitive strain injuries, and aims to empower users to create apps on the fly using AI hardware (AI glasses, voice recorders, pendants, etc.).

**Tech Stack:**
- TypeScript (preferred) / JavaScript
- VSCode Extension API (OpenVSX/VSCodium compatible)
- npm for package management
- Mocha/Chai for testing
- Node.js-based speech-to-text
- AI/LLM integration for seamless autonomous coding

**Core Innovation:** Seamless voice-to-AI pipeline eliminating manual intervention points between speech recognition and AI code generation, unlike existing solutions (Talon, etc.) that require manual Enter presses or mouse interactions.

---

## Main Features

### Seamless Voice-to-AI Pipeline
- Voice command recognition and transcription
- Direct AI integration without manual intervention
- Autonomous agentic code generation and execution
- Real-time multi-step coding operations

### Core Functionality
- Code generation, editing, and navigation via voice
- File and project management
- Code suggestions, completions, and documentation
- Context-aware AI responses

### User Control & Safety
- Voice-based accept/reject for AI suggestions
- Debug points and breakpoints in agentic flow
- Undo/redo and change history
- Visual and auditory feedback
- Hotword activation

### Future: Advanced Control (Post-MVP)
- Screenshot-based action history
- Commit-like checkpoints for complex rollbacks
- Memory system for debugging multi-step operations

---

## User Flows

### 1. Seamless Voice-to-AI Coding Flow
- User activates voice mode (command palette or hotword)
- User issues a command (e.g., "Create a new file called app.js and add a basic Express server.")
- System transcribes speech and directly triggers AI without manual intervention
- AI generates and executes code autonomously
- System provides real-time visual feedback
- User can voice "accept", "reject", "undo", or "debug" to control the flow
- No manual Enter presses or mouse clicks required throughout the process

### 2. Autonomous Agentic Flow
- User issues complex multi-step command (e.g., "Build a React component with state management")
- AI autonomously performs multiple operations: file creation, code generation, imports, styling
- System provides checkpoint notifications at each major step
- User can insert debug points by saying "pause" or "debug here"
- User maintains control through voice commands: "continue", "rollback", "modify approach"

### 3. Accessibility Flow
- User with Carpal Tunnel activates hands-free mode
- All coding, navigation, and management is performed via voice
- System provides clear feedback and confirmations
- Zero keyboard/mouse dependency throughout entire coding session

### 4. AI Hardware Flow (Vision)
- User issues voice commands via AI hardware (glasses, pendant, etc.)
- System processes commands and syncs with cloud or local editor
- Seamless agentic flow works across all hardware platforms
- User can code from anywhere, on any device with full autonomous capabilities

---

## Error Handling
- If a command is ambiguous, system asks for clarification
- Destructive actions require confirmation
- All actions are undoable

---

## Accessibility
- Designed for users who cannot type comfortably
- All features accessible via voice
- Visual and auditory feedback for all actions

---

## Implementation Priorities (Based on Analysis)

### Critical Fixes Required
- **Extension Manifest:** Add missing activationEvents and contributes sections
- **Build Configuration:** Implement webpack bundling for VSCode extension
- **Fn Key Integration:** Replace F12 with Fn key (globe symbol) activation
- **Immediate Execution:** Key release triggers AI processing without Enter press
- **Security Framework:** API key management and user consent mechanisms

### Flow State Enhancements
- **Predictive Context:** AI understands project structure and dependencies automatically
- **Ambient Intelligence:** Background code analysis with proactive suggestions
- **Interruption Recovery:** Smart pause/resume maintaining coding context
- **Cognitive Load Reduction:** Mental model mapping and decision automation
- **Emotional Flow Support:** Frustration detection and confidence building

## Future Considerations
- Integration with more AI hardware (glasses, pendants)
- Multi-user collaboration with voice conflict resolution
- Customizable voice command sets and user preferences
- Brain-computer interface for direct thought-to-code translation
- Advanced rollback system with screenshot-based history
