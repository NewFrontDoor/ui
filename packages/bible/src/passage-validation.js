import bible from './bible.json';
const books = Object.keys(bible);

function extractAndValidate(value) {
  let storedRef = {
    book: undefined,
    chapter: undefined,
    verse: undefined
  };
  const splits = value.match(/(?:-|,+\s|;+\s|\s\s|to|and)/g);
  const connections =
    splits &&
    splits.map(elem => {
      return elem
        .replace(/(?:-|to)/g, 'to')
        .replace(/(?:,+\s|\s\s|;+\s|and)/g, 'and');
    });
  // --- Start manipulation of incoming value
  const objects = value
    .toLowerCase()
    // Fix any numerical mistypes or variants
    .replace(/!|one|first|1st/g, '1')
    .replace(/@|two|second|2nd/g, '2')
    .replace(/#|three|third|3rd/g, '3')
    .replace(/\$/g, '4')
    .replace(/%/g, '5')
    .replace(/\^/g, '6')
    .replace(/&/g, '7')
    .replace(/\*/g, '8')
    .replace(/\(/g, '9')
    .replace(/\)/g, '0')
    // Split into individual verse references
    .split(/(?:-|,+\s|;+\s|\s\s|to|and)/)
    .map((item, index) => {
      if (!item || item === ' ') return null;
      const bibleRef = {
        connection: undefined,
        book: undefined,
        chapter: undefined,
        verse: undefined
      };
      // Remove leading/trailing spaces and split book, chapter and verse to separate array elements
      // removing any extra junk that isn't letters or numbers
      const raw = item
        .trim()
        .split(/([a-zA-Z]+|[0-9]+)/)
        .filter(el => el !== '' && !el.match(/[^A-Za-z0-9]+/));

      if (raw[0].match(/[\d!@#][A-Za-z]/)) {
        const addspace = raw[0].split(/(\D[A-Za-z0-9]+)/);
        raw[0] = `${addspace[0]} ${addspace[1]}`;
      }

      if (raw[1] && raw[1].match(/\D+/)) {
        // Otherwise, stitch the book number and name back together
        raw[0] = `${raw[0]} ${raw[1]}`;
        raw.splice(1, 1);
      }

      while (raw.length < 3) {
        raw.unshift(undefined);
        console.log(raw)
      }

      if (raw[0].match(/[\d!@#]\s[A-Za-z]+/ || /[A-Za-z]+/)) {
        bibleRef.book = raw[0];
      }

      if (raw[0].match(/^[^a-zA-Z]+$/)) bibleRef.book = storedRef.book;

      // If the book is omitted grab previous book reference

      if (raw[1].match(/\d+/)) {
        bibleRef.chapter = raw[1];
      }

      // If the chapter is omitted from this array member
      // Grab the one from the previous array member
      if (
        bibleRef.chapter === undefined &&
        storedRef.book !== undefined &&
        storedRef.chapter !== undefined &&
        storedRef.verse !== undefined &&
        index !== 0
      ) {
        bibleRef.chapter = storedRef.chapter;
      }

      // Populate the verse value (if it exists)
      bibleRef.verse = raw[2];

      // Save the book in a new object so that the it can be retrieved as above
      storedRef = bibleRef;

      // Return this transformed element of the array
      bibleRef.connection = index === 0 ? 'init' : connections[index - 1];
      return bibleRef;
    });
  // --- End manipulation of incoming value

  const validation = objects.map((item, index) => {
    if (!item || item === '') return false;
    return validate(objects, item, index);
  });
  return [objects, validation];
}

function fullBookTitle(book) {
  if (!book || book.length < 2) return 'no book';

  return books.find(item => {
    return item.toLowerCase().startsWith(book.toLowerCase());
  });
}

function validate(objects, item, index) {
  const {book, chapter, verse, connection} = item;
  const fullTitle = fullBookTitle(book);
  const valid = [false, false, false];

  // Check if the item is actually a valid text
  valid[0] = books.includes(fullTitle);
  valid[1] =
    book && chapter
      ? Object.hasOwnProperty.call(bible[fullTitle], chapter)
      : true;
  valid[2] =
    book && chapter && verse
      ? bible[fullTitle][chapter] >= verse && verse !== '0'
      : true;

  // Check if passages are sequential,
  // and push the outcome to the valid array
  const prevValue = index > 0 ? objects[index - 1] : null;
  if (index > 0 && connection === 'to' && book === prevValue.book) {
    const chapMath = Number(chapter) - Number(prevValue.chapter);
    const verseMath = Number(verse) - Number(prevValue.verse);
    if (chapMath < 0) valid.push('non-sequential');
    if (chapMath > 0) valid.push(true);
    if (chapMath === 0) {
      if (Number.isNaN(verseMath)) valid.push('incomplete');
      if (verseMath <= 0) valid.push('non-sequential');
      if (verseMath > 0) valid.push(true);
    }
  } else if (
    index > 0 &&
    connection === 'to' &&
    books.findIndex(title => title === fullTitle) <
      books.findIndex(title => title === fullBookTitle(prevValue.book))
  ) {
    valid.push('non-sequential');
  } else {
    valid.push(true);
  }

  return valid;
}

export {extractAndValidate, fullBookTitle};
