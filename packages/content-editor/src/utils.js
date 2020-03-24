import {Node} from 'slate';
export function toPortableText(nodes) {
  return nodes
    .map(node => ({
      _type: 'block',
      markDefs: findMarkDefs(node),
      ...(node.type === 'block-quote' && {style: 'blockquote'}),
      ...(node.type === 'numbered-list' && {listItem: 'number'}),
      ...(node.type === 'bulleted-list' && {listItem: 'bullet'}),
      ...(node.type === 'heading-one' && {style: 'h1'}),
      ...(node.type === 'heading-two' && {style: 'h2'}),
      ...(node.type === 'heading-three' && {style: 'h3'}),
      ...(node.type === 'heading-four' && {style: 'h4'}),
      ...(node.type === 'heading-five' && {style: 'h5'}),
      children: node.children.map(span => ({
        _type: 'span',
        text: Node.string(span),
        marks: findMark(span)
      }))
    }))
    .filter(Boolean);
}

function findMarkDefs(node) {
  if (node.type === 'link') {
    return [
      {
        _key: 'ddd',
        _type: 'link',
        href: node.url
      }
    ];
  }

  return [];
}

function findMark(span) {
  const marks = [];
  if (span.bold) {
    marks.push('strong');
  }

  if (span.code) {
    marks.push('code');
  }

  if (span.italic) {
    marks.push('em');
  }

  return marks.length ? marks : undefined;
}
