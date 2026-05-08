import {useRef} from 'react';
import {useCollapse} from '../src';

type CollapseFixtureProps = {
  initiallyExpanded?: boolean;
};

const CollapseFixture = ({initiallyExpanded}: CollapseFixtureProps) => {
  const contentRef = useRef<HTMLDivElement>(null!);

  const {getToggleProps, getCollapseProps} = useCollapse({
    initiallyExpanded,
    contentRef
  });

  return (
    <>
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
    </>
  );
};

const fixtures = {
  useCollapse: <CollapseFixture />,
  defaultExpanded: <CollapseFixture initiallyExpanded />
};

export default fixtures;