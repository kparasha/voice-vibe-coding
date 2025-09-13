# System Design

This document describes the high-level architecture for the Voice Vibe Coding extension.

**Note:** The system is designed for day-to-day users, especially those facing the Carpal Tunnel problem or other repetitive strain injuries, to help them code without typing.

**Long-Term Vision:** Enable users to create applications on the fly using AI hardware such as AI glasses, AI voice recorders, AI pendants, and other emerging devices, making coding accessible anywhere, anytime.

**Tech Stack:**
- TypeScript (preferred) / JavaScript
- VSCode Extension API (OpenVSX/VSCodium compatible)
- npm for package management
- Mocha/Chai for testing
- **On-Device ASR:** Web Speech API (MVP), macOS Speech Framework (fallback)
- AI/LLM integration for autonomous code generation

**ASR Strategy:**
- **MVP:** On-device speech recognition for privacy, performance, and zero cost
- **Premium:** Cloud ASR with enhanced accuracy and coding-specific vocabulary

**Architecture Innovation:** Seamless voice-to-AI pipeline that eliminates manual intervention points between speech recognition and AI code generation, providing autonomous agentic flow while maintaining user control through voice-based commands.

## Overview
The extension enables users to interact with their codebase using voice commands, translating natural language into code actions within VSCode-based editors.

## Components

### 1. Voice Input Layer
- Captures audio from the user via browser APIs
- **Primary:** Web Speech API for on-device transcription (privacy-first)
- **Fallback:** macOS Speech Framework integration if needed
- **Benefits:** Zero latency, offline capability, no API costs, enhanced privacy
- Provides continuous listening capabilities with Fn key activation

### 2. AI Integration Layer (NEW)
- Seamless connection to AI/LLM services
- Direct voice-to-AI pipeline without manual intervention
- Handles autonomous code generation and execution
- Manages multi-step agentic operations

### 3. Command Parser & AI Orchestrator
- Analyzes transcribed text for intent extraction
- Routes commands to appropriate AI models
- Manages autonomous vs. user-controlled execution modes
- Handles voice-based accept/reject commands

### 4. Action Executor
- Interfaces with the OpenVSX API
- Performs file, code, and project manipulations
- Executes AI-generated code changes
- Handles undo/redo and change history
- Manages debug points and breakpoints in agentic flow

### 5. Feedback System
- Provides real-time visual feedback in the editor (popups, highlights)
- Voice-based status updates and confirmations
- Checkpoint notifications for multi-step operations
- Optionally provides auditory feedback

### 6. Context Manager
- Maintains current file, cursor, and project state
- Tracks user preferences and "vibe" settings
- Manages agentic flow state and debug points

### 7. Future: Advanced Rollback System (Post-MVP)
- Screenshot-based action tracking
- Commit-like checkpoint management
- Advanced memory system for complex operation debugging

## Data Flow

### Seamless Voice-to-AI Flow
1. User speaks a command
2. Voice Input Layer transcribes audio
3. AI Integration Layer receives transcription directly (no manual intervention)
4. Command Parser & AI Orchestrator interprets intent and routes to AI
5. AI generates code/actions autonomously
6. Action Executor performs AI-generated actions
7. Feedback System provides real-time visual/audio updates
8. User can voice "accept", "reject", "debug", or "undo" commands
9. Context Manager updates state and manages flow control

### Agentic Multi-Step Flow
1. User issues complex command
2. AI breaks down into multiple sub-operations
3. System executes operations with checkpoint notifications
4. User can insert debug points or modify approach via voice
5. Advanced rollback system tracks all operations (future)

## Technologies
- OpenVSX API with proper extension manifest configuration
- Node.js speech-to-text (e.g., @google-cloud/speech, microsoft-cognitiveservices-speech-sdk)
- TypeScript/JavaScript for extension logic
- Webpack for bundling and packaging
- AI/LLM services for autonomous code generation
- Fn key system integration for immediate activation

## Critical Architecture Issues Addressed
- **Extension Configuration:** Fixed missing activationEvents, contributes, and publisher fields
- **Build System:** Added webpack configuration for proper VSCode extension packaging
- **Activation Mechanism:** Fn key (globe symbol) with immediate execution on release
- **Pipeline Optimization:** Eliminated all manual intervention points in voice-to-AI flow
- **Context Management:** Enhanced state tracking for session continuity and project awareness

## Security & Privacy
- All voice data processed locally or with user consent if sent to cloud
- Secure API key management with user-controlled configuration
- No code or voice data stored without explicit user permission
- Local speech processing fallback to minimize cloud dependencies
