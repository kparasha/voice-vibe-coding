import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel;
let voiceInputManager: VoiceInputManager | undefined;

// Voice Input Manager class for handling speech recognition
class VoiceInputManager {
  private recognition: any;
  private isListening: boolean = false;
  private webviewPanel: vscode.WebviewPanel | undefined;
  private isDisposed: boolean = false;
  private lastCommand: string = '';
  private lastCommandTime: number = 0;
  private pendingCommand: string = '';
  private statusBarItem: vscode.StatusBarItem;

  constructor(private context: vscode.ExtensionContext) {
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.statusBarItem.text = "🎤 Voice Vibe";
    this.statusBarItem.command = 'voiceVibeCoding.startVoiceCoding';
    this.statusBarItem.show();
    this.setupWebview();
  }

  private setupWebview() {
    outputChannel.appendLine('[DEBUG] Setting up webview...');
    
    // Clean up existing webview if it exists
    if (this.webviewPanel) {
      outputChannel.appendLine('[DEBUG] Disposing existing webview');
      this.webviewPanel.dispose();
    }
    
    this.isDisposed = false;
    
    try {
      this.webviewPanel = vscode.window.createWebviewPanel(
        'voiceVibeWebview',
        'Voice Vibe Coding',
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [],
          portMapping: []
        }
      );

      outputChannel.appendLine('[DEBUG] Webview created successfully');
      this.webviewPanel.webview.html = this.getWebviewContent();
      
      // Track disposal
      this.webviewPanel.onDidDispose(() => {
        outputChannel.appendLine('[DEBUG] Webview disposed event fired');
        this.isDisposed = true;
        this.webviewPanel = undefined;
        this.updateStatusBar('disposed');
      });
      
      // Handle messages from webview
      this.webviewPanel.webview.onDidReceiveMessage(
        message => {
          outputChannel.appendLine(`[DEBUG] Webview message: ${JSON.stringify(message)}`);
          switch (message.command) {
            case 'voiceResult':
              this.handleVoiceResult(message.text, message.isFinal);
              break;
            case 'voiceError':
              this.handleVoiceError(message.error);
              break;
            case 'voiceStart':
              outputChannel.appendLine('Voice recognition started');
              this.updateStatusBar('listening');
              break;
            case 'voiceEnd':
              outputChannel.appendLine('Voice recognition ended');
              this.updateStatusBar('ready');
              break;
          }
        },
        undefined,
        this.context.subscriptions
      );
      
      this.updateStatusBar('ready');
      
    } catch (error) {
      outputChannel.appendLine(`[ERROR] Failed to create webview: ${error}`);
      this.isDisposed = true;
    }
  }

  private updateStatusBar(state: string) {
    switch (state) {
      case 'listening':
        this.statusBarItem.text = "🎤 Listening...";
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        vscode.commands.executeCommand('setContext', 'voiceVibeCoding.isListening', true);
        break;
      case 'ready':
        this.statusBarItem.text = "🎤 Voice Vibe";
        this.statusBarItem.backgroundColor = undefined;
        vscode.commands.executeCommand('setContext', 'voiceVibeCoding.isListening', false);
        break;
      case 'disposed':
        this.statusBarItem.text = "🎤 Reconnecting...";
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        vscode.commands.executeCommand('setContext', 'voiceVibeCoding.isListening', false);
        break;
      case 'pending':
        this.statusBarItem.text = "🎤 Press Enter to confirm";
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
        break;
    }
  }

  private getWebviewContent(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Voice Vibe Coding</title>
        <style>
            body {
                font-family: var(--vscode-font-family);
                color: var(--vscode-foreground);
                background-color: var(--vscode-editor-background);
                padding: 20px;
            }
            .status {
                padding: 10px;
                margin: 10px 0;
                border-radius: 4px;
                background-color: var(--vscode-editor-inactiveSelectionBackground);
            }
            .listening {
                background-color: var(--vscode-inputValidation-warningBackground);
                color: var(--vscode-inputValidation-warningForeground);
            }
            .result {
                padding: 10px;
                margin: 10px 0;
                border-left: 3px solid var(--vscode-textLink-foreground);
                background-color: var(--vscode-textBlockQuote-background);
            }
            button {
                background-color: var(--vscode-button-background);
                color: var(--vscode-button-foreground);
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin: 5px;
            }
            button:hover {
                background-color: var(--vscode-button-hoverBackground);
            }
            .interim {
                opacity: 0.7;
                font-style: italic;
            }
            .error {
                background-color: var(--vscode-inputValidation-errorBackground);
                color: var(--vscode-inputValidation-errorForeground);
                padding: 10px;
                border-radius: 4px;
                margin: 10px 0;
            }
            .instructions {
                background-color: var(--vscode-textBlockQuote-background);
                padding: 15px;
                border-radius: 4px;
                margin: 10px 0;
                border-left: 3px solid var(--vscode-textLink-foreground);
            }
        </style>
    </head>
    <body>
        <h2>🎤 Voice Vibe Coding</h2>
        <div id="status" class="status">Ready - Press Cmd+Shift+V to start voice coding</div>
        
        <div class="instructions">
            <strong>VSCode Webview Limitation:</strong><br>
            Due to VSCode's webview security restrictions, direct microphone access may be blocked.<br>
            <strong>Alternative:</strong> Use the Command Palette method or external browser for testing.
        </div>
        
        <button onclick="startListening()">Start Listening</button>
        <button onclick="stopListening()">Stop Listening</button>
        <button onclick="testVoiceCommand()">Test Voice Command</button>
        
        <div id="results"></div>
        
        <script>
            const vscode = acquireVsCodeApi();
            let recognition;
            let isListening = false;
            
            function testVoiceCommand() {
                // Simulate a voice command for testing
                const testCommand = "create function";
                document.getElementById('status').innerHTML = 'Testing voice command: "' + testCommand + '"';
                
                const resultsDiv = document.getElementById('results');
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.innerHTML = '<strong>Test Command:</strong> ' + testCommand;
                resultsDiv.appendChild(resultDiv);
                
                vscode.postMessage({ 
                    command: 'voiceResult', 
                    text: testCommand, 
                    isFinal: true 
                });
            }
            
            // Initialize Web Speech API
            async function initSpeechRecognition() {
                try {
                    // Check if running in secure context
                    if (!window.isSecureContext) {
                        throw new Error('Speech recognition requires HTTPS or localhost');
                    }
                    
                    // Check for microphone permissions with timeout
                    const stream = await Promise.race([
                        navigator.mediaDevices.getUserMedia({ audio: true }),
                        new Promise((_, reject) => 
                            setTimeout(() => reject(new Error('Permission timeout')), 5000)
                        )
                    ]);
                    
                    // Close the stream immediately
                    stream.getTracks().forEach(track => track.stop());
                    
                } catch (error) {
                    console.error('Microphone permission error:', error);
                    document.getElementById('status').innerHTML = 
                        '<div class="error">Microphone access blocked in webview. Use "Test Voice Command" button or Command Palette instead.</div>';
                    vscode.postMessage({ 
                        command: 'voiceError', 
                        error: 'webview-microphone-blocked' 
                    });
                    return false;
                }

                if ('webkitSpeechRecognition' in window) {
                    recognition = new webkitSpeechRecognition();
                } else if ('SpeechRecognition' in window) {
                    recognition = new SpeechRecognition();
                } else {
                    document.getElementById('status').innerHTML = 
                        '<div class="error">Speech recognition not supported in this browser</div>';
                    return false;
                }
                
                recognition.continuous = false;
                recognition.interimResults = true;
                recognition.lang = 'en-US';
                
                recognition.onstart = function() {
                    isListening = true;
                    document.getElementById('status').innerHTML = '🎤 Listening... (Speak now)';
                    document.getElementById('status').className = 'status listening';
                    vscode.postMessage({ command: 'voiceStart' });
                };
                
                recognition.onresult = function(event) {
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
                    
                    // Update UI
                    const resultsDiv = document.getElementById('results');
                    if (finalTranscript) {
                        const resultDiv = document.createElement('div');
                        resultDiv.className = 'result';
                        resultDiv.innerHTML = '<strong>Final:</strong> ' + finalTranscript;
                        resultsDiv.appendChild(resultDiv);
                        
                        vscode.postMessage({ 
                            command: 'voiceResult', 
                            text: finalTranscript, 
                            isFinal: true 
                        });
                    }
                    
                    if (interimTranscript) {
                        document.getElementById('status').innerHTML = 
                            '🎤 Listening: <span class="interim">' + interimTranscript + '</span>';
                    }
                };
                
                recognition.onerror = function(event) {
                    console.error('Speech recognition error:', event.error);
                    document.getElementById('status').innerHTML = 
                        '<div class="error">Speech recognition error: ' + event.error + '</div>';
                    vscode.postMessage({ 
                        command: 'voiceError', 
                        error: event.error 
                    });
                };
                
                recognition.onend = function() {
                    isListening = false;
                    document.getElementById('status').innerHTML = 'Ready - Press Cmd+Shift+V to start voice coding';
                    document.getElementById('status').className = 'status';
                    vscode.postMessage({ command: 'voiceEnd' });
                };
                
                return true;
            }
            
            async function startListening() {
                if (!recognition && !(await initSpeechRecognition())) {
                    return;
                }
                
                if (!isListening) {
                    try {
                        recognition.start();
                    } catch (error) {
                        console.error('Failed to start recognition:', error);
                        document.getElementById('status').innerHTML = 
                            '<div class="error">Failed to start voice recognition: ' + error.message + '</div>';
                        vscode.postMessage({ 
                            command: 'voiceError', 
                            error: error.message 
                        });
                    }
                }
            }
            
            function stopListening() {
                if (recognition && isListening) {
                    recognition.stop();
                }
            }
            
            // Don't auto-initialize to avoid permission prompts
            // User must click button to start
            
            // Listen for messages from extension
            window.addEventListener('message', event => {
                const message = event.data;
                switch (message.command) {
                    case 'startListening':
                        startListening();
                        break;
                    case 'stopListening':
                        stopListening();
                        break;
                }
            });
        </script>
    </body>
    </html>`;
  }

  public async startVoiceCoding() {
    outputChannel.appendLine('[DEBUG] Start voice coding called');
    
    // Check if webview is disposed and recreate if needed
    if (this.isDisposed || !this.webviewPanel) {
      outputChannel.appendLine('[DEBUG] Webview disposed or missing, recreating...');
      this.setupWebview();
      
      // Give webview time to initialize
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    if (this.webviewPanel && !this.isDisposed) {
      outputChannel.appendLine('[DEBUG] Revealing webview and starting listening');
      this.webviewPanel.reveal();
      this.webviewPanel.webview.postMessage({ command: 'startListening' });
      this.isListening = true;
      this.updateStatusBar('listening');
    } else {
      outputChannel.appendLine('[ERROR] Failed to create or access voice input panel');
      vscode.window.showErrorMessage('Failed to create voice input panel. Check output for details.');
    }
  }

  public async stopVoiceCoding() {
    outputChannel.appendLine('[DEBUG] Stop voice coding called');
    
    if (this.webviewPanel && !this.isDisposed) {
      this.webviewPanel.webview.postMessage({ command: 'stopListening' });
      this.isListening = false;
      this.updateStatusBar('ready');
    }
  }

  private handleVoiceResult(text: string, isFinal: boolean) {
    outputChannel.appendLine(`Voice ${isFinal ? 'Final' : 'Interim'}: ${text}`);
    
    if (isFinal) {
      // Debounce duplicate commands
      if (this.lastCommand === text && Date.now() - this.lastCommandTime < 2000) {
        outputChannel.appendLine(`Ignoring duplicate command: ${text}`);
        return;
      }
      
      this.lastCommand = text;
      this.lastCommandTime = Date.now();
      
      // Store pending command instead of processing immediately
      this.pendingCommand = text;
      this.updateStatusBar('pending');
      
      vscode.window.showInformationMessage(
        `Voice command recognized: "${text}". Press Enter to confirm or Escape to cancel.`,
        'Confirm',
        'Cancel'
      ).then(selection => {
        if (selection === 'Confirm') {
          this.confirmPendingCommand();
        } else {
          this.cancelPendingCommand();
        }
      });
    }
  }

  public confirmPendingCommand() {
    if (this.pendingCommand) {
      outputChannel.appendLine(`[DEBUG] Confirming command: ${this.pendingCommand}`);
      this.processVoiceCommand(this.pendingCommand);
      this.pendingCommand = '';
      this.updateStatusBar('ready');
    }
  }

  public cancelPendingCommand() {
    outputChannel.appendLine(`[DEBUG] Canceling command: ${this.pendingCommand}`);
    this.pendingCommand = '';
    this.updateStatusBar('ready');
  }

  private handleVoiceError(error: string) {
    outputChannel.appendLine(`Voice Error: ${error}`);
    
    if (error === 'not-allowed' || error === 'microphone-permission-denied') {
      vscode.window.showErrorMessage(
        'VSCode webview blocks microphone access. This is a known limitation.',
        'Use Test Button',
        'Try External Browser'
      ).then(selection => {
        if (selection === 'Use Test Button') {
          vscode.window.showInformationMessage('Click "Test Voice Command" in the voice panel to simulate commands.');
        } else if (selection === 'Try External Browser') {
          vscode.window.showInformationMessage('For real voice input, we need an alternative approach outside webview.');
        }
      });
    } else if (error === 'webview-microphone-blocked') {
      vscode.window.showWarningMessage(
        'VSCode webview security blocks microphone access. Use the "Test Voice Command" button to simulate voice input.',
        'Got it'
      );
    } else {
      vscode.window.showErrorMessage(`Voice recognition error: ${error}`);
    }
  }

  private processVoiceCommand(command: string) {
    outputChannel.appendLine(`Processing command: ${command}`);
    
    // Basic command processing - this will be expanded
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      vscode.window.showInformationMessage('Hello! Voice Vibe Coding is listening.');
    } else if (lowerCommand.includes('create') && lowerCommand.includes('function')) {
      this.createFunction(command);
    } else if (lowerCommand.includes('add') && lowerCommand.includes('comment')) {
      this.addComment(command);
    } else {
      // For now, just show the recognized text
      vscode.window.showInformationMessage(`Recognized: "${command}"`);
      outputChannel.appendLine(`Command not yet implemented: ${command}`);
    }
  }

  private createFunction(command: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor found');
      return;
    }

    // Simple function creation - will be enhanced with AI integration
    const functionTemplate = `function newFunction() {
    // TODO: Implement function based on: ${command}
}

`;
    
    const position = editor.selection.active;
    editor.edit(editBuilder => {
      editBuilder.insert(position, functionTemplate);
    });
    
    vscode.window.showInformationMessage('Function template created!');
  }

  private addComment(command: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor found');
      return;
    }

    const comment = `// ${command.replace(/add comment/i, '').trim()}
`;
    const position = editor.selection.active;
    
    editor.edit(editBuilder => {
      editBuilder.insert(position, comment);
    });
    
    vscode.window.showInformationMessage('Comment added!');
  }

  public dispose() {
    outputChannel.appendLine('[DEBUG] Disposing VoiceInputManager');
    
    if (this.webviewPanel) {
      this.webviewPanel.dispose();
    }
    
    if (this.statusBarItem) {
      this.statusBarItem.dispose();
    }
    
    this.isDisposed = true;
    this.isListening = false;
  }

}

export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel('Voice Vibe Coding');
  voiceInputManager = new VoiceInputManager(context);

  let helloDisposable = vscode.commands.registerCommand('voiceVibeCoding.helloWorld', () => {
    vscode.window.showInformationMessage('Voice Vibe Coding extension is active!');
    outputChannel.appendLine('Hello World command executed');
    outputChannel.show();
  });

  let startVoiceDisposable = vscode.commands.registerCommand('voiceVibeCoding.startVoiceCoding', () => {
    if (voiceInputManager) {
      vscode.window.showInformationMessage('🎤 Voice Vibe Coding: Starting voice recognition...');
      outputChannel.appendLine('Starting voice coding session');
      outputChannel.show();
      voiceInputManager.startVoiceCoding();
    }
  });

  let stopVoiceDisposable = vscode.commands.registerCommand('voiceVibeCoding.stopVoiceCoding', () => {
    if (voiceInputManager) {
      outputChannel.appendLine('Stopping voice coding session');
      voiceInputManager.stopVoiceCoding();
    }
  });

  let confirmCommandDisposable = vscode.commands.registerCommand('voiceVibeCoding.confirmCommand', () => {
    if (voiceInputManager) {
      voiceInputManager.confirmPendingCommand();
    }
  });

  context.subscriptions.push(
    helloDisposable, 
    startVoiceDisposable,
    stopVoiceDisposable,
    confirmCommandDisposable,
    outputChannel
  );
}

export function deactivate() {
  if (voiceInputManager) {
    voiceInputManager.dispose();
  }
  if (outputChannel) {
    outputChannel.dispose();
  }
}
