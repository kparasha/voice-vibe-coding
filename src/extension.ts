import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel('Voice Vibe Coding');

  let helloDisposable = vscode.commands.registerCommand('voiceVibeCoding.helloWorld', () => {
    vscode.window.showInformationMessage('Voice Vibe Coding extension is active!');
  });

  let startVoiceDisposable = vscode.commands.registerCommand('voiceVibeCoding.startVoiceCoding', () => {
    vscode.window.showInformationMessage('Voice Vibe Coding: Listening for voice commands...');
    outputChannel.appendLine('Voice Vibe Coding: Ready to receive voice input.');
    outputChannel.show();
    // Future: Integrate speech-to-text here
  });

  context.subscriptions.push(helloDisposable, startVoiceDisposable, outputChannel);
}

export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}
