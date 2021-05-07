import * as vscode from 'vscode';
import * as config from './configuration';
import { SidebarProvider } from './webview/sidebar';

/**
 * Webview content provider for sidebar.
 * @implements {vscode.WebviewViewProvider}
 */
export class RegexHandler {
  regex?:RegExp; 
  decorationType:vscode.TextEditorDecorationType; 

  /**
   * Constructor of the class.
   * @param {vscode.ExtensionContext}
   */ 
   constructor(context:vscode.ExtensionContext, private sidebarProvider:SidebarProvider) {
    const configMap = config.ConfigurationToMap();
    this.decorationType = vscode.window.createTextEditorDecorationType({
      backgroundColor: configMap.get('backgroundColor'),
      color: configMap.get('color'),
      outlineColor: configMap.get('outlineColor'),
      outlineStyle: configMap.get('outlineStyle'),
      outlineWidth: configMap.get('outlineWidth')
    });

    // Fires when configuration changed
    context.subscriptions.push(
      vscode.workspace.onDidChangeConfiguration((e) => {
        this.clear();
        this.onDocumentChanged(null);
      })
    );

    // Fires when the active editor has changed
    context.subscriptions.push(
      vscode.window.onDidChangeActiveTextEditor((textEditor) => {
        if(textEditor && textEditor.document) {
          this.onDocumentChanged(textEditor.document);
        }
      })
    );

    // Fires when a text document is changed (content or dirty-state)
    context.subscriptions.push(
      vscode.workspace.onDidChangeTextDocument((textEditorChangeEvent) => {
        if(textEditorChangeEvent && textEditorChangeEvent.document) {
          this.onDocumentChanged(textEditorChangeEvent.document);
        }
      })
    );

    // Fires when the array of visible editors has changed
    context.subscriptions.push(
      vscode.window.onDidChangeVisibleTextEditors((textEditorArray) => {
        for (let textEditor of textEditorArray) {
          if(textEditor && textEditor.document) {
            this.onDocumentChanged(textEditor.document);
          }
        }
      })
    );

    this.onDocumentChanged(null);
  }

  /**
   * Event that will be called when an visible editor was changed.
   * @param {vscode.TextDocument | null}
   */ 
  public onDocumentChanged(document:vscode.TextDocument | null) {
    if(this.sidebarProvider.webviewView == undefined || !this.sidebarProvider.webviewView.visible) {
      vscode.window.visibleTextEditors.map( editor => {
        editor.setDecorations(this.decorationType, []);
      });
      return;
    }
    
    var documentMatches: RegexMatch[] = []; 

    if(this.regex != undefined) {
      vscode.window.visibleTextEditors.map( editor => {
        var decorationsArray: vscode.DecorationOptions[] = [];

        if(document == null || document == editor.document) {
          var documentMatch = new RegexMatch(editor.document.fileName);
          const text = editor.document.getText();
          var match:RegExpExecArray|null;

          // I have checked for undefined before but the linter cannot perceive it...
          while(this.regex != undefined && (match = this.regex.exec(text)) !== null && match.index !== undefined) {
            var range = new vscode.Range(
              editor.document.positionAt(match.index),
              editor.document.positionAt(match.index + match[0].length)
            );

            documentMatch.matches.push(match);
            decorationsArray.push({ range });
          }

          documentMatches.push(documentMatch);
          editor.setDecorations(this.decorationType, decorationsArray);
        }
      });

      this.sidebarProvider.webviewView.webview.postMessage({type: 'documentMatches', data: documentMatches});
    }
  }

  /**
   * Clear currently used regex.
   */
  public clear() {
    this.regex = undefined;
    vscode.window.visibleTextEditors.map( editor => {
      editor.setDecorations(this.decorationType, []);
    });
  }

  /**
   * Set a new regex string.
   * @param {string}
   */ 
  public Set(regexString:string, options:string) {
    try {
      this.regex = new RegExp(regexString, options);
      
      this.onDocumentChanged(null);
    } catch(e) {
      vscode.window.showErrorMessage(`Regex "${regexString}" is invalid`);
      this.regex = undefined;
    }
  }
}

export class RegexMatch{
  matches:RegExpExecArray[];

  /**
   * Constructor of the class.
   * @param {string}
   */ 
  constructor(public filename:string) {
    this.matches = [];
  }
}