const tsVscode = acquireVsCodeApi();

var search = document.getElementById('search'),
    content = document.getElementById('content');

for(var i=0; i < hintsData.length; i++) {
  var wrapper = document.createElement('div');
  wrapper.classList.add('hint-wrapper');
  content.appendChild(wrapper);
  hintsData[i].ref = wrapper;

  hintsData[i].searchable = hintsData[i].title.toLowerCase();
  var title = document.createElement(hintsData[i].isSeparator ? 'h2' : 'h3');
  title.innerHTML = hintsData[i].title;
  title.classList.add('hint-title');
  wrapper.appendChild(title);

  if(hintsData[i].isSeparator) {
    continue;
  }

  var tags = document.createElement('div');
  tags.classList.add('hint-tags-wrapper');
  wrapper.appendChild(tags);

  for(var j=0; j < hintsData[i].tags.length; j++) {
    hintsData[i].searchable += ' ' + hintsData[i].tags[j].toLowerCase();

    var tag = document.createElement('span');
    tag.classList.add('hint-tag');
    tag.innerHTML = hintsData[i].tags[j];
    tags.appendChild(tag);

    tag.addEventListener('click', function(e) {
      search.value = 
        (search.value.trim() == '' ? '' : search.value + ' ') +
        e.currentTarget.innerHTML;
        
      filter();
    });
  }

  hintsData[i].searchable += ' ' + hintsData[i].description.toLowerCase();
  var description = document.createElement('div');
  description.innerHTML = hintsData[i].description;
  description.classList.add('hint-description');
  wrapper.appendChild(description);

  var expression = document.createElement('div');
  expression.innerHTML = 
    `<span class="bold">Example-Expression:</span><br>${
      hintsData[i].expression
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
    }<br><span class="bold">Result (/.../gm):</span><br>${
      hintsData[i].example.join('<br>')
    }`;
  expression.classList.add('hint-expression');

  wrapper.appendChild(expression);
}

function filter() {
  var therms = search.value.toLowerCase().split(' '),
      lastGroupTitle = null;

  for(var i=0; i < hintsData.length; i++) {
    hintsData[i].ref.style.display = hintsData[i].isSeparator ? 'none' : 'block';

    if(hintsData[i].isSeparator) {
      lastGroupTitle = hintsData[i].ref;
      continue;
    }

    for(var j=0; j < therms.length; j++) {
      if(!hintsData[i].searchable.includes(therms[j])) {
        hintsData[i].ref.style.display = 'none';
        break;
      }
    } 
    
    if(lastGroupTitle != null && hintsData[i].ref.style.display == 'block') {
      lastGroupTitle.style.display = 'block';
      lastGroupTitle = null;
    }
  }
}

search.addEventListener('input', filter);