export function registerDraconicLanguage(monaco) {
  // Register a new language
  monaco.languages.register({id: 'draconic'});

  // register the language config
  monaco.languages.setLanguageConfiguration('draconic', {
    brackets: [
      ['<drac2>', '</drac2>'],
      ['{{', '}}'],
      ['{', '}'],
      ['<', '>']
    ],

    autoClosingPairs: [
      {open: '{', close: '}'},
      {open: '[', close: ']'},
      {open: '(', close: ')'},
      {open: '"', close: '"'},
      {open: '\'', close: '\''},
      {open: '<drac2>', close: '</drac2>'}
      // no <> completion because that would be annoying
    ],
  });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('draconic', {
    brackets: [
      {open: '<drac2>', close: '</drac2>', token: 'delimiter.drac2'},
      {open: '{{', close: '}}', token: 'delimiter.drac1'},
      {open: '{', close: '}', token: 'delimiter.roll'},
      {open: '<', close: '>', token: 'delimiter.lookup'},
    ],

    tokenizer: {
      root: [
        [/{{/, {
          token: 'delimiter.drac1',
          next: '@drac1Body',
          nextEmbedded: 'python'
        }],
        [/{/, 'delimiter.roll', '@rollBody'],
        [/<drac2>/, {
          token: 'delimiter.drac2',
          next: '@drac2Body',
          nextEmbedded: 'python'
        }],
        [/</, 'delimiter.lookup', '@lookupBody'],
      ],

      // draconic bodies
      // enter the python tokenizer space when in a draconic block
      drac1Body: [
        [/}}/, {
          token: 'delimiter.drac1',
          next: '@pop',
          nextEmbedded: '@pop'
        }]
      ],

      drac2Body: [
        [/<\/drac2>/, {
          token: 'delimiter.drac2',
          next: '@pop',
          nextEmbedded: '@pop'
        }]
      ],

      // and other bodies
      rollBody: [
        ['[^}]+', 'roll'],
        [/}/, 'delimiter.roll', '@popall']
      ],

      lookupBody: [
        // any non-whitespace
        ['[^>]+', 'lookup'],
        [/>/, 'delimiter.lookup', '@popall']
      ],
    }
  });

  // add highlighting
  monaco.editor.defineTheme('draconicTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {token: 'delimiter.drac1', foreground: 'ADE1E5'},

      {token: 'delimiter.drac2', foreground: '73AB84', fontStyle: 'bold'},

      {token: 'delimiter.roll', foreground: '79C7C5'},
      {token: 'roll', foreground: '79C7C5'},

      {token: 'delimiter.lookup', foreground: '99D19C'},
      {token: 'lookup', foreground: '99D19C'},
    ]
  });
}

// in this scope,
// "nothing is highlighted"
//
// {{in this scope "things are"}}
//
// <drac2>
// for i in range(5):
//     pass
// return i
// </drac2>
//
// for i in range(5):
//     pass
// return i
//
// <whatever>
// {more stuff}
