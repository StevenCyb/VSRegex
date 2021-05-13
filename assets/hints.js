const tsVscode = acquireVsCodeApi();

var search = document.getElementById('search'),
    content = document.getElementById('content');

for(var i=0; i < hintsData.length; i++) {
  hintsData[i].searchable = hintsData[i].title.toLowerCase();
  hintsData[i].searchable += ' ' + hintsData[i].description.toLowerCase();
  
  var wrapper = document.createElement('div');
  wrapper.classList.add('hint-wrapper');
  content.appendChild(wrapper);

  hintsData[i].ref = wrapper;

  var title = document.createElement('h2');
  title.innerHTML = hintsData[i].title;
  title.classList.add('hint-title');
  wrapper.appendChild(title);

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

  var description = document.createElement('div');
  description.innerHTML = hintsData[i].description;
  description.classList.add('hint-description');
  wrapper.appendChild(description);

  var expression = document.createElement('div');
  expression.innerHTML = hintsData[i].expression
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
    expression.classList.add('hint-expression');

  wrapper.appendChild(expression);
}

function filter() {
  var therms = search.value.toLowerCase().split(' ');

  for(var i=0; i < hintsData.length; i++) {
    hintsData[i].ref.style.display = 'block';

    for(var j=0; j < therms.length; j++) {
      if(!hintsData[i].searchable.includes(therms[j])) {
        hintsData[i].ref.style.display = 'none';
        break;
      }
    }
  }
}

search.addEventListener('input', filter);