# Data Model

This document describes the core data structures and models for the Voice Vibe Coding extension.

**Note:** The extension is designed for day-to-day users, especially those facing the Carpal Tunnel problem or other repetitive strain injuries, to help them code without typing.

**Long-Term Vision:** Enable users to create applications on the fly using AI hardware such as AI glasses, AI voice recorders, AI pendants, and other emerging devices, making coding accessible anywhere, anytime.

**Tech Stack:**
- TypeScript (preferred) / JavaScript
- VSCode Extension API (OpenVSX/VSCodium compatible)
- npm for package management
- Mocha/Chai for testing
- Node.js-based speech-to-text

## 1. VoiceCommand (TypeScript Interface)
- **id**: string (unique identifier)
- **transcript**: string (raw speech-to-text result)
- **intent**: string (parsed user intent, e.g., 'create_file', 'edit_code')
- **parameters**: object (key-value pairs for command details)
- **timestamp**: datetime
- **user_id**: string (if multi-user)

## 2. CodeChange
- **id**: string
- **file_path**: string
- **change_type**: string (insert, delete, replace)
- **content_before**: string
- **content_after**: string
- **timestamp**: datetime
- **user_id**: string

## 3. FileContext
- **file_path**: string
- **language**: string
- **cursor_position**: int
- **selection_range**: [int, int]

## 4. Session
- **session_id**: string
- **user_id**: string
- **start_time**: datetime
- **end_time**: datetime (optional)
- **active_file**: string
- **command_history**: [VoiceCommand]

## 5. VibeSettings
- **mode**: string (e.g., 'chill', 'focus', 'playful')
- **voice_feedback**: boolean
- **visual_feedback**: boolean
