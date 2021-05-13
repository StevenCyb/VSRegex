var hintsData = [];

function createEntry(
    isSeparator, 
    title, 
    tags=[], 
    description='', 
    expression='', 
    example=[]) {
  hintsData.push({
    isSeparator: isSeparator,
    title: title,
    tags: tags,
    description: description,
    expression: expression,
    example: example,
    ref: null,
    searchable: ''
  });
}

function bold(s) {
  s = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  return `<span class="bold">${s}</span>`;
}

function highlight(s) {
  return `<span class="highlight">${s}</span>`;
}

// Anchors
createEntry(true, 'Anchors');
createEntry(
  false, 'Start of match',
  ['anchor', 'start', 'match'],
  highlight(bold('\\G')) + ' Forces the pattern to only return matches that are part of a continuous chain of matches. From the first match each subsequent match must be preceded by a match. If you break the chain the matches end.',
  '\\G[0-9]',
  [highlight('123') + ' example'],
);
createEntry(
  false, 'Start of string',
  ['anchor', 'start', 'string'],
  highlight(bold('^')) + ' Force the start of a string without consuming any character. This matches immediately after newline, if ' + bold('/m') + ' (multiline) mode is used.',
  '^abc',
  [highlight('abc') + 'de', 'dabc'],
);
createEntry(
  false, 'End of string',
  ['anchor', 'end', 'string'],
  highlight(bold('$')) + ' Force the end of a string without consuming any character. This matches immediately before newline, if ' + bold('/m') + ' (multiline) mode is used.',
  'xyz$',
  ['dabc...' + highlight('xyz') , 'dabc...xyz0'],
);
createEntry(
  false, 'Start of string',
  ['anchor', 'start', 'string'],
  highlight(bold('\\A')) + ' Force the start of a string without consuming any character. This has no affect on ' + bold('/m') + ' (multiline) mode.',
  '\\Aabc',
  [highlight('abc') + 'de', 'abc', 'abcde'],
);
createEntry(
  false, 'End of string',
  ['anchor', 'end', 'string'],
  highlight(bold('\\Z')) + ' Force the end of a string without consuming any character. This has no affect on ' + bold('/m') + ' (multiline) mode.',
  'bc\\Z',
  ['abc', 'abcde', 'a' + highlight('bc')],
);
createEntry(
  false, 'Absolute end of string',
  ['anchor', 'end', 'string'],
  highlight(bold('bc\\z')) + ' Force the end of a string without consuming any character. This has no affect on ' + bold('/m') + ' (multiline) mode and will not match before a trailing newline at the end.',
  'bc\\z',
  ['abc', 'a' + highlight('bc')],
);
createEntry(
  false, 'Word boundary',
  ['anchor', 'word', 'boundary'],
  highlight(bold('\\b')) + ' Matches, without consuming any letters between a character matched by ' + bold('\\w') + ' and a character not matched by ' + bold('\\w') + '.',
  '\\w\\b',
  ['a' + highlight('b') + ' cd' + highlight('e'), 'abcde'],
);
createEntry(
  false, 'Non-Word boundary',
  ['anchor', 'non', 'word', 'boundary'],
  highlight(bold('\\B')) + ' Matches, without consuming any letters between two letters matched by ' + bold('\\w') + '.',
  '\\w\\B',
  ['a' + highlight('b') + ' cd' + highlight('e'), 'abcde'],
);


// Character classes
createEntry(true, 'Classes');
createEntry(
  false, 'Letters of set',
  ['letter', 'classes', 'set'],
  highlight(bold('[abc]')) + ' Match letters included in set.',
  '[abc]',
  [highlight('ab c') + 'de', highlight('cba') + 'zxy'],
);
createEntry(
  false, 'Letters expect set',
  ['letter', 'classes', 'expect', 'set'],
  highlight(bold('[^abc]')) + ' Match letters not included in set.',
  '[^abc]',
  ['ab' + highlight('1') + 'c' + highlight('de')],
);
createEntry(
  false, 'Letters in range',
  ['letter', 'classes', 'range'],
  highlight(bold('[a-z]')) + ' Match letters that are in (including) range.',
  '[a-d]',
  [highlight('ab cd') + 'e', highlight('cba') + 'zxy'],
);
createEntry(
  false, 'Letters expect range',
  ['letter', 'classes', 'expect', 'range'],
  highlight(bold('[^a-z]')) + ' Match letters that are not in (including) range.',
  '[^a-d]',
  ['ab' + highlight('1') + 'cd' + highlight('e'), 'cba' + highlight('zxy')],
);
createEntry(
  false, 'Combined character range',
  ['combined', 'letter', 'classes', 'range'],
  highlight(bold('[a-zA-Z0-9]')) + ' Match letters and number that are in (including) range ' + bold('a-z') + ', ' + bold('A-Z') + ' or ' + bold('0-9') + '. This can be combined as required e.g. ' + bold('[0-18-9]') + ' will match ' + bold('0') + ',' + bold('1') + ', ' + bold('8') + ' and ' + bold('9') + '.',
  '[a-bC-D0-1]',
  [highlight('ab1') + 'cde' + highlight('C'), 'c' + highlight('ba') + 'z24' + highlight('D') + 'xy'],
);
createEntry(
  false, 'Numbers of set',
  ['number', 'classes', 'set'],
  highlight(bold('[123]')) + ' Match numbers included in set.',
  '[123]',
  [highlight('12 3') + '45', highlight('321') + '987'],
);
createEntry(
  false, 'Numbers expect set',
  ['number', 'classes', 'single', 'expect', 'set'],
  highlight(bold('[^abc]')) + ' Match numbers not included in set.',
  '[^123]',
  ['12' + highlight('a') + '3' + highlight('45')],
);
createEntry(
  false, 'Numbers in range',
  ['number', 'classes', 'range'],
  highlight(bold('[a-z]')) + ' Match numbers that are in (including) range.',
  '[0-3]',
  [highlight('01 23') + '4', highlight('23') + '4v'],
);
createEntry(
  false, 'Numbers expect range',
  ['number', 'classes', 'expect', 'range'],
  highlight(bold('[^0-9]')) + ' Match numbers that are not in (including) range.',
  '[^0-3]',
  ['01' + highlight('a') + '23' + highlight('4'), '321' + highlight('987')],
);
createEntry(
  false, 'Letters and digits',
  ['letter', 'letter', 'digits', 'classes'],
  highlight(bold('[[:alnum:]]')) + ' Match any letter and digit, alternative to ' + bold('[a-zA-Z0-9]') + '.',
  '[[:alnum:]]',
  [highlight('0') + '.' + highlight('a') + '-' + highlight('2') + '_' + highlight('b') + '#'],
);
createEntry(
  false, '',
  ['letter', 'classes'],
  highlight(bold('')) + ' .',
  '',
  [],
);



// TODO Flags/Modifiers
// TODO general tokens
// TODO Group Contructs
// TODO meta sequence
// TODO quantifiers
// TODO Substitution

// TODO common

/*
createEntry(true, '');
createEntry(
  false, '',
  [],
  bold('') + ' .',
  '',
  [],
);
*/