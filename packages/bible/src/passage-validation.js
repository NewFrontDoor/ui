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
  const references = value
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
      if (!item) return null;
      /* ******************************************* */
      /* This is the reference-level splitting stuff */
      /* ******************************************* */

      // Remove leading/trailing spaces and split chapter and verse to separate array elements
      const raw = item.trim().split(/[\s:.,;'"/]+/);

      // If a space was omitted between book number and name, put one in
      if (raw[0].match(/[\d!@#][A-Za-z]/)) {
        const addspace = raw[0].split(/(\D[A-Za-z0-9]+)/);
        raw[0] = `${addspace[0]} ${addspace[1]}`;
      }

      if (raw[1] && raw[1].match(/\D+/)) {
        // Otherwise, stitch the book number and name back together
        raw[0] = `${raw[0]} ${raw[1]}`;
        raw.splice(1, 1);
      }

      // If a space was omitted between book name and chapter, split it off
      // The slice removes the leading numbers for correct positive regex match
      if (raw[0].slice(2).match(/\w+\d+/)) {
        const splitString = raw[0].match(/(\d*\D*)/g);
        raw.splice(0, 1, splitString[0], splitString[1]);
      }

      /* ************************************* */
      /* This is the adding missing info stuff */
      /* ************************************* */

      // If the chapter or book is omitted from this
      // array member grab the one from storedRef
      if (
        raw[1] === undefined &&
        storedRef.book !== undefined &&
        storedRef.chapter !== undefined &&
        storedRef.verse !== undefined &&
        index !== 0
      ) {
        raw.unshift(storedRef.chapter); // Chapter
      }

      if (raw[0].match(/^[^a-zA-Z]+$/)) raw.unshift(storedRef.book); // Book

      // Set the relation/connection to previous element
      const connection = index === 0 ? 'init' : connections[index - 1];

      const bibleRef = {
        connection,
        book: raw[0],
        chapter: raw[1],
        verse: raw[2]
      };

      // Duplicate the final object into storedRef so
      // that it can be retrieved in next array item
      storedRef = bibleRef; // Defined line 5

      return bibleRef;
    });
  // --- End manipulation of incoming value

  const validation = references.map((item, index) => {
    if (!item) return false;
    return validate(references, item, index);
  });

  return [references, validation];
}

function fullBookTitle(book) {
  if (!book || book.length < 2) return 'no book';

  return books.find(item => {
    return item.toLowerCase().startsWith(book.toLowerCase());
  });
}

function validate(references, item, index) {
  const {connection, book, chapter, verse} = item;
  const fullTitle = fullBookTitle(book);
  const valid = [false, false, false];

  // Check if the item is actually a valid text
  valid[0] = book && Object.hasOwnProperty.call(bible, fullTitle);
  valid[1] = chapter
    ? valid[0] && Object.hasOwnProperty.call(bible[fullTitle], chapter)
    : true;
  valid[2] = verse
    ? valid[1] && bible[fullTitle][chapter] >= verse && verse !== '0'
    : true;

  // Check if passages are sequential,
  // and push the outcome to the valid array
  const prevValue = index > 0 ? references[index - 1] : null;
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
    books.findIndex(title => title === fullBookTitle(book)) <
      books.findIndex(title => title === fullBookTitle(prevValue.book))
  ) {
    valid.push('non-sequential');
  } else {
    valid.push(true);
  }

  return valid;
}

export {extractAndValidate, fullBookTitle};
