# Product Requirements Document (PRD)

## Product Overview
Voice Vibe Coding is a VSCode-based extension that enables users to create, edit, and manage code using voice commands, making coding more accessible, efficient, and enjoyable—especially for day-to-day users facing the Carpal Tunnel problem or other repetitive strain injuries.

**Long-Term Vision:** Empower users to create applications on the fly using AI hardware such as AI glasses, AI voice recorders, AI pendants, and other emerging devices, making coding accessible anywhere, anytime.

**Tech Stack:**
- TypeScript (preferred) / JavaScript
- VSCode Extension API (OpenVSX/VSCodium compatible)
- npm for package management
- Mocha/Chai for testing
- Node.js-based speech-to-text
- AI/LLM integration for seamless prompt-based coding

**Key Innovation:** Seamless voice-to-AI coding pipeline that eliminates manual intervention points found in existing solutions (Talon, etc.), providing autonomous agentic flow while maintaining user control through voice-based accept/reject mechanisms.

## Goals
- Enable completely hands-free coding via seamless voice-to-AI pipeline
- Eliminate manual intervention between speech recognition and AI code generation
- Provide autonomous agentic coding mode with voice-based user controls
- Support multiple programming languages and frameworks
- Provide safe, reversible actions with clear feedback
- Enhance accessibility and developer productivity, particularly for those who cannot type comfortably
- Increase developer flow and efficiency while reducing repetitive strain injuries

## Features

### Seamless Voice-to-AI Pipeline
- Voice command recognition and transcription
- Direct AI integration without manual Enter/click requirements
- Autonomous agentic code generation from natural language
- Real-time code execution and modification

### Core Functionality
- Code generation, editing, and navigation via voice
- File and project management
- Code suggestions, completions, and documentation
- Multi-language support with context awareness

### User Control & Safety
- Voice-based accept/reject for AI suggestions
- Debug points and breakpoints in autonomous flow
- Undo/redo and change history
- Visual and auditory feedback
- Hotword activation

### Future: Advanced Control System (Post-MVP)
- Screenshot-based action tracking
- Commit-like checkpoints for rollback
- Advanced memory system for complex debugging

## User Stories
- As a developer with Carpal Tunnel, I want to create files and write code using my voice so I can code hands-free.
- As a user, I want seamless voice-to-AI coding without having to press Enter or use mouse/keyboard between speech and AI generation.
- As a developer, I want autonomous agentic mode where the AI can perform multiple coding actions in sequence based on my voice command.
- As a user, I want to accept or reject AI suggestions using voice commands to maintain control.
- As a developer, I want debug points in the agentic flow so I can pause and review complex operations.
- As a user, I want to undo changes made by voice commands to avoid mistakes.
- As a developer, I want to receive feedback before destructive actions are performed.
- As a user, I want to set the coding "vibe" (e.g., playful, focused) for a personalized experience.
- As a power user (future), I want screenshot-based rollback capabilities to revert complex multi-step operations.

## Success Metrics
- Voice command accuracy rate > 95%
- Average time to complete a coding task reduced by 30%
- Flow state maintenance: Users report sustained focus for 2+ hour sessions
- Friction reduction: Zero manual interventions in voice-to-AI pipeline
- Accessibility impact: 90% of Carpal Tunnel users report significant improvement
- Positive user feedback and accessibility improvements
- Fn key activation response time < 200ms
- AI code generation latency < 2 seconds

## Out of Scope (MVP)
- Non-code related voice actions (e.g., web browsing)
- Full IDE replacement
- Always-listening mode (privacy/battery concerns)
- Brain-computer interface integration
- Advanced rollback system with screenshots
- Multi-user collaborative voice coding
- AI hardware integration (glasses, pendants)

## Critical Issues Addressed
- **Extension Configuration:** Fixed missing VSCode extension manifest fields
- **Build System:** Added webpack bundling for proper packaging
- **Activation Method:** Fn key with immediate execution on release
- **Seamless Pipeline:** Eliminated all manual intervention points
- **User Control:** Voice-based accept/reject/debug commands
- **Flow State:** Designed to maintain developer focus and productivity
