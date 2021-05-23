// Create instance of vs code api
const tsVscode = acquireVsCodeApi();

// Create reference to existing html elements
var regexOptionG = document.getElementById('regex-option-g'),
    regexOptionI = document.getElementById('regex-option-i'),
    regexOptionM = document.getElementById('regex-option-m'),
    regexOptionU = document.getElementById('regex-option-u'),
    regexOptionS = document.getElementById('regex-option-s'),
    regexOptionY = document.getElementById('regex-option-y'),
    regexInput = document.getElementById('regex-input'),
    resultTree = document.getElementById('result-tree');

// Add listener to checkboxes to trigger update
regexInput.addEventListener('input', update);
regexOptionG.addEventListener('change', update);
regexOptionI.addEventListener('change', update);
regexOptionM.addEventListener('change', update);
regexOptionU.addEventListener('change', update);
regexOptionS.addEventListener('change', update);
regexOptionY.addEventListener('change', update);

// Do update if last interaction was after 500ms
let updateTimeout = null;
function update() {
  // Clear timeout if pending
  clearTimeout(updateTimeout);

  // Get regex values
  var value = regexInput.value;
  var options = (regexOptionG.checked ? 'g' : '') +
                (regexOptionI.checked ? 'i' : '') +
                (regexOptionM.checked ? 'm' : '') +
                (regexOptionU.checked ? 'u' : '') +
                (regexOptionS.checked ? 's' : '') +
                (regexOptionY.checked ? 'y' : '');

  // Set new timeout to prevent multiple calls on text input
  updateTimeout = setTimeout(function() {
    // Check if values are not empty
    if(options == '') {
      resultTree.innerHTML = '';
      tsVscode.postMessage({type: 'clearRegex'});
      tsVscode.postMessage({type: 'onError', message: 'Select at least on checkbox option'});
      return; 
    }

    if(value == '') {
      resultTree.innerHTML = '';
      tsVscode.postMessage({type: 'clearRegex'});
      return; 
    }

    // Send regex data to extension
    tsVscode.postMessage({type: 'updateRegex', regex: value, options: options});
  }, 500);
}

// Listen for incoming messages
window.addEventListener('message', event => {
  switch (event.data.type) {
    case 'setExpression':
      regexInput.value = event.data.data;
      update();
    break;
    case 'documentMatches':
      if(event.data.data.forEach == undefined) {
        return;
      }

      // Display matches
      var newResultTreeContent = '';

      // Loop through matches
      event.data.data.forEach(element => {
        var filename = String(element.filename);
        if(filename.indexOf('/') != -1) {
          filename = filename.split('/').pop();
        } else {
          filename = filename.split('\\').pop();
        }

        // Create tree view out of match 
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

      // Add toggle listener to tree title elements
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

// Request stored expression
tsVscode.postMessage({type: 'getExpression'});