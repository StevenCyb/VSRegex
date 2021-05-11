import * as vscode from 'vscode';
import * as utils from './utils';
import { RegexHandler } from "../regex-handler";

/**
 * Webview content provider for explain view.
 */
export class ExplainProvider {
  webviewView?: vscode.WebviewPanel;

  /**
   * Constructor of the class.
   * @param {vscode.ExtensionContext}
   * @param {vscode.ViewColumn}
   * @param {RegexHandler}
   * @param {SidebarProvider}
   */ 
  constructor(private context:vscode.ExtensionContext, 
    private regexHandler:RegexHandler, 
      columnToShowIn?:vscode.ViewColumn) {
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

    this.webviewView.webview.onDidReceiveMessage(async (data) => {
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
    placeholderValues.set('explain.css', utils.getAssetURI(this.context, this.webviewView.webview, 'explain.css'));
    placeholderValues.set('regexper-lib.js', utils.getAssetURI(this.context, this.webviewView.webview, 'regexper-lib.js'));
    placeholderValues.set('explain.js', utils.getAssetURI(this.context, this.webviewView.webview, 'explain.js'));
    placeholderValues.set('csp.source', this.webviewView.webview.cspSource);
    placeholderValues.set('regex_string', this.regexHandler.regexString);

    this.webviewView.webview.html = utils.getHTML(this.context, 'explain.html', placeholderValues);
  }
}