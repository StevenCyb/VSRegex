import * as vscode from 'vscode';
import { RegexHandler } from "../regex-handler";
import { SidebarProvider } from '../webview/sidebar';
import { HintsProvider } from '../webview/hints';

// Create reference to currently shown webview
let hintProvider: HintsProvider | undefined = undefined;

/**
 * Registers the hints command.
 * @param {vscode.ExtensionContext}
 * @returns {vscode.Disposable} Disposable of the registered command
 */
export function HintsCommand(context:vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('vsregex.hints', () => {
    const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

    if (hintProvider && hintProvider.webviewView) {
      hintProvider.reveal(columnToShowIn);
    } else {
      hintProvider = new HintsProvider(context);
    }
  });
}