import * as vscode from 'vscode';
import * as utils from './utils';

/**
 * Webview content provider for hints view.
 */
export class HintsProvider {
  webviewView?: vscode.WebviewPanel;

  /**
   * Constructor of the class.
   * @param {vscode.ExtensionContext}
   * @param {vscode.ViewColumn}
   * @param {RegexHandler}
   * @param {SidebarProvider}
   */ 
  constructor(private context:vscode.ExtensionContext, columnToShowIn?:vscode.ViewColumn) {
    this.webviewView = vscode.window.createWebviewPanel(
      'VSRegex',
      'VSRegex',
      columnToShowIn || vscode.ViewColumn.One,
      {}
    );

    this.webviewView.webview.options = {
      enableScripts: true, 
      localResourceRoots: [this.context.extensionUri],
    };
    
    this.webviewView.onDidDispose(
      () => {
        this.webviewView = undefined;
      },
      null,
      context.subscriptions
    );

    this.webviewView.webview.onDidReceiveMessage(async (data:any) => {
      switch (data.type) {
        case 'onError': {
          if (!data.message) {
            return;
          }
          vscode.window.showErrorMessage(data.message);
          break;
        }
      }
    });

    this.updateContent();
  }
  
  /**
   * Function to handle review and update.
   * @param {vscode.ViewColumn}
   */ 
  public reveal(columnToShowIn?:vscode.ViewColumn) {
    if(!this.webviewView) {
      return;
    }

    this.webviewView.reveal(columnToShowIn);
    this.updateContent();
  }

  /**
   * Sets/Updates the content on the webview.
   */ 
  private updateContent() {
    if(!this.webviewView) {
      return;
    }

    const placeholderValues = new Map<string, any>();
    placeholderValues.set('reset.css', utils.getAssetURI(this.context, this.webviewView.webview, 'reset.css'));
    placeholderValues.set('vscode.css', utils.getAssetURI(this.context, this.webviewView.webview, 'vscode.css'));
    placeholderValues.set('hints.css', utils.getAssetURI(this.context, this.webviewView.webview, 'hints.css'));
    placeholderValues.set('hints.js', utils.getAssetURI(this.context, this.webviewView.webview, 'hints.js'));
    placeholderValues.set('hints-data.js', utils.getAssetURI(this.context, this.webviewView.webview, 'hints-data.js'));
    placeholderValues.set('csp.source', this.webviewView.webview.cspSource);

    this.webviewView.webview.html = utils.getHTML(this.context, 'hints.html', placeholderValues);
  }
}