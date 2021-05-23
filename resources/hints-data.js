var hintsData = [];

// Helper function to construct hint object
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
    }
  );
}

// Helper to colorize something in bold
function bold(s) {
  s = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  return `<span class="bold">${s}</span>`;
}

// Helper to colorize something highlighted
function highlight(s) {
  return `<span class="highlight">${s}</span>`;
}

// Helper to colorize something as comment
function comment(s) {
  return `<span class="comment">${s}</span>`;
}

// Now some stupid amount of hints
/*
 * Anchors
 */
createEntry(true, 'Anchors');
createEntry(
  false, 'Start of match',
  ['anchor', 'start', 'match'],
  highlight(bold('\\G')) + ' Forces the pattern to only return matches that are part of a continuous chain of matches. From the first match each subsequent match must be preceded by a match. If you break the chain the matches end.',
  '/\\G[0-9]/g',
  [highlight('123') + ' example'],
);
createEntry(
  false, 'Start of string',
  ['anchor', 'start', 'string'],
  highlight(bold('^')) + ' Force the start of a string without consuming any character. This matches immediately after newline, if ' + bold('/m') + ' (multiline) mode is used.',
  '/^abc/',
  [highlight('abc') + 'de', 'dabc'],
);
createEntry(
  false, 'End of string',
  ['anchor', 'end', 'string'],
  highlight(bold('$')) + ' Force the end of a string without consuming any character. This matches immediately before newline, if ' + bold('/m') + ' (multiline) mode is used.',
  '/xyz$/',
  ['dabc...' + highlight('xyz') , 'dabc...xyz0'],
);
createEntry(
  false, 'Start of string',
  ['anchor', 'start', 'string'],
  highlight(bold('\\A')) + ' Force the start of a string without consuming any character. This has no affect on ' + bold('/m') + ' (multiline) mode.',
  '/\\Aabc/g',
  [highlight('abc') + 'de', 'abc', 'abcde'],
);
createEntry(
  false, 'End of string',
  ['anchor', 'end', 'string'],
  highlight(bold('\\Z')) + ' Force the end of a string without consuming any character. This has no affect on ' + bold('/m') + ' (multiline) mode.',
  '/bc\\Z/',
  ['abc', 'abcde', 'a' + highlight('bc')],
);
createEntry(
  false, 'Absolute end of string',
  ['anchor', 'end', 'string'],
  highlight(bold('bc\\z')) + ' Force the end of a string without consuming any character. This has no affect on ' + bold('/m') + ' (multiline) mode and will not match before a trailing newline at the end.',
  '/bc\\z/',
  ['abc', 'a' + highlight('bc')],
);
createEntry(
  false, 'Word boundary',
  ['anchor', 'word', 'boundary'],
  highlight(bold('\\b')) + ' Matches, without consuming any letters between a character matched by ' + bold('\\w') + ' and a character not matched by ' + bold('\\w') + '.',
  '/\\w\\b/g',
  ['a' + highlight('b') + ' cd' + highlight('e'), 'abcd' + highlight('e')],
);
createEntry(
  false, 'Non-Word boundary',
  ['anchor', 'non', 'word', 'boundary'],
  highlight(bold('\\B')) + ' Matches, without consuming any letters between two letters matched by ' + bold('\\w') + '.',
  '/\\w\\B/g',
  ['a' + highlight('b') + ' cd' + highlight('e'), 'abcde'],
);


/*
 * Character classes
 */
createEntry(true, 'Classes');
createEntry(
  false, 'Letters of set',
  ['letter', 'classes', 'set'],
  highlight(bold('[abc]')) + ' Match letters included in set.',
  '/[abc]/g',
  [highlight('ab c') + 'de', highlight('cba') + 'zxy'],
);
createEntry(
  false, 'Letters expect set',
  ['letter', 'classes', 'expect', 'set'],
  highlight(bold('[^abc]')) + ' Match letters not included in set.',
  '/[^abc]/g',
  ['ab' + highlight('1') + 'c' + highlight('de')],
);
createEntry(
  false, 'Letters in range',
  ['letter', 'classes', 'range'],
  highlight(bold('[a-z]')) + ' Match letters that are in (including) range.',
  '/[a-d]/g',
  [highlight('ab cd') + 'e', highlight('cba') + 'zxy'],
);
createEntry(
  false, 'Letters expect range',
  ['letter', 'classes', 'expect', 'range'],
  highlight(bold('[^a-z]')) + ' Match letters that are not in (including) range.',
  '/[^a-d]/g',
  ['ab' + highlight('1') + 'cd' + highlight('e'), 'cba' + highlight('zxy')],
);
createEntry(
  false, 'Combined character range',
  ['combined', 'letter', 'classes', 'range'],
  highlight(bold('[a-zA-Z0-9]')) + ' Match letters and number that are in (including) range ' + bold('a-z') + ', ' + bold('A-Z') + ' or ' + bold('0-9') + '. This can be combined as required e.g. ' + bold('[0-18-9]') + ' will match ' + bold('0') + ',' + bold('1') + ', ' + bold('8') + ' and ' + bold('9') + '.',
  '/[a-bC-D0-1]/g',
  [highlight('ab1') + 'cde' + highlight('C'), 'c' + highlight('ba') + 'z24' + highlight('D') + 'xy'],
);
createEntry(
  false, 'Numbers of set',
  ['number', 'classes', 'set'],
  highlight(bold('[123]')) + ' Match numbers included in set.',
  '/[123]/g',
  [highlight('12 3') + '45', highlight('321') + '987'],
);
createEntry(
  false, 'Numbers expect set',
  ['number', 'classes', 'single', 'expect', 'set'],
  highlight(bold('[^abc]')) + ' Match numbers not included in set.',
  '/[^123]/g',
  ['12' + highlight('a') + '3' + highlight('45')],
);
createEntry(
  false, 'Numbers in range',
  ['number', 'classes', 'range'],
  highlight(bold('[a-z]')) + ' Match numbers that are in (including) range.',
  '/[0-3]/g',
  [highlight('01 23') + '4', highlight('23') + '4v'],
);
createEntry(
  false, 'Numbers expect range',
  ['number', 'classes', 'expect', 'range'],
  highlight(bold('[^0-9]')) + ' Match numbers that are not in (including) range.',
  '/[^0-3]/g',
  ['01' + highlight('a') + '23' + highlight('4'), '321' + highlight('987')],
);
createEntry(
  false, 'Letters and digits',
  ['letter', 'letter', 'digits', 'classes'],
  highlight(bold('[[:alnum:]]')) + ' Match any letter and digit, alternative to ' + bold('[a-zA-Z0-9]') + '.',
  '/[[:alnum:]]/g',
  [highlight('0') + '.' + highlight('a') + '-' + highlight('2') + '_' + highlight('b') + '#'],
);
createEntry(
  false, 'Letters',
  ['letter', 'letter', 'classes'],
  highlight(bold('[[:alpha:]]')) + ' Match any letter, alternative to ' + bold('[a-zA-Z]') + '.',
  '/[[:alpha:]]/g',
  ['0.' + highlight('a') + '-2_' + highlight('b') + '#'],
);
createEntry(
  false, 'ASCII code 0-127',
  ['ascii', '0', '127', 'classes'],
  highlight(bold('[[:ascii:]]')) + ' Match any character in the valid ASCII range, equivalent to ' + bold('[\\x00-\\x7F]') + '.',
  '/[[:ascii:]]/g',
  [highlight('0.a-2_b#') + 'こんにちは'],
);
createEntry(
  false, 'Space or tab only',
  ['space', 'tab', 'classes'],
  highlight(bold('[[:blank:]]')) + ' Match any spaces and tabs, equivalent to ' + bold('[ \\t]') + '.',
  '/[[:blank:]]/g',
  ['H' + highlight(' ') + 'E' + highlight('	 ') + 'L' + highlight(' ') + 'L' + highlight('	') + 'O'],
);
createEntry(
  false, 'Control characters',
  ['control', 'character', 'classes'],
  highlight(bold('[[:cntrl:]]')) + ' Match any characters that are used to control text (newline, tab, etc.). Equivalent to ' + bold('[ \\t]') + '.',
  '/[[:cntrl:]]/g',
  ['H E' + highlight('	') + ' L L' + highlight('	') + 'O'],
);
createEntry(
  false, 'Decimal digits',
  ['decimal', 'number', 'digit', 'classes'],
  highlight(bold('[[:digit:]]')) + ' Match any decimal digit, equivalent to ' + bold('[0-9]') + '.',
  '/[[:digit:]]/g',
  ['one=' + highlight('1') + ', two=' + highlight('2') + ' and three=' + highlight('3')],
);
createEntry(
  false, 'Visible characters',
  ['visible', 'printable', 'characters', 'classes'],
  highlight(bold('[[:graph:]]')) + ' Match printable character excluding non whitespace and control. Equivalent to ' + bold('[\\x21-\\x7E]') + '.',
  '/[[:graph:]]/g',
  [highlight('one=1,') + ' ' + highlight('two=2') + ' ' + highlight('and') + ' ' + highlight('three=3')],
);
createEntry(
  false, 'Lowercase letters',
  ['lowercase', 'letters', 'classes'],
  highlight(bold('[[:lower:]]')) + ' Match any lowercase letter, equivalent to ' + bold('[a-z]') + '.',
  '/[[:lower:]]/g',
  [highlight('one') + '=1, ' + highlight('two') + '=2 ' + highlight('and') + ' ' + highlight('three' + '=3')],
);
createEntry(
  false, 'Visible characters',
  ['printable', 'character', 'classes'],
  highlight(bold('[[:print:]]')) + ' Match printable character excluding control characters.',
  '/[[:print:]]/g',
  [highlight('Number: 123')],
);
createEntry(
  false, 'Visible punctuation characters',
  ['visible', 'punctuation', 'character', 'classes'],
  highlight(bold('[[:punct:]]')) + ' Match visible characters that are not whitespace, letters or digits.',
  '/[[:punct:]]/g',
  ['a1 ' + highlight('.:;,-_#+')],
);
createEntry(
  false, 'Whitespace',
  ['whitespace', 'space', 'tab', 'classes'],
  highlight(bold('[[:space:]]')) + ' Match space and tabs, equivalent to ' + bold('\\s') + '.',
  '/[[:space:]]/g',
  ['ID' + highlight('	') + ':' + highlight(' ') + 'A2'],
);
createEntry(
  false, 'Uppercase letters',
  ['uppercase', 'letter', 'classes'],
  highlight(bold('[[:upper:]]')) + ' Match any uppercase letter, equivalent to ' + bold('[A-Zy]') + '.',
  '/[[:upper:]]/g',
  ['ab1.' + highlight('ABC')],
);
createEntry(
  false, 'Word characters',
  ['word', 'letter', 'number', 'underscore', 'classes'],
  highlight(bold('[[:word:]]')) + ' Match any letters, numbers and underscores. Equivalent to ' + bold('\\w') + ' or ' + bold('[a-zA-Z0-9_]') + '.',
  '/[[:word:]]/g',
  ['Something_New' + highlight(' #') + '123'],
);
createEntry(
  false, 'Hexadecimal digits',
  ['hexadecimal', 'digit', 'classes'],
  highlight(bold('[[:xdigit:]]')) + ' Match hexadecimal digits (case insensitive). Equivalent to ' + bold('[0-9a-fA-F]') + '.',
  '/[[:xdigit:]]/g',
  ['T' + highlight('e') + 'l' + highlight('e') + 'kom ' + highlight('c') + 'olor is h' + highlight('e') + 'x = #' + highlight('e20074')],
);


/*
 * Flags and Modifiers
 */
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
  highlight(bold('//U')) + ' Engine will do greedy instead of lazy matching.',
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


/*
 * General Tokens
 */
createEntry(true, 'General Tokens');
createEntry(
  false, 'Newline',
  ['general', 'substitution', 'newline'],
  highlight(bold('\\n')) + ' Matches a newline character.',
  '', [],
);
createEntry(
  false, 'Carriage return',
  ['general', 'substitution', 'carriage', 'return'],
  highlight(bold('\\r')) + ' Matches a carriage return (U+2185).',
  '', [],
);
createEntry(
  false, 'Tab',
  ['general', 'substitution', 'tab'],
  highlight(bold('\\t')) + ' Matches a tab character.',
  '', [],
);
createEntry(
  false, 'Null character',
  ['general', 'null', 'character'],
  highlight(bold('\\0')) + ' Matches a null character (U+2400).',
  '', [],
);


createEntry(true, 'Group constructs');
createEntry(
  false, 'Non-capturing group',
  ['group', 'construct', 'non', 'capturing', 'group'],
  highlight(bold('(?:...)')) + ' Match a non-capturing group to apply quantifiers without capture/assign an ID.',
  '/(?:\\d{1,3}\\.){3}\\d{1,3}/',
  [highlight('127.0.0.1') + ' ' + comment('// single match without group')],
);
createEntry(
  false, 'Capturing group',
  ['group', 'construct', 'capturing', 'group'],
  highlight(bold('(...)')) + ' Isolates part of the full match to be later referred to by ID.',
  '/(ID: (\\d+))/',
  [highlight('ID: 123') + ' ' + comment('// 123 is captured in group 1')],
);
createEntry(
  false, 'Atomic group (non-capturing)',
  ['group', 'construct', 'atomic', 'non', 'capturing', 'group'],
  highlight(bold('(?>...)')) + ' Matches the longest possible substring in the non-capturing group.',
  '/atomic(?>.+)/',
  ['This is ' + highlight('atomic capturing')],
);
createEntry(
  false, 'Reset subpattern group number',
  ['group', 'construct', 'duplicate', 'reset', 'subpattern', 'number'],
  highlight(bold('(?|...)')) + ' Prevent all following enclosed capture group from incrementing ID.',
  '/(?|(a)|(b)|(c))/g',
  [highlight('a') + ' ' + highlight('b') + ' ' + highlight('c') + comment(' // three matches with a single group')],
);
createEntry(
  false, 'Named capturing group',
  ['group', 'construct', 'named', 'capturing', 'group'],
  highlight(bold('(?\'id\'...)')) + ' Give a capturing group an ' + bold('id') + '. Equivalent to ' + bold('(?<id>...)') + ' and ' + bold('(?P<id>...)'),
  '/(?\'age\'\\d+)/',
  ['My age is: ' + highlight('123') + comment(' // captured group has the id \'age\'')],
);
createEntry(
  false, 'Named capturing group',
  ['group', 'construct', 'named', 'capturing', 'group'],
  highlight(bold('(?<id>...)')) + ' Give a capturing group an ' + bold('id') + '. Equivalent to ' + bold('(?\'id\'...') + ' and ' + bold('(?P<id>...)'),
  '/(?<age>\\d+)/',
  ['My age is: ' + highlight('123') + comment(' // captured group has the id \'age\'')],
);
createEntry(
  false, 'Named capturing group',
  ['group', 'construct', 'named', 'capturing', 'group'],
  highlight(bold('(?P<id>...)')) + ' Give a capturing group an ' + bold('id') + '. Equivalent to ' + bold('(?\'id\'...') + ' and ' + bold('(?<id>...)'),
  '/(?P<age>\\d+)/',
  ['My age is: ' + highlight('123') + comment(' // captured group has the id \'age\'')],
);
createEntry(
  false, 'Inline modifiers for flags/modes',
  ['group', 'construct', 'inline', 'modifier', 'flag', 'mode'],
  highlight(bold('(?x)')) + ' or ' + highlight(bold('(?-x)')) + ' Modifies the flags/modes for a while expression. Where '  + bold('x')  + ' are any flag/mode. Unset can be done with a ' + bold('-') + ' prefix.',
  '/a(?i)b/g',
  [highlight('ab') + ' ' + highlight('aB')],
);
createEntry(
  false, 'Localized inline modifiers',
  ['group', 'construct', 'localized', 'inline', 'modifier', 'flag', 'mode'],
  highlight(bold('(?x:...)')) + ' or ' + highlight(bold('(?-x:...)')) + ' Modifies the flags/modes for enclosed expression. Where '  + bold('x')  + ' are any flag/mode. Unset can be done with a ' + bold('-') + ' prefix.',
  '/a(?i:b)c/g',
  [highlight('abc') + ' abC ' + highlight('aBc') + ' aBC'],
);
createEntry(
  false, 'Conditional statement',
  ['group', 'construct', 'conditional', 'statement'],
  highlight(bold('(?(n)x|y)')) + ' If the previously captured group ' + bold('n') + ' matches, the pattern ' + bold('x') + ' is matched. Otherwise, the pattern ' + bold('y') + ' is matched.',
  '/(Banana is )(?(1)fruit|vegetable)/',
  [highlight('Banana is fruit') + ' | vegetable.'],
);
createEntry(
  false, 'Recursive conditional statement',
  ['group', 'construct', 'recursive', 'conditional', 'statement'],
  highlight(bold('(?(R)x|y)')) + ' On a match of the full pattern, match ' + bold('x') + ' else ' + bold('y') + '.',
  '/<(?:(?(R)\\w+|[^<>]*)|(?R))*>/',
  [highlight('<tag a="1" b="2" <tag> />') + ' and not this >'],
);
createEntry(
  false, 'Lookahead condition',
  ['group', 'construct', 'lookahead', 'condition'],
  highlight(bold('(?(?=x)y|z)')) + ' If lookahead ' + bold('x') + ' succeeds, match ' + bold('y') + ' else ' + bold('z') + '. Global flag breaks conditionals.',
  '/(?(?=a)a fruit|or vegetable)/',
  ['Banana is ' + highlight('a fruit') + ' or vegetable'],
);
createEntry(
  false, 'Lookbehind condition',
  ['group', 'construct', 'lookbehind', 'condition'],
  highlight(bold('(?(?<=x)y|z)')) + ' If lookbehind  ' + bold('x') + ' succeeds, match ' + bold('y') + ' else ' + bold('z') + '. Global flag breaks conditionals.',
  '/(?(?<=a)a fruit|or vegetable)/',
  ['Banana is a fruit ' + highlight('or vegetable') + comment(' // of course it is not')],
);
createEntry(
  false, 'Recursive entire pattern',
  ['group', 'construct', 'recursive', 'entire', 'pattern'],
  highlight(bold('(?R)')) + ' Recursively match the entire expression.',
  '/<(?:[^<>]|(?R))+>/',
  [highlight('<tag empty="true"/><tag with="inner" <tag>/>') + comment(' // Match 1 contains "<tag empty="true"/>" and match 2 "<tag with="inner" <tag>/>"')],
);
createEntry(
  false, 'Recursive first pattern',
  ['group', 'construct', 'recursive', 'first', 'pattern'],
  highlight(bold('(?1)')) + ' Recursively match the first capture group.',
  '/(dogs).+(?1)/',
  [highlight('dogs like other dogs') + ' but not always cats' + comment(' // first group contains the first "dog" the second the second "dog"')],
);
createEntry(
  false, 'Recurse relative subpattern',
  ['group', 'construct', 'recursive', 'relative', 'subpattern'],
  highlight(bold('(?+n)')) + ' Recurse the ' + bold('n') + 'th capture group following the current position in the expression.',
  '/(?+1).+(match)/',
  [highlight('match if I start with match')],
);
createEntry(
  false, 'Recurse subpattern by id',
  ['group', 'construct', 'recursive', 'id', 'subpattern'],
  highlight(bold('(?&id)')) + ' Recursively match captured with ' + bold('id') + '. It is not required that the group with given ' + bold('id') + ' is defined before.',
  '/(?&noun) and not (?\'noun\'(d|tr)uck)/',
  [highlight('duck and not truck')],
);
createEntry(
  false, 'Match subpattern by id',
  ['group', 'construct', 'match', 'subpattern', 'id', 'before'],
  highlight(bold('(?&id)')) + ' Recursively match captured with ' + bold('id') + '. It is required that the group with given ' + bold('id') + ' is defined before.',
  '/(?P<animal>duck) (?P=animal)/',
  [highlight('duck duck') + ' go'],
);
createEntry(
  false, 'Recurse subpattern with id',
  ['group', 'construct', 'match', 'subpattern', 'id'],
  highlight(bold('(?P>id)')) + ' Recursively matches the given named subpattern or capture group.',
  '/((?P>alphabet)) or (?<alphabet>[a-z]+)/',
  [highlight('abc or xyz')],
);
createEntry(
  false, 'Define pattern/variable',
  ['group', 'construct', 'define', 'pattern', 'variable'],
  highlight(bold('(?(DEFINE)(?\'x\'...)')) + ' The ' + bold('DEFINE') + ' group is ignored for the match and is treated as a variable with name ' + bold('x') + '. After definition it can be used with ' + bold('(?P>x)') + '.',
  '/(?(DEFINE)(?\'field\'[0-9]+))(?P>field)\.(?P>field)\.(?P>field)\.(?P>field)/',
  [highlight('127.0.0.1')],
);
createEntry(
  false, 'Positive lookahead',
  ['group', 'construct', 'positive', 'lookahead'],
  highlight(bold('(?=x)')) + ' Assert that the given subpattern ' + bold('x') + ' can be matched without being included in the match.',
  '/this(?=only)/',
  [highlight('this') + 'only', 'thisnot'],
);
createEntry(
  false, 'Negative lookahead',
  ['group', 'construct', 'negative', 'lookahead'],
  highlight(bold('(?!x)')) + ' Assert that the given subpattern ' + bold('x') + ' will not match.',
  '/this(?!not)/',
  [highlight('this') + 'only', 'thisnot'],
);
createEntry(
  false, 'Positive lookbehind',
  ['group', 'construct', 'positive', 'lookbehind'],
  highlight(bold('(?<=x)')) + ' Assert that the given subpattern ' + bold('x') + ' can be matched before, without being included in the match. The pattern must have a fixed width.',
  '/(?<=only )this/',
  ['only ' + highlight('this'), 'not this'],
);
createEntry(
  false, 'Negative lookbehind',
  ['group', 'construct', 'negative', 'lookbehind'],
  highlight(bold('(?<!x)')) + ' Assert that the given subpattern ' + bold('x') + ' will not match before. The pattern must have a fixed width.',
  '/(?<!not )this/',
  ['only ' + highlight('this'), 'not this'],
);
createEntry(
  false, 'Control verb accept',
  ['group', 'construct', 'control', 'verb', 'accept'],
  highlight(bold('(*ACCEPT)')) + ' Engine end successfully on matching this verb (skip the rest).',
  '/A(?:B|C(*ACCEPT))CD/',
  [highlight('ABCD'), highlight('AC') + 'D'],
);
createEntry(
  false, 'Control verb fail',
  ['group', 'construct', 'control', 'verb', 'fail'],
  highlight(bold('(*FAIL)')) + ' Force the match to fail on matching this verb. Alternatively written as ' + bold('(*F)') + '.',
  '/A(?:B|C(*FAIL))/',
  [highlight('AB') + 'CD', 'ACD'],
);
createEntry(
  false, 'Control verb mark|skip',
  ['group', 'construct', 'control', 'verb', 'mark', 'skip'],
  highlight(bold('(*MARK:id)')) + ' This verb is used either on its own or in conjunction. When the verb is used by itself, multiple marks can be defined and later used to determine the path the engine has used. When the verb is used in conjunction with ' + bold('(*SKIP)') + ' ',
  '/ABC(*MARK:letters)123(*SKIP:letters)/',
  ['ABC' + highlight('123')],
);
createEntry(
  false, 'Control verb commit',
  ['group', 'construct', 'control', 'verb', 'commit'],
  highlight(bold('(*COMMIT)')) + ' This verb stop the match of the rest on matching this verb.',
  '/\\d(*COMMIT)[A-Z]*/g',
  [highlight('123') + '#ABC'],
);
createEntry(
  false, 'Control verb prune',
  ['group', 'construct', 'control', 'verb', 'prune'],
  highlight(bold('(*PRUNE)')) + ' Exit the regex tries to backtrack past that contain this verb.',
  '/(*PRUNE)A|B/g',
  [highlight('A') + ' B'],
);
createEntry(
  false, 'Control verb skip',
  ['group', 'construct', 'control', 'verb', 'skip'],
  highlight(bold('(*SKIP)')) + ' End the match if regex tries to backtrack past that contain this verb. Can be used to cut down on backtracking.',
  '/A(*SKIP)B/g',
  [highlight('AAB') + ' AAAB AA' + highlight('AAB') + ' AAAAAB'],
);
createEntry(
  false, 'Control verb then',
  ['group', 'construct', 'control', 'verb', 'then'],
  highlight(bold('(*THEN)')) + ' Disallows backtracking past ' + bold('(*THEN)') + ' position, and gives up matching the current alternation if there is a failure. If instead ' + bold('(*THEN)') + ' is used outside of an alternation, it will act like ' + bold('(*PRUNE)') + '.',
  '/(COND1(*THEN) FOO|COND2(*THEN) BAR|COND3(*THEN) BAZ)/g',
  [highlight('CCOND1 FOO') + ' COND2BAR ' + highlight('COND3 BAZ')],
);
createEntry(
  false, 'Pattern modifier UTF',
  ['group', 'construct', 'property', 'modifier', 'utf', '8', '16', '32'],
  highlight(bold('(*UTFx)')) + ' Sets the property mode to UTF-' + bold('x') + '. Where ' + bold('x') + ' is one of ' + bold('{8,16,32}') + '.',
  '', [],
);
createEntry(
  false, 'Pattern modifier UCP',
  ['group', 'construct', 'property', 'modifier', 'ucp'],
  highlight(bold('(*UCP)')) + ' UCP (Unicode Character Properties) makes the engine extend ' + bold('\\B') + ', ' + bold('\\b') + ', ' + bold('\\D') + ', ' + bold('\\d') + ', ' + bold('\\S') + ', ' + bold('\\s') + ', ' + bold('\\W') + ', ' + bold('\\w') + ' and some POSIX character classes to include unicode characters, by side of ASCII.',
  '/(*UCP)\\d+/',
  [highlight('1١2٢3')],
);
createEntry(
  false, 'Line break modifier',
  ['group', 'construct', 'line', 'break', 'modifier'],
  highlight(bold('(*CR)')) + ' Only carriage return character is considered as a line break.',
  '', [],
);
createEntry(
  false, 'Unix line break modifier',
  ['group', 'construct', 'unix', 'line', 'break', 'modifier'],
  highlight(bold('(*LF)')) + ' Only line feed character is considered as a line break (common on UNIX).',
  '', [],
);
createEntry(
  false, 'Windows line break modifier',
  ['group', 'construct', 'windows', 'line', 'break', 'modifier'],
  highlight(bold('(*CRLF)')) + ' Only carriage return followed by a line feed characters considered as a line break (common on Windows).',
  '', [],
);
createEntry(
  false, 'Line break modifier',
  ['group', 'construct', 'line', 'break', 'modifier'],
  highlight(bold('(*ANYCRLF)')) + ' Either a carriage return character or a line feed character, or the two in sequence are considered a line break.',
  '', [],
);
createEntry(
  false, 'Line break modifier',
  ['group', 'construct', 'line', 'break', 'modifier'],
  highlight(bold('(*ANY)')) + ' Any unicode newline character or sequence is treated as line break.',
  '', [],
);


/*
 * Meta sequence
 */
createEntry(true, 'Meta sequence');
createEntry(
  false, 'Any single character',
  ['meta', 'sequence', 'any', 'character'],
  highlight(bold('.')) + '' + bold(' Matches any character except newline.') + '.',
  '/.*/',
  [highlight('a 1 . #')],
);
createEntry(
  false, 'Alternate',
  ['meta', 'sequence', 'alternate', 'or'],
  highlight(bold('x|y')) + ' Matches either ' + bold('x') + ' or ' + bold('y') + '. This can also be used inside a capturing group.',
  '/(123|321)|(ABC|CBA)/g',
  [highlight('123') + ' ' + highlight('321') + ' ' + highlight('ABC') + ' ' + highlight('CBA')],
);
createEntry(
  false, 'Any whitespace',
  ['meta', 'sequence', 'whitespace', 'space', 'tab'],
  highlight(bold('\\s')) + ' Match space and tabs, equivalent to ' + bold('[[:space:]]') + '.',
  '/\\s/g',
  ['Hello' + highlight(' ') + 'world'],
);
createEntry(
  false, 'Any non-whitespace',
  ['meta', 'sequence', 'non', 'whitespace', 'space', 'tab'],
  highlight(bold('\\S')) + ' Match anything other than space and tabs.',
  '/\\S/g',
  [highlight('Hello') + ' ' + highlight('world')],
);
createEntry(
  false, 'Any digit',
  ['meta', 'sequence', 'any', 'digit'],
  highlight(bold('\\d')) + ' Match any digit. Equivalent to ' + bold('[0-9]') + '.',
  '/\\d/g',
  ['abc' + highlight('123')],
);
createEntry(
  false, 'Any non-digit',
  ['meta', 'sequence', 'any', 'non', 'digit'],
  highlight(bold('\\D')) + ' Match anything other than digit.',
  '/\\D/g',
  ['123' + highlight('abc')],
);
createEntry(
  false, 'Any word character',
  ['meta', 'sequence', 'any', 'word', 'character'],
  highlight(bold('\\w')) + ' Matches any letters, digits or underscore. Equivalent to ' + bold('[a-zA-Z0-9_]') + '.',
  '/\\w/g',
  [highlight('Any_123') + '.+#'],
);
createEntry(
  false, 'Any non-word character',
  ['meta', 'sequence', 'any', 'non', 'word', 'character'],
  highlight(bold('\\W')) + ' Matches anything other than letters, digits or underscore.',
  '/\\W/g',
  ['Any_123' + highlight('.+#')],
);
createEntry(
  false, 'Any unicode sequences',
  ['meta', 'sequence', 'any', 'unicode', 'sequence', 'line', 'break'],
  highlight(bold('\\X')) + ' Matches any unicode sequence including line breaks.',
  '/\\X/g',
  [highlight('a1一二三')],
);
createEntry(
  false, 'One data unit',
  ['meta', 'sequence', 'one', 'data', 'unit'],
  highlight(bold('\\C')) + ' Matches one data unit.',
  '/\\C/',
  [highlight('1') + '23'],
);
createEntry(
  false, 'Unicode newlines',
  ['meta', 'sequence', 'unicode', 'newline'],
  highlight(bold('\\R')) + ' Match any unicode newline.',
  '', [],
);
createEntry(
  false, 'Anything except newlines',
  ['meta', 'sequence', 'any', 'unicode', 'except', 'newline'],
  highlight(bold('\\N')) + ' Match anything except newline.',
  '/\\N/g',
  [highlight('All this')],
);
createEntry(
  false, 'Vertical whitespace characters',
  ['meta', 'sequence', 'vertical', 'whitespace', 'character'],
  highlight(bold('\\v')) + ' Matches unicode vertical whitespace.',
  '/\\v/',
  ['break ' + highlight('&vellip;')],
);
createEntry(
  false, 'Non-Vertical-whitespace characters',
  ['meta', 'sequence', 'non', 'vertical', 'whitespace', 'character'],
  highlight(bold('\\V')) + ' Matches anything except unicode vertical whitespace.',
  '/\\V/g',
  [highlight('break ') + '&vellip;'],
);
createEntry(
  false, 'Horizontal whitespace characters',
  ['meta', 'sequence', 'horizontal', 'whitespace', 'character'],
  highlight(bold('\\h')) + ' Matches spaces, tabs, ect.',
  '/\\h/g',
  ['a' + highlight(' ') + 'b' + highlight(' ') + 'c'],
);
createEntry(
  false, 'Non-Horizontal-whitespace characters',
  ['meta', 'sequence', 'non', 'horizontal', 'whitespace', 'character'],
  highlight(bold('\\H')) + ' Matches anything except spaces, tabs, ect.',
  '/\\H/g',
  [highlight('a') + ' ' + highlight('b') + ' ' + highlight('c')],
);
createEntry(
  false, 'Reset match',
  ['meta', 'sequence', 'reset', 'match'],
  highlight(bold('\\K')) + ' Sets the given position in the regex as the new start of the match.',
  '/\\d+,\\K\\d+/',
  ['99,' + innerHeight('99')],
);
createEntry(
  false, 'Repeat subpattern',
  ['meta', 'sequence', 'repeat', 'subpattern'],
  highlight(bold('\\#')) + ' Repeat the subpattern ' + bold('#') + ' (start from 1).',
  '/(.)\\1/',
  ['1' + highlight('22') + '333'],
);
createEntry(
  false, 'Unicode category property',
  ['meta', 'sequence', 'unicode', 'category', 'property'],
  highlight(bold('\\p{x}')) + ' Matches a unicode category where ' + bold('x') + ' define the <a href="https://www.regular-expressions.info/unicode.html#category">property</a>.',
  '/\\p{Sm}/g',
  ['1' + highlight('+') + '4' + highlight('÷') + '2' + highlight('=') + '3'],
);
createEntry(
  false, 'Unicode script property',
  ['meta', 'sequence', 'unicode', 'script', 'property'],
  highlight(bold('\\p{x}')) + ' Matches a unicode script where ' + bold('x') + ' define the <a href="https://www.regular-expressions.info/unicode.html#script">property</a>.',
  '/\\p{Hiragana}/g',
  ['Hello: ' + highlight('こんにちは')],
);
createEntry(
  false, 'Not unicode category property',
  ['meta', 'sequence', 'non', 'not', 'unicode', 'category', 'property'],
  highlight(bold('\\P{x}')) + ' Matches any unicode that is not part of category where ' + bold('x') + ' define the <a href="https://www.regular-expressions.info/unicode.html#category">property</a>.',
  '/\\P{Sm}/g',
  [highlight('1') + '+' + highlight('4') + '÷' + highlight('2') + '=' + highlight('3')],
);
createEntry(
  false, 'Not unicode script property',
  ['meta', 'sequence', 'non', 'not', 'unicode', 'script', 'property'],
  highlight(bold('\\P{x}')) + ' Matches any unicode that is not part of script where ' + bold('x') + ' define the <a href="https://www.regular-expressions.info/unicode.html#script">property</a>.',
  '/\\P{Hiragana}/g',
  [highlight('Hello: ') + 'こんにちは'],
);
createEntry(
  false, 'Literal character',
  ['meta', 'sequence', 'literal', 'character'],
  highlight(bold('\\')) + ' Convert any meta character to a literal character.',
  '/c:\\x\\y\\z/',
  [highlight('c:\\x\\y\\z')],
);
createEntry(
  false, 'Sequence of literal characters',
  ['meta', 'sequence', 'literal', 'character'],
  highlight(bold('\\Q...\\E')) + ' Treat all characters between ' + bold('\\Q') + ' and ' + bold('\\E') + ' as literals. This includes meta characters.',
  '/\\Qa\\w^\\E/',
  [highlight('a\\w^')],
);
createEntry(
  false, 'Match subpattern by id',
  ['meta', 'sequence', 'subpattern', 'id'],
  highlight(bold('\\k{id}')) + ' or ' + highlight(bold('\\k<id>')) + ' or ' + highlight(bold('\\k\'id\'')) + ' Match the the same as on subpattern with ' + bold('id') + '.',
  '&(?<A>a) and (\\k{A})/',
  [highlight('a and a')],
);
createEntry(
  false, 'Match nth subpattern',
  ['meta', 'sequence', 'nth', 'subpattern', 'index', 'relative', 'previous', 'following'],
  highlight(bold('\\gn')) + ' or ' + highlight(bold('\\g{n}')) + ' Match by reusing the ' + bold('n') + 'th subpattern. A previous captured group can be referenced by using a minus ' + bold('-n') + '. A following captured group can be referenced by using a plus ' + bold('+n') + '.',
  '/(a) and (\\g1) or (\\g{1})/',
  [highlight('a and a or a')],
);
createEntry(
  false, 'Recuse nth captured group',
  ['meta', 'sequence', 'recurse', 'nth', 'capture', 'group', 'index', 'relative', 'previous', 'following'],
  highlight(bold('\\g<n>')) + ' or ' + highlight(bold('\\g\'n\'')) + ' Recurse ' + bold('n') + 'th capture group. A previous captured group can be referenced by using a minus ' + bold('-n') + '. A following captured group can be referenced by using a plus ' + bold('+n') + '.',
  '/([a-z]+) and (\\g<1>)/',
  [highlight('a and abc')],
);
createEntry(
  false, 'Match previous captured group by id',
  ['meta', 'sequence', 'capture', 'previous', 'group', 'id'],
  highlight(bold('\\g{id}')) + ' Match the the same as on captured group with ' + bold('id') + '.',
  '/&(?\'A\'a) and (\\g{A})/',
  [highlight('a and a')],
);
createEntry(
  false, 'Match recursive captured group by id',
  ['meta', 'sequence', 'capture', 'recursive', 'group', 'id'],
  highlight(bold('\\g<id>')) + ' or ' + highlight(bold('\\g\'id\'')) + ' Recurse captured group with ' + bold('id') + '.',
  '/&(?<A>a) and (\\g\'A\')/',
  [highlight('a and a')],
);
createEntry(
  false, '8-Bit hex character',
  ['meta', 'sequence', '8', 'bit', 'hex', 'character', 'YY'],
  highlight(bold('\\xYY')) + ' Match 8-Bit hex character' + bold('YY') + '.',
  '/\\x20/g',
  ['with' + innerHeight(' ') + 'a' + innerHeight(' ') + 'space'],
);
createEntry(
  false, '16-Bit hex character',
  ['meta', 'sequence', '16', 'bit', 'hex', 'character', 'YYYY'],
  highlight(bold('\\x{YYYY}')) + ' Match 16-Bit hex character' + bold('YYYY') + '.',
  '/\\x{0040}/',
  [innerHeight('@')],
);
createEntry(
  false, '8-Bit octal character',
  ['meta', 'sequence', '8', 'bit', 'hex', 'character', 'DDD'],
  highlight(bold('\\DDD')) + ' Match 8-Bit octal character' + bold('DDD') + '.',
  '/\\045/',
  [innerHeight('%')],
);
createEntry(
  false, 'Control characters',
  ['meta', 'sequence', 'control', 'character'],
  highlight(bold('\\cY')) + ' Match ASCII <a href="https://jkorpela.fi/chars/c0.html">control character</a> ' + bold('Y') + '.',
  '/\\cI/',
  ['click,' + highlight('      ') + ',del'],
);
createEntry(
  false, 'Backspace character',
  ['meta', 'sequence', 'backspace', 'character'],
  highlight(bold('[\\b]')) + ' Match the backspace control character. This must be inside a character class.',
  '', [],
);


/*
 * Quantifiers
 */
createEntry(true, 'Quantifiers');
createEntry(
  false, 'Zero or one',
  ['quantifier', 'zero', 'one'],
  highlight(bold('x?')) + ' Match ' + bold('x') + ' if exist otherwise not.',
  '/a?1/g',
  [highlight('a1') + ' b' + highlight('1')],
);
createEntry(
  false, 'Zero or more',
  ['quantifier', 'zero', 'more'],
  highlight(bold('x*')) + ' Match ' + bold('x') + ' as many times as exist.',
  '/a*/g',
  [highlight('aaa') + 'b' + highlight('a') + '1' + highlight('aaaaa')],
);
createEntry(
  false, 'One or more',
  ['quantifier', 'one', 'more'],
  highlight(bold('x+')) + ' Match ' + bold('x') + ' at least one time.',
  '/a+/g',
  [highlight('aaa') + 'b' + highlight('a') + '1' + highlight('aaaaa')],
);
createEntry(
  false, 'Exactly n times',
  ['quantifier', 'exactly', 'times'],
  highlight(bold('x{n}')) + ' Match ' + bold('x') + ' exactly ' + bold('n') + ' times.',
  '/a{3}/g',
  [highlight('aaa') + ' a aa ' + highlight('aaa') + 'a'],
);
createEntry(
  false, 'At least n times',
  ['quantifier', 'least', 'times'],
  highlight(bold('x{n,}')) + ' Match ' + bold('x') + ' at least ' + bold('n') + ' times.',
  '/a{3,}/g',
  [highlight('aaa') + ' a aa ' + highlight('aaaa')],
);
createEntry(
  false, 'Between n and m times',
  ['quantifier', 'between', 'times'],
  highlight(bold('x{n,m}')) + ' Match ' + bold('x') + ' between ' + bold('n') + ' and ' + bold('m') + '.',
  '/a{1,2}/g',
  [highlight('aaa') + ' a aa ' + highlight('aaaa') + 'aa'],
);
createEntry(
  false, 'Greedy quantifier',
  ['quantifier', 'greedy'],
  highlight(bold('a*')) + ' Matches as many characters as possible.',
  '/a.*a/g',
  ['This c' + highlight('an be da') + 'ngerous'],
);
createEntry(
  false, 'Lazy quantifier',
  ['quantifier', 'lazy'],
  highlight(bold('a*?')) + ' Matches as few characters as possible.',
  '/a\\w*?/g',
  ['This c' + highlight('a') + 'n be d' + highlight('a') + 'ngerous'],
);
createEntry(
  false, 'Possessive quantifier',
  ['quantifier', 'possessive'],
  highlight(bold('a*?')) + ' Matches as many characters as possible.',
  '/a\w*+/g',
  ['This c' + highlight('an') + ' be d' + highlight('angerous')],
);


/*
 * Substitution
 */
createEntry(true, 'Substitution');
createEntry(
  false, 'Capture group content by index',
  ['substitution', 'capture', 'group', 'content', 'index'],
  highlight(bold('$n')) + ' Return content of the ' + bold('n') + 'th captured group.',
  '', [],
);
createEntry(
  false, 'Capture group content by id',
  ['substitution', 'capture', 'group', 'content', 'id'],
  highlight(bold('${id}')) + ' Return content of captured group with ' + bold('id') + '.',
  '', [],
);
createEntry(
  false, 'From feed',
  ['substitution', 'from', 'feed'],
  highlight(bold('\\f')) + ' Metacharacter is used to find a form feed character..',
  '', [],
);
