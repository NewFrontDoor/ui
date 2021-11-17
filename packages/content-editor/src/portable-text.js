/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {jsx, Styled} from 'theme-ui';
const serializers = {
  types: {
    block: (props) => {
      const {node, children} = props;
      const customBlocks = {
        blockquote: <blockquote>— {children}</blockquote>
      };

      return (
        customBlocks[node.style] ||
        BlockContent.defaultSerializers.types.block(props)
      );
    }
  },
  marks: {
    em: ({children}) => <em style={{color: 'blue'}}>{children}</em>,
    strong: ({children}) => (
      <strong style={{fontSize: '1.2em'}}>{children}</strong>
    ),
    code: ({children}) => (
      <code style={{fontFamily: 'SF Mono, monospace'}}>{children}</code>
    )
  }
};

export const PortableText = (props) => {
  return (
    <jsx.Fragment>
      <Styled.h2>PortableText to React</Styled.h2>
      <BlockContent serializers={serializers} {...props} />
      <details>
        <summary>PortableText Doc</summary>
        <pre>{JSON.stringify(props.blocks, null, 2)}</pre>
      </details>
    </jsx.Fragment>
  );
};
