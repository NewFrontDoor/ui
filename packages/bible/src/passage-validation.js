import {default as bible} from './bible-flat.json';
import books from './books';

function extractAndValidate(value) {
  const book = [];

  // --- Start manipulation of incoming value
  const arrays = value
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
    .split(/(?:-|,+\s|;+\s|[A-Z]|\s\s|to|and)/)
    .map((item, index) => {
      if (!item) return null;
      // Remove leading/trailing spaces and split chapter and verse to separate array elements
      const raw = item.trim().split(/[\s:.,;'"/]+/);

      // If a space was omitted between book number and name, put one in
      if (raw[0].match(/[\d!@#][A-Za-z]/)) {
        const nospace = raw[0].split(/(?<=[\d!@#])([A-Za-z0-9]+)/);
        raw[0] = nospace[0];
        raw[0] = `${nospace[0]} ${nospace[1]}`;
      }

      // If a space was omitted between book name and chapter, split it off
      if (raw[0].slice(2).match(/\w(?<=\d+)/)) {
        const nospace = raw[0].split(/(?<=.[A-Za-z])([\d:]+)/);
        raw[0] = nospace[0];
        raw.splice(1, 0, nospace[1]);
      }

      // If the book is omitted from this array member (e.g. no words)
      // Grab the one from the previous array member
      if (raw[0].match(/^[^a-zA-Z]+$/)) raw.unshift(book[index - 1]);

      // Save the book in an array so that the it can be retrieved as above
      book.push(raw[0]);

      // Return this transformed element of the array
      return raw;
    });
  // --- End manipulation of incoming value

  const validation = arrays.map((item, index) => {
    if (!item) return false;
    return validate(arrays, item, index);
  });

  return [arrays, validation];
}

function fullBookTitle(book) {
  if (!book || book.length < 2) return 'no book';

  return books.find(item => {
    return item.toLowerCase().startsWith(book.toLowerCase());
  });
}

function validate(arrays, item, index) {
  const [book, chapter, verse] = item;
  const fullTitle = fullBookTitle(book);

  // Check if the item is actually a valid text
  const bookValid = book && Object.hasOwnProperty.call(bible, fullTitle);
  const chapterValid = chapter
    ? bookValid && Object.hasOwnProperty.call(bible[fullTitle], chapter)
    : true;
  const verseValid = verse
    ? chapterValid && bible[fullTitle][chapter] >= verse && verse !== '0'
    : true;

  // Save these results in an array
  const valid = [bookValid, chapterValid, verseValid];

  // Check if passages are sequential,
  // and push the outcome to the valid array
  const prevValue = index > 0 ? arrays[index - 1] : null;
  if (index > 0 && book === prevValue[0]) {
    const chapMath = Number(chapter) - Number(prevValue[1]);
    const verseMath = Number(verse) - Number(prevValue[2]);
    if (chapMath < 0) valid.push('non-sequential');
    if (chapMath > 0) valid.push(true);
    if (chapMath === 0) {
      if (Number.isNaN(verseMath)) valid.push('incomplete');
      if (verseMath <= 0) valid.push('non-sequential');
      if (verseMath > 0) valid.push(true);
    }
  } else if (
    index > 0 &&
    books.findIndex(title => title === fullBookTitle(book)) <
      books.findIndex(title => title === fullBookTitle(prevValue[0]))
  ) {
    valid.push('non-sequential');
  } else {
    valid.push(true);
  }

  return valid;
}

export {extractAndValidate, fullBookTitle};
