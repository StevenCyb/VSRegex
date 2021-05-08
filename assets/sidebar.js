const tsVscode = acquireVsCodeApi();

var regexOptionG = document.getElementById('regex-option-g');
var regexOptionI = document.getElementById('regex-option-i');
var regexOptionM = document.getElementById('regex-option-m')
var regexOptionU = document.getElementById('regex-option-u')
var regexOptionS = document.getElementById('regex-option-s');
var regexOptionY = document.getElementById('regex-option-y');
var regexInput = document.getElementById('regex-input');

var webviewError = document.getElementById('webview-error');
var resultTree = document.getElementById('result-tree');

regexInput.addEventListener('input', update);
regexOptionG.addEventListener('change', update);
regexOptionI.addEventListener('change', update);
regexOptionM.addEventListener('change', update);
regexOptionU.addEventListener('change', update);
regexOptionS.addEventListener('change', update);
regexOptionY.addEventListener('change', update);

let updateTimeout = null;
function update() {
  clearTimeout(updateTimeout);

  var value = regexInput.value;
  var options = (regexOptionG.checked ? 'g' : '') +
                (regexOptionI.checked ? 'i' : '') +
                (regexOptionM.checked ? 'm' : '') +
                (regexOptionU.checked ? 'u' : '') +
                (regexOptionS.checked ? 's' : '') +
                (regexOptionY.checked ? 'y' : '');

  updateTimeout = setTimeout(function() {
    webviewError.innerHTML = '';

    if(options == '') {
      resultTree.innerHTML = '';
      tsVscode.postMessage({type: 'clearRegex'});
      webviewError.innerHTML = 'Select at least on checkbox option';
      return; 
    }

    if(value == "") {
      resultTree.innerHTML = '';
      tsVscode.postMessage({type: 'clearRegex'});
      return; 
    }
  
    var err = checkRegExp(value, options);
    if(err != null) {
      webviewError.innerHTML = err;
      return;
    }

    tsVscode.postMessage({type: 'updateRegex', regex: value, options: options});
  }, 500);
}

function checkRegExp(regexString, options) {
  try {
    return new Function(`
      "use strict";
      try {
          new RegExp('${regexString}', '${options}');
          return null;
      } catch (e) {
          return e;
      }
    `)();
  } catch(e) {
      return e;
  }
}

window.addEventListener('message', event => {
  switch (event.data.type) {
    case 'documentMatches':
      var newResultTreeContent = '';
      event.data.data.forEach(element => {
        var filename = String(element.filename);
        if(filename.indexOf('/') != -1) {
          filename = filename.split('/').pop();
        } else {
          filename = filename.split('\\').pop();
        }

        newResultTreeContent += `<li>`;
        newResultTreeContent += `<span class="tree-title tree-title-down">${filename}</span>`;
        newResultTreeContent += `<ul class="nested active">`;
        for(var mi = 0; mi < element.matches.length; mi++) {
          newResultTreeContent += `<li>`;
          newResultTreeContent += `<span class="tree-title tree-title-down">Match[${mi}]</span>`;
          newResultTreeContent += `<ul class="nested active">`;
          for(var gi = 0; gi < element.matches[mi].length; gi++) {
            newResultTreeContent += `<li>`;
            newResultTreeContent += `<span class="tree-title tree-title-down">Group[${gi}]</span>`;
            newResultTreeContent += `<ul class="nested active">`;
            newResultTreeContent += `<li><input readonly type="text" value="${element.matches[mi][gi]}"></li>`;
            newResultTreeContent += `</ul>`;
            newResultTreeContent += `</li>`;
          }
          newResultTreeContent += `</ul>`;
          newResultTreeContent += `</li>`;
        }
        newResultTreeContent += `</ul>`;
        newResultTreeContent += `</li>`;
      });

      resultTree.innerHTML = newResultTreeContent;
      var toggleElements = document.getElementsByClassName('tree-title');
      for(var i=0; i < toggleElements.length; i++) {
        toggleElements[i].addEventListener('click', function() {
          this.parentElement.querySelector('.nested').classList.toggle('active');
          this.classList.toggle('tree-title-down');
        });
      }
      break;
  }
});