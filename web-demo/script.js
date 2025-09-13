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

    async initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // Request microphone permission upfront
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                this.microphonePermissionGranted = true;
            } catch (error) {
                console.warn('Microphone permission denied:', error);
                this.microphonePermissionGranted = false;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => {
                this.updateVoiceButton(true);
                this.status.textContent = 'Listening... Speak now!';
                this.transcript.textContent = 'Listening...';
            };
            
            this.recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                this.transcript.textContent = transcript;
                
                if (event.results[event.results.length - 1].isFinal) {
                    this.processVoiceCommand(transcript.trim());
                }
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                if (event.error === 'not-allowed') {
                    this.showError('Microphone access denied. Please allow microphone access and refresh the page.');
                } else {
                    this.showError(`Speech recognition error: ${event.error}`);
                }
                this.updateVoiceButton(false);
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton(false);
                this.status.textContent = 'Hold SPACE to speak, release to execute';
            };
        } else {
            this.showError('Speech recognition not supported in this browser');
        }
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            try {
                this.isListening = true;
                this.recognition.start();
            } catch (error) {
                console.error('Error starting recognition:', error);
                this.isListening = false;
                if (error.name === 'InvalidStateError') {
                    this.updateVoiceButton(true);
                } else {
                    this.showError('Failed to start voice recognition');
                }
            }
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
        console.log('Processing voice command:', command);
        this.showSuccess(`Processing: "${command}"`);
        
        // Enhanced command parsing with intent recognition
        const intent = this.parseVoiceIntent(command);
        console.log('Parsed intent:', intent);
        
        if (intent.type === 'template') {
            this.executeCommand(intent.template);
        } else if (intent.type === 'complex') {
            await this.generateCodeWithLLM(intent.prompt);
        } else if (intent.type === 'control') {
            this.handleControlCommand(intent.action);
        } else {
            // Default to LLM for unrecognized commands
            await this.generateCodeWithLLM(command);
        }
    }

    parseVoiceIntent(command) {
        const lowerCommand = command.toLowerCase().trim();
        
        // Control commands
        if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
            return { type: 'control', action: 'clear' };
        }
        if (lowerCommand.includes('copy') || lowerCommand.includes('clipboard')) {
            return { type: 'control', action: 'copy' };
        }
        
        // Template commands (exact matches)
        const templatePatterns = {
            function: ['create function', 'add function', 'make function', 'function'],
            variable: ['create variable', 'add variable', 'make variable', 'variable'],
            class: ['create class', 'add class', 'make class', 'class'],
            comment: ['add comment', 'create comment', 'comment']
        };
        
        for (const [template, patterns] of Object.entries(templatePatterns)) {
            if (patterns.some(pattern => lowerCommand.includes(pattern))) {
                return { type: 'template', template };
            }
        }
        
        // Complex patterns that should use LLM
        const complexPatterns = [
            'react component', 'vue component', 'angular component',
            'api endpoint', 'rest api', 'graphql',
            'database', 'sql query', 'mongodb',
            'algorithm', 'sort', 'search',
            'authentication', 'login', 'signup',
            'form validation', 'input validation',
            'responsive design', 'mobile first',
            'async function', 'promise', 'await'
        ];
        
        if (complexPatterns.some(pattern => lowerCommand.includes(pattern))) {
            return { type: 'complex', prompt: command };
        }
        
        // If command is longer than 5 words, likely complex
        if (command.split(' ').length > 5) {
            return { type: 'complex', prompt: command };
        }
        
        // Default to template for simple commands
        return { type: 'template', template: 'function' };
    }

    handleControlCommand(action) {
        switch (action) {
            case 'clear':
                clearEditor();
                this.showSuccess('✅ Editor cleared');
                break;
            case 'copy':
                copyCode();
                this.showSuccess('✅ Code copied to clipboard');
                break;
            default:
                this.showError(`Unknown control command: ${action}`);
        }
    }

    async generateCodeWithLLM(prompt) {
        const language = this.languageSelect.value;
        const llmStatus = this.showLLMStatus('🤖 Generating code with AI...');
        
        try {
            // Enhanced prompt for better code generation
            const enhancedPrompt = this.enhancePrompt(prompt, language);
            
            // Try multiple LLM providers for better reliability
            const providers = [
                {
                    name: 'OpenRouter',
                    url: 'https://openrouter.ai/api/v1/chat/completions',
                    headers: {
                        'Authorization': 'Bearer sk-or-v1-demo', // Demo key
                        'Content-Type': 'application/json',
                        'HTTP-Referer': window.location.origin,
                        'X-Title': 'Voice Vibe Coding'
                    },
                    body: {
                        model: 'qwen/qwen-2.5-coder-32b-instruct:free',
                        messages: [
                            {
                                role: 'system',
                                content: `You are a code generation assistant. Generate clean, working ${language} code based on the user's request. Only return the code, no explanations.`
                            },
                            {
                                role: 'user',
                                content: enhancedPrompt
                            }
                        ],
                        max_tokens: 200,
                        temperature: 0.3
                    }
                },
                {
                    name: 'HuggingFace',
                    url: 'https://api-inference.huggingface.co/models/bigcode/starcoder2-15b',
                    headers: {
                        'Authorization': 'Bearer hf_demo',
                        'Content-Type': 'application/json',
                    },
                    body: {
                        inputs: enhancedPrompt,
                        parameters: {
                            max_new_tokens: 150,
                            temperature: 0.3,
                            return_full_text: false,
                            do_sample: true
                        }
                    }
                }
            ];

            for (const provider of providers) {
                try {
                    const response = await fetch(provider.url, {
                        method: 'POST',
                        headers: provider.headers,
                        body: JSON.stringify(provider.body)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        let generatedCode = '';
                        
                        // Handle OpenRouter response format
                        if (result.choices && result.choices[0]?.message?.content) {
                            generatedCode = result.choices[0].message.content;
                        }
                        // Handle HuggingFace response format
                        else if (Array.isArray(result) && result[0]?.generated_text) {
                            generatedCode = result[0].generated_text;
                        } else if (result.generated_text) {
                            generatedCode = result.generated_text;
                        }
                        
                        if (generatedCode.trim()) {
                            const cleanCode = this.cleanGeneratedCode(generatedCode, language);
                            this.appendToEditor(cleanCode);
                            this.showSuccess(`✅ Code generated with ${provider.name}!`);
                            return;
                        }
                    }
                } catch (providerError) {
                    console.warn(`${provider.name} failed:`, providerError);
                    continue;
                }
            }
            
            throw new Error('All LLM providers failed');
            
        } catch (error) {
            console.error('LLM generation error:', error);
            // Fallback to enhanced template-based generation
            this.generateFallbackCode(prompt, language);
            this.showSuccess('✅ Generated with enhanced template');
        } finally {
            llmStatus.remove();
        }
    }

    enhancePrompt(prompt, language) {
        const languageContext = {
            javascript: 'Write clean, modern JavaScript code with ES6+ features.',
            python: 'Write clean, Pythonic code following PEP 8 standards.',
            typescript: 'Write TypeScript code with proper type annotations.',
            html: 'Write semantic HTML5 code with proper structure.',
            css: 'Write modern CSS with flexbox/grid and responsive design.'
        };
        
        const context = languageContext[language] || 'Write clean, well-documented code.';
        return `${context}\n\nTask: ${prompt}\n\nCode:`;
    }

    cleanGeneratedCode(code, language) {
        // Remove common artifacts from LLM generation
        let cleaned = code
            .replace(/^```[\w]*\n?/, '') // Remove opening code blocks
            .replace(/\n?```$/, '')      // Remove closing code blocks
            .replace(/^Code:\s*\n?/, '') // Remove "Code:" prefix
            .trim();
        
        // Add language-specific formatting
        if (language === 'python' && !cleaned.includes('def ') && !cleaned.includes('class ')) {
            cleaned = `# Generated Python code\n${cleaned}`;
        } else if (language === 'javascript' && !cleaned.includes('function') && !cleaned.includes('=>')) {
            cleaned = `// Generated JavaScript code\n${cleaned}`;
        }
        
        return cleaned;
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
        const isDefaultContent = currentContent.includes('Speak to code: Hold SPACE') || 
                                currentContent.includes('Your generated code will appear here') ||
                                currentContent.trim() === 'console.log("Hello, Voice Vibe Coding!");';
        
        const newContent = isDefaultContent ? code : currentContent + '\n\n' + code;
        this.codeEditor.textContent = newContent;
        
        // Trigger a visual update to show the code was added
        this.codeEditor.style.backgroundColor = '#2d3748';
        setTimeout(() => {
            this.codeEditor.style.backgroundColor = '';
        }, 200);
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
    document.getElementById('codeEditor').textContent = '// Speak to code: Hold SPACE and say what you want to build\nconsole.log("Hello, Voice Vibe Coding!");';
    document.getElementById('codeOutput').textContent = 'Ready to run your code...';
}

function runCode() {
    const code = document.getElementById('codeEditor').textContent;
    const language = document.getElementById('languageSelect').value;
    const output = document.getElementById('codeOutput');
    
    if (language === 'javascript') {
        try {
            // Capture console.log output
            const originalLog = console.log;
            let logOutput = '';
            console.log = (...args) => {
                logOutput += args.join(' ') + '\n';
                originalLog(...args);
            };
            
            // Execute the code
            const result = eval(code);
            console.log = originalLog;
            
            output.textContent = logOutput || (result !== undefined ? String(result) : 'Code executed successfully!');
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
        }
    } else if (language === 'html') {
        // Create a preview for HTML
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.border = '1px solid #ccc';
        iframe.style.borderRadius = '8px';
        
        output.innerHTML = '';
        output.appendChild(iframe);
        
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(code);
        doc.close();
    } else {
        output.textContent = `${language} execution not supported in browser. Code is ready to copy!`;
    }
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
