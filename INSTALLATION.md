# Voice Vibe Coding - Installation Guide

## 🎤 Seamless AI-Powered Voice Coding Extension

This guide covers installation for **VSCode**, **VSCodium**, **Cursor**, **Windsurf**, and other OpenVSX-compatible editors.

---

## 📋 Prerequisites

- **Microphone access** (required for voice input)
- **Modern browser engine** (for Web Speech API support)
- **VSCode-compatible editor** (version 1.80.0 or higher)

---

## 🚀 Installation Methods

### Method 1: Install from VSIX File (Recommended for Testing)

#### For VSCode (Microsoft)
```bash
# Install the extension
code --install-extension voice-vibe-coding-0.1.0.vsix

# Or via Command Palette:
# 1. Open Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
# 2. Type "Extensions: Install from VSIX..."
# 3. Select the voice-vibe-coding-0.1.0.vsix file
```

#### For VSCodium (Open Source)
```bash
# Install the extension
codium --install-extension voice-vibe-coding-0.1.0.vsix

# Or via Command Palette:
# 1. Open Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
# 2. Type "Extensions: Install from VSIX..."
# 3. Select the voice-vibe-coding-0.1.0.vsix file
```

#### For Cursor
```bash
# Install the extension
cursor --install-extension voice-vibe-coding-0.1.0.vsix

# Or via Extensions panel:
# 1. Open Extensions panel (Cmd+Shift+X / Ctrl+Shift+X)
# 2. Click the "..." menu in the top right
# 3. Select "Install from VSIX..."
# 4. Choose the voice-vibe-coding-0.1.0.vsix file
```

#### For Windsurf
```bash
# Install the extension (if CLI available)
windsurf --install-extension voice-vibe-coding-0.1.0.vsix

# Or via Extensions panel:
# 1. Open Extensions panel
# 2. Click the gear icon → "Install from VSIX..."
# 3. Select the voice-vibe-coding-0.1.0.vsix file
```

### Method 2: Manual Installation

1. **Download** the `voice-vibe-coding-0.1.0.vsix` file
2. **Open your editor** (VSCode, VSCodium, Cursor, Windsurf, etc.)
3. **Open Extensions panel** (`Cmd+Shift+X` / `Ctrl+Shift+X`)
4. **Click the menu** (three dots `...`) in the Extensions panel
5. **Select "Install from VSIX..."**
6. **Choose the downloaded VSIX file**
7. **Reload the editor** when prompted

### Method 3: OpenVSX Registry (Future)

Once published to OpenVSX, you can install directly:

```bash
# For VSCodium and OpenVSX-compatible editors
# Search for "Voice Vibe Coding" in the Extensions marketplace
# Or install via command line:
ovsx install voice-vibe-team.voice-vibe-coding
```

---

## 🔧 Setup & Configuration

### 1. Grant Microphone Permissions

When you first activate voice coding, your browser/editor will request microphone access:
- **Click "Allow"** when prompted
- **Ensure microphone is working** in your system settings

### 2. Verify Installation

1. **Open Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. **Type "Voice Vibe"** - you should see:
   - `Voice Vibe Coding: Hello World`
   - `Voice Vibe Coding: Start Voice Coding`

### 3. Test Basic Functionality

1. **Open any file** in your editor
2. **Press `Fn+Space`** (or run "Start Voice Coding" command)
3. **Voice panel should open** with "Ready" status
4. **Try saying "Hello"** - you should get a response

---

## 🎯 How to Use

### Activation Methods

#### Primary: Fn+Space Keybinding
- **Hold `Fn+Space`** to start voice recognition
- **Speak your command**
- **Release `Fn+Space`** to process the command

#### Alternative: Command Palette
- **Open Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`)
- **Run "Voice Vibe Coding: Start Voice Coding"**
- **Click "Start Listening"** in the voice panel

### Basic Voice Commands

| Command | Action |
|---------|--------|
| `"Hello"` | Test voice recognition |
| `"Create function"` | Insert function template |
| `"Add comment about [topic]"` | Insert inline comment |

---

## 🛠️ Troubleshooting

### Extension Not Loading
- **Check editor version** (requires 1.80.0+)
- **Reload the editor** (`Cmd+R` / `Ctrl+R`)
- **Check Extensions panel** for any error messages

### Microphone Not Working
- **Check system permissions** for microphone access
- **Test microphone** in other applications
- **Try different browser engine** if using web-based editor

### Voice Recognition Issues
- **Speak clearly** and at normal pace
- **Ensure quiet environment** (minimize background noise)
- **Check browser compatibility** (Chrome/Chromium works best)

### Fn+Space Not Working
- **Check keybinding conflicts** in editor settings
- **Try alternative activation** via Command Palette
- **Verify extension is active** in Extensions panel

---

## 🌐 Editor Compatibility

| Editor | Status | Installation Method |
|--------|--------|-------------------|
| **VSCode** | ✅ Fully Supported | VSIX or Marketplace |
| **VSCodium** | ✅ Fully Supported | VSIX or OpenVSX |
| **Cursor** | ✅ Fully Supported | VSIX |
| **Windsurf** | ✅ Fully Supported | VSIX |
| **Theia** | 🟡 Should Work | VSIX |
| **Code-Server** | 🟡 Should Work | VSIX |

---

## 🔄 Development Installation

For developers wanting to run from source:

```bash
# Clone the repository
git clone https://github.com/kparasha/voice-vibe-coding.git
cd voice-vibe-coding

# Install dependencies
npm install

# Build the extension
npm run build

# Package the extension
npm run package

# Install the generated VSIX
code --install-extension voice-vibe-coding-0.1.0.vsix
```

---

## 🆘 Support

- **GitHub Issues**: [Report bugs and feature requests](https://github.com/kparasha/voice-vibe-coding/issues)
- **Documentation**: Check the README.md for detailed features
- **Community**: Join discussions in GitHub Discussions

---

## 🚀 Next Steps

After installation:
1. **Try basic voice commands** to familiarize yourself
2. **Explore the voice panel** interface
3. **Check the output channel** for debugging info
4. **Provide feedback** for future improvements

**Happy voice coding!** 🎤✨
