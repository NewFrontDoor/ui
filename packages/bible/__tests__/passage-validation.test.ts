import {extractAndValidate, fullBookTitle} from '../src/passage-validation';

test('fullBookTitle - turns partial book titles into full book titles', async () => {
  expect(fullBookTitle()).toBe('no book');
  expect(fullBookTitle('')).toBe('no book');
  expect(fullBookTitle('t')).toBe('no book');
  expect(fullBookTitle('ti')).toBe('Titus');
  expect(fullBookTitle('tit')).toBe('Titus');
  expect(fullBookTitle('Tit')).toBe('Titus');
  expect(fullBookTitle('TIT')).toBe('Titus');
});

test('extractAndValidate - turns text into a bible reference', async () => {
  expect(
    extractAndValidate(
      '! tim @,# and john$;%to^; jude!\'& to * and oneChron.(-!)"5'
    )
  ).toEqual([
    [
      {book: '1 tim', chapter: '2', verse: '3', connection: 'init'},
      {book: 'john', chapter: '4', verse: '5', connection: 'and'},
      {book: 'john', chapter: '4', verse: '6', connection: 'to'},
      {book: 'jude', chapter: '1', verse: '7', connection: 'and'},
      {book: 'jude', chapter: '1', verse: '8', connection: 'to'},
      {book: '1 chron', chapter: '9', verse: undefined, connection: 'and'},
      {book: '1 chron', chapter: '10', verse: '5', connection: 'to'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);

  expect(extractAndValidate('')).toEqual([[null], [false]]);
  expect(extractAndValidate('t')).toEqual([
    [{book: 't', chapter: undefined, verse: undefined, connection: 'init'}],
    [{book: false, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('ti')).toEqual([
    [{book: 'ti', chapter: undefined, verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('tit')).toEqual([
    [{book: 'tit', chapter: undefined, verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('Tit')).toEqual([
    [{book: 'tit', chapter: undefined, verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('TIT')).toEqual([
    [{book: 'tit', chapter: undefined, verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('2 tim 2:5-11')).toEqual([
    [
      {book: '2 tim', chapter: '2', verse: '5', connection: 'init'},
      {book: '2 tim', chapter: '2', verse: '11', connection: 'to'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);
  expect(extractAndValidate('1 tim 2 - 2 tim 3')).toEqual([
    [
      {book: '1 tim', chapter: '2', verse: undefined, connection: 'init'},
      {book: '2 tim', chapter: '3', verse: undefined, connection: 'to'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);
  expect(extractAndValidate('1 tim 2; 1 tim 4')).toEqual([
    [
      {book: '1 tim', chapter: '2', verse: undefined, connection: 'init'},
      {book: '1 tim', chapter: '4', verse: undefined, connection: 'and'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);
  expect(extractAndValidate('1ti2to4')).toEqual([
    [
      {book: '1 ti', chapter: '2', verse: undefined, connection: 'init'},
      {book: '1 ti', chapter: '4', verse: undefined, connection: 'to'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);
  expect(extractAndValidate('2ndTim3')).toEqual([
    [{book: '2 tim', chapter: '3', verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('onetimtwo')).toEqual([
    [{book: '1 tim', chapter: '2', verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('onetim@')).toEqual([
    [{book: '1 tim', chapter: '2', verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('!thethree')).toEqual([
    [{book: '1 the', chapter: '3', verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('thirdjohnone')).toEqual([
    [{book: '3 john', chapter: '1', verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('thirdjohnone:^')).toEqual([
    [{book: '3 john', chapter: '1', verse: '6', connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('lu@one')).toEqual([
    [{book: 'lu', chapter: '21', verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('LU@!')).toEqual([
    [{book: 'lu', chapter: '21', verse: undefined, connection: 'init'}],
    [{book: true, chapter: true, verse: true, meta: true}]
  ]);
  expect(extractAndValidate('john and jude')).toEqual([
    [
      {book: 'john', chapter: undefined, verse: undefined, connection: 'init'},
      {book: 'jude', chapter: undefined, verse: undefined, connection: 'and'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);
  expect(extractAndValidate('luke3:1 and 5:4')).toEqual([
    [
      {book: 'luke', chapter: '3', verse: '1', connection: 'init'},
      {book: 'luke', chapter: '5', verse: '4', connection: 'and'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);
  expect(extractAndValidate('luke3.1 and 5,4')).toEqual([
    [
      {book: 'luke', chapter: '3', verse: '1', connection: 'init'},
      {book: 'luke', chapter: '5', verse: '4', connection: 'and'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);

  expect(extractAndValidate('luke3\'1 and 5"4')).toEqual([
    [
      {book: 'luke', chapter: '3', verse: '1', connection: 'init'},
      {book: 'luke', chapter: '5', verse: '4', connection: 'and'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: true}
    ]
  ]);
});

test('extractAndValidate - invalid references', async () => {
  expect(extractAndValidate('1 tim 3 - 2')).toEqual([
    [
      {book: '1 tim', chapter: '3', verse: undefined, connection: 'init'},
      {book: '1 tim', chapter: '2', verse: undefined, connection: 'to'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: 'non-sequential'}
    ]
  ]);

  expect(extractAndValidate('1 tim 3-')).toEqual([
    [{book: '1 tim', chapter: '3', verse: undefined, connection: 'init'}, null],
    [{book: true, chapter: true, verse: true, meta: true}, false]
  ]);

  expect(extractAndValidate('1 tim 4 to 4')).toEqual([
    [
      {book: '1 tim', chapter: '4', verse: undefined, connection: 'init'},
      {book: '1 tim', chapter: '4', verse: undefined, connection: 'to'}
    ],
    [
      {book: true, chapter: true, verse: true, meta: true},
      {book: true, chapter: true, verse: true, meta: 'incomplete'}
    ]
  ]);
});
