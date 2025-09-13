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
        this.codeEditor = document.getElementById('codeEditor');
        this.languageSelect = document.getElementById('languageSelect');
        
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

    async processVoiceCommand(command) {
        this.showSuccess(`Processing: "${command}"`);
        
        // Check for specific templates first
        if (command.includes('function') || command.includes('create function')) {
            this.executeCommand('function');
        } else if (command.includes('variable') || command.includes('create variable')) {
            this.executeCommand('variable');
        } else if (command.includes('class') || command.includes('create class')) {
            this.executeCommand('class');
        } else if (command.includes('comment') || command.includes('add comment')) {
            this.executeCommand('comment');
        } else {
            // Use LLM for more complex requests
            await this.generateCodeWithLLM(command);
        }
    }

    async generateCodeWithLLM(prompt) {
        const language = this.languageSelect.value;
        const llmStatus = this.showLLMStatus('🤖 Generating code with AI...');
        
        try {
            // Using HuggingFace Inference API (free tier)
            const response = await fetch('https://api-inference.huggingface.co/models/bigcode/starcoder2-15b', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer hf_demo', // Demo token for testing
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: `Generate ${language} code for: ${prompt}`,
                    parameters: {
                        max_new_tokens: 200,
                        temperature: 0.7,
                        return_full_text: false
                    }
                })
            });

            if (response.ok) {
                const result = await response.json();
                const generatedCode = result[0]?.generated_text || `// Generated ${language} code for: ${prompt}\n// TODO: Implement functionality`;
                this.appendToEditor(generatedCode);
                this.showSuccess('✅ Code generated successfully!');
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            console.error('LLM generation error:', error);
            // Fallback to template-based generation
            this.generateFallbackCode(prompt, language);
            this.showSuccess('✅ Generated with template (LLM unavailable)');
        } finally {
            llmStatus.remove();
        }
    }

    generateFallbackCode(prompt, language) {
        let code = '';
        const lowerPrompt = prompt.toLowerCase();
        
        if (lowerPrompt.includes('function') || lowerPrompt.includes('method')) {
            code = language === 'python' ? 
                `def generated_function():\n    """${prompt}"""\n    pass\n` :
                `function generatedFunction() {\n    // ${prompt}\n    return null;\n}\n`;
        } else if (lowerPrompt.includes('class')) {
            code = language === 'python' ?
                `class GeneratedClass:\n    """${prompt}"""\n    def __init__(self):\n        pass\n` :
                `class GeneratedClass {\n    // ${prompt}\n    constructor() {\n        \n    }\n}\n`;
        } else {
            code = `// ${prompt}\n// TODO: Implement this functionality\n`;
        }
        
        this.appendToEditor(code);
    }

    appendToEditor(code) {
        const currentContent = this.codeEditor.textContent;
        const newContent = currentContent.includes('Your generated code will appear here') ? 
            code : currentContent + '\n\n' + code;
        this.codeEditor.textContent = newContent;
    }

    showLLMStatus(message) {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'llm-status processing';
        statusDiv.textContent = message;
        this.codeEditor.parentNode.insertBefore(statusDiv, this.codeEditor);
        return statusDiv;
    }

    executeCommand(type) {
        if (this.codeTemplates[type]) {
            const timestamp = new Date().toLocaleTimeString();
            const code = this.codeTemplates[type];
            
            this.appendToEditor(`// Generated at ${timestamp}\n// Command: ${type}\n\n${code}`);
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
    const code = document.getElementById('codeEditor').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

function clearEditor() {
    document.getElementById('codeEditor').textContent = '// Code editor cleared\n// Start speaking to generate new code!';
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
