import {useState} from 'react';
import {Radio, RadioGroup, type RadioValue} from '../src';

const options = ['day', 'week', 'month'];

const RadioGroupFixture = () => {
  const [selectedValue, setSelectedValue] = useState<RadioValue>('day');

  return (
    <RadioGroup
      name="view"
      selectedValue={selectedValue}
      onChange={setSelectedValue}
      style={{display: 'grid', gap: '0.75rem'}}
    >
      {options.map((option) => (
        <label key={option} style={{display: 'flex', gap: '0.5rem'}}>
          <Radio value={option} />
          {option}
        </label>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupFixture;
