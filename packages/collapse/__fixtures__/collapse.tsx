import React, {useRef} from 'react';
import {Collapse} from '../src';

const CollapseFixture = () => {
  const contentRef = useRef(null);

  return (
    <Collapse.Manager contentRef={contentRef}>
      <Collapse.Toggle>
        <button type="button">Toggle Me</button>
      </Collapse.Toggle>
      <Collapse.Panel>
        {Array.from({length: 10}, (_, key) => (
          <div
            key={key}
            style={{background: 'green', color: 'white', padding: '0.5rem'}}
          >
            <p>Lots of content Number: {key}</p>
          </div>
        ))}
      </Collapse.Panel>
    </Collapse.Manager>
  );
};

const fixtures = {
  collapse: <CollapseFixture />,
  manyCollapseFixture: (
    <React.Fragment>
      <CollapseFixture />
      <CollapseFixture />
      <CollapseFixture />
      <CollapseFixture />
      <CollapseFixture />
      <CollapseFixture />
      <CollapseFixture />
      <CollapseFixture />
      <CollapseFixture />
    </React.Fragment>
  )
};

export default fixtures;
