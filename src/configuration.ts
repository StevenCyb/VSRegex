import * as vscode from 'vscode';

/**
 * Convert hex + alpha to rgba.
 * @param {string}
 * @param {number}
 * @returns {string}
 */ 
function hexToRGB_A(hex:string, alpha:number): string {
  var rgbA = `rgba(${
    parseInt(hex.slice(1, 3), 16)
  },${
    parseInt(hex.slice(3, 5), 16)
  },${
    parseInt(hex.slice(5, 7), 16)
  }`;
  if(alpha > 0) {
    return rgbA + `,${alpha / 100})`;
  }
  return rgbA + ')';
}

/**
 * Return a map of settings value.
 * @returns {Map<string, string>}
 */ 
export function ConfigurationToMap(): Map<string, string> {
  var configMap = new Map<string, any>();
  
  configMap.set('backgroundColor', hexToRGB_A(
    String(vscode.workspace.getConfiguration('VSRegex').get('backgroundColor')),
    Number(vscode.workspace.getConfiguration('VSRegex').get('backgroundColorOpacity'))
  ));
  
  configMap.set('color', hexToRGB_A(String(vscode.workspace.getConfiguration('VSRegex').get('color')), -1));
  
  configMap.set('outlineColor', hexToRGB_A(
    String(vscode.workspace.getConfiguration('VSRegex').get('outlineColor')),
    Number(vscode.workspace.getConfiguration('VSRegex').get('outlineColorOpacity'))
  ));

  configMap.set('outlineStyle', String(vscode.workspace.getConfiguration('VSRegex').get('outlineStyle')));
  
  configMap.set('outlineWidth', String(vscode.workspace.getConfiguration('outlineWidth').get('outlineStyle')) + 'px');

  return configMap;
}