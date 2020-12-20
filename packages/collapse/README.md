# `@newfrontdoor/collapse`

## `<Collapse />`

### Usage

```js
import {useRef} from 'react';
import {Collapse} from '@newfrontdoor/collapse';

const contentRef = useRef(null);

return (
  <Collapse.Manager contentRef={contentRef}>
    <Collapse.Toggle>
      <button type="button">Toggle Me</button>
    </Collapse.Toggle>
    <Collapse.Panel>
      Collapse Content
    </Collapse.Panel>
  </Collapse.Manager>
)
```

## `useCollapse()`

### Usage

```js
import {useRef} from 'react';
import {useCollapse} from '@newfrontdoor/collapse';

const contentRef = useRef(null);
const {getToggleProps, getCollapseProps} = useCollapse({
  contentRef
});

return (
  <div>
    <button {...getToggleProps()} type="button">
      Toggle Me
    </button>
    <div {...getCollapseProps()}>
      <div ref={contentRef}>
        Collapse Content
      </div>
    </div>
  </div>
);
```
