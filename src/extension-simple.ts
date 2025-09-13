import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel;
let voiceInputManager: VoiceInputManager | undefined;

// Simplified Voice Input Manager - No webview, just quick pick commands
class VoiceInputManager {
  private statusBarItem: vscode.StatusBarItem;
  private availableCommands = [
    { label: 'Create Function', command: 'create function', description: 'Insert a new function template' },
    { label: 'Add Comment', command: 'add comment', description: 'Add a comment at cursor' },
    { label: 'Create Variable', command: 'create variable', description: 'Declare a new variable' },
    { label: 'Add Console Log', command: 'console log', description: 'Add console.log statement' },
    { label: 'Create Class', command: 'create class', description: 'Insert a new class template' },
    { label: 'Add Import', command: 'add import', description: 'Add an import statement' }
  ];

  constructor(private context: vscode.ExtensionContext) {
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.statusBarItem.text = "🎤 Voice Vibe";
    this.statusBarItem.command = 'voiceVibeCoding.showCommands';
    this.statusBarItem.tooltip = 'Click to show voice commands';
    this.statusBarItem.show();
    outputChannel.appendLine('[INFO] Voice Vibe initialized - Simple command-based approach');
  }

  public async showCommands() {
    outputChannel.appendLine('[INFO] Showing available voice commands');
    
    const items = this.availableCommands.map(cmd => ({
      label: `$(megaphone) ${cmd.label}`,
      description: cmd.description,
      command: cmd.command
    }));
    
    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a voice command to execute',
      title: '🎤 Voice Vibe Commands'
    });
    
    if (selected) {
      outputChannel.appendLine(`[INFO] Executing command: ${selected.command}`);
      this.executeCommand(selected.command);
    }
  }

  private executeCommand(command: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor found');
      return;
    }
    
    const position = editor.selection.active;
    
    switch (command.toLowerCase()) {
      case 'create function':
        this.insertFunction(editor, position);
        break;
      case 'add comment':
        this.insertComment(editor, position);
        break;
      case 'create variable':
        this.insertVariable(editor, position);
        break;
      case 'console log':
        this.insertConsoleLog(editor, position);
        break;
      case 'create class':
        this.insertClass(editor, position);
        break;
      case 'add import':
        this.insertImport(editor, position);
        break;
      default:
        vscode.window.showInformationMessage(`Command executed: ${command}`);
    }
  }

  private insertFunction(editor: vscode.TextEditor, position: vscode.Position) {
    const functionTemplate = `function myFunction() {
    // TODO: Implement function logic
    
}`;
    
    editor.edit(editBuilder => {
      editBuilder.insert(position, functionTemplate);
    });
    
    vscode.window.showInformationMessage('Function template inserted!');
    outputChannel.appendLine('[SUCCESS] Function template inserted');
  }

  private insertComment(editor: vscode.TextEditor, position: vscode.Position) {
    const comment = '// TODO: Add your comment here';
    
    editor.edit(editBuilder => {
      editBuilder.insert(position, comment);
    });
    
    vscode.window.showInformationMessage('Comment added!');
    outputChannel.appendLine('[SUCCESS] Comment inserted');
  }

  private insertVariable(editor: vscode.TextEditor, position: vscode.Position) {
    const variable = 'const myVariable = ';
    
    editor.edit(editBuilder => {
      editBuilder.insert(position, variable);
    });
    
    vscode.window.showInformationMessage('Variable declaration inserted!');
    outputChannel.appendLine('[SUCCESS] Variable declaration inserted');
  }

  private insertConsoleLog(editor: vscode.TextEditor, position: vscode.Position) {
    const consoleLog = 'console.log();';
    
    editor.edit(editBuilder => {
      editBuilder.insert(position, consoleLog);
    });
    
    vscode.window.showInformationMessage('Console.log added!');
    outputChannel.appendLine('[SUCCESS] Console.log inserted');
  }

  private insertClass(editor: vscode.TextEditor, position: vscode.Position) {
    const classTemplate = `class MyClass {
    constructor() {
        // TODO: Initialize class
    }
    
    // TODO: Add methods
}`;
    
    editor.edit(editBuilder => {
      editBuilder.insert(position, classTemplate);
    });
    
    vscode.window.showInformationMessage('Class template inserted!');
    outputChannel.appendLine('[SUCCESS] Class template inserted');
  }

  private insertImport(editor: vscode.TextEditor, position: vscode.Position) {
    const importStatement = 'import {} from \'\';';
    
    editor.edit(editBuilder => {
      editBuilder.insert(position, importStatement);
    });
    
    vscode.window.showInformationMessage('Import statement added!');
    outputChannel.appendLine('[SUCCESS] Import statement inserted');
  }

  public dispose() {
    outputChannel.appendLine('[INFO] Disposing VoiceInputManager');
    
    if (this.statusBarItem) {
      this.statusBarItem.dispose();
    }
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

  let showCommandsDisposable = vscode.commands.registerCommand('voiceVibeCoding.showCommands', () => {
    if (voiceInputManager) {
      voiceInputManager.showCommands();
    }
  });

  // Keep the old command for backward compatibility
  let startVoiceDisposable = vscode.commands.registerCommand('voiceVibeCoding.startVoiceCoding', () => {
    if (voiceInputManager) {
      voiceInputManager.showCommands();
    }
  });

  context.subscriptions.push(
    helloDisposable, 
    showCommandsDisposable,
    startVoiceDisposable,
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
