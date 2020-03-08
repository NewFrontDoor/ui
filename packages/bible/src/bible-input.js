import React, {useState} from 'react';
import {extractAndValidate, fullBookTitle} from './passage-validation';

function Output({isValid, references}) {
  if (isValid[0] === null) return 'Please enter a passage';

  if (isValid.every(element => element === true)) {
    return references
      .map(collection => {
        const {book, chapter = null, verse = null} = collection;
        return (
          collection &&
          `${fullBookTitle(book)} ${chapter ? chapter : ''}${
            verse ? ':' + verse : ''
          }`
        );
      })
      .map((string, index) => {
        if (index === 0) {
          return string;
        }

        return (references[index].connection === 'to' ? ' - ' : '; ') + string;
      });
  }

  return isValid.map((en, index) => {
    const status = en === true ? 'OK.' : en === null ? 'incomplete.' : en;
    return `Entry ${index + 1} is ${status}`;
  });
}

const BibleInput = () => {
  const [input, setInput] = useState('');
  const [valid, setValid] = useState([]);
  const [references, setReferences] = useState([]);

  function handleInputChange(e) {
    setInput(e.currentTarget.value);
    const [references, validated] = extractAndValidate(e.currentTarget.value);
    setValid(validated);
    setReferences(references);
  }

  const isValid = valid.map(array => {
    if (Array.isArray(array) === false) return null;
    if (array.some(e => e === 'incomplete')) return 'incomplete';
    if (array.some(e => e === 'non-sequential')) return 'non-sequential';
    return array.every(e => e === true);
  });

  return (
    <div>
      <h2>Passage</h2>
      <input value={input} onChange={handleInputChange} />
      <p>
        <Output isValid={isValid} references={references} />
      </p>
    </div>
  );
};

export default BibleInput;
