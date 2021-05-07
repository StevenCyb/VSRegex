import * as vscode from 'vscode';

/**
 * Registers the explain command.
 * @returns {vscode.Disposable} Disposable of the registered command
 */
export function ExplainCommand(): vscode.Disposable {
  return vscode.commands.registerCommand('vsregex.explain', () => {
    vscode.window.showInformationMessage('Dummy - Not implemented yet');
  });
}