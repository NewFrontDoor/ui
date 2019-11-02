import React, {useState} from 'react';
import {extractAndValidate, fullBookTitle} from './passage-validation';

function Output({isValid, arrays}) {
  if (isValid[0] === null) return 'Please enter a passage';

  if (isValid.every(element => element === true)) {
    return arrays
      .map(collection => {
        return (
          collection &&
          `${fullBookTitle(collection[0])} ${
            collection[1] ? collection[1] : ''
          }${collection[2] ? ':' + collection[2] : ''}`
        );
      })
      .map((string, index) => {
        if (index === 0) {
          return string;
        }

        return (arrays[index][3] === 'to' ? ' - ' : '; ') + string;
      });
  }

  return isValid.map((en, index) => {
    const status = en === true ? 'OK.' : en === null ? 'incomplete.' : en;
    return `Entry ${index + 1} is ${status}`;
  });
}

export default function BibleInput() {
  const [input, setInput] = useState('');
  const [valid, setValid] = useState([]);
  const [arrays, setArrays] = useState([]);

  function handleInputChange(e) {
    setInput(e.currentTarget.value);
    const [arrays, validated] = extractAndValidate(e.currentTarget.value);
    setValid(validated);
    setArrays(arrays);
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
        <Output isValid={isValid} arrays={arrays} />
      </p>
    </div>
  );
}
