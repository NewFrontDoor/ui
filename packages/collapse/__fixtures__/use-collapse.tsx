/** @jsx jsx */
import {jsx} from 'theme-ui';
import {Fragment, useRef} from 'react';
import {useCollapse} from '../src';

type CollapseFixtureProps = {
  initiallyExpanded?: boolean;
};

const CollapseFixture = ({initiallyExpanded}: CollapseFixtureProps) => {
  const contentRef = useRef(null);
  const {getToggleProps, getCollapseProps} = useCollapse({
    initiallyExpanded,
    contentRef
  });

  return (
    <Fragment>
      <button {...getToggleProps()} type="button">
        Toggle Me
      </button>
      <div {...getCollapseProps()}>
        <div ref={contentRef}>
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
    </Fragment>
  );
};

const fixtures = {
  useCollapse: <CollapseFixture />,
  defaultExpanded: <CollapseFixture initiallyExpanded />
};

export default fixtures;
