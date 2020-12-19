import React, {useRef} from 'react';
import {useCollapse} from '../src';

const CollapseFixture = () => {
  const contentRef = useRef(null);
  const {getToggleProps, getContentProps, getCollapseProps} = useCollapse({
    contentRef
  });

  return (
    <React.Fragment>
      <button {...getToggleProps()} type="button">
        Toggle Me
      </button>
      <div {...getCollapseProps()}>
        <div {...getContentProps()}>
          {Array.from({length: 10}, (_, key) => (
            <div
              key={key}
              style={{background: 'green', color: 'white', padding: '0.5rem'}}
            >
              <p>Lots of content Number: {key}</p>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const fixtures = {
  useCollapse: <CollapseFixture />
};

export default fixtures;
