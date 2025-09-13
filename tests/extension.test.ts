import * as assert from 'assert';
import * as vscode from 'vscode';

describe('Voice Vibe Coding Extension', () => {
  it('should be present', () => {
    const extension = vscode.extensions.getExtension('voice-vibe-coding');
    assert.ok(extension);
  });
});
