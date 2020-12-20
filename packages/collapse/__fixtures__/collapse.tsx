import React, {useRef} from 'react';
import {Collapse, UseCollapseOptions} from '../src';

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

type CollapseDisabledFixtureProps = Pick<
  UseCollapseOptions<HTMLDivElement>,
  'isDisabled'
>;

const CollapseDisabledFixture = (props: CollapseDisabledFixtureProps) => {
  const contentRef = useRef(null);

  return (
    <Collapse.Manager {...props} contentRef={contentRef}>
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

const NestedCollapse = () => {
  const contentRef = useRef(null);

  return (
    <Collapse.Manager contentRef={contentRef}>
      <Collapse.Toggle>
        <button type="button">Toggle Me</button>
      </Collapse.Toggle>
      <Collapse.Panel>
        <CollapseFixture />
      </Collapse.Panel>
    </Collapse.Manager>
  );
};

const fixtures = {
  collapse: <CollapseFixture />,
  disabled: <CollapseDisabledFixture isDisabled />,
  nestedCollapse: <NestedCollapse />,
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
