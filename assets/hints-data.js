var hintsData = [];

function createEntry(title, tags, description, expression) {
  hintsData.push({
    title: title,
    tags: tags,
    description: description,
    expression: expression,
    ref: null,
    searchable: ''
  });
}

createEntry('Common', ['h1', 'header'], 'This is h1 test', '(<h1>)([^<])(</h1>)')
createEntry('Common', ['h2', 'header'], 'This is h2 test', '(<h2>)([^<])(</h2>)')
createEntry('Common', ['h2', 'media'], 'This is image test', '(<img).*(src=)')