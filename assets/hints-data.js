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
  false, 'Letters',
  ['letter', 'letter', 'classes'],
  highlight(bold('[[:alpha:]]')) + ' Match any letter, alternative to ' + bold('[a-zA-Z]') + '.',
  '[[:alpha:]]',
  ['0.' + highlight('a') + '-2_' + highlight('b') + '#'],
);
createEntry(
  false, 'ASCII code 0-127',
  ['ascii', '0', '127', 'classes'],
  highlight(bold('[[:ascii:]]')) + ' Match any character in the valid ASCII range, equivalent to ' + bold('[\\x00-\\x7F]') + '.',
  '[[:ascii:]]',
  [highlight('0.a-2_b#') + 'こんにちは'],
);
createEntry(
  false, 'Space or tab only',
  ['space', 'tab', 'classes'],
  highlight(bold('[[:blank:]]')) + ' Match any spaces and tabs, equivalent to ' + bold('[ \\t]') + '.',
  '[[:blank:]]',
  ['H' + highlight(' ') + 'E' + highlight('	 ') + 'L' + highlight(' ') + 'L' + highlight('	') + 'O'],
);
createEntry(
  false, 'Control characters',
  ['control', 'character', 'classes'],
  highlight(bold('[[:cntrl:]]')) + ' Match any characters that are used to control text (newline, tab, etc.). Equivalent to ' + bold('[ \\t]') + '.',
  '[[:cntrl:]]',
  ['H E' + highlight('	') + ' L L' + highlight('	') + 'O'],
);
createEntry(
  false, 'Decimal digits',
  ['decimal', 'number', 'digit', 'classes'],
  highlight(bold('[[:digit:]]')) + ' Match any decimal digit, equivalent to ' + bold('[0-9]') + '.',
  '[[:digit:]]',
  ['one=' + highlight('1') + ', two=' + highlight('2') + ' and three=' + highlight('3')],
);
createEntry(
  false, 'Visible characters',
  ['visible', 'printable', 'characters', 'classes'],
  highlight(bold('[[:graph:]]')) + ' Match printable character excluding non whitespace and control. Equivalent to ' + bold('[\\x21-\\x7E]') + '.',
  '[[:graph:]]',
  [highlight('one=1,') + ' ' + highlight('two=2') + ' ' + highlight('and') + ' ' + highlight('three=3')],
);
createEntry(
  false, 'Lowercase letters',
  ['lowercase', 'letters', 'classes'],
  highlight(bold('[[:lower:]]')) + ' Match any lowercase letter, equivalent to ' + bold('[a-z]') + '.',
  '[[:lower:]]',
  [highlight('one') + '=1, ' + highlight('two') + '=2 ' + highlight('and') + ' ' + highlight('three' + '=3')],
);
createEntry(
  false, 'Visible characters',
  ['printable', 'character', 'classes'],
  highlight(bold('[[:print:]]')) + ' Match printable character excluding control characters.',
  '[[:print:]]',
  [highlight('Number: 123')],
);
createEntry(
  false, 'Visible punctuation characters',
  ['visible', 'punctuation', 'character', 'classes'],
  highlight(bold('[[:punct:]]')) + ' Match visible characters that are not whitespace, letters or digits.',
  '[[:punct:]]',
  ['a1 ' + highlight('.:;,-_#+')],
);
createEntry(
  false, 'Whitespace',
  ['whitespace', 'space', 'tab', 'classes'],
  highlight(bold('[[:space:]]')) + ' Match space and tabs, equivalent to ' + bold('\\s') + '.',
  '[[:space:]]',
  ['ID' + highlight('	') + ':' + highlight(' ') + 'A2'],
);
createEntry(
  false, 'Uppercase letters',
  ['uppercase', 'letter', 'classes'],
  highlight(bold('[[:upper:]]')) + ' Match any uppercase letter, equivalent to ' + bold('[A-Zy]') + '.',
  '[[:upper:]]',
  ['ab1.' + highlight('ABC')],
);
createEntry(
  false, 'Word characters',
  ['word', 'letter', 'number', 'underscore', 'classes'],
  highlight(bold('[[:word:]]')) + ' Match any letters, numbers and underscores. Equivalent to ' + bold('\\w') + ' or ' + bold('[a-zA-Z0-9_]') + '.',
  '[[:word:]]',
  ['Something_New' + highlight(' #') + '123'],
);
createEntry(
  false, 'Hexadecimal digits',
  ['hexadecimal', 'digit', 'classes'],
  highlight(bold('[[:xdigit:]]')) + ' Match hexadecimal digits (case insensitive). Equivalent to ' + bold('[0-9a-fA-F]') + '.',
  '[[:xdigit:]]',
  ['T' + highlight('e') + 'l' + highlight('e') + 'kom ' + highlight('c') + 'olor is h' + highlight('e') + 'x = #' + highlight('e20074')],
);

createEntry(true, 'Flags and Modifiers');
createEntry(
  false, 'Global mode',
  ['flag', 'modifiers', 'global', 'mode'],
  highlight(bold('//g')) + ' Global mode - engine do not stop after the first match.',
  '/example/g',
  ['This ' + highlight('example') + ' is a simple ' + highlight('example') + '.'],
);
createEntry(
  false, 'Multiline mode',
  ['flag', 'modifiers', 'multiline', 'mode'],
  highlight(bold('//m')) + ' Multiline mode - engine evaluate each line respectively. With ' + bold('//g') + ' a beginning ' + bold('^') + ' will count for each line.',
  '/^\\d*/gm',
  [highlight('01234'), 'hello', highlight('123')],
);
createEntry(
  false, 'Case insensitive mode',
  ['flag', 'modifiers', 'case', 'insensitive', 'mode'],
  highlight(bold('//i')) + ' Case insensitive mode - engine do not interpret letter case.',
  '/[a-z]*/i',
  [highlight('exampleUPPERCASE')],
);
createEntry(
  false, 'Extended mode',
  ['flag', 'modifiers', 'extended', 'mode'],
  highlight(bold('//x')) + ' Extended mode - engine ignore whitespace. Space character can be used by escaping it e.g. ' + bold('"\ "') + '.',
  '/[a-z]*/x',
  [highlight('example') + ' ' + highlight('with') + ' ' + highlight('space')],
);
createEntry(
  false, 'Single line mode',
  ['flag', 'modifiers', 'single', 'line', 'mode'],
  highlight(bold('//s')) + ' Single line mode - engine let ' + bold('.') + ' (dot) match also newlines.',
  '/01.23/s',
  [highlight('01'), highlight('23'), '45'],
);
createEntry(
  false, 'Unicode mode',
  ['flag', 'modifiers', 'unicode', 'mode'],
  highlight(bold('//u')) + ' Pattern will be treated as UTF-16, so unicode will be included in ' + bold('[a-zA-Z]') + ' and ' + bold('\\w') + '.',
  '/\w*/gu',
  [highlight('hello') + ' ' + highlight('cześć')],
);
createEntry(
  false, 'Non-greedy mode',
  ['flag', 'non', 'greedy', 'mode'],
  highlight(bold('//U')) + ' Engine will do greedy instead of lazy matching.' + bold(' ') + '.',
  '/a+/U',
  [highlight('a') + 'aa'],
);
createEntry(
  false, 'Anchor mode',
  ['flag', 'anchor', 'mode'],
  highlight(bold('//A')) + ' Force pattern to become anchored at start or at the position of the last successful match. Equivalent to ' + bold('\\G') + '.',
  '/\\w*/Ag',
  [highlight('abc') + ' abc'],
);
createEntry(
  false, 'Duplicate group names mode',
  ['flag', 'duplicate', 'group', 'name', 'mode'],
  highlight(bold('//J')) + ' Allows to define duplicate pattern names. Each captured group still has its own ID.',
  '/(?<name>\\w*)(?<name>\\w*)/Jg',
  [highlight('first_name') + ' ' + highlight('second_name')],
);

createEntry(true, 'Modes');
createEntry(
  false, 'Newline',
  ['general', 'newline'],
  highlight(bold('\\n')) + ' Matches a newline character.',
  '',
  [''],
);
createEntry(
  false, 'Carriage return',
  ['general', 'carriage', 'return'],
  highlight(bold('\\r')) + ' Matches a carriage return (U+2185).',
  '',
  [''],
);
createEntry(
  false, 'Tab',
  ['general', 'tab'],
  highlight(bold('\\t')) + ' Matches a tab character.',
  '',
  [''],
);
createEntry(
  false, 'Null character',
  ['general', 'null', 'character'],
  highlight(bold('\\0')) + ' Matches a null character (U+2400).',
  '',
  [''],
);

createEntry(true, '');

// TODO Group Contructs
// TODO meta sequence
// TODO quantifiers
// TODO Substitution

// TODO common

/*
createEntry(true, '');
createEntry(
  false, '',
  ['letter', 'classes'],
  highlight(bold('')) + '' + bold(' ') + '.',
  '',
  [''],
);
*/