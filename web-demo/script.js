class VoiceVibeCoding {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.initElements();
        this.initSpeechRecognition();
        this.codeTemplates = {
            function: `function myFunction() {
    // TODO: Implement function logic
    console.log('Function called');
    return null;
}`,
            variable: `const myVariable = '';
let counter = 0;
const isActive = true;`,
            class: `class MyClass {
    constructor() {
        this.name = '';
        this.isInitialized = true;
    }
    
    getName() {
        return this.name;
    }
    
    setName(name) {
        this.name = name;
    }
}`,
            comment: `// TODO: Add your implementation here
/* 
 * Multi-line comment block
 * Describe your code logic
 */`
        };
    }

    initElements() {
        this.voiceBtn = document.getElementById('voiceBtn');
        this.status = document.getElementById('status');
        this.transcript = document.getElementById('transcript');
        this.codeOutput = document.getElementById('codeOutput');
        
        this.voiceBtn.addEventListener('click', () => this.toggleListening());
        
        // Key activation variables
        this.isKeyPressed = false;
        this.keyActivationEnabled = true;
        this.autoExecuteTimeout = null;
    }

    initSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showError('Speech recognition not supported in this browser. Try Chrome or Edge.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        
        // Key friction-reducing features
        this.setupKeyActivation();
        this.setupAutoExecution();

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI();
            this.showSuccess('Listening... Speak your command!');
        };

        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            this.transcript.textContent = finalTranscript + interimTranscript;

            if (finalTranscript) {
                // Store for key-release execution
                this.pendingTranscript = finalTranscript;
                
                // If not using key activation, process immediately
                if (!this.isKeyPressed) {
                    this.processVoiceCommand(finalTranscript.trim().toLowerCase());
                }
            }
        };

        this.recognition.onerror = (event) => {
            this.showError(`Speech recognition error: ${event.error}`);
            this.stopListening();
        };

        this.recognition.onend = () => {
            this.stopListening();
        };
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (!this.recognition) {
            this.showError('Speech recognition not available');
            return;
        }

        try {
            this.recognition.start();
        } catch (error) {
            this.showError('Could not start speech recognition');
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
        this.isListening = false;
        this.updateUI();
        this.status.textContent = 'Click the microphone to start';
    }

    updateUI() {
        if (this.isListening) {
            this.voiceBtn.classList.add('listening');
            this.voiceBtn.textContent = '🔴';
            this.status.textContent = 'Listening... Click to stop';
        } else {
            this.voiceBtn.classList.remove('listening');
            this.voiceBtn.textContent = '🎤';
            this.status.textContent = 'Click the microphone to start';
        }
    }

    processVoiceCommand(command) {
        console.log('Processing command:', command);
        
        // Simple command matching
        if (command.includes('create function') || command.includes('function')) {
            this.executeCommand('function');
        } else if (command.includes('create variable') || command.includes('variable')) {
            this.executeCommand('variable');
        } else if (command.includes('create class') || command.includes('class')) {
            this.executeCommand('class');
        } else if (command.includes('add comment') || command.includes('comment')) {
            this.executeCommand('comment');
        } else if (command.includes('clear') || command.includes('reset')) {
            this.clearOutput();
        } else {
            this.showError(`Command not recognized: "${command}". Try: create function, create variable, create class, or add comment`);
        }
    }

    executeCommand(type) {
        if (this.codeTemplates[type]) {
            const timestamp = new Date().toLocaleTimeString();
            const code = this.codeTemplates[type];
            
            this.codeOutput.textContent = `// Generated at ${timestamp}\n// Command: ${type}\n\n${code}`;
            this.showSuccess(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} code generated!`);
            
            // Auto-stop listening after successful command
            if (this.isListening) {
                this.stopListening();
            }
        } else {
            this.showError(`Unknown command type: ${type}`);
        }
    }

    clearOutput() {
        this.codeOutput.textContent = '// Output cleared\n// Ready for new commands...';
        this.showSuccess('Output cleared');
    }

    showError(message) {
        this.removeMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        this.status.parentNode.insertBefore(errorDiv, this.status.nextSibling);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    showSuccess(message) {
        this.removeMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        this.status.parentNode.insertBefore(successDiv, this.status.nextSibling);
        setTimeout(() => successDiv.remove(), 3000);
    }

    removeMessages() {
        document.querySelectorAll('.error, .success').forEach(el => el.remove());
    }

    // Key-up activation (hold to speak, release to execute)
    setupKeyActivation() {
        document.addEventListener('keydown', (event) => {
            // Use Space key as primary activation (like Fn key concept)
            if (event.code === 'Space' && !this.isKeyPressed && this.keyActivationEnabled) {
                event.preventDefault();
                this.isKeyPressed = true;
                this.startListening();
                this.status.textContent = '🎤 Hold Space to speak, release to execute';
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.code === 'Space' && this.isKeyPressed) {
                event.preventDefault();
                this.isKeyPressed = false;
                this.stopListening();
                // Auto-execute after brief delay (simulating immediate execution)
                this.scheduleAutoExecution();
            }
        });
    }

    // Auto-execution after key release (friction reduction)
    setupAutoExecution() {
        this.pendingTranscript = '';
    }

    scheduleAutoExecution() {
        if (this.autoExecuteTimeout) {
            clearTimeout(this.autoExecuteTimeout);
        }
        
        // Execute command automatically after 500ms (simulating immediate AI processing)
        this.autoExecuteTimeout = setTimeout(() => {
            if (this.pendingTranscript.trim()) {
                this.status.textContent = '🤖 AI processing...';
                this.processVoiceCommand(this.pendingTranscript.trim().toLowerCase());
                this.pendingTranscript = '';
            }
        }, 500);
    }

    // Enhanced voice processing with seamless execution
    processVoiceCommandSeamless(command) {
        // Store for auto-execution
        this.pendingTranscript = command;
        
        // Show immediate feedback
        this.transcript.textContent = `"${command}" - Processing...`;
        
        // Process immediately (no confirmation needed)
        setTimeout(() => {
            this.processVoiceCommand(command.toLowerCase());
        }, 200);
    }
}

// Global functions for HTML onclick handlers
function executeCommand(type) {
    voiceApp.executeCommand(type);
}

function copyCode() {
    const code = document.getElementById('codeOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
        voiceApp.showSuccess('Code copied to clipboard!');
    }).catch(() => {
        voiceApp.showError('Failed to copy code');
    });
}

// Initialize the app
const voiceApp = new VoiceVibeCoding();

// Add keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && event.ctrlKey) {
        event.preventDefault();
        voiceApp.toggleListening();
    }
    if (event.code === 'Escape') {
        voiceApp.stopListening();
    }
});

console.log('🎤 Voice Vibe Coding loaded! Press Ctrl+Space to start listening or click the microphone.');
