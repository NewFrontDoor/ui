
import BlockContent from '@sanity/block-content-to-react';

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
    <>
      <h2 sx={{variant: "styles.h2"}}>PortableText to React</h2>
      <BlockContent serializers={serializers} {...props} />
      <details>
        <summary>PortableText Doc</summary>
        <pre>{JSON.stringify(props.blocks, null, 2)}</pre>
      </details>
    </>
  );
};
