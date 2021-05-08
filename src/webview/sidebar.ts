import * as vscode from 'vscode';
import * as utils from './utils';
import { RegexHandler } from "../regex-handler";

/**
 * Webview content provider for sidebar.
 * @implements {vscode.WebviewViewProvider}
 */
export class SidebarProvider implements vscode.WebviewViewProvider {
  webviewView?: vscode.WebviewView;
  regexHandler?:RegexHandler

  /**
   * Constructor of the class.
   * @param {vscode.ExtensionContext}
   * @param {RegexHandler}
   */ 
  constructor(private context:vscode.ExtensionContext) {}

  /**
   * Setter for regex handler.
   * @param {RegexHandler}
   */ 
  public setRegexHandler(regexHandler:RegexHandler) {
    this.regexHandler = regexHandler;
  }

  /**
   * More like initialization of the webview.
   * @param {vscode.WebviewView}
   */ 
  public resolveWebviewView(webviewView: vscode.WebviewView) {
    const placeholderValues = new Map<string, any>();
    placeholderValues.set('reset.css', utils.getAssetURI(this.context, webviewView, 'reset.css'));
    placeholderValues.set('vscode.css', utils.getAssetURI(this.context, webviewView, 'vscode.css'));
    placeholderValues.set('sidebar.css', utils.getAssetURI(this.context, webviewView, 'sidebar.css'));
    placeholderValues.set('csp.source', webviewView.webview.cspSource);
    placeholderValues.set('sidebar.js', utils.getAssetURI(this.context, webviewView, 'sidebar.js'));
    
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = utils.getHTML(this.context, 'sidebar.html', placeholderValues);

    this.webviewView = webviewView;


    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'clearRegex': {
          if(this.regexHandler != undefined) {
            this.regexHandler.clear()
          }
          break;
        }
        case 'updateRegex': {
          if (!data.regex) {
            return;
          }
          if (!data.options) {
            return;
          }

          if(this.regexHandler != undefined) {
            this.regexHandler.Set(data.regex, data.options)
          }
          break;
        }
        case 'onError': {
          if (!data.message) {
            return;
          }
          vscode.window.showErrorMessage(data.message);
          break;
        }
      }
    });
  }
}