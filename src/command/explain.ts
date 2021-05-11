import * as vscode from 'vscode';
import { RegexHandler } from "../regex-handler";
import { SidebarProvider } from '../webview/sidebar';
import { ExplainProvider } from '../webview/explain';

// Create reference to currently shown webview
let explainProvider: ExplainProvider | undefined = undefined;

/**
 * Registers the explain command.
 * @param {vscode.ExtensionContext}
 * @param {RegexHandler}
 * @param {SidebarProvider}
 * @returns {vscode.Disposable} Disposable of the registered command
 */
export function ExplainCommand(context:vscode.ExtensionContext, regexHandler:RegexHandler, sidebarProvider:SidebarProvider): vscode.Disposable {
  return vscode.commands.registerCommand('vsregex.explain', () => {
    if(sidebarProvider == undefined || 
        sidebarProvider.webviewView == undefined || 
        !sidebarProvider.webviewView.visible) {
      vscode.window.showErrorMessage('This feature only work when the sidebar is selected');
      return;
    }

    if(regexHandler.regexString.length == 0) {
      vscode.window.showErrorMessage('No regex to explain');
      return;
    }

    const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

    if (explainProvider && explainProvider.webviewView) {
      explainProvider.reveal(columnToShowIn);
    } else {
      explainProvider = new ExplainProvider(
        context,
        regexHandler,
        columnToShowIn
      );
    }
  });
}