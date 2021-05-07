import * as vscode from 'vscode';
import { SidebarProvider } from "./webview/sidebar";
import { RegexHandler } from "./regex-handler";
import { ExplainCommand } from "./command/explain";

/**
 * Is called on extension activate.
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context);
	const regexHandler = new RegexHandler(context, sidebarProvider);

	sidebarProvider.setRegexHandler(regexHandler);

	// Register commands
	context.subscriptions.push(ExplainCommand());

	// Register sidebar
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('vsregex-sidebar', sidebarProvider)
  );
}

/**
 * Is called on extension deactivate.
 */
export function deactivate() {}