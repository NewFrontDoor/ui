import React, {useState} from 'react';
import {extractAndValidate, fullBookTitle} from './passage-validation';

function Output({isValid, references}) {
  if (isValid[0] === null) return 'Please enter a passage';

  if (isValid.every((element) => element === true)) {
    console.log(references);
    return references
      .map((collection) => {
        if (collection === null) return null;
        const {book, chapter = null, verse = null} = collection;
        return (
          collection &&
          `${fullBookTitle(book)} ${chapter ? chapter : ''}${
            verse ? ':' + verse : ''
          }`
        );
      })
      .map((string, index) => {
        if (string === null) return null;
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

  function handleInputChange(event) {
    setInput(event.currentTarget.value);
    const [references, validated] = extractAndValidate(
      event.currentTarget.value
    );
    setValid(validated);
    setReferences(references);
  }

  const isValid = valid.map((object) => {
    if (Object.values(object).includes('incomplete')) return 'incomplete';
    if (Object.values(object).includes('non-sequential'))
      return 'non-sequential';
    return Object.values(object).every((value) => value === true);
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
